import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '../../utils'
import { useApp } from 'contexts/use-app'
import IconSprite from 'components/ui/iconSprite'
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent
} from 'components/ui/dropdown'
import { AVAILABLE_LANGUAGES, type LanguageConfig } from 'config/languages'

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { setLanguage } = useApp()

  const currentLanguage = i18n.language

  const changeLanguage = (language: LanguageConfig): void => {
    setLanguage(language)
    // Dropdown closes automatically via onOpenChange
  }

  const getCurrentLanguageLabel = (): string => {
    return (
      AVAILABLE_LANGUAGES.find((lang) => lang.code === currentLanguage)?.name ||
      'English'
    )
  }

  return (
    <div className="relative inline-block text-left">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger
          className={cn(
            'inline-flex w-full justify-center gap-x-1.5 rounded-md bg-background px-3 py-2 text-sm font-semibold text-foreground/90 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-background/50 transition-all duration-200',
            isOpen ? 'ring-2 ring-blue-500' : 'ring-gray-300'
          )}
          aria-label="Select language"
        >
          <span className="flex items-center">{getCurrentLanguageLabel()}</span>
          <IconSprite
            name="chevron-down"
            className={cn(
              'h-5 w-5 text-foreground/40 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
            aria-hidden="true"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute right-0 z-[10001] mt-2 w-56 origin-top-right rounded-md bg-background shadow-lg ring-1 ring-black focus:outline-none">
          <div className="py-1">
            {AVAILABLE_LANGUAGES.map((language) => (
              <DropdownMenuItem
                key={language.code}
                onClick={() => changeLanguage(language)}
                className={cn(
                  'text-foreground/70 block px-4 py-2 text-sm hover:bg-background/10 cursor-pointer transition-colors duration-150',
                  currentLanguage === language.code &&
                    'bg-background/50 font-medium'
                )}
              >
                {language.name}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
