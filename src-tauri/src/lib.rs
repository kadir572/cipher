pub mod encryption;
pub mod log;
pub mod network;
pub mod stripe;
pub mod types;

use encryption::{decrypt_file, encrypt_file};
use log::duckdb::{add_log, clear_logs, download_logs, get_logs};
use ::log::LevelFilter;
use network::check_network;
use stripe::get_stripe_client_secret;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            encrypt_file,
            decrypt_file,
            get_stripe_client_secret,
            check_network,
            add_log,
            get_logs,
            clear_logs,
            download_logs
        ])
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
