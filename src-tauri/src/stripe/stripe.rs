use dotenv::dotenv;
use std::env;
use reqwest::Client;
use serde_json::Value;
use crate::stripe::types::{StripeError, StripeResponse};

const LOCAL_API_URL: &str = "http://127.0.0.1:3000/create-payment-intent";
const PROD_API_URL: &str = "https://cipher-payments-api.vercel.app/create-payment-intent";

/// Creates a payment intent through Stripe's API
/// 
/// # Arguments
/// * `amount` - The payment amount in cents
/// * `currency` - The three-letter currency code (e.g., "usd")
/// 
/// # Returns
/// * `Ok(StripeResponse)` - Payment intent created successfully
/// * `Err(StripeError)` - Error creating payment intent
#[tauri::command]
pub async fn get_stripe_client_secret(
    amount: u64,
    currency: &str,
) -> Result<StripeResponse, StripeError> {
    dotenv().ok();

    let api_url = match env::var("TAURI_ENV") {
        Ok(val) if val == "dev" => LOCAL_API_URL,
        _ => PROD_API_URL,
    };

    let payment_data = serde_json::json!({
        "amount": amount,
        "currency": currency,
    });

    let response = Client::new()
        .post(api_url)
        .json(&payment_data)
        .send()
        .await
        .map_err(|e| StripeError {
            code: "network_error".into(),
            message: format!("Error calling the payment API: {e}"),
            param: None,
            doc_url: String::new(),
        })?;

    let json: Value = response.json().await.map_err(|e| StripeError {
        code: "json_parse_error".into(),
        message: format!("Error parsing JSON response: {e}"),
        param: None,
        doc_url: String::new(),
    })?;

    match json["clientSecret"].as_str() {
        Some(client_secret) => Ok(StripeResponse {
            client_secret: client_secret.to_string(),
            amount,
            currency: currency.to_string(),
        }),
        None => Err(StripeError {
            code: json["error"]["code"]
                .as_str()
                .unwrap_or("unknown")
                .to_string(),
            message: json["error"]["message"]
                .as_str()
                .unwrap_or("Unknown error")
                .to_string(),
            param: json["error"]["param"].as_str().map(String::from),
            doc_url: json["error"]["doc_url"]
                .as_str()
                .unwrap_or("")
                .to_string(),
        }),
    }
}
