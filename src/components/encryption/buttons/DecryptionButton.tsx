import { Button } from '@/components/ui/button'
import {
  useFilePathStore,
  usePasswordStore,
  useIsProcessingStore,
  useProgressStore,
  useDeleteOriginalStore,
} from '@/lib/stores/encryption.store'
import { useTranslation } from 'react-i18next'
import { listen } from '@tauri-apps/api/event'
import { invoke } from '@tauri-apps/api/core'
import { toast } from 'sonner'
import { AppResponse, ProgressInfo } from '@/lib/types'
import { TranslationKey } from '@/i18n/types'

export default function DecryptionButton() {
  const { t } = useTranslation()
  const { filePaths, resetFilePaths } = useFilePathStore()
  const { password, setPassword, setShowPassword, passwordInputRef } =
    usePasswordStore()
  const { isProcessing, setIsProcessing } = useIsProcessingStore()
  const { resetProgress, addProgress, setProgressInfo, setProgressResult } =
    useProgressStore()
  const { setDeleteOriginal, deleteOriginal } = useDeleteOriginalStore()
  const handleDecrypt = async () => {
    setIsProcessing(true)
    resetProgress()

    const promises = filePaths.map(filePath => {
      addProgress(filePath)

      return new Promise<void>((resolve, reject) => {
        const eventName = `decryption_progress_${filePath.replace(
          /[^a-zA-Z0-9\-/:_]/g,
          '_'
        )}`

        let lastProgressInfo: ProgressInfo | null = null

        listen<ProgressInfo>(eventName, e => {
          const info = e.payload
          console.log(info)
          lastProgressInfo = info
          setProgressInfo(filePath, info)
        }).catch(e => {
          toast.error(e)
          reject()
        })

        invoke<AppResponse>('decrypt_file', {
          filePath,
          password,
          deleteOriginal,
        })
          .then(res => {
            if (lastProgressInfo) {
              setProgressInfo(filePath, {
                ...lastProgressInfo,
                percentage: 100,
              })
            }
            setProgressResult(filePath, {
              type: 'success',
              output_file_path: res.file_path ?? '',
            })
            resolve()
          })
          .catch(res => {
            setPassword('')
            setShowPassword(false)
            if (passwordInputRef.current) {
              passwordInputRef.current.focus()
            }
            setProgressResult(filePath, {
              type: 'error',
              errorMessage: t(
                `encryption.responseTextCodes.${res.text_code}` as TranslationKey
              ),
            })
            reject()
          })
      })
    })

    await Promise.all(promises)
      .then(() => {
        resetFilePaths()
        setPassword('')
        setShowPassword(false)
        setDeleteOriginal(false)
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
      })
  }

  return (
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
      disabled={isProcessing || filePaths.length <= 0 || password.length <= 0}
    >
      {t('encryption.form.decrypt')}
    </Button>
  )
}
