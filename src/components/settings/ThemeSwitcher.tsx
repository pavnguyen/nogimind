import { Monitor, Moon, Sun, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSettingsStore } from '../../stores/useSettingsStore'
import type { ThemePreference } from '../../types/settings'
import { cn } from '../../utils/cn'

const options: { value: ThemePreference; labelKey: string; icon: LucideIcon }[] = [
  { value: 'system', labelKey: 'settings.themeSystem', icon: Monitor },
  { value: 'light', labelKey: 'settings.themeLight', icon: Sun },
  { value: 'dark', labelKey: 'settings.themeDark', icon: Moon },
]

/**
 * Appearance picker. It only writes the preference to the store,
 * `useThemeSync` (mounted in App) turns it into `<html data-theme>`.
 */
export const ThemeSwitcher = () => {
  const { t } = useTranslation()
  const theme = useSettingsStore((state) => state.theme)
  const setTheme = useSettingsStore((state) => state.setTheme)

  return (
    <div
      role="group"
      aria-label={t('settings.theme')}
      className="inline-flex shrink-0 rounded-lg border border-warm-50/10 bg-warm-950/70 p-0.5"
    >
      {options.map(({ value, labelKey, icon: Icon }) => {
        const active = theme === value
        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-pressed={active}
            className={cn(
              'inline-flex min-h-9 items-center gap-1.5 rounded-md px-3 py-2 text-[11px] font-semibold tracking-wide transition',
              active ? 'bg-jade-400 text-on-accent' : 'text-warm-400 hover:bg-warm-50/10 hover:text-warm-200',
            )}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {t(labelKey)}
          </button>
        )
      })}
    </div>
  )
}
