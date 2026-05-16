import type { SkillNode, LanguageCode, BodyToBodyContact, BodyToBodyPhase } from './_helpers'
import { loc, locArr, cap } from './_helpers'

type BodyContactView = {
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
  isKeyContact: boolean
}

function formatBodyTarget(
  target: BodyToBodyContact['myBodyPart'],
  t: (key: string) => string,
): string {
  const actorKey = target.role === 'me' ? 'attacker' : 'defender'
  return `${t(`cardOS.${actorKey}`)} ${t(`bodyToBody.sides.${target.side}`)} ${t(`bodyToBody.bodyParts.${target.bodyPart}`)}`
}

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
