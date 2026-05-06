import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { BodyMechanicsSystem as BodyMechanicsSystemType, LanguageCode } from '../../types/skill'
import type { ViewMode } from '../../types/settings'
import { getLocalizedArray, getLocalizedText } from '../../utils/localization'
import { Badge } from '../common/Badge'
import { SectionCard } from '../common/SectionCard'
import { MechanicsPhaseCard } from './MechanicsPhaseCard'
import { MechanicsChecklist } from './MechanicsChecklist'
import type { MechanicsFilter } from './BodyPartInstructionGrid'

const filters: MechanicsFilter[] = ['all', 'headNeck', 'armsHands', 'torsoHips', 'legsFeet', 'pressure', 'safety']

export const BodyMechanicsSystem = ({
  system,
  lang,
  viewMode,
}: {
  system: BodyMechanicsSystemType
  lang: LanguageCode
  viewMode: ViewMode
}) => {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<MechanicsFilter>('all')
  const [compact, setCompact] = useState(viewMode === 'simple')
  const defaultExpanded = viewMode !== 'simple'

  return (
    <SectionCard
      title={t('mechanics.heading')}
      description={getLocalizedText(system.overview, lang)}
      action={
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCompact(true)}
            className={`rounded-md px-3 py-2 text-xs font-semibold ${compact ? 'bg-emerald-300 text-slate-950' : 'border border-white/10 text-slate-300'}`}
          >
            {t('settings.simple')}
          </button>
          <button
            type="button"
            onClick={() => setCompact(false)}
            className={`rounded-md px-3 py-2 text-xs font-semibold ${!compact ? 'bg-cyan-300 text-slate-950' : 'border border-white/10 text-slate-300'}`}
          >
            {t('settings.standard')}
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {system.topPlayerGoal ? <GoalCard label={t('mechanics.topGoal')} text={getLocalizedText(system.topPlayerGoal, lang)} /> : null}
          {system.bottomPlayerGoal ? <GoalCard label={t('mechanics.bottomGoal')} text={getLocalizedText(system.bottomPlayerGoal, lang)} /> : null}
          {system.attackerGoal ? <GoalCard label={t('mechanics.attackerGoal')} text={getLocalizedText(system.attackerGoal, lang)} /> : null}
          {system.defenderGoal ? <GoalCard label={t('mechanics.defenderGoal')} text={getLocalizedText(system.defenderGoal, lang)} /> : null}
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold ${
                filter === item ? 'border-cyan-300 bg-cyan-300 text-slate-950' : 'border-white/10 bg-slate-900 text-slate-300'
              }`}
            >
              {t(`mechanics.filters.${item}`)}
            </button>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('mechanics.globalPrinciples')}</p>
            <MechanicsChecklist items={getLocalizedArray(system.globalPrinciples, lang)} />
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('mechanics.nonNegotiables')}</p>
            <MechanicsChecklist items={getLocalizedArray(system.nonNegotiables, lang)} tone="safety" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">{t('mechanics.phases')}</h3>
            <Badge tone="cyan">{system.phases.length}</Badge>
          </div>
          {system.phases.map((phase) => (
            <MechanicsPhaseCard
              key={phase.id}
              phase={phase}
              lang={lang}
              filter={filter}
              compact={compact}
              defaultExpanded={defaultExpanded}
            />
          ))}
        </div>

        {!compact ? (
          <div className="grid gap-4 xl:grid-cols-3">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('mechanics.commonMechanicalErrors')}</p>
              <MechanicsChecklist items={getLocalizedArray(system.commonMechanicalErrors, lang)} tone="danger" />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('mechanics.correctionCues')}</p>
              <MechanicsChecklist items={getLocalizedArray(system.correctionCues, lang)} />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('mechanics.safetyNotes')}</p>
              <MechanicsChecklist items={getLocalizedArray(system.safetyNotes, lang)} tone="safety" />
            </div>
          </div>
        ) : null}
      </div>
    </SectionCard>
  )
}

const GoalCard = ({ label, text }: { label: string; text: string }) => (
  <div className="rounded-md border border-white/10 bg-slate-900/60 p-3">
    <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">{label}</p>
    <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
  </div>
)
