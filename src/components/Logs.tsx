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
  return (
    <div className='pt-8'>
      <div className='flex items-center justify-end gap-2'>
        <Button disabled={logs.length <= 0} onClick={handleResetLogs}>
          Clear
        </Button>
        <Button disabled={logs.length <= 0}>Download</Button>
      </div>
      <LogsTable columns={columns} data={logs}></LogsTable>
    </div>
  )
}
