import { open } from '@tauri-apps/plugin-dialog'
import { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { invoke } from '@tauri-apps/api/core'
import { toast } from 'sonner'
import { getErrorMessage, getResponseMessage } from '@/lib/utils'
import {
  useCurrentLogsStore,
  useFilePathStore,
  useIsProcessingStore,
  usePasswordStore,
  useProgressStore,
} from '@/lib/store'
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

  const handleClick = async () => {
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
        return toast.error(t('encryption.mixed_file_types'), {
          duration: 6000,
        })
      }

      if (passwordInputRef.current) {
        passwordInputRef.current.focus()
      }
      toast.success(t('encryption.uploaded'), {
        duration: 6000,
      })
    } catch (e) {
      const error = e as unknown as { message: string }
      toast.error(error.message, {
        duration: 6000,
      })
    }
  }

  const handleReset = () => {
    resetFilePaths()
    setShowPassword(false)
    setPassword('')
    resetProgress()
    toast.info(t('encryption.reset_message'), {
      duration: 6000,
    })
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

        listen(eventName, e => {
          setProgress(Math.floor(e.payload as number), filePath)
        }).catch(e => {
          toast.error(e, { duration: 6000 })
          reject()
        })

        invoke<AppResponse>('encrypt_file', { filePath, password })
          .then(res => {
            resolve()
            setLastLog(
              t('encryption.encrypt_success'),
              `${t('encryption.file_saved_at')}: ${filePath}`,
              'success'
            )
            toast.success(
              getResponseMessage(res.text_code, res.file_path ?? '', t),
              {
                duration: 6000,
              }
            )
          })
          .catch(res => {
            setPassword('')
            setShowPassword(false)
            if (passwordInputRef.current) {
              passwordInputRef.current.focus()
            }
            reject()
            setLastLog('Error', getErrorMessage(res.text_code, t), 'error')
            toast.error(getErrorMessage(res.text_code, t), {
              duration: 6000,
            })
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

        listen(eventName, e => {
          setProgress(Math.floor(e.payload as number), filePath)
        }).catch(e => {
          toast.error(e, { duration: 6000 })
          reject()
        })

        invoke<AppResponse>('decrypt_file', { filePath, password })
          .then(res => {
            setProgress(100, filePath)
            resolve()
            setLastLog(
              t('encryption.decrypt_success'),
              `${t('encryption.file_saved_at')}: ${filePath}`,
              'success'
            )
            toast.success(
              getResponseMessage(res.text_code, res.file_path ?? '', t),
              {
                duration: 6000,
              }
            )
          })
          .catch(res => {
            setPassword('')
            setShowPassword(false)
            if (passwordInputRef.current) {
              passwordInputRef.current.focus()
            }
            reject()
            setLastLog('Error', getErrorMessage(res.text_code, t), 'error')
            toast.error(getErrorMessage(res.text_code, t), {
              duration: 6000,
            })
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
          onClick={handleClick}
          className={`px-3 ${
            isProcessing ? 'cursor-default' : 'cursor-pointer'
          }`}
        >
          <FileUploadIcon />
        </span>
        <Separator orientation='vertical' />
        <span
          onClick={handleClick}
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
            password.length > 0 && filePaths.every(fp => !fp.endsWith('.enc'))
              ? 'h-[120px]'
              : 'h-0'
          } transition-all duration-200 overflow-hidden`}
        >
          {filePaths.every(fp => !fp.endsWith('.enc')) &&
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
              <div key={p.key} className='flex flex-col gap-1'>
                <span className='flex items-center gap-2'>
                  <span>
                    {p.value < 100 && (
                      <ClipLoader color='#1e293b' size={20} className='' />
                    )}
                    {p.value >= 100 && (
                      <span>
                        <TickIcon />
                      </span>
                    )}
                  </span>
                  {filePaths[i]}
                </span>
                <Progress
                  className={`${
                    isProcessing ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-200`}
                  value={p.value}
                  indicatorColor='bg-slate-700 dark:bg-slate-800'
                />
              </div>
            ))}
          </div>
        </div>

        <Alert
          className={`transition-all transform duration-300 ease-in-out flex items-center gap-4 ${
            lastLog?.title && !isProcessing
              ? 'opacity-100 scale-100 max-h-[200px] mt-4'
              : 'opacity-0 scale-0 max-h-0 overflow-hidden mt-0'
          } ${
            lastLog?.type === 'success'
              ? 'bg-green-400 border-green-600 dark:bg-green-800'
              : 'bg-red-400 border-red-600 dark:bg-red-800'
          } text-slate-800 text-wrap break-words origin-center relative`}
        >
          <div>
            <InfoIcon />
          </div>
          <div className='flex-grow'>
            <div className='flex items-center justify-between'>
              <AlertTitle className='font-semibold'>
                {lastLog?.title}
              </AlertTitle>
              <button
                onClick={() => setLastLog(null, null, 'success')}
                className='p-1 hover:bg-black/10 rounded-full transition-colors'
                type='button'
              >
                <XIcon className='w-4 h-4' />
              </button>
            </div>

            <AlertDescription>{lastLog?.description}</AlertDescription>
          </div>
        </Alert>
      </div>
    </form>
  )
}
