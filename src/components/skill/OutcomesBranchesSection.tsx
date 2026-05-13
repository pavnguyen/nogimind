import { useTranslation } from 'react-i18next'
import { SectionAccordion } from './SectionAccordion'
import type { OutcomesBranchesView } from '../../data/skills/skillViewModel'

type Props = { view: OutcomesBranchesView }

const outcomeColors: Record<string, string> = {
  success: 'border-emerald-400/30 bg-emerald-400/8 text-emerald-300',
  failure: 'border-rose-400/30 bg-rose-400/8 text-rose-300',
  counter: 'border-amber-400/30 bg-amber-400/8 text-amber-300',
  reset: 'border-slate-400/20 bg-slate-400/8 text-slate-400',
  safety_abort: 'border-red-500/40 bg-red-500/10 text-red-300',
  branch: 'border-cyan-400/30 bg-cyan-400/8 text-cyan-300',
}

export const OutcomesBranchesSection = ({ view }: Props) => {
  const { t } = useTranslation()

  if (!view.available) return null

  return (
    <SectionAccordion
      id="outcomes-branches"
      title={t('cardOS.outcomesBranches')}
      badge={`${view.outcomes.length} ${t('cardOS.outcomes')}`}
      accentColor="amber"
    >
      <div className="space-y-5">
        {/* Attacker/Defender goals */}
        {(view.attackerGoal || view.defenderGoal) && (
          <div className="grid gap-3 md:grid-cols-2">
            {view.attackerGoal && (
              <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-cyan-400">{t('cardOS.attackerGoal')}</p>
                <p className="text-sm leading-6 text-cyan-100">{view.attackerGoal}</p>
              </div>
            )}
            {view.defenderGoal && (
              <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-amber-400">{t('cardOS.defenderGoal')}</p>
                <p className="text-sm leading-6 text-amber-100">{view.defenderGoal}</p>
              </div>
            )}
          </div>
        )}

        {/* Outcomes */}
        {view.outcomes.length > 0 && (
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-slate-400">{t('cardOS.outcomes')}</p>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {view.outcomes.map((o) => (
                <div key={o.id} className={`rounded-xl border p-4 ${outcomeColors[o.result] ?? outcomeColors.reset}`}>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-md border border-current/30 bg-current/10 px-2 py-0.5 text-xs font-bold uppercase">
                      {o.result.replace(/_/g, ' ')}
                    </span>
                    {o.probability !== undefined && (
                      <span className="ml-auto text-xs opacity-60">{o.probability}%</span>
                    )}
                    {o.confidence && !o.probability && (
                      <span className="ml-auto text-xs opacity-60">{o.confidence}</span>
                    )}
                  </div>
                  <p className="mb-1 text-sm font-semibold text-white">{o.label}</p>
                  <p className="text-xs leading-5 text-slate-300">{o.explanation}</p>
                  {o.triggerSignal && (
                    <p className="mt-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-400">Signal: </span>{o.triggerSignal}
                    </p>
                  )}
                  {o.toSkillId && (
                    <p className="mt-2 text-xs font-semibold text-cyan-400">→ {o.toSkillId}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reaction branches */}
        {view.reactionBranches.length > 0 && (
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-slate-400">{t('cardOS.reactionBranches')}</p>
            <div className="space-y-2">
              {view.reactionBranches.map((b, i) => (
                <div key={i} className="rounded-xl border border-white/8 bg-slate-950/50 p-4">
                  <p className="mb-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-300">{t('ifThen.if')}: </span>{b.opponentReaction}
                    <span className="mx-2 text-slate-600">·</span>
                    <span className="font-semibold text-slate-300">{t('cardOS.bodySignal')}: </span>{b.bodySignal}
                  </p>
                  <p className="text-sm leading-6 text-amber-100">
                    <span className="font-semibold text-amber-300">{t('ifThen.then')}: </span>{b.response}
                  </p>
                  {b.adjustment && (
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      <span className="font-semibold text-slate-300">{t('cardOS.adjustment')}: </span>{b.adjustment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Failure responses */}
        {view.failureResponses.length > 0 && (
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-widest text-slate-400">{t('detail.failureResponses')}</p>
            <div className="space-y-2">
              {view.failureResponses.map((f, i) => (
                <div key={i} className="rounded-xl border border-white/8 bg-slate-950/50 p-4">
                  <p className="mb-1.5 text-xs text-rose-200">
                    <span className="font-semibold text-rose-300">✗ </span>{f.failure}
                  </p>
                  <p className="text-sm leading-6 text-slate-200">
                    <span className="font-semibold text-emerald-300">→ </span>{f.response}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionAccordion>
  )
}
