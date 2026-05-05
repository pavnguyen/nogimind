import { getLocalizedText } from '../../utils/localization'
import type { LanguageCode } from '../../types/skill'

type Item = {
  problem: { vi: string; en: string; fr: string }
  quickFix: { vi: string; en: string; fr: string }
  cue: { vi: string; en: string; fr: string }
}

type Props = {
  items: Item[]
  lang: LanguageCode
}

export const QuickTroubleshootingList = ({ items, lang }: Props) => (
  <div className="space-y-3">
    {items.map((item) => (
      <div key={item.problem.en} className="rounded-md border border-white/10 bg-slate-950/60 p-3">
        <p className="text-sm font-semibold text-white">{getLocalizedText(item.problem, lang)}</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">{getLocalizedText(item.quickFix, lang)}</p>
        <p className="mt-2 text-xs text-slate-500">{getLocalizedText(item.cue, lang)}</p>
      </div>
    ))}
  </div>
)
