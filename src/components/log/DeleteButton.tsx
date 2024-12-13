import { Ban, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { useTranslation } from 'react-i18next'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogAction,
} from '../ui/alert-dialog'
import { Log } from '@/lib/types'

type Props = {
  handleDeleteLogs: () => void
  logs: Log[]
  isLoading: boolean
}

export function DeleteButton({ handleDeleteLogs, logs, isLoading }: Props) {
  const { t } = useTranslation()
  return (
    <AlertDialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button
              variant='destructive'
              disabled={logs.length <= 0 || isLoading}
              className='transition-opacity duration-200 disabled:opacity-50'
            >
              <Trash2 className='h-4 w-4 mr-2' />
              {t('common.actions.delete')}
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('common.actions.delete')}</p>
        </TooltipContent>
      </Tooltip>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('logs.dialog.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('logs.dialog.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Ban className='h-4 w-4' />
            {t('common.actions.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction className='px-0'>
            <Button
              onClick={handleDeleteLogs}
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
