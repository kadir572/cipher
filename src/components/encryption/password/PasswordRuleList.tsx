import {
  usePasswordStore,
  useIsProcessingStore,
  useFilePathStore,
} from '@/lib/stores/encryption.store'
import PasswordRuleElement from './PasswordRuleElement'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { PASSWORD_RULES } from '@/lib/constants/password-rules.constants'

export default function PasswordRuleList() {
  const { password, setIsPasswordValid } = usePasswordStore()
  const { isProcessing } = useIsProcessingStore()
  const { filePaths } = useFilePathStore()
  const { t } = useTranslation()

  useEffect(() => {
    const isValid =
      password.length > 0 && PASSWORD_RULES.every(rule => rule.test(password))
    setIsPasswordValid(isValid)
  }, [password, setIsPasswordValid])

  const showRules =
    password.length > 0 &&
    !isProcessing &&
    !filePaths.every(fp => fp.endsWith('.enc'))

  return (
    <div>
      {showRules &&
        PASSWORD_RULES.map((rule, index) => (
          <PasswordRuleElement
            key={index}
            rule={{
              test: rule.test,
              message: t(rule.messageKey),
            }}
            password={password}
          />
        ))}
    </div>
  )
}
