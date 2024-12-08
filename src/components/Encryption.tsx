import { open } from '@tauri-apps/plugin-dialog'
import { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { invoke } from '@tauri-apps/api/core'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/utils'
import {
  useProgressStore,
  usePasswordStore,
  useIsProcessingStore,
  useFilePathStore,
  useCurrentLogsStore,
} from '@/lib/stores/encryption.store'
import { Progress } from './ui/progress'
import { listen } from '@tauri-apps/api/event'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import FileUploadIcon from './icons/FileUploadIcon'
import LockIcon from './icons/LockIcon'
import ShowPasswordIcon from './icons/ShowPasswordIcon'
import HidePasswordIcon from './icons/HidePasswordIcon'
import ClipLoader from 'react-spinners/ClipLoader'
import TickIcon from './icons/TickIcon'
import { AppResponse } from '@/lib/types'
import { CheckIcon, XIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import InfoIcon from './icons/InfoIcon'

interface ProgressInfo {
  percentage: number
  bytes_processed: number
  total_bytes: number
  speed_mbps: number
  elapsed_seconds: number
  estimated_remaining_seconds: number
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
  if (bytes < 1024 * 1024 * 1024)
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
}

function formatTime(seconds: number): string {
  if (seconds < 60) return seconds.toFixed(1) + 's'
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}m ${remainingSeconds.toFixed(0)}s`
}

const getFileName = (path: string) => {
  return path.split(/[\\/]/).pop() || path
}

export default function Encryption() {
  const { t } = useTranslation()
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const { setProgress, progress, addProgress, resetProgress } =
    useProgressStore()
  const { filePaths, addFilePath, resetFilePaths } = useFilePathStore()
  const { isProcessing, setIsProcessing } = useIsProcessingStore()
  const { password, setPassword, showPassword, setShowPassword } =
    usePasswordStore()
  const { lastLog, setLastLog } = useCurrentLogsStore()

  const passwordSchema = z
    .string()
    .min(8, t('password.min'))
    .max(32, t('password.max'))
    .refine(value => /[A-Z]/.test(value), {
      message: t('password.uppercase'),
    })
    .refine(value => /[a-z]/.test(value), {
      message: t('password.lowercase'),
    })
    .refine(value => /\d/.test(value), {
      message: t('password.number'),
    })
    .refine(value => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: t('password.special'),
    })
    .refine(value => !/\s/.test(value), {
      message: t('password.space'),
    })

  const passwordValidation = passwordSchema.safeParse(password)

  const handleUploadFiles = async () => {
    if (isProcessing) return
    try {
      const fpArr = await open({
        multiple: true,
        directory: false,
      })
      if (!fpArr || fpArr.length <= 0) return
      fpArr.forEach(fp => {
        addFilePath(fp)
      })

      const hasEncFiles = fpArr.some(fp => fp.endsWith('.enc'))
      const hasNonEncFiles = fpArr.some(fp => !fp.endsWith('.enc'))

      if (hasEncFiles && hasNonEncFiles) {
        return toast.error(t('encryption.mixed_file_types'))
      }

      if (passwordInputRef.current) {
        passwordInputRef.current.focus()
      }
      toast.success(t('encryption.uploaded'))
    } catch (e) {
      const error = e as unknown as { message: string }
      toast.error(error.message)
    }
  }

  const handleReset = () => {
    resetFilePaths()
    setShowPassword(false)
    setPassword('')
    resetProgress()
    toast.info(t('encryption.reset_message'))
  }

  const handleEncrypt = async () => {
    if (filePaths.length <= 0 || isProcessing) return

    setIsProcessing(true)
    setLastLog(null, null, 'success')

    const promises = filePaths.map(filePath => {
      addProgress(filePath)

      return new Promise<void>((resolve, reject) => {
        const eventName = `encryption_progress_${filePath.replace(
          /[^a-zA-Z0-9\-/:_]/g,
          '_'
        )}`

        listen<ProgressInfo>(eventName, e => {
          const info = e.payload
          setProgress(Math.floor(info.percentage), filePath, info)
        }).catch(e => {
          toast.error(e)
          reject()
        })

        invoke<AppResponse>('encrypt_file', { filePath, password })
          .then(response => {
            resolve()
            const stats = response.stats
            if (stats) {
              setLastLog(
                t('encryption.encrypt_success'),
                `${t('encryption.file_saved_at')}: ${filePath}\n` +
                  `${t('encryption.stats.total_size')}: ${formatBytes(
                    stats.total_size_bytes
                  )}\n` +
                  `${t('encryption.stats.time_taken')}: ${formatTime(
                    stats.processing_time_seconds
                  )}\n` +
                  `${t(
                    'encryption.stats.average_speed'
                  )}: ${stats.average_speed_mbps.toFixed(2)} MB/s`,
                'success'
              )
            } else {
              setLastLog(
                t('encryption.encrypt_success'),
                `${t('encryption.file_saved_at')}: ${filePath}`,
                'success'
              )
            }
            toast.success(t('encryption.encrypt_success'))
          })
          .catch(res => {
            setPassword('')
            setShowPassword(false)
            if (passwordInputRef.current) {
              passwordInputRef.current.focus()
            }
            reject()
            setLastLog('Error', getErrorMessage(res.text_code, t), 'error')
            toast.error(getErrorMessage(res.text_code, t))
          })
      })
    })

    await Promise.all(promises)
      .then(() => {
        handleReset()
      })
      .catch(() => {
        setPassword('')
        setShowPassword(false)
        if (passwordInputRef.current) {
          passwordInputRef.current.focus()
        }
      })
      .finally(() => {
        resetProgress()
        setIsProcessing(false)
      })
  }

  const handleDecrypt = async () => {
    if (filePaths.length <= 0 || isProcessing) return

    setIsProcessing(true)
    setLastLog(null, null, 'success')

    const promises = filePaths.map(filePath => {
      addProgress(filePath)

      return new Promise<void>((resolve, reject) => {
        const eventName = `decryption_progress_${filePath.replace(
          /[^a-zA-Z0-9\-/:_]/g,
          '_'
        )}`

        listen<ProgressInfo>(eventName, e => {
          const info = e.payload
          setProgress(Math.floor(info.percentage), filePath, info)
        }).catch(e => {
          toast.error(e)
          reject()
        })

        invoke<AppResponse>('decrypt_file', { filePath, password })
          .then(response => {
            setProgress(100, filePath)
            resolve()
            const stats = response.stats
            if (stats) {
              setLastLog(
                t('encryption.decrypt_success'),
                `${t('encryption.file_saved_at')}: ${filePath}\n` +
                  `${t('encryption.stats.total_size')}: ${formatBytes(
                    stats.total_size_bytes
                  )}\n` +
                  `${t('encryption.stats.time_taken')}: ${formatTime(
                    stats.processing_time_seconds
                  )}\n` +
                  `${t(
                    'encryption.stats.average_speed'
                  )}: ${stats.average_speed_mbps.toFixed(2)} MB/s`,
                'success'
              )
            } else {
              setLastLog(
                t('encryption.decrypt_success'),
                `${t('encryption.file_saved_at')}: ${filePath}`,
                'success'
              )
            }
            toast.success(t('encryption.decrypt_success'))
          })
          .catch(res => {
            setPassword('')
            setShowPassword(false)
            if (passwordInputRef.current) {
              passwordInputRef.current.focus()
            }
            reject()
            setLastLog('Error', getErrorMessage(res.text_code, t), 'error')
            toast.error(getErrorMessage(res.text_code, t))
          })
      })
    })

    await Promise.all(promises)
      .then(() => {
        handleReset()
      })
      .catch(() => {
        setPassword('')
        setShowPassword(false)
        if (passwordInputRef.current) {
          passwordInputRef.current.focus()
        }
      })
      .finally(() => {
        resetProgress()
        setIsProcessing(false)
      })
  }

  useEffect(() => {
    if (filePaths.length > 0 && passwordInputRef.current) {
      passwordInputRef.current.focus()
    }
  }, [filePaths.length])

  const passwordRules = [
    {
      test: (p: string) => p.length >= 8 && p.length <= 32,
      message: t('password.min'),
    },
    { test: (p: string) => /[A-Z]/.test(p), message: t('password.uppercase') },
    { test: (p: string) => /[a-z]/.test(p), message: t('password.lowercase') },
    { test: (p: string) => /\d/.test(p), message: t('password.number') },
    {
      test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p),
      message: t('password.special'),
    },
    { test: (p: string) => !/\s/.test(p), message: t('password.space') },
  ]

  return (
    <form
      onSubmit={e => e.preventDefault()}
      className='pt-8 flex flex-col gap-2 max-w-[36rem] mx-auto'
    >
      <div className='flex items-center w-full bg-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-md shadow-md text-white h-12'>
        <span
          onClick={handleUploadFiles}
          className={`px-3 ${
            isProcessing ? 'cursor-default' : 'cursor-pointer'
          }`}
        >
          <FileUploadIcon />
        </span>
        <Separator orientation='vertical' />
        <span
          onClick={handleUploadFiles}
          className={`px-3 ${
            isProcessing ? 'cursor-default' : 'cursor-pointer'
          } text-ellipsis text-nowrap overflow-x-hidden grow`}
        >
          {filePaths.length === 1
            ? filePaths[0]
            : filePaths.length > 1
            ? 'Multiple files'
            : t('encryption.select_file')}
        </span>
      </div>
      <div className='flex items-center w-full bg-slate-700 dark:bg-slate-800 dark:text-slate-200 text-white h-12 rounded-md shadow-md'>
        <Label
          className={`px-3 ${
            isProcessing ? 'cursor-default' : 'cursor-pointer'
          }`}
          htmlFor='password'
        >
          <span>
            <LockIcon />
          </span>
        </Label>
        <Separator orientation='vertical' />
        <div className='flex items-center gap-px w-full h-10'>
          <Input
            disabled={filePaths.length <= 0 || isProcessing}
            readOnly={isProcessing}
            ref={passwordInputRef}
            id='password'
            className='border-transparent focus:border-white/50 dark:focus:border-slate-200/50 focus-visible:ring-0 dark:focus-visible::ring-0 placeholder:text-slate-300 px-2 mx-1 placeholder:text-base'
            type={showPassword ? 'text' : 'password'}
            placeholder={t('encryption.password_placeholder')}
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <Separator orientation='vertical' />
          <button
            type='button'
            disabled={password.length <= 0 || isProcessing}
            onClick={() => setShowPassword()}
            className='px-3 cursor-pointer disabled:text-slate-400  disabled:cursor-auto dark:text-slate-200'
          >
            {!showPassword && <ShowPasswordIcon />}
            {showPassword && <HidePasswordIcon />}
          </button>
        </div>
      </div>

      <div className='w-full flex items-center mt-2'>
        <Button
          type={
            filePaths.length > 0 && filePaths.every(fp => fp.endsWith('.enc'))
              ? 'button'
              : 'submit'
          }
          onClick={handleEncrypt}
          size='lg'
          className={`transition-all duration-200 ${
            filePaths.length > 0 && filePaths.every(fp => fp.endsWith('.enc'))
              ? 'p-0 h-0 w-0 scale-0 m-0'
              : 'grow mr-1'
          }`}
          disabled={
            !passwordValidation.success || isProcessing || filePaths.length <= 0
          }
        >
          {t('encryption.encrypt')}
        </Button>
        <Button
          type={
            filePaths.length > 0 && filePaths.every(fp => !fp.endsWith('.enc'))
              ? 'button'
              : 'submit'
          }
          onClick={handleDecrypt}
          size='lg'
          className={`transition-all duration-200 ${
            filePaths.length > 0 && filePaths.every(fp => !fp.endsWith('.enc'))
              ? 'p-0 h-0 w-0 scale-0 m-0'
              : filePaths.every(fp => fp.endsWith('.enc'))
              ? 'grow mr-1'
              : 'grow mx-1'
          }`}
          disabled={isProcessing || filePaths.length <= 0}
        >
          {t('encryption.decrypt')}
        </Button>
        <Button
          size='lg'
          className='transition-all duration-200 grow ml-1'
          disabled={
            isProcessing || (filePaths.length <= 0 && password.length <= 0)
          }
          onClick={handleReset}
          variant='destructive'
        >
          {t('encryption.reset')}
        </Button>
      </div>
      <div className='relative'>
        <div
          className={`h-0 ${
            password.length > 0 &&
            filePaths.every(fp => !fp.endsWith('.enc')) &&
            !isProcessing
              ? 'h-[120px] opacity-100'
              : 'h-0 opacity-0'
          } transition-all duration-300 ease-in-out overflow-hidden`}
        >
          {filePaths.every(fp => !fp.endsWith('.enc')) &&
            !isProcessing &&
            passwordRules.map((rule, index) => (
              <div
                key={index}
                className='flex items-center gap-2 transition-all duration-200 transform dark:text-slate-200'
              >
                <div className='relative w-4 h-4'>
                  <span
                    className={`absolute inset-0 transition-all duration-300 ${
                      rule.test(password)
                        ? 'opacity-100 scale-100 text-green-500'
                        : 'opacity-0 scale-0'
                    }`}
                  >
                    <CheckIcon className='w-4 h-4' />
                  </span>
                  <span
                    className={`absolute inset-0 transition-all duration-300 ${
                      !rule.test(password)
                        ? 'opacity-100 scale-100 text-red-500'
                        : 'opacity-0 scale-0'
                    }`}
                  >
                    <XIcon className='w-4 h-4' />
                  </span>
                </div>
                <span>{rule.message}</span>
              </div>
            ))}
        </div>

        <div className='transition-all duration-300'>
          <div className='overflow-hidden flex flex-col gap-4'>
            {progress.map((p, i) => (
              <div
                key={p.key}
                className='flex flex-col gap-2 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800'
              >
                <div className='flex items-center justify-between'>
                  <span className='flex items-center gap-2 font-medium'>
                    <span>
                      {p.value < 100 && (
                        <ClipLoader color='#1e293b' size={16} />
                      )}
                      {p.value >= 100 && (
                        <span className='text-green-500'>
                          <TickIcon />
                        </span>
                      )}
                    </span>
                    <span className='truncate'>
                      {getFileName(filePaths[i])}
                    </span>
                  </span>
                  <span className='text-sm font-semibold'>
                    {p.value.toFixed(1)}%
                  </span>
                </div>

                <div className='space-y-2'>
                  <Progress
                    className={`${
                      isProcessing ? 'opacity-100' : 'opacity-0'
                    } transition-opacity duration-200`}
                    value={p.value}
                    indicatorColor='bg-slate-700 dark:bg-slate-800'
                  />

                  {isProcessing && (
                    <div className='grid grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-400'>
                      <div className='flex items-center gap-2'>
                        <span className='text-slate-500'>
                          {t('encryption.stats.progress')}:
                        </span>
                        <span className='font-medium'>
                          {p.value.toFixed(1)}%
                        </span>
                      </div>
                      <div className='flex items-center gap-2 justify-end'>
                        <span className='text-slate-500'>
                          {t('encryption.stats.processed')}:
                        </span>
                        <span className='font-medium'>
                          {formatBytes(p.progressInfo?.bytes_processed || 0)} /{' '}
                          {formatBytes(p.progressInfo?.total_bytes || 0)}
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className='text-slate-500'>
                          {t('encryption.stats.speed')}:
                        </span>
                        <span className='font-medium'>
                          {(p.progressInfo?.speed_mbps || 0).toFixed(2)} MB/s
                        </span>
                      </div>
                      <div className='flex items-center gap-2 justify-end'>
                        <span className='text-slate-500'>
                          {t('encryption.stats.eta')}:
                        </span>
                        <span className='font-medium'>
                          {formatTime(
                            p.progressInfo?.estimated_remaining_seconds || 0
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Alert
          className={`transition-all transform duration-300 ease-in-out ${
            lastLog?.title && !isProcessing
              ? 'opacity-100 scale-100 max-h-[300px] mt-4'
              : 'opacity-0 scale-0 max-h-0 overflow-hidden mt-0'
          } ${
            lastLog?.type === 'success'
              ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900'
              : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900'
          } rounded-lg`}
        >
          <div className='flex gap-4'>
            <div
              className={`${
                lastLog?.type === 'success' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              <InfoIcon />
            </div>
            <div className='flex-grow space-y-3'>
              <div className='flex items-start justify-between'>
                <AlertTitle
                  className={`font-semibold ${
                    lastLog?.type === 'success'
                      ? 'text-green-800 dark:text-green-200'
                      : 'text-red-800 dark:text-red-200'
                  }`}
                >
                  {lastLog?.title}
                </AlertTitle>
                <button
                  onClick={() => setLastLog(null, null, 'success')}
                  className='p-1 hover:bg-black/5 rounded-full transition-colors'
                  type='button'
                >
                  <XIcon className='w-4 h-4' />
                </button>
              </div>

              <AlertDescription className='text-slate-600 dark:text-slate-300'>
                {lastLog?.description?.split('\n').map((line, index) => (
                  <div key={index} className='flex items-center gap-2 py-0.5'>
                    {index === 0 ? (
                      <span>{line}</span>
                    ) : (
                      <>
                        <span className='text-slate-500 min-w-[120px]'>
                          {line.split(': ')[0]}:
                        </span>
                        <span className='font-medium'>
                          {line.split(': ')[1]}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </AlertDescription>
            </div>
          </div>
        </Alert>
      </div>
    </form>
  )
}
