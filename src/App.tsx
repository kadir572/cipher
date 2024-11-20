import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './components/layouts/RootLayout'
import LandingPage from './components/pages/LandingPage'
import TestPage from './components/pages/TestPage'

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <LandingPage />,
        },
        {
          path: '/test',
          element: <TestPage />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App
