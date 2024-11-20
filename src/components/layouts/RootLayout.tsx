import { Outlet } from 'react-router-dom'
import Header from '../partials/Header'
import Footer from '../partials/Footer'

export default function RootLayout() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
