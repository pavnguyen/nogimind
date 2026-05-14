import type { SkillNode, LanguageCode } from './_helpers'
import { loc, locArr, dedupe, cap } from './_helpers'

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
