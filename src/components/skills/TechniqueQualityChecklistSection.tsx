import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Badge } from '../common/Badge'
import { SectionCard } from '../common/SectionCard'
import { QualityCheckCard } from './QualityCheckCard'
import type { LanguageCode, QualityCheckAnswer, TechniqueQualityChecklist } from '../../types/skill'
import { getLocalizedTechnicalText } from '../../utils/localization'

type Props = {
  skillId: string
  system: TechniqueQualityChecklist
  lang: LanguageCode
  viewMode: 'simple' | 'detailed' | 'advanced'
}

type Store = Record<string, Record<string, QualityCheckAnswer>>

const storageKey = 'nogi_quality_check_answers'
const loadStore = (): Store => {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(window.localStorage.getItem(storageKey) ?? '{}') as Store
  } catch {
    return {}
  }
}

const saveStore = (store: Store) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(storageKey, JSON.stringify(store))
}

export const TechniqueQualityChecklistSection = ({ skillId, system, lang, viewMode }: Props) => {
  const { t } = useTranslation()
  const [store, setStore] = useState<Store>(() => loadStore())

  useEffect(() => {
    saveStore(store)
  }, [store])

  const answers = store[skillId] ?? {}
  const visibleChecks = viewMode === 'advanced' ? system.checks : system.checks.filter((item) => item.severity === 'critical')

  const criticalFailures = system.checks.filter((checkItem) => checkItem.severity === 'critical' && answers[checkItem.id] !== 'yes')
  const suggestedFixes = visibleChecks
    .filter((checkItem) => answers[checkItem.id] !== 'yes')
    .slice(0, 5)

  const readyCount = system.checks.filter((checkItem) => answers[checkItem.id] === 'yes').length
  const readinessLabel = readyCount >= system.passThreshold ? t('qualityChecklist.ready') : t('qualityChecklist.needsWork')

  const setAnswer = (checkId: string, answer: QualityCheckAnswer) => {
    setStore((current) => ({
      ...current,
      [skillId]: {
        ...(current[skillId] ?? {}),
        [checkId]: answer,
      },
    }))
  }

  return (
    <SectionCard
      title={t('qualityChecklist.heading')}
      description={getLocalizedTechnicalText(system.overview, lang)}
      action={<Badge tone={readyCount >= system.passThreshold ? 'emerald' : 'amber'}>{readinessLabel}</Badge>}
    >
      <div className="space-y-4">
        <div className="rounded-lg border border-white/10 bg-slate-950/50 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="cyan">{t('qualityChecklist.readiness')}</Badge>
            <span className="text-sm text-slate-300">
              {readyCount >= system.passThreshold ? getLocalizedTechnicalText(system.ifPassed, lang) : getLocalizedTechnicalText(system.ifFailed, lang)}
            </span>
          </div>
        </div>

        {criticalFailures.length ? (
          <div className="rounded-lg border border-rose-400/15 bg-rose-400/10 p-4">
            <p className="text-sm font-semibold text-rose-100">{t('qualityChecklist.criticalFailures')}</p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-rose-50 md:grid-cols-2">
              {criticalFailures.map((item) => <li key={item.id} className="rounded-md border border-rose-300/15 bg-slate-950/40 p-3">{getLocalizedTechnicalText(item.title, lang)}</li>)}
            </ul>
          </div>
        ) : null}

        {suggestedFixes.length ? (
          <div className="rounded-lg border border-white/10 bg-slate-950/50 p-4">
            <p className="text-sm font-semibold text-white">{t('qualityChecklist.quickFixes')}</p>
            <ul className="mt-3 grid gap-2 md:grid-cols-2">
              {suggestedFixes.map((item) => (
                <li key={item.id} className="rounded-md border border-white/10 bg-slate-900/60 p-3 text-sm leading-6 text-slate-300">
                  <span className="font-semibold text-cyan-100">{getLocalizedTechnicalText(item.title, lang)}</span>
                  <p className="mt-1 text-slate-400">{getLocalizedTechnicalText(item.quickFix, lang)}</p>
                  {item.relatedMicroDetailIds?.length ? (
                    <Link to={`/skills/${skillId}`} className="mt-2 inline-flex text-xs font-medium text-cyan-200 hover:text-cyan-100">
                      {t('qualityChecklist.openMicroDetails')}
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="space-y-3">
          {visibleChecks.map((item) => (
            <QualityCheckCard
              key={item.id}
              item={item}
              lang={lang}
              answer={answers[item.id]}
              onAnswer={(answer) => setAnswer(item.id, answer)}
            />
          ))}
        </div>
      </div>
    </SectionCard>
  )
}
