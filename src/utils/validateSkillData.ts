import type { GlossaryTerm } from '../types/glossary'
import type { LocalizedText, SkillNode } from '../types/skill'

export type SkillDataValidationResult = {
  skillCount: number
  glossaryCount: number
  missingTranslations: string[]
  emptyStrings: string[]
  placeholders: string[]
  missingRelatedIds: string[]
  missingPrerequisiteIds: string[]
  missingGlossaryRelatedIds: string[]
  missingBodyMechanics: string[]
  phasesUnderMinimum: string[]
  complexSkillsUnderDepth: string[]
}

export const complexSkillIds = [
  'bodylock-passing',
  'knee-cut-passing',
  'headquarters-passing',
  'front-headlock-defense',
  'back-control',
  'rear-naked-choke-system',
  'guillotine-system',
  'kimura-system',
  'arm-triangle-mount',
  'heel-hook-safety',
  'half-guard-wrestle-up',
  'seated-guard-retention',
  'side-control-escape',
  'mount-escape',
  'sprawl-go-behind',
  'snapdown-front-headlock',
] as const

const placeholderPattern = new RegExp([['TO', 'DO'].join(''), ['Description', 'here'].join(' '), ['Add', 'later'].join(' ')].join('|'), 'i')

const isLocalizedText = (value: unknown): value is LocalizedText => {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Record<string, unknown>
  return ['vi', 'en', 'fr'].every((key) => typeof candidate[key] === 'string')
}

const isLocalizedArray = (value: unknown): value is Record<'vi' | 'en' | 'fr', string[]> => {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Record<string, unknown>
  return ['vi', 'en', 'fr'].every((key) => Array.isArray(candidate[key]))
}

const inspectValue = (value: unknown, path: string, result: SkillDataValidationResult) => {
  if (typeof value === 'string') {
    if (!value.trim()) result.emptyStrings.push(path)
    if (placeholderPattern.test(value)) result.placeholders.push(path)
    return
  }

  if (isLocalizedText(value)) {
    ;(['vi', 'en', 'fr'] as const).forEach((lang) => {
      if (!value[lang]?.trim()) result.missingTranslations.push(`${path}.${lang}`)
      if (placeholderPattern.test(value[lang])) result.placeholders.push(`${path}.${lang}`)
    })
    return
  }

  if (isLocalizedArray(value)) {
    ;(['vi', 'en', 'fr'] as const).forEach((lang) => {
      if (!value[lang].length) result.missingTranslations.push(`${path}.${lang}`)
      value[lang].forEach((item, index) => inspectValue(item, `${path}.${lang}[${index}]`, result))
    })
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => inspectValue(item, `${path}[${index}]`, result))
    return
  }

  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => inspectValue(item, `${path}.${key}`, result))
  }
}

export const validateSkillData = (skills: SkillNode[], glossaryTerms: GlossaryTerm[]): SkillDataValidationResult => {
  const result: SkillDataValidationResult = {
    skillCount: skills.length,
    glossaryCount: glossaryTerms.length,
    missingTranslations: [],
    emptyStrings: [],
    placeholders: [],
    missingRelatedIds: [],
    missingPrerequisiteIds: [],
    missingGlossaryRelatedIds: [],
    missingBodyMechanics: [],
    phasesUnderMinimum: [],
    complexSkillsUnderDepth: [],
  }

  const skillIds = new Set(skills.map((skill) => skill.id))

  skills.forEach((skill) => {
    inspectValue(skill, `skills.${skill.id}`, result)

    skill.relatedSkills.forEach((id) => {
      if (!skillIds.has(id)) result.missingRelatedIds.push(`${skill.id} -> ${id}`)
    })

    skill.prerequisites.forEach((id) => {
      if (!skillIds.has(id)) result.missingPrerequisiteIds.push(`${skill.id} -> ${id}`)
    })

    skill.failureResponses.forEach((failure, index) => {
      failure.nextSkillIds.forEach((id) => {
        if (!skillIds.has(id)) result.missingRelatedIds.push(`${skill.id}.failureResponses[${index}] -> ${id}`)
      })
    })

    skill.reactionBranches?.forEach((branch, index) => {
      branch.nextSkillIds.forEach((id) => {
        if (!skillIds.has(id)) result.missingRelatedIds.push(`${skill.id}.reactionBranches[${index}] -> ${id}`)
      })
    })

    if (!skill.bodyMechanicsSystem) {
      result.missingBodyMechanics.push(skill.id)
      return
    }

    const phases = skill.bodyMechanicsSystem.phases
    if (phases.length < 2) result.phasesUnderMinimum.push(`${skill.id}: ${phases.length} phases`)
    phases.forEach((phase) => {
      if (!phase.bodyPartInstructions.length) result.phasesUnderMinimum.push(`${skill.id}.${phase.id}: no bodyPartInstructions`)
      if (phase.bodyPartInstructions.length < 5) result.phasesUnderMinimum.push(`${skill.id}.${phase.id}: ${phase.bodyPartInstructions.length} bodyPartInstructions`)
      if (phase.connectionPoints.length < 2) result.phasesUnderMinimum.push(`${skill.id}.${phase.id}: ${phase.connectionPoints.length} connectionPoints`)
      if (phase.directionalCues.length < 2) result.phasesUnderMinimum.push(`${skill.id}.${phase.id}: ${phase.directionalCues.length} directionalCues`)
      if (phase.checkpoints.en.length < 3) result.phasesUnderMinimum.push(`${skill.id}.${phase.id}: insufficient checkpoints`)
      if (phase.dangerSignals.en.length < 3) result.phasesUnderMinimum.push(`${skill.id}.${phase.id}: insufficient dangerSignals`)
      if (phase.successSignals.en.length < 3) result.phasesUnderMinimum.push(`${skill.id}.${phase.id}: insufficient successSignals`)
    })

    if (complexSkillIds.includes(skill.id as (typeof complexSkillIds)[number])) {
      const instructionCount = phases.reduce((sum, phase) => sum + phase.bodyPartInstructions.length, 0)
      const connectionCount = phases.reduce((sum, phase) => sum + phase.connectionPoints.length, 0)
      const cueCount = phases.reduce((sum, phase) => sum + phase.directionalCues.length, 0)
      const reactionCount = skill.reactionBranches?.length ?? 0
      if (phases.length < 4 || instructionCount < 20 || connectionCount < 8 || cueCount < 8 || reactionCount < 8) {
        result.complexSkillsUnderDepth.push(
          `${skill.id}: phases=${phases.length}, instructions=${instructionCount}, connections=${connectionCount}, cues=${cueCount}, reactions=${reactionCount}`,
        )
      }
    }
  })

  glossaryTerms.forEach((term) => {
    inspectValue(term, `glossary.${term.id}`, result)
    term.relatedSkillIds?.forEach((id) => {
      if (!skillIds.has(id)) result.missingGlossaryRelatedIds.push(`${term.id} -> ${id}`)
    })
  })

  return result
}

export const hasValidationErrors = (result: SkillDataValidationResult) =>
  [
    result.missingTranslations,
    result.emptyStrings,
    result.placeholders,
    result.missingRelatedIds,
    result.missingPrerequisiteIds,
    result.missingGlossaryRelatedIds,
    result.missingBodyMechanics,
    result.phasesUnderMinimum,
    result.complexSkillsUnderDepth,
  ].some((items) => items.length > 0)
