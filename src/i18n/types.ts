// src/i18n/types.ts

export type TranslationsType = {
  nav: {
    tabs: {
      encryptionDecryption: string
      decryption: string
      logs: string
      settings: string
    }
  }
  common: {
    actions: {
      reset: string
      cancel: string
      proceed: string
      download: string
      delete: string
      confirm: string
    }
    status: {
      success: string
      error: string
    }
  }
  encryption: {
    form: {
      encrypt: string
      decrypt: string
      selectFiles: string
      encryptionKey: string
      resetMessage: string
      deleteOriginal: {
        label: string
        title: string
        description: string
        selectFilesWarning: string
      }
    }
    progress: {
      encrypting: string
      decrypting: string
      filesUploaded: string
      fileSavedAt: string
      totalSize: string
      timeTaken: string
      averageSpeed: string
      progress: string
      speed: string
      eta: string
      processed: string
      details: string
      originalFile: string
      location: string
    }
    validation: {
      mixedFileTypes: string
      password: {
        minLength: string
        maxLength: string
        uppercase: string
        lowercase: string
        number: string
        special: string
        space: string
      }
    }
    responseTextCodes: {
      encryption_successful: string
      decryption_successful: string
      encryption_failed: string
      decryption_failed: string
      file_open_failed: string
      file_read_failed: string
      file_creation_failed: string
      key_generation_failed: string
      invalid_password: string
      db_conn_failed: string
      parent_directory_retrieve_failed: string
      file_name_extraction_failed: string
      file_extension_extraction_failed: string
      file_creation_successful: string
      logs_downloaded: string
    }
  }
  logs: {
    headers: {
      timestamp: string
      level: string
      message: string
    }
    status: {
      empty: string
      downloadSuccess: string
      downloadError: string
      deleted: string
      deleteFailed: string
      fetchError: string
    }
    dialog: {
      title: string
      description: string
    }
  }
  settings: {
    theme: {
      label: string
    }
    language: {
      label: string
      select: string
      search: string
      empty: string
    }
  }
  donation: {
    dialog: {
      title: string
      description: string
      info: string
      openButton: string
      buttonLabel: string
    }
    form: {
      amount: {
        label: string
        placeholder: string
      }
      currency: {
        label: string
        search: string
        noResult: string
      }
    }
    validation: {
      minAmount: string
      invalidAmount: string
      missingInfo: string
    }
  }
  footer: {
    credits: string
  }
}

// Add the type to i18next
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: {
      translation: TranslationsType
    }
  }
}

// Add this type helper
type NestedKeyOf<T> = {
  [K in keyof T & string]: T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : K
}[keyof T & string]

export type TranslationKey = NestedKeyOf<TranslationsType>
