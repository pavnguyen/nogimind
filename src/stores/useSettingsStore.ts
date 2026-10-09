import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import i18n from '../i18n/i18n'
import type { LanguageCode } from '../types/skill'
import type { SkillMapView, ThemePreference, ViewMode } from '../types/settings'
import { isThemePreference } from '../utils/theme'
import { storageKeys } from '../utils/storage'

type SettingsStore = {
  language: LanguageCode
  languageExplicitlyChosen: boolean
  viewMode: ViewMode
  skillMapView: SkillMapView
  sidebarCollapsed: boolean
  theme: ThemePreference
  setLanguage: (language: LanguageCode) => void
  setViewMode: (viewMode: ViewMode) => void
  setSkillMapView: (skillMapView: SkillMapView) => void
  setSidebarCollapsed: (sidebarCollapsed: boolean) => void
  setTheme: (theme: ThemePreference) => void
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
      theme: 'light',
      setLanguage: (language) => {
        if (typeof window !== 'undefined') window.localStorage.setItem(storageKeys.language, language)
        i18n.changeLanguage(language)
        set({ language, languageExplicitlyChosen: true })
      },
      setViewMode: (viewMode) => set({ viewMode }),
      setSkillMapView: (skillMapView) => set({ skillMapView }),
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: storageKeys.settings,
      // v0 defaulted to `system`. Anyone who never opened the appearance control
      // still carries that value, so a one-time migration is what actually makes
      // `light` the default for existing installs too. A deliberate pick made
      // from now on is written as v1 and is never touched again.
      version: 1,
      migrate: (persisted, version) => {
        const state = { ...(persisted as Record<string, unknown>) }
        if (version < 1 && (state.theme === undefined || state.theme === 'system')) state.theme = 'light'
        return state as unknown as SettingsStore
      },
      partialize: (state) => ({
        language: state.language,
        languageExplicitlyChosen: state.languageExplicitlyChosen,
        viewMode: state.viewMode,
        skillMapView: state.skillMapView,
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return
        const language = state.language === 'en' || state.language === 'fr' || state.language === 'vi' ? state.language : 'en'
        state.setLanguage(language)
        // A corrupt value must not reach the DOM attribute; fall back to the
        // default rather than to the OS.
        if (!isThemePreference(state.theme)) state.setTheme('light')
      },
    },
  ),
)
