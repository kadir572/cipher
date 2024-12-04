import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ResponseTextCode } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getErrorMessage(
  type: ResponseTextCode,
  t: (key: string) => string
): string {
  switch (type) {
    case 'decryption_failed':
      return t('error_messages.decryption_failed')
    case 'encryption_failed':
      return t('error_messages.encryption_failed')
    case 'file_creation_failed':
      return t('error_messages.file_creation_failed')
    case 'file_extension_extraction_failed':
      return t('file_extension_extraction_failed')
    case 'file_name_extraction_failed':
      return t('file_name_extraction_failed')
    case 'file_open_failed':
      return t('file_open_failed')
    case 'file_read_failed':
      return t('error_messages.file_read_failed')
    case 'invalid_password':
      return t('error_messages.invalid_password')
    case 'key_generation_failed':
      return t('error_messages.key_generation_failed')
    case 'parent_directory_retrieve_failed':
      return t('error_messages.parent_directory_retrieve_failed')
    default:
      return t('error_messages.default')
  }
}

export function getResponseMessage(
  text_code: ResponseTextCode,
  filePath: string,
  t: (key: string) => string
): string {
  switch (text_code) {
    case 'encryption_successful':
      return `${t('success_messages.encryption')} ${filePath}`
    case 'decryption_successful':
      return `${t('success_messages.decryption')} ${filePath}`
    default:
      return t('success_messages.default')
  }
}
