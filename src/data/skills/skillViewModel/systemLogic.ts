import type { SkillNode, LanguageCode } from './_helpers'
import { loc, locArr, cap } from './_helpers'

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
