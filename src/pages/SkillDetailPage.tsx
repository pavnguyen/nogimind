import { lazy, Suspense, useState, useEffect, useMemo, type ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { NotFound } from '../components/common/NotFound'
import { PageShell } from '../components/common/PageShell'
import { ContentSourceBadge } from '../components/common/ContentSourceBadge'
import { Skeleton, SkeletonCard } from '../components/common/Skeleton'
import { SkillDetailTabs, TabPanel, TabIcons, type TabId } from '../components/skill/SkillDetailTabs'
import { SkillHeader } from '../components/skill/SkillHeader'
import { useSkillQuery } from '../queries/skillQueries'
import { useContentSkillDetailQuery, useSkillVideosQuery } from '../queries/contentQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { PipelineLearnTab } from '../components/content/PipelineLearnTab'
import { PipelineFixTab } from '../components/content/PipelineFixTab'
import { useRecentlyViewedStore } from '../stores/useRecentlyViewedStore'
import { cn } from '../utils/cn'
import type { SkillNode, SkillDomain, SkillLevel, LanguageCode } from '../types/skill'

const PipelineVideoPanel = lazy(() =>
  import('../components/video/PipelineVideoPanel').then((module) => ({
    default: module.PipelineVideoPanel,
  })),
)

/**
 * Build a minimal SkillNode from pipeline SkillDetail for pipeline-only skills
 * that don't exist in the legacy data (e.g., Z-Lock, Texas Cloverleaf).
 */
function buildPipelineSkillNode(
  detail: import('../content-runtime/skills').SkillDetail,
  locale: LanguageCode,
): SkillNode {
  const localized = (val: string): import('../types/skill').LocalizedText =>
    ({ en: '', vi: '', fr: '', [locale]: val }) as import('../types/skill').LocalizedText

  const emptyLocalized = { en: '', vi: '', fr: '' } as import('../types/skill').LocalizedText

  return {
    id: detail.id,
    title: localized(detail.name),
    domain: detail.domain as SkillDomain,
    level: detail.level as SkillLevel,
    tags: detail.tags,
    shortDescription: localized(detail.description || detail.summary || ''),

    // Required SkillNode fields — filled with sensible defaults
    libraryTier: undefined,
    metaStatus: undefined,
    riskLevel: undefined,
    techniqueFamily: undefined,
    modernSystemGroup: undefined,
    rulesetRelevance: undefined,
    whyItMatters: emptyLocalized,
    situation: emptyLocalized,
    primaryGoal: localized(detail.summary ?? detail.description ?? ''),
    keyConcepts: { en: [], vi: [], fr: [] },
    bodyChecklist: {},
    decisionTree: [],
    dangerSignals: { en: [], vi: [], fr: [] },
    commonMistakes: { en: [], vi: [], fr: [] },
    failureResponses: [],
    drills: [],
    skillTests: [],
    prerequisites: [],
    relatedSkills: detail.relatedSkillIds ?? [],
    bodyMechanicsSystem: {
      overview: emptyLocalized,
      phases: [],
      globalPrinciples: { en: [], vi: [], fr: [] },
      nonNegotiables: { en: [], vi: [], fr: [] },
      commonMechanicalErrors: { en: [], vi: [], fr: [] },
      correctionCues: { en: [], vi: [], fr: [] },
      safetyNotes: { en: [], vi: [], fr: [] },
    },
  }
}

export default function SkillDetailPage() {
  const { skillId } = useParams()
  const { t } = useTranslation()
  const language = useSettingsStore((state) => state.language)
  const skillQuery = useSkillQuery(skillId)
  const skill = skillQuery.data
  const recordView = useRecentlyViewedStore((state) => state.recordView)
  const [activeTab, setActiveTab] = useState<TabId>('learn')

  // ── Content pipeline (Phase 2) ─────────────────────────────────────────
  const contentQuery = useContentSkillDetailQuery(skillId, language)
  const contentSource = contentQuery.data?.source ?? 'none'
  const pipelineDetail = contentQuery.data?.detail ?? null
  const isPipelineAvailable = contentSource === 'generated' && pipelineDetail !== null

  // Pipeline videos
  const videosQuery = useSkillVideosQuery(isPipelineAvailable ? skillId : undefined)
  const hasPipelineVideos = isPipelineAvailable &&
    pipelineDetail.featureFlags.hasVideos &&
    (videosQuery.data?.videos?.length ?? 0) > 0

  // Decide which sections to show from pipeline vs legacy — direct typed access
  const pipelineSystemLogic = isPipelineAvailable ? (pipelineDetail.systemLogic ?? undefined) : undefined
  const pipelineKeyCorrections = isPipelineAvailable ? (pipelineDetail.keyCorrections ?? undefined) : undefined
  const pipelineMoneyDetails = isPipelineAvailable ? (pipelineDetail.moneyDetails ?? undefined) : undefined
  const pipelineFixItFast = isPipelineAvailable ? (pipelineDetail.fixItFast ?? undefined) : undefined
  const pipelineSafety = isPipelineAvailable ? (pipelineDetail.safetySummary ?? undefined) : undefined

  const hasPipelineLearnContent = isPipelineAvailable && (
    pipelineSystemLogic !== undefined ||
    (pipelineDetail.whyItWorks?.length ?? 0) > 0 ||
    (pipelineKeyCorrections?.length ?? 0) > 0 ||
    (pipelineMoneyDetails?.length ?? 0) > 0 ||
    (pipelineDetail.coachingCues?.length ?? 0) > 0 ||
    (pipelineDetail.commonMistakes?.length ?? 0) > 0 ||
    (pipelineDetail.shortInstruction) !== undefined
  )

  const hasPipelineFixContent = isPipelineAvailable && (
    (pipelineFixItFast?.length ?? 0) > 0 ||
    (pipelineSafety?.length ?? 0) > 0
  )

  // Record view when skill loads
  useEffect(() => {
    if (skillId) recordView(skillId)
  }, [skillId, recordView])

  // ── Build fallback SkillNode for pipeline-only skills ──────────────────
  const displaySkill = useMemo<SkillNode | undefined>(() => {
    if (skill) return skill
    if (isPipelineAvailable && pipelineDetail) {
      return buildPipelineSkillNode(pipelineDetail, language)
    }
    return undefined
  }, [skill, isPipelineAvailable, pipelineDetail, language])

  const tabs = useMemo(() => {
    const items: { id: TabId; label: string; icon: ReactNode; count?: number; accent: string }[] = []

    // Show Learn tab if either pipeline or legacy has content
    if (hasPipelineLearnContent) {
      items.push({ id: 'learn', label: t('common.learn'), icon: TabIcons.learn, accent: 'cyan' })
    }

    // Show Fix tab if either pipeline or legacy has content
    if (hasPipelineFixContent) {
      items.push({ id: 'fix', label: t('cardOS.fixItFast'), icon: TabIcons.fix, accent: 'violet' })
    }

    // Watch tab — always show
    items.push({ id: 'watch', label: t('video.videoReferences'), icon: TabIcons.watch, accent: 'sky' })
    return items
  }, [hasPipelineLearnContent, hasPipelineFixContent, t])

  // ── Loading state (also keep skeleton while pipeline content loads) ──
  if (skillQuery.isLoading || (contentQuery.isLoading && !skill)) {
    return (
      <PageShell>
        <div className="animate-fadeIn space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0 space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton variant="avatar" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <Skeleton className="h-10 w-72" />
              <Skeleton lines={2} lastLineWidth={55} className="max-w-xl" />
            </div>
            <Skeleton variant="badge" className="mt-2 shrink-0" />
          </div>

          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className={cn('h-9 w-24 rounded-lg', i === 1 && 'w-28')} />
            ))}
          </div>

          <SkeletonCard />
          <SkeletonCard />
        </div>
      </PageShell>
    )
  }

  if (!displaySkill) {
    return (
      <NotFound
        title={t('common.skillNotFoundTitle')}
        body={t('common.skillNotFoundBody')}
        label={t('common.backToSkills')}
        to="/skills"
      />
    )
  }

  return (
    <>

      <PageShell>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <SkillHeader
              skill={displaySkill}
              lang={language}
              onPrintCard={async () => {
                await new Promise((r) => setTimeout(r, 50))
                window.print()
              }}
            />
          </div>
          <ContentSourceBadge
            source={contentSource}
            className="mt-2 shrink-0"
          />
        </div>

        <div className="mt-6">
          <SkillDetailTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        <div className="mt-6 min-h-[300px]">
          <TabPanel id="learn" activeTab={activeTab}>
            {hasPipelineLearnContent && pipelineDetail ? (
              <PipelineLearnTab detail={pipelineDetail} />
            ) : (
              <p className="text-sm text-slate-500">{t('common.none')}</p>
            )}
          </TabPanel>

          <TabPanel id="fix" activeTab={activeTab}>
            {hasPipelineFixContent && pipelineDetail ? (
              <PipelineFixTab detail={pipelineDetail} />
            ) : (
              <p className="text-sm text-slate-500">{t('common.none')}</p>
            )}
          </TabPanel>

          <TabPanel id="watch" activeTab={activeTab}>
            <div className="animate-slideUp">
              {hasPipelineVideos ? (
                <Suspense fallback={<div className="text-sm text-slate-400">{t('common.loading')}</div>}>
                  <PipelineVideoPanel skillId={displaySkill.id} />
                </Suspense>
              ) : (
                <p className="text-sm text-slate-500">{t('common.none')}</p>
              )}
            </div>
          </TabPanel>
        </div>
      </PageShell>
    </>
  )
}
