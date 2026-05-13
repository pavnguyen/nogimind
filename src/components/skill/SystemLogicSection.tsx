import { useTranslation } from 'react-i18next'
import { SectionAccordion } from './SectionAccordion'
import type { SystemLogicView } from '../../data/skills/skillViewModel'

type Props = {
  view: SystemLogicView
}

export const SystemLogicSection = ({ view }: Props) => {
  const { t } = useTranslation()

  return (
    <SectionAccordion
      id="system-logic"
      title={t('cardOS.systemLogic')}
      accentColor="cyan"
      defaultOpen
    >
      <div className="space-y-5">

        {/* Goal block */}
        <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-cyan-400">
            {t('cardOS.goal')}
          </p>
          <p className="text-sm leading-6 text-white">{view.goal}</p>
        </div>

        {/* Situation + Why — two columns on md+ */}
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-white/8 bg-slate-950/40 p-4">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400">
              {t('cardOS.situation')}
            </p>
            <p className="text-sm leading-6 text-slate-300">{view.situation}</p>
          </div>
          <div className="rounded-lg border border-white/8 bg-slate-950/40 p-4">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-slate-400">
              {t('cardOS.why')}
            </p>
            <p className="text-sm leading-6 text-slate-300">{view.why}</p>
          </div>
        </div>

        {/* Three cues */}
        {view.threeCues.length > 0 && (
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-slate-400">
              {t('cardOS.threeCues')}
            </p>
            <ol className="space-y-2">
              {view.threeCues.map((cue, i) => (
                <li
                  key={cue}
                  className="flex items-start gap-3 rounded-lg border border-white/8 bg-slate-950/50 px-4 py-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-300">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-6 text-slate-200">{cue}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Do not do + If it fails */}
        {(view.doNotDo || view.ifItFails) && (
          <div className="grid gap-3 md:grid-cols-2">
            {view.doNotDo && (
              <div className="rounded-lg border border-rose-400/20 bg-rose-400/5 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-rose-400">
                  {t('cardOS.doNotDo')}
                </p>
                <p className="text-sm leading-6 text-rose-100">{view.doNotDo}</p>
              </div>
            )}
            {view.ifItFails && (
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-amber-400">
                  {t('cardOS.ifItFails')}
                </p>
                <p className="text-sm leading-6 text-amber-100">{view.ifItFails}</p>
              </div>
            )}
          </div>
        )}

        {/* Danger signals */}
        {view.dangerSignals.length > 0 && (
          <div className="rounded-lg border border-rose-400/15 bg-rose-400/5 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-rose-400">
              {t('cardOS.dangerSignals')}
            </p>
            <ul className="space-y-1.5">
              {view.dangerSignals.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm leading-6 text-rose-100">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Safety reminder */}
        {view.safetyReminder && (
          <div className="rounded-lg border border-amber-300/20 bg-amber-300/8 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              {t('cardOS.safetyReminder')}
            </p>
            <p className="mt-1 text-sm leading-6 text-amber-100">{view.safetyReminder}</p>
          </div>
        )}
      </div>
    </SectionAccordion>
  )
}
