import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { hubNavItems, pathInHub } from '../components/layout/navItems'
import type { HubId } from '../contexts/HubThemeContext'

// ── Theme metadata ────────────────────────────────────────────────────────

export interface HallmarkThemeInfo {
  hubId: HubId | null
  /** Human-readable label for the theme */
  themeName: string
  /** CSS `accent` color value (oklch) */
  accent: string
  /** Tailwind-compatible accent name for constructing classes */
  accentName: string
  /** Display font family name */
  displayFont: string
  /** Whether this theme uses italic display by default */
  displayItalic: boolean
}

const themeRegistry: Record<HubId, Omit<HallmarkThemeInfo, 'hubId'>> = {
  learn: {
    themeName: 'Salon',
    accent: 'oklch(0.62 0.19 58)',
    accentName: 'amber',
    displayFont: 'Fraunces',
    displayItalic: true,
  },
  study: {
    themeName: 'Linen',
    accent: 'oklch(0.72 0.19 148)',
    accentName: 'emerald',
    displayFont: 'Fraunces',
    displayItalic: false,
  },
  fix: {
    themeName: 'Newsprint',
    accent: 'oklch(0.52 0.22 29)',
    accentName: 'rose',
    displayFont: 'Fraunces',
    displayItalic: true,
  },
  build: {
    themeName: 'Midnight',
    accent: 'oklch(0.72 0.16 205)',
    accentName: 'cyan',
    displayFont: 'Fraunces',
    displayItalic: false,
  },
  reference: {
    themeName: 'Plain',
    accent: 'oklch(0.55 0.18 265)',
    accentName: 'blue',
    displayFont: 'Fraunces',
    displayItalic: false,
  },
}

/**
 * Returns the current Hallmark theme info based on the active route.
 * Useful for components that need to know their theme programmatically
 * (e.g. to construct dynamic Tailwind classes or pick accent-aware icons).
 */
export const useHubTheme = (): HallmarkThemeInfo => {
  const location = useLocation()

  return useMemo(() => {
    const matchedHub = hubNavItems.find((hub) => pathInHub(location.pathname, hub))
    const hubId = matchedHub?.hub as HubId | undefined

    if (!hubId || !themeRegistry[hubId]) {
      // Fallback: dashboard / unmatched route
      return {
        hubId: null,
        themeName: 'Base',
        accent: 'oklch(0.72 0.15 165)',
        accentName: 'emerald',
        displayFont: 'Fraunces',
        displayItalic: false,
      }
    }

    return { hubId, ...themeRegistry[hubId] }
  }, [location.pathname])
}

/**
 * Returns the CSS variable string for a given token name.
 * Use this to construct inline styles that reference the current hub's theme token.
 *
 * @example
 * const accentColor = getThemeVar('--hallmark-accent')
 * // → 'var(--hallmark-accent)'
 */
export const getThemeVar = (token: `--hallmark-${string}`): string => `var(${token})`

/**
 * Returns a Tailwind class-safe accent prefix for constructing dynamic classes.
 *
 * @example
 * const prefix = getAccentPrefix() // 'amber' when on Learn hub
 * // → `border-${prefix}-400/20 bg-${prefix}-400/10`
 */
export const useAccentPrefix = (): string => {
  const theme = useHubTheme()
  return theme.accentName
}
