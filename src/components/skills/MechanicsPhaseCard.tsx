import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { LanguageCode, MechanicsPhase } from '../../types/skill'
import { cn } from '../../utils/cn'
import { getLocalizedArray, getLocalizedText } from '../../utils/localization'
import { SectionCard } from '../common/SectionCard'
import { BodyPartInstructionGrid, type MechanicsFilter } from './BodyPartInstructionGrid'
import { ConnectionPointList } from './ConnectionPointList'
import { DirectionalCueList } from './DirectionalCueList'
import { MechanicsChecklist } from './MechanicsChecklist'

export const MechanicsPhaseCard = ({
  phase,
  lang,
  filter,
  compact,
  defaultExpanded,
}: {
  phase: MechanicsPhase
  lang: LanguageCode
  filter: MechanicsFilter
  compact: boolean
  defaultExpanded: boolean
}) => {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <SectionCard
      className="bg-slate-900/40"
      title={
        <button type="button" onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 text-left">
          {expanded ? <ChevronDown className="h-4 w-4 text-cyan-300" aria-hidden="true" /> : <ChevronRight className="h-4 w-4 text-cyan-300" aria-hidden="true" />}
          <span>{getLocalizedText(phase.name, lang)}</span>
        </button>
      }
      description={getLocalizedText(phase.objective, lang)}
    >
      <div className={cn('space-y-5', !expanded && 'hidden')}>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('mechanics.checkpoints')}</p>
          <MechanicsChecklist items={getLocalizedArray(phase.checkpoints, lang)} />
        </div>
        {!compact ? (
          <>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('mechanics.bodyPartInstructions')}</p>
              <BodyPartInstructionGrid instructions={phase.bodyPartInstructions} lang={lang} filter={filter} />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('mechanics.connectionPoints')}</p>
              <ConnectionPointList points={phase.connectionPoints} lang={lang} />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('mechanics.directionalCues')}</p>
              <DirectionalCueList cues={phase.directionalCues} lang={lang} />
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('mechanics.dangerSignals')}</p>
                <MechanicsChecklist items={getLocalizedArray(phase.dangerSignals, lang)} tone="danger" />
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('mechanics.successSignals')}</p>
                <MechanicsChecklist items={getLocalizedArray(phase.successSignals, lang)} />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </SectionCard>
  )
}
