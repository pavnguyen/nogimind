import { useEffect } from 'react'
import { useSettingsStore } from '../stores/useSettingsStore'
import { applyTheme, resolveTheme, systemPrefersDark, watchSystemTheme } from '../utils/theme'

/**
 * Keeps `<html data-theme>` in sync with the stored appearance preference.
 *
 * `index.html` already resolved the attribute before the first paint; this
 * hook is what makes the in-app control take effect afterwards, and what keeps
 * `system` following the OS while the app is open.
 */
export const useThemeSync = (): void => {
  const theme = useSettingsStore((state) => state.theme)

  useEffect(() => {
    const apply = () => applyTheme(resolveTheme(theme, systemPrefersDark()))
    apply()

    // Only `system` needs to react to later OS appearance changes.
    if (theme !== 'system') return
    return watchSystemTheme(apply)
  }, [theme])
}
