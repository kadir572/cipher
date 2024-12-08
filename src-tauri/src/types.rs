use serde::{Deserialize, Serialize};
use strum_macros::{Display, EnumString, AsRefStr};

#[derive(Debug, Serialize)]
pub struct ProgressInfo {
    pub percentage: f64,
    pub bytes_processed: usize,
    pub total_bytes: usize,
    pub speed_mbps: f64,
    pub elapsed_seconds: f64,
    pub estimated_remaining_seconds: f64,
}

#[derive(Debug, Serialize)]
pub struct ProcessingStats {
    pub total_size_bytes: usize,
    pub processing_time_seconds: f64,
    pub average_speed_mbps: f64,
}

#[derive(Debug, Serialize, Deserialize, Clone, Display, EnumString, AsRefStr)]
#[strum(serialize_all = "snake_case")]
#[serde(rename_all = "snake_case")]
pub enum ResponseTextCode {
    #[strum(serialize = "encryption_successful", to_string = "Encryption successful")]
    EncryptionSuccessful,
    #[strum(serialize = "decryption_successful", to_string = "Decryption successful")]
    DecryptionSuccessful,
    #[strum(serialize = "encryption_failed", to_string = "Encryption failed")]
    EncryptionFailed,
    #[strum(serialize = "decryption_failed", to_string = "Decryption failed")]
    DecryptionFailed,
    #[strum(serialize = "file_open_failed", to_string = "File open failed")]
    FileOpenFailed,
    #[strum(serialize = "file_read_failed", to_string = "File read failed")]
    FileReadFailed,
    #[strum(serialize = "file_creation_failed", to_string = "File creation failed")]
    FileCreationFailed,
    #[strum(serialize = "key_generation_failed", to_string = "Key generation failed")]
    KeyGenerationFailed,
    #[strum(serialize = "invalid_password", to_string = "Invalid password")]
    InvalidPassword,
    #[strum(serialize = "db_conn_failed", to_string = "Database connection failed")]
    DbConnFailed,
    #[strum(serialize = "parent_directory_retrieve_failed", to_string = "Parent directory retrieve failed")]
    ParentDirectoryRetrieveFailed,
    #[strum(serialize = "file_name_extraction_failed", to_string = "File name extraction failed")]
    FileNameExtractionFailed,
    #[strum(serialize = "file_extension_extraction_failed", to_string = "File extension extraction failed")]
    FileExtensionExtractionFailed,
    #[strum(serialize = "file_creation_successful", to_string = "File creation successful")]
    FileCreationSuccessful,
    #[strum(serialize = "logs_downloaded", to_string = "Logs downloaded")]
    LogsDownloaded,
}

#[derive(Debug, Serialize, Deserialize, Clone, Display, EnumString, AsRefStr)]
#[strum(serialize_all = "snake_case")]
#[serde(rename_all = "snake_case")]
pub enum LogLevel {
    Info,
    Error,
    Warning,
    Debug,
    Trace,
    Critical,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "snake_case")]
pub enum Status {
    Success,
    Error,
}

// Response types
#[derive(Debug, Serialize)]
pub struct AppResponse {
    pub status: Status,
    pub text_code: ResponseTextCode,
    pub file_path: Option<String>,
    pub timestamp: String,
    pub stats: Option<ProcessingStats>,
}

#[derive(Debug, Serialize)]
pub struct Log {
    pub timestamp: i64,
    pub level: LogLevel,
    pub text_code: ResponseTextCode,
    pub file_path: Option<String>,
}
