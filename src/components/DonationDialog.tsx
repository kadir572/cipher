import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import HeartIcon from './icons/HeartIcon'
import { invoke } from '@tauri-apps/api/core'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useStripeStore } from '@/lib/store'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

export default function DonationDialog() {
  const [secretKey, setSecretKey] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [currency, setCurrency] = useState<string>('CHF')
  const [open, setOpen] = useState<boolean>(false)
  const [currencyOpen, setCurrencyOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const { setClientSecret } = useStripeStore()
  const { t } = useTranslation()

  const currencies: { value: string; decimals: number }[] = [
    { value: 'CHF', decimals: 2 },
    { value: 'EUR', decimals: 2 },
    { value: 'USD', decimals: 2 },
    { value: 'GBP', decimals: 2 },
    { value: 'AED', decimals: 2 },
    { value: 'ALL', decimals: 2 },
    { value: 'AMD', decimals: 2 },
    { value: 'ANG', decimals: 2 },
    { value: 'AOA', decimals: 2 },
    { value: 'ARS', decimals: 2 },
    { value: 'AUD', decimals: 2 },
    { value: 'AWG', decimals: 2 },
    { value: 'AZN', decimals: 2 },
    { value: 'BAM', decimals: 2 },
    { value: 'BBD', decimals: 2 },
    { value: 'BDT', decimals: 2 },
    { value: 'BGN', decimals: 2 },
    { value: 'BMD', decimals: 2 },
    { value: 'BND', decimals: 2 },
    { value: 'BOB', decimals: 2 },
    { value: 'BRL', decimals: 2 },
    { value: 'BSD', decimals: 2 },
    { value: 'BWP', decimals: 2 },
    { value: 'BYN', decimals: 2 },
    { value: 'BZD', decimals: 2 },
    { value: 'CAD', decimals: 2 },
    { value: 'CDF', decimals: 2 },
    { value: 'CNY', decimals: 2 },
    { value: 'COP', decimals: 2 },
    { value: 'CRC', decimals: 2 },
    { value: 'CVE', decimals: 2 },
    { value: 'CZK', decimals: 2 },
    { value: 'DKK', decimals: 2 },
    { value: 'DOP', decimals: 2 },
    { value: 'DZD', decimals: 2 },
    { value: 'EGP', decimals: 2 },
    { value: 'ETB', decimals: 2 },
    { value: 'FJD', decimals: 2 },
    { value: 'GEL', decimals: 2 },
    { value: 'GIP', decimals: 2 },
    { value: 'GMD', decimals: 2 },
    { value: 'GTQ', decimals: 2 },
    { value: 'GYD', decimals: 2 },
    { value: 'HKD', decimals: 2 },
    { value: 'HNL', decimals: 2 },
    { value: 'HTG', decimals: 2 },
    { value: 'IDR', decimals: 2 },
    { value: 'ILS', decimals: 2 },
    { value: 'INR', decimals: 2 },
    { value: 'JPY', decimals: 0 },
    { value: 'KES', decimals: 2 },
    { value: 'KGS', decimals: 2 },
    { value: 'KHR', decimals: 2 },
    { value: 'KMF', decimals: 0 },
    { value: 'KRW', decimals: 0 },
    { value: 'KYD', decimals: 2 },
    { value: 'KZT', decimals: 2 },
    { value: 'LBP', decimals: 2 },
    { value: 'LKR', decimals: 2 },
    { value: 'LRD', decimals: 2 },
    { value: 'LSL', decimals: 2 },
    { value: 'MAD', decimals: 2 },
    { value: 'MDL', decimals: 2 },
    { value: 'MKD', decimals: 2 },
    { value: 'MMK', decimals: 2 },
    { value: 'MNT', decimals: 2 },
    { value: 'MOP', decimals: 2 },
    { value: 'MUR', decimals: 2 },
    { value: 'MVR', decimals: 2 },
    { value: 'MWK', decimals: 2 },
    { value: 'MXN', decimals: 2 },
    { value: 'MYR', decimals: 2 },
    { value: 'MZN', decimals: 2 },
    { value: 'NAD', decimals: 2 },
    { value: 'NGN', decimals: 2 },
    { value: 'NIO', decimals: 2 },
    { value: 'NOK', decimals: 2 },
    { value: 'NPR', decimals: 2 },
    { value: 'NZD', decimals: 2 },
    { value: 'PAB', decimals: 2 },
    { value: 'PEN', decimals: 2 },
    { value: 'PHP', decimals: 2 },
    { value: 'PKR', decimals: 2 },
    { value: 'PLN', decimals: 2 },
    { value: 'QAR', decimals: 2 },
    { value: 'RON', decimals: 2 },
    { value: 'RSD', decimals: 2 },
    { value: 'RUB', decimals: 2 },
    { value: 'SAR', decimals: 2 },
    { value: 'SBD', decimals: 2 },
    { value: 'SCR', decimals: 2 },
    { value: 'SEK', decimals: 2 },
    { value: 'SGD', decimals: 2 },
    { value: 'SOS', decimals: 2 },
    { value: 'SYP', decimals: 2 },
    { value: 'THB', decimals: 2 },
    { value: 'TJS', decimals: 2 },
    { value: 'TOP', decimals: 2 },
    { value: 'TRY', decimals: 2 },
    { value: 'TTD', decimals: 2 },
    { value: 'TWD', decimals: 2 },
    { value: 'TZS', decimals: 2 },
    { value: 'UAH', decimals: 2 },
    { value: 'UYU', decimals: 2 },
    { value: 'UZS', decimals: 2 },
    { value: 'VND', decimals: 0 },
    { value: 'WST', decimals: 2 },
    { value: 'XCD', decimals: 2 },
    { value: 'YER', decimals: 2 },
    { value: 'ZAR', decimals: 2 },
    { value: 'ZMW', decimals: 2 },
  ]

  const handleChangeOpen = async (open: boolean) => {
    if (!open) {
      setAmount('')
    }
    setOpen(open)
    try {
      const key = (await invoke('get_stripe_private_key')) as string
      console.log(key)
      setSecretKey(key)
    } catch (e) {
      setSecretKey(e as string)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    toast.promise(
      () =>
        invoke('get_stripe_client_secret', {
          amount:
            Number(amount) *
            (currencies.find(c => c.value === currency)?.decimals === 2
              ? 100
              : 1),
          currency,
        }),
      {
        loading: 'Redirecting...',
        success: res => {
          const resData = res as {
            client_secret: string
            amount: number
            currency: string
          }
          console.log(resData)
          setClientSecret(resData.client_secret as string)
          setOpen(false)
          setAmount('')
          navigate('/payment')
          return 'Payment intent created successfully!'
        },
        error: res => {
          setAmount('')
          return res.message
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleChangeOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          type='button'
          className='flex items-center gap-2 bg-red-500 text-white hover:bg-red-600 hover:text-white dark:bg-red-800 dark:hover:bg-red-900 dark:text-slate-200'
        >
          <span>
            <HeartIcon />
          </span>
          <span>{t('donation.dialog_button_label')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='dark:bg-slate-700 dark:text-slate-200 '>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <DialogHeader>
            <DialogTitle>{t('donation.title')}</DialogTitle>
            <DialogDescription className='dark:text-gray-300'>
              {t('donation.description')}
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label className='dark:text-gray-300' htmlFor='amount'>
              {t('donation.currency.label')}
            </Label>
            <div className='flex flex-col'>
              <span>{import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}</span>
              <span>{secretKey}</span>
            </div>
            <div className='flex items-center gap-4'>
              <div className='relative'>
                <Input
                  autoFocus
                  type='text'
                  pattern='^\d+(\.\d{1,2})?$'
                  id='amount'
                  onChange={e => setAmount(e.target.value)}
                  value={amount}
                  placeholder={t('donation.currency.placeholder')}
                  className='pr-12 dark:bg-slate-800 dark:placeholder:text-gray-300'
                />
                <span className='absolute right-3 top-[50%] -translate-y-[50%] text-gray-300 text-sm'>
                  {currency}
                </span>
              </div>
              <Popover open={currencyOpen} onOpenChange={setCurrencyOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={currencyOpen}
                    className='w-[200px] justify-between dark:bg-slate-800 dark:text-gray-300'
                  >
                    {currency}
                    <ChevronsUpDown className='opacity-50' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className='max-w-[200px] p-0'
                  onWheel={e => e.stopPropagation()}
                >
                  <Command className='dark:bg-slate-600'>
                    <CommandInput
                      placeholder={t('donation.currency.search')}
                      className='h-9'
                    />
                    <CommandList>
                      <CommandEmpty>{t('donation.curency.empty')}</CommandEmpty>
                      <CommandGroup>
                        {currencies.map(c => (
                          <CommandItem
                            key={c.value}
                            value={c.value}
                            onSelect={currentValue => {
                              setCurrency(currentValue)
                              setCurrencyOpen(false)
                            }}
                          >
                            {c.value}
                            <Check
                              className={cn(
                                'ml-auto',
                                currency === c.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogDescription className='dark:text-gray-300'>
            {t('donation.info')}
          </DialogDescription>
          <DialogFooter className='mt-4'>
            <Button type='submit' className='dark:bg-slate-200'>
              {t('donation.dialog_submit_button_label')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
