import type {
  LanguageCode,
  LocalizedText,
  MicroDetailSystem,
  SkillNode,
  TechnicalDetail,
} from '../types/skill'
import { getLocalizedText } from './localization'

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

export const summarizeTechniqueDetail = (skill: SkillNode, lang: LanguageCode) =>
  skill.technicalDetails?.keyDetails.slice(0, 3).map((detail) => textFromDetail(detail)).map((text) => getLocalizedText(text, lang)) ?? []
