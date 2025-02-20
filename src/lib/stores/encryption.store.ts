import { create } from 'zustand'
import { createRef } from 'react'
import {
  DeleteOriginalState,
  FilePathState,
  IsProcessingStore,
  PasswordState,
  ProgressInfo,
  ProgressResult,
} from '../types'
import { ProgressState } from '../types'

export const useProgressStore = create<ProgressState>(set => ({
  progress: [],
  addProgress: (key: string) =>
    set(state => ({
      progress: [
        ...state.progress,
        { key, progressInfo: { percentage: 0, elapsed_seconds: 0 } },
      ],
    })),
  removeProgress: (key: string) =>
    set(state => ({
      progress: state.progress.filter(p => p.key !== key),
    })),
  setProgressInfo: (key: string, info: ProgressInfo) =>
    set(state => {
      return {
        progress: state.progress.map(p => {
          if (p.key === key) {
            return {
              key,
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
  setProgressResult: (key: string, result: ProgressResult) =>
    set(state => ({
      progress: state.progress.map(p => {
        if (p.key !== key) return p
        return { ...p, progressResult: result }
      }),
    })),
}))

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
  passwordInputRef: createRef<HTMLInputElement>(),
  isPasswordValid: false,
  setIsPasswordValid: (isValid: boolean) =>
    set(() => ({
      isPasswordValid: isValid,
    })),
}))

export const useIsProcessingStore = create<IsProcessingStore>(set => ({
  isProcessing: false,
  setIsProcessing: (isProcessing: boolean) =>
    set(() => ({
      isProcessing,
    })),
}))

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

export const useDeleteOriginalStore = create<DeleteOriginalState>(set => ({
  deleteOriginal: false,
  setDeleteOriginal: (deleteOriginal: boolean) =>
    set(() => ({
      deleteOriginal,
    })),
}))
