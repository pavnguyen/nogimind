import { z } from 'zod'

// ── Locale ────────────────────────────────────────────────
export const LocaleSchema = z.enum(['en', 'vi', 'fr'])
export type Locale = z.infer<typeof LocaleSchema>

// ── Skill Domain & Level ──────────────────────────────────
export const SkillDomainSchema = z.enum([
  'positional_awareness',
  'survival_defense',
  'escapes',
  'guard_retention',
  'guard_offense',
  'wrestle_up_wrestling',
  'passing',
  'pins_rides',
  'back_control',
  'submission_systems',
])
export type SkillDomain = z.infer<typeof SkillDomainSchema>

export const SkillLevelSchema = z.enum(['beginner', 'intermediate', 'advanced'])
export type SkillLevel = z.infer<typeof SkillLevelSchema>

export const SkillStatusSchema = z.enum(['draft', 'published', 'archived'])
export type SkillStatus = z.infer<typeof SkillStatusSchema>

// ── Concept ────────────────────────────────────────────────

export const ConceptCategorySchema = z.enum([
  'positional', 'mechanical', 'strategic', 'defensive', 'offensive', 'training', 'safety',
])
export type ConceptCategory = z.infer<typeof ConceptCategorySchema>

export const ConceptLevelSchema = z.enum(['fundamental', 'intermediate', 'advanced'])
export type ConceptLevel = z.infer<typeof ConceptLevelSchema>

export const IfThenExampleSchema = z.object({
  if: z.string(),
  then: z.string(),
  why: z.string(),
  relatedSkillIds: z.array(z.string()).default([]),
})
export type IfThenExample = z.infer<typeof IfThenExampleSchema>

export const CommonMisunderstandingSchema = z.object({
  misunderstanding: z.string(),
  correction: z.string(),
})
export type CommonMisunderstanding = z.infer<typeof CommonMisunderstandingSchema>

export const ConceptMetaSchema = z.object({
  id: z.string().min(1),
  category: ConceptCategorySchema,
  level: ConceptLevelSchema,
  tags: z.array(z.string()).default([]),
  relatedSkillIds: z.array(z.string()).default([]),
  relatedConceptIds: z.array(z.string()).default([]),
  version: z.number().default(1),
})
export type ConceptMeta = z.infer<typeof ConceptMetaSchema>

export const ConceptContentSchema = z.object({
  id: z.string().min(1),
  locale: z.string().min(1),
  title: z.string().min(1),
  shortDefinition: z.string().min(1),
  whyItMatters: z.string().min(1),
  deepExplanation: z.string().min(1),
  beginnerView: z.string().min(1),
  advancedView: z.string().min(1),
  ifThenExamples: z.array(IfThenExampleSchema).default([]),
  commonMisunderstandings: z.array(CommonMisunderstandingSchema).default([]),
  trainingCues: z.array(z.string()).default([]),
})
export type ConceptContent = z.infer<typeof ConceptContentSchema>

export const ConceptManifestItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: ConceptCategorySchema,
  level: ConceptLevelSchema,
  tags: z.array(z.string()),
  shortDefinition: z.string(),
})
export type ConceptManifestItem = z.infer<typeof ConceptManifestItemSchema>

export const ConceptDetailArtifactSchema = z.object({
  id: z.string(),
  locale: z.string(),
  title: z.string(),
  category: ConceptCategorySchema,
  level: ConceptLevelSchema,
  tags: z.array(z.string()).default([]),
  shortDefinition: z.string(),
  whyItMatters: z.string(),
  deepExplanation: z.string(),
  beginnerView: z.string(),
  advancedView: z.string(),
  ifThenExamples: z.array(IfThenExampleSchema).default([]),
  commonMisunderstandings: z.array(CommonMisunderstandingSchema).default([]),
  trainingCues: z.array(z.string()).default([]),
  relatedSkillIds: z.array(z.string()).default([]),
  relatedConceptIds: z.array(z.string()).default([]),
}).passthrough()
export type ConceptDetailArtifact = z.infer<typeof ConceptDetailArtifactSchema>

// ── Position ───────────────────────────────────────────────

export const PositionCategorySchema = z.enum([
  'standing', 'top_control', 'bottom_guard', 'pin', 'back', 'turtle',
  'front_headlock', 'leg_entanglement', 'scramble', 'submission_threat',
])
export type PositionCategory = z.infer<typeof PositionCategorySchema>

export const PositionalStatusSchema = z.enum([
  'dominant', 'advantage', 'neutral', 'defensive', 'dangerous', 'critical',
])
export type PositionalStatus = z.infer<typeof PositionalStatusSchema>

export const AdvancementOptionSchema = z.object({
  action: z.string(),
  nextPositionId: z.string().optional(),
  relatedSkillIds: z.array(z.string()).default([]),
  why: z.string(),
})
export type AdvancementOption = z.infer<typeof AdvancementOptionSchema>

export const PositionMetaSchema = z.object({
  id: z.string().min(1),
  category: PositionCategorySchema,
  status: PositionalStatusSchema,
  nextPositionId: z.string().optional(),
  relatedSkillIds: z.array(z.string()).default([]),
  relatedConceptIds: z.array(z.string()).default([]),
  version: z.number().default(1),
})
export type PositionMeta = z.infer<typeof PositionMetaSchema>

export const PositionContentSchema = z.object({
  id: z.string().min(1),
  locale: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  topPlayerGoals: z.array(z.string()).default([]),
  bottomPlayerGoals: z.array(z.string()).default([]),
  controlPoints: z.array(z.string()).default([]),
  escapePriorities: z.array(z.string()).default([]),
  advancementOptions: z.array(AdvancementOptionSchema).default([]),
  dangerSignals: z.array(z.string()).default([]),
})
export type PositionContent = z.infer<typeof PositionContentSchema>

export const PositionManifestItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: PositionCategorySchema,
  status: PositionalStatusSchema,
  description: z.string(),
})
export type PositionManifestItem = z.infer<typeof PositionManifestItemSchema>

export const PositionDetailArtifactSchema = z.object({
  id: z.string(),
  locale: z.string(),
  title: z.string(),
  category: PositionCategorySchema,
  status: PositionalStatusSchema,
  description: z.string(),
  topPlayerGoals: z.array(z.string()).default([]),
  bottomPlayerGoals: z.array(z.string()).default([]),
  controlPoints: z.array(z.string()).default([]),
  escapePriorities: z.array(z.string()).default([]),
  advancementOptions: z.array(AdvancementOptionSchema).default([]),
  dangerSignals: z.array(z.string()).default([]),
  nextPositionId: z.string().optional(),
  relatedSkillIds: z.array(z.string()).default([]),
  relatedConceptIds: z.array(z.string()).default([]),
}).passthrough()
export type PositionDetailArtifact = z.infer<typeof PositionDetailArtifactSchema>

// ── Skill Relation ────────────────────────────────────────
export const SkillRelationSchema = z.object({
  id: z.string(),
  type: z.enum(['prerequisite', 'supporting', 'chain', 'alternative', 'recommended']),
})
export type SkillRelation = z.infer<typeof SkillRelationSchema>

// ── Body Positions ────────────────────────────────────────
export const BodyContactPhaseSchema = z.object({
  order: z.number(),
  name: z.string(),
  description: z.string(),
})
export type BodyContactPhase = z.infer<typeof BodyContactPhaseSchema>

export const ContactPointSchema = z.object({
  bodyPart: z.string(),
  target: z.string(),
  role: z.string(),
})
export type ContactPoint = z.infer<typeof ContactPointSchema>

export const BodyToBodyDetailsSchema = z.object({
  phases: z.array(BodyContactPhaseSchema),
  contactPoints: z.array(ContactPointSchema).optional(),
})
export type BodyToBodyDetails = z.infer<typeof BodyToBodyDetailsSchema>

export const DecisionBranchSchema = z.object({
  condition: z.string(),
  action: z.string(),
})
export type DecisionBranch = z.infer<typeof DecisionBranchSchema>

export const SystemLogicSchema = z.object({
  corePrinciple: z.string(),
  decisionTree: z.array(DecisionBranchSchema).default([]),
  exitStrategies: z.array(z.string()).default([]),
})
export type SystemLogic = z.infer<typeof SystemLogicSchema>

export const KeyCorrectionSchema = z.object({
  issue: z.string(),
  fix: z.string(),
})
export type KeyCorrection = z.infer<typeof KeyCorrectionSchema>

export const MoneyDetailsSchema = z.object({
  oneLiner: z.string(),
  mnemonic: z.string().optional(),
})
export type MoneyDetails = z.infer<typeof MoneyDetailsSchema>

// ── Skill Meta ────────────────────────────────────────────
export const SkillMetaSchema = z.object({
  // Identity
  id: z.string().min(1),
  slug: z.string().min(1).optional(),
  domain: SkillDomainSchema,
  level: SkillLevelSchema,
  status: SkillStatusSchema.default('draft'),
  name: z.string().optional(),        // canonical name (optional; locale-specific name is in content files)

  // Classification
  aliases: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
  techniqueFamily: z.string().optional(),
  modernSystemGroup: z.string().optional(),

  // Relations
  relatedSkills: z.array(SkillRelationSchema).default([]),
  relatedSkillIds: z.array(z.string()).default([]),      // legacy support
  relatedPositions: z.array(z.string()).default([]),
  relatedPositionIds: z.array(z.string()).default([]),   // legacy support
  relatedConcepts: z.array(z.string()).default([]),
  relatedConceptIds: z.array(z.string()).default([]),    // legacy support
  archetypeIds: z.array(z.string()).default([]),
  relatedArchetypeIds: z.array(z.string()).default([]),  // legacy support
  prerequisiteSkillIds: z.array(z.string()).default([]),
  trainingMethodIds: z.array(z.string()).default([]),
  nextSkillIds: z.array(z.string()).default([]),

  // Ordering & discovery
  sortOrder: z.number().optional(),
  searchBoost: z.number().default(1.0),

  // Content detail (rich meta)
  bodyToBodyDetails: BodyToBodyDetailsSchema.optional(),
  systemLogic: SystemLogicSchema.optional(),
  keyCorrections: z.array(KeyCorrectionSchema).default([]),
  moneyDetails: MoneyDetailsSchema.optional(),
  safetyNotes: z.string().optional(),
  fixItFast: z.string().optional(),

  // Content management
  version: z.number().default(1),
  updatedAt: z.string().optional(),
  publishedAt: z.string().optional(),
  contentRefs: z
    .object({
      microDetails: z.string().optional(),
      videos: z.string().default('videos.json'),
      qualityChecklist: z.string().optional(),
    })
    .default({ videos: 'videos.json' }),
  featureFlags: z
    .object({
      hasMicroDetails: z.boolean().default(false),
      hasChecklist: z.boolean().default(false),
      hasVideos: z.boolean().default(false),
      hasStateMachine: z.boolean().default(false),
    })
    .default({ hasMicroDetails: false, hasChecklist: false, hasVideos: false, hasStateMachine: false }),
})
export type SkillMeta = z.infer<typeof SkillMetaSchema>

// ── Skill Content ─────────────────────────────────────────
export const OneMinuteModeSchema = z.object({
  goal: z.string(),
  steps: z.array(z.string()),
})
export type OneMinuteMode = z.infer<typeof OneMinuteModeSchema>

const MicroDetailSchema = z.object({
  id: z.string().min(1),
  category: z.enum(['hand', 'elbow', 'head', 'shoulder', 'chest', 'hip', 'knee', 'foot', 'angle', 'pressure', 'timing', 'grip', 'hook', 'finish', 'escape', 'safety', 'body', 'leg', 'calf']),
  title: z.string().min(1),
  shortInstruction: z.string().min(1),
  side: z.enum(['left', 'right', 'near', 'far', 'inside', 'outside', 'both', 'either', 'center']).optional(),
  direction: z.enum(['pull_left', 'pull_right', 'push_left', 'push_right', 'pull_toward_you', 'push_away', 'drive_down', 'drive_up', 'drive_diagonal', 'rotate_left', 'rotate_right', 'flare_out', 'pin_in', 'open_out', 'close_in', 'circle_inside', 'circle_outside', 'hide', 'expose', 'lift', 'drop', 'wedge', 'wrap', 'hook', 'post', 'grip', 'clamp', 'block', 'drag', 'shelf', 'scoot', 'track', 'posture', 'lift_up', 'compress_down', 'pin_inward', 'pin_down', 'drive_forward', 'rotate_full', 'rotate_diagonal', 'push_out', 'arch', 'invert', 'slip', 'roll_side', 'chest_connection']).optional(),
  bodyParts: z.array(z.string()),
  whenToUse: z.string().min(1),
  whyItWorks: z.string().min(1),
  commonMistake: z.string().min(1),
  correctionCue: z.string().min(1),
  liveCue: z.string().min(1),
  safetyNote: z.string().optional(),
})

export const MicroDetailSystemSchema = z.object({
  overview: z.string().min(1),
  topFiveDetails: z.array(MicroDetailSchema).min(3).max(5),
  troubleshootingTips: z.array(z.object({ problem: z.string(), quickFix: z.string(), cue: z.string() })).default([]),
  doNotDo: z.array(z.string()).default([]),
  safetyNotes: z.array(z.string()).default([]),
})

export const QualityChecklistSchema = z.object({
  type: z.enum(['submission', 'pass', 'control', 'escape', 'Guard', 'wrestling', 'safety']),
  overview: z.string().min(1),
  checks: z.array(z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    question: z.string().min(1),
    successSignal: z.string().min(1),
    failureSignal: z.string().min(1),
    quickFix: z.string().min(1),
    bodyParts: z.array(z.enum(['head', 'eyes', 'ears', 'chin', 'neck', 'shoulders', 'chest', 'sternum', 'ribs', 'spine', 'hips', 'pelvis', 'hands', 'wrists', 'elbows', 'forearms', 'biceps', 'knees', 'thighs', 'shins', 'ankles', 'heels', 'toes', 'feet'])),
    relatedMicroDetailIds: z.array(z.string()).optional(),
    severity: z.enum(['minor', 'major', 'critical']),
  })).min(3).max(5),
  passThreshold: z.number().int().min(1),
  ifPassed: z.string().min(1),
  ifFailed: z.string().min(1),
})
export type MicroDetailSystemContent = z.infer<typeof MicroDetailSystemSchema>
export type QualityChecklistContent = z.infer<typeof QualityChecklistSchema>

export const SkillContentSchema = z.object({
  id: z.string().min(1),
  locale: LocaleSchema,
  name: z.string().min(1),
  shortName: z.string().optional(),
  description: z.string().min(1),
  shortInstruction: z.string().optional(),
  summary: z.string().optional(),
  whyItWorks: z.array(z.string()).default([]),
  commonMistakes: z.array(z.string()).default([]),
  coachingCues: z.array(z.string()).default([]),
  oneMinuteMode: OneMinuteModeSchema.optional(),
  safetySummary: z.array(z.string()).default([]),
  keyCorrections: z.array(z.string()).default([]),  systemLogic: z.union([SystemLogicSchema, z.array(z.string())]).optional(),
  moneyDetails: z.array(z.string()).default([]),
  nextStep: z.string().optional(),
  fixItFast: z.array(z.string()).default([]),
  microDetailSystem: MicroDetailSystemSchema.optional(),
  qualityChecklist: QualityChecklistSchema.optional(),
})

export type SkillContent = z.infer<typeof SkillContentSchema>

// ── Video reference (in videos.json) ──────────────────────
export const SkillVideoRefSchema = z.object({
  youtubeId: z.string(),
  title: z.string(),
  channel: z.string(),
  whyUseful: z.string(),
  timestampStart: z.number().optional(),
  relevance: z.enum(['primary', 'supplemental', 'advanced', 'alternate', 'related']),
  level: z.string(),
})
export type SkillVideoRef = z.infer<typeof SkillVideoRefSchema>

// ── Skill Manifest Item ───────────────────────────────────
export const SkillManifestItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  domain: SkillDomainSchema,
  level: SkillLevelSchema,
  tags: z.array(z.string()),
  summary: z.string().optional(),
  hasVideos: z.boolean(),
  hasMicroDetails: z.boolean(),
  hasChecklist: z.boolean(),
  updatedAt: z.string().optional(),
  sortOrder: z.number().optional(),
})
export type SkillManifestItem = z.infer<typeof SkillManifestItemSchema>

// ── Skill Detail Artifact (generated, used by runtime) ────
//
// The artifact is a flat spread of SkillMeta + SkillContent fields,
// where content fields override meta fields on name clashes.
// `.passthrough()` allows extra meta fields not explicitly listed.
//
export const SkillDetailArtifactSchema = z.object({
  // Identity (from meta; content also has `id` but we force it at build time)
  id: z.string(),
  domain: SkillDomainSchema,
  level: SkillLevelSchema,
  status: SkillStatusSchema.default('draft'),
  tags: z.array(z.string()).default([]),
  aliases: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),

  // Relations (from meta - `{id, type}` from SkillRelationSchema, NOT `{id, name}`)
  relatedSkills: z.array(SkillRelationSchema).default([]),
  relatedSkillIds: z.array(z.string()).default([]),
  relatedPositions: z.array(z.string()).default([]),
  relatedPositionIds: z.array(z.string()).default([]),
  relatedConcepts: z.array(z.string()).default([]),
  relatedConceptIds: z.array(z.string()).default([]),
  archetypeIds: z.array(z.string()).default([]),
  relatedArchetypeIds: z.array(z.string()).default([]),
  prerequisiteSkillIds: z.array(z.string()).default([]),
  trainingMethodIds: z.array(z.string()).default([]),
  nextSkillIds: z.array(z.string()).default([]),

  // Ordering
  searchBoost: z.number().default(1.0),
  sortOrder: z.number().optional(),

  // Content management
  version: z.number().default(1),
  updatedAt: z.string().optional(),
  publishedAt: z.string().optional(),
  contentRefs: z.object({
    microDetails: z.string().optional(),
    videos: z.string().default('videos.json'),
    qualityChecklist: z.string().optional(),
  }).default({ videos: 'videos.json' }),
  featureFlags: z.object({
    hasMicroDetails: z.boolean().default(false),
    hasChecklist: z.boolean().default(false),
    hasVideos: z.boolean().default(false),
    hasStateMachine: z.boolean().default(false),
  }).default({ hasMicroDetails: false, hasChecklist: false, hasVideos: false, hasStateMachine: false }),

  // From content (overrides meta where names clash, e.g. `name`, `keyCorrections`)
  locale: LocaleSchema,
  name: z.string(),
  shortName: z.string().optional(),
  description: z.string(),
  shortInstruction: z.string().optional(),
  summary: z.string().optional(),
  whyItWorks: z.array(z.string()).default([]),
  commonMistakes: z.array(z.string()).default([]),
  coachingCues: z.array(z.string()).default([]),
  oneMinuteMode: OneMinuteModeSchema.optional(),
  safetySummary: z.array(z.string()).default([]),
  // `keyCorrections` in artifact = content's string[] (overrides meta's {issue,fix}[])
  keyCorrections: z.array(z.string()).default([]),
  systemLogic: z.union([SystemLogicSchema, z.array(z.string())]).optional(),
  moneyDetails: z.array(z.string()).default([]),
  nextStep: z.string().optional(),
  fixItFast: z.array(z.string()).default([]),
  microDetailSystem: MicroDetailSystemSchema.optional(),
  qualityChecklist: QualityChecklistSchema.optional(),
}).passthrough()
export type SkillDetailArtifact = z.infer<typeof SkillDetailArtifactSchema>
