import { useTranslation } from 'react-i18next'
import { SectionAccordion } from './SectionAccordion'
import type { SafetyView } from '../../data/skills/skillViewModel'

type Props = { view: SafetyView }

export const SafetySection = ({ view }: Props) => {
  const { t } = useTranslation()

  const riskLabel: Record<string, string> = {
    low: t('modern.risk.low'),
    medium: t('modern.risk.medium'),
    high: t('modern.risk.high'),
    safety_critical: t('modern.risk.safety_critical'),
  }

  const accent = view.riskLevel === 'safety_critical' || view.riskLevel === 'high' ? 'rose' : 'amber'

  if (!view.showAsSection) return null

  return (
    <SectionAccordion
      id="safety"
      title={t('cardOS.safety')}
      badge={riskLabel[view.riskLevel] ?? view.riskLevel}
      accentColor={accent}
    >
      <div className="space-y-4">
        {/* Risk level banner for high-risk skills */}
        {view.isHighRisk && (
          <div className="flex items-center gap-3 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="text-sm font-bold text-rose-200">{riskLabel[view.riskLevel]}</p>
              <p className="text-xs text-rose-300">{t('common.safetyNote')}</p>
            </div>
          </div>
        )}

        {/* Non-negotiables */}
        {view.nonNegotiables.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-rose-400">
              {t('cardOS.nonNegotiables')}
            </p>
            <ul className="space-y-1.5">
              {view.nonNegotiables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 rounded-lg border border-rose-400/15 bg-rose-400/5 px-3 py-2.5 text-sm leading-6 text-rose-100"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Safety notes */}
        {view.safetyNotes.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
              {t('cardOS.safetyNotes')}
            </p>
            <ul className="space-y-1.5">
              {view.safetyNotes.map((note) => (
                <li
                  key={note}
                  className="flex items-start gap-2 rounded-lg border border-amber-400/15 bg-amber-400/5 px-3 py-2.5 text-sm leading-6 text-amber-100"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Safety abort outcome */}
        {view.safetyAbortOutcome && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/8 p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-red-400">
              {t('cardOS.safetyAbort')}
            </p>
            <p className="mb-1 text-sm font-semibold text-red-100">{view.safetyAbortOutcome.label}</p>
            <p className="text-xs leading-5 text-red-200">{view.safetyAbortOutcome.explanation}</p>
            {view.safetyAbortOutcome.triggerSignal && (
              <p className="mt-2 text-xs text-red-300">
                <span className="font-semibold">Signal: </span>
                {view.safetyAbortOutcome.triggerSignal}
              </p>
            )}
          </div>
        )}

        {/* Danger signals */}
        {view.dangerSignals.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
              {t('detail.dangerSignals')}
            </p>
            <ul className="space-y-1.5">
              {view.dangerSignals.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 rounded-lg border border-white/8 bg-slate-950/50 px-3 py-2.5 text-sm leading-6 text-slate-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </SectionAccordion>
  )
}
