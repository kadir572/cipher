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

export type ProcessingStats = {
  total_size_bytes: number
  processing_time_seconds: number
  average_speed_mbps: number
}

export type AppResponse = {
  status: Status
  text_code: ResponseTextCode
  file_path?: string
  timestamp: string
  stats?: ProcessingStats
}

export type LogLevel = 'info' | 'error' | 'warning' | 'debug' | 'critical'

export type Log = {
  level: LogLevel
  text_code: ResponseTextCode
  timestamp: string
  file_path?: string
}

export type PasswordRule = {
  test: (p: string) => boolean
  message: string
}

export type ProgressInfo = {
  percentage: number
  bytes_processed?: number
  total_bytes?: number
  speed_mbps?: number
  elapsed_seconds: number
  estimated_remaining_seconds?: number
}

export type ProgressResult = {
  type: 'success' | 'error'
  output_file_path?: string
  errorMessage?: string
}

export type ProgressState = {
  progress: {
    key: string
    progressInfo: ProgressInfo
    progressResult?: ProgressResult
  }[]
  addProgress: (key: string) => void
  removeProgress: (key: string) => void
  setProgressInfo: (key: string, info: ProgressInfo) => void
  setProgressResult: (key: string, result: ProgressResult) => void
  resetProgress: () => void
}

export type PasswordValidationResult = {
  isValid: boolean
  errors: string[]
}

export type PasswordState = {
  password: string
  setPassword: (password: string) => void
  showPassword: boolean
  setShowPassword: (showPassword?: boolean) => void
  passwordInputRef: React.RefObject<HTMLInputElement>
  isPasswordValid: boolean
  setIsPasswordValid: (isValid: boolean) => void
}

export type IsProcessingStore = {
  isProcessing: boolean
  setIsProcessing: (isProcessing: boolean) => void
}

export type FilePathState = {
  filePaths: string[]
  addFilePath: (filePath: string) => void
  resetFilePaths: () => void
}

export type LogType = 'success' | 'error'

export type ThemeState = {
  isDarkMode: boolean
  toggleDarkMode: (isDarkMode?: boolean) => void
}

export type StripeState = {
  clientSecret: string | null
  setClientSecret: (clientSecret: string | null) => void
}

export type DeleteOriginalState = {
  deleteOriginal: boolean
  setDeleteOriginal: (deleteOriginal: boolean) => void
}

export type LogsResponse = {
  logs: Log[]
  db_size: number
}
