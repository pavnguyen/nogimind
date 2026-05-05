import type { LanguageCode, LocalizedStringArray } from '../../types/skill'
import { getLocalizedArray } from '../../utils/localization'

export const DangerSignals = ({ signals, lang }: { signals: LocalizedStringArray; lang: LanguageCode }) => (
  <ul className="grid gap-2 md:grid-cols-2">
    {getLocalizedArray(signals, lang).map((signal) => (
      <li key={signal} className="rounded-md border border-rose-400/20 bg-rose-400/10 p-3 text-sm leading-6 text-rose-100">
        {signal}
      </li>
    ))}
  </ul>
)
