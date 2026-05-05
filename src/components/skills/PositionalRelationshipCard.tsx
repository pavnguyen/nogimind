import { useTranslation } from 'react-i18next'
import type { LanguageCode, PositionalRelationship } from '../../types/skill'
import { getLocalizedArray, getLocalizedText } from '../../utils/localization'
import { Badge } from '../common/Badge'
import { ConnectionPointList } from './ConnectionPointList'
import { MechanicsChecklist } from './MechanicsChecklist'

export const PositionalRelationshipCard = ({ relationship, lang }: { relationship: PositionalRelationship; lang: LanguageCode }) => {
  const { t } = useTranslation()
  return (
    <article className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="mr-2 font-semibold text-white">{getLocalizedText(relationship.name, lang)}</h3>
        <Badge tone="emerald">{t(`mechanics.roles.${relationship.dominantPlayer}`)}</Badge>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-300">{getLocalizedText(relationship.description, lang)}</p>
      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('mechanics.connectionPoints')}</p>
        <ConnectionPointList points={relationship.keyControlPoints} lang={lang} />
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('mechanics.defenderGoal')}</p>
          <MechanicsChecklist items={getLocalizedArray(relationship.escapePriorities, lang)} tone="safety" />
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('mechanics.attackerGoal')}</p>
          <MechanicsChecklist items={getLocalizedArray(relationship.attackPriorities, lang)} />
        </div>
      </div>
    </article>
  )
}
