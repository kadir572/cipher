import { ProgressState } from '@/lib/types'

import ProgressStatusIcon from './icons/ProgressStatusIcon'
import ProgressStatusText from './ProgressStatusText'
import ProgressAction from './ProgressAction'

type Props = {
  progress: ProgressState['progress'][number]
}

export default function ProgressHeader({ progress }: Props) {
  return (
    <div className='flex items-center gap-2'>
      <ProgressStatusIcon progress={progress} />
      <ProgressStatusText progress={progress} />
      <ProgressAction progress={progress} />
    </div>
  )
}
