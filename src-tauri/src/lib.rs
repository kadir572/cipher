use dotenv::dotenv;
use reqwest::Client;
use serde_json::Value;
use std::env;
use std::fs::{File, remove_file};
use std::io::{BufReader, Read, Write};
use std::path::Path;
use chrono::Local;

use orion::hazardous::{
    aead::xchacha20poly1305::{seal, open, Nonce, SecretKey},
    mac::poly1305::POLY1305_OUTSIZE,
    stream::xchacha20::XCHACHA_NONCESIZE
};

use orion::hazardous::stream::chacha20::CHACHA_KEYSIZE;
use orion::kdf::{derive_key, Password, Salt};
use rand_core::{OsRng, RngCore};
use serde::Serialize;
use tauri::{AppHandle, Emitter};

#[derive(Serialize, Debug)]
#[serde(rename_all = "snake_case")]
enum ErrorType {
    EncryptionFailed,
    FileOpenFailed,
    FileReadFailed,
    FileCreationFailed,
    KeyGenerationFailed,
    ParentDirectoryRetrieveFailed,
    PlainTextTooLong,
    FileNameExtractionFailed,
    FileExtensionExtractionFailed,
    InvalidPassword,
    FilenameGenerationFailed
}

#[derive(Serialize, Debug)]
#[serde(rename_all = "snake_case")]
struct EncryptionError {
    type_: ErrorType,
    timestamp: String
}

#[derive(Serialize, Debug)]
#[serde(rename_all = "snake_case")]
struct EncryptionResponse {
    type_: String,
    file_path: String,
    timestamp: String
}

fn validate_password(password: &str) -> Result<(), ()> {

    if password.len() < 8 {
        return Err(())
    }

    if password.len() > 32 {
        return Err(())    }

    if !password.chars().any(|c| c.is_uppercase()) {
        return Err(())    }

    if !password.chars().any(|c| c.is_lowercase()) {
        return Err(())    }

    if !password.chars().any(|c| c.is_numeric()) {
        return Err(())    }

    if !password.chars().any(|c| "!@#$%^&*()_+-=[]{}|;:',.<>?".contains(c)) {
        return Err(())    }

    Ok(())
}

fn split_encrypted(cipher_text: &[u8]) -> (Vec<u8>, Vec<u8>) {
    return (
        cipher_text[..CHACHA_KEYSIZE].to_vec(),
        cipher_text[CHACHA_KEYSIZE..].to_vec(),
        )
}

fn get_random(dest: &mut [u8]) {
    RngCore::fill_bytes(&mut OsRng, dest);
}

fn generate_nonce() -> Vec<u8> {
    let mut randoms: [u8; 24] = [0; 24];
    get_random(&mut randoms);
    return randoms.to_vec();
}

fn generate_auth_tag() -> Vec<u8> {
    let mut randoms: [u8; 32] = [0; 32];
    get_random(&mut randoms);
    return randoms.to_vec();
}

fn create_key(password: &str, nonce: Vec<u8>) -> Result<SecretKey, ()> {
    let password = Password::from_slice(password.as_bytes()).map_err(|_| ())?;
    let salt = Salt::from_slice(nonce.as_slice()).map_err(|_| ())?;
    let kdf_key = derive_key(&password, &salt, 15, 1024, CHACHA_KEYSIZE as u32).map_err(|_| ())?;
    let key = SecretKey::from_slice(kdf_key.unprotected_as_bytes()).map_err(|_| ())?;

    Ok(key)
}

fn encrypt_core(
    dist: &mut File,
    contents: Vec<u8>,
    key: &SecretKey,
    nonce: Nonce,
) -> Result<(), EncryptionError> {
    let ad = generate_auth_tag();
    
    // Check if output length calculation is valid
    let output_len = match contents.len().checked_add(POLY1305_OUTSIZE + ad.len()) {
        Some(min_output_len) => min_output_len,
        None => return Err(EncryptionError {
            type_: ErrorType::PlainTextTooLong,
            timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
        }), // If it overflows, return the error immediately
    };

    let mut output = vec![0u8; output_len];
    output[..CHACHA_KEYSIZE].copy_from_slice(ad.as_ref());
    
    // Attempt encryption
    match seal(&key, &nonce, contents.as_slice(), Some(ad.clone().as_slice()), &mut output[CHACHA_KEYSIZE..]) {
        Ok(_) => {
            dist.write_all(&output).unwrap(); // Write the encrypted data to the file
            Ok(())
        }
        Err(_) => Err(EncryptionError {
            type_: ErrorType::EncryptionFailed,
            timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
        }), // Map the unknown error to EncryptionError
    }
}


fn decrypt_core(
    dist: &mut File,
    contents: Vec<u8>,
    key: &SecretKey,
    nonce: Nonce
) -> Result<(), EncryptionError> {
    let split = split_encrypted(contents.as_slice());
    let mut output = vec![0u8; split.1.len() - POLY1305_OUTSIZE];

    if let Err(_) = open(&key, &nonce, split.1.as_slice(), Some(split.0.as_slice()), &mut output) {
        println!("Failed to decrypt due to pwd.");
        return Err(EncryptionError {
            type_: ErrorType::InvalidPassword,
            timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
        })
    }
    dist.write(&output.as_slice()).unwrap();

    Ok(())
}

const CHUNK_SIZE: usize = 16384;

#[tauri::command]
async fn encrypt_file(app: AppHandle, file_path: &str, password: &str) -> Result<EncryptionResponse, EncryptionError> {
    // ***********************************************************
    // PASSWORD VALIDATION START
    // ***********************************************************

    validate_password(&password).map_err(|_| EncryptionError {
        type_: ErrorType::InvalidPassword,
        timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
    })?;

    // ***********************************************************
    // PASSWORD VALIDATION END
    // ***********************************************************
    // ***********************************************************
    // FILE HANDLING START
    // ***********************************************************
    let source_file = File::open(file_path).map_err(|_| EncryptionError {
        type_: ErrorType::FileOpenFailed,
        timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
    })?;

    let input_path = Path::new(file_path);
    let parent_dir = input_path.parent().ok_or(EncryptionError {
        type_: ErrorType::ParentDirectoryRetrieveFailed,
        timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
    })?;
    let file_stem = input_path.file_stem().and_then(|stem| stem.to_str()).ok_or(EncryptionError {
        type_: ErrorType::FileNameExtractionFailed,
        timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
    })?.to_string();
    let file_extension = input_path.extension().and_then(|ext| ext.to_str()).ok_or(EncryptionError {
        type_: ErrorType::FileExtensionExtractionFailed,
        timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
    })?.to_string();
    let mut output_path = parent_dir.join(format!("{}.{}.enc", file_stem, file_extension));
    if output_path.exists() {
        let timestamp = Local::now().format("%Y%m%dT%H%M%S");
        output_path = parent_dir.join(format!("{}_{}.{}.enc", file_stem, timestamp, file_extension));
    }
    let mut dist = File::create(&output_path).map_err(|_| EncryptionError {
        type_: ErrorType::FileCreationFailed,
        timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
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
    let key = match create_key(password, nonce.clone()) {
        Ok(key) => key,
        Err(_) => return Err(EncryptionError {
            type_: ErrorType::KeyGenerationFailed,
            timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
        }), // Return the error if key generation fails
    };
    let nonce = Nonce::from_slice(nonce.as_slice()).unwrap();
    let total_chunks = (src.len() + CHUNK_SIZE - 1) / CHUNK_SIZE;

    for (index, src_chunk) in src.chunks(CHUNK_SIZE).enumerate() {
        if let Err(e) = encrypt_core(&mut dist, src_chunk.to_vec(), &key, nonce) {
            let _ = remove_file(&output_path); // Delete output file on encryption failure
            return Err(e); // Return the encryption error to the frontend
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

    Ok(EncryptionResponse {
        type_: "encryption_successful".to_string(),
        file_path: output_path.display().to_string(),
        timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
    })

    // ***********************************************************
    // ENCRYPTION LOGIC END
    // ***********************************************************
}


#[tauri::command]
async fn decrypt_file(app: AppHandle, file_path: &str, password: &str) -> Result<EncryptionResponse, EncryptionError> {
    let mut source_file = match File::open(file_path) {
        Ok(file) => file,
        Err(_) => return Err(EncryptionError {
            type_: ErrorType::FileOpenFailed,
            timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
        }),
    };

    let input_path = Path::new(file_path);

    // Prepare the output file path by stripping `.enc` extension
    let output_path = match input_path.file_stem() {
        Some(stem) => input_path.with_file_name(stem),
        None => return Err(EncryptionError {
            type_: ErrorType::FilenameGenerationFailed,
            timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
        }),
    };

    // Check if the output file already exists
    let mut final_output_path = output_path.clone();
    if final_output_path.exists() {
        let timestamp = Local::now().format("%Y%m%dT%H%M%S").to_string();
        final_output_path = input_path.with_file_name(format!("{}_{}.{}", output_path.file_stem().unwrap().to_str().unwrap(), timestamp, output_path.extension().unwrap().to_str().unwrap()));
    }

    let mut dist = match File::create(&final_output_path) {
        Ok(file) => file,
        Err(_) => return Err(EncryptionError {
            type_: ErrorType::FileCreationFailed,
            timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
        }),
    };

    let mut src: Vec<u8> = Vec::new();
    if let Err(_) = source_file.read_to_end(&mut src) {
        return Err(EncryptionError {
            type_: ErrorType::FileReadFailed,
            timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
        }); 
    }

    let nonce = src[..XCHACHA_NONCESIZE].to_vec();
    src = src[XCHACHA_NONCESIZE..].to_vec();

     let key = match create_key(password, nonce.clone()) {
        Ok(key) => key,
        Err(_) => return Err(EncryptionError {
            type_: ErrorType::KeyGenerationFailed,
            timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
        })
    };

    let nonce = Nonce::from_slice(nonce.as_slice()).unwrap();
    let total_chunks = (src.len() + CHUNK_SIZE - 1) / CHUNK_SIZE;

    for (index, src_chunk) in src.chunks(CHUNK_SIZE + CHACHA_KEYSIZE + POLY1305_OUTSIZE).enumerate() {
        if let Err(e) = decrypt_core(&mut dist, src_chunk.to_vec(), &key, nonce) {
            let _ = remove_file(&final_output_path);
            return Err(e);  // Return the error and stop execution
        }   

        let progress = ((index + 1) as f64 / total_chunks as f64) * 100.0;

        let event_name = format!(
            "decryption_progress_{}",
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

        Ok(EncryptionResponse {
            type_: "decryption_successful".to_string(),
            file_path: output_path.display().to_string(),
            timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string()
        })
}


#[derive(Serialize)]
struct StripeResponse {
    client_secret: String,
    amount: u64,
    currency: String
}

#[derive(Serialize)]
struct StripeError {
    code: String,
    message: String,
    param: Option<String>,
    doc_url: String,
}

#[tauri::command]
async fn get_stripe_client_secret(amount: u64, currency: &str) -> Result<StripeResponse, StripeError> {
    dotenv().ok();

    // Access the Vercel environment variable to determine if it's development or production
    let is_development = match env::var("TAURI_ENV") {
        Ok(val) => val == "dev", // If it's "production", set the flag to true
        Err(_) => false, // Default to false (development) if the variable is not set (for local runs)
    };

    // Set the API URL depending on the environment (using the boolean flag)
    let api_url = if is_development {
        "http://127.0.0.1:3000/create-payment-intent" // Local URL for development
    } else {
        "https://cipher-payments-api.vercel.app/create-payment-intent" // Vercel URL for production
    };

    // Create a new HTTP client
    let client = Client::new();

    // Prepare the data to be sent to the API
    let payment_data = serde_json::json!({
        "amount": amount,
        "currency": currency,
    });

    // Send the POST request to your API
    let response = client
        .post(api_url)
        .json(&payment_data)
        .send()
        .await
        .map_err(|e| StripeError {
            code: "network_error".to_string(),
            message: format!("Error calling the payment API: {}", e),
            param: None,
            doc_url: String::new(),
        })?;

    // Parse the response
    let json: Value = response.json().await.map_err(|e| StripeError {
        code: "json_parse_error".to_string(),
        message: format!("Error parsing JSON response: {}", e),
        param: None,
        doc_url: String::new(),
    })?;

    // Check if the client_secret is in the response
    if let Some(client_secret) = json["clientSecret"].as_str() {
        // Return the response as expected
        Ok(StripeResponse {
            client_secret: client_secret.to_string(),
            amount,
            currency: currency.to_string(),
        })
    } else {
        // Handle error if client_secret is not returned
        Err(StripeError {
            code: json["error"]["code"].as_str().unwrap_or("unknown").to_string(),
            message: json["error"]["message"].as_str().unwrap_or("Unknown error").to_string(),
            param: json["error"]["param"].as_str().map(|s| s.to_string()),
            doc_url: json["error"]["doc_url"].as_str().unwrap_or("").to_string(),
        })
    }
}


#[tauri::command]
async fn check_network() -> Result<String, String> {
    match reqwest::get("https://google.com").await {
        Ok(_) => Ok("Network is avaiable".to_string()),
        Err(e) => Err(format!("Network error: {}", e))
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![encrypt_file, decrypt_file, get_stripe_client_secret, check_network
            ])
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}