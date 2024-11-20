export type ErrorType =
  | 'encryption_failed'
  | 'decryption_failed'
  | 'file_open_failed'
  | 'file_read_failed'
  | 'file_creation_failed'
  | 'key_generation_failed'
  | 'parent_directory_retrieve_failed'
  | 'plain_text_too_long'
  | 'file_name_extraction_failed'
  | 'file_extension_extraction_failed'
  | 'invalid_password'
  | 'filename_generation_failed'

export type EncryptionError = {
  type_: ErrorType
  timestamp: string
}

export type SuccessType = 'encryption_successful' | 'decryption_successful'

export type EncryptionResponse = {
  type_: SuccessType
  file_path: string
  timestamp: string
}
