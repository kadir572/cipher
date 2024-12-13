import { ProgressState } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  progress: ProgressState['progress'][number]
}

export default function ProgressStatusText({ progress }: Props) {
  const { t } = useTranslation()
  const isCompleted = progress.progressResult
  const isSuccess = progress.progressResult?.type === 'success'
  const isDecryption = progress.key.endsWith('.enc')

  useEffect(() => {
    console.log(progress)
    console.log(isCompleted)
  }, [progress, isCompleted])
  return (
    <span
      className={cn(
        'font-medium mr-auto',
        isCompleted
          ? isSuccess
            ? 'text-emerald-700 dark:text-emerald-300'
            : 'text-red-700 dark:text-red-300'
          : 'text-gray-600 dark:text-gray-300'
      )}
    >
      {(() => {
        if (!isCompleted) {
          return isDecryption
            ? t('encryption.progress.decrypting')
            : t('encryption.progress.encrypting')
        }

        if (isSuccess) {
          return isDecryption
            ? t('encryption.responseTextCodes.decryption_successful')
            : t('encryption.responseTextCodes.encryption_successful')
        }

        return isDecryption
          ? t('encryption.responseTextCodes.decryption_failed')
          : t('encryption.responseTextCodes.encryption_failed')
      })()}
    </span>
  )
}
