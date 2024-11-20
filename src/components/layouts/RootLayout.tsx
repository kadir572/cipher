import { Outlet } from 'react-router-dom'
import Header from '../partials/Header'
import Footer from '../partials/Footer'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export default function RootLayout() {
  const { i18n } = useTranslation()
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('language') ?? 'en')
  }, [i18n])
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
