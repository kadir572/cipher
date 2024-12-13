import { Log } from '@/lib/types'
import { TooltipProvider } from '../ui/tooltip'
import { DeleteButton } from './DeleteButton'
import { DownloadButton } from './DownloadButton'
import { formatBytes } from '@/lib/utils'

type Props = {
  handleDeleteLogs: () => void
  handleDownloadLogs: () => void
  logs: Log[]
  isLoading: boolean
  dbSize: number
}

export default function LogButtons({
  handleDeleteLogs,
  handleDownloadLogs,
  logs,
  isLoading,
  dbSize,
}: Props) {
  return (
    <div className='flex items-end justify-between gap-2 mb-4'>
      <span
        className={`text-sm text-gray-500 dark:text-gray-400 transition-all duration-200 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {formatBytes(dbSize)}
      </span>
      <div className='flex items-center gap-2'>
        <TooltipProvider>
          <DeleteButton
            handleDeleteLogs={handleDeleteLogs}
            logs={logs}
            isLoading={isLoading}
          />
          <DownloadButton
            handleDownloadLogs={handleDownloadLogs}
            logs={logs}
            isLoading={isLoading}
          />
        </TooltipProvider>
      </div>
    </div>
  )
}
