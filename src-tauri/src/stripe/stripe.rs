use std::env;
use dotenv::dotenv;

use reqwest::Client;
use serde_json::Value;

use crate::stripe::types::{StripeError, StripeResponse};

#[tauri::command]
pub async fn get_stripe_client_secret(amount: u64, currency: &str) -> Result<StripeResponse, StripeError> {
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