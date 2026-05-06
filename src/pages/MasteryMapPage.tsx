import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Badge } from '../components/common/Badge'
import { SectionCard } from '../components/common/SectionCard'
import { PagePurposeBanner } from '../components/learning/PagePurposeBanner'
import { masteryStages } from '../data/masteryStages'
import { useConceptsQuery } from '../queries/conceptQueries'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getLocalizedArray, getLocalizedText } from '../utils/localization'

export default function MasteryMapPage() {
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)
  const skills = useSkillsQuery().data ?? []
  const concepts = useConceptsQuery().data ?? []
  const skillsById = new Map(skills.map((skill) => [skill.id, skill]))
  const conceptsById = new Map(concepts.map((concept) => [concept.id, concept]))

  return (
    <div className="space-y-6">
      <PagePurposeBanner
        title={t('mastery.heading')}
        purpose={t('mastery.whatFor')}
        whenToUse={t('mastery.whenToUse')}
        bestNextStepLabel={t('mastery.nextStep')}
        bestNextStepTo="/learn"
      />

      <div className="space-y-4">
        {masteryStages.map((stage) => (
          <SectionCard key={stage.id} title={`${stage.order}. ${getLocalizedText(stage.title, lang)}`} description={getLocalizedText(stage.shortDescription, lang)}>
            <div className="grid gap-5 xl:grid-cols-[1.1fr_1fr]">
              <div className="space-y-4">
                <p className="text-sm leading-6 text-slate-300">{getLocalizedText(stage.philosophy, lang)}</p>
                <div>
                  <p className="text-sm font-semibold text-cyan-100">{t('mastery.whatToLearn')}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {getLocalizedArray(stage.whatToLearn, lang).map((item) => <Badge key={item} tone="cyan">{item}</Badge>)}
                  </div>
                </div>
                <div className="rounded-md border border-emerald-300/15 bg-emerald-300/10 p-3">
                  <p className="text-sm font-semibold text-emerald-100">{t('mastery.highLevelExecution')}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{getLocalizedText(stage.highLevelExecution, lang)}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-white">{t('mastery.commonMistakes')}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-400">
                    {getLocalizedArray(stage.commonMistakes, lang).map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t('common.skills')}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {stage.keySkillIds.map((id) => skillsById.get(id)).filter(Boolean).map((skill) => (
                      <Link key={skill?.id} to={`/skills/${skill?.id}`} className="rounded-md border border-white/10 px-2 py-1 text-xs text-cyan-200 hover:bg-white/10">
                        {getLocalizedText(skill?.title, lang)}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t('nav.concepts')}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {stage.keyConceptIds.map((id) => conceptsById.get(id)).filter(Boolean).map((concept) => (
                      <Link key={concept?.id} to={`/concepts/${concept?.id}`} className="rounded-md border border-white/10 px-2 py-1 text-xs text-emerald-200 hover:bg-white/10">
                        {getLocalizedText(concept?.title, lang)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  )
}
