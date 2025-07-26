import { useTranslation } from 'react-i18next'
import { Languages } from 'lucide-react'
import { useState } from 'react'
import { AVAILABLE_LANGUAGES } from 'config/languages'

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation('common')
  const [isOpen, setIsOpen] = useState(false)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Languages className="size-5" />
        <span className="text-sm font-semibold">{t('language')}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none">
          {AVAILABLE_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
