import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Badge } from '../components/common/Badge'
import { NotFound } from '../components/common/NotFound'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'
import { NextStepStrip } from '../components/learning/NextStepStrip'
import { useConceptsQuery } from '../queries/conceptQueries'
import { usePositionQuery, usePositionsQuery } from '../queries/positionQueries'
import { useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import type { LanguageCode, SkillNode } from '../types/skill'
import { getMicroDetails } from '../utils/knowledgeModules'
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
  const microDetails = getMicroDetails(skills)

  if (!positionQuery.isLoading && !position) {
    return <NotFound title={t('positions.notFoundTitle')} body={t('positions.notFoundBody')} to="/positions" label={t('positions.backToPositions')} />
  }
  if (!position) return <p className="text-slate-400">{t('common.loading')}</p>

  const leadingSkills = positions
    .filter((item) => item.advancementOptions.some((option) => option.nextPositionId === position.id))
    .flatMap((item) => item.relatedSkillIds)
    .map((id) => skillsById.get(id))
    .filter((item): item is SkillNode => Boolean(item))
  const relatedMicroDetails = microDetails.filter((detail) => position.relatedSkillIds.includes(detail.skillId))

  return (
    <PageShell
      backTo="/positions"
      backLabel={t('positions.backToPositions')}
      title={getLocalizedText(position.title, language)}
      subtitle={getLocalizedText(position.description, language)}
      badge={t(`positionCategories.${position.category}`)}
      badgeTone="cyan"
    >
      <div className="mt-2 flex flex-wrap gap-2">
        <Badge tone={position.status === 'critical' || position.status === 'dangerous' ? 'rose' : 'emerald'}>{t(`positionStatuses.${position.status}`)}</Badge>
      </div>

      <SectionCard title={t('positions.learnStepByStep')}>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {[
            { title: t('positions.stepTitles.understand'), body: t('positions.whatIsTheGoal') },
            { title: t('positions.stepTitles.survival'), body: t('positions.dangerToRecognize') },
            { title: t('positions.stepTitles.skills'), body: t('positions.skillsStartHere') },
            { title: t('positions.stepTitles.details'), body: t('positions.microDetailsMatter') },
            { title: t('positions.stepTitles.escapes'), body: t('positions.commonProblems') },
            { title: t('positions.stepTitles.chains'), body: t('positions.whatToLearnNext') },
          ].map((step, index) => (
            <article key={step.title} className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
              <Badge tone="cyan">{index + 1}</Badge>
              <p className="mt-2 text-sm font-semibold text-white">{step.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{step.body}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title={t('positions.whatIsTheGoal')}>
          <ul className="space-y-2 text-sm leading-6 text-slate-300">
            {getLocalizedArray(position.topPlayerGoals, language).slice(0, 4).map((item) => <li key={item}>{item}</li>)}
          </ul>
        </SectionCard>
        <SectionCard title={t('positions.dangerToRecognize')}>
          <ul className="space-y-2 text-sm leading-6 text-amber-100">
            {getLocalizedArray(position.dangerSignals, language).slice(0, 4).map((item) => <li key={item}>{item}</li>)}
          </ul>
        </SectionCard>
        <SectionCard title={t('positions.skillsStartHere')}>
          <SkillLinks ids={position.relatedSkillIds} skillsById={skillsById} lang={language} />
        </SectionCard>
        <SectionCard title={t('positions.skillsLeadHere')}>
          <SkillLinks ids={leadingSkills.map((skill) => skill.id)} skillsById={skillsById} lang={language} />
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title={t('positions.microDetailsMatter')}>
          <div className="space-y-2">
            {relatedMicroDetails.slice(0, 4).map((detail) => (
              <div key={detail.id} className="rounded-md border border-white/10 bg-slate-900/60 p-3">
                <p className="text-sm font-semibold text-white">{getLocalizedText(detail.title, language)}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{getLocalizedText(detail.correctionCue, language)}</p>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title={t('positions.commonProblems')}>
          <ul className="space-y-2 text-sm leading-6 text-slate-300">
            {getLocalizedArray(position.escapePriorities, language).slice(0, 4).map((item) => <li key={item}>{item}</li>)}
          </ul>
        </SectionCard>
      </div>

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

      <NextStepStrip
        title={t('positions.whatToLearnNext')}
        description={t('positions.nextStep')}
        items={[
          position.relatedSkillIds[0]
            ? { title: t('common.relatedSkills'), body: t('positions.skillsStartHere'), to: `/skills/${position.relatedSkillIds[0]}` }
            : { title: t('common.relatedSkills'), body: t('positions.skillsStartHere'), to: '/skills' },
          { title: t('microDetails.heading'), body: t('positions.microDetailsMatter'), to: `/micro-details?skill=${position.relatedSkillIds[0] ?? ''}`.replace(/\?skill=$/, '') },
          { title: t('chains.heading'), body: t('positions.whatToLearnNext'), to: '/chains' },
          { title: t('escapeMaps.heading'), body: t('positions.commonProblems'), to: position.relatedSkillIds[0] ? `/escape-maps/${position.relatedSkillIds[0]}` : '/escape-maps' },
        ]}
      />
    </PageShell>
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
