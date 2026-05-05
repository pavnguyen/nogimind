import { useSettingsStore } from '../../stores/useSettingsStore'
import type { LanguageCode } from '../../types/skill'

const languages: { code: LanguageCode; label: string }[] = [
  { code: 'vi', label: 'Vietnamese' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
]

export const LanguageSwitcher = () => {
  const language = useSettingsStore((state) => state.language)
  const setLanguage = useSettingsStore((state) => state.setLanguage)

  return (
    <div className="inline-flex rounded-lg border border-white/10 bg-slate-950/70 p-1">
      {languages.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => setLanguage(item.code)}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
            language === item.code ? 'bg-emerald-400 text-slate-950' : 'text-slate-300 hover:bg-white/10'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
