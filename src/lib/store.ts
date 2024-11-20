import { ErrorType, SuccessType } from './types/encryption'
import { create } from 'zustand'

export type Log = {
  type: 'success' | 'error'
  variant: ErrorType | SuccessType
  timestamp: string
  filePath?: string
}

export type ProgressState = {
  progress: number
  setProgress: (num: number) => void
}

export const useProgressStore = create<ProgressState>(set => ({
  progress: 0,
  setProgress: (num: number) =>
    set(() => ({
      progress: num,
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
  filePath: string | null
  setFilePath: (filePath: string | null) => void
}

export const useFilePathStore = create<FilePathState>(set => ({
  filePath: null,
  setFilePath: (filePath: string | null) =>
    set(() => ({
      filePath,
    })),
}))

export type LogState = {
  logs: Log[]
  addLog: (log: Log) => void
  resetLogs: () => void
}

export const useLogStore = create<LogState>(set => ({
  logs: [],
  addLog: (log: Log) =>
    set(state => ({
      logs: [...state.logs, log],
    })),
  resetLogs: () =>
    set(() => ({
      logs: [],
    })),
}))
