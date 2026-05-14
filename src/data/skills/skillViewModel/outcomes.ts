import type { SkillNode, LanguageCode, TechniqueStateMachine, TechniqueOutcome } from './_helpers'
import { loc } from './_helpers'

export type OutcomeView = {
  id: string
  result: string
  label: string
  explanation: string
  triggerSignal: string
  toSkillId: string | undefined
  confidence: string | undefined
  probability: number | undefined
}

export type ReactionBranchView = {
  opponentReaction: string
  bodySignal: string
  response: string
  nextSkillIds: string[]
  adjustment: string
}

export type IfThenView = {
  id: string
  priority: string
  ifCondition: string
  bodySignal: string
  thenAction: string
  why: string
  commonMistake: string
  correctionCue: string
  nextSkillIds: string[]
}

export type OutcomesBranchesView = {
  available: boolean
  attackerGoal: string | null
  defenderGoal: string | null
  outcomes: OutcomeView[]
  reactionBranches: ReactionBranchView[]
  ifThenDecisions: IfThenView[]
  failureResponses: { failure: string; response: string; nextSkillIds: string[] }[]
}

export function buildOutcomesBranchesView(
  skill: SkillNode,
  lang: LanguageCode,
  stateMachine: TechniqueStateMachine | undefined,
): OutcomesBranchesView {
  const outcomes: OutcomeView[] = stateMachine
    ? stateMachine.outcomes.map((o: TechniqueOutcome) => ({
        id: o.id,
        result: o.result,
        label: loc(o.label, lang),
        explanation: loc(o.explanation, lang),
        triggerSignal: loc(o.triggerSignal, lang),
        toSkillId: o.toSkillId,
        confidence: o.confidence,
        probability: o.probability,
      }))
    : []

  const reactions: ReactionBranchView[] = (skill.reactionBranches ?? []).map((b) => ({
    opponentReaction: loc(b.opponentReaction, lang),
    bodySignal: loc(b.bodySignal, lang),
    response: loc(b.recommendedResponse, lang),
    nextSkillIds: b.nextSkillIds,
    adjustment: loc(b.bodyMechanicAdjustment, lang),
  }))

  const ifThens: IfThenView[] = (skill.ifThenDecisions ?? []).map((d) => ({
    id: d.id,
    priority: d.priority,
    ifCondition: loc(d.ifCondition, lang),
    bodySignal: loc(d.bodySignal, lang),
    thenAction: loc(d.thenAction, lang),
    why: loc(d.why, lang),
    commonMistake: loc(d.commonMistake, lang),
    correctionCue: loc(d.correctionCue, lang),
    nextSkillIds: d.nextSkillIds,
  }))

  const failures = (skill.failureResponses ?? []).map((f) => ({
    failure: loc(f.failure, lang),
    response: loc(f.response, lang),
    nextSkillIds: f.nextSkillIds,
  }))

  return {
    available: outcomes.length > 0 || reactions.length > 0 || ifThens.length > 0,
    attackerGoal: stateMachine?.attacker ? loc(stateMachine.attacker.goal, lang) : null,
    defenderGoal: stateMachine?.defender ? loc(stateMachine.defender.goal, lang) : null,
    outcomes,
    reactionBranches: reactions,
    ifThenDecisions: ifThens,
    failureResponses: failures,
  }
}
