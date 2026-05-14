import { lazy, Suspense, useState, useMemo, type ReactNode } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { NotFound } from '../components/common/NotFound'
import { PageShell } from '../components/common/PageShell'
import { SkillDetailTabs, TabPanel, TabIcons, type TabId } from '../components/skill/SkillDetailTabs'
import { SkillHeader } from '../components/skill/SkillHeader'
import { OneMinuteMode } from '../components/skill/OneMinuteMode'
import { SystemLogicSection } from '../components/skill/SystemLogicSection'
import { BodyPositionSection } from '../components/skill/BodyPositionSection'
import { MoneyDetailsSection } from '../components/skill/MoneyDetailsSection'
import { OutcomesBranchesSection } from '../components/skill/OutcomesBranchesSection'
import { FixItFastSection } from '../components/skill/FixItFastSection'
import { SafetySection } from '../components/skill/SafetySection'
import { NextStepSection } from '../components/skill/NextStepSection'
import { useSkillQuery } from '../queries/skillQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { techniqueStateMachineBySkillId } from '../data/techniqueStateMachines'
import { getVideosForSkill } from '../data/videos'
import {
  buildSystemLogicView,
  buildBodyPositionView,
  buildMoneyDetailsView,
  buildOutcomesBranchesView,
  buildFixItFastView,
  buildSafetyView,
  buildNextStepView,
  buildOneMinuteView,
} from '../data/skills/skillViewModel'

const VideoReferenceSection = lazy(() =>
  import('../components/video/VideoReferenceSection').then((module) => ({
    default: module.VideoReferenceSection,
  })),
)

export default function SkillDetailPage() {
  const { skillId } = useParams()
  const { t } = useTranslation()
  const language = useSettingsStore((state) => state.language)
  const skillQuery = useSkillQuery(skillId)
  const skill = skillQuery.data
  const [oneMinuteOpen, setOneMinuteOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<TabId>('system')

  const stateMachine = useMemo(
    () => (skillId ? techniqueStateMachineBySkillId.get(skillId) : undefined),
    [skillId],
  )

  const systemLogic = useMemo(
    () => (skill ? buildSystemLogicView(skill, language) : null),
    [skill, language],
  )

  const bodyPosition = useMemo(
    () => (skill ? buildBodyPositionView(skill, language, t) : null),
    [skill, language, t],
  )

  const moneyDetails = useMemo(
    () => (skill ? buildMoneyDetailsView(skill, language) : null),
    [skill, language],
  )

  const outcomesBranches = useMemo(
    () => (skill ? buildOutcomesBranchesView(skill, language, stateMachine) : null),
    [skill, language, stateMachine],
  )

  const fixItFast = useMemo(
    () => (skill ? buildFixItFastView(skill, language) : null),
    [skill, language],
  )

  const safety = useMemo(
    () => (skill ? buildSafetyView(skill, language, stateMachine) : null),
    [skill, language, stateMachine],
  )

  const nextStep = useMemo(
    () => (skill ? buildNextStepView(skill) : null),
    [skill],
  )

  const oneMinute = useMemo(
    () => (skill ? buildOneMinuteView(skill, language, t) : null),
    [skill, language, t],
  )

  const videos = useMemo(
    () => (skill ? getVideosForSkill(skill.id) : []),
    [skill],
  )

  const tabs = useMemo(() => {
    const items: { id: TabId; label: string; icon: ReactNode; count?: number; accent: string }[] = []
    if (systemLogic || outcomesBranches) items.push({ id: 'system', label: t('cardOS.systemLogic'), icon: TabIcons.system, accent: 'cyan' })
    if (bodyPosition) items.push({ id: 'body', label: t('cardOS.bodyPosition'), icon: TabIcons.body, accent: 'emerald' })
    if (moneyDetails) items.push({ id: 'details', label: t('cardOS.moneyDetails'), icon: TabIcons.details, accent: 'amber' })
    if (fixItFast) items.push({ id: 'fix', label: t('cardOS.fixItFast'), icon: TabIcons.fix, accent: 'violet' })
    if (safety) items.push({ id: 'safety', label: t('cardOS.safety'), icon: TabIcons.safety, accent: 'rose' })
    if (videos.length) items.push({ id: 'videos', label: t('video.videoReferences'), icon: TabIcons.videos, count: videos.length, accent: 'sky' })
    if (nextStep) items.push({ id: 'next', label: t('cardOS.nextStep'), icon: TabIcons.next, accent: 'slate' })
    return items
  }, [systemLogic, outcomesBranches, bodyPosition, moneyDetails, fixItFast, safety, videos, nextStep, t])

  if (skillQuery.isLoading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    )
  }

  if (!skill) {
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
      {/* One-Minute overlay */}
      {oneMinuteOpen && oneMinute && (
        <OneMinuteMode
          view={oneMinute}
          skillTitle={skill.title[language]}
          onClose={() => setOneMinuteOpen(false)}
        />
      )}

      <PageShell>
        <SkillHeader
          skill={skill}
          lang={language}
          onOneMinute={() => setOneMinuteOpen(true)}
        />

        <div className="mt-6">
          <SkillDetailTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        <div className="mt-6 min-h-[300px]">
          {/* System tab: system logic + outcomes/branches */}
          <TabPanel id="system" activeTab={activeTab}>
            <div className="animate-slideUp space-y-4">
              {systemLogic && <SystemLogicSection view={systemLogic} />}
              {outcomesBranches && <OutcomesBranchesSection view={outcomesBranches} />}
            </div>
          </TabPanel>

          {/* Body tab: body position */}
          <TabPanel id="body" activeTab={activeTab}>
            <div className="animate-slideUp">
              {bodyPosition && <BodyPositionSection view={bodyPosition} />}
            </div>
          </TabPanel>

          {/* Details tab: money details */}
          <TabPanel id="details" activeTab={activeTab}>
            <div className="animate-slideUp">
              {moneyDetails && <MoneyDetailsSection view={moneyDetails} />}
            </div>
          </TabPanel>

          {/* Fix tab: fix it fast */}
          <TabPanel id="fix" activeTab={activeTab}>
            <div className="animate-slideUp">
              {fixItFast && <FixItFastSection view={fixItFast} />}
            </div>
          </TabPanel>

          {/* Safety tab */}
          <TabPanel id="safety" activeTab={activeTab}>
            <div className="animate-slideUp">
              {safety && <SafetySection view={safety} />}
            </div>
          </TabPanel>

          {/* Videos tab */}
          <TabPanel id="videos" activeTab={activeTab}>
            <div className="animate-slideUp">
              {videos.length ? (
                <Suspense fallback={<div className="text-sm text-slate-400">{t('common.loading')}</div>}>
                  <VideoReferenceSection videos={videos} lang={language} />
                </Suspense>
              ) : (
                <p className="text-sm text-slate-500">{t('common.none')}</p>
              )}
            </div>
          </TabPanel>

          {/* Next tab */}
          <TabPanel id="next" activeTab={activeTab}>
            <div className="animate-slideUp">
              {nextStep && <NextStepSection view={nextStep} />}
            </div>
          </TabPanel>
        </div>
      </PageShell>
    </>
  )
}
