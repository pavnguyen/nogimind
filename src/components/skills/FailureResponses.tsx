import type { FailureResponse, LanguageCode } from '../../types/skill'
import { getLocalizedText } from '../../utils/localization'

export const FailureResponses = ({ failures, lang }: { failures: FailureResponse[]; lang: LanguageCode }) => (
  <div className="space-y-3">
    {failures.map((failure, index) => (
      <div key={`${getLocalizedText(failure.failure, 'en')}-${index}`} className="rounded-md border border-white/10 bg-slate-900/60 p-4">
        <p className="text-sm font-semibold text-amber-200">{getLocalizedText(failure.failure, lang)}</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">{getLocalizedText(failure.response, lang)}</p>
      </div>
    ))}
  </div>
)
