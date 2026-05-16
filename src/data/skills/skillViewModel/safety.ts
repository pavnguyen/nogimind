import type { SkillNode, LanguageCode, TechniqueStateMachine } from './_helpers'
import { loc, locArr, cap } from './_helpers'

type OutcomeView = {
  id: string
  result: string
  label: string
  explanation: string
  triggerSignal: string
  toSkillId: string | undefined
  confidence: string | undefined
  probability: number | undefined
}

export type SafetyView = {
  showAsSection: boolean
  isHighRisk: boolean
  riskLevel: string
  safetyNotes: string[]
  dangerSignals: string[]
  safetyAbortOutcome: OutcomeView | null
  nonNegotiables: string[]
}

export function buildSafetyView(
  skill: SkillNode,
  lang: LanguageCode,
  stateMachine: TechniqueStateMachine | undefined,
): SafetyView {
  const isHighRisk =
    skill.riskLevel === 'safety_critical' || skill.riskLevel === 'high'
  const bms = skill.bodyMechanicsSystem

  const safetyAbortRaw = stateMachine?.outcomes.find((o) => o.result === 'safety_abort')
  const safetyAbortOutcome: OutcomeView | null = safetyAbortRaw
    ? {
        id: safetyAbortRaw.id,
        result: safetyAbortRaw.result,
        label: loc(safetyAbortRaw.label, lang),
        explanation: loc(safetyAbortRaw.explanation, lang),
        triggerSignal: loc(safetyAbortRaw.triggerSignal, lang),
        toSkillId: safetyAbortRaw.toSkillId,
        confidence: safetyAbortRaw.confidence,
        probability: safetyAbortRaw.probability,
      }
    : null

  const safetyNotes = cap(locArr(bms.safetyNotes, lang), 5)
  const dangerSignals = cap(locArr(skill.dangerSignals, lang), 5)
  const safetyTerms = ['neck', 'spine', 'shoulder', 'elbow', 'knee', 'heel', 'compression', 'choke', 'smother', 'crank']
  const touchesSafetyTarget = JSON.stringify([skill.title, skill.tags, skill.keyConcepts]).toLowerCase()
  const showAsSection =
    isHighRisk ||
    safetyNotes.length > 0 ||
    Boolean(safetyAbortOutcome) ||
    safetyTerms.some((term) => touchesSafetyTarget.includes(term))

  return {
    showAsSection,
    isHighRisk,
    riskLevel: skill.riskLevel ?? 'low',
    safetyNotes,
    dangerSignals,
    safetyAbortOutcome,
    nonNegotiables: cap(locArr(bms.nonNegotiables, lang), 4),
  }
}
