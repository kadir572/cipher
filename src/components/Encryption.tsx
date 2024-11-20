import { open } from '@tauri-apps/plugin-dialog'
import { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { invoke } from '@tauri-apps/api/core'
import { toast } from 'sonner'
import { getErrorMessage, getResponseMessage } from '@/lib/utils'
import { EncryptionError, EncryptionResponse } from '@/lib/types/encryption'
import {
  useFilePathStore,
  useIsProcessingStore,
  useLogStore,
  usePasswordStore,
  useProgressStore,
} from '@/lib/store'
import { Progress } from './ui/progress'
import { listen } from '@tauri-apps/api/event'
import { z, ZodIssue } from 'zod'
import { useTranslation } from 'react-i18next'

export default function Encryption() {
  const { t } = useTranslation()
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const { addLog } = useLogStore()
  const { setProgress, progress } = useProgressStore()
  const { filePath, setFilePath } = useFilePathStore()
  const { isProcessing, setIsProcessing } = useIsProcessingStore()
  const { password, setPassword, showPassword, setShowPassword } =
    usePasswordStore()

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
      const fp = await open({
        multiple: false,
        directory: false,
      })
      if (!fp) return
      setFilePath(fp)
      if (passwordInputRef.current) {
        passwordInputRef.current.focus()
      }
      toast.success(t('encryption.uploaded'), {
        duration: 6000,
      })
    } catch (e) {
      console.error(e)
      const error = e as unknown as { message: string }
      toast.error(error.message, {
        duration: 6000,
      })
    }
  }

  const handleReset = () => {
    setFilePath(null)
    setShowPassword(false)
    setPassword('')
    setProgress(0)
    toast.info(t('encryption.reset_message'), {
      duration: 6000,
    })
  }

  const handleEncrypt = async () => {
    await listen('encryption_progress', e =>
      setProgress(Math.floor(e.payload as number))
    )
    toast
      .promise(() => invoke('encrypt_file', { filePath, password }), {
        loading: t('encryption.encrypt_processing'),
        success: res => {
          const encRes = res as EncryptionResponse
          addLog({
            type: 'success',
            variant: encRes.type_,
            timestamp: encRes.timestamp,
            filePath: encRes.file_path,
          })
          return getResponseMessage(encRes.type_, encRes.file_path, t)
        },
        error: res => {
          const encRes = res as EncryptionError
          addLog({
            type: 'error',
            variant: encRes.type_,
            timestamp: encRes.timestamp,
          })
          return getErrorMessage(encRes.type_, t)
        },
        duration: 6000,
      })
      .unwrap()
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
        setIsProcessing(false)
        setProgress(0)
      })
    setIsProcessing(true)
  }

  const handleDecrypt = async () => {
    await listen('decryption_progress', e =>
      setProgress(Math.floor(e.payload as number))
    )
    toast
      .promise(() => invoke('decrypt_file', { filePath, password }), {
        loading: t('encryption.decrypt_processing'),
        success: res => {
          const encRes = res as EncryptionResponse
          addLog({
            type: 'success',
            variant: encRes.type_,
            timestamp: encRes.timestamp,
            filePath: encRes.file_path,
          })
          return getResponseMessage(encRes.type_, encRes.file_path, t)
        },
        error: res => {
          const encRes = res as EncryptionError
          addLog({
            type: 'error',
            variant: encRes.type_,
            timestamp: encRes.timestamp,
          })
          return getErrorMessage(encRes.type_, t)
        },
        duration: 6000,
      })
      .unwrap()
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
        setIsProcessing(false)
        setProgress(0)
      })
    setIsProcessing(true)
  }

  useEffect(() => {
    if (filePath && passwordInputRef.current) {
      passwordInputRef.current.focus()
    }
  }, [filePath])

  return (
    <form
      onSubmit={e => e.preventDefault()}
      className='pt-8 flex flex-col gap-2 max-w-[36rem] mx-auto'
    >
      <div className='flex items-center w-full bg-slate-700 rounded-md shadow-md text-white h-12'>
        <span
          onClick={handleClick}
          className={`px-3 ${
            isProcessing ? 'cursor-default' : 'cursor-pointer'
          }`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
            />
          </svg>
        </span>
        <Separator orientation='vertical' />
        <span
          onClick={handleClick}
          className={`px-3 ${
            isProcessing ? 'cursor-default' : 'cursor-pointer'
          } text-ellipsis text-nowrap overflow-x-hidden grow`}
        >
          {filePath ?? t('encryption.select_file')}
        </span>
      </div>
      <div className='flex items-center w-full bg-slate-700 text-white h-12 rounded-md shadow-md'>
        <Label
          className={`px-3 ${
            isProcessing ? 'cursor-default' : 'cursor-pointer'
          }`}
          htmlFor='password'
        >
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
              />
            </svg>
          </span>
        </Label>
        <Separator orientation='vertical' />
        <div className='flex items-center gap-px w-full h-10'>
          <Input
            disabled={isProcessing}
            readOnly={isProcessing}
            ref={passwordInputRef}
            id='password'
            className='border-transparent focus:border-white/50 focus-visible:ring-0 placeholder:text-slate-300 px-2 mx-1 placeholder:text-base'
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
            className='px-3 cursor-pointer disabled:text-slate-400 disabled:cursor-auto'
          >
            {!showPassword && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                />
              </svg>
            )}
            {showPassword && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88'
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className='w-full flex items-center'>
        <Button
          type={filePath && filePath.endsWith('.enc') ? 'button' : 'submit'}
          onClick={handleEncrypt}
          size='lg'
          className={`transition-all duration-200 ${
            filePath && filePath.endsWith('.enc')
              ? 'p-0 h-0 w-0 scale-0 m-0'
              : 'grow mr-1'
          }`}
          disabled={!passwordValidation.success || isProcessing || !filePath}
        >
          {t('encryption.encrypt')}
        </Button>
        <Button
          type={filePath && !filePath.endsWith('.enc') ? 'button' : 'submit'}
          onClick={handleDecrypt}
          size='lg'
          className={`transition-all duration-200 ${
            filePath && !filePath.endsWith('.enc')
              ? 'p-0 h-0 w-0 scale-0 m-0'
              : filePath?.endsWith('.enc')
              ? 'grow mr-1'
              : 'grow mx-1'
          }`}
          disabled={isProcessing || !filePath}
        >
          {t('encryption.decrypt')}
        </Button>
        <Button
          size='lg'
          className='transition-all duration-200 grow ml-1'
          disabled={isProcessing || (!filePath && password.length <= 0)}
          onClick={handleReset}
          variant='destructive'
        >
          {t('encryption.reset')}
        </Button>
      </div>
      <div className='overflow-hidden'>
        <Progress
          className={`${
            isProcessing ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-200`}
          value={progress}
          indicatorColor='bg-slate-700'
        />
      </div>
      <div
        className={`flex flex-col text-sm list-disc w-fit ${
          password.length > 0 ? 'opacity-100' : 'opacity-0'
        } transition-all duration-200`}
      >
        {!filePath?.endsWith('.enc') &&
          !passwordValidation.success &&
          passwordValidation.error.issues.map(
            (issue: ZodIssue, index: number) => (
              <li className='transition-all duration-200 transform' key={index}>
                {issue.message}
              </li>
            )
          )}
      </div>
    </form>
  )
}
