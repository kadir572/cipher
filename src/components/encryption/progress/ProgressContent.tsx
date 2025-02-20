import { ProgressState } from '@/lib/types'
import { useIsProcessingStore } from '@/lib/stores/encryption.store'
import ProgressBar from './ProgressBar'
import ProgressHeader from './ProgressHeader'
import ProgressBody from './ProgressBody'

type Props = {
  progress: ProgressState['progress'][number]
}

export default function ProgressContent({ progress }: Props) {
  const { isProcessing } = useIsProcessingStore()

  return (
    <div className='space-y-3'>
      <ProgressHeader progress={progress} />

      {isProcessing && (
        <ProgressBar percentage={progress.progressInfo?.percentage || 0} />
      )}

      <ProgressBody progress={progress} />
    </div>
  )
}
