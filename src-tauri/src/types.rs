use std::{fmt, str::FromStr};

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "snake_case")]
pub enum ResponseTextCode {
  EncryptionSuccessful,
  DecryptionSuccessful,
  EncryptionFailed,
  DecryptionFailed,
  FileOpenFailed,
  FileReadFailed,
  FileCreationFailed,
  KeyGenerationFailed,
  InvalidPassword,
  DbConnFailed,
  ParentDirectoryRetrieveFailed,
  FileNameExtractionFailed,
  FileExtensionExtractionFailed,
  FileCreationSuccessful,
  LogsDownloaded,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
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

impl fmt::Display for ResponseTextCode {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    write!(f, "{}", self.as_str())
  }
}

impl FromStr for ResponseTextCode {
  type Err = ();

  fn from_str(s: &str) -> Result<Self, Self::Err> {
    match s {
      "encryption_successful" => Ok(ResponseTextCode::EncryptionSuccessful),
      "decryption_successful" => Ok(ResponseTextCode::DecryptionSuccessful),
      "encryption_failed" => Ok(ResponseTextCode::EncryptionFailed),
      "decryption_failed" => Ok(ResponseTextCode::DecryptionFailed),
      "file_open_failed" => Ok(ResponseTextCode::FileOpenFailed),
      "file_read_failed" => Ok(ResponseTextCode::FileReadFailed),
      "file_creation_failed" => Ok(ResponseTextCode::FileCreationFailed),
      "key_generation_failed" => Ok(ResponseTextCode::KeyGenerationFailed),
      "invalid_password" => Ok(ResponseTextCode::InvalidPassword),
      "db_conn_failed" => Ok(ResponseTextCode::DbConnFailed),
      "parent_directory_retrieve_failed" => Ok(ResponseTextCode::ParentDirectoryRetrieveFailed),
      "file_name_extraction_failed" => Ok(ResponseTextCode::FileNameExtractionFailed),
      "file_extension_extraction_failed" => Ok(ResponseTextCode::FileExtensionExtractionFailed),
      "file_creation_successful" => Ok(ResponseTextCode::FileCreationSuccessful),
      "logs_downloaded" => Ok(ResponseTextCode::LogsDownloaded),
      _ => Err(()),
    }
  }
}

impl fmt::Display for LogLevel {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    write!(f, "{}", self.as_str())
  }
}

impl FromStr for LogLevel {
  type Err = ();

  fn from_str(s: &str) -> Result<Self, Self::Err> {
    match s {
      "info" => Ok(LogLevel::Info),
      "error" => Ok(LogLevel::Error),
      "warning" => Ok(LogLevel::Warning),
      "debug" => Ok(LogLevel::Debug),
      "trace" => Ok(LogLevel::Trace),
      "critical" => Ok(LogLevel::Critical),
      _ => Err(()),
    }
  }
}

impl LogLevel {
  pub fn as_str(&self) -> &'static str {
    match self {
      Self::Info => "info",
      Self::Error => "error",
      Self::Warning => "warning",
      Self::Debug => "debug",
      Self::Trace => "trace",
      Self::Critical => "critical",
    }
  }
}

impl ResponseTextCode {
  pub fn as_str(&self) -> &'static str {
    match self {
      ResponseTextCode::EncryptionSuccessful => "Encryption successful",
      ResponseTextCode::DecryptionSuccessful => "Decryption successful",
      ResponseTextCode::EncryptionFailed => "Encryption failed",
      ResponseTextCode::DecryptionFailed => "Decryption failed",
      ResponseTextCode::FileOpenFailed => "File open failed",
      ResponseTextCode::FileReadFailed => "File read failed",
      ResponseTextCode::FileCreationFailed => "File creation failed",
      ResponseTextCode::KeyGenerationFailed => "Key generation failed",
      ResponseTextCode::InvalidPassword => "Invalid password",
      ResponseTextCode::DbConnFailed => "Database connection failed",
      ResponseTextCode::ParentDirectoryRetrieveFailed => "Parent directory retrieve failed",
      ResponseTextCode::FileNameExtractionFailed => "File name extraction failed",
      ResponseTextCode::FileExtensionExtractionFailed => "File extension extraction failed",
      ResponseTextCode::FileCreationSuccessful => "File creation successful",
      ResponseTextCode::LogsDownloaded => "Logs downloaded",
    }
  }
}

#[derive(Debug, Serialize)]
pub struct AppResponse {
  pub status: Status,
  pub text_code: ResponseTextCode,
  pub file_path: Option<String>,
  pub timestamp: String,
}

#[derive(Debug, Serialize)]
pub struct Log {
  pub timestamp: i64,
  pub level: LogLevel,
  pub text_code: ResponseTextCode,
  pub file_path: Option<String>,
}
