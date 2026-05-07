import { useTranslation } from 'react-i18next'
import { Badge } from '../common/Badge'
import { SectionCard } from '../common/SectionCard'
import type { BlackbeltDetailSystem, LanguageCode } from '../../types/skill'
import type { ViewMode } from '../../types/settings'
import { getLocalizedTechnicalText, getLocalizedText } from '../../utils/localization'

type Props = {
  system: BlackbeltDetailSystem
  lang: LanguageCode
  viewMode?: ViewMode
}

export const BlackbeltDetailsSection = ({ system, lang, viewMode = 'detailed' }: Props) => {
  const { t } = useTranslation()
  const compact = viewMode !== 'advanced'

  return (
    <SectionCard title={t('blackbelt.heading')} description={getLocalizedTechnicalText(system.overview, lang)}>
      <div className="space-y-4">
        <p className="rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm font-semibold leading-6 text-emerald-50">
          {getLocalizedTechnicalText(system.oneSentenceGold, lang)}
        </p>

        {system.clampMechanics.length ? (
          <div>
            <h3 className="text-sm font-semibold text-white">{t('blackbelt.clampMechanics')}</h3>
            <div className="mt-3 grid gap-3 xl:grid-cols-2">
              {system.clampMechanics.slice(0, compact ? 2 : system.clampMechanics.length).map((item) => (
                <article key={item.id} className="rounded-lg border border-white/10 bg-slate-950/60 p-4">
                  <Badge tone="cyan">{t('blackbelt.clampMechanics')}</Badge>
                  <h4 className="mt-3 text-sm font-semibold text-white">{getLocalizedText(item.title, lang)}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{getLocalizedTechnicalText(item.exactAction, lang)}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{getLocalizedTechnicalText(item.whyItWorks, lang)}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-emerald-200">{getLocalizedTechnicalText(item.liveCue, lang)}</p>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        {system.finishTips.length ? (
          <div>
            <h3 className="text-sm font-semibold text-white">{t('blackbelt.finishTips')}</h3>
            <div className="mt-3 grid gap-3 xl:grid-cols-2">
              {system.finishTips.slice(0, compact ? 2 : system.finishTips.length).map((item) => (
                <article key={item.id} className="rounded-lg border border-white/10 bg-slate-950/60 p-4">
                  <Badge tone="amber">{t('blackbelt.finishTips')}</Badge>
                  <h4 className="mt-3 text-sm font-semibold text-white">{getLocalizedText(item.title, lang)}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{getLocalizedTechnicalText(item.exactFinishingAction, lang)}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    <span className="font-semibold text-slate-100">{t('blackbelt.finishTrigger')}: </span>
                    {getLocalizedTechnicalText(item.finishTrigger, lang)}
                  </p>
                  {item.safetyNote ? <p className="mt-2 rounded-md border border-amber-300/15 bg-amber-300/10 p-2 text-sm text-amber-100">{getLocalizedTechnicalText(item.safetyNote, lang)}</p> : null}
                </article>
              ))}
            </div>
          </div>
        ) : null}

        {viewMode === 'advanced' && system.opponentEscapePrevention.length ? (
          <div>
            <h3 className="text-sm font-semibold text-white">{t('blackbelt.escapePrevention')}</h3>
            <div className="mt-3 grid gap-3 xl:grid-cols-3">
              {system.opponentEscapePrevention.map((item) => (
                <article key={getLocalizedText(item.escape, 'en')} className="rounded-lg border border-white/10 bg-slate-950/60 p-4 text-sm leading-6 text-slate-300">
                  <p className="font-semibold text-white">{getLocalizedTechnicalText(item.escape, lang)}</p>
                  <p className="mt-2">{getLocalizedTechnicalText(item.earlySignal, lang)}</p>
                  <p className="mt-2 text-emerald-100">{getLocalizedTechnicalText(item.prevention, lang)}</p>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </SectionCard>
  )
}
