import { create } from 'zustand'

interface ProgressInfo {
  percentage: number
  bytes_processed: number
  total_bytes: number
  speed_mbps: number
  elapsed_seconds: number
  estimated_remaining_seconds: number
}

export type ProgressState = {
  progress: { key: string; value: number; progressInfo?: ProgressInfo }[]
  addProgress: (key: string) => void
  setProgress: (num: number, key: string, info?: ProgressInfo) => void
  resetProgress: () => void
}

export const useProgressStore = create<ProgressState>(set => ({
  progress: [],
  addProgress: (key: string) =>
    set(state => ({
      progress: [...state.progress, { key, value: 0 }],
    })),
  setProgress: (num: number, key: string, info?: ProgressInfo) =>
    set(state => {
      return {
        progress: state.progress.map(p => {
          if (p.key === key) {
            return {
              key,
              value: num,
              progressInfo: info,
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

export type LastLogState = {
  lastLog: {
    title: string | null
    description: string | null
    type: 'success' | 'error'
  } | null
  setLastLog: (
    title: string | null,
    description: string | null,
    type: 'success' | 'error'
  ) => void
}

export const useCurrentLogsStore = create<LastLogState>(set => ({
  lastLog: null,
  setLastLog: (title, description, type) =>
    set({ lastLog: { title, description, type } }),
}))
