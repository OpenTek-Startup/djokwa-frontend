export interface LanguageConfig {
  code: string
  name: string
}

export const AVAILABLE_LANGUAGES: LanguageConfig[] = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' }
]
