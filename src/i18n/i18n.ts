import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { en } from './resources/en'
import { fr } from './resources/fr'
import { vi } from './resources/vi'
import type { LanguageCode } from '../types/skill'

const supportedLanguages: LanguageCode[] = ['vi', 'en', 'fr']

const storedLanguage =
  typeof window !== 'undefined' ? window.localStorage.getItem('nogi_language') : null

const initialLanguage = supportedLanguages.includes(storedLanguage as LanguageCode)
  ? (storedLanguage as LanguageCode)
  : 'vi'

i18n.use(initReactI18next).init({
  resources: {
    vi: { translation: vi },
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  returnEmptyString: false,
})

export default i18n
