import TickIcon from '@/components/icons/TickIcon'
import { motion } from 'framer-motion'
import { XIcon } from 'lucide-react'
import ClipLoader from 'react-spinners/ClipLoader'
import { useIsProcessingStore } from '@/lib/stores/encryption.store'
import { ProgressState } from '@/lib/types'

type Props = {
  progress: ProgressState['progress'][number]
}

export default function ProgressStatusIcon({ progress }: Props) {
  const { isProcessing } = useIsProcessingStore()
  const isSuccess = progress.progressResult?.type === 'success'

  return (
    <>
      {!progress.progressResult ? (
        <div className='relative'>
          <ClipLoader color='#1e293b' size={16} />
          {isProcessing && (
            <motion.div
              className='absolute inset-0 rounded-full border-2 border-gray-300'
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </div>
      ) : isSuccess ? (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className='text-emerald-600 dark:text-emerald-400'
        >
          <TickIcon />
        </motion.span>
      ) : (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className='text-red-500'
        >
          <XIcon className='h-4 w-4' />
        </motion.span>
      )}
    </>
  )
}
