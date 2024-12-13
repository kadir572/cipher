import { TranslationKey } from '@/i18n/types'

export type PasswordRule = {
  test: (password: string) => boolean
  messageKey: TranslationKey
}

export const PASSWORD_RULES: PasswordRule[] = [
  {
    test: (password: string) => password.length >= 8,
    messageKey: 'encryption.validation.password.minLength',
  },
  {
    test: (password: string) => /[A-Z]/.test(password),
    messageKey: 'encryption.validation.password.uppercase',
  },
  {
    test: (password: string) => /[a-z]/.test(password),
    messageKey: 'encryption.validation.password.lowercase',
  },
  {
    test: (password: string) => /\d/.test(password),
    messageKey: 'encryption.validation.password.number',
  },
  {
    test: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
    messageKey: 'encryption.validation.password.special',
  },
  {
    test: (password: string) => !/\s/.test(password),
    messageKey: 'encryption.validation.password.space',
  },
]
