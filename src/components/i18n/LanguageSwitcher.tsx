import { useSettingsStore } from '../../stores/useSettingsStore'
import type { LanguageCode } from '../../types/skill'

const languages: { code: LanguageCode; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'vi', label: 'VN' },
  { code: 'fr', label: 'FR' },
]

export const LanguageSwitcher = () => {
  const language = useSettingsStore((state) => state.language)
  const setLanguage = useSettingsStore((state) => state.setLanguage)

  return (
    <div className="inline-flex rounded-lg border border-white/10 bg-slate-950/70 p-0.5">
      {languages.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => setLanguage(item.code)}
          className={`rounded-md px-1.5 py-1 text-[11px] font-semibold tracking-wider transition ${
            language === item.code ? 'bg-emerald-400 text-slate-950' : 'text-slate-400 hover:bg-white/10 hover:text-slate-200'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
