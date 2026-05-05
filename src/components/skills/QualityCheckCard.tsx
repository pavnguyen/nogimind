import { useTranslation } from 'react-i18next'
import { Badge } from '../common/Badge'
import { cn } from '../../utils/cn'
import type { LanguageCode, QualityCheckAnswer, QualityCheckItem } from '../../types/skill'
import { getLocalizedText } from '../../utils/localization'

type Props = {
  item: QualityCheckItem
  lang: LanguageCode
  answer: QualityCheckAnswer | undefined
  onAnswer: (answer: QualityCheckAnswer) => void
}

const tones = {
  critical: 'rose',
  major: 'amber',
  minor: 'cyan',
} as const

export const QualityCheckCard = ({ item, lang, answer, onAnswer }: Props) => {
  const { t } = useTranslation()

  return (
    <div className={cn('rounded-lg border border-white/10 bg-slate-900/60 p-4', item.severity === 'critical' && answer !== 'yes' ? 'ring-1 ring-rose-400/30' : '')}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Badge tone={tones[item.severity]}>{item.severity}</Badge>
            <Badge tone="slate">{item.bodyParts.join(' / ')}</Badge>
          </div>
          <p className="text-sm font-semibold text-white">{getLocalizedText(item.title, lang)}</p>
          <p className="text-sm leading-6 text-slate-300">{getLocalizedText(item.question, lang)}</p>
        </div>
        <div className="flex items-center gap-2">
          {(['yes', 'not_sure', 'no'] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onAnswer(value)}
              className={cn(
                'rounded-md border px-3 py-2 text-xs font-semibold transition',
                answer === value ? 'border-cyan-300/40 bg-cyan-300/15 text-cyan-100' : 'border-white/10 bg-slate-950/60 text-slate-300 hover:bg-white/10',
              )}
            >
              {value === 'yes' ? t('qualityChecklist.yes') : value === 'not_sure' ? t('qualityChecklist.notSure') : t('qualityChecklist.no')}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-md border border-emerald-400/15 bg-emerald-400/10 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200">{t('technical.successSignals')}</p>
          <p className="mt-2 text-sm leading-6 text-emerald-50">{getLocalizedText(item.successSignal, lang)}</p>
        </div>
        <div className="rounded-md border border-rose-400/15 bg-rose-400/10 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-200">{t('qualityChecklist.quickFixes')}</p>
          <p className="mt-2 text-sm leading-6 text-rose-50">{getLocalizedText(item.quickFix, lang)}</p>
        </div>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="rounded-md border border-white/10 bg-slate-950/50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">{t('technical.commonFailure')}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{getLocalizedText(item.failureSignal, lang)}</p>
        </div>
        {item.relatedMicroDetailIds?.length ? (
          <div className="rounded-md border border-white/10 bg-slate-950/50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">{t('qualityChecklist.openMicroDetails')}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{item.relatedMicroDetailIds.join(', ')}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
