import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { LockIcon } from 'lucide-react'
import {
  useFilePathStore,
  useIsProcessingStore,
  usePasswordStore,
} from '@/lib/stores/encryption.store'
import { useTranslation } from 'react-i18next'
import ShowPasswordIcon from '@/components/icons/ShowPasswordIcon'
import HidePasswordIcon from '@/components/icons/HidePasswordIcon'
import { useEffect } from 'react'

export default function EncryptionPasswordInput() {
  const { isProcessing } = useIsProcessingStore()
  const {
    password,
    setPassword,
    showPassword,
    setShowPassword,
    passwordInputRef,
  } = usePasswordStore()
  const { filePaths } = useFilePathStore()
  const { t } = useTranslation()

  useEffect(() => {
    if (filePaths.length > 0 && passwordInputRef.current) {
      passwordInputRef.current.focus()
    }
  }, [filePaths.length, passwordInputRef])

  return (
    <div className='flex items-center w-full bg-slate-700 dark:bg-slate-800 dark:text-slate-200 text-white h-12 rounded-md shadow-md'>
      <Label
        className={`px-3 ${
          isProcessing || filePaths.length <= 0
            ? 'cursor-not-allowed'
            : 'cursor-pointer'
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
          placeholder={t('encryption.form.encryptionKey')}
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <Separator orientation='vertical' />
        <button
          type='button'
          disabled={password.length <= 0 || isProcessing}
          onClick={() => setShowPassword()}
          className='px-3 cursor-pointer disabled:text-slate-400  disabled:cursor-not-allowed  dark:text-slate-200'
        >
          {!showPassword && <ShowPasswordIcon />}
          {showPassword && <HidePasswordIcon />}
        </button>
      </div>
    </div>
  )
}
