use std::env;

fn main() {
    match env::var("STRIPE_SECRET_KEY") {
        Ok(val) => println!("cargo:warning=STRIPE_SECRET_KEY is available: {}", val),
        Err(e) => eprintln!("cargo:warning=Error accessing STRIPE_SECRET_KEY: {}", e),
    }

    if let Ok(stripe_secret) = std::env::var("STRIPE_SECRET_KEY") {
        println!("cargo:rustc-env=STRIPE_SECRET_KEY={}", stripe_secret);
    }
    tauri_build::build()
}
