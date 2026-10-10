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
    <div className="inline-flex shrink-0 rounded-lg border border-warm-50/10 bg-warm-950/70 p-0.5">
      {languages.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => setLanguage(item.code)}
          // py-2 keeps each language button at a comfortable phone tap height.
          className={`rounded-md px-2.5 py-2 text-[11px] font-semibold tracking-wider transition ${
            language === item.code ? 'bg-jade-400 text-on-accent' : 'text-warm-400 hover:bg-warm-50/10 hover:text-warm-200'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
