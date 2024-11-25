import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './components/layouts/RootLayout'
import LandingPage from './components/pages/LandingPage'
import PaymentPage from './components/pages/PaymentPage'
import ErrorElement from './components/ErrorElement'

export default function App() {
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

  return <RouterProvider router={router} />
}
