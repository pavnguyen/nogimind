import { useTranslation } from 'react-i18next'
import { SectionAccordion } from './SectionAccordion'
import type { FixItFastView } from '../../data/skills/skillViewModel'

type Props = { view: FixItFastView }

const severityIcon = { critical: '🔴', major: '🟠', minor: '🟡' }

export const FixItFastSection = ({ view }: Props) => {
  const { t } = useTranslation()

  if (!view.available) return null

  return (
    <SectionAccordion
      id="fix-it-fast"
      title={t('cardOS.fixItFast')}
      badge={`${view.items.length + view.troubleshootingTips.length}`}
      accentColor="rose"
    >
      <div className="space-y-5">
        {/* Quality-check derived items (problem-first) */}
        {view.items.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              {t('cardOS.qualityFails')}
            </p>
            {view.items.map((item) => (
              <div key={item.id} className="rounded-xl border border-white/8 bg-slate-950/50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-sm">{severityIcon[item.severity]}</span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {item.severity}
                  </span>
                </div>
                <p className="mb-1 text-sm font-semibold text-white">{item.problem}</p>
                <p className="mb-2 text-xs leading-5 text-slate-400">
                  <span className="font-semibold text-slate-300">{t('cardOS.whyItHappens')}: </span>
                  {item.whyItHappens}
                </p>
                <p className="rounded bg-emerald-400/8 px-3 py-2 text-xs font-semibold text-emerald-200">
                  → {item.bodyCorrection}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Troubleshooting tips */}
        {view.troubleshootingTips.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              {t('cardOS.troubleshootingTips')}
            </p>
            {view.troubleshootingTips.map((tip, i) => (
              <div key={i} className="rounded-xl border border-white/8 bg-slate-950/50 p-4">
                <p className="mb-1 text-sm font-semibold text-rose-100">{tip.problem}</p>
                <p className="mb-1 text-sm leading-6 text-slate-300">
                  <span className="font-semibold text-emerald-300">→ </span>{tip.quickFix}
                </p>
                <p className="text-xs font-bold uppercase tracking-wide text-cyan-300">↗ {tip.cue}</p>
              </div>
            ))}
          </div>
        )}

        {/* Common mistakes */}
        {view.commonMistakes.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
              {t('detail.commonMistakes')}
            </p>
            <ul className="space-y-1.5">
              {view.commonMistakes.map((m) => (
                <li
                  key={m}
                  className="flex items-start gap-2 rounded-lg border border-white/6 bg-slate-950/40 px-3 py-2.5 text-sm leading-6 text-slate-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </SectionAccordion>
  )
}
