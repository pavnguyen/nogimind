/**
 * No-Gi Learning Paths
 *
 * Each path represents a coherent No-Gi game connecting skills
 * into a logical training progression.
 * Additive only — never delete or overwrite hand-curated paths.
 */

export type NoGiLearningPath = {
  id: string
  title: string
  shortDescription: string
  targetLevel: 'beginner' | 'intermediate' | 'advanced'
  recommendedFor: string[]
  skillSequence: string[]
  conceptsCovered: string[]
  primaryVideoIds: string[]
  estimatedWeeks?: number
  successCriteria: string[]
  notes?: string
}

export const noGiLearningPaths: NoGiLearningPath[] = [
  // ─── PATH 1: Modern Guard → Leg Entanglement ────────────────────
  {
    id: 'modern-guard-to-legs',
    title: 'Modern Guard to Leg Entanglement',
    shortDescription:
      'Build a modern bottom game connecting half guard, K-Guard, and leg entries into a coherent attacking chain.',
    targetLevel: 'advanced',
    recommendedFor: [
      'Bottom players who want to modernize their guard',
      'Competitors training for sub-only or ADCC rulesets',
      'Leg lock enthusiasts looking for systematic entries',
    ],
    skillSequence: [
      'deep-half-guard',
      'half-guard-knee-shield',
      'half-butterfly-to-leg-entanglements',
      'k-guard-entry',
      'k-guard-matrix',
      'false-reap-entry',
      'saddle-inside-sankaku-control',
      'heel-hook-safety',
    ],
    conceptsCovered: [
      'deep half guard sweeps and transitions',
      'half butterfly mechanics',
      'K-Guard angle creation',
      'matrix backside entry',
      'false reap knee line safety',
      'saddle control and heel hook finishing',
      'leg lock safety and tap etiquette',
    ],
    primaryVideoIds: [
      'lachlan-inside-heel-hook-setup-safety',
      'false-reap-safety-reference',
    ],
    estimatedWeeks: 12,
    successCriteria: [
      'Can enter K-Guard from half guard or supine guard in positional sparring',
      'Can transition from K-Guard to matrix or false reap with controlled knee line',
      'Can reach saddle position and apply heel hook with safety discipline',
      'Has a failure response at every stage — never stuck without a next branch',
      'Can explain knee line safety and tap timing to a training partner',
    ],
    notes:
      'This is the primary learning path for the app. Start with deep half and half butterfly for foundation before advancing to K-Guard and leg entries.',
  },

  // ─── PATH 2: False Reap → Saddle → Heel Hook → Bear Trap ───────
  {
    id: 'false-reap-to-bear-trap',
    title: 'False Reap to Bear Trap System',
    shortDescription:
      'Build leg entanglement finishing and secondary attack awareness from false reap entries.',
    targetLevel: 'advanced',
    recommendedFor: [
      'Leg lock specialists',
      'Athletes who already understand K-Guard basics',
      'Sub-only competitors',
    ],
    skillSequence: [
      'false-reap-entry',
      'saddle-inside-sankaku-control',
      'heel-hook-safety',
      'bear-trap-ham-sandwich',
    ],
    conceptsCovered: [
      'false reap entry mechanics',
      'saddle/inside sankaku control',
      'heel hook safety and finishing',
      'bear trap / ham sandwich compression attacks',
      'secondary leg attacks when primary fails',
    ],
    primaryVideoIds: [
      'false-reap-safety-reference',
      'lachlan-inside-heel-hook-setup-safety',
    ],
    estimatedWeeks: 8,
    successCriteria: [
      'Can enter false reap from K-Guard with safe knee line',
      'Can hold saddle control for 30 seconds in positional sparring',
      'Can finish heel hook with controlled pressure and partner communication',
      'Can transition to bear trap when heel hook is defended',
      'Understands compression lock safety and tapping etiquette',
    ],
  },

  // ─── PATH 3: Turtle Attack → Crucifix ──────────────────────────
  {
    id: 'turtle-to-crucifix',
    title: 'Turtle Attack to Crucifix',
    shortDescription:
      'Build a back/crucifix attacking system against defensive turtle opponents.',
    targetLevel: 'intermediate',
    recommendedFor: [
      'Wrestlers who frequently force turtle',
      'Athletes who struggle to finish from back control',
      'Top players looking for alternative submission entries',
    ],
    skillSequence: [
      'sprawl-go-behind',
      'turtle-ride',
      'crab-ride',
      'crucifix-control',
      'rear-naked-choke-system',
    ],
    conceptsCovered: [
      'turtle approach and ride mechanics',
      'crab ride hooks and hip control',
      'crucifix arm trap and control',
      'one-arm choke from crucifix',
      'armlock from crucifix',
      'RNC finishing when back is recovered',
    ],
    primaryVideoIds: [
      'lachlan-rnc-three-chokes',
    ],
    estimatedWeeks: 8,
    successCriteria: [
      'Can ride turtle without losing connection when opponent crawls',
      'Can enter crucifix from turtle or sprawl in live drilling',
      'Can attack both neck and arm from crucifix position',
      'Can transition between crucifix and traditional back control',
    ],
  },

  // ─── PATH 4: Half Guard → Wrestling Up → Front Headlock ────────
  {
    id: 'half-guard-to-front-headlock',
    title: 'Half Guard to Wrestling Up to Front Headlock',
    shortDescription:
      'Connect bottom half guard to wrestle-up and snap-down reactions for a complete ground-to-standing game.',
    targetLevel: 'intermediate',
    recommendedFor: [
      'Bottom players tired of playing supine guard',
      'Wrestlers transitioning to BJJ',
      'Competitors in ADCC or points-based rulesets',
    ],
    skillSequence: [
      'half-guard-knee-shield',
      'half-guard-wrestle-up',
      'dogfight-knee-tap',
      'single-leg-bjj',
      'snapdown-front-headlock',
      'sprawl-go-behind',
    ],
    conceptsCovered: [
      'knee shield to underhook transition',
      'dogfight position and knee tap',
      'single leg finishing in BJJ context',
      'snap down to front headlock',
      'go-behind from front headlock',
      'head position safety against guillotine',
    ],
    primaryVideoIds: [],
    estimatedWeeks: 8,
    successCriteria: [
      'Can wrestle up from half guard with underhook in positional sparring',
      'Can finish knee tap from dogfight without feeding guillotine',
      'Can convert wrestling-up into single leg or front headlock',
      'Can snap down and circle to back from standing front headlock',
    ],
  },

  // ─── PATH 5: Body Lock Passing → Mount → Back Take ─────────────
  {
    id: 'bodylock-to-back-take',
    title: 'Body Lock Passing to Back Take',
    shortDescription:
      'Build a pressure passing path from body lock through mount into dominant back control.',
    targetLevel: 'intermediate',
    recommendedFor: [
      'Pressure passers',
      'Athletes with wrestling backgrounds',
      'ADCC competitors focusing on top game',
    ],
    skillSequence: [
      'bodylock-passing',
      'knee-cut-passing',
      'side-control-pin',
      'mount-control',
      'back-control',
      'rear-naked-choke-system',
    ],
    conceptsCovered: [
      'body lock hip control',
      'knee cut crossface mechanics',
      'side control pin stabilization',
      'mount transition and threat creation',
      'back take from mount when opponent turns',
      'RNC finishing mechanics',
    ],
    primaryVideoIds: [
      'lachlan-body-lock-pass-standard',
      'lachlan-rnc-three-chokes',
    ],
    estimatedWeeks: 10,
    successCriteria: [
      'Can complete body lock pass against resisting guard in positional sparring',
      'Can stabilize side control for 30 seconds before advancing',
      'Can transition mount → back take when opponent turns',
      'Can finish RNC or arm triangle from back control',
    ],
  },

  // ─── PATH 6: Guard Retention → K-Guard → Back Take ─────────────
  {
    id: 'guard-retention-to-back-take',
    title: 'Guard Retention to K-Guard Back Take',
    shortDescription:
      'Turn guard recovery into immediate counterattack through K-Guard and matrix entries.',
    targetLevel: 'advanced',
    recommendedFor: [
      'Guard players who get passed frequently',
      'Athletes wanting to make their guard dangerous',
      'Bottom-game specialists',
    ],
    skillSequence: [
      'supine-guard-retention',
      'seated-guard-retention',
      'inverted-guard-control',
      'k-guard-entry',
      'k-guard-matrix',
      'back-control',
      'rear-naked-choke-system',
    ],
    conceptsCovered: [
      'guard retention layers and knee line',
      'inversion angles and safety',
      'K-Guard entry from guard retention',
      'matrix backside angle',
      'back take from matrix or K-Guard',
      'RNC finishing from back control',
    ],
    primaryVideoIds: [],
    estimatedWeeks: 10,
    successCriteria: [
      'Can recover guard from near-pass situations using frames and hip mobility',
      'Can enter K-Guard from guard retention in live rolling',
      'Can reach matrix or backside position from K-Guard',
      'Can convert K-Guard/matrix into back take at least 30% of attempts',
    ],
  },
]
