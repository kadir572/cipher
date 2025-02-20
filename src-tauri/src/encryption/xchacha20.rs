use chrono::Local;
use orion::hazardous::{
    aead::xchacha20poly1305::{open, seal, Nonce},
    mac::poly1305::POLY1305_OUTSIZE,
    stream::chacha20::CHACHA_KEYSIZE,
};
use std::{
    fs::{remove_file, File},
    io::{BufReader, Read, Write, BufWriter},
    path::{Path, PathBuf},
    time::{Instant, Duration},
};
use tauri::{AppHandle, Emitter};

use crate::{
    log::add_log_internal,
    types::{AppResponse, LogLevel, ProcessingStats, ProgressInfo, ResponseTextCode, Status},
};

use super::helpers::{
    create_key, generate_auth_tag, generate_nonce, validate_password,
    EncryptionError,
};

const CHUNK_SIZE: usize = 1024 * 1024; // 1MB chunks for better progress tracking
const MIN_EVENT_INTERVAL: Duration = Duration::from_millis(30);

/// Creates a unique output path for encrypted/decrypted files
/// 
/// Appends timestamp if file already exists
fn create_unique_output_path(input_path: &Path, is_encryption: bool) -> Result<PathBuf, EncryptionError> {
    let parent_dir = input_path.parent()
        .ok_or_else(|| EncryptionError::PasswordValidation("Parent directory not found".to_string()))?;

    if is_encryption {
        // For encryption: input.pdf -> input.pdf.enc or input_timestamp.pdf.enc
        let output_path = parent_dir.join(format!("{}.enc", input_path.file_name().unwrap().to_str().unwrap()));
        if !output_path.exists() {
            Ok(output_path)
        } else {
            let file_stem = input_path.file_stem()
                .and_then(|stem| stem.to_str())
                .ok_or_else(|| EncryptionError::PasswordValidation("Invalid filename".to_string()))?;
            let extension = input_path.extension()
                .and_then(|ext| ext.to_str())
                .unwrap_or("");
            let timestamp = Local::now().format("%Y%m%dT%H%M%S");
            Ok(parent_dir.join(format!("{}_{}.{}.enc", file_stem, timestamp, extension)))
        }
    } else {
        // For decryption: input.pdf.enc -> input.pdf or input_timestamp.pdf
        let file_stem = input_path.file_stem() // removes .enc
            .and_then(|stem| Path::new(stem).file_stem()) // removes original extension
            .and_then(|stem| stem.to_str())
            .ok_or_else(|| EncryptionError::PasswordValidation("Invalid filename".to_string()))?;
        
        let extension = input_path.file_stem() // removes .enc
            .and_then(|stem| Path::new(stem).extension()) // gets original extension
            .and_then(|ext| ext.to_str())
            .unwrap_or("");

        let output_path = parent_dir.join(format!("{}.{}", file_stem, extension));
        if !output_path.exists() {
            Ok(output_path)
        } else {
            let timestamp = Local::now().format("%Y%m%dT%H%M%S");
            Ok(parent_dir.join(format!("{}_{}.{}", file_stem, timestamp, extension)))
        }
    }
}

/// Creates an error response with logging
fn create_error_response(code: ResponseTextCode, file_path: Option<String>) -> AppResponse {
    add_log_internal(LogLevel::Error, code.clone(), file_path.clone()).ok();
    AppResponse {
        status: Status::Error,
        text_code: code,
        file_path: file_path,
        timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string(),
        stats: None,
    }
}

/// Creates a success response with logging
fn create_success_response(code: ResponseTextCode, file_path: String, stats: ProcessingStats) -> AppResponse {
    add_log_internal(LogLevel::Info, code.clone(), Some(file_path.clone())).ok();
    AppResponse {
        text_code: code,
        status: Status::Success,
        file_path: Some(file_path),
        timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string(),
        stats: Some(stats),
    }
}

/// Sanitizes a file path for use in event names
fn sanitize_path(path: &str) -> String {
    path.chars()
        .map(|c| {
            if c.is_alphanumeric() || c == '-' || c == '/' || c == ':' || c == '_' {
                c
            } else {
                '_'
            }
        })
        .collect()
}

#[tauri::command]
pub async fn encrypt_file(
    app: AppHandle,
    file_path: &str,
    password: &str,
    delete_original: bool,
) -> Result<AppResponse, AppResponse> {
    let start_time = Instant::now();
    let mut last_event = Instant::now();
    
    validate_password(password).map_err(|_| {
        create_error_response(ResponseTextCode::InvalidPassword, None)
    })?;

    let source_file = File::open(file_path).map_err(|_| {
        create_error_response(ResponseTextCode::FileOpenFailed, Some(file_path.to_string()))
    })?;

    let file_size = source_file.metadata().map(|m| m.len()).unwrap_or(0) as usize;
    let mut bytes_processed = 0;

    // Generate encryption key and nonce first
    let nonce = generate_nonce();
    let key = create_key(password, nonce.clone()).map_err(|_| {
        create_error_response(ResponseTextCode::KeyGenerationFailed, None)
    })?;
    let nonce_obj = Nonce::from_slice(nonce.as_slice()).unwrap();

    // Create output file with proper naming
    let output_path = create_unique_output_path(Path::new(file_path), true)
        .map_err(|_| create_error_response(ResponseTextCode::FileNameExtractionFailed, Some(file_path.to_string())))?;
    let output_path_str = output_path.display().to_string();
    println!("Output path: {}", output_path_str);

    let mut writer = BufWriter::new(File::create(&output_path).map_err(|_| {
        create_error_response(ResponseTextCode::FileCreationFailed, Some(output_path_str.clone()))
    })?);

    // Write nonce first
    writer.write_all(nonce.as_slice()).map_err(|_| {
        let _ = remove_file(&output_path);
        create_error_response(ResponseTextCode::EncryptionFailed, Some(output_path_str.clone()))
    })?;

    // Process file in chunks
    let mut reader = BufReader::new(source_file);
    let mut buffer = vec![0u8; CHUNK_SIZE];

    while let Ok(n) = reader.read(&mut buffer) {
        if n == 0 { break; }
        let chunk = &buffer[..n];

        // Encrypt chunk
        let ad = generate_auth_tag();
        let mut output = vec![0u8; n + POLY1305_OUTSIZE + ad.len()];
        output[..CHACHA_KEYSIZE].copy_from_slice(ad.as_ref());
        
        seal(&key, &nonce_obj, chunk, Some(ad.as_slice()), &mut output[CHACHA_KEYSIZE..]).map_err(|_| {
            create_error_response(ResponseTextCode::EncryptionFailed, Some(output_path_str.clone()))
        })?;

        // Write encrypted chunk
        writer.write_all(&output).map_err(|_| {
            create_error_response(ResponseTextCode::EncryptionFailed, Some(output_path_str.clone()))
        })?;

        bytes_processed += n;

        if last_event.elapsed() >= MIN_EVENT_INTERVAL {
            let progress = (bytes_processed as f64 / file_size as f64) * 100.0;
            let elapsed = start_time.elapsed().as_secs_f64();
            let speed = bytes_processed as f64 / (1024.0 * 1024.0) / elapsed;
            
            let event_name = format!("encryption_progress_{}", sanitize_path(file_path));
            app.emit(&event_name, &ProgressInfo {
                percentage: progress,
                bytes_processed,
                total_bytes: file_size,
                speed_mbps: speed,
                elapsed_seconds: elapsed,
                estimated_remaining_seconds: if speed > 0.0 {
                    (file_size - bytes_processed) as f64 / (speed * 1024.0 * 1024.0)
                } else {
                    0.0
                },
            }).unwrap();
            last_event = Instant::now();
        }
    }

    writer.flush().map_err(|_| {
        let _ = remove_file(&output_path);
        create_error_response(ResponseTextCode::EncryptionFailed, Some(output_path_str.clone()))
    })?;

    let total_time = start_time.elapsed().as_secs_f64();
    let average_speed = file_size as f64 / (1024.0 * 1024.0) / total_time;

    if delete_original {
        remove_file(file_path).map_err(|_| {
            create_error_response(ResponseTextCode::FileDeleteFailed, Some(file_path.to_string()))
        })?;
    }

    Ok(create_success_response(
        ResponseTextCode::EncryptionSuccessful,
        output_path_str,
        ProcessingStats {
            total_size_bytes: file_size,
            processing_time_seconds: total_time,
            average_speed_mbps: average_speed,
        }
    ))
}

#[tauri::command]
pub async fn decrypt_file(
    app: AppHandle,
    file_path: &str,
    password: &str,
    delete_original: bool,
) -> Result<AppResponse, AppResponse> {
    let start_time = Instant::now();
    let mut last_event = Instant::now();
    
    validate_password(password).map_err(|_| {
        create_error_response(ResponseTextCode::InvalidPassword, None)
    })?;

    let mut source_file = File::open(file_path).map_err(|_| {
        create_error_response(ResponseTextCode::FileOpenFailed, Some(file_path.to_string()))
    })?;

    let file_size = source_file.metadata().map(|m| m.len()).unwrap_or(0) as usize;
    let mut bytes_processed = 0;

    // Read nonce (first 24 bytes)
    let mut nonce_bytes = vec![0u8; 24];
    source_file.read_exact(&mut nonce_bytes).map_err(|_| {
        create_error_response(ResponseTextCode::DecryptionFailed, Some(file_path.to_string()))
    })?;

    let key = create_key(password, nonce_bytes.clone()).map_err(|_| {
        create_error_response(ResponseTextCode::KeyGenerationFailed, None)
    })?;
    let nonce = Nonce::from_slice(&nonce_bytes).unwrap();

    // Create output file with proper naming
    let output_path = create_unique_output_path(Path::new(file_path), false)
        .map_err(|_| create_error_response(ResponseTextCode::FileNameExtractionFailed, Some(file_path.to_string())))?;
    let output_path_str = output_path.display().to_string();

    let mut writer = BufWriter::new(File::create(&output_path).map_err(|_| {
        create_error_response(ResponseTextCode::FileCreationFailed, Some(output_path_str.clone()))
    })?);

    // Process file in chunks
    let mut reader = BufReader::new(source_file);
    let chunk_size = CHUNK_SIZE + CHACHA_KEYSIZE + POLY1305_OUTSIZE;
    let mut buffer = vec![0u8; chunk_size];

    while let Ok(n) = reader.read(&mut buffer) {
        if n == 0 { break; }
        let chunk = &buffer[..n];

        // Split chunk into auth tag and encrypted data
        let (ad, encrypted_data) = chunk.split_at(CHACHA_KEYSIZE);
        
        // Decrypt chunk
        let mut decrypted = vec![0u8; encrypted_data.len() - POLY1305_OUTSIZE];
        if let Err(_) = open(&key, &nonce, encrypted_data, Some(ad), &mut decrypted) {
            let _ = remove_file(&output_path);
            return Err(create_error_response(ResponseTextCode::InvalidPassword, Some(file_path.to_string())));
        }

        // Write decrypted chunk
        writer.write_all(&decrypted).map_err(|_| {
            let _ = remove_file(&output_path);
            create_error_response(ResponseTextCode::DecryptionFailed, Some(file_path.to_string()))
        })?;

        bytes_processed += n;

        if last_event.elapsed() >= MIN_EVENT_INTERVAL {
            let progress = (bytes_processed as f64 / file_size as f64) * 100.0;
            let elapsed = start_time.elapsed().as_secs_f64();
            let speed = bytes_processed as f64 / (1024.0 * 1024.0) / elapsed;
            
            let event_name = format!("decryption_progress_{}", sanitize_path(file_path));
            app.emit(&event_name, &ProgressInfo {
                percentage: progress,
                bytes_processed,
                total_bytes: file_size,
                speed_mbps: speed,
                elapsed_seconds: elapsed,
                estimated_remaining_seconds: if speed > 0.0 {
                    (file_size - bytes_processed) as f64 / (speed * 1024.0 * 1024.0)
                } else {
                    0.0
                },
            }).unwrap();
            last_event = Instant::now();
        }
    }

    writer.flush().map_err(|_| {
        let _ = remove_file(&output_path);
        create_error_response(ResponseTextCode::DecryptionFailed, Some(output_path_str.clone()))
    })?;

    let total_time = start_time.elapsed().as_secs_f64();
    let average_speed = file_size as f64 / (1024.0 * 1024.0) / total_time;

    if delete_original {
        remove_file(file_path).map_err(|_| {
            create_error_response(ResponseTextCode::FileDeleteFailed, Some(file_path.to_string()))
        })?;
    }

    Ok(create_success_response(
        ResponseTextCode::DecryptionSuccessful,
        output_path_str,
        ProcessingStats {
            total_size_bytes: file_size,
            processing_time_seconds: total_time,
            average_speed_mbps: average_speed,
        }
    ))
}
