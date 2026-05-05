import { masteryStages } from '../data/masteryStages'
import type { MasteryStage } from '../data/masteryStages'
import type {
  FailureResponse,
  IfThenDecision,
  LanguageCode,
  LocalizedText,
  MicroDetailSystem,
  ReactionBranch,
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
  correctionCue: LocalizedText
  liveCue?: LocalizedText
  category: string
  bodyParts: string[]
  tags: string[]
}

export type TechniqueChainItem = {
  id: string
  skillId: string
  title: LocalizedText
  startNode: LocalizedText
  endGoal: LocalizedText
  steps: {
    id: string
    title: LocalizedText
    goal: LocalizedText
    keyDetail: LocalizedText
    nextSkillIds: string[]
  }[]
  failureBranches: FailureResponse[]
  conceptTags: string[]
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

export type EscapeRouteItem = {
  id: string
  title: LocalizedText
  earlySignal: LocalizedText
  prevention: LocalizedText
  ifPreventionFails: LocalizedText
  followUpSkillIds: string[]
  correctionCue: LocalizedText
}

export type EscapeMapItem = {
  id: string
  skillId: string
  title: LocalizedText
  overview: LocalizedText
  category: 'back_control' | 'mount' | 'side_control' | 'passing' | 'submission' | 'front_headlock' | 'leg_lock' | 'escape'
  routes: EscapeRouteItem[]
  priorityPreventions: string[]
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
      correctionCue: adjustment.adjustment,
      liveCue: adjustment.adjustment,
      category: 'micro_adjustment',
      bodyParts: adjustment.relatedBodyParts,
      tags: [...skill.tags, 'adjustment', ...adjustment.relatedBodyParts, 'technical-details'],
    }))

    return [...microDetails, ...keyDetails, ...adjustments]
  })

export const getTechniqueChains = (skills: SkillNode[]): TechniqueChainItem[] =>
  skills
    .filter((skill) => skill.decisionTree.length || skill.failureResponses.length || skill.ifThenDecisions?.length)
    .map((skill) => {
      const decisionSteps = skill.decisionTree.slice(0, 5).map((branch, index) => ({
        id: `${skill.id}-decision-${index}`,
        title: branch.trigger,
        goal: branch.response,
        keyDetail: branch.response,
        nextSkillIds: branch.nextSkillIds ?? [],
      }))
      const ifThenSteps = (skill.ifThenDecisions ?? []).slice(0, Math.max(0, 5 - decisionSteps.length)).map((decision: IfThenDecision) => ({
        id: decision.id,
        title: decision.ifCondition,
        goal: decision.thenAction,
        keyDetail: decision.correctionCue,
        nextSkillIds: decision.nextSkillIds,
      }))

      return {
        id: `${skill.id}-chain`,
        skillId: skill.id,
        title: skill.title,
        startNode: skill.situation,
        endGoal: skill.primaryGoal,
        steps: [
          {
            id: `${skill.id}-start`,
            title: lt('Start node', 'Start node', 'Node départ'),
            goal: skill.situation,
            keyDetail: skill.primaryGoal,
            nextSkillIds: skill.relatedSkills.slice(0, 2),
          },
          ...decisionSteps,
          ...ifThenSteps,
        ],
        failureBranches: skill.failureResponses.slice(0, 4),
        conceptTags: [...getLocalizedArray(skill.keyConcepts, 'en').slice(0, 5), ...skill.tags.slice(0, 3)],
      }
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
      const checklist = finish ? getLocalizedArray(finish.finishChecklist, lang) : details.slice(0, 8).map((detail) => getLocalizedText(detail.correctionCue, lang))
      const falseSignals = finish ? getLocalizedArray(finish.falseFinishSignals, lang) : []
      const diagnoses = [
        ...details.slice(0, 6).map((detail) => ({
          id: `${skill.id}-${detail.id}`,
          title: detail.title,
          likelyCause: detail.commonFailure,
          microFix: detail.correctionCue,
          relatedDetailIds: [detail.id],
        })),
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
        safetyNotes: finish ? getLocalizedArray(finish.safetyNotes, lang) : [],
      }
    })

const escapeMapCategoryFor = (skill: SkillNode): EscapeMapItem['category'] => {
  if (skill.id.includes('back') || skill.domain === 'back_control') return 'back_control'
  if (skill.id.includes('mount')) return 'mount'
  if (skill.id.includes('side-control')) return 'side_control'
  if (skill.domain === 'passing') return 'passing'
  if (skill.domain === 'submission_systems') return 'submission'
  if (skill.tags.includes('front-headlock')) return 'front_headlock'
  if (skill.tags.some((tag) => tag.includes('leg-lock') || tag.includes('heel-hook'))) return 'leg_lock'
  return 'escape'
}

const routeFromReaction = (skill: SkillNode, branch: ReactionBranch, index: number): EscapeRouteItem => ({
  id: `${skill.id}-reaction-${index}`,
  title: branch.opponentReaction,
  earlySignal: branch.bodySignal,
  prevention: branch.bodyMechanicAdjustment,
  ifPreventionFails: branch.recommendedResponse,
  followUpSkillIds: branch.nextSkillIds,
  correctionCue: branch.bodyMechanicAdjustment,
})

const routeFromFailure = (skill: SkillNode, branch: FailureResponse, index: number): EscapeRouteItem => ({
  id: `${skill.id}-failure-${index}`,
  title: branch.failure,
  earlySignal: branch.failure,
  prevention: branch.response,
  ifPreventionFails: branch.response,
  followUpSkillIds: branch.nextSkillIds,
  correctionCue: branch.response,
})

export const getEscapeMaps = (skills: SkillNode[], lang: LanguageCode = 'en'): EscapeMapItem[] =>
  skills
    .filter((skill) => skill.reactionBranches?.length || skill.failureResponses.length)
    .map((skill) => {
      const routes = [
        ...(skill.reactionBranches ?? []).map((branch, index) => routeFromReaction(skill, branch, index)),
        ...skill.failureResponses.map((branch, index) => routeFromFailure(skill, branch, index)),
      ].slice(0, 8)

      return {
        id: `${skill.id}-escape-map`,
        skillId: skill.id,
        title: skill.title,
        overview: lt(
          `Escape map cho ${skill.title.vi}: đọc phản ứng đối thủ sớm, giữ control point và branch trước khi vị trí sụp.`,
          `Escape map for ${skill.title.en}: read opponent reactions early, keep the control point, and branch before the position collapses.`,
          `Escape map pour ${skill.title.fr} : lire la réaction tôt, garder le point de contrôle et brancher avant effondrement.`,
        ),
        category: escapeMapCategoryFor(skill),
        routes,
        priorityPreventions: [
          ...getLocalizedArray(skill.bodyMechanicsSystem.nonNegotiables, lang),
          ...getLocalizedArray(skill.bodyMechanicsSystem.correctionCues, lang),
        ].slice(0, 6),
      }
    })

export const getMasteryStages = (): MasteryStage[] => masteryStages

export const skillHasTroubleshooter = (skill: SkillNode) =>
  Boolean(skill.technicalDetails?.finishingMechanics?.length || skill.domain === 'submission_systems')

export const skillHasEscapeMap = (skill: SkillNode) =>
  Boolean(skill.reactionBranches?.length || skill.failureResponses.length)

export const summarizeTechniqueDetail = (skill: SkillNode, lang: LanguageCode) =>
  skill.technicalDetails?.keyDetails.slice(0, 3).map((detail) => textFromDetail(detail)).map((text) => getLocalizedText(text, lang)) ?? []
