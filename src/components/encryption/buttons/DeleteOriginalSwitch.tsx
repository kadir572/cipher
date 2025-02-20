import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  useFilePathStore,
  useIsProcessingStore,
  useDeleteOriginalStore,
} from '@/lib/stores/encryption.store'
import { AlertCircle, Ban, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function DeleteOriginalSwitch() {
  const { t } = useTranslation()
  const { filePaths } = useFilePathStore()
  const { isProcessing } = useIsProcessingStore()
  const { deleteOriginal, setDeleteOriginal } = useDeleteOriginalStore()
  const date = Date.now()
  console.log(date)
  const date2 = new Date().getTime()
  console.log(date2)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  const handleSwitchChange = (checked: boolean) => {
    if (filePaths.length <= 0) {
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 3000)
      return
    }
    if (!deleteOriginal && checked) {
      setDialogOpen(true)
      return
    }
    setDeleteOriginal(false)
  }

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className='flex items-center gap-4'>
        <span>{t('encryption.form.deleteOriginal.label')}:</span>
        <Switch
          checked={deleteOriginal}
          disabled={isProcessing}
          onCheckedChange={handleSwitchChange}
          className={
            filePaths.length <= 0 ? 'opacity-50 cursor-not-allowed' : ''
          }
        />
        <div
          className={`
                transition-all duration-300 ease-in-out text-red-500
                overflow-hidden
                ${showWarning ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'}
              `}
        >
          <div className='flex items-center gap-2'>
            <AlertCircle className='h-4 w-4 text-destructive' />
            <span className='text-sm text-destructive whitespace-nowrap'>
              {t('encryption.form.deleteOriginal.selectFilesWarning')}
            </span>
          </div>
        </div>
      </div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t('encryption.form.deleteOriginal.title')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('encryption.form.deleteOriginal.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Ban className='h-4 w-4' />
            {t('common.actions.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction className='px-0'>
            <Button
              onClick={() => {
                setDeleteOriginal(true)
                setDialogOpen(false)
              }}
              variant='destructive'
              className='w-full'
            >
              <Trash2 className='h-4 w-4' />
              {t('common.actions.confirm')}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
