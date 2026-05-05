import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { NotFound } from '../components/common/NotFound'
import { SectionCard } from '../components/common/SectionCard'
import { RelatedKnowledgePanel } from '../components/knowledge/RelatedKnowledgePanel'
import { useConceptsQuery } from '../queries/conceptQueries'
import { useDefensiveLayerQuery } from '../queries/defenseQueries'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import type { LanguageCode, SkillNode } from '../types/skill'
import { getRelatedItems } from '../utils/knowledgeGraph'
import { getLocalizedArray, getLocalizedText } from '../utils/localization'

export default function DefenseDetailPage() {
  const { layerId } = useParams()
  const { t } = useTranslation()
  const language = useSettingsStore((state) => state.language)
  const layerQuery = useDefensiveLayerQuery(layerId)
  const skills = useSkillsQuery().data ?? []
  const concepts = useConceptsQuery().data ?? []
  const layer = layerQuery.data
  const skillsById = new Map(skills.map((skill) => [skill.id, skill]))
  const conceptsById = new Map(concepts.map((concept) => [concept.id, concept]))

  if (!layerQuery.isLoading && !layer) {
    return <NotFound title={t('defense.notFoundTitle')} body={t('defense.notFoundBody')} to="/defense" label={t('defense.backToDefense')} />
  }
  if (!layer) return <p className="text-slate-400">{t('common.loading')}</p>

  return (
    <div className="space-y-6">
      <Link to="/defense" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-cyan-100">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t('defense.backToDefense')}
      </Link>

      <section className="rounded-lg border border-white/10 bg-slate-950/60 p-5 shadow-glow">
        <Badge tone="amber">{t(`safetyCategories.${layer.category}`)}</Badge>
        <h1 className="mt-4 text-3xl font-semibold text-white">{getLocalizedText(layer.title, language)}</h1>
        <p className="mt-3 max-w-4xl text-amber-100">{getLocalizedText(layer.threat, language)}</p>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <ListCard title={t('defense.earlyDangerSignals')} items={getLocalizedArray(layer.earlyDangerSignals, language)} />
        <ListCard title={t('defense.lateDangerSignals')} items={getLocalizedArray(layer.lateDangerSignals, language)} tone="danger" />
        <ListCard title={t('defense.immediatePriorities')} items={getLocalizedArray(layer.immediatePriorities, language)} />
        <ListCard title={t('defense.safeResponses')} items={getLocalizedArray(layer.safeResponses, language)} />
      </div>

      <ListCard title={t('defense.unsafeResponses')} items={getLocalizedArray(layer.unsafeResponses, language)} tone="danger" />

      <SectionCard title={t('defense.trainingAdvice')}>
        <p className="text-sm leading-6 text-slate-300">{getLocalizedText(layer.trainingAdvice, language)}</p>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title={t('common.relatedSkills')}>
          <SkillLinks ids={layer.relatedSkillIds} skillsById={skillsById} lang={language} />
        </SectionCard>
        <SectionCard title={t('concepts.relatedConcepts')}>
          <div className="flex flex-wrap gap-2">
            {layer.relatedConceptIds.map((id) => conceptsById.get(id)).filter(Boolean).map((concept) => (
              <Link key={concept?.id} to={`/concepts/${concept?.id}`} className="rounded-md border border-white/10 px-3 py-2 text-sm text-cyan-200 hover:bg-white/10">
                {getLocalizedText(concept?.title, language)}
              </Link>
            ))}
          </div>
        </SectionCard>
      </div>

      <RelatedKnowledgePanel lang={language} groups={getRelatedItems('defense', layer.id)} />
    </div>
  )
}

const ListCard = ({ title, items, tone = 'default' }: { title: string; items: string[]; tone?: 'default' | 'danger' }) => (
  <SectionCard title={title}>
    <ul className={`space-y-2 text-sm leading-6 ${tone === 'danger' ? 'text-amber-100' : 'text-slate-300'}`}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  </SectionCard>
)

const SkillLinks = ({ ids, skillsById, lang }: { ids: string[]; skillsById: Map<string, SkillNode>; lang: LanguageCode }) => {
  const { t } = useTranslation()
  const skills = ids.map((id) => skillsById.get(id)).filter(Boolean)
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <Link key={skill?.id} to={`/skills/${skill?.id}`} className="rounded-md border border-cyan-300/20 px-2 py-1 text-xs text-cyan-100 hover:bg-white/10">
          {getLocalizedText(skill?.title, lang)}
        </Link>
      ))}
      {!skills.length ? <span className="text-xs text-slate-500">{t('common.none')}</span> : null}
    </div>
  )
}
