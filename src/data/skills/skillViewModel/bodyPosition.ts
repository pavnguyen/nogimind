import type { SkillNode, LanguageCode, BodyToBodyContact, BodyToBodyPhase } from './_helpers'
import { loc, dedupe, cap } from './_helpers'

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

export function formatBodyTarget(
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
