use std::{fs::{remove_file, File}, io::{BufReader, Read, Write}, path::Path};
use chrono::Local;
use orion::hazardous::{
  aead::xchacha20poly1305::{open, seal, Nonce, SecretKey},
  mac::poly1305::POLY1305_OUTSIZE,
  stream::chacha20::CHACHA_KEYSIZE
};
use tauri::{AppHandle, Emitter};

use crate::{logs::add_log_internal, types::{AppResponse, LogLevel, ResponseTextCode, Status}};

use super::helpers::{create_key, generate_auth_tag, generate_nonce, split_encrypted, validate_password};

fn encrypt_core(
  dist: &mut File,
  contents: Vec<u8>,
  key: &SecretKey,

  nonce: Nonce,
) -> Result<(), String> {
  let ad = generate_auth_tag();
  
  // Check if output length calculation is valid
  let output_len = contents.len().checked_add(POLY1305_OUTSIZE + ad.len()).ok_or("Plain text too long")?;

  let mut output = vec![0u8; output_len];
  output[..CHACHA_KEYSIZE].copy_from_slice(ad.as_ref());
  
  // Attempt encryption
  seal(&key, &nonce, contents.as_slice(), Some(ad.clone().as_slice()), &mut output[CHACHA_KEYSIZE..]).map_err(|_| "Encryption failed")?;
  dist.write_all(&output).map_err(|_| "Failed to write encrypted data")?;
  Ok(())
}


fn decrypt_core(
  dist: &mut File,
  contents: Vec<u8>,
  key: &SecretKey,
  nonce: Nonce
) -> Result<(), ResponseTextCode> {
  let split = split_encrypted(contents.as_slice());
  let mut output = vec![0u8; split.1.len() - POLY1305_OUTSIZE];

  if let Err(_) = open(&key, &nonce, split.1.as_slice(), Some(split.0.as_slice()), &mut output) {
      return Err(ResponseTextCode::InvalidPassword);
  }
  dist.write(&output.as_slice()).map_err(|_| ResponseTextCode::DecryptionFailed)?;

  Ok(())
}
const CHUNK_SIZE: usize = 16384;

#[tauri::command]
pub async fn encrypt_file(app: AppHandle, file_path: &str, password: &str) -> Result<AppResponse, AppResponse> {
  // ***********************************************************
  // PASSWORD VALIDATION START
  // ***********************************************************

  validate_password(&password).map_err(|_| {
    add_log_internal(LogLevel::Error, ResponseTextCode::InvalidPassword, None).ok();
    AppResponse {
      status: Status::Error,
      text_code: ResponseTextCode::InvalidPassword,
      file_path: None,
      timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
    }
  })?;

let source_file = File::open(file_path).map_err(|_| {
  add_log_internal(LogLevel::Error, ResponseTextCode::FileOpenFailed, Some(file_path.to_string())).ok();
  AppResponse {
    status: Status::Error,
    text_code: ResponseTextCode::FileOpenFailed,
    file_path: None,
    timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
  }
})?;

  let input_path = Path::new(file_path);
  let parent_dir = input_path.parent().ok_or(AppResponse {
    status: Status::Error,
    text_code: ResponseTextCode::ParentDirectoryRetrieveFailed,
    file_path: None,
    timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
  })?;
  let file_stem = input_path.file_stem().and_then(|stem| stem.to_str()).ok_or(AppResponse {
    status: Status::Error,
    text_code: ResponseTextCode::FileNameExtractionFailed,
    file_path: None,
    timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
  })?.to_string();
  let file_extension = input_path.extension().and_then(|ext| ext.to_str()).ok_or(AppResponse {
    status: Status::Error,
    text_code: ResponseTextCode::FileExtensionExtractionFailed,
    file_path: None,
    timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
  })?.to_string();
  let mut output_path = parent_dir.join(format!("{}.{}.enc", file_stem, file_extension));
  if output_path.exists() {
      let timestamp = Local::now().format("%Y%m%dT%H%M%S");
      output_path = parent_dir.join(format!("{}_{}.{}.enc", file_stem, timestamp, file_extension));
  }
  let mut dist = File::create(&output_path).map_err(|_| {
    add_log_internal(LogLevel::Error, ResponseTextCode::FileCreationFailed, Some(output_path.display().to_string())).ok();
    AppResponse {
      status: Status::Error,
      text_code: ResponseTextCode::FileCreationFailed,
      file_path: None,
      timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
    }
  })?;

  let mut buf_reader = BufReader::new(source_file);
  let mut src = Vec::new();
  let mut buffer = [0u8; CHUNK_SIZE];
  while let Ok(bytes_read) = buf_reader.read(&mut buffer) {
      if bytes_read == 0 {
          break;
      }
      src.extend_from_slice(&buffer[..bytes_read]);
  }

  // ***********************************************************
  // ENCRYPTION LOGIC START
  // ***********************************************************

  let nonce = generate_nonce();

  dist.write(nonce.as_slice()).unwrap();
  let key = create_key(password, nonce.clone()).map_err(|_| {
    add_log_internal(LogLevel::Error, ResponseTextCode::KeyGenerationFailed, None).ok();
    AppResponse {
      status: Status::Error,
      text_code: ResponseTextCode::KeyGenerationFailed,
      file_path: None,
      timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
    }
  })?;

  let nonce = Nonce::from_slice(nonce.as_slice()).unwrap();
  let total_chunks = (src.len() + CHUNK_SIZE - 1) / CHUNK_SIZE;

  for (index, src_chunk) in src.chunks(CHUNK_SIZE).enumerate() {
      if let Err(_) = encrypt_core(&mut dist, src_chunk.to_vec(), &key, nonce) {
          let _ = remove_file(&output_path); // Delete output file on encryption failure
          add_log_internal(LogLevel::Error, ResponseTextCode::EncryptionFailed, Some(file_path.to_string())).ok();
          return Err(AppResponse {
            status: Status::Error,
            text_code: ResponseTextCode::EncryptionFailed,
            file_path: None,
            timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
          }); // Return the encryption error to the frontend
      }

      let progress = ((index + 1) as f64 / total_chunks as f64) * 100.0;

      println!("Encrypting file: {} | Chunk {}/{} | Progress: {:.2}%", 
      file_path, 
      index + 1, 
      total_chunks, 
      progress);

      let event_name = format!(
          "encryption_progress_{}",
          file_path
              .chars()
              .map(|c| {
                  if c.is_alphanumeric() || c == '-' || c == '/' || c == ':' || c == '_' {
                      c
                  } else {
                      '_'
                  }
              })
              .collect::<String>()
      );

      app.emit(&event_name, progress).unwrap();
  }

  add_log_internal(
    LogLevel::Info, 
    ResponseTextCode::EncryptionSuccessful,
    Some(output_path.display().to_string())
  ).ok();

  Ok(AppResponse {
      status: Status::Success,
      text_code: ResponseTextCode::EncryptionSuccessful,
      file_path: Some(output_path.display().to_string()),
      timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string(),
  })

  // ***********************************************************
  // ENCRYPTION LOGIC END
  // ***********************************************************
}


#[tauri::command]
pub async fn decrypt_file(app: AppHandle, file_path: &str, password: &str) -> Result<AppResponse, AppResponse> {
    // Password validation
    validate_password(&password).map_err(|_| {
        add_log_internal(LogLevel::Error, ResponseTextCode::InvalidPassword, None).ok();
        AppResponse {
            text_code: ResponseTextCode::InvalidPassword,
            status: Status::Error,
            file_path: None,
            timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string(),
        }
    })?;

    // Open source file
    let mut source_file = File::open(file_path).map_err(|_| {
        add_log_internal(LogLevel::Error, ResponseTextCode::FileOpenFailed, Some(file_path.to_string())).ok();
        AppResponse {
            text_code: ResponseTextCode::FileOpenFailed,
            status: Status::Error,
            file_path: None,
            timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string(),
        }
    })?;

    // Prepare output file path
    let input_path = Path::new(file_path);
    let output_path = input_path.file_stem().map(|stem| input_path.with_file_name(stem)).ok_or_else(|| {
        add_log_internal(LogLevel::Error, ResponseTextCode::FileNameExtractionFailed, Some(file_path.to_string())).ok();
        AppResponse {
            text_code: ResponseTextCode::FileNameExtractionFailed,
            status: Status::Error,
            file_path: None,
            timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string(),
        }
    })?;

    let mut final_output_path = output_path.clone();
    if final_output_path.exists() {
        let timestamp = Local::now().format("%Y%m%dT%H%M%S").to_string();
        final_output_path = input_path.with_file_name(format!("{}_{}.{}", 
            output_path.file_stem().unwrap().to_str().unwrap(), 
            timestamp, 
            output_path.extension().unwrap().to_str().unwrap()));
    }

    let mut dist = File::create(&final_output_path).map_err(|_| {
        add_log_internal(LogLevel::Error, ResponseTextCode::FileCreationFailed, Some(final_output_path.display().to_string())).ok();
        AppResponse {
            text_code: ResponseTextCode::FileCreationFailed,
            status: Status::Error,
            file_path: None,
            timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string(),
        }
    })?;

    // Read source file
    let mut src: Vec<u8> = Vec::new();
    source_file.read_to_end(&mut src).map_err(|_| {
        add_log_internal(LogLevel::Error, ResponseTextCode::FileReadFailed, Some(file_path.to_string())).ok();
        AppResponse {
            text_code: ResponseTextCode::FileReadFailed,
            status: Status::Error,
            file_path: None,
            timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string(),
        }
    })?;

    // Extract nonce and prepare key
    let nonce = src[..24].to_vec();
    src = src[24..].to_vec();

    let key = create_key(password, nonce.clone()).map_err(|_| {
        add_log_internal(LogLevel::Error, ResponseTextCode::KeyGenerationFailed, None).ok();
        AppResponse {
            text_code: ResponseTextCode::KeyGenerationFailed,
            status: Status::Error,
            file_path: None,
            timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string(),
        }
    })?;
    let nonce = Nonce::from_slice(nonce.as_slice()).unwrap();

    // Decrypt file with progress tracking
    let total_chunks = (src.len() + 16384 + 32 + 16 - 1) / (16384 + 32 + 16);
    for (index, src_chunk) in src.chunks(16384 + 32 + 16).enumerate() {
        if let Err(text_code) = decrypt_core(&mut dist, src_chunk.to_vec(), &key, nonce) {
            let _ = remove_file(&final_output_path); // Delete output file on decryption failure
            add_log_internal(LogLevel::Error, text_code.clone(), Some(file_path.to_string())).ok();
            return Err(AppResponse {
                text_code,
                status: Status::Error,
                file_path: None,
                timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string(),
            });
        }

        // Calculate and emit progress
        let progress = ((index + 1) as f64 / total_chunks as f64) * 100.0;
        let event_name = format!(
            "decryption_progress_{}",
            file_path
                .chars()
                .map(|c| if c.is_alphanumeric() || c == '-' || c == '/' || c == ':' || c == '_' { c } else { '_' })
                .collect::<String>()
        );
        app.emit(&event_name, progress).unwrap();
    }

    // Log successful decryption
    add_log_internal(
        LogLevel::Info, 
        ResponseTextCode::DecryptionSuccessful,
        Some(final_output_path.display().to_string())
    ).ok();
    
    // Return success response
    Ok(AppResponse {
        text_code: ResponseTextCode::DecryptionSuccessful,
        status: Status::Success,
        file_path: Some(final_output_path.display().to_string()),
        timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string(),
    })
}
