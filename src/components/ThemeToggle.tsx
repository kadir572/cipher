import { useThemeStore } from '@/lib/stores/settings.store'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import MoonIcon from './icons/MoonIcon'
import SunIcon from './icons/SunIcon'

export default function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useThemeStore()

  const handleChange = (checked: boolean) => {
    toggleDarkMode(checked)
    localStorage.setItem('isDarkMode', JSON.stringify(checked))
  }

  return (
    <div className='flex items-center gap-4'>
      <Switch
        id='theme-switch'
        onCheckedChange={handleChange}
        checked={isDarkMode}
      />
      <Label htmlFor='theme-switch'>
        {isDarkMode ? <MoonIcon /> : <SunIcon />}
      </Label>
    </div>
  )
}
