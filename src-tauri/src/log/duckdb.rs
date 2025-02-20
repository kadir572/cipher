use duckdb::{params, Connection, Error};
use crate::types::{AppResponse, ResponseTextCode, Status, Log, LogLevel, LogsResponse};
use chrono::{Utc, Local};
use std::fs;

use super::schema::create_tables;

fn open_database() -> Result<Connection, Error> {
    let connection = Connection::open("logs.db")?;
    create_tables(&connection)?;
    Ok(connection)
}

pub fn add_log_internal(level: LogLevel, text_code: ResponseTextCode, file_path: Option<String>) -> Result<(), String> {
    let connection = open_database().map_err(|e| {
        println!("Database error: {e}");
        format!("Failed to open database: {e}")
    })?;
    
    let current_time = Utc::now().timestamp();
    connection.execute(
        "INSERT INTO logs (timestamp, level, text_code, file_path) VALUES (?, ?, ?, ?)",
        params![current_time, level.as_ref(), text_code.as_ref(), file_path],
    ).map_err(|e| {
        println!("Failed to insert log: {e}");
        format!("Failed to insert log: {e}")
    })?;
    
    Ok(())
}

#[tauri::command]
pub fn add_log(level: LogLevel, text_code: ResponseTextCode) -> Result<AppResponse, AppResponse> {
    let error_response = || AppResponse {
        text_code: ResponseTextCode::DbConnFailed,
        status: Status::Error,
        file_path: None,
        timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string(),
        stats: None,
    };

    add_log_internal(level, text_code.clone(), None)
        .map_err(|_| error_response())?;

    Ok(AppResponse {
        text_code,
        status: Status::Success,
        file_path: None,
        timestamp: Utc::now().to_rfc3339(),
        stats: None,
    })
}

#[tauri::command]
pub fn get_logs() -> Result<LogsResponse, AppResponse> {
    let error_response = |e: &str| {
        println!("{e}");
        AppResponse {
            text_code: ResponseTextCode::DbConnFailed,
            status: Status::Error,
            file_path: None,
            timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string(),
            stats: None,
        }
    };

    let connection = open_database().map_err(|e| error_response(&e.to_string()))?;

    let mut stmt = connection
        .prepare("SELECT timestamp, level, text_code, file_path FROM logs ORDER BY timestamp DESC")
        .map_err(|e| error_response(&e.to_string()))?;

    let logs = stmt
        .query_map([], |row| {
            Ok(Log {
                timestamp: row.get(0)?,
                level: row.get::<_, String>(1)?.parse().unwrap(),
                text_code: row.get::<_, String>(2)?.parse().unwrap(),
                file_path: row.get(3)?,
            })
        })
        .map_err(|e| error_response(&e.to_string()))?
        .collect::<Result<Vec<_>, _>>()
        .map_err(|e| error_response(&e.to_string()))?;

    let db_size = fs::metadata("logs.db")
        .map(|metadata| metadata.len() as i64)
        .unwrap_or(0);

    Ok(LogsResponse {
        logs,
        db_size,
    })
}

#[tauri::command]
pub fn clear_logs() -> Result<AppResponse, AppResponse> {
    let error_response = |e: &str| {
        println!("{e}");
        AppResponse {
            text_code: ResponseTextCode::DbConnFailed,
            status: Status::Error,
            file_path: None,
            timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string(),
            stats: None,
        }
    };

    let connection = open_database().map_err(|e| error_response(&e.to_string()))?;

    connection
        .execute("DELETE FROM logs", [])
        .map_err(|e| error_response(&e.to_string()))?;

    Ok(AppResponse {
        text_code: ResponseTextCode::FileCreationSuccessful,
        status: Status::Success,
        file_path: None,
        timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string(),
        stats: None,
    })
}

#[tauri::command]
pub fn download_logs(output_path: &str) -> Result<AppResponse, AppResponse> {
    let error_response = |code: ResponseTextCode, e: &str| {
        println!("{e}");
        AppResponse {
            text_code: code,
            status: Status::Error,
            file_path: None,
            timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string(),
            stats: None,
        }
    };

    let connection = open_database()
        .map_err(|e| error_response(ResponseTextCode::DbConnFailed, &e.to_string()))?;

    let mut stmt = connection
        .prepare("SELECT timestamp, level, text_code, file_path FROM logs ORDER BY timestamp DESC")
        .map_err(|e| error_response(ResponseTextCode::DbConnFailed, &e.to_string()))?;

    let logs = stmt
        .query_map([], |row| {
            Ok(Log {
                timestamp: row.get(0)?,
                level: row.get::<_, String>(1)?.parse().unwrap(),
                text_code: row.get::<_, String>(2)?.parse().unwrap(),
                file_path: row.get(3)?,
            })
        })
        .map_err(|e| error_response(ResponseTextCode::DbConnFailed, &e.to_string()))?
        .collect::<Result<Vec<_>, _>>()
        .map_err(|e| error_response(ResponseTextCode::DbConnFailed, &e.to_string()))?;

    if logs.is_empty() {
        return Err(error_response(
            ResponseTextCode::FileCreationFailed,
            "No logs to download",
        ));
    }

    let json = serde_json::to_string_pretty(&logs)
        .map_err(|e| error_response(ResponseTextCode::FileCreationFailed, &e.to_string()))?;

    std::fs::write(output_path, json).map_err(|e| {
        error_response(
            ResponseTextCode::FileCreationFailed,
            &format!("Failed to write logs: {}", e),
        )
    })?;

    Ok(AppResponse {
        text_code: ResponseTextCode::LogsDownloaded,
        status: Status::Success,
        file_path: Some(output_path.to_string()),
        timestamp: Local::now().format("%Y-%m-%dT%H:%M:%S").to_string(),
        stats: None,
    })
}
