/**
 * skillViewModel.ts
 * Pure builder functions for the Technique Card OS.
 * Each function takes a SkillNode and returns a typed view-model.
 * Safe to wrap in useMemo — no side effects, no external state.
 */

import type {
  BodyToBodyContact,
  BodyToBodyPhase,
  LanguageCode,
  LocalizedText,
  SkillNode,
} from '../../types/skill'
import type { TechniqueStateMachine, TechniqueOutcome } from '../../types/stateMachine'
import { getLocalizedText } from '../../utils/localization'

// ─── Shared helpers ────────────────────────────────────────────────────────────

const VI_TERM_FIXES: Array<[RegExp, string]> = [
  [/\bwrist\b/gi, 'cổ tay'],
  [/\bankle\b/gi, 'mắt cá chân'],
  [/\bheel\b/gi, 'gót chân'],
  [/\bknee line\b/gi, 'đường gối'],
  [/\bhip line\b/gi, 'đường hông'],
  [/\belbow line\b/gi, 'đường khuỷu tay'],
  [/\bshoulder line\b/gi, 'đường vai'],
  [/\bcenterline\b/gi, 'đường trung tuyến'],
  [/^Chin first, squeeze later\.?$/gi, 'Vào cằm trước, siết sau.'],
  [/^Angle first\.?$/gi, 'Lấy góc trước.'],
  [/^Hands win, then squeeze\.?$/gi, 'Thắng tay trước rồi mới siết.'],
  [/^Line first\.?$/gi, 'Ưu tiên đường lực trước.'],
  [/^Head safe\.?$/gi, 'Đầu an toàn.'],
  [/^Hips under\.?$/gi, 'Hông ở dưới đường lực.'],
  [/^Step and angle\.?$/gi, 'Bước chân rồi lấy góc.'],
]

const normalizeViTerms = (value: string, lang: LanguageCode): string => {
  if (lang !== 'vi' || !value) return value
  return VI_TERM_FIXES.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value)
}

const loc = (t: LocalizedText, lang: LanguageCode): string =>
  normalizeViTerms(getLocalizedText(t, lang), lang)

const locArr = (arr: { vi: string[]; en: string[]; fr: string[] }, lang: LanguageCode): string[] =>
  (arr[lang] ?? arr.en ?? []).map((item) => normalizeViTerms(item, lang))

const dedupe = (strings: string[]): string[] => [...new Set(strings.filter(Boolean))]

const cap = <T>(arr: T[], n: number): T[] => arr.slice(0, n)

// ─── Section 1 — System Logic ──────────────────────────────────────────────────

export type SystemLogicView = {
  goal: string
  situation: string
  why: string
  threeCues: string[]
  doNotDo: string
  ifItFails: string
  keyConcepts: string[]
  dangerSignals: string[]
  safetyReminder: string | null
}

export function buildSystemLogicView(skill: SkillNode, lang: LanguageCode): SystemLogicView {
  const cues = skill.quickCard
    ? locArr(skill.quickCard.threeCues, lang)
    : cap(locArr(skill.bodyMechanicsSystem.correctionCues, lang), 3)

  return {
    goal: loc(skill.primaryGoal, lang),
    situation: loc(skill.situation, lang),
    why: loc(skill.whyItMatters, lang),
    threeCues: cap(cues, 3),
    doNotDo: skill.quickCard ? loc(skill.quickCard.doNotDo, lang) : '',
    ifItFails: skill.quickCard
      ? loc(skill.quickCard.ifItFails, lang)
      : cap(locArr(skill.bodyMechanicsSystem.correctionCues, lang), 1)[0] ?? '',
    keyConcepts: cap(locArr(skill.keyConcepts, lang), 6),
    dangerSignals: cap(locArr(skill.dangerSignals, lang), 4),
    safetyReminder: skill.quickCard?.safetyReminder
      ? loc(skill.quickCard.safetyReminder, lang)
      : null,
  }
}

// ─── Section 2 — Body Position ────────────────────────────────────────────────

export type BodyContactView = {
  id: string
  title: string
  attackerTarget: string
  defenderTarget: string
  myBodyPart: string
  opponentBodyPart: string
  contactType: string
  forceDirection: string | undefined
  pressureLevel: string | undefined
  instruction: string
  whyItWorks: string
  correctionCue: string
  liveCue: string
  prevents: string | undefined
  safetyNote: string | undefined
  /** true = one of the mostImportantContacts ids */
  isKeyContact: boolean
}

export type BodyMapItem = {
  key: string
  label: string
  cues: string[]
}

export type BodyPhaseView = {
  id: string
  title: string
  goal: string
  contacts: BodyContactView[]
  successSignal: string
  failureSignal: string
}

export type BodyPositionView = {
  available: boolean
  overview: string
  defaultOrientation: string
  mirrorNote: string
  attackerMap: BodyMapItem[]
  defenderMap: BodyMapItem[]
  attackerGoal: string | null
  defenderGoal: string | null
  phases: BodyPhaseView[]
  keyContactIds: string[]
  totalContacts: number
}

function formatBodyTarget(
  target: BodyToBodyContact['myBodyPart'],
  t: (key: string) => string,
): string {
  const actorKey = target.role === 'me' ? 'attacker' : 'defender'
  return `${t(`cardOS.${actorKey}`)} ${t(`bodyToBody.sides.${target.side}`)} ${t(`bodyToBody.bodyParts.${target.bodyPart}`)}`
}

const bodyMapKeys = {
  attacker: [
    ['head', ['head', 'ear', 'chin', 'neck']],
    ['chest', ['chest', 'sternum', 'ribs']],
    ['hips', ['hip', 'pelvis']],
    ['leftHand', ['hand', 'wrist', 'forearm', 'elbow', 'biceps']],
    ['rightHand', ['hand', 'wrist', 'forearm', 'elbow', 'biceps']],
    ['leftLeg', ['knee', 'shin', 'foot', 'heel', 'ankle', 'thigh', 'hook']],
    ['rightLeg', ['knee', 'shin', 'foot', 'heel', 'ankle', 'thigh', 'hook']],
  ],
  defender: [
    ['head', ['head', 'ear', 'chin', 'neck']],
    ['chest', ['chest', 'sternum', 'ribs']],
    ['hips', ['hip', 'pelvis']],
    ['leftArm', ['hand', 'wrist', 'forearm', 'elbow', 'biceps', 'shoulder']],
    ['rightArm', ['hand', 'wrist', 'forearm', 'elbow', 'biceps', 'shoulder']],
    ['leftLeg', ['knee', 'shin', 'foot', 'heel', 'ankle', 'thigh', 'hook']],
    ['rightLeg', ['knee', 'shin', 'foot', 'heel', 'ankle', 'thigh', 'hook']],
  ],
} as const

const targetMatchesMapKey = (
  target: BodyToBodyContact['myBodyPart'],
  parts: readonly string[],
  key: string,
) => {
  if (!parts.includes(target.bodyPart)) return false
  if (key.startsWith('left')) return target.side === 'left' || target.side === 'near'
  if (key.startsWith('right')) return target.side === 'right' || target.side === 'far'
  return true
}

const buildBodyMap = (
  contacts: BodyToBodyContact[],
  role: 'me' | 'opponent',
  actor: 'attacker' | 'defender',
  lang: LanguageCode,
  t: (key: string) => string,
): BodyMapItem[] => bodyMapKeys[actor].map(([key, parts]) => {
  const cues = contacts
    .filter((contactItem) => {
      const target = role === 'me' ? contactItem.myBodyPart : contactItem.opponentBodyPart
      return targetMatchesMapKey(target, parts, key)
    })
    .map((contactItem) => loc(contactItem.correctionCue, lang))

  return {
    key,
    label: t(`cardOS.bodyMap.${key}`),
    cues: cap(dedupe(cues), 2),
  }
})

export function buildBodyPositionView(
  skill: SkillNode,
  lang: LanguageCode,
  t: (key: string) => string,
): BodyPositionView {
  const btb = skill.bodyToBodyDetails
  if (!btb) {
    return {
      available: false,
      overview: '',
      defaultOrientation: '',
      mirrorNote: '',
      attackerMap: [],
      defenderMap: [],
      attackerGoal: null,
      defenderGoal: null,
      phases: [],
      keyContactIds: [],
      totalContacts: 0,
    }
  }

  const keyIds = new Set(btb.mostImportantContacts)
  const rawContacts = btb.phases.flatMap((phase) => phase.contacts)
  const totalContacts = btb.phases.reduce((sum, p) => sum + p.contacts.length, 0)

  const phases: BodyPhaseView[] = btb.phases.map((phase: BodyToBodyPhase) => ({
    id: phase.id,
    title: loc(phase.title, lang),
    goal: loc(phase.goal, lang),
    contacts: phase.contacts.map((c: BodyToBodyContact): BodyContactView => ({
      id: c.id,
      title: loc(c.title, lang),
      attackerTarget: formatBodyTarget(c.myBodyPart, t),
      defenderTarget: formatBodyTarget(c.opponentBodyPart, t),
      myBodyPart: formatBodyTarget(c.myBodyPart, t),
      opponentBodyPart: formatBodyTarget(c.opponentBodyPart, t),
      contactType: c.contactType,
      forceDirection: c.forceDirection,
      pressureLevel: c.pressureLevel,
      instruction: loc(c.exactInstruction, lang),
      whyItWorks: loc(c.whyItWorks, lang),
      correctionCue: loc(c.correctionCue, lang),
      liveCue: loc(c.liveCue, lang),
      prevents: c.prevents ? loc(c.prevents, lang) : undefined,
      safetyNote: c.safetyNote ? loc(c.safetyNote, lang) : undefined,
      isKeyContact: keyIds.has(c.id),
    })),
    successSignal: loc(phase.successSignal, lang),
    failureSignal: loc(phase.failureSignal, lang),
  }))

  return {
    available: true,
    overview: loc(btb.overview, lang),
    defaultOrientation: loc(btb.defaultOrientation, lang),
    mirrorNote: loc(btb.leftRightMirrorNote, lang),
    attackerMap: buildBodyMap(rawContacts, 'me', 'attacker', lang, t),
    defenderMap: buildBodyMap(rawContacts, 'opponent', 'defender', lang, t),
    attackerGoal: skill.bodyMechanicsSystem.attackerGoal
      ? loc(skill.bodyMechanicsSystem.attackerGoal, lang)
      : null,
    defenderGoal: skill.bodyMechanicsSystem.defenderGoal
      ? loc(skill.bodyMechanicsSystem.defenderGoal, lang)
      : null,
    phases,
    keyContactIds: btb.mostImportantContacts,
    totalContacts,
  }
}

// ─── Section 3 — Money Details ────────────────────────────────────────────────

export type MicroDetailView = {
  id: string
  category: string
  title: string
  instruction: string
  direction: string | undefined
  bodyParts: string[]
  whyItWorks: string
  commonMistake: string
  correctionCue: string
  liveCue: string
  safetyNote: string | undefined
}

export type QualityCheckView = {
  id: string
  severity: 'minor' | 'major' | 'critical'
  title: string
  question: string
  successSignal: string
  failureSignal: string
  quickFix: string
}

export type MoneyDetailsView = {
  available: boolean
  overview: string
  topDetails: MicroDetailView[]
  mechanicGroups: { label: string; items: { title: string; detail: string; cue: string }[] }[]
  qualityChecks: QualityCheckView[]
  passThreshold: number
  doNotDo: string[]
  liveCues: string[]
  oneSentenceGold: string | null
  commonLeaks: { leak: string; why: string; correction: string }[]
}

export function buildMoneyDetailsView(skill: SkillNode, lang: LanguageCode): MoneyDetailsView {
  const mds = skill.microDetailSystem
  const ql = skill.qualityChecklist
  const bb = skill.blackbeltDetails

  if (!mds && !ql) {
    return {
      available: false,
      overview: '',
      topDetails: [],
      mechanicGroups: [],
      qualityChecks: [],
      passThreshold: 0,
      doNotDo: [],
      liveCues: [],
      oneSentenceGold: null,
      commonLeaks: [],
    }
  }

  const topDetails: MicroDetailView[] = mds
    ? mds.topFiveDetails.map((d) => ({
        id: d.id,
        category: d.category,
        title: loc(d.title, lang),
        instruction: loc(d.shortInstruction, lang),
        direction: d.direction,
        bodyParts: d.bodyParts,
        whyItWorks: loc(d.whyItWorks, lang),
        commonMistake: loc(d.commonMistake, lang),
        correctionCue: loc(d.correctionCue, lang),
        liveCue: loc(d.liveCue, lang),
        safetyNote: d.safetyNote ? loc(d.safetyNote, lang) : undefined,
      }))
    : []

  const qualityChecks: QualityCheckView[] = ql
    ? ql.checks.map((c) => ({
        id: c.id,
        severity: c.severity,
        title: loc(c.title, lang),
        question: loc(c.question, lang),
        successSignal: loc(c.successSignal, lang),
        failureSignal: loc(c.failureSignal, lang),
        quickFix: loc(c.quickFix, lang),
      }))
    : []

  return {
    available: true,
    overview: mds ? loc(mds.overview, lang) : (ql ? loc(ql.overview, lang) : ''),
    topDetails,
    mechanicGroups: bb
      ? [
          {
            label: 'Clamp',
            items: cap(bb.clampMechanics.map((item) => ({
              title: loc(item.title, lang),
              detail: loc(item.exactAction, lang),
              cue: loc(item.correctionCue, lang),
            })), 3),
          },
          {
            label: 'Finish',
            items: cap(bb.finishTips.map((item) => ({
              title: loc(item.title, lang),
              detail: loc(item.exactFinishingAction, lang),
              cue: loc(item.finishTrigger, lang),
            })), 3),
          },
          {
            label: 'Pressure',
            items: cap(bb.pressureDetails.map((item) => ({
              title: loc(item.title, lang),
              detail: loc(item.direction, lang),
              cue: loc(item.correctionCue, lang),
            })), 3),
          },
          {
            label: 'Angle',
            items: cap(bb.angleDetails.map((item) => ({
              title: loc(item.title, lang),
              detail: loc(item.howToCreateAngle, lang),
              cue: loc(item.correctionCue, lang),
            })), 3),
          },
          {
            label: 'Escape Prevention',
            items: cap(bb.opponentEscapePrevention.map((item) => ({
              title: loc(item.escape, lang),
              detail: loc(item.prevention, lang),
              cue: loc(item.nextBestBranch, lang),
            })), 3),
          },
        ].filter((group) => group.items.length > 0)
      : [],
    qualityChecks,
    passThreshold: ql?.passThreshold ?? 0,
    doNotDo: mds ? cap(locArr(mds.doNotDo, lang), 6) : [],
    liveCues: mds
      ? cap(
          dedupe([
            ...mds.topFiveDetails.map((d) => loc(d.liveCue, lang)),
          ]),
          5,
        )
      : [],
    oneSentenceGold: bb?.oneSentenceGold ? loc(bb.oneSentenceGold, lang) : null,
    commonLeaks: cap([
      ...(mds
        ? mds.topFiveDetails.map((detail) => ({
            leak: loc(detail.commonMistake, lang),
            why: loc(detail.whyItWorks, lang),
            correction: loc(detail.correctionCue, lang),
          }))
        : []),
      ...(bb
        ? bb.clampMechanics.map((detail) => ({
            leak: loc(detail.commonLeak, lang),
            why: loc(detail.whyItWorks, lang),
            correction: loc(detail.correctionCue, lang),
          }))
        : []),
    ], 5),
  }
}

// ─── Section 4 — Outcomes & Branches ─────────────────────────────────────────

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

// ─── Section 5 — Fix It Fast ──────────────────────────────────────────────────

export type FixItFastItem = {
  id: string
  problem: string
  whyItHappens: string
  bodyCorrection: string
  cue: string
  severity: 'minor' | 'major' | 'critical'
}

export type FixItFastView = {
  available: boolean
  items: FixItFastItem[]
  troubleshootingTips: { problem: string; quickFix: string; cue: string }[]
  commonMistakes: string[]
}

export function buildFixItFastView(skill: SkillNode, lang: LanguageCode): FixItFastView {
  const mds = skill.microDetailSystem
  const ql = skill.qualityChecklist

  // Build from failed quality checks + troubleshooting tips
  const qItems: FixItFastItem[] = ql
    ? ql.checks.map((c) => ({
        id: c.id,
        problem: loc(c.failureSignal, lang),
        whyItHappens: loc(c.question, lang),
        bodyCorrection: loc(c.quickFix, lang),
        cue: loc(c.quickFix, lang),
        severity: c.severity,
      }))
    : []

  const tips = mds
    ? mds.troubleshootingTips.map((tip) => ({
        problem: loc(tip.problem, lang),
        quickFix: loc(tip.quickFix, lang),
        cue: loc(tip.cue, lang),
      }))
    : []

  const mistakes = dedupe([
    ...cap(locArr(skill.commonMistakes, lang), 5),
    ...(mds ? cap(locArr(mds.doNotDo, lang), 3) : []),
  ])

  return {
    available: qItems.length > 0 || tips.length > 0 || mistakes.length > 0,
    items: qItems,
    troubleshootingTips: tips,
    commonMistakes: cap(mistakes, 7),
  }
}

// ─── Section 6 — Safety ───────────────────────────────────────────────────────

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

// ─── Section 7 — Next Step ────────────────────────────────────────────────────

export type NextStepView = {
  prerequisiteIds: string[]
  relatedSkillIds: string[]
  sharedPrincipleIds: string[]
  sharedCueIds: string[]
  sharedSafetyIds: string[]
}

export function buildNextStepView(skill: SkillNode): NextStepView {
  return {
    prerequisiteIds: cap(skill.prerequisites, 3),
    relatedSkillIds: cap(skill.relatedSkills, 3),
    sharedPrincipleIds: cap(skill.sharedPrincipleIds ?? [], 3),
    sharedCueIds: cap(skill.sharedCueIds ?? [], 3),
    sharedSafetyIds: cap(skill.sharedSafetyIds ?? [], 3),
  }
}

// ─── One-Minute Mode ──────────────────────────────────────────────────────────

export type OneMinuteView = {
  goal: string
  threeCues: string[]
  topContacts: BodyContactView[]
  finishTrigger: string
  abortSignal: string
  nextBranch: string
  safetyReminder: string | null
}

export function buildOneMinuteView(
  skill: SkillNode,
  lang: LanguageCode,
  t: (key: string) => string,
): OneMinuteView {
  const btb = skill.bodyToBodyDetails
  const allContacts: BodyContactView[] = btb
    ? btb.phases.flatMap((p: BodyToBodyPhase) =>
        p.contacts.map(
          (c: BodyToBodyContact): BodyContactView => ({
            id: c.id,
            title: loc(c.title, lang),
            attackerTarget: formatBodyTarget(c.myBodyPart, t),
            defenderTarget: formatBodyTarget(c.opponentBodyPart, t),
            myBodyPart: formatBodyTarget(c.myBodyPart, t),
            opponentBodyPart: formatBodyTarget(c.opponentBodyPart, t),
            contactType: c.contactType,
            forceDirection: c.forceDirection,
            pressureLevel: c.pressureLevel,
            instruction: loc(c.exactInstruction, lang),
            whyItWorks: loc(c.whyItWorks, lang),
            correctionCue: loc(c.correctionCue, lang),
            liveCue: loc(c.liveCue, lang),
            prevents: c.prevents ? loc(c.prevents, lang) : undefined,
            safetyNote: c.safetyNote ? loc(c.safetyNote, lang) : undefined,
            isKeyContact: btb.mostImportantContacts.includes(c.id),
          }),
        ),
      )
    : []

  const keyContacts = allContacts.filter((c) => c.isKeyContact)
  const topContacts = cap(keyContacts.length > 0 ? keyContacts : allContacts, 3)

  // finishTrigger = first success outcome signal or bodyChecklist pressure
  const finishFallback = skill.bodyChecklist.pressure
    ? loc(skill.bodyChecklist.pressure, lang)
    : ''
  const abortFallback = cap(locArr(skill.dangerSignals, lang), 1)[0] ?? ''
  const branchFallback = cap(skill.relatedSkills, 1)[0] ?? ''

  return {
    goal: loc(skill.primaryGoal, lang),
    threeCues: cap(
      skill.quickCard
        ? locArr(skill.quickCard.threeCues, lang)
        : locArr(skill.bodyMechanicsSystem.correctionCues, lang),
      3,
    ),
    topContacts,
    finishTrigger: finishFallback,
    abortSignal: abortFallback,
    nextBranch: branchFallback,
    safetyReminder: skill.quickCard?.safetyReminder
      ? loc(skill.quickCard.safetyReminder, lang)
      : null,
  }
}
