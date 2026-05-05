import type { LanguageCode, SkillLevel, SkillNode, SkillDomain } from '../types/skill'
import { getLocalizedArray, getLocalizedText } from './localization'

export type SkillSearchFilters = {
  q?: string
  domain?: SkillDomain | ''
  level?: SkillLevel | ''
  tag?: string
}

export const searchSkills = (
  skills: SkillNode[],
  query: string,
  lang: LanguageCode,
  filters: SkillSearchFilters = {},
) => {
  const normalized = query.trim().toLowerCase()
  return skills.filter((skill) => {
    if (filters.domain && skill.domain !== filters.domain) return false
    if (filters.level && skill.level !== filters.level) return false
    if (filters.tag && !skill.tags.includes(filters.tag)) return false
    if (!normalized) return true

    const mechanics = skill.bodyMechanicsSystem
    const mechanicsText = mechanics
      ? [
          getLocalizedText(mechanics.overview, lang),
          mechanics.overview.vi,
          mechanics.overview.en,
          mechanics.overview.fr,
          ...getLocalizedArray(mechanics.globalPrinciples, lang),
          ...mechanics.globalPrinciples.vi,
          ...mechanics.globalPrinciples.en,
          ...mechanics.globalPrinciples.fr,
          ...getLocalizedArray(mechanics.nonNegotiables, lang),
          ...getLocalizedArray(mechanics.commonMechanicalErrors, lang),
          ...mechanics.commonMechanicalErrors.vi,
          ...mechanics.commonMechanicalErrors.en,
          ...mechanics.commonMechanicalErrors.fr,
          ...getLocalizedArray(mechanics.correctionCues, lang),
          ...mechanics.correctionCues.vi,
          ...mechanics.correctionCues.en,
          ...mechanics.correctionCues.fr,
          ...getLocalizedArray(mechanics.safetyNotes, lang),
          ...mechanics.safetyNotes.en,
          ...mechanics.phases.flatMap((phase) => [
            getLocalizedText(phase.name, lang),
            phase.name.en,
            getLocalizedText(phase.objective, lang),
            phase.objective.en,
            ...getLocalizedArray(phase.checkpoints, lang),
            ...phase.checkpoints.en,
            ...getLocalizedArray(phase.dangerSignals, lang),
            ...phase.dangerSignals.en,
            ...getLocalizedArray(phase.successSignals, lang),
            ...phase.successSignals.en,
            ...phase.bodyPartInstructions.flatMap((instruction) => [
              instruction.bodyPart,
              instruction.mechanicType,
              instruction.role,
              getLocalizedText(instruction.instruction, lang),
              instruction.instruction.en,
              getLocalizedText(instruction.whyItMatters, lang),
              instruction.whyItMatters.en,
              ...getLocalizedArray(instruction.commonErrors, lang),
              ...instruction.commonErrors.en,
              ...getLocalizedArray(instruction.correctionCues, lang),
              ...instruction.correctionCues.en,
            ]),
            ...phase.connectionPoints.flatMap((point) => [
              point.yourBodyPart,
              point.opponentBodyPart ?? '',
              point.role,
              getLocalizedText(point.name, lang),
              point.name.en,
              getLocalizedText(point.purpose, lang),
              point.purpose.en,
              point.pressureDirection ? getLocalizedText(point.pressureDirection, lang) : '',
              point.pressureDirection?.en ?? '',
              ...getLocalizedArray(point.commonErrors, lang),
            ]),
            ...phase.directionalCues.flatMap((cue) => [
              cue.direction,
              ...cue.bodyParts,
              getLocalizedText(cue.cue, lang),
              cue.cue.en,
              getLocalizedText(cue.purpose, lang),
              cue.purpose.en,
            ]),
          ]),
          ...(skill.reactionBranches ?? []).flatMap((branch) => [
            getLocalizedText(branch.opponentReaction, lang),
            branch.opponentReaction.en,
            getLocalizedText(branch.bodySignal, lang),
            branch.bodySignal.en,
            getLocalizedText(branch.recommendedResponse, lang),
            branch.recommendedResponse.en,
            getLocalizedText(branch.bodyMechanicAdjustment, lang),
            branch.bodyMechanicAdjustment.en,
          ]),
          ...(skill.technicalDetails
            ? [
                getLocalizedText(skill.technicalDetails.overview, lang),
                skill.technicalDetails.overview.en,
                ...skill.technicalDetails.keyDetails.flatMap((detail) => [
                  detail.category,
                  detail.direction ?? '',
                  ...detail.bodyParts,
                  getLocalizedText(detail.title, lang),
                  detail.title.en,
                  getLocalizedText(detail.instruction, lang),
                  detail.instruction.en,
                  getLocalizedText(detail.whyItWorks, lang),
                  detail.whyItWorks.en,
                  getLocalizedText(detail.correctionCue, lang),
                  detail.correctionCue.en,
                  getLocalizedText(detail.liveRollingCue, lang),
                  detail.liveRollingCue.en,
                ]),
                ...(skill.technicalDetails.finishingMechanics ?? []).flatMap((finish) => [
                  getLocalizedText(finish.breakingMechanic, lang),
                  finish.breakingMechanic.en,
                  ...getLocalizedArray(finish.finishChecklist, lang),
                  ...finish.finishChecklist.en,
                  ...getLocalizedArray(finish.falseFinishSignals, lang),
                  ...finish.falseFinishSignals.en,
                ]),
                ...skill.technicalDetails.microAdjustments.flatMap((adjustment) => [
                  getLocalizedText(adjustment.problem, lang),
                  adjustment.problem.en,
                  getLocalizedText(adjustment.adjustment, lang),
                  adjustment.adjustment.en,
                  ...adjustment.relatedBodyParts,
                ]),
                ...getLocalizedArray(skill.technicalDetails.commonFailurePatterns, lang),
                ...skill.technicalDetails.commonFailurePatterns.en,
                ...getLocalizedArray(skill.technicalDetails.liveCues, lang),
                ...skill.technicalDetails.liveCues.en,
                ...getLocalizedArray(skill.technicalDetails.coachNotes, lang),
                ...skill.technicalDetails.coachNotes.en,
              ]
            : []),
          ...(skill.microDetailSystem
            ? [
                getLocalizedText(skill.microDetailSystem.overview, lang),
                skill.microDetailSystem.overview.en,
                ...skill.microDetailSystem.topFiveDetails.flatMap((detail) => [
                  detail.category,
                  detail.side ?? '',
                  detail.direction ?? '',
                  ...detail.bodyParts,
                  getLocalizedText(detail.title, lang),
                  detail.title.en,
                  getLocalizedText(detail.shortInstruction, lang),
                  detail.shortInstruction.en,
                  getLocalizedText(detail.whyItWorks, lang),
                  detail.whyItWorks.en,
                  getLocalizedText(detail.commonMistake, lang),
                  detail.commonMistake.en,
                  getLocalizedText(detail.correctionCue, lang),
                  detail.correctionCue.en,
                  getLocalizedText(detail.liveCue ?? detail.correctionCue, lang),
                  (detail.liveCue ?? detail.correctionCue).en,
                  detail.safetyNote ? getLocalizedText(detail.safetyNote, lang) : '',
                  detail.safetyNote?.en ?? '',
                ]),
                ...skill.microDetailSystem.leftRightGuides.flatMap((guide) => [
                  getLocalizedText(guide.scenario, lang),
                  guide.scenario.en,
                  getLocalizedText(guide.leftHand, lang),
                  guide.leftHand.en,
                  getLocalizedText(guide.rightHand, lang),
                  guide.rightHand.en,
                  getLocalizedText(guide.note, lang),
                  guide.note.en,
                ]),
                ...skill.microDetailSystem.fastFinishPaths.flatMap((path) => [
                  getLocalizedText(path.title, lang),
                  path.title.en,
                  getLocalizedText(path.finishTrigger, lang),
                  path.finishTrigger.en,
                  getLocalizedText(path.abortSignal, lang),
                  path.abortSignal.en,
                  getLocalizedText(path.nextBestOption, lang),
                  path.nextBestOption.en,
                ]),
                ...skill.microDetailSystem.troubleshootingTips.flatMap((tip) => [
                  getLocalizedText(tip.problem, lang),
                  tip.problem.en,
                  getLocalizedText(tip.quickFix, lang),
                  tip.quickFix.en,
                  getLocalizedText(tip.cue, lang),
                  tip.cue.en,
                ]),
                ...skill.microDetailSystem.doNotDo.vi,
                ...skill.microDetailSystem.doNotDo.en,
                ...skill.microDetailSystem.safetyNotes.vi,
                ...skill.microDetailSystem.safetyNotes.en,
              ]
            : []),
          ...(skill.quickCard
            ? [
                getLocalizedText(skill.quickCard.goal, lang),
                skill.quickCard.goal.en,
                ...getLocalizedArray(skill.quickCard.threeCues, lang),
                ...skill.quickCard.threeCues.en,
                ...skill.quickCard.threeCues.vi,
                ...skill.quickCard.threeCues.fr,
                getLocalizedText(skill.quickCard.doNotDo, lang),
                skill.quickCard.doNotDo.en,
                skill.quickCard.doNotDo.vi,
                skill.quickCard.doNotDo.fr,
                getLocalizedText(skill.quickCard.ifItFails, lang),
                skill.quickCard.ifItFails.en,
                skill.quickCard.ifItFails.vi,
                skill.quickCard.ifItFails.fr,
                skill.quickCard.safetyReminder ? getLocalizedText(skill.quickCard.safetyReminder, lang) : '',
                skill.quickCard.safetyReminder?.en ?? '',
                skill.quickCard.safetyReminder?.vi ?? '',
                skill.quickCard.safetyReminder?.fr ?? '',
              ]
            : []),
          ...(skill.qualityChecklist
            ? [
                getLocalizedText(skill.qualityChecklist.overview, lang),
                skill.qualityChecklist.overview.en,
                ...skill.qualityChecklist.checks.flatMap((checkItem) => [
                  getLocalizedText(checkItem.title, lang),
                  checkItem.title.en,
                  getLocalizedText(checkItem.question, lang),
                  checkItem.question.en,
                  getLocalizedText(checkItem.successSignal, lang),
                  checkItem.successSignal.en,
                  getLocalizedText(checkItem.failureSignal, lang),
                  checkItem.failureSignal.en,
                  getLocalizedText(checkItem.quickFix, lang),
                  checkItem.quickFix.en,
                  ...checkItem.bodyParts,
                ]),
                getLocalizedText(skill.qualityChecklist.ifPassed, lang),
                skill.qualityChecklist.ifPassed.en,
                getLocalizedText(skill.qualityChecklist.ifFailed, lang),
                skill.qualityChecklist.ifFailed.en,
              ]
            : []),
          ]
      : []

    const haystack = [
      getLocalizedText(skill.title, lang),
      skill.title.en,
      skill.title.vi,
      getLocalizedText(skill.shortDescription, lang),
      getLocalizedText(skill.situation, lang),
      getLocalizedText(skill.primaryGoal, lang),
      ...getLocalizedArray(skill.keyConcepts, lang),
      ...skill.keyConcepts.en,
      ...skill.dangerSignals.en,
      ...skill.commonMistakes.en,
      ...skill.commonMistakes.vi,
      ...Object.values(skill.bodyChecklist).flatMap((text) => [getLocalizedText(text, lang), text.en, text.vi]),
      ...mechanicsText,
      ...skill.tags,
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(normalized)
  })
}
