use reqwest;
use serde::{Serialize, Deserialize};
use thiserror::Error;
use std::time::Duration;

/// Possible network check errors
#[derive(Debug, Error, Serialize, Deserialize)]
#[error("Network error: {0}")]
pub struct NetworkError(String);

/// Checks network connectivity using DNS lookup
/// 
/// Uses multiple reliable DNS servers with a short timeout
#[tauri::command]
pub async fn check_network() -> Result<String, NetworkError> {
    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(5))
        .build()
        .map_err(|e| NetworkError(e.to_string()))?;

    // Try Cloudflare's DNS first, then Google's if that fails
    for &url in &["1.1.1.1", "8.8.8.8"] {
        if client.get(format!("http://{}", url))
            .send()
            .await
            .is_ok() {
            return Ok("Network is available".to_string());
        }
    }

    Err(NetworkError("No network connection".to_string()))
}
