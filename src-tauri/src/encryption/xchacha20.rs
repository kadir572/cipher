use chrono::Local;
use orion::hazardous::{
    aead::xchacha20poly1305::{open, seal, Nonce, SecretKey},
    mac::poly1305::POLY1305_OUTSIZE,
    stream::chacha20::CHACHA_KEYSIZE,
};
use std::{
    fs::{remove_file, File},
    io::{BufReader, Read, Write},
    path::Path,
    time::Instant,
};
use tauri::{AppHandle, Emitter};

use crate::{
    logs::add_log_internal,
    types::{AppResponse, LogLevel, ProcessingStats, ProgressInfo, ResponseTextCode, Status},
};

use super::helpers::{
    create_key, generate_auth_tag, generate_nonce, split_encrypted, validate_password,
};

const CHUNK_SIZE: usize = 16384;

/// Core encryption function that handles the actual XChaCha20-Poly1305 encryption
/// 
/// # Arguments
/// * `dist` - Destination file to write encrypted data
/// * `contents` - Data to encrypt
/// * `key` - Encryption key
/// * `nonce` - Nonce for encryption
fn encrypt_core(
    dist: &mut File,
    contents: Vec<u8>,
    key: &SecretKey,
    nonce: Nonce,
) -> Result<(), String> {
    let ad = generate_auth_tag();
    let output_len = contents
        .len()
        .checked_add(POLY1305_OUTSIZE + ad.len())
        .ok_or("Plain text too long")?;

    let mut output = vec![0u8; output_len];
    output[..CHACHA_KEYSIZE].copy_from_slice(ad.as_ref());

    seal(
        &key,
        &nonce,
        contents.as_slice(),
        Some(ad.clone().as_slice()),
        &mut output[CHACHA_KEYSIZE..],
    )
    .map_err(|_| "Encryption failed")?;
    
    dist.write_all(&output)
        .map_err(|_| "Failed to write encrypted data")?;
    Ok(())
}

/// Core decryption function that handles the actual XChaCha20-Poly1305 decryption
fn decrypt_core(
    dist: &mut File,
    contents: Vec<u8>,
    key: &SecretKey,
    nonce: Nonce,
) -> Result<(), ResponseTextCode> {
    let split = split_encrypted(contents.as_slice());
    let mut output = vec![0u8; split.1.len() - POLY1305_OUTSIZE];

    open(
        &key,
        &nonce,
        split.1.as_slice(),
        Some(split.0.as_slice()),
        &mut output,
    )
    .map_err(|_| ResponseTextCode::InvalidPassword)?;

    dist.write(&output.as_slice())
        .map_err(|_| ResponseTextCode::DecryptionFailed)?;

    Ok(())
}

/// Creates a unique output path for encrypted/decrypted files
/// 
/// Appends timestamp if file already exists
fn create_unique_output_path(
    parent_dir: &Path,
    file_stem: &str,
    extension: &str,
    is_encryption: bool,
) -> std::path::PathBuf {
    let mut output_path = if is_encryption {
        parent_dir.join(format!("{}.{}.enc", file_stem, extension))
    } else {
        parent_dir.join(format!("{}.{}", file_stem, extension))
    };

    if output_path.exists() {
        let timestamp = Local::now().format("%Y%m%dT%H%M%S");
        output_path = if is_encryption {
            parent_dir.join(format!("{}_{}.{}.enc", file_stem, timestamp, extension))
        } else {
            parent_dir.join(format!("{}_{}.{}", file_stem, timestamp, extension))
        };
    }

    output_path
}

/// Creates an error response with logging
fn create_error_response(code: ResponseTextCode, file_path: Option<String>) -> AppResponse {
    add_log_internal(LogLevel::Error, code.clone(), file_path).ok();
    AppResponse {
        status: Status::Error,
        text_code: code,
        file_path: None,
        timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string(),
        stats: None,
    }
}

/// Reads file contents into memory with progress tracking
async fn read_file_with_progress(
    app: &AppHandle,
    file_path: &str,
    source: &mut BufReader<File>,
    event_prefix: &str,
) -> Result<Vec<u8>, AppResponse> {
    let mut buffer = [0u8; CHUNK_SIZE];
    let mut contents = Vec::new();
    let file_size = source.get_ref().metadata().map(|m| m.len()).unwrap_or(0) as usize;
    let mut bytes_read_total = 0;
    let start_time = Instant::now();

    loop {
        match source.read(&mut buffer) {
            Ok(0) => break,
            Ok(bytes_read) => {
                contents.extend_from_slice(&buffer[..bytes_read]);
                bytes_read_total += bytes_read;
                
                let elapsed = start_time.elapsed().as_secs_f64();
                let speed = if elapsed > 0.0 {
                    bytes_read_total as f64 / (1024.0 * 1024.0) / elapsed
                } else {
                    0.0
                };
                
                let progress = (bytes_read_total as f64 / file_size as f64) * 100.0;
                let remaining_bytes = file_size - bytes_read_total;
                let estimated_remaining = if speed > 0.0 {
                    remaining_bytes as f64 / (speed * 1024.0 * 1024.0)
                } else {
                    0.0
                };

                let progress_info = ProgressInfo {
                    percentage: progress,
                    bytes_processed: bytes_read_total,
                    total_bytes: file_size,
                    speed_mbps: speed,
                    elapsed_seconds: elapsed,
                    estimated_remaining_seconds: estimated_remaining,
                };

                let event_name = format!("{}_{}", event_prefix, sanitize_path(file_path));
                app.emit(&event_name, &progress_info).unwrap();
                
                println!(
                    "Progress: {:.1}% | Processed: {:.2} MB / {:.2} MB | Speed: {:.2} MB/s | Elapsed: {:.1}s | Remaining: {:.1}s",
                    progress,
                    bytes_read_total as f64 / (1024.0 * 1024.0),
                    file_size as f64 / (1024.0 * 1024.0),
                    speed,
                    elapsed,
                    estimated_remaining
                );
            }
            Err(_) => {
                return Err(create_error_response(
                    ResponseTextCode::FileReadFailed,
                    Some(file_path.to_string()),
                ));
            }
        }
    }

    Ok(contents)
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
) -> Result<AppResponse, AppResponse> {
    let start_time = Instant::now();
    
    // Validate password
    validate_password(password).map_err(|_| {
        create_error_response(ResponseTextCode::InvalidPassword, None)
    })?;

    // Open source file
    let source_file = File::open(file_path).map_err(|_| {
        create_error_response(ResponseTextCode::FileOpenFailed, Some(file_path.to_string()))
    })?;

    // Prepare output path
    let input_path = Path::new(file_path);
    let parent_dir = input_path.parent().ok_or_else(|| {
        create_error_response(ResponseTextCode::ParentDirectoryRetrieveFailed, None)
    })?;

    let file_stem = input_path
        .file_stem()
        .and_then(|s| s.to_str())
        .ok_or_else(|| {
            create_error_response(ResponseTextCode::FileNameExtractionFailed, None)
        })?;

    let extension = input_path
        .extension()
        .and_then(|s| s.to_str())
        .ok_or_else(|| {
            create_error_response(ResponseTextCode::FileExtensionExtractionFailed, None)
        })?;

    let output_path = create_unique_output_path(parent_dir, file_stem, extension, true);

    // Create output file
    let mut dist = File::create(&output_path).map_err(|_| {
        create_error_response(
            ResponseTextCode::FileCreationFailed,
            Some(output_path.display().to_string()),
        )
    })?;

    // Read source file
    let mut reader = BufReader::new(source_file);
    let contents = read_file_with_progress(&app, file_path, &mut reader, "read_progress").await?;

    // Generate encryption key and nonce
    let nonce = generate_nonce();
    dist.write(nonce.as_slice()).map_err(|_| {
        create_error_response(ResponseTextCode::EncryptionFailed, Some(file_path.to_string()))
    })?;

    let key = create_key(password, nonce.clone()).map_err(|_| {
        create_error_response(ResponseTextCode::KeyGenerationFailed, None)
    })?;

    let nonce = Nonce::from_slice(nonce.as_slice()).unwrap();
    let total_chunks = (contents.len() + CHUNK_SIZE - 1) / CHUNK_SIZE;

    // Encrypt file in chunks
    for (index, chunk) in contents.chunks(CHUNK_SIZE).enumerate() {
        if let Err(_) = encrypt_core(&mut dist, chunk.to_vec(), &key, nonce) {
            let _ = remove_file(&output_path);
            return Err(create_error_response(
                ResponseTextCode::EncryptionFailed,
                Some(file_path.to_string()),
            ));
        }

        let elapsed = start_time.elapsed().as_secs_f64();
        let bytes_processed = (index + 1) * CHUNK_SIZE;
        let speed = if elapsed > 0.0 {
            bytes_processed as f64 / (1024.0 * 1024.0) / elapsed
        } else {
            0.0
        };
        
        let progress = ((index + 1) as f64 / total_chunks as f64) * 100.0;
        let remaining_chunks = total_chunks - (index + 1);
        let estimated_remaining = if speed > 0.0 {
            (remaining_chunks * CHUNK_SIZE) as f64 / (speed * 1024.0 * 1024.0)
        } else {
            0.0
        };

        let progress_info = ProgressInfo {
            percentage: progress,
            bytes_processed,
            total_bytes: contents.len(),
            speed_mbps: speed,
            elapsed_seconds: elapsed,
            estimated_remaining_seconds: estimated_remaining,
        };

        let event_name = format!("encryption_progress_{}", sanitize_path(file_path));
        app.emit(&event_name, &progress_info).unwrap();
        
        println!(
            "Encryption Progress: {:.1}% | Processed: {:.2} MB / {:.2} MB | Speed: {:.2} MB/s | Elapsed: {:.1}s | Remaining: {:.1}s",
            progress,
            bytes_processed as f64 / (1024.0 * 1024.0),
            contents.len() as f64 / (1024.0 * 1024.0),
            speed,
            elapsed,
            estimated_remaining
        );
    }

    let total_time = start_time.elapsed().as_secs_f64();
    let average_speed = contents.len() as f64 / (1024.0 * 1024.0) / total_time;
    
    println!(
        "Encryption completed in {:.1} seconds | Total size: {:.2} MB | Average speed: {:.2} MB/s",
        total_time,
        contents.len() as f64 / (1024.0 * 1024.0),
        average_speed
    );

    // Log success and return
    add_log_internal(
        LogLevel::Info,
        ResponseTextCode::EncryptionSuccessful,
        Some(output_path.display().to_string()),
    )
    .ok();

    Ok(AppResponse {
        status: Status::Success,
        text_code: ResponseTextCode::EncryptionSuccessful,
        file_path: Some(output_path.display().to_string()),
        timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string(),
        stats: Some(ProcessingStats {
            total_size_bytes: contents.len(),
            processing_time_seconds: total_time,
            average_speed_mbps: average_speed,
        }),
    })
}

#[tauri::command]
pub async fn decrypt_file(
    app: AppHandle,
    file_path: &str,
    password: &str,
) -> Result<AppResponse, AppResponse> {
    let start_time = Instant::now();
    
    // Validate password
    validate_password(password).map_err(|_| {
        create_error_response(ResponseTextCode::InvalidPassword, None)
    })?;

    // Open source file
    let source_file = File::open(file_path).map_err(|_| {
        create_error_response(ResponseTextCode::FileOpenFailed, Some(file_path.to_string()))
    })?;

    // Prepare output path
    let input_path = Path::new(file_path);
    let output_path = input_path
        .file_stem()
        .map(|stem| input_path.with_file_name(stem))
        .ok_or_else(|| {
            create_error_response(
                ResponseTextCode::FileNameExtractionFailed,
                Some(file_path.to_string()),
            )
        })?;

    let mut final_output_path = output_path.clone();
    if final_output_path.exists() {
        let timestamp = Local::now().format("%Y%m%dT%H%M%S");
        final_output_path = input_path.with_file_name(format!(
            "{}_{}.{}",
            output_path.file_stem().unwrap().to_str().unwrap(),
            timestamp,
            output_path.extension().unwrap().to_str().unwrap()
        ));
    }

    // Create output file
    let mut dist = File::create(&final_output_path).map_err(|_| {
        create_error_response(
            ResponseTextCode::FileCreationFailed,
            Some(final_output_path.display().to_string()),
        )
    })?;

    // Read source file
    let mut reader = BufReader::new(source_file);
    let contents = read_file_with_progress(&app, file_path, &mut reader, "read_progress").await?;

    // Extract nonce and prepare key
    let nonce = contents[..24].to_vec();
    let encrypted_data = contents[24..].to_vec();

    let key = create_key(password, nonce.clone()).map_err(|_| {
        create_error_response(ResponseTextCode::KeyGenerationFailed, None)
    })?;

    let nonce = Nonce::from_slice(nonce.as_slice()).unwrap();
    let total_chunks = (encrypted_data.len() + CHUNK_SIZE - 1) / CHUNK_SIZE;

    // Decrypt file in chunks
    for (index, chunk) in encrypted_data.chunks(CHUNK_SIZE).enumerate() {
        if let Err(text_code) = decrypt_core(&mut dist, chunk.to_vec(), &key, nonce) {
            let _ = remove_file(&final_output_path);
            return Err(create_error_response(text_code, Some(file_path.to_string())));
        }

        let elapsed = start_time.elapsed().as_secs_f64();
        let bytes_processed = (index + 1) * CHUNK_SIZE;
        let speed = if elapsed > 0.0 {
            bytes_processed as f64 / (1024.0 * 1024.0) / elapsed
        } else {
            0.0
        };
        
        let progress = ((index + 1) as f64 / total_chunks as f64) * 100.0;
        let remaining_chunks = total_chunks - (index + 1);
        let estimated_remaining = if speed > 0.0 {
            (remaining_chunks * CHUNK_SIZE) as f64 / (speed * 1024.0 * 1024.0)
        } else {
            0.0
        };

        let progress_info = ProgressInfo {
            percentage: progress,
            bytes_processed,
            total_bytes: encrypted_data.len(),
            speed_mbps: speed,
            elapsed_seconds: elapsed,
            estimated_remaining_seconds: estimated_remaining,
        };

        let event_name = format!("decryption_progress_{}", sanitize_path(file_path));
        app.emit(&event_name, &progress_info).unwrap();
        
        println!(
            "Decryption Progress: {:.1}% | Processed: {:.2} MB / {:.2} MB | Speed: {:.2} MB/s | Elapsed: {:.1}s | Remaining: {:.1}s",
            progress,
            bytes_processed as f64 / (1024.0 * 1024.0),
            encrypted_data.len() as f64 / (1024.0 * 1024.0),
            speed,
            elapsed,
            estimated_remaining
        );
    }

    let total_time = start_time.elapsed().as_secs_f64();
    let average_speed = encrypted_data.len() as f64 / (1024.0 * 1024.0) / total_time;
    
    println!(
        "Decryption completed in {:.1} seconds | Total size: {:.2} MB | Average speed: {:.2} MB/s",
        total_time,
        encrypted_data.len() as f64 / (1024.0 * 1024.0),
        average_speed
    );

    // Log success and return
    add_log_internal(
        LogLevel::Info,
        ResponseTextCode::DecryptionSuccessful,
        Some(final_output_path.display().to_string()),
    )
    .ok();

    Ok(AppResponse {
        text_code: ResponseTextCode::DecryptionSuccessful,
        status: Status::Success,
        file_path: Some(final_output_path.display().to_string()),
        timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string(),
        stats: Some(ProcessingStats {
            total_size_bytes: encrypted_data.len(),
            processing_time_seconds: total_time,
            average_speed_mbps: average_speed,
        }),
    })
}
