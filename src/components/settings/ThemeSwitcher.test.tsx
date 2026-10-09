import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeSwitcher } from './ThemeSwitcher'
import { useThemeSync } from '../../hooks/useThemeSync'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { storageKeys } from '../../utils/storage'

// `useThemeSync` mirrors App: the switcher only stores the preference, the hook
// is what applies it to <html>.
const Harness = () => {
  useThemeSync()
  return <ThemeSwitcher />
}

const mockSystemDark = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn(() => ({
      matches,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

const currentTheme = () => document.documentElement.dataset.theme
const option = (key: string) => screen.getByRole('button', { name: key })

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    window.localStorage.clear()
    mockSystemDark(true)
    useSettingsStore.setState({ theme: 'system' })
    document.documentElement.removeAttribute('data-theme')
  })

  afterEach(() => {
    window.localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('offers system, light and dark', () => {
    render(<Harness />)
    expect(screen.getByRole('group', { name: 'settings.theme' })).toBeInTheDocument()
    expect(option('settings.themeSystem')).toHaveAttribute('aria-pressed', 'true')
    expect(option('settings.themeLight')).toHaveAttribute('aria-pressed', 'false')
    expect(option('settings.themeDark')).toHaveAttribute('aria-pressed', 'false')
  })

  it('follows the OS appearance while the preference is system', () => {
    mockSystemDark(true)
    render(<Harness />)
    expect(currentTheme()).toBe('dark')
  })

  it('overrides a dark OS when light is chosen', async () => {
    const user = userEvent.setup()
    mockSystemDark(true)
    render(<Harness />)

    await user.click(option('settings.themeLight'))

    expect(currentTheme()).toBe('light')
    expect(option('settings.themeLight')).toHaveAttribute('aria-pressed', 'true')
    expect(option('settings.themeSystem')).toHaveAttribute('aria-pressed', 'false')
    expect(window.localStorage.getItem(storageKeys.settings)).toContain('"theme":"light"')
  })

  it('overrides a light OS when dark is chosen', async () => {
    const user = userEvent.setup()
    mockSystemDark(false)
    render(<Harness />)
    expect(currentTheme()).toBe('light')

    await user.click(option('settings.themeDark'))

    expect(currentTheme()).toBe('dark')
    expect(window.localStorage.getItem(storageKeys.settings)).toContain('"theme":"dark"')
  })
})
