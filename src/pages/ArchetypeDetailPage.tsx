import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { NotFound } from '../components/common/NotFound'
import { SectionCard } from '../components/common/SectionCard'
import { RelatedKnowledgePanel } from '../components/knowledge/RelatedKnowledgePanel'
import { useArchetypeQuery } from '../queries/archetypeQueries'
import { useConceptsQuery } from '../queries/conceptQueries'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import type { ConceptNode } from '../types/concept'
import type { LanguageCode, SkillNode } from '../types/skill'
import { getRelatedItems } from '../utils/knowledgeGraph'
import { getLocalizedArray, getLocalizedText } from '../utils/localization'

export default function ArchetypeDetailPage() {
  const { archetypeId } = useParams()
  const { t } = useTranslation()
  const language = useSettingsStore((state) => state.language)
  const archetypeQuery = useArchetypeQuery(archetypeId)
  const skills = useSkillsQuery().data ?? []
  const concepts = useConceptsQuery().data ?? []
  const archetype = archetypeQuery.data
  const skillsById = new Map(skills.map((skill) => [skill.id, skill]))
  const conceptsById = new Map(concepts.map((concept) => [concept.id, concept]))

  if (!archetypeQuery.isLoading && !archetype) {
    return <NotFound title={t('archetypes.notFoundTitle')} body={t('archetypes.notFoundBody')} to="/archetypes" label={t('archetypes.backToArchetypes')} />
  }
  if (!archetype) return <p className="text-slate-400">{t('common.loading')}</p>

  return (
    <div className="space-y-6">
      <Link to="/archetypes" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-cyan-100">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t('archetypes.backToArchetypes')}
      </Link>

      <section className="rounded-lg border border-white/10 bg-slate-950/60 p-5 shadow-glow">
        <div className="flex flex-wrap gap-2">
          <Badge tone="emerald">{t('archetypes.coreSkillsCount', { count: archetype.coreSkillIds.length })}</Badge>
          <Badge tone="cyan">{t('archetypes.conceptsCount', { count: archetype.coreConceptIds.length })}</Badge>
        </div>
        <h1 className="mt-4 text-3xl font-semibold text-white">{getLocalizedText(archetype.title, language)}</h1>
        <p className="mt-3 max-w-4xl text-slate-300">{getLocalizedText(archetype.shortDescription, language)}</p>
      </section>

      <SectionCard title={t('archetypes.philosophy')}>
        <p className="text-sm leading-6 text-slate-300">{getLocalizedText(archetype.philosophy, language)}</p>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <ListCard title={t('archetypes.bestFor')} items={getLocalizedArray(archetype.bestFor, language)} />
        <ListCard title={t('archetypes.notIdealFor')} items={getLocalizedArray(archetype.notIdealFor, language)} tone="danger" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title={t('archetypes.coreConcepts')}>
          <ConceptLinks ids={archetype.coreConceptIds} conceptsById={conceptsById} lang={language} />
        </SectionCard>
        <SectionCard title={t('archetypes.coreSkills')}>
          <SkillLinks ids={archetype.coreSkillIds} skillsById={skillsById} lang={language} />
        </SectionCard>
        <SectionCard title={t('archetypes.supportSkills')}>
          <SkillLinks ids={archetype.supportSkillIds} skillsById={skillsById} lang={language} />
        </SectionCard>
        <SectionCard title={t('archetypes.requiredDefensiveSkills')}>
          <SkillLinks ids={archetype.requiredDefensiveSkillIds} skillsById={skillsById} lang={language} />
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ListCard title={t('archetypes.commonWeaknesses')} items={getLocalizedArray(archetype.commonWeaknesses, language)} tone="danger" />
        <ListCard title={t('archetypes.trainingPriorities')} items={getLocalizedArray(archetype.trainingPriorities, language)} />
      </div>

      <SectionCard title={t('archetypes.ifThenStrategy')}>
        <div className="grid gap-3 xl:grid-cols-3">
          {archetype.ifThenStrategy.map((strategy, index) => (
            <article key={`${archetype.id}-strategy-${index}`} className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">{t('ifThen.if')}</p>
              <p className="mt-1 text-sm leading-6 text-slate-200">{getLocalizedText(strategy.if, language)}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-emerald-200">{t('ifThen.then')}</p>
              <p className="mt-1 text-sm leading-6 text-slate-200">{getLocalizedText(strategy.then, language)}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('ifThen.why')}</p>
              <p className="mt-1 text-sm leading-6 text-slate-400">{getLocalizedText(strategy.why, language)}</p>
              <SkillLinks ids={strategy.skillIds} skillsById={skillsById} lang={language} className="mt-3" />
            </article>
          ))}
        </div>
      </SectionCard>

      <RelatedKnowledgePanel lang={language} groups={getRelatedItems('archetype', archetype.id)} />
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

const SkillLinks = ({
  ids,
  skillsById,
  lang,
  className = '',
}: {
  ids: string[]
  skillsById: Map<string, SkillNode>
  lang: LanguageCode
  className?: string
}) => {
  const { t } = useTranslation()
  const skills = ids.map((id) => skillsById.get(id)).filter(Boolean)
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {skills.map((skill) => (
        <Link key={skill?.id} to={`/skills/${skill?.id}`} className="rounded-md border border-cyan-300/20 px-2 py-1 text-xs text-cyan-100 hover:bg-white/10">
          {getLocalizedText(skill?.title, lang)}
        </Link>
      ))}
      {!skills.length ? <span className="text-xs text-slate-500">{t('common.none')}</span> : null}
    </div>
  )
}

const ConceptLinks = ({ ids, conceptsById, lang }: { ids: string[]; conceptsById: Map<string, ConceptNode>; lang: LanguageCode }) => {
  const { t } = useTranslation()
  const concepts = ids.map((id) => conceptsById.get(id)).filter(Boolean)
  return (
    <div className="flex flex-wrap gap-2">
      {concepts.map((concept) => (
        <Link key={concept?.id} to={`/concepts/${concept?.id}`} className="rounded-md border border-emerald-300/20 px-2 py-1 text-xs text-emerald-100 hover:bg-white/10">
          {getLocalizedText(concept?.title, lang)}
        </Link>
      ))}
      {!concepts.length ? <span className="text-xs text-slate-500">{t('common.none')}</span> : null}
    </div>
  )
}
