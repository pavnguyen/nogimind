import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Badge } from '../common/Badge'
import { SectionCard } from '../common/SectionCard'
import type { LanguageCode, TechnicalDetailCategory, TechnicalDetailsSystem } from '../../types/skill'
import { getLocalizedArray, getLocalizedText } from '../../utils/localization'

type TechnicalDetailsSectionProps = {
  system: TechnicalDetailsSystem
  lang: LanguageCode
  viewMode: 'simple' | 'detailed' | 'advanced'
}

const categoryOrder: TechnicalDetailCategory[] = ['setup', 'entry', 'grip', 'angle', 'pressure', 'isolation', 'finishing', 'escape', 'counter', 'transition', 'safety']

export const TechnicalDetailsSection = ({ system, lang, viewMode }: TechnicalDetailsSectionProps) => {
  const { t } = useTranslation()
  const [category, setCategory] = useState<TechnicalDetailCategory | 'all'>('all')
  const availableCategories = useMemo(
    () => categoryOrder.filter((item) => system.keyDetails.some((detail) => detail.category === item)),
    [system.keyDetails],
  )
  const filteredDetails = system.keyDetails.filter((detail) => category === 'all' || detail.category === category)
  const visibleDetails = viewMode === 'simple' ? filteredDetails.slice(0, 5) : filteredDetails
  const showDetailed = viewMode !== 'simple'
  const showAdvanced = viewMode === 'advanced'

  return (
    <SectionCard title={t('technical.heading')} description={getLocalizedText(system.overview, lang)}>
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory('all')}
          className={`rounded-md border px-3 py-1.5 text-xs font-medium ${category === 'all' ? 'border-emerald-300 bg-emerald-300/15 text-emerald-100' : 'border-white/10 text-slate-300 hover:bg-white/10'}`}
        >
          {t('common.all')}
        </button>
        {availableCategories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium ${category === item ? 'border-emerald-300 bg-emerald-300/15 text-emerald-100' : 'border-white/10 text-slate-300 hover:bg-white/10'}`}
          >
            {t(`technical.categories.${item}`)}
          </button>
        ))}
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        {visibleDetails.map((detail) => (
          <article key={detail.id} className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
            <div className="flex flex-wrap gap-2">
              <Badge tone={detail.category === 'safety' ? 'amber' : detail.category === 'finishing' ? 'rose' : 'cyan'}>{t(`technical.categories.${detail.category}`)}</Badge>
              {detail.direction ? <Badge tone="emerald">{t(`technical.forceDirections.${detail.direction}`)}</Badge> : null}
            </div>
            <h3 className="mt-3 text-sm font-semibold text-white">{getLocalizedText(detail.title, lang)}</h3>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('technical.situation')}</p>
            <p className="mt-1 text-sm leading-6 text-slate-400">{getLocalizedText(detail.situation, lang)}</p>
            <p className="mt-3 text-sm leading-6 text-slate-200">{getLocalizedText(detail.instruction, lang)}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('mechanics.whyItMatters')}</p>
            <p className="mt-1 text-sm leading-6 text-slate-400">{getLocalizedText(detail.whyItWorks, lang)}</p>
            {showDetailed ? (
              <div className="mt-3 rounded-md border border-white/10 bg-slate-950/60 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">{t('technical.commonFailure')}</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">{getLocalizedText(detail.commonFailure, lang)}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-emerald-200">{t('ifThen.correctionCue')}</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">{getLocalizedText(detail.correctionCue, lang)}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-cyan-200">{t('technical.liveCue')}</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">{getLocalizedText(detail.liveRollingCue, lang)}</p>
              </div>
            ) : null}
            {detail.safetyNote ? <p className="mt-3 rounded-md border border-amber-300/15 bg-amber-300/10 p-3 text-sm leading-6 text-amber-100">{getLocalizedText(detail.safetyNote, lang)}</p> : null}
            <div className="mt-3 flex flex-wrap gap-2">
              {detail.bodyParts.map((part) => <Badge key={part}>{t(`body.${part}`, { defaultValue: part })}</Badge>)}
            </div>
          </article>
        ))}
      </div>

      {showAdvanced && system.finishingMechanics?.length ? (
        <div className="mt-6 space-y-4">
          <h3 className="text-base font-semibold text-white">{t('technical.finishingMechanics')}</h3>
          {system.finishingMechanics.map((finish) => (
            <article key={finish.id} className="rounded-lg border border-rose-300/20 bg-rose-300/10 p-4">
              <h4 className="text-sm font-semibold text-rose-100">{getLocalizedText(finish.title, lang)}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-300">{getLocalizedText(finish.breakingMechanic, lang)}</p>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <List title={t('technical.finishChecklist')} items={getLocalizedArray(finish.finishChecklist, lang)} />
                <List title={t('technical.falseFinishSignals')} items={getLocalizedArray(finish.falseFinishSignals, lang)} />
                <List title={t('technical.requiredIsolation')} items={getLocalizedArray(finish.requiredIsolation, lang)} />
                <List title={t('mechanics.safetyNotes')} items={getLocalizedArray(finish.safetyNotes, lang)} tone="safety" />
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {showDetailed ? (
        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <List title={t('technical.microAdjustments')} items={system.microAdjustments.map((item) => `${getLocalizedText(item.problem, lang)} ${getLocalizedText(item.adjustment, lang)}`)} />
          <List title={t('technical.commonFailurePatterns')} items={getLocalizedArray(system.commonFailurePatterns, lang)} tone="danger" />
          <List title={t('technical.liveCues')} items={getLocalizedArray(system.liveCues, lang)} />
          {showAdvanced ? <List title={t('technical.coachNotes')} items={getLocalizedArray(system.coachNotes, lang)} /> : null}
        </div>
      ) : null}
    </SectionCard>
  )
}

const List = ({ title, items, tone = 'default' }: { title: string; items: string[]; tone?: 'default' | 'danger' | 'safety' }) => (
  <div>
    <p className="text-sm font-semibold text-white">{title}</p>
    <ul className={`mt-2 space-y-2 text-sm leading-6 ${tone === 'danger' ? 'text-amber-100' : tone === 'safety' ? 'text-emerald-100' : 'text-slate-300'}`}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  </div>
)
