import type { LanguageCode } from './skill'

export type ViewMode = 'simple' | 'detailed' | 'advanced'

export type SkillMapView = 'cards' | 'list'

export type SettingsState = {
  language: LanguageCode
  viewMode: ViewMode
  sidebarCollapsed: boolean
}
