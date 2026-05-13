import { useTranslation } from 'react-i18next'
import { SectionAccordion } from './SectionAccordion'
import { BodyContactCard } from './BodyContactCard'
import { BodyMapPanel } from './BodyMapPanel'
import type { BodyPositionView } from '../../data/skills/skillViewModel'

type Props = { view: BodyPositionView }

export const BodyPositionSection = ({ view }: Props) => {
  const { t } = useTranslation()

  if (!view.available) {
    return (
      <SectionAccordion id="body-position" title={t('cardOS.bodyPosition')} accentColor="violet">
        <p className="text-sm italic text-slate-500">{t('cardOS.bodyPositionEmpty')}</p>
      </SectionAccordion>
    )
  }

  return (
    <SectionAccordion
      id="body-position"
      title={t('cardOS.bodyPosition')}
      badge={`${view.totalContacts} ${t('cardOS.contacts')}`}
      accentColor="violet"
    >
      <div className="space-y-6">
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
        <div className="grid gap-3 lg:grid-cols-2">
          <BodyMapPanel title={t('cardOS.attackerBodyMap')} tone="attacker" items={view.attackerMap} />
          <BodyMapPanel title={t('cardOS.defenderBodyMap')} tone="defender" items={view.defenderMap} />
        </div>
        <div className="rounded-lg border border-white/8 bg-slate-950/40 p-4">
          <p className="text-sm leading-6 text-slate-300">
            <span className="font-semibold text-slate-100">{t('bodyToBody.defaultOrientation')}: </span>
            {view.defaultOrientation}
          </p>
          <p className="mt-1.5 text-xs leading-5 text-slate-500">
            <span className="font-semibold text-slate-400">{t('bodyToBody.mirrorNote')}: </span>
            {view.mirrorNote}
          </p>
        </div>
        {view.phases.map((phase) => (
          <div key={phase.id} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/8" />
              <div>
                <p className="text-center text-xs font-semibold uppercase tracking-widest text-violet-400">{phase.title}</p>
                <p className="mt-0.5 text-center text-xs text-slate-500">{phase.goal}</p>
              </div>
              <div className="h-px flex-1 bg-white/8" />
            </div>
            <div className="grid gap-3 xl:grid-cols-2">
              {phase.contacts.map((c) => <BodyContactCard key={c.id} {...c} />)}
            </div>
            <div className="grid gap-2 text-xs md:grid-cols-2">
              <div className="flex items-start gap-2 rounded-lg border border-emerald-400/15 bg-emerald-400/5 p-3">
                <span className="mt-0.5 text-emerald-400">✓</span>
                <span className="leading-5 text-emerald-200">{phase.successSignal}</span>
              </div>
              <div className="flex items-start gap-2 rounded-lg border border-rose-400/15 bg-rose-400/5 p-3">
                <span className="mt-0.5 text-rose-400">✗</span>
                <span className="leading-5 text-rose-200">{phase.failureSignal}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionAccordion>
  )
}
