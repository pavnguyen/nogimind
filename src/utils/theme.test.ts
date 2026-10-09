import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  THEME_PREFERENCES,
  applyTheme,
  isThemePreference,
  resolveTheme,
  systemPrefersDark,
  watchSystemTheme,
} from './theme'
import { useSettingsStore } from '../stores/useSettingsStore'
import { storageKeys } from './storage'

const themeCss = readFileSync(resolve(process.cwd(), 'src/styles/hallmark-themes.css'), 'utf8')
const indexHtml = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8')

const HUB_IDS = ['learn', 'study', 'defense', 'build', 'reference']

const mockMatchMedia = (matches: boolean) => {
  const listeners = new Set<(event: MediaQueryListEvent) => void>()
  const query = {
    matches,
    media: '(prefers-color-scheme: dark)',
    onchange: null,
    addEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) => listeners.add(listener),
    removeEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }
  Object.defineProperty(window, 'matchMedia', { writable: true, value: vi.fn(() => query) })
  return { query, listeners }
}

describe('resolveTheme', () => {
  it('follows the OS appearance when the preference is system', () => {
    expect(resolveTheme('system', true)).toBe('dark')
    expect(resolveTheme('system', false)).toBe('light')
  })

  it('pins the mode when the preference is explicit, whatever the OS says', () => {
    expect(resolveTheme('light', true)).toBe('light')
    expect(resolveTheme('light', false)).toBe('light')
    expect(resolveTheme('dark', true)).toBe('dark')
    expect(resolveTheme('dark', false)).toBe('dark')
  })

  it('exposes exactly the three supported preferences', () => {
    expect([...THEME_PREFERENCES]).toEqual(['system', 'light', 'dark'])
    expect(THEME_PREFERENCES.every(isThemePreference)).toBe(true)
    expect(isThemePreference('sepia')).toBe(false)
    expect(isThemePreference(undefined)).toBe(false)
  })
})

describe('applying the theme', () => {
  it('writes the resolved mode to <html data-theme>', () => {
    applyTheme('light')
    expect(document.documentElement.dataset.theme).toBe('light')
    applyTheme('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('reads the OS preference from matchMedia, defaulting to dark when unavailable', () => {
    mockMatchMedia(true)
    expect(systemPrefersDark()).toBe(true)
    mockMatchMedia(false)
    expect(systemPrefersDark()).toBe(false)
  })

  it('notifies on OS appearance changes and stops when unsubscribed', () => {
    const { listeners } = mockMatchMedia(false)
    const onChange = vi.fn()
    const unsubscribe = watchSystemTheme(onChange)

    expect(listeners.size).toBe(1)
    for (const listener of listeners) {
      listener({ matches: true } as MediaQueryListEvent)
    }
    expect(onChange).toHaveBeenCalledWith(true)

    unsubscribe()
    expect(listeners.size).toBe(0)
  })
})

describe('stylesheets key light mode off the attribute, not the OS', () => {
  it('has a light block for the base tokens and every hub', () => {
    expect(themeCss).toContain(':root[data-theme="light"] {')
    for (const hub of HUB_IDS) {
      expect(themeCss).toContain(`:root[data-theme="light"] [data-hub="${hub}"]`)
    }
  })

  it('keeps a soft-charcoal dark default, so an unresolved attribute still renders', () => {
    expect(themeCss).not.toContain('[data-theme="dark"]')
    // Not near-black: the page is a dim warm charcoal so the theme reads as
    // "soft" rather than "lights off".
    expect(themeCss).toContain('--hallmark-bg-primary: #1a1814;')
    expect(themeCss).toContain('--hallmark-bg-surface: #232019;')
    expect(themeCss).toContain('--hallmark-bg-card: #2f2b24;')
  })

  it('no longer branches on prefers-color-scheme — that would beat the in-app choice', () => {
    expect(themeCss).not.toContain('prefers-color-scheme')
  })
})

describe('first paint', () => {
  const inlineScript = indexHtml.match(/<script>([\s\S]*?)<\/script>/)?.[1] ?? ''

  const runInlineScript = () => {
    document.documentElement.removeAttribute('data-theme')
    // The shipped script, not a copy of it.
    new Function(inlineScript)()
    return document.documentElement.dataset.theme
  }

  const persistPreference = (theme: string, version = 0) =>
    window.localStorage.setItem(storageKeys.settings, JSON.stringify({ state: { theme }, version }))

  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  afterEach(() => {
    window.localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('runs before the app bundle loads', () => {
    const scriptAt = indexHtml.indexOf('data-theme')
    const bundleAt = indexHtml.indexOf('/src/main.tsx')
    expect(scriptAt).toBeGreaterThan(-1)
    expect(scriptAt).toBeLessThan(bundleAt)
    expect(indexHtml).toContain(storageKeys.settings)
    expect(inlineScript).toContain('prefers-color-scheme: dark')
  })

  it('applies a stored light preference before render, overriding a dark OS', () => {
    mockMatchMedia(true)
    persistPreference('light')
    expect(runInlineScript()).toBe('light')
  })

  it('applies a stored dark preference over a light OS', () => {
    mockMatchMedia(false)
    persistPreference('dark')
    expect(runInlineScript()).toBe('dark')
  })

  it('defaults to light when nothing is stored, whatever the OS says', () => {
    mockMatchMedia(true)
    expect(runInlineScript()).toBe('light')

    mockMatchMedia(false)
    expect(runInlineScript()).toBe('light')
  })

  it('treats a v0 `system` value as the new light default', () => {
    mockMatchMedia(true)
    persistPreference('system')
    expect(runInlineScript()).toBe('light')
  })

  it('still follows the OS for a system preference stored as v1', () => {
    mockMatchMedia(true)
    persistPreference('system', 1)
    expect(runInlineScript()).toBe('dark')

    mockMatchMedia(false)
    expect(runInlineScript()).toBe('light')
  })

  it('falls back to the light default for an unrecognised stored value', () => {
    mockMatchMedia(true)
    persistPreference('sepia')
    expect(runInlineScript()).toBe('light')
  })
})

// Captured right after import, before any test mutates the store: this is the
// value a first-time visitor actually gets.
const defaultTheme = useSettingsStore.getState().theme

describe('settings store', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    window.localStorage.clear()
  })

  it('defaults to light', () => {
    expect(defaultTheme).toBe('light')
    expect(defaultTheme).not.toBe('system')
  })

  it('migrates a v0 `system` preference to light, once', async () => {
    window.localStorage.setItem(
      storageKeys.settings,
      JSON.stringify({ state: { theme: 'system', language: 'en' }, version: 0 }),
    )
    await useSettingsStore.persist.rehydrate()
    expect(useSettingsStore.getState().theme).toBe('light')
  })

  it('leaves a v1 `system` preference alone', async () => {
    window.localStorage.setItem(
      storageKeys.settings,
      JSON.stringify({ state: { theme: 'system', language: 'en' }, version: 1 }),
    )
    await useSettingsStore.persist.rehydrate()
    expect(useSettingsStore.getState().theme).toBe('system')
  })

  it('persists the chosen preference under the settings key', () => {
    useSettingsStore.getState().setTheme('light')
    expect(useSettingsStore.getState().theme).toBe('light')

    const persisted = window.localStorage.getItem(storageKeys.settings) ?? ''
    expect(persisted).toContain('"theme":"light"')
  })
})
