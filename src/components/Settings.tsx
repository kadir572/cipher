import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import { motion } from 'framer-motion'

export default function Settings() {
  const { t } = useTranslation()
  return (
    <motion.div
      className='pt-8 grid grid-cols-2 gap-y-6 max-w-[36rem] mx-auto dark:text-slate-200'
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{
        type: 'spring',
        stiffness: 380,
        damping: 30,
      }}
    >
      <span>{`${t('settings.language.select')}:`}</span>
      <LanguageSwitcher />
      <span>{`${t('settings.theme.label')}:`}</span>
      <ThemeToggle />
    </motion.div>
  )
}
