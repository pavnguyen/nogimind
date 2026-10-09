/**
 * Theme resolution for the light/dark switch.
 *
 * The user's choice (`system` | `light` | `dark`) lives in `useSettingsStore`
 * and is resolved into a concrete `data-theme` attribute on `<html>`:
 *
 *     system → whatever `prefers-color-scheme` reports right now
 *     light  → data-theme="light"
 *     dark   → data-theme="dark"
 *
 * `src/styles/hallmark-themes.css` keys its light blocks off
 * `html[data-theme="light"]` instead of a media query, which is what lets the
 * in-app choice override the OS. Because the attribute (and not the media
 * query) decides, the same resolution runs in a tiny inline script in
 * `index.html` before the first paint — a returning light-mode user never sees
 * a dark flash. Keep the two implementations in sync; `theme.test.ts` checks
 * the CSS contract they depend on.
 */

import type { ThemePreference } from '../types/settings'

export type { ThemePreference }

export type ResolvedTheme = 'light' | 'dark'

export const THEME_PREFERENCES: readonly ThemePreference[] = ['system', 'light', 'dark']

export const isThemePreference = (value: unknown): value is ThemePreference =>
  value === 'system' || value === 'light' || value === 'dark'

/** Pure so the inline script in index.html can mirror it in plain JS. */
export const resolveTheme = (preference: ThemePreference, prefersDark: boolean): ResolvedTheme =>
  preference === 'system' ? (prefersDark ? 'dark' : 'light') : preference

export const systemPrefersDark = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches

export const applyTheme = (theme: ResolvedTheme): void => {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = theme
}

/** Notifies when the OS appearance changes. Returns an unsubscribe function. */
export const watchSystemTheme = (onChange: (prefersDark: boolean) => void): (() => void) => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {}
  const query = window.matchMedia('(prefers-color-scheme: dark)')
  const handler = (event: MediaQueryListEvent) => onChange(event.matches)
  query.addEventListener('change', handler)
  return () => query.removeEventListener('change', handler)
}
