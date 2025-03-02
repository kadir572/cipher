import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { cn } from '@/lib/utils'

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  type Language = {
    label: string
    value: string
  }

  const languages: Language[] = [
    {
      label: 'English (English)',
      value: 'en',
    },
    {
      label: 'Deutsch (German)',
      value: 'de',
    },
    {
      label: 'Italiano (Italian)',
      value: 'it',
    },
    {
      label: 'Français (French)',
      value: 'fr',
    },
    {
      label: 'Polski (Polish)',
      value: 'pl',
    },
    {
      label: 'Türkçe (Turkish)',
      value: 'tr',
    },
    // {
    //   label: 'العربية (Arabic)',
    //   value: 'ar',
    // },
    {
      label: 'Español (Spanish)',
      value: 'es',
    },
    // {
    //   label: '简体中文 (Chinese - Simplified)',
    //   value: 'zh',
    // },
    // {
    //   label: 'Português (Portuguese)',
    //   value: 'pt',
    // },
    // {
    //   label: 'Русский (Russian)',
    //   value: 'ru',
    // },
    // {
    //   label: '日本語 (Japanese)',
    //   value: 'ja',
    // },
    // {
    //   label: '한국어 (Korean)',
    //   value: 'ko',
    // },
    // {
    //   label: 'हिन्दी (Hindi)',
    //   value: 'hi',
    // },
  ]

  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>(
    localStorage.getItem('language') ?? i18n.resolvedLanguage ?? 'en'
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between dark:bg-slate-800'
        >
          <span className='overflow-hidden text-ellipsis whitespace-nowrap'>
            {value
              ? languages.find(l => l.value === value)?.label
              : t('settings.language.select')}
          </span>
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command className='dark:bg-slate-800'>
          <CommandInput
            placeholder={t('settings.language.search')}
            className='h-9'
          />
          <CommandList>
            <CommandEmpty>{t('settings.language.empty')}</CommandEmpty>
            <CommandGroup>
              {languages.map(l => (
                <CommandItem
                  key={l.value}
                  value={l.value}
                  onSelect={currentValue => {
                    setValue(currentValue)
                    setOpen(false)
                    localStorage.setItem('language', currentValue)
                    i18n.changeLanguage(currentValue)
                  }}
                >
                  {l.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === l.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
