import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className='flex items-center justify-center py-1 gap-1 dark:text-slate-200'>
      <span>{t('footer.developed_by')}</span>
      <span className='font-semibold'>Kadir Karadavut</span>
    </footer>
  )
}
