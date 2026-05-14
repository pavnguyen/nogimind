import type { SkillNode, LanguageCode } from './_helpers'
import { loc, locArr, dedupe, cap } from './_helpers'

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
