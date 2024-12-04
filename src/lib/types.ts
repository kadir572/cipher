export enum ResponseTextCode {
  EncryptionSuccessful = 'encryption_successful',
  DecryptionSuccessful = 'decryption_successful',
  EncryptionFailed = 'encryption_failed',
  DecryptionFailed = 'decryption_failed',
  FileOpenFailed = 'file_open_failed',
  FileReadFailed = 'file_read_failed',
  FileCreationFailed = 'file_creation_failed',
  KeyGenerationFailed = 'key_generation_failed',
  InvalidPassword = 'invalid_password',
  DbConnFailed = 'db_conn_failed',
  ParentDirectoryRetrieveFailed = 'parent_directory_retrieve_failed',
  FileNameExtractionFailed = 'file_name_extraction_failed',
  FileExtensionExtractionFailed = 'file_extension_extraction_failed',
}

export enum Status {
  Success = 'success',
  Error = 'error',
}

export type AppResponse = {
  status: Status
  text_code: ResponseTextCode
  file_path?: string
  timestamp: string
}

export type LogLevel = 'info' | 'error' | 'warning' | 'debug' | 'critical'

export type Log = {
  level: LogLevel
  text_code: ResponseTextCode
  timestamp: string
  file_path?: string
}
