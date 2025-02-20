import { ProgressState } from '@/lib/types'
import { useTranslation } from 'react-i18next'
import { formatBytes, formatTime, splitPath } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ClockIcon, GaugeIcon, DatabaseIcon, FileIcon } from 'lucide-react'
import ProgressStat from './ProgressStat'

type Props = {
  progress: ProgressState['progress'][number]
}

export default function ProgressDetails({ progress }: Props) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='space-y-3'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors'
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <ChevronDown className='h-4 w-4 text-gray-500 dark:text-gray-400' />
        </motion.div>
        <span className='text-gray-500 dark:text-gray-400'>
          {t('encryption.progress.details')}
        </span>
      </button>

      <motion.div
        animate={isOpen ? 'open' : 'closed'}
        initial='closed'
        variants={{
          open: { height: 'auto', opacity: 1 },
          closed: { height: 0, opacity: 0 },
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        className='overflow-hidden'
      >
        <div className='mb-4 flex items-center gap-4 min-w-0'>
          <div className='flex items-center gap-2'>
            <FileIcon className='h-4 w-4 shrink-0 text-gray-400' />
            <span className='text-sm text-gray-500 dark:text-gray-400 shrink-0'>
              {t('encryption.progress.originalFile')}:
            </span>
          </div>
          <span
            className='text-sm text-gray-700 dark:text-gray-200 overflow-hidden text-ellipsis whitespace-nowrap direction-rtl'
            style={{ direction: 'rtl' }}
            title={progress.key}
          >
            {splitPath(progress.key).filename}
          </span>
        </div>

        <div className='grid grid-cols-3 gap-6'>
          <ProgressStat
            label={t('encryption.progress.timeTaken')}
            value={formatTime(progress.progressInfo?.elapsed_seconds || 0)}
            icon={<ClockIcon className='h-4 w-4' />}
          />
          <ProgressStat
            label={t('encryption.progress.averageSpeed')}
            value={`${(progress.progressInfo?.speed_mbps || 0).toFixed(
              2
            )} MB/s`}
            icon={<GaugeIcon className='h-4 w-4' />}
          />
          <ProgressStat
            label={t('encryption.progress.totalSize')}
            value={formatBytes(progress.progressInfo?.total_bytes || 0)}
            icon={<DatabaseIcon className='h-4 w-4' />}
          />
        </div>
      </motion.div>
    </div>
  )
}
