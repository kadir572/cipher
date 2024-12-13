type Props = {
  label: string
  value: string
  icon: React.ReactNode
}

export default function ProgressStat({ label, value, icon }: Props) {
  return (
    <div className='flex flex-col gap-1.5'>
        <div className='flex items-center gap-2 text-gray-400'>
          {icon}
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            {label}
          </span>
        </div>
        <span className='text-sm text-gray-700 dark:text-gray-200 font-medium pl-6'>
          {value}
        </span>
      </div>
  )
}
