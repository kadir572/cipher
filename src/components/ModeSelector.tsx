import Encryption from './Encryption'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import Settings from './Settings'
import Logs from './Logs'
import { useTranslation } from 'react-i18next'
import SettingsIcon from './icons/SettingsIcon'
import InfoIcon from './icons/InfoIcon'
import KeyIcon from './icons/KeyIcon'

export default function ModeSelector() {
  const { t } = useTranslation()
  return (
    <Tabs defaultValue='encryption' className='px-2 py-2 max-w-[48rem] mx-auto'>
      <TabsList className='grid w-full grid-cols-10 dark:bg-slate-900'>
        <TabsTrigger value='encryption' className='col-span-4'>
          <div className='flex items-center gap-2'>
            <span>
              <KeyIcon />
            </span>
            <span>{t('tabs.encryption')}</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value='logs' className='col-span-3'>
          <div className='flex items-center gap-2'>
            <span>
              <InfoIcon />
            </span>
            <span>{t('tabs.logs')}</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value='settings' className='col-span-3'>
          <div className='flex items-center gap-2'>
            <span>
              <SettingsIcon />
            </span>
            <span>{t('tabs.settings')}</span>
          </div>
        </TabsTrigger>
      </TabsList>
      <div className='px-2'>
        <TabsContent
          className='focus-visible:ring-0 dark:focus-visible:ring-0'
          value='encryption'
        >
          <Encryption />
        </TabsContent>
        <TabsContent
          className='focus-visible:ring-0 dark:focus-visible:ring-0'
          value='logs'
        >
          <Logs />
        </TabsContent>
        <TabsContent
          className='focus-visible:ring-0 dark:focus-visible:ring-0'
          value='settings'
        >
          <Settings />
        </TabsContent>
      </div>
    </Tabs>
  )
}
