import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { NotFound } from '../components/common/NotFound'
import { SectionCard } from '../components/common/SectionCard'
import { NextStepStrip } from '../components/learning/NextStepStrip'
import { RelatedKnowledgePanel } from '../components/knowledge/RelatedKnowledgePanel'
import { useConceptQuery, useConceptsQuery } from '../queries/conceptQueries'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import type { LanguageCode, SkillNode } from '../types/skill'
import { getConceptKnowledgeLinks } from '../utils/knowledgeGraph'
import { getLocalizedArray, getLocalizedText } from '../utils/localization'

export default function ConceptDetailPage() {
  const { conceptId } = useParams()
  const { t } = useTranslation()
  const language = useSettingsStore((state) => state.language)
  const conceptQuery = useConceptQuery(conceptId)
  const concepts = useConceptsQuery().data ?? []
  const skills = useSkillsQuery().data ?? []
  const concept = conceptQuery.data
  const skillsById = new Map(skills.map((skill) => [skill.id, skill]))
  const conceptsById = new Map(concepts.map((item) => [item.id, item]))

  if (!conceptQuery.isLoading && !concept) {
    return <NotFound title={t('concepts.notFoundTitle')} body={t('concepts.notFoundBody')} to="/concepts" label={t('concepts.backToConcepts')} />
  }
  if (!concept) return <p className="text-slate-400">{t('common.loading')}</p>

  return (
    <div className="space-y-6">
      <Link to="/concepts" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-cyan-100">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t('concepts.backToConcepts')}
      </Link>

      <section className="rounded-lg border border-white/10 bg-slate-950/60 p-5 shadow-glow">
        <div className="flex flex-wrap gap-2">
          <Badge tone="cyan">{t(`conceptCategories.${concept.category}`)}</Badge>
          <Badge tone="emerald">{t(`conceptLevels.${concept.level}`)}</Badge>
          {concept.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
        </div>
        <h1 className="mt-4 text-3xl font-semibold text-white">{getLocalizedText(concept.title, language)}</h1>
        <p className="mt-3 max-w-4xl text-slate-300">{getLocalizedText(concept.shortDefinition, language)}</p>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title={t('concepts.whyItMatters')}>
          <p className="leading-7 text-slate-300">{getLocalizedText(concept.whyItMatters, language)}</p>
        </SectionCard>
        <SectionCard title={t('concepts.trainingCues')}>
          <ul className="space-y-2 text-sm leading-6 text-slate-300">
            {getLocalizedArray(concept.trainingCues, language).map((cue) => <li key={cue}>{cue}</li>)}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title={t('concepts.deepExplanation')}>
        <p className="leading-7 text-slate-300">{getLocalizedText(concept.deepExplanation, language)}</p>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title={t('concepts.beginnerView')}>
          <p className="leading-7 text-slate-300">{getLocalizedText(concept.beginnerView, language)}</p>
        </SectionCard>
        <SectionCard title={t('concepts.advancedView')}>
          <p className="leading-7 text-slate-300">{getLocalizedText(concept.advancedView, language)}</p>
        </SectionCard>
      </div>

      <SectionCard title={t('concepts.ifThenExamples')}>
        <div className="grid gap-3 xl:grid-cols-2">
          {concept.ifThenExamples.map((example, index) => (
            <article key={`${getLocalizedText(example.if, 'en')}-${index}`} className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">{t('ifThen.if')}</p>
              <p className="mt-1 text-sm leading-6 text-slate-200">{getLocalizedText(example.if, language)}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-emerald-200">{t('ifThen.then')}</p>
              <p className="mt-1 text-sm leading-6 text-slate-200">{getLocalizedText(example.then, language)}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('ifThen.why')}</p>
              <p className="mt-1 text-sm leading-6 text-slate-400">{getLocalizedText(example.why, language)}</p>
              <SkillLinks ids={example.relatedSkillIds} skillsById={skillsById} lang={language} />
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={t('concepts.misunderstandings')}>
        <div className="grid gap-3 xl:grid-cols-2">
          {concept.commonMisunderstandings.map((item, index) => (
            <article key={`${getLocalizedText(item.misunderstanding, 'en')}-${index}`} className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
              <p className="text-sm font-semibold text-rose-200">{getLocalizedText(item.misunderstanding, language)}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{getLocalizedText(item.correction, language)}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title={t('common.relatedSkills')}>
          <SkillLinks ids={concept.relatedSkillIds} skillsById={skillsById} lang={language} />
        </SectionCard>
        <SectionCard title={t('concepts.relatedConcepts')}>
          <div className="flex flex-wrap gap-2">
            {concept.relatedConceptIds.map((id) => conceptsById.get(id)).filter(Boolean).map((related) => (
              <Link key={related?.id} to={`/concepts/${related?.id}`} className="rounded-md border border-white/10 px-3 py-2 text-sm text-cyan-200 hover:bg-white/10">
                {getLocalizedText(related?.title, language)}
              </Link>
            ))}
            {!concept.relatedConceptIds.length ? <span className="text-sm text-slate-400">{t('common.none')}</span> : null}
          </div>
        </SectionCard>
      </div>

      <RelatedKnowledgePanel lang={language} groups={getConceptKnowledgeLinks(concept.id)} />

      <NextStepStrip
        title={t('concepts.nextStep')}
        items={[
          concept.relatedSkillIds[0]
            ? { title: t('common.relatedSkills'), body: t('concepts.appliedHere'), to: `/skills/${concept.relatedSkillIds[0]}` }
            : { title: t('common.relatedSkills'), body: t('concepts.appliedHere'), to: '/skills' },
          { title: t('microDetails.heading'), body: t('concepts.trainingCues'), to: '/micro-details' },
          { title: t('positions.heading'), body: t('concepts.relatedConcepts'), to: '/positions' },
        ]}
      />
    </div>
  )
}

const SkillLinks = ({
  ids,
  skillsById,
  lang,
}: {
  ids: string[]
  skillsById: Map<string, SkillNode>
  lang: LanguageCode
}) => {
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
