import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './components/layouts/RootLayout'
import LandingPage from './components/pages/LandingPage'
import PaymentPage from './components/pages/PaymentPage'
import ErrorElement from './components/ErrorElement'
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export default function App() {
  // const getClientSecret = async (
  //   amount: number,
  //   currency: string
  // ): Promise<string> => {
  //   try {
  //     const client_secret = await invoke('get_stripe_client_secret', {
  //       amount,
  //       currency,
  //     })
  //     return client_secret as string
  //   } catch (e) {
  //     console.log(e)
  //     return e as string
  //   }
  // }

  // getClientSecret(500, 'chf').then(val => console.log(val))

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <LandingPage />,
          errorElement: <ErrorElement />,
        },
        {
          path: '/payment',
          element: <PaymentPage />,
          errorElement: <ErrorElement />,
        },
      ],
    },
  ])

  return (
    // <Elements stripe={stripePromise} options={options}>
    <RouterProvider router={router} />
    // </Elements>
  )
}
