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
import { z, ZodIssue } from 'zod'
import { currencies } from '@/lib/constants'

export default function DonationDialog() {
  const [amount, setAmount] = useState<string>('')
  const [currency, setCurrency] = useState<string>('CHF')
  const [open, setOpen] = useState<boolean>(false)
  const [currencyOpen, setCurrencyOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const { setClientSecret } = useStripeStore()
  const { t } = useTranslation()

  const donationAmountSchema = z
    .string()
    .min(1, t('donation.min')) // Minimum value of 1
    .refine(value => !isNaN(Number(value)), {
      message: t('donation.valid'), // Ensure it's a valid number
    })
    .refine(value => Number(value) >= 1, {
      message: 'Must be atleast 1',
    })

  const donationAmountValidation = donationAmountSchema.safeParse(amount)

  const handleOpenDialog = (open: boolean) => {
    if (!open) setAmount('')
    setOpen(open)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (amount.length <= 0) return

    const myPromise = (num: number) =>
      new Promise((resolve, reject) => {
        if (num > 2) {
          resolve('Success!!')
        }
        reject('Error happened')
      })

    myPromise(5)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

    try {
      const res = await myPromise(5)
      console.log(res)
    } catch (e) {
      console.log(e)
    }

    try {
      await invoke('check_network')
    } catch (e) {
      console.error(e)
      return toast.error(
        'It looks like you’re offline. Please check your internet connection and try again.',
        { duration: 6000 }
      )
    }

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
        loading: 'Preparing your payment, please wait...',
        success: res => {
          const resData = res as {
            client_secret: string
            amount: number
            currency: string
          }
          setClientSecret(resData.client_secret as string)
          setOpen(false)
          setAmount('')
          navigate('/payment')
          return 'You’re all set! Please enter your card details to complete the payment.'
        },
        error: () => {
          setAmount('')
          return 'Something went wrong. Unable to connect to Stripe. Please try again later.'
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenDialog}>
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
          {amount.length >= 1 && !donationAmountValidation.success && (
            <div
              className={`flex flex-col text-sm list-disc w-fit ${
                amount.length > 0 ? 'opacity-100' : 'opacity-0'
              } transition-all duration-200`}
            >
              {donationAmountValidation.error.issues.map(
                (issue: ZodIssue, index: number) => (
                  <li
                    className='transition-all duration-200 transform text-red-500 dark:text-slate-200'
                    key={index}
                  >
                    {issue.message}
                  </li>
                )
              )}
            </div>
          )}
          <DialogDescription className='dark:text-gray-300'>
            {t('donation.info')}
          </DialogDescription>
          <DialogFooter className='mt-4'>
            <Button
              type='submit'
              disabled={amount.length <= 0 || !donationAmountValidation.success}
              className='dark:bg-slate-200'
            >
              {t('donation.dialog_submit_button_label')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
