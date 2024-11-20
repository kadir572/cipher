import { getVersion } from '@tauri-apps/api/app'
import { useEffect, useState } from 'react'

export default function Header() {
  const [version, setVersion] = useState<string | null>(null)

  useEffect(() => {
    const tauriVersion = async () => {
      try {
        setVersion(await getVersion())
      } catch (e) {
        console.error(e)
      }
    }

    tauriVersion()
  }, [])
  return (
    <header className='px-4 py-2 flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <span className='text-3xl font-bold'>Cipher</span>
        <span className='bg-slate-200 px-2 py-px rounded-md'>v{version}</span>
      </div>
    </header>
  )
}
