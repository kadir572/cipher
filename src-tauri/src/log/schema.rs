use duckdb::{Connection, Error};

pub fn create_tables(connection: &Connection) -> Result<(), Error> {
    connection.execute(
        "CREATE TABLE IF NOT EXISTS logs (
              timestamp BIGINT PRIMARY KEY,
              level VARCHAR NOT NULL,
              text_code VARCHAR NOT NULL,
              file_path VARCHAR
          )",
        [],
    )?;
    Ok(())
}
