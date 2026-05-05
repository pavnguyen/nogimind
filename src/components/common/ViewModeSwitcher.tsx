import { useTranslation } from 'react-i18next'
import { useSettingsStore } from '../../stores/useSettingsStore'
import type { ViewMode } from '../../types/settings'

const modes: ViewMode[] = ['simple', 'detailed', 'advanced']

export const ViewModeSwitcher = () => {
  const { t } = useTranslation()
  const value = useSettingsStore((state) => state.viewMode)
  const setValue = useSettingsStore((state) => state.setViewMode)

  return (
    <div className="inline-flex rounded-lg border border-white/10 bg-slate-950/70 p-1">
      {modes.map((mode) => (
        <button
          type="button"
          key={mode}
          onClick={() => setValue(mode)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${value === mode ? 'bg-cyan-300 text-slate-950' : 'text-slate-300 hover:bg-white/10'}`}
        >
          {t(`settings.${mode}`)}
        </button>
      ))}
    </div>
  )
}
