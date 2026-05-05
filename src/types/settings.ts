import type { GameTreeLaneId } from './gameTree'
import type { LanguageCode } from './skill'

export type ViewMode = 'simple' | 'detailed' | 'advanced'
export type SkillMapView = 'cards' | 'graph'

export type SettingsState = {
  language: LanguageCode
  viewMode: ViewMode
  skillMapView: SkillMapView
  sidebarCollapsed: boolean
}

export type LaneLabelMap = Record<GameTreeLaneId, string>
