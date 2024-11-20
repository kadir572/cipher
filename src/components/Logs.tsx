import { Log, useLogStore } from '@/lib/store'
import LogsTable from './LogsTable'
import { ColumnDef } from '@tanstack/react-table'
import { getErrorMessage, getResponseMessage } from '@/lib/utils'
import { ErrorType, SuccessType } from '@/lib/types/encryption'
import { useTranslation } from 'react-i18next'

export default function Logs() {
  const { t } = useTranslation()
  const { logs } = useLogStore()

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
  return <LogsTable columns={columns} data={logs}></LogsTable>
}
