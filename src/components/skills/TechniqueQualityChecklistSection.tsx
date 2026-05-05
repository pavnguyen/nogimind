import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Badge } from '../common/Badge'
import { SectionCard } from '../common/SectionCard'
import { QualityCheckCard } from './QualityCheckCard'
import type { LanguageCode, QualityCheckAnswer, QualityCheckSeverity, TechniqueQualityChecklist } from '../../types/skill'
import { getLocalizedText } from '../../utils/localization'

type Props = {
  skillId: string
  system: TechniqueQualityChecklist
  lang: LanguageCode
  viewMode: 'simple' | 'detailed' | 'advanced'
}

type Store = Record<string, Record<string, QualityCheckAnswer>>

const storageKey = 'nogi_quality_check_answers'
const severityWeight: Record<QualityCheckSeverity, number> = {
  minor: 1,
  major: 1.5,
  critical: 2,
}

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
  const visibleChecks = viewMode === 'simple' ? system.checks.filter((item) => item.severity === 'critical') : system.checks

  const score = useMemo(() => {
    const totals = system.checks.reduce(
      (acc, checkItem) => {
        const answer = answers[checkItem.id]
        const value = answer === 'yes' ? 1 : answer === 'not_sure' ? 0.5 : 0
        const weight = severityWeight[checkItem.severity]
        acc.weighted += value * weight
        acc.max += weight
        return acc
      },
      { weighted: 0, max: 0 },
    )
    return totals.max ? Math.round((totals.weighted / totals.max) * 100) : 0
  }, [answers, system.checks])

  const criticalFailures = system.checks.filter((checkItem) => checkItem.severity === 'critical' && answers[checkItem.id] !== 'yes')
  const suggestedFixes = visibleChecks
    .filter((checkItem) => answers[checkItem.id] !== 'yes')
    .slice(0, 5)

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
      description={getLocalizedText(system.overview, lang)}
      action={<Badge tone={score >= system.passThreshold ? 'emerald' : 'amber'}>{score}%</Badge>}
    >
      <div className="space-y-4">
        <div className="rounded-lg border border-white/10 bg-slate-950/50 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="cyan">{t('qualityChecklist.score')}</Badge>
            <span className="text-sm text-slate-300">
              {score >= system.passThreshold ? getLocalizedText(system.ifPassed, lang) : getLocalizedText(system.ifFailed, lang)}
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className={`h-full rounded-full ${score >= system.passThreshold ? 'bg-emerald-300' : 'bg-amber-300'}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {criticalFailures.length ? (
          <div className="rounded-lg border border-rose-400/15 bg-rose-400/10 p-4">
            <p className="text-sm font-semibold text-rose-100">{t('qualityChecklist.criticalFailures')}</p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-rose-50 md:grid-cols-2">
              {criticalFailures.map((item) => <li key={item.id} className="rounded-md border border-rose-300/15 bg-slate-950/40 p-3">{getLocalizedText(item.title, lang)}</li>)}
            </ul>
          </div>
        ) : null}

        {suggestedFixes.length ? (
          <div className="rounded-lg border border-white/10 bg-slate-950/50 p-4">
            <p className="text-sm font-semibold text-white">{t('qualityChecklist.quickFixes')}</p>
            <ul className="mt-3 grid gap-2 md:grid-cols-2">
              {suggestedFixes.map((item) => (
                <li key={item.id} className="rounded-md border border-white/10 bg-slate-900/60 p-3 text-sm leading-6 text-slate-300">
                  <span className="font-semibold text-cyan-100">{getLocalizedText(item.title, lang)}</span>
                  <p className="mt-1 text-slate-400">{getLocalizedText(item.quickFix, lang)}</p>
                  {item.relatedMicroDetailIds?.length ? (
                    <Link to={`/micro-details?skill=${skillId}`} className="mt-2 inline-flex text-xs font-medium text-cyan-200 hover:text-cyan-100">
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
