import { AnimatePresence } from 'framer-motion'
import ProgressElement from './progress/ProgressElement'
import { useProgressStore } from '@/lib/stores/encryption.store'

export default function ProgressList() {
  const { progress } = useProgressStore()
  return (
    <div className='flex flex-col gap-4 overflow-hidden'>
      <AnimatePresence initial={false}>
        {progress.map(p => (
          <ProgressElement key={p.key} progress={p} />
        ))}
      </AnimatePresence>
    </div>
  )
}
