import type { LocalizedStringArray, LocalizedText } from './skill'

export type RolePerspective = 'top' | 'bottom' | 'attacker' | 'defender' | 'neutral'

export type TechniqueOutcomeResult = 'success' | 'failure' | 'counter' | 'reset' | 'safety_abort' | 'branch'

export type TechniqueOutcome = {
  id: string
  toSkillId?: string
  toPositionId?: string
  toSubmissionId?: string
  toProblemId?: string
  toSafetyNoteId?: string
  result: TechniqueOutcomeResult
  probability?: number
  confidence?: 'low' | 'medium' | 'high'
  label: LocalizedText
  explanation: LocalizedText
  triggerSignal: LocalizedText
}

export type RolePerspectiveData = {
  role: RolePerspective
  goal: LocalizedText
  recognitionCues: LocalizedStringArray
  primaryActions: LocalizedStringArray
  commonErrors: {
    error: LocalizedText
    consequence: LocalizedText
    correction: LocalizedText
  }[]
  knowledgeChecks: {
    question: LocalizedText
    answer: LocalizedText
    safetyCritical?: boolean
  }[]
}

export type TechniqueStateMachine = {
  id: string
  skillId: string
  fromPositionId?: string
  startingRole?: RolePerspective
  outcomes: TechniqueOutcome[]
  attacker?: RolePerspectiveData
  defender?: RolePerspectiveData
  trainingProgressions: {
    phase: LocalizedText
    focus: LocalizedText
    instruction: LocalizedText
    intensity: 'static' | 'progressive' | 'positional' | 'live'
  }[]
  validationNotes?: LocalizedStringArray
}
