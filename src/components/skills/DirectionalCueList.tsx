import { useTranslation } from 'react-i18next'
import type { DirectionalCue, LanguageCode } from '../../types/skill'
import { getLocalizedText } from '../../utils/localization'
import { Badge } from '../common/Badge'

export const DirectionalCueList = ({ cues, lang }: { cues: DirectionalCue[]; lang: LanguageCode }) => {
  const { t } = useTranslation()
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {cues.map((cue) => (
        <article key={cue.id} className="rounded-md border border-white/10 bg-slate-950/55 p-4">
          <div className="flex flex-wrap gap-2">
            <Badge tone="cyan">{t(`mechanics.directions.${cue.direction}`)}</Badge>
            {cue.bodyParts.map((part) => <Badge key={part}>{t(`body.${part}`)}</Badge>)}
          </div>
          <p className="mt-3 text-sm font-semibold text-white">{getLocalizedText(cue.cue, lang)}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">{getLocalizedText(cue.purpose, lang)}</p>
        </article>
      ))}
    </div>
  )
}
