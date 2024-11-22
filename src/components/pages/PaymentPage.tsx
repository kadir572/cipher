import { useStripeStore } from '@/lib/store'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '../ui/button'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export default function PaymentPage() {
  const { clientSecret } = useStripeStore()
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    if (!clientSecret) {
      toast.error(t('payment.client_secret_error'), {
        duration: 6000,
      })
      navigate('/')
    }
  }, [clientSecret, navigate, t])

  // useEffect(() => {
  //   const getClientSecret = async (
  //     amount: number,
  //     currency: string
  //   ): Promise<string> => {
  //     try {
  //       const client_secret = await invoke('get_stripe_client_secret', {
  //         amount,
  //         currency,
  //       })
  //       return client_secret as string
  //     } catch (e) {
  //       console.log(e)
  //       return e as string
  //     }
  //   }

  //   getClientSecret(500, 'chf')
  //     .then(val => setClientSecret(val))
  //     .catch(() => setClientSecret(null))
  // }, [])
  // return (
  //   clientSecret && (
  //     <Elements options={{ clientSecret }}>
  //       <div>
  //         <h1>Payment page</h1>
  //         <form>
  //           <PaymentElement />
  //           <Button type='submit'>Submit</Button>
  //         </form>
  //       </div>
  //     </Elements>
  //   )
  // )

  if (!clientSecret) return <div>No client secret found</div>

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  )
}

type CheckoutFormProps = {
  clientSecret: string
}
function CheckoutForm({ clientSecret }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      elements?.update({
        appearance: {
          variables: {
            colorBackground: '#1e293b',
            colorText: '#e2e8f0',
            tabIconSelectedColor: '#e2e8f0',
            colorPrimary: '#e2e8f0',
          },
        },
      })
    }
  }, [elements])

  const { setClientSecret } = useStripeStore()

  const handleCancel = () => {
    setClientSecret(null)
    navigate('/')
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) return

    if (!clientSecret) return

    const paymentElement = elements.getElement(PaymentElement)

    if (!paymentElement) return

    await elements.submit()

    console.log(window.location.href)

    stripe
      .confirmPayment({
        elements,
        clientSecret,
        confirmParams: {},
        redirect: 'if_required',
      })
      .then(res => {
        if (res.error) {
          console.log(res.error.message)
          return toast.error(res.error.message)
        }
        toast.success('Payment successful. Thank you for your support!')
        navigate('/')
      })
      .catch(() => {
        toast.error('Error occured')
      })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-[48rem] mx-auto p-2 flex flex-col gap-4'
    >
      <PaymentElement
        options={{
          business: { name: 'Cipher' },
          layout: { type: 'tabs' },
        }}
      />
      <div className='w-full flex items-center gap-2'>
        <Button
          onClick={handleCancel}
          className='grow'
          variant='destructive'
          type='button'
        >
          Cancel
        </Button>
        <Button className='grow' type='submit'>
          Pay
        </Button>
      </div>
    </form>
  )
}
