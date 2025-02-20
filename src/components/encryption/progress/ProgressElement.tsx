import { ProgressState } from '@/lib/types'
import { motion } from 'framer-motion'
import ProgressContent from './ProgressContent'
import ProgressDetails from './ProgressDetails'
import { cn } from '@/lib/utils'

type Props = {
  progress: ProgressState['progress'][number]
}

export default function ProgressElement({ progress }: Props) {
  const isCompleted = progress.progressResult
  const isSuccess = progress.progressResult?.type === 'success'

  return (
    <motion.div
      layout
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 500,
          damping: 30,
          duration: 0.3,
        },
      }}
      exit={{
        opacity: 0,
        y: -20,
        transition: {
          duration: 0.2,
        },
      }}
      className={cn(
        'flex flex-col gap-3 px-4 py-3 rounded-xl shadow-sm border backdrop-blur-sm',
        isCompleted
          ? isSuccess
            ? 'bg-emerald-50/90 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800/50'
            : 'bg-red-50/90 dark:bg-red-950/50 border-red-200 dark:border-red-800'
          : 'bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700'
      )}
    >
      <ProgressContent progress={progress} />
      {isCompleted && isSuccess && <ProgressDetails progress={progress} />}
    </motion.div>
  )
}
