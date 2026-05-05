import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import i18n from '../i18n/i18n'
import type { LanguageCode } from '../types/skill'
import type { SkillMapView, ViewMode } from '../types/settings'
import { storageKeys } from '../utils/storage'

type SettingsStore = {
  language: LanguageCode
  viewMode: ViewMode
  skillMapView: SkillMapView
  sidebarCollapsed: boolean
  setLanguage: (language: LanguageCode) => void
  setViewMode: (viewMode: ViewMode) => void
  setSkillMapView: (skillMapView: SkillMapView) => void
  setSidebarCollapsed: (sidebarCollapsed: boolean) => void
}

const storedLanguage = () => {
  if (typeof window === 'undefined') return 'vi'
  const value = window.localStorage.getItem(storageKeys.language)
  return value === 'en' || value === 'fr' || value === 'vi' ? value : 'vi'
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      language: storedLanguage(),
      viewMode: 'detailed',
      skillMapView: 'cards',
      sidebarCollapsed: false,
      setLanguage: (language) => {
        if (typeof window !== 'undefined') window.localStorage.setItem(storageKeys.language, language)
        i18n.changeLanguage(language)
        set({ language })
      },
      setViewMode: (viewMode) => set({ viewMode }),
      setSkillMapView: (skillMapView) => set({ skillMapView }),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
    }),
    {
      name: storageKeys.settings,
      partialize: (state) => ({
        language: state.language,
        viewMode: state.viewMode,
        skillMapView: state.skillMapView,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.setLanguage(state.language)
      },
    },
  ),
)
