import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'

export default function Settings() {
  const { t } = useTranslation()
  return (
    <div className='pt-8 grid grid-cols-2 gap-y-6 max-w-[36rem] mx-auto dark:text-slate-200'>
      <span>{`${t('language.select')}:`}</span>
      <LanguageSwitcher />
      <span>{`${t('theme.ui_theme')}:`}</span>
      <ThemeToggle />
    </div>
  )
}
