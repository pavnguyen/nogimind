import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { NotFound } from '../components/common/NotFound'
import { SectionCard } from '../components/common/SectionCard'
import { RelatedKnowledgePanel } from '../components/knowledge/RelatedKnowledgePanel'
import { useConceptsQuery } from '../queries/conceptQueries'
import { usePositionQuery, usePositionsQuery } from '../queries/positionQueries'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import type { LanguageCode, SkillNode } from '../types/skill'
import { getPositionKnowledgeLinks } from '../utils/knowledgeGraph'
import { getLocalizedArray, getLocalizedText } from '../utils/localization'

export default function PositionDetailPage() {
  const { positionId } = useParams()
  const { t } = useTranslation()
  const language = useSettingsStore((state) => state.language)
  const positionQuery = usePositionQuery(positionId)
  const positions = usePositionsQuery().data ?? []
  const skills = useSkillsQuery().data ?? []
  const concepts = useConceptsQuery().data ?? []
  const position = positionQuery.data
  const positionsById = new Map(positions.map((item) => [item.id, item]))
  const skillsById = new Map(skills.map((item) => [item.id, item]))
  const conceptsById = new Map(concepts.map((item) => [item.id, item]))

  if (!positionQuery.isLoading && !position) {
    return <NotFound title={t('positions.notFoundTitle')} body={t('positions.notFoundBody')} to="/positions" label={t('positions.backToPositions')} />
  }
  if (!position) return <p className="text-slate-400">{t('common.loading')}</p>

  return (
    <div className="space-y-6">
      <Link to="/positions" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-cyan-100">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t('positions.backToPositions')}
      </Link>

      <section className="rounded-lg border border-white/10 bg-slate-950/60 p-5 shadow-glow">
        <div className="flex flex-wrap gap-2">
          <Badge tone="cyan">{t(`positionCategories.${position.category}`)}</Badge>
          <Badge tone={position.status === 'critical' || position.status === 'dangerous' ? 'rose' : 'emerald'}>{t(`positionStatuses.${position.status}`)}</Badge>
        </div>
        <h1 className="mt-4 text-3xl font-semibold text-white">{getLocalizedText(position.title, language)}</h1>
        <p className="mt-3 max-w-4xl text-slate-300">{getLocalizedText(position.description, language)}</p>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <ListCard title={t('positions.topGoals')} items={getLocalizedArray(position.topPlayerGoals, language)} />
        <ListCard title={t('positions.bottomGoals')} items={getLocalizedArray(position.bottomPlayerGoals, language)} />
        <ListCard title={t('positions.controlPoints')} items={getLocalizedArray(position.controlPoints, language)} />
        <ListCard title={t('positions.escapePriorities')} items={getLocalizedArray(position.escapePriorities, language)} />
      </div>

      <SectionCard title={t('positions.advancementOptions')}>
        <div className="grid gap-3 xl:grid-cols-2">
          {position.advancementOptions.map((option, index) => {
            const next = option.nextPositionId ? positionsById.get(option.nextPositionId) : undefined
            return (
              <article key={`${getLocalizedText(option.action, 'en')}-${index}`} className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
                <p className="font-semibold text-white">{getLocalizedText(option.action, language)}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{getLocalizedText(option.why, language)}</p>
                {next ? (
                  <Link to={`/positions/${next.id}`} className="mt-3 inline-flex rounded-md border border-emerald-300/20 px-2 py-1 text-xs text-emerald-100 hover:bg-white/10">
                    {getLocalizedText(next.title, language)}
                  </Link>
                ) : null}
                <SkillLinks ids={option.relatedSkillIds} skillsById={skillsById} lang={language} />
              </article>
            )
          })}
        </div>
      </SectionCard>

      <ListCard title={t('positions.dangerSignals')} items={getLocalizedArray(position.dangerSignals, language)} tone="danger" />

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title={t('common.relatedSkills')}>
          <SkillLinks ids={position.relatedSkillIds} skillsById={skillsById} lang={language} />
        </SectionCard>
        <SectionCard title={t('concepts.relatedConcepts')}>
          <div className="flex flex-wrap gap-2">
            {position.relatedConceptIds.map((id) => conceptsById.get(id)).filter(Boolean).map((concept) => (
              <Link key={concept?.id} to={`/concepts/${concept?.id}`} className="rounded-md border border-white/10 px-3 py-2 text-sm text-cyan-200 hover:bg-white/10">
                {getLocalizedText(concept?.title, language)}
              </Link>
            ))}
          </div>
        </SectionCard>
      </div>

      <RelatedKnowledgePanel lang={language} groups={getPositionKnowledgeLinks(position.id)} />
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
    <div className="mt-3 flex flex-wrap gap-2">
      {skills.map((skill) => (
        <Link key={skill?.id} to={`/skills/${skill?.id}`} className="rounded-md border border-cyan-300/20 px-2 py-1 text-xs text-cyan-100 hover:bg-white/10">
          {getLocalizedText(skill?.title, lang)}
        </Link>
      ))}
      {!skills.length ? <span className="text-xs text-slate-500">{t('common.none')}</span> : null}
    </div>
  )
}
