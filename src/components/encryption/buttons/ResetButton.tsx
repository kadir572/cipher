import { Button } from '@/components/ui/button'
import {
  useIsProcessingStore,
  useFilePathStore,
  usePasswordStore,
  useDeleteOriginalStore,
} from '@/lib/stores/encryption.store'
import { useTranslation } from 'react-i18next'

export default function ResetButton() {
  const { t } = useTranslation()
  const { isProcessing } = useIsProcessingStore()
  const { filePaths, resetFilePaths } = useFilePathStore()
  const { password, setPassword, setShowPassword } = usePasswordStore()
  const { setDeleteOriginal } = useDeleteOriginalStore()
  const handleReset = () => {
    resetFilePaths()
    setPassword('')
    setShowPassword(false)
    setDeleteOriginal(false)
  }

  return (
    <Button
      size='lg'
      className='transition-all duration-200 grow ml-1'
      disabled={isProcessing || (filePaths.length <= 0 && password.length <= 0)}
      onClick={handleReset}
      variant='destructive'
    >
      {t('common.actions.reset')}
    </Button>
  )
}
