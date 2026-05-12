import { lazy, Suspense } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { NotFound } from '../components/common/NotFound'
import { SectionCard } from '../components/common/SectionCard'
import { BodyChecklist } from '../components/skills/BodyChecklist'
import { BodyMechanicsSystem } from '../components/skills/BodyMechanicsSystem'
import { DangerSignals } from '../components/skills/DangerSignals'
import { DecisionTree } from '../components/skills/DecisionTree'
import { DomainBadge } from '../components/skills/DomainBadge'
import { FailureResponses } from '../components/skills/FailureResponses'
import { GlossaryLink } from '../components/skills/GlossaryLink'
import { IfThenDecisionList } from '../components/skills/IfThenDecisionList'
import { LevelBadge } from '../components/skills/LevelBadge'
import { PositionalRelationshipCard } from '../components/skills/PositionalRelationshipCard'
import { BlackbeltDetailsSection } from '../components/skills/BlackbeltDetailsSection'
import { BodyToBodyDetailsSection } from '../components/skills/BodyToBodyDetailsSection'
import { MicroDetailSystemSection } from '../components/skills/MicroDetailSystemSection'
import { SkillQuickMode } from '../components/skills/SkillQuickMode'
import { TechniqueQualityChecklistSection } from '../components/skills/TechniqueQualityChecklistSection'
import { ReactionBranchList } from '../components/skills/ReactionBranchList'
import { TechnicalDetailsSection } from '../components/skills/TechnicalDetailsSection'
import { SharedKnowledgePanel } from '../components/sharedKnowledge/SharedKnowledgePanel'
import { NextBestStepPanel } from '../components/knowledge/NextBestStepPanel'
import { RelatedKnowledgePanel } from '../components/knowledge/RelatedKnowledgePanel'
import { QuickCard } from '../components/skills/QuickCard'
import { TechniqueStateMachineSection } from '../components/stateGraph/TechniqueStateMachineSection'
import { GlossaryTermChip } from '../components/glossary/GlossaryTermChip'
import { ViewModeSwitcher } from '../components/common/ViewModeSwitcher'
import { useArchetypesQuery } from '../queries/archetypeQueries'
import { useConceptsQuery } from '../queries/conceptQueries'
import { useDefensiveLayersQuery } from '../queries/defenseQueries'
import { useGameTreeQuery, useUpdateGameTreeMutation } from '../queries/gameTreeQueries'
import { useGlossaryQuery } from '../queries/glossaryQueries'
import { usePositionsQuery } from '../queries/positionQueries'
import { useSkillQuery, useSkillsQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import type { GameTreeLaneId } from '../types/gameTree'
import type { SkillNode } from '../types/skill'
import type { SharedKnowledgeItem } from '../types/sharedKnowledge'
import { sharedKnowledgeById } from '../data/sharedKnowledge'
import { techniqueStateMachineBySkillId } from '../data/techniqueStateMachines'
import { getSkillKnowledgeLinks } from '../utils/knowledgeGraph'
import { getEscapeMaps, getTechniqueChains, skillHasTroubleshooter } from '../utils/knowledgeModules'
import { getLocalizedArray, getLocalizedText } from '../utils/localization'

const SkillSystemGraph = lazy(() => import('../components/graphs/SkillSystemGraph').then((module) => ({ default: module.SkillSystemGraph })))

const laneForSkill = (skill: SkillNode): GameTreeLaneId => {
  if (skill.tags.some((tag) => tag.includes('leg-lock') || tag.includes('heel-hook'))) return 'legLocks'
  if (skill.domain === 'passing') return 'passing'
  if (skill.domain === 'pins_rides') return 'pinning'
  if (skill.domain === 'submission_systems' || skill.domain === 'back_control') return 'submissions'
  if (skill.domain === 'escapes' || skill.domain === 'survival_defense') return 'escapes'
  if (skill.domain === 'guard_retention' || skill.domain === 'guard_offense') return 'guard'
  return 'standing'
}

export default function SkillDetailPage() {
  const { skillId } = useParams()
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const language = useSettingsStore((state) => state.language)
  const viewMode = useSettingsStore((state) => state.viewMode)
  const skillQuery = useSkillQuery(skillId)
  const skillsQuery = useSkillsQuery()
  const glossaryQuery = useGlossaryQuery()
  const conceptsQuery = useConceptsQuery()
  const positionsQuery = usePositionsQuery()
  const defenseQuery = useDefensiveLayersQuery()
  const archetypesQuery = useArchetypesQuery()
  const gameTreeQuery = useGameTreeQuery()
  const gameTreeMutation = useUpdateGameTreeMutation()
  const skill = skillQuery.data
  const skills = skillsQuery.data ?? []
  const glossary = glossaryQuery.data ?? []
  const concepts = conceptsQuery.data ?? []
  const positions = positionsQuery.data ?? []
  const defensiveLayers = defenseQuery.data ?? []
  const archetypes = archetypesQuery.data ?? []

  if (!skillQuery.isLoading && !skill) {
    return <NotFound title={t('common.skillNotFoundTitle')} body={t('common.skillNotFoundBody')} to="/skills" label={t('common.backToSkills')} />
  }
  if (!skill) return <p className="text-slate-400">{t('common.loading')}</p>

  const safetyRelevant = skill.tags.some((tag) => ['leg-lock', 'heel-hook', 'neck-safety', 'choke', 'ankle-lock', 'knee-safety'].includes(tag))
  const byId = new Map(skills.map((item) => [item.id, item]))
  const relatedConcepts = concepts.filter((concept) => concept.relatedSkillIds.includes(skill.id))
  const relatedPositions = positions.filter((position) => position.relatedSkillIds.includes(skill.id))
  const relatedSafetyLayers = defensiveLayers.filter((layer) => layer.relatedSkillIds.includes(skill.id))
  const relatedArchetypes = archetypes.filter((archetype) =>
    [...archetype.coreSkillIds, ...archetype.supportSkillIds, ...archetype.requiredDefensiveSkillIds].includes(skill.id),
  )
  const relatedGlossaryTerms = glossary.filter((term) => term.relatedSkillIds?.includes(skill.id)).slice(0, 8)
  const asSharedItems = (ids: string[] | undefined): SharedKnowledgeItem[] =>
    (ids ?? []).map((id) => sharedKnowledgeById.get(id)).filter((item): item is SharedKnowledgeItem => Boolean(item))
  const sharedPrinciples = asSharedItems(skill.sharedPrincipleIds)
  const sharedCues = asSharedItems(skill.sharedCueIds)
  const sharedErrors = asSharedItems(skill.sharedErrorIds)
  const sharedSafety = asSharedItems(skill.sharedSafetyIds)
  const sharedMechanics = asSharedItems(skill.sharedMechanicIds)
  const techniqueChain = getTechniqueChains([skill])[0]
  const escapeMap = getEscapeMaps([skill], language)[0]
  const hasTroubleshooter = skillHasTroubleshooter(skill)
  const isQuickMode = searchParams.get('mode') === 'quick'
  const layerParam = searchParams.get('layer')
  const activeLayer = layerParam === 'quick' || layerParam === 'body' || layerParam === 'system' ? layerParam : 'quick'
  const knowledgeGroups = getSkillKnowledgeLinks(skill.id)
  const stateMachine = techniqueStateMachineBySkillId.get(skill.id)

  const addToGameTree = () => {
    const tree = gameTreeQuery.data
    if (!tree) return
    const lane = laneForSkill(skill)
    if (tree[lane].includes(skill.id)) return
    gameTreeMutation.mutate({ ...tree, [lane]: [...tree[lane], skill.id] })
  }

  const toggleQuickMode = () => {
    const next = new URLSearchParams(searchParams)
    if (isQuickMode) next.delete('mode')
    else next.set('mode', 'quick')
    setSearchParams(next, { replace: true })
  }

  const setLayer = (layer: 'quick' | 'body' | 'system') => {
    const next = new URLSearchParams(searchParams)
    next.set('layer', layer)
    setSearchParams(next, { replace: true })
  }

  return (
    <div className="space-y-6">
      <Link to="/skills" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-cyan-100">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t('common.backToSkills')}
      </Link>

      <section className="rounded-lg border border-white/10 bg-slate-950/60 p-5 shadow-glow">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <DomainBadge domain={skill.domain} />
              <LevelBadge level={skill.level} />
              {skill.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
            </div>
            <h1 className="mt-4 text-3xl font-semibold text-white">{getLocalizedText(skill.title, language)}</h1>
            <p className="mt-3 max-w-4xl text-slate-400">{getLocalizedText(skill.shortDescription, language)}</p>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
              <span className="font-semibold text-slate-100">{t('detail.useThisSkillWhen')}: </span>
              {getLocalizedText(skill.situation, language)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <ViewModeSwitcher />
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={addToGameTree} className="rounded-md bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-950">
            {t('detail.addToGameTree')}
          </button>
          <button
            type="button"
            onClick={toggleQuickMode}
            className="rounded-md border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-300/15"
          >
            {isQuickMode ? t('quickMode.backToFull') : t('quickMode.toggle')}
          </button>
        </div>
      </section>

      {isQuickMode ? (
        <SkillQuickMode skill={skill} lang={language} fullDetailPath={`/skills/${skill.id}`} />
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <main className="space-y-6">
      <div className="sticky top-[72px] z-10 rounded-lg border border-white/10 bg-slate-950/90 p-2 shadow-xl backdrop-blur">
        <div className="grid gap-2 sm:grid-cols-3">
          {(['quick', 'body', 'system'] as const).map((layer) => (
            <button
              key={layer}
              type="button"
              onClick={() => setLayer(layer)}
              className={`rounded-md px-3 py-2 text-left text-sm font-semibold transition ${
                activeLayer === layer ? 'bg-emerald-300 text-slate-950' : 'bg-slate-900/70 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {t(`modeUx.skillLayers.${layer}`)}
              <span className={`mt-1 block text-xs font-normal ${activeLayer === layer ? 'text-slate-800' : 'text-slate-500'}`}>
                {t(`modeUx.skillLayers.${layer}Short`)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeLayer === 'quick' ? (
        <>
      <LayerHeading title={t('modeUx.skillLayers.quick')} body={t('modeUx.skillLayers.quickHelp')} />
      {skill.quickCard ? (
        <SectionCard title={t('detail.quickStart')} description={getLocalizedText(skill.quickCard.goal, language)}>
          <QuickCard card={skill.quickCard} lang={language} />
        </SectionCard>
      ) : null}
      <NextBestStepPanel skillId={skill.id} lang={language} />
        </>
      ) : null}

      {activeLayer === 'body' ? (
        <>
      <LayerHeading title={t('modeUx.skillLayers.body')} body={t('modeUx.skillLayers.bodyHelp')} />
      {skill.microDetailSystem ? <MicroDetailSystemSection system={skill.microDetailSystem} lang={language} viewMode={viewMode} /> : null}
      {skill.bodyToBodyDetails ? <BodyToBodyDetailsSection system={skill.bodyToBodyDetails} lang={language} viewMode={viewMode} /> : null}
        </>
      ) : null}

      {activeLayer === 'system' ? (
        <>
      <LayerHeading title={t('modeUx.skillLayers.system')} body={t('modeUx.skillLayers.systemHelp')} />
      {skill.qualityChecklist ? <TechniqueQualityChecklistSection skillId={skill.id} system={skill.qualityChecklist} lang={language} viewMode={viewMode} /> : null}
      {stateMachine ? (
        <TechniqueStateMachineSection stateMachine={stateMachine} skill={skill} skillsById={byId} lang={language} simple={viewMode === 'simple'} />
      ) : null}

      {relatedGlossaryTerms.length ? (
        <SectionCard title={t('detail.keyTerms')} description={t('glossary.subtitle')}>
          <div className="flex flex-wrap gap-2">
            {relatedGlossaryTerms.map((term) => (
              <GlossaryTermChip
                key={term.id}
                term={term}
                lang={language}
                relatedSkills={term.relatedSkillIds
                  ?.filter((relatedSkillId) => relatedSkillId !== skill.id)
                  .map((relatedSkillId) => getLocalizedText(byId.get(relatedSkillId)?.title, language))
                  .filter((item): item is string => Boolean(item))}
              />
            ))}
          </div>
        </SectionCard>
      ) : null}

      {skill.blackbeltDetails && viewMode === 'advanced' ? <BlackbeltDetailsSection system={skill.blackbeltDetails} lang={language} viewMode={viewMode} /> : null}

      {viewMode !== 'simple' ? <DetailGroupHeading title={t('detailGroups.understand')} /> : null}
      {viewMode !== 'simple' ? (
      <div className="grid gap-6 xl:grid-cols-3">
        <SectionCard title={t('detail.why')}><p className="leading-7 text-slate-300">{getLocalizedText(skill.whyItMatters, language)}</p></SectionCard>
        <SectionCard title={t('detail.situation')}><p className="leading-7 text-slate-300">{getLocalizedText(skill.situation, language)}</p></SectionCard>
        <SectionCard title={t('detail.goal')}><p className="leading-7 text-slate-300">{getLocalizedText(skill.primaryGoal, language)}</p></SectionCard>
      </div>
      ) : null}

      {viewMode !== 'simple' ? (
      <SectionCard title={t('detail.concepts')}>
        <ul className="space-y-2 text-sm leading-6 text-slate-300">
          {getLocalizedArray(skill.keyConcepts, language).map((concept) => (
            <li key={concept}><GlossaryLink text={concept} terms={glossary} lang={language} /></li>
          ))}
        </ul>
      </SectionCard>
      ) : null}
      {relatedConcepts.length ? (
        viewMode !== 'simple' ? (
        <SectionCard title={t('concepts.appliedHere')}>
          <div className="grid gap-3 md:grid-cols-2">
            {relatedConcepts.slice(0, relatedConcepts.length).map((concept) => (
              <Link key={concept.id} to={`/concepts/${concept.id}`} className="rounded-lg border border-white/10 bg-slate-900/60 p-4 hover:bg-white/10">
                <p className="text-sm font-semibold text-cyan-100">{getLocalizedText(concept.title, language)}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{getLocalizedText(concept.shortDefinition, language)}</p>
              </Link>
            ))}
          </div>
        </SectionCard>
        ) : null
      ) : null}
      {relatedPositions.length ? (
        viewMode !== 'simple' ? (
        <SectionCard title={t('positions.relatedPositions')}>
          <div className="grid gap-3 md:grid-cols-2">
            {relatedPositions.slice(0, relatedPositions.length).map((position) => (
              <Link key={position.id} to={`/positions/${position.id}`} className="rounded-lg border border-white/10 bg-slate-900/60 p-4 hover:bg-white/10">
                <p className="text-sm font-semibold text-emerald-100">{getLocalizedText(position.title, language)}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{getLocalizedText(position.description, language)}</p>
              </Link>
            ))}
          </div>
        </SectionCard>
        ) : null
      ) : null}

      {viewMode === 'advanced' ? <DetailGroupHeading title={t('detailGroups.execute')} /> : null}
      {viewMode === 'advanced' && skill.bodyMechanicsSystem ? <BodyMechanicsSystem system={skill.bodyMechanicsSystem} lang={language} viewMode={viewMode} /> : null}
      {viewMode === 'advanced' && skill.technicalDetails ? <TechnicalDetailsSection system={skill.technicalDetails} lang={language} viewMode={viewMode} /> : null}
      {viewMode === 'advanced' ? <SectionCard title={t('detail.bodyChecklist')}><BodyChecklist checklist={skill.bodyChecklist} lang={language} /></SectionCard> : null}
      {viewMode === 'advanced' ? <SectionCard title={t('detail.decisionTree')}><DecisionTree branches={skill.decisionTree} lang={language} /></SectionCard> : null}
      {viewMode === 'advanced' && (sharedPrinciples.length || sharedCues.length || sharedErrors.length || sharedSafety.length || sharedMechanics.length) ? (
        <SharedKnowledgePanel lang={language} principles={sharedPrinciples} cues={sharedCues} errors={sharedErrors} safety={sharedSafety} mechanics={sharedMechanics} />
      ) : null}

      {viewMode === 'advanced' ? (
        <SectionCard title={t('detail.systemGraph')}>
          <Suspense fallback={<p className="text-sm text-slate-400">{t('common.loading')}</p>}>
            <SkillSystemGraph skill={skill} allSkills={skills} lang={language} />
          </Suspense>
        </SectionCard>
      ) : null}

      {viewMode !== 'simple' ? <DetailGroupHeading title={t('detailGroups.adapt')} /> : null}
      {viewMode !== 'simple' && skill.ifThenDecisions?.length ? (
        <SectionCard title={t('detail.ifThenDecisions')}>
          <IfThenDecisionList decisions={skill.ifThenDecisions} skillsById={byId} lang={language} />
        </SectionCard>
      ) : null}
      {viewMode !== 'simple' && techniqueChain ? (
        <SectionCard title={t('chains.heading')} action={<Link to={`/chains?q=${encodeURIComponent(getLocalizedText(skill.title, 'en'))}`} className="rounded-md border border-cyan-300/20 px-3 py-2 text-sm font-medium text-cyan-100 hover:bg-white/10">{t('common.open')}</Link>}>
          <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            {techniqueChain.steps.slice(0, 6).map((step, index) => (
              <div key={step.id} className="rounded-md border border-white/10 bg-slate-900/60 p-3">
                <Badge tone="emerald">{index + 1}</Badge>
                <p className="mt-2 text-sm font-semibold text-white">{getLocalizedText(step.title, language)}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{getLocalizedText(step.keyDetail, language)}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      ) : null}
      {viewMode !== 'simple' && escapeMap ? (
        <SectionCard title={t('escapeMaps.heading')} action={<Link to={`/escape-maps/${skill.id}`} className="rounded-md border border-cyan-300/20 px-3 py-2 text-sm font-medium text-cyan-100 hover:bg-white/10">{t('common.open')}</Link>}>
          <div className="space-y-3">
            {escapeMap.routes.slice(0, 6).map((route) => (
              <div key={route.id} className="rounded-md border border-white/10 bg-slate-900/60 p-3">
                <p className="text-sm font-semibold text-white">{getLocalizedText(route.title, language)}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{getLocalizedText(route.prevention, language)}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      ) : null}
      {viewMode !== 'simple' ? <SectionCard title={t('detail.dangerSignals')}>
        <DangerSignals signals={skill.dangerSignals} lang={language} />
      </SectionCard> : null}
      {viewMode !== 'simple' ? <SectionCard title={t('detail.failureResponses')}><FailureResponses failures={skill.failureResponses} lang={language} /></SectionCard> : null}
      {skill.reactionBranches?.length && viewMode !== 'simple' ? (
        <SectionCard title={t('detail.reactionBranches')}>
          <ReactionBranchList branches={skill.reactionBranches} skillsById={byId} lang={language} />
        </SectionCard>
      ) : null}
      {skill.positionalRelationships?.length && viewMode === 'advanced' ? (
        <SectionCard title={t('detail.positionalRelationships')}>
          <div className="space-y-4">
            {skill.positionalRelationships.map((relationship) => (
              <PositionalRelationshipCard key={relationship.id} relationship={relationship} lang={language} />
            ))}
          </div>
        </SectionCard>
      ) : null}
      <DetailGroupHeading title={t('detailGroups.finishControl')} />
      {hasTroubleshooter ? (
        <SectionCard title={t('troubleshooters.heading')} description={t('troubleshooters.skillDetailPrompt')}>
          <Link to={`/troubleshooters/${skill.id}`} className="inline-flex items-center gap-1.5 rounded-md bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-950">
            {t('troubleshooters.openTroubleshooter')}
          </Link>
        </SectionCard>
      ) : null}
      {skill.technicalDetails?.finishingMechanics?.length ? (
        <SectionCard title={t('technical.finishChecklist')}>
          <div className="grid gap-2 md:grid-cols-2">
            {skill.technicalDetails.finishingMechanics.flatMap((finish) => getLocalizedArray(finish.finishChecklist, language)).slice(0, 10).map((item) => (
              <p key={item} className="rounded-md border border-white/10 bg-slate-900/60 p-3 text-sm leading-6 text-slate-300">{item}</p>
            ))}
          </div>
        </SectionCard>
      ) : null}
      {safetyRelevant ? <SectionCard title={t('mechanics.safetyNotes')}><p className="text-sm leading-6 text-amber-100">{t('common.safetyNote')}</p></SectionCard> : null}
      {relatedSafetyLayers.length ? (
        <SectionCard title={t('defense.relatedSafety')}>
          <div className="grid gap-3 md:grid-cols-2">
            {relatedSafetyLayers.map((layer) => (
              <Link key={layer.id} to={`/defense/${layer.id}`} className="rounded-lg border border-amber-300/15 bg-amber-300/10 p-4 hover:bg-amber-300/15">
                <p className="text-sm font-semibold text-amber-100">{getLocalizedText(layer.title, language)}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{getLocalizedText(layer.threat, language)}</p>
              </Link>
            ))}
          </div>
        </SectionCard>
      ) : null}

      <DetailGroupHeading title={t('detailGroups.connect')} />
      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title={t('common.prerequisites')}>
          <div className="flex flex-wrap gap-2">
            {skill.prerequisites.map((id) => byId.get(id)).filter(Boolean).map((item) => (
              <Link key={item?.id} to={`/skills/${item?.id}`} className="rounded-md border border-white/10 px-3 py-2 text-sm text-cyan-200 hover:bg-white/10">
                {getLocalizedText(item?.title, language)}
              </Link>
            ))}
            {!skill.prerequisites.length ? <span className="text-sm text-slate-400">{t('common.none')}</span> : null}
          </div>
        </SectionCard>
        <SectionCard title={t('common.relatedSkills')}>
          <div className="flex flex-wrap gap-2">
            {skill.relatedSkills.map((id) => byId.get(id)).filter(Boolean).map((item) => (
              <Link key={item?.id} to={`/skills/${item?.id}`} className="rounded-md border border-white/10 px-3 py-2 text-sm text-cyan-200 hover:bg-white/10">
                {getLocalizedText(item?.title, language)}
              </Link>
            ))}
          </div>
        </SectionCard>
      </div>
      {relatedArchetypes.length ? (
        <SectionCard title={t('nav.archetypes')}>
          <div className="grid gap-3 md:grid-cols-2">
            {relatedArchetypes.slice(0, viewMode === 'simple' ? 4 : relatedArchetypes.length).map((archetype) => (
              <Link key={archetype.id} to={`/archetypes/${archetype.id}`} className="rounded-lg border border-white/10 bg-slate-900/60 p-4 hover:bg-white/10">
                <p className="text-sm font-semibold text-emerald-100">{getLocalizedText(archetype.title, language)}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{getLocalizedText(archetype.shortDescription, language)}</p>
              </Link>
            ))}
          </div>
        </SectionCard>
      ) : null}
      <DetailGroupHeading title={t('detailGroups.nextStep')} />
      <NextBestStepPanel skillId={skill.id} lang={language} />
      <RelatedKnowledgePanel lang={language} groups={knowledgeGroups} />
        </>
      ) : null}
        </main>
        <aside className="hidden space-y-4 xl:sticky xl:top-6 xl:block xl:self-start">
          <SectionCard title={t('modeUx.rail.next')}>
            <div className="grid gap-2">
              {hasTroubleshooter ? (
                <Link to={`/troubleshooters/${skill.id}`} className="rounded-md border border-white/10 px-3 py-2 text-sm text-cyan-200 hover:bg-white/10">
                  {t('nav.troubleshooters')}
                </Link>
              ) : null}
              {escapeMap ? (
                <Link to={`/escape-maps/${skill.id}`} className="rounded-md border border-white/10 px-3 py-2 text-sm text-cyan-200 hover:bg-white/10">
                  {t('nav.escapeMaps')}
                </Link>
              ) : null}
              <Link to={`/micro-details?skill=${skill.id}`} className="rounded-md border border-white/10 px-3 py-2 text-sm text-cyan-200 hover:bg-white/10">
                {t('nav.microDetails')}
              </Link>
              <Link to={`/search?q=${encodeURIComponent(getLocalizedText(skill.title, 'en'))}`} className="rounded-md border border-white/10 px-3 py-2 text-sm text-cyan-200 hover:bg-white/10">
                {t('nav.search')}
              </Link>
            </div>
          </SectionCard>

          {relatedGlossaryTerms.length ? (
            <SectionCard title={t('detail.keyTerms')}>
              <div className="flex flex-wrap gap-2">
                {relatedGlossaryTerms.slice(0, 6).map((term) => (
                  <GlossaryTermChip
                    key={term.id}
                    term={term}
                    lang={language}
                    relatedSkills={term.relatedSkillIds
                      ?.filter((relatedSkillId) => relatedSkillId !== skill.id)
                      .map((relatedSkillId) => getLocalizedText(byId.get(relatedSkillId)?.title, language))
                      .filter((item): item is string => Boolean(item))}
                  />
                ))}
              </div>
            </SectionCard>
          ) : null}

          <SectionCard title={t('modeUx.rail.related')}>
            <div className="flex flex-wrap gap-2">
              {skill.relatedSkills.slice(0, 6).map((id) => byId.get(id)).filter(Boolean).map((item) => (
                <Link key={item?.id} to={`/skills/${item?.id}`} className="rounded-md border border-white/10 px-3 py-2 text-sm text-cyan-200 hover:bg-white/10">
                  {getLocalizedText(item?.title, language)}
                </Link>
              ))}
            </div>
          </SectionCard>
        </aside>
        </div>
      )}
    </div>
  )
}

const LayerHeading = ({ title, body }: { title: string; body: string }) => (
  <div className="rounded-lg border border-cyan-300/15 bg-cyan-300/10 px-4 py-3">
    <p className="text-sm font-semibold text-cyan-100">{title}</p>
    <p className="mt-1 text-sm leading-6 text-slate-300">{body}</p>
  </div>
)

const DetailGroupHeading = ({ title }: { title: string }) => (
  <div className="flex items-center gap-3 pt-2">
    <div className="h-px flex-1 bg-white/10" />
    <p className="rounded-full border border-white/10 bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</p>
    <div className="h-px flex-1 bg-white/10" />
  </div>
)
