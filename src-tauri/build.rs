use std::env;

fn main() {
    match env::var("STRIPE_SECRET_KEY") {
        Ok(val) => println!("cargo:warning=STRIPE_SECRET_KEY is available: {}", val),
        Err(e) => eprintln!("cargo:warning=Error accessing STRIPE_SECRET_KEY: {}", e),
    }
    tauri_build::build()
}
