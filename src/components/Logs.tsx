import LogsTable from './LogsTable'
import { ColumnDef } from '@tanstack/react-table'
import { getErrorMessage, getResponseMessage } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { invoke } from '@tauri-apps/api/core'
import { useEffect, useState } from 'react'
import { AppResponse, Log } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'

export default function Logs() {
  const [logs, setLogs] = useState<Log[]>([])

  const { t } = useTranslation()

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const fetchedLogs = await invoke<Log[]>('get_logs')
        setLogs(fetchedLogs)
      } catch (e) {
        console.error(e)
        toast.error(t('logs.fetch_failed'))
      }
    }
    fetchLogs()
  }, [t])

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

  const handleClearLogs = async () => {
    try {
      await invoke('clear_logs')
      setLogs([])
      toast.info(t('logs.cleared'))
    } catch (e) {
      console.error(e)
      toast.error(t('logs.clearFailed'))
    }
  }

  const handleDownloadLogs = async () => {
    if (logs.length <= 0) {
      return toast.error(t('logs.no_logs'))
    }

    try {
      const defaultPath = 'logs.json'
      const result = await invoke<AppResponse>('download_logs', {
        targetPath: defaultPath,
      })

      if (result.status === 'success') {
        toast.success(t('logs.download_success'))
      }
    } catch (e) {
      console.error(e)
      toast.error(t('logs.download_error'))
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button disabled={logs.length <= 0}>{t('logs.clear_label')}</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t('logs.clear_dialog_title')}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t('logs.clear_dialog_description')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('logs.cancel')}</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearLogs}>
                {t('logs.clear_label')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button onClick={handleDownloadLogs} disabled={logs.length <= 0}>
          {t('logs.download_label')}
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
