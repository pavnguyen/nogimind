import type { LanguageCode } from './skill'

export type ViewMode = 'simple' | 'detailed' | 'advanced'

export type SkillMapView = 'cards' | 'list'

/**
 * `system` follows the device appearance, `light`/`dark` pin the app to that
 * mode regardless of the OS setting.
 */
export type ThemePreference = 'system' | 'light' | 'dark'

export type SettingsState = {
  language: LanguageCode
  viewMode: ViewMode
  sidebarCollapsed: boolean
  theme: ThemePreference
}
