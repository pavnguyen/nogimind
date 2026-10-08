/**
 * Deep-link anchors for skill pages.
 *
 * A search result can point at the `pipeline-*` section that actually matched,
 * so the user lands on the field instead of the top of the page. The ids below
 * are the ones rendered by the pipeline tabs; a link to an id that is not in the
 * DOM silently drops the user at the top, so the components import these
 * constants rather than re-typing the string literals.
 */

export const SKILL_SECTIONS = {
  systemLogic: 'pipeline-system-logic',
  microDetails: 'pipeline-micro-details',
  readyCheck: 'pipeline-ready-check',
  whyItWorks: 'pipeline-why-it-works',
  keyCorrections: 'pipeline-key-corrections',
  moneyDetails: 'pipeline-money-details',
  coachingCues: 'pipeline-coaching-cues',
  commonMistakes: 'pipeline-common-mistakes',
  nextStep: 'pipeline-next-step',
  fixItFast: 'pipeline-fix-it-fast',
  safety: 'pipeline-safety',
  videoReferences: 'pipeline-video-references',
} as const

export type SkillSectionId = (typeof SKILL_SECTIONS)[keyof typeof SKILL_SECTIONS]

/** Tab that renders a given anchor. */
export type SkillSectionTab = 'learn' | 'fix' | 'watch'

const TAB_BY_ANCHOR: Record<SkillSectionId, SkillSectionTab> = {
  [SKILL_SECTIONS.systemLogic]: 'learn',
  [SKILL_SECTIONS.microDetails]: 'learn',
  [SKILL_SECTIONS.readyCheck]: 'learn',
  [SKILL_SECTIONS.whyItWorks]: 'learn',
  [SKILL_SECTIONS.keyCorrections]: 'learn',
  [SKILL_SECTIONS.moneyDetails]: 'learn',
  [SKILL_SECTIONS.coachingCues]: 'learn',
  [SKILL_SECTIONS.commonMistakes]: 'learn',
  [SKILL_SECTIONS.nextStep]: 'learn',
  [SKILL_SECTIONS.fixItFast]: 'fix',
  [SKILL_SECTIONS.safety]: 'fix',
  [SKILL_SECTIONS.videoReferences]: 'watch',
}

/**
 * Search-index field name -> the section that renders it.
 *
 * Field names come from the `field(...)` calls in `searchEngine.ts`; only fields
 * with a matching pipeline section are listed, so unknown fields fall through to
 * a plain skill link with no anchor.
 */
const ANCHOR_BY_FIELD: Record<string, SkillSectionId> = {
  // Learn tab
  'quick card': SKILL_SECTIONS.systemLogic,
  'system logic': SKILL_SECTIONS.systemLogic,
  'if-then decisions': SKILL_SECTIONS.systemLogic,
  'micro details': SKILL_SECTIONS.microDetails,
  'micro detail system': SKILL_SECTIONS.microDetails,
  details: SKILL_SECTIONS.microDetails,
  'blackbelt details': SKILL_SECTIONS.microDetails,
  'technical details': SKILL_SECTIONS.microDetails,
  instruction: SKILL_SECTIONS.microDetails,
  'body parts': SKILL_SECTIONS.microDetails,
  category: SKILL_SECTIONS.microDetails,
  'quality checklist': SKILL_SECTIONS.readyCheck,
  'why it works': SKILL_SECTIONS.whyItWorks,
  'key corrections': SKILL_SECTIONS.keyCorrections,
  'correction cues': SKILL_SECTIONS.keyCorrections,
  'money details': SKILL_SECTIONS.moneyDetails,
  'coaching cues': SKILL_SECTIONS.coachingCues,
  'common mistakes': SKILL_SECTIONS.commonMistakes,
  'next step': SKILL_SECTIONS.nextStep,
  // Fix tab
  'fix it fast': SKILL_SECTIONS.fixItFast,
  safety: SKILL_SECTIONS.safety,
  'danger signals': SKILL_SECTIONS.safety,
  // Watch tab
  'video references': SKILL_SECTIONS.videoReferences,
}

/** First matched field that maps to a rendered section. */
export const skillAnchorForFields = (fields: string[]): SkillSectionId | undefined =>
  fields.map((name) => ANCHOR_BY_FIELD[name]).find(Boolean)

/** Tab that renders the given anchor id, or `undefined` for an unknown anchor. */
export const skillTabForAnchor = (anchorId: string): SkillSectionTab | undefined =>
  TAB_BY_ANCHOR[anchorId as SkillSectionId]
