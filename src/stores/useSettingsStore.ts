import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import i18n from '../i18n/i18n'
import type { LanguageCode } from '../types/skill'
import type { SkillMapView, ViewMode } from '../types/settings'
import { storageKeys } from '../utils/storage'

type SettingsStore = {
  language: LanguageCode
  languageExplicitlyChosen: boolean
  viewMode: ViewMode
  skillMapView: SkillMapView
  sidebarCollapsed: boolean
  setLanguage: (language: LanguageCode) => void
  setViewMode: (viewMode: ViewMode) => void
  setSkillMapView: (skillMapView: SkillMapView) => void
  setSidebarCollapsed: (sidebarCollapsed: boolean) => void
}

const storedLanguage = () => {
  if (typeof window === 'undefined') return 'en'
  const value = window.localStorage.getItem(storageKeys.language)
  return value === 'en' || value === 'fr' || value === 'vi' ? value : 'en'
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      language: storedLanguage(),
      languageExplicitlyChosen: false,
      viewMode: 'detailed',
      skillMapView: 'cards',
      sidebarCollapsed: false,
      setLanguage: (language) => {
        if (typeof window !== 'undefined') window.localStorage.setItem(storageKeys.language, language)
        i18n.changeLanguage(language)
        set({ language, languageExplicitlyChosen: true })
      },
      setViewMode: (viewMode) => set({ viewMode }),
      setSkillMapView: (skillMapView) => set({ skillMapView }),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
    }),
    {
      name: storageKeys.settings,
      partialize: (state) => ({
        language: state.language,
        languageExplicitlyChosen: state.languageExplicitlyChosen,
        viewMode: state.viewMode,
        skillMapView: state.skillMapView,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return
        const language = state.language === 'en' || state.language === 'fr' || state.language === 'vi' ? state.language : 'en'
        state.setLanguage(language)
      },
    },
  ),
)
