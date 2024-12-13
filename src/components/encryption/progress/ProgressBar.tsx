import { Progress } from '@/components/ui/progress'

type Props = {
  percentage: number
}

export default function ProgressBar({ percentage }: Props) {
  return (
    <Progress value={percentage} className='h-1.5' indicatorColor='bg-slate-800' />
  )
}
