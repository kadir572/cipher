import { formatTime, formatBytes } from '@/lib/utils'
import { splitPath } from '@/lib/utils'
import { useIsProcessingStore } from '@/lib/stores/encryption.store'
import { useTranslation } from 'react-i18next'
import { ProgressState } from '@/lib/types'
import { FileIcon, FolderIcon, AlertCircle } from 'lucide-react'

type Props = {
  progress: ProgressState['progress'][number]
}

export default function ProgressBody({ progress }: Props) {
  const { t } = useTranslation()
  const { isProcessing } = useIsProcessingStore()
  const isSuccess = progress.progressResult?.type === 'success'

  return (
    <div className='flex flex-col gap-1'>
      {isProcessing ? (
        <>
          <div className='flex gap-2'>
            <FileIcon className='h-4 w-4 text-gray-400' />
            <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
              {splitPath(progress.key).filename}
            </span>
          </div>
          <div className='flex items-center justify-between text-sm text-gray-500 dark:text-gray-400'>
            <span>
              {formatBytes(progress.progressInfo?.bytes_processed || 0)} /{' '}
              {formatBytes(progress.progressInfo?.total_bytes || 0)}
            </span>
            <div className='flex items-center gap-4'>
              <span>
                {(progress.progressInfo?.speed_mbps || 0).toFixed(2)} MB/s
              </span>
              <span>
                {t('encryption.progress.eta')}:{' '}
                {formatTime(
                  Math.round(
                    progress.progressInfo?.estimated_remaining_seconds || 0
                  )
                )}
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className='mb-4 flex items-center gap-2 min-w-0'>
          {isSuccess ? (
            <>
              <FolderIcon className='h-4 w-4 shrink-0 text-gray-400' />
              <span className='text-sm text-gray-500 dark:text-gray-400 shrink-0'>
                {t('encryption.progress.location')}:
              </span>
              <div
                className='text-sm text-gray-700 dark:text-gray-200 overflow-hidden text-ellipsis whitespace-nowrap'
                title={progress.progressResult?.output_file_path ?? ''}
              >
                <div className='flex flex-row-reverse overflow-hidden'>
                  <span className='shrink-0 font-medium'>
                    {
                      splitPath(progress.progressResult?.output_file_path ?? '')
                        .filename
                    }
                  </span>
                  {splitPath(progress.progressResult?.output_file_path ?? '')
                    .restPath && (
                    <span
                      className='overflow-hidden text-ellipsis'
                      style={{ direction: 'rtl' }}
                    >
                      {
                        splitPath(
                          progress.progressResult?.output_file_path ?? ''
                        ).restPath
                      }
                    </span>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <AlertCircle className='h-4 w-4 shrink-0 text-gray-400' />
              <span className='text-sm text-gray-500 dark:text-gray-400 shrink-0'>
                {t('common.status.error')}:
              </span>
              <span className='text-sm text-gray-700 dark:text-gray-200'>
                {progress.progressResult?.errorMessage}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  )
}
