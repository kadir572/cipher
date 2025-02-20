import { Download } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Button } from '../ui/button'
import { useTranslation } from 'react-i18next'
import { Log } from '@/lib/types'

type Props = {
  handleDownloadLogs: () => void
  logs: Log[]
  isLoading: boolean
}

export function DownloadButton({ handleDownloadLogs, logs, isLoading }: Props) {
  const { t } = useTranslation()
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant='outline'
          onClick={handleDownloadLogs}
          disabled={logs.length <= 0 || isLoading}
          className='transition-opacity duration-200 disabled:opacity-50'
        >
          <Download className='h-4 w-4 mr-2' />
          {t('common.actions.download')}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{t('common.actions.download')}</p>
      </TooltipContent>
    </Tooltip>
  )
}
