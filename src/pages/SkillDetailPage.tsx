import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { NotFound } from '../components/common/NotFound'
import { SkillDetailPageShell } from '../components/skill/SkillDetailPageShell'
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

export default function SkillDetailPage() {
  const { skillId } = useParams()
  const { t } = useTranslation()
  const language = useSettingsStore((state) => state.language)
  const skillQuery = useSkillQuery(skillId)
  const skill = skillQuery.data
  const [oneMinuteOpen, setOneMinuteOpen] = useState(false)

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
    <SkillDetailPageShell
      oneMinute={oneMinuteOpen && oneMinute ? (
        <OneMinuteMode
          view={oneMinute}
          skillTitle={skill.title[language]}
          onClose={() => setOneMinuteOpen(false)}
        />
      ) : undefined}
      header={
        <SkillHeader
          skill={skill}
          lang={language}
          onOneMinute={() => setOneMinuteOpen(true)}
        />
      }
    >
      {systemLogic && <SystemLogicSection view={systemLogic} />}
      {bodyPosition && <BodyPositionSection view={bodyPosition} />}
      {moneyDetails && <MoneyDetailsSection view={moneyDetails} />}
      {outcomesBranches && <OutcomesBranchesSection view={outcomesBranches} />}
      {fixItFast && <FixItFastSection view={fixItFast} />}
      {safety && <SafetySection view={safety} />}
      {nextStep && <NextStepSection view={nextStep} />}
    </SkillDetailPageShell>
  )
}
