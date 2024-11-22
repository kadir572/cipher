import { Outlet } from 'react-router-dom'
import Header from '../partials/Header'
import Footer from '../partials/Footer'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useThemeStore } from '@/lib/store'

export default function RootLayout() {
  const { i18n } = useTranslation()
  const { toggleDarkMode } = useThemeStore()
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('language') ?? 'en')
  }, [i18n])

  useEffect(() => {
    const theme = JSON.parse(localStorage.getItem('isDarkMode') ?? 'false') // Default to false
    console.log('Initial theme: ', theme)
    toggleDarkMode(theme)
  }, [toggleDarkMode])

  return (
    <div className='flex flex-col min-h-screen dark:bg-slate-700'>
      <Header />
      <main className='grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
