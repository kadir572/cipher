import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

export default function Settings() {
  const { t } = useTranslation()
  return (
    <div className='pt-8 flex flex-col gap-2 max-w-[36rem] mx-auto'>
      <div className='flex items-center gap-4'>
        <span>{`${t('language.select')}:`}</span>
        <LanguageSwitcher />
      </div>
    </div>
  )
}
