import {
  useProgressStore,
  useIsProcessingStore,
} from '@/lib/stores/encryption.store'
import { ProgressState } from '@/lib/types'
import { XIcon } from 'lucide-react'

type Props = {
  progress: ProgressState['progress'][number]
}

export default function ProgressAction({ progress }: Props) {
  const { isProcessing } = useIsProcessingStore()
  const { removeProgress } = useProgressStore()

  return (
    <div className='flex items-center gap-3'>
      {isProcessing && (
        <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
          {progress.progressInfo?.percentage.toFixed(1)}%
        </span>
      )}
      {!isProcessing && (
        <XIcon
          onClick={() => removeProgress(progress.key)}
          className='h-4 w-4 cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all'
        />
      )}
    </div>
  )
}
