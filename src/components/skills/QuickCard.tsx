import { Badge } from '../common/Badge'
import { useTranslation } from 'react-i18next'
import { getLocalizedTechnicalArray, getLocalizedTechnicalText } from '../../utils/localization'
import type { LanguageCode, QuickCard as QuickCardType } from '../../types/skill'

type Props = {
  card: QuickCardType
  lang: LanguageCode
}

export const QuickCard = ({ card, lang }: Props) => {
  const { t } = useTranslation()

  return (
    <article className="rounded-lg border border-cyan-300/15 bg-cyan-300/10 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="cyan">{t('quickMode.heading')}</Badge>
        {card.safetyReminder ? <Badge tone="amber">{t('quickMode.safetyReminder')}</Badge> : null}
      </div>
      <p className="mt-3 text-base font-semibold text-cyan-50">{getLocalizedTechnicalText(card.goal, lang)}</p>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-cyan-100/80">{t('quickMode.topMicroDetails')}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {getLocalizedTechnicalArray(card.threeCues, lang).map((cue) => (
            <Badge key={cue} tone="slate">
              {cue}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-md border border-white/10 bg-slate-950/50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">{t('quickMode.doNotDo')}</p>
          <p className="mt-2 text-sm leading-6 text-slate-200">{getLocalizedTechnicalText(card.doNotDo, lang)}</p>
        </div>
        <div className="rounded-md border border-white/10 bg-slate-950/50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">{t('quickMode.ifItFails')}</p>
          <p className="mt-2 text-sm leading-6 text-slate-200">{getLocalizedTechnicalText(card.ifItFails, lang)}</p>
        </div>
      </div>

      {card.safetyReminder ? (
        <p className="mt-3 rounded-md border border-amber-300/15 bg-amber-300/10 px-3 py-2 text-sm leading-6 text-amber-100">
          {getLocalizedTechnicalText(card.safetyReminder, lang)}
        </p>
      ) : null}
    </article>
  )
}
