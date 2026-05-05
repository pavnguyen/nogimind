import { Badge } from '../common/Badge'
import { useTranslation } from 'react-i18next'
import { getLocalizedText } from '../../utils/localization'
import type { LanguageCode, MicroDetail } from '../../types/skill'

type Props = {
  detail: MicroDetail
  lang: LanguageCode
}

export const MicroDetailCard = ({ detail, lang }: Props) => (
  <MicroDetailCardInner detail={detail} lang={lang} />
)

const MicroDetailCardInner = ({ detail, lang }: Props) => {
  const { t } = useTranslation()

  return (
    <article className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
    <div className="flex flex-wrap gap-2">
      <Badge tone="cyan">{detail.category}</Badge>
      {detail.direction ? <Badge tone="emerald">{detail.direction}</Badge> : null}
      {detail.side ? <Badge>{detail.side}</Badge> : null}
    </div>
    <h3 className="mt-3 text-sm font-semibold text-white">{getLocalizedText(detail.title, lang)}</h3>
    <p className="mt-2 text-sm leading-6 text-slate-300">{getLocalizedText(detail.shortInstruction, lang)}</p>
    <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('microDetailSystem.why')}</p>
    <p className="mt-1 text-sm leading-6 text-slate-400">{getLocalizedText(detail.whyItWorks, lang)}</p>
    <p className="mt-3 rounded-md border border-emerald-300/15 bg-emerald-300/10 px-3 py-2 text-sm text-emerald-100">{getLocalizedText(detail.correctionCue, lang)}</p>
    <p className="mt-2 text-xs text-slate-500">{getLocalizedText(detail.liveCue, lang)}</p>
    {detail.safetyNote ? <p className="mt-3 rounded-md border border-amber-300/15 bg-amber-300/10 px-3 py-2 text-sm text-amber-100">{getLocalizedText(detail.safetyNote, lang)}</p> : null}
    <div className="mt-3 flex flex-wrap gap-2">
      {detail.bodyParts.map((part) => <Badge key={part}>{part}</Badge>)}
    </div>
  </article>
  )
}
