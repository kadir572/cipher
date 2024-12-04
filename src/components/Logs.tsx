import LogsTable from './LogsTable'
import { ColumnDef } from '@tanstack/react-table'
import { getErrorMessage, getResponseMessage } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { invoke } from '@tauri-apps/api/core'
import { useEffect, useState } from 'react'
import { AppResponse, Log } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function Logs() {
  const [logs, setLogs] = useState<Log[]>([])

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const fetchedLogs = await invoke<Log[]>('get_all_logs')
        console.log(fetchedLogs)
        setLogs(fetchedLogs)
      } catch (e) {
        console.log(e)
      }
    }
    fetchLogs()
  }, [])

  useEffect(() => {
    console.log(logs)
  }, [logs])
  const { t } = useTranslation()

  const columns: ColumnDef<Log>[] = [
    {
      header: t('logs.timestamp'),
      accessorFn: row => new Date(row.timestamp).toLocaleString(),
      cell: info => info.getValue(),
    },
    {
      header: t('logs.message'),
      accessorFn: row => {
        return row.level === 'info'
          ? getResponseMessage(row.text_code, row.file_path ?? '', t)
          : getErrorMessage(row.text_code, t)
      },
      cell: info => info.getValue(),
    },
  ]

  const handleResetLogs = async () => {
    try {
      await invoke('clear_all_logs')
      setLogs([]) // Clear logs in frontend state
      toast.success(t('logs.cleared')) // Assuming you have a translation for this
    } catch (e) {
      console.error(e)
      toast.error(t('logs.clearFailed')) // Assuming you have a translation for this
    }
  }

  const handleDownloadLogs = async () => {
    if (logs.length <= 0) {
      return toast.error(t('logs.noLogsToDownload'))
    }

    try {
      const defaultPath = 'logs.json'
      const result = await invoke<AppResponse>('download_logs', {
        targetPath: defaultPath,
      })

      if (result.status === 'success') {
        toast.success(t('logs.downloadSuccessful'))
      }
    } catch (e) {
      console.error(e)
      toast.error(t('logs.downloadFailed'))
    }
  }

  // Add a function to format the timestamp
  const formatTimestamp = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000) // Multiply by 1000 as JS uses milliseconds
    return date.toLocaleString() // Or any other date format you prefer
  }

  return (
    <div className='pt-8'>
      <div className='flex items-center justify-end gap-2'>
        <Button disabled={logs.length <= 0} onClick={handleResetLogs}>
          {t('logs.clear')}
        </Button>
        <Button onClick={handleDownloadLogs} disabled={logs.length <= 0}>
          {t('logs.download')}
        </Button>
      </div>
      <LogsTable
        columns={columns}
        data={logs.map(log => ({
          ...log,
          timestamp: formatTimestamp(Number(log.timestamp)),
        }))}
      ></LogsTable>
    </div>
  )
}
