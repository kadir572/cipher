pub mod duckdb;
pub mod schema;

pub use duckdb::{add_log, add_log_internal, clear_logs, download_logs, get_logs};
