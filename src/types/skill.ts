export type LanguageCode =  'en' | 'vi' | 'fr'

export type SkillDomain =
  | 'positional_awareness'
  | 'survival_defense'
  | 'escapes'
  | 'guard_retention'
  | 'guard_offense'
  | 'wrestle_up_wrestling'
  | 'passing'
  | 'pins_rides'
  | 'back_control'
  | 'submission_systems'

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

export type LibraryTier = 'core' | 'modern_expansion' | 'advanced_niche' | 'safety_critical'

export type MetaStatus = 'fundamental' | 'modern_common' | 'emerging' | 'specialized' | 'experimental'

export type RiskLevel = 'low' | 'medium' | 'high' | 'safety_critical'

export type TechniqueFamily =
  | 'guard'
  | 'passing'
  | 'submission'
  | 'back_take'
  | 'ride'
  | 'wrestling'
  | 'leg_lock'
  | 'front_headlock'
  | 'escape'
  | 'pin'
  | 'scramble'
  | 'safety'
  | 'compression'
  | 'ruleset'

export type ModernSystemGroup =
  | 'octopus'
  | 'clamp_guard'
  | 'shoulder_crunch'
  | 's_mount'
  | 'k_guard'
  | 'matrix'
  | 'false_reap'
  | 'leg_lock'
  | 'crab_ride'
  | 'wrist_ride'
  | 'front_headlock'
  | 'wrestle_up'
  | 'modern_passing'
  | 'turtle_ride'
  | 'smother'
  | 'back_triangle'
  | 'counter_wrestling'
  | 'safety'

export type RulesetRelevance = {
  adcc?: boolean
  ibjjfNoGi?: boolean
  subOnly?: boolean
  ebi?: boolean
  notes?: LocalizedText
}

export type LocalizedText = {
  en: string
  vi: string
  fr: string
}

export type LocalizedStringArray = {
  en: string[]
  vi: string[]
  fr: string[]
}

export type BodyChecklist = {
  head?: LocalizedText
  eyes?: LocalizedText
  rightHand?: LocalizedText
  leftHand?: LocalizedText
  hips?: LocalizedText
  insideLeg?: LocalizedText
  outsideLeg?: LocalizedText
  spine?: LocalizedText
  pressure?: LocalizedText
}

export type BodyPartKey =
  | 'head'
  | 'eyes'
  | 'ears'
  | 'chin'
  | 'neck'
  | 'shoulders'
  | 'chest'
  | 'sternum'
  | 'ribs'
  | 'spine'
  | 'hips'
  | 'pelvis'
  | 'hands'
  | 'wrists'
  | 'elbows'
  | 'forearms'
  | 'biceps'
  | 'knees'
  | 'thighs'
  | 'shins'
  | 'ankles'
  | 'heels'
  | 'toes'
  | 'feet'

export type PlayerRole = 'top' | 'bottom' | 'attacker' | 'defender' | 'neutral'

export type MechanicType =
  | 'alignment'
  | 'pressure'
  | 'frame'
  | 'wedge'
  | 'hook'
  | 'post'
  | 'lever'
  | 'grip'
  | 'inside_position'
  | 'weight_distribution'
  | 'mobility'
  | 'safety'
  | 'finishing_mechanic'
  | 'escape_mechanic'
  | 'transition_mechanic'

export type BodyPartInstruction = {
  bodyPart: BodyPartKey
  role: PlayerRole
  mechanicType: MechanicType
  instruction: LocalizedText
  whyItMatters: LocalizedText
  commonErrors: LocalizedStringArray
  correctionCues: LocalizedStringArray
}

export type ConnectionPoint = {
  id: string
  role: PlayerRole
  name: LocalizedText
  yourBodyPart: BodyPartKey
  opponentBodyPart?: BodyPartKey
  purpose: LocalizedText
  pressureDirection?: LocalizedText
  commonErrors: LocalizedStringArray
}

export type DirectionalCue = {
  id: string
  cue: LocalizedText
  direction:
    | 'forward'
    | 'backward'
    | 'left'
    | 'right'
    | 'down'
    | 'up'
    | 'diagonal'
    | 'rotate_left'
    | 'rotate_right'
    | 'toward_head'
    | 'toward_hips'
    | 'toward_far_shoulder'
    | 'toward_near_shoulder'
    | 'toward_near_hip'
    | 'toward_far_hip'
  bodyParts: BodyPartKey[]
  purpose: LocalizedText
}

export type MechanicsPhase = {
  id: string
  name: LocalizedText
  objective: LocalizedText
  bodyPartInstructions: BodyPartInstruction[]
  connectionPoints: ConnectionPoint[]
  directionalCues: DirectionalCue[]
  checkpoints: LocalizedStringArray
  dangerSignals: LocalizedStringArray
  successSignals: LocalizedStringArray
}

export type BodyMechanicsSystem = {
  overview: LocalizedText
  topPlayerGoal?: LocalizedText
  bottomPlayerGoal?: LocalizedText
  attackerGoal?: LocalizedText
  defenderGoal?: LocalizedText
  phases: MechanicsPhase[]
  globalPrinciples: LocalizedStringArray
  nonNegotiables: LocalizedStringArray
  commonMechanicalErrors: LocalizedStringArray
  correctionCues: LocalizedStringArray
  safetyNotes: LocalizedStringArray
}

export type PositionalRelationship = {
  id: string
  name: LocalizedText
  description: LocalizedText
  dominantPlayer: PlayerRole
  keyControlPoints: ConnectionPoint[]
  escapePriorities: LocalizedStringArray
  attackPriorities: LocalizedStringArray
}

export type ReactionBranch = {
  opponentReaction: LocalizedText
  bodySignal: LocalizedText
  recommendedResponse: LocalizedText
  nextSkillIds: string[]
  bodyMechanicAdjustment: LocalizedText
}

export type IfThenPriority =
  | 'survive'
  | 'prevent'
  | 'recover'
  | 'control'
  | 'advance'
  | 'submit'
  | 'reset'
  | 'disengage'

export type IfThenDecision = {
  id: string
  priority: IfThenPriority
  ifCondition: LocalizedText
  bodySignal: LocalizedText
  thenAction: LocalizedText
  why: LocalizedText
  commonMistake: LocalizedText
  correctionCue: LocalizedText
  nextSkillIds: string[]
}

export type TechnicalDetailCategory =
  | 'setup'
  | 'entry'
  | 'grip'
  | 'angle'
  | 'pressure'
  | 'isolation'
  | 'finishing'
  | 'escape'
  | 'counter'
  | 'transition'
  | 'safety'

export type BodySide = 'left' | 'right' | 'near' | 'far' | 'inside' | 'outside' | 'top' | 'bottom' | 'center' | 'both' | 'either' | 'diagonal' | 'free' | 'post'

export type ForceDirection =
  | 'pull_left'
  | 'pull_right'
  | 'push_left'
  | 'push_right'
  | 'pull_toward_you'
  | 'push_away'
  | 'compress_down'
  | 'lift_up'
  | 'rotate_clockwise'
  | 'rotate_counterclockwise'
  | 'drive_diagonal'
  | 'drive_forward'
  | 'drive_backward'
  | 'flare_out'
  | 'pin_inward'
  | 'open_outward'
  | 'close_inward'
  | 'circle_inside'
  | 'circle_outside'
  | 'hide'
  | 'expose'
  | 'shelf'
  | 'wedge'

export type PersonRole = 'me' | 'opponent'

export type BodyPart =
  | 'head'
  | 'eyes'
  | 'ear'
  | 'chin'
  | 'neck'
  | 'shoulder'
  | 'chest'
  | 'sternum'
  | 'ribs'
  | 'spine'
  | 'hip'
  | 'pelvis'
  | 'hand'
  | 'wrist'
  | 'forearm'
  | 'elbow'
  | 'biceps'
  | 'triceps'
  | 'knee'
  | 'thigh'
  | 'shin'
  | 'ankle'
  | 'heel'
  | 'toes'
  | 'foot'
  | 'hook'
  | 'floor'
  | 'back'
  | 'arm'
  | 'leg'
  | 'body'
  | 'calf'

export type ContactType =
  | 'grip'
  | 'frame'
  | 'post'
  | 'hook'
  | 'clamp'
  | 'wedge'
  | 'pin'
  | 'pull'
  | 'push'
  | 'drag'
  | 'lift'
  | 'block'
  | 'shelf'
  | 'wrap'
  | 'underhook'
  | 'overhook'
  | 'crossface'
  | 'chest_connection'
  | 'head_position'
  | 'hip_connection'
  | 'knee_wedge'
  | 'foot_post'
  | 'hand_fight'
  | 'finish_pressure'
  | 'safety_release'

export type BodyTarget = {
  role: PersonRole
  side: BodySide
  bodyPart: BodyPart
  detail?: LocalizedText
}

export type BodyToBodyContact = {
  id: string
  title: LocalizedText
  myBodyPart: BodyTarget
  opponentBodyPart: BodyTarget
  contactType: ContactType
  forceDirection?: ForceDirection
  pressureLevel?: 'light' | 'medium' | 'heavy' | 'progressive'
  timing: LocalizedText
  exactInstruction: LocalizedText
  whyItWorks: LocalizedText
  commonMisplacement: LocalizedText
  correctionCue: LocalizedText
  liveCue: LocalizedText
  prevents?: LocalizedText
  creates?: LocalizedText
  safetyNote?: LocalizedText
}

export type BodyToBodyPhase = {
  id: string
  title: LocalizedText
  goal: LocalizedText
  contacts: BodyToBodyContact[]
  successSignal: LocalizedText
  failureSignal: LocalizedText
}

export type BodyToBodyDetailSystem = {
  overview: LocalizedText
  defaultOrientation: LocalizedText
  phases: BodyToBodyPhase[]
  leftRightMirrorNote: LocalizedText
  mostImportantContacts: string[]
}

export type ClampMechanic = {
  id: string
  title: LocalizedText
  situation: LocalizedText
  clampWith: string[]
  clampAgainst: string[]
  exactAction: LocalizedText
  pressureDirection: LocalizedText
  whyItWorks: LocalizedText
  commonLeak: LocalizedText
  correctionCue: LocalizedText
  liveCue: LocalizedText
}

export type FinishTip = {
  id: string
  title: LocalizedText
  situation: LocalizedText
  setupRequirement: LocalizedText
  exactFinishingAction: LocalizedText
  bodyPartRoles: {
    bodyPart: string
    role: LocalizedText
  }[]
  finishTrigger: LocalizedText
  falseFinishSignal: LocalizedText
  opponentEscape: LocalizedText
  prevention: LocalizedText
  safetyNote?: LocalizedText
}

export type PressureDetail = {
  id: string
  title: LocalizedText
  sourceBodyPart: string
  targetLine: LocalizedText
  direction: LocalizedText
  commonWrongDirection: LocalizedText
  correctionCue: LocalizedText
}

export type AngleDetail = {
  id: string
  title: LocalizedText
  angleGoal: LocalizedText
  howToCreateAngle: LocalizedText
  whatAnglePrevents: LocalizedText
  commonMistake: LocalizedText
  correctionCue: LocalizedText
}

export type BlackbeltDetailSystem = {
  overview: LocalizedText
  clampMechanics: ClampMechanic[]
  finishTips: FinishTip[]
  pressureDetails: PressureDetail[]
  angleDetails: AngleDetail[]
  opponentEscapePrevention: {
    escape: LocalizedText
    earlySignal: LocalizedText
    prevention: LocalizedText
    nextBestBranch: LocalizedText
  }[]
  oneSentenceGold: LocalizedText
}

export type TechnicalDetail = {
  id: string
  category: TechnicalDetailCategory
  title: LocalizedText
  situation: LocalizedText
  instruction: LocalizedText
  bodyParts: string[]
  side: BodySide
  direction?: ForceDirection
  whyItWorks: LocalizedText
  commonFailure: LocalizedText
  correctionCue: LocalizedText
  liveRollingCue: LocalizedText
  safetyNote?: LocalizedText
}

export type FinishingMechanic = {
  id: string
  title: LocalizedText
  target: LocalizedText
  requiredIsolation: LocalizedStringArray
  breakingMechanic: LocalizedText
  forceDirection: ForceDirection[]
  bodyPartRoles: {
    bodyPart: string
    role: LocalizedText
  }[]
  finishChecklist: LocalizedStringArray
  falseFinishSignals: LocalizedStringArray
  commonEscapes: {
    escape: LocalizedText
    prevention: LocalizedText
  }[]
  safetyNotes: LocalizedStringArray
}

export type MicroAdjustment = {
  id: string
  problem: LocalizedText
  adjustment: LocalizedText
  why: LocalizedText
  relatedBodyParts: string[]
  direction?: ForceDirection
}

export type TechnicalDetailsSystem = {
  overview: LocalizedText
  keyDetails: TechnicalDetail[]
  finishingMechanics?: FinishingMechanic[]
  microAdjustments: MicroAdjustment[]
  commonFailurePatterns: LocalizedStringArray
  liveCues: LocalizedStringArray
  coachNotes: LocalizedStringArray
}

export type MicroDetailCategory =
  | 'hand'
  | 'elbow'
  | 'head'
  | 'shoulder'
  | 'chest'
  | 'hip'
  | 'knee'
  | 'foot'
  | 'angle'
  | 'pressure'
  | 'timing'
  | 'grip'
  | 'hook'
  | 'finish'
  | 'escape'
  | 'safety'
  | 'body'
  | 'leg'
  | 'calf'

export type Side = 'left' | 'right' | 'near' | 'far' | 'inside' | 'outside' | 'both' | 'either' | 'center'

export type Direction =
  | 'pull_left'
  | 'pull_right'
  | 'push_left'
  | 'push_right'
  | 'pull_toward_you'
  | 'push_away'
  | 'drive_down'
  | 'drive_up'
  | 'drive_diagonal'
  | 'rotate_left'
  | 'rotate_right'
  | 'flare_out'
  | 'pin_in'
  | 'open_out'
  | 'close_in'
  | 'circle_inside'
  | 'circle_outside'
  | 'hide'
  | 'expose'
  | 'lift'
  | 'drop'
  | 'wedge'
  | 'wrap'
  | 'hook'
  | 'post'
  | 'grip'
  | 'clamp'
  | 'block'
  | 'drag'
  | 'shelf'
  | 'scoot'
  | 'track'
  | 'posture'
  | 'lift_up'
  | 'compress_down'
  | 'pin_inward'
  | 'pin_down'
  | 'drive_forward'
  | 'rotate_full'
  | 'rotate_diagonal'
  | 'push_out'
  | 'arch'
  | 'invert'
  | 'slip'
  | 'roll_side'
  | 'chest_connection'

export type MicroDetail = {
  id: string
  category: MicroDetailCategory
  title: LocalizedText
  shortInstruction: LocalizedText
  side?: Side
  direction?: Direction
  bodyParts: string[]
  whenToUse: LocalizedText
  whyItWorks: LocalizedText
  commonMistake: LocalizedText
  correctionCue: LocalizedText
  liveCue: LocalizedText
  safetyNote?: LocalizedText
}

export type FastFinishPath = {
  id: string
  title: LocalizedText
  steps: {
    id: string
    order: number
    instruction: LocalizedText
    keyBodyPart: string
    commonMistake: LocalizedText
  }[]
  finishTrigger: LocalizedText
  abortSignal: LocalizedText
  nextBestOption: LocalizedText
  safetyNote?: LocalizedText
}

export type LeftRightGuide = {
  id: string
  scenario: LocalizedText
  leftHand: LocalizedText
  rightHand: LocalizedText
  leftLeg?: LocalizedText
  rightLeg?: LocalizedText
  head?: LocalizedText
  hips?: LocalizedText
  note: LocalizedText
}

export type QualityChecklistType =
  | 'submission'
  | 'pass'
  | 'control'
  | 'escape'
  | 'guard'
  | 'wrestling'
  | 'safety'

export type QualityCheckAnswer = 'yes' | 'not_sure' | 'no'

export type QualityCheckSeverity = 'minor' | 'major' | 'critical'

export type QualityCheckItem = {
  id: string
  title: LocalizedText
  question: LocalizedText
  successSignal: LocalizedText
  failureSignal: LocalizedText
  quickFix: LocalizedText
  bodyParts: BodyPartKey[]
  relatedMicroDetailIds?: string[]
  severity: QualityCheckSeverity
}

export type TechniqueQualityChecklist = {
  type: QualityChecklistType
  overview: LocalizedText
  checks: QualityCheckItem[]
  passThreshold: number
  ifPassed: LocalizedText
  ifFailed: LocalizedText
}

export type MicroDetailSystem = {
  overview: LocalizedText
  topFiveDetails: MicroDetail[]
  leftRightGuides: LeftRightGuide[]
  fastFinishPaths: FastFinishPath[]
  troubleshootingTips: {
    problem: LocalizedText
    quickFix: LocalizedText
    cue: LocalizedText
  }[]
  doNotDo: LocalizedStringArray
  safetyNotes: LocalizedStringArray
}

export type QuickCard = {
  goal: LocalizedText
  threeCues: LocalizedStringArray
  doNotDo: LocalizedText
  ifItFails: LocalizedText
  safetyReminder?: LocalizedText
}

export type DecisionBranch = {
  trigger: LocalizedText
  response: LocalizedText
  nextSkillIds?: string[]
}

export type FailureResponse = {
  failure: LocalizedText
  response: LocalizedText
  nextSkillIds: string[]
}

export type Drill = {
  name: LocalizedText
  description: LocalizedText
  intensity: 'static' | 'progressive' | 'positional' | 'live'
  durationOrReps: LocalizedText
}

export type SkillTest = {
  prompt: LocalizedText
  successCriteria: LocalizedText
}

export type SkillNode = {
  id: string
  title: LocalizedText
  domain: SkillDomain
  level: SkillLevel
  libraryTier?: LibraryTier
  metaStatus?: MetaStatus
  riskLevel?: RiskLevel
  techniqueFamily?: TechniqueFamily
  modernSystemGroup?: ModernSystemGroup
  rulesetRelevance?: RulesetRelevance
  tags: string[]
  shortDescription: LocalizedText
  whyItMatters: LocalizedText
  situation: LocalizedText
  primaryGoal: LocalizedText
  keyConcepts: LocalizedStringArray
  bodyChecklist: BodyChecklist
  decisionTree: DecisionBranch[]
  dangerSignals: LocalizedStringArray
  commonMistakes: LocalizedStringArray
  failureResponses: FailureResponse[]
  drills: Drill[]
  skillTests: SkillTest[]
  prerequisites: string[]
  relatedSkills: string[]
  bodyMechanicsSystem: BodyMechanicsSystem
  microDetailSystem?: MicroDetailSystem
  qualityChecklist?: TechniqueQualityChecklist
  quickCard?: QuickCard
  positionalRelationships?: PositionalRelationship[]
  reactionBranches?: ReactionBranch[]
  ifThenDecisions?: IfThenDecision[]
  technicalDetails?: TechnicalDetailsSystem
  bodyToBodyDetails?: BodyToBodyDetailSystem
  blackbeltDetails?: BlackbeltDetailSystem
  sharedPrincipleIds?: string[]
  sharedCueIds?: string[]
  sharedErrorIds?: string[]
  sharedSafetyIds?: string[]
  sharedMechanicIds?: string[]
}
