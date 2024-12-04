import { create } from 'zustand'

// export type Log = {
//   type: 'success' | 'error'
//   variant: ErrorType | SuccessType
//   timestamp: string
//   filePath?: string
// }

export type ProgressState = {
  progress: { key: string; value: number }[]
  addProgress: (key: string) => void
  setProgress: (num: number, key: string) => void
  resetProgress: () => void
}

export const useProgressStore = create<ProgressState>(set => ({
  progress: [],
  addProgress: (key: string) =>
    set(state => ({
      progress: [...state.progress, { key, value: 0 }],
    })),
  setProgress: (num: number, key: string) =>
    set(state => {
      return {
        progress: state.progress.map(p => {
          if (p.key === key) {
            return {
              key,
              value: num,
            }
          }
          return p
        }),
      }
    }),
  resetProgress: () =>
    set(() => ({
      progress: [],
    })),
}))

export type PasswordState = {
  password: string
  setPassword: (password: string) => void
  showPassword: boolean
  setShowPassword: (showPassword?: boolean) => void
}

export const usePasswordStore = create<PasswordState>(set => ({
  password: '',
  setPassword: (password: string) =>
    set(() => ({
      password,
    })),
  showPassword: false,
  setShowPassword: (showPassword?: boolean) =>
    set(state => ({
      showPassword:
        showPassword !== undefined ? showPassword : !state.showPassword,
    })),
}))

export type IsProcessingStore = {
  isProcessing: boolean
  setIsProcessing: (isProcessing: boolean) => void
}

export const useIsProcessingStore = create<IsProcessingStore>(set => ({
  isProcessing: false,
  setIsProcessing: (isProcessing: boolean) =>
    set(() => ({
      isProcessing,
    })),
}))

export type FilePathState = {
  filePaths: string[]
  addFilePath: (filePath: string) => void
  resetFilePaths: () => void
}

export const useFilePathStore = create<FilePathState>(set => ({
  filePaths: [],
  addFilePath: (filePath: string) =>
    set(state => ({
      filePaths: [...state.filePaths, filePath],
    })),
  resetFilePaths: () =>
    set(() => ({
      filePaths: [],
    })),
}))

// export type LogState = {
//   logs: Log[]
//   addLog: (log: Log) => void
//   resetLogs: () => void
// }

// export const useLogStore = create<LogState>(set => ({
//   logs: [],
//   addLog: (log: Log) =>
//     set(state => ({
//       logs: [...state.logs, log],
//     })),
//   resetLogs: () =>
//     set(() => ({
//       logs: [],
//     })),
// }))

export type ThemeState = {
  isDarkMode: boolean
  toggleDarkMode: (isDarkMode?: boolean) => void
}

export const useThemeStore = create<ThemeState>(set => ({
  isDarkMode: JSON.parse(localStorage.getItem('isDarkMode') ?? 'false'),
  toggleDarkMode: (isDarkMode?: boolean) =>
    set(state => {
      if (isDarkMode !== undefined) {
        if (isDarkMode) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        return {
          isDarkMode,
        }
      } else {
        document.documentElement.classList.toggle('dark', !state.isDarkMode)
      }
      return {
        isDarkMode: !state.isDarkMode,
      }
    }),
}))

export type StripeState = {
  clientSecret: string | null
  setClientSecret: (clientSecret: string | null) => void
}

export const useStripeStore = create<StripeState>(set => ({
  clientSecret: null,
  setClientSecret: clientSecret =>
    set({
      clientSecret,
    }),
}))
