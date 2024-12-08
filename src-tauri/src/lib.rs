pub mod encryption;
pub mod logs;
pub mod network;
pub mod stripe;
pub mod types;
use encryption::{decrypt_file, encrypt_file};
use logs::duckdb::{add_log, clear_all_logs, download_logs, get_all_logs};
use network::check_network;
use stripe::get_stripe_client_secret;
use tauri_plugin_fs::FsExt;

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
            get_all_logs,
            clear_all_logs,
            download_logs
        ])
        .setup(|app| {
            let scope = app.fs_scope();
            scope.allow_directory("/Downloads", false);
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
