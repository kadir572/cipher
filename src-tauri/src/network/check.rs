use reqwest;

#[tauri::command]
pub async fn check_network() -> Result<String, String> {
    match reqwest::get("https://google.com").await {
        Ok(_) => Ok("Network is available".to_string()),
        Err(e) => Err(format!("Network error: {}", e)),
    }
}
