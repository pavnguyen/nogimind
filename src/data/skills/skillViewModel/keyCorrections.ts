/**
 * keyCorrections.ts
 * View-model builder for the inline "Key Corrections" micro-detail annotations
 * on SkillDetailPage. Surfaces the topFiveDetails from MicroDetailSystem as
 * compact wrong → fix → cue cards.
 */

import type { SkillNode, LanguageCode } from './_helpers'
import { loc } from './_helpers'

export type KeyCorrectionItem = {
  id: string
  category: string
  bodyParts: string[]
  title: string
  commonMistake: string
  correctionCue: string
  liveCue: string
  safetyNote: string | undefined
}

export type KeyCorrectionsView = {
  available: boolean
  items: KeyCorrectionItem[]
}

export function buildKeyCorrectionsView(skill: SkillNode, lang: LanguageCode): KeyCorrectionsView {
  const mds = skill.microDetailSystem
  if (!mds || !mds.topFiveDetails.length) {
    return { available: false, items: [] }
  }

  return {
    available: true,
    items: mds.topFiveDetails.map((d) => ({
      id: d.id,
      category: d.category,
      bodyParts: d.bodyParts,
      title: loc(d.title, lang),
      commonMistake: loc(d.commonMistake, lang),
      correctionCue: loc(d.correctionCue, lang),
      liveCue: loc(d.liveCue, lang),
      safetyNote: d.safetyNote ? loc(d.safetyNote, lang) : undefined,
    })),
  }
}
