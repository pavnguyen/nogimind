import { masteryStages } from '../data/masteryStages'
import type { MasteryStage } from '../data/masteryStages'
import type {
  LanguageCode,
  LocalizedText,
  MicroDetailSystem,
  SkillNode,
  TechnicalDetail,
} from '../types/skill'
import { getLocalizedArray, getLocalizedText } from './localization'

const lt = (vi: string, en: string, fr: string): LocalizedText => ({ vi, en, fr })

export type MicroDetailItem = {
  id: string
  skillId: string
  skillTitle: LocalizedText
  skillDomain: SkillNode['domain']
  title: LocalizedText
  instruction: LocalizedText
  whyItWorks: LocalizedText
  commonMistake?: LocalizedText
  correctionCue: LocalizedText
  liveCue?: LocalizedText
  category: string
  bodyParts: string[]
  tags: string[]
}

export type TroubleshooterItem = {
  id: string
  skillId: string
  title: LocalizedText
  overview: LocalizedText
  category: 'choke' | 'joint_lock' | 'leg_lock' | 'back' | 'front_headlock' | 'submission'
  checklist: string[]
  diagnoses: {
    id: string
    title: LocalizedText
    likelyCause: LocalizedText
    microFix: LocalizedText
    relatedDetailIds: string[]
  }[]
  safetyNotes: string[]
}

const textFromDetail = (detail: TechnicalDetail): LocalizedText => ({
  vi: `${detail.title.vi}: ${detail.instruction.vi}`,
  en: `${detail.title.en}: ${detail.instruction.en}`,
  fr: `${detail.title.fr}: ${detail.instruction.fr}`,
})

const mapMicroDetailSystem = (skill: SkillNode): MicroDetailItem[] => {
  const system: MicroDetailSystem | undefined = skill.microDetailSystem
  if (!system) return []

  return [
    ...system.topFiveDetails.map((detail) => ({
      id: detail.id,
      skillId: skill.id,
      skillTitle: skill.title,
      skillDomain: skill.domain,
      title: detail.title,
      instruction: detail.shortInstruction,
      whyItWorks: detail.whyItWorks,
      commonMistake: detail.commonMistake,
      correctionCue: detail.correctionCue,
      liveCue: detail.liveCue,
      category: detail.category,
      bodyParts: detail.bodyParts,
      tags: [...skill.tags, detail.category, ...detail.bodyParts, 'micro-detail-system'],
    })),
    ...system.leftRightGuides.map((detail, index) => ({
      id: `${skill.id}-lr-${index}`,
      skillId: skill.id,
      skillTitle: skill.title,
      skillDomain: skill.domain,
      title: detail.scenario,
      instruction: detail.note,
      whyItWorks: detail.note,
      commonMistake: detail.note,
      correctionCue: detail.note,
      liveCue: detail.note,
      category: 'timing',
      bodyParts: ['hands', 'head', 'hips'],
      tags: [...skill.tags, 'left-right-guide'],
    })),
    ...system.fastFinishPaths.map((detail) => ({
      id: detail.id,
      skillId: skill.id,
      skillTitle: skill.title,
      skillDomain: skill.domain,
      title: detail.title,
      instruction: detail.finishTrigger,
      whyItWorks: detail.finishTrigger,
      commonMistake: detail.abortSignal,
      correctionCue: detail.nextBestOption,
      liveCue: detail.abortSignal,
      category: 'finish',
      bodyParts: ['hands', 'elbows', 'hips', 'feet'],
      tags: [...skill.tags, 'fast-finish-path'],
    })),
  ]
}

export const getMicroDetails = (skills: SkillNode[]): MicroDetailItem[] =>
  skills.flatMap((skill) => {
    const microDetails = mapMicroDetailSystem(skill)
    const keyDetails: MicroDetailItem[] = (skill.technicalDetails?.keyDetails ?? []).map((detail) => ({
      id: detail.id,
      skillId: skill.id,
      skillTitle: skill.title,
      skillDomain: skill.domain,
      title: detail.title,
      instruction: detail.instruction,
      whyItWorks: detail.whyItWorks,
      commonMistake: detail.commonFailure,
      correctionCue: detail.correctionCue,
      liveCue: detail.liveRollingCue,
      category: detail.category,
      bodyParts: detail.bodyParts,
      tags: [...skill.tags, detail.category, ...detail.bodyParts, 'technical-details'],
    }))

    const adjustments: MicroDetailItem[] = (skill.technicalDetails?.microAdjustments ?? []).map((adjustment) => ({
      id: adjustment.id,
      skillId: skill.id,
      skillTitle: skill.title,
      skillDomain: skill.domain,
      title: adjustment.problem,
      instruction: adjustment.adjustment,
      whyItWorks: adjustment.why,
      commonMistake: adjustment.problem,
      correctionCue: adjustment.adjustment,
      liveCue: adjustment.adjustment,
      category: 'micro_adjustment',
      bodyParts: adjustment.relatedBodyParts,
      tags: [...skill.tags, 'adjustment', ...adjustment.relatedBodyParts, 'technical-details'],
    }))

    return [...microDetails, ...keyDetails, ...adjustments]
  })

const troubleshooterCategoryFor = (skill: SkillNode): TroubleshooterItem['category'] => {
  if (skill.id.includes('heel') || skill.id.includes('ankle') || skill.tags.some((tag) => tag.includes('leg-lock'))) return 'leg_lock'
  if (skill.id.includes('guillotine') || skill.tags.includes('front-headlock')) return 'front_headlock'
  if (skill.id.includes('rear-naked') || skill.domain === 'back_control') return 'back'
  if (skill.tags.includes('choke')) return 'choke'
  if (skill.id.includes('kimura')) return 'joint_lock'
  return 'submission'
}

export const getTroubleshooters = (skills: SkillNode[], lang: LanguageCode = 'en'): TroubleshooterItem[] =>
  skills
    .filter((skill) => skill.technicalDetails?.finishingMechanics?.length || skill.domain === 'submission_systems')
    .map((skill) => {
      const finish = skill.technicalDetails?.finishingMechanics?.[0]
      const details = skill.technicalDetails?.keyDetails ?? []
      const qualityChecks = skill.qualityChecklist?.checks ?? []
      const microDetails = skill.microDetailSystem?.topFiveDetails ?? []
      const checklist = finish
        ? getLocalizedArray(finish.finishChecklist, lang)
        : details.length
          ? details.slice(0, 8).map((detail) => getLocalizedText(detail.correctionCue, lang))
          : qualityChecks.length
            ? qualityChecks.slice(0, 8).map((check) => getLocalizedText(check.quickFix, lang))
            : microDetails.slice(0, 8).map((detail) => getLocalizedText(detail.correctionCue, lang))
      const falseSignals = finish ? getLocalizedArray(finish.falseFinishSignals, lang) : []
      const diagnoses = [
        ...details.slice(0, 6).map((detail) => ({
          id: `${skill.id}-${detail.id}`,
          title: detail.title,
          likelyCause: detail.commonFailure,
          microFix: detail.correctionCue,
          relatedDetailIds: [detail.id],
        })),
        ...(!details.length
          ? qualityChecks.slice(0, 6).map((check) => ({
              id: `${skill.id}-${check.id}`,
              title: check.title,
              likelyCause: check.failureSignal,
              microFix: check.quickFix,
              relatedDetailIds: check.relatedMicroDetailIds ?? [],
            }))
          : []),
        ...(!details.length && !qualityChecks.length
          ? microDetails.slice(0, 6).map((detail) => ({
              id: `${skill.id}-${detail.id}`,
              title: detail.title,
              likelyCause: detail.commonMistake,
              microFix: detail.correctionCue,
              relatedDetailIds: [detail.id],
            }))
          : []),
        ...falseSignals.slice(0, 4).map((signal, index) => ({
          id: `${skill.id}-false-signal-${index}`,
          title: lt(signal, signal, signal),
          likelyCause: lt(signal, signal, signal),
          microFix: lt(
            'Quay lại isolation, angle và slack removal trước khi tăng lực.',
            'Return to isolation, angle, and slack removal before increasing force.',
            'Revenir à isolation, angle et retrait du slack avant force.',
          ),
          relatedDetailIds: [],
        })),
      ].slice(0, 10)

      return {
        id: `${skill.id}-troubleshooter`,
        skillId: skill.id,
        title: skill.title,
        overview: skill.technicalDetails?.overview ?? skill.shortDescription,
        category: troubleshooterCategoryFor(skill),
        checklist,
        diagnoses,
        safetyNotes: finish ? getLocalizedArray(finish.safetyNotes, lang) : skill.microDetailSystem?.safetyNotes ? getLocalizedArray(skill.microDetailSystem.safetyNotes, lang) : [],
      }
    })

export const getMasteryStages = (): MasteryStage[] => masteryStages

export const skillHasTroubleshooter = (skill: SkillNode) =>
  Boolean(skill.technicalDetails?.finishingMechanics?.length || skill.domain === 'submission_systems')

export const summarizeTechniqueDetail = (skill: SkillNode, lang: LanguageCode) =>
  skill.technicalDetails?.keyDetails.slice(0, 3).map((detail) => textFromDetail(detail)).map((text) => getLocalizedText(text, lang)) ?? []
