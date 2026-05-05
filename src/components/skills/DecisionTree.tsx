import type { DecisionBranch, LanguageCode } from '../../types/skill'
import { getLocalizedText } from '../../utils/localization'

export const DecisionTree = ({ branches, lang }: { branches: DecisionBranch[]; lang: LanguageCode }) => (
  <div className="space-y-3">
    {branches.map((branch, index) => (
      <div key={`${getLocalizedText(branch.trigger, 'en')}-${index}`} className="rounded-md border border-white/10 bg-slate-900/55 p-4">
        <p className="text-sm font-semibold text-emerald-200">{getLocalizedText(branch.trigger, lang)}</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">{getLocalizedText(branch.response, lang)}</p>
      </div>
    ))}
  </div>
)
