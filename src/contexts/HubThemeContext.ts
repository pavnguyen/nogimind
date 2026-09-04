import { createContext, useContext } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────

export type HubId = 'learn' | 'study' | 'fix' | 'build' | 'reference'

export interface HubTheme {
  /** The active hub ID, or null for Dashboard/unmatched routes */
  hubId: HubId | null
  /** CSS `data-hub` attribute value to set on the wrapper */
  dataAttr: string
}

// ── Context ───────────────────────────────────────────────────────────────

export const HubThemeContext = createContext<HubTheme>({ hubId: null, dataAttr: '' })

// ── Hook ──────────────────────────────────────────────────────────────────

export const useHubThemeContext = () => useContext(HubThemeContext)