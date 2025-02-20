import { open } from '@tauri-apps/plugin-dialog'
import {
  useIsProcessingStore,
  useFilePathStore,
  usePasswordStore,
} from '@/lib/stores/encryption.store'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import FileUploadIcon from '../icons/FileUploadIcon'
import { Separator } from '../ui/separator'

export default function EncryptionFileUploader() {
  const { isProcessing } = useIsProcessingStore()
  const { filePaths, addFilePath, resetFilePaths } = useFilePathStore()
  const { passwordInputRef, setPassword, setShowPassword } = usePasswordStore()
  const { t } = useTranslation()

  const handleReset = () => {
    resetFilePaths()
    setPassword('')
    setShowPassword(false)
  }

  const handleUploadFiles = async () => {
    if (isProcessing) return

    try {
      const fpArr = await open({
        multiple: true,
        directory: false,
      })
      if (!fpArr || fpArr.length <= 0) return

      handleReset()

      fpArr.forEach(fp => {
        addFilePath(fp)
      })

      const hasEncFiles = fpArr.some(fp => fp.endsWith('.enc'))
      const hasNonEncFiles = fpArr.some(fp => !fp.endsWith('.enc'))

      if (hasEncFiles && hasNonEncFiles) {
        handleReset()
        return toast.error(t('encryption.validation.mixedFileTypes'))
      }

      if (passwordInputRef.current) {
        passwordInputRef.current.focus()
      }
      toast.success(t('encryption.progress.filesUploaded'))
    } catch (e) {
      const error = e as unknown as { message: string }
      toast.error(error.message)
    }
  }
  return (
    <div className='flex items-center w-full bg-slate-700 dark:bg-slate-800 dark:text-slate-200 rounded-md shadow-md text-white h-12'>
      <span
        onClick={handleUploadFiles}
        className={`px-3 ${isProcessing ? 'cursor-default' : 'cursor-pointer'}`}
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
          : t('encryption.form.selectFiles')}
      </span>
    </div>
  )
}
