// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;

fn main() {
    match env::var("STRIPE_SECRET_KEY") {
        Ok(val) => println!("Stripe Secret Key is available!"),
        Err(e) => eprintln!("Error accessing STRIPE_SECRET_KEY: {}", e),
    };
    app_lib::run();
}
