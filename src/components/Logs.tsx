import { Log, useLogStore } from '@/lib/store'
import LogsTable from './LogsTable'
import { ColumnDef } from '@tanstack/react-table'
import { getErrorMessage, getResponseMessage } from '@/lib/utils'
import { ErrorType, SuccessType } from '@/lib/types/encryption'
import { useTranslation } from 'react-i18next'
import { Button } from './ui/button'
import { toast } from 'sonner'

export default function Logs() {
  const { t } = useTranslation()
  const { logs, resetLogs } = useLogStore()

  const columns: ColumnDef<Log>[] = [
    {
      header: t('logs.timestamp'),
      accessorFn: row => row.timestamp,
      cell: info => info.getValue(),
    },
    {
      header: t('logs.message'),
      accessorFn: row => {
        return row.type === 'success'
          ? getResponseMessage(
              row.variant as SuccessType,
              row.filePath ?? '',
              t
            )
          : getErrorMessage(row.variant as ErrorType, t)
      },
      cell: info => info.getValue(),
    },
  ]

  const handleResetLogs = () => {
    toast.info('Logs have been cleared', { duration: 6000 })
    resetLogs()
  }

  const handleDownloadLogs = () => {
    if (logs.length <= 0) {
      return toast.error('No logs to download')
    }

    const logsData = JSON.stringify(logs, null, 2)
    const blob = new Blob([logsData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'logs.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Logs downloaded successfully.')
  }
  return (
    <div className='pt-8'>
      <div className='flex items-center justify-end gap-2'>
        <Button disabled={logs.length <= 0} onClick={handleResetLogs}>
          Clear
        </Button>
        <Button onClick={handleDownloadLogs} disabled={logs.length <= 0}>
          Download
        </Button>
      </div>
      <LogsTable columns={columns} data={logs}></LogsTable>
    </div>
  )
}
