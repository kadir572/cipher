import { CheckIcon, XIcon } from 'lucide-react'

type PasswordRule = {
  test: (password: string) => boolean
  message: string
}

type Props = {
  rule: PasswordRule
  password: string
}

export default function PasswordRuleElement({ rule, password }: Props) {
  const isValid = rule.test(password)

  return (
    <div className='flex items-center gap-2 transition-all duration-200 transform dark:text-slate-200'>
      <div className='relative w-4 h-4'>
        <span
          className={`absolute inset-0 transition-all duration-300 ${
            isValid
              ? 'opacity-100 scale-100 text-green-500'
              : 'opacity-0 scale-0'
          }`}
        >
          <CheckIcon className='w-4 h-4' />
        </span>
        <span
          className={`absolute inset-0 transition-all duration-300 ${
            !isValid
              ? 'opacity-100 scale-100 text-red-500'
              : 'opacity-0 scale-0'
          }`}
        >
          <XIcon className='w-4 h-4' />
        </span>
      </div>
      <span>{rule.message}</span>
    </div>
  )
}
