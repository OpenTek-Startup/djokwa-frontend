import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../contexts/theme-provider'
import { useTranslation } from 'react-i18next'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation('common')

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex size-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label={t('theme')}
      title={t('theme')}
    >
      {theme === 'dark' ? (
        <Sun className="size-6" />
      ) : (
        <Moon className="size-6" />
      )}
    </button>
  )
}
