import LogsTable from './LogsTable'
import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { invoke } from '@tauri-apps/api/core'
import { useEffect, useState } from 'react'
import { AppResponse, Log, LogsResponse } from '@/lib/types'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { TranslationKey } from '@/i18n/types'
import LogButtons from './LogButtons'

export default function Logs() {
  const [logs, setLogs] = useState<Log[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dbSize, setDbSize] = useState(0)
  const { t } = useTranslation()

  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true)
      try {
        const logsResponse = await invoke<LogsResponse>('get_logs')
        setLogs(logsResponse.logs)
        setDbSize(logsResponse.db_size)
      } catch (e) {
        console.error(e)
        toast.error(t('logs.status.fetchError'))
      } finally {
        setIsLoading(false)
      }
    }
    fetchLogs()
  }, [t])

  const columns: ColumnDef<Log>[] = [
    {
      header: t('logs.headers.timestamp'),
      accessorFn: row => formatTimestamp(Number(row.timestamp)),
      cell: info => info.getValue(),
    },
    {
      header: t('logs.headers.level'),
      accessorKey: 'level',
      cell: info => info.getValue(),
    },
    {
      header: t('logs.headers.message'),
      accessorFn: row => {
        return row.level === 'info'
          ? `${t('encryption.responseTextCodes.encryption_successful')} ${t(
              'encryption.progress.fileSavedAt'
            )}: ${row.file_path ?? ''}`
          : t(`encryption.responseTextCodes.${row.text_code}` as TranslationKey)
      },
      cell: info => info.getValue(),
    },
  ]

  const handleDeleteLogs = async () => {
    setIsLoading(true)
    try {
      await invoke('clear_logs')
      const logsResponse = await invoke<LogsResponse>('get_logs')
      setLogs(logsResponse.logs)
      setDbSize(logsResponse.db_size)
      toast.info(t('logs.status.deleted'))
    } catch (e) {
      console.error(e)
      toast.error(t('logs.status.deleteFailed'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadLogs = async () => {
    if (logs.length <= 0) {
      return toast.error(t('logs.status.empty'))
    }

    try {
      const defaultPath = 'logs.json'
      const result = await invoke<AppResponse>('download_logs', {
        targetPath: defaultPath,
      })

      if (result.status === 'success') {
        toast.success(t('logs.status.downloadSuccess'))
      }
    } catch (e) {
      console.error(e)
      toast.error(t('logs.status.downloadError'))
    }
  }

  const formatTimestamp = (unixTimestamp: number) => {
    const date = new Date(unixTimestamp * 1000)
    return date
      .toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      .replace(',', '') // Remove comma between date and time
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 380,
        damping: 30,
      }}
      className='pt-8'
    >
      <LogButtons
        handleDeleteLogs={handleDeleteLogs}
        handleDownloadLogs={handleDownloadLogs}
        logs={logs}
        isLoading={isLoading}
        dbSize={dbSize}
      />
      <LogsTable columns={columns} data={logs} isLoading={isLoading} />
    </motion.div>
  )
}
