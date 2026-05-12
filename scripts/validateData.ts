import { existsSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { sharedKnowledgeItems } from '../src/data/sharedKnowledge'
import { glossaryTerms } from '../src/data/glossaryTerms'
import { skillDomains } from '../src/data/domains'
import { skillNodes } from '../src/data/skillNodes'
import { techniqueStateMachines } from '../src/data/techniqueStateMachines'
import { technicalTargetSkillIds } from '../src/data/technicalDetails'
import { findDuplicateBlocks } from '../src/utils/contentQuality'
import { getEscapeMaps, getTechniqueChains, getTroubleshooters } from '../src/utils/knowledgeModules'
import { getNextBestLinksForSkill } from '../src/utils/knowledgeGraph'

type Lang = 'vi' | 'en' | 'fr'
type AnyRecord = Record<string, unknown>

type DataSet = {
  name: string
  label: string
  items: AnyRecord[]
  optional: boolean
}

type ValidationReport = {
  counts: Record<string, number>
  errors: string[]
  warnings: string[]
  brokenReferences: string[]
}

const langs: Lang[] = ['vi', 'en', 'fr']
const placeholderPattern = new RegExp([['TO', 'DO'].join(''), ['Description', 'here'].join(' '), ['Add', 'later'].join(' ')].join('|'), 'i')
const safetyTerms = ['leg-lock', 'heel-hook', 'ankle-lock', 'knee-safety', 'neck-safety', 'choke', 'front-headlock', 'spine']
const technicalSubmissionTargets = new Set(['rear-naked-choke-system', 'guillotine-system', 'arm-triangle-mount', 'kimura-system', 'straight-ankle-lock-safety', 'heel-hook-safety'])
const technicalSafetyTargets = new Set(['rear-naked-choke-system', 'guillotine-system', 'arm-triangle-mount', 'kimura-system', 'straight-ankle-lock-safety', 'heel-hook-safety', 'front-headlock-defense'])
const microDetailTargets = new Set(['rear-naked-choke-system', 'arm-triangle-mount', 'bodylock-passing', 'heel-hook-safety', 'side-control-escape'])
const qualityChecklistTargets = new Set([
  'rear-naked-choke-system',
  'guillotine-system',
  'arm-triangle-mount',
  'kimura-system',
  'straight-ankle-lock-safety',
  'heel-hook-safety',
  'bodylock-passing',
  'knee-cut-passing',
  'headquarters-passing',
  'back-control',
  'mount-control',
  'side-control-pin',
  'side-control-escape',
  'mount-escape',
  'back-escape',
  'front-headlock-defense',
  'leg-lock-safety-basics',
  'half-guard-wrestle-up',
  'side-control-survival',
  'mount-survival',
])
const topThirtySkillIds = new Set([
  'side-control-survival',
  'side-control-escape',
  'mount-survival',
  'mount-escape',
  'back-survival',
  'back-escape',
  'front-headlock-defense',
  'leg-lock-safety-basics',
  'seated-guard-retention',
  'supine-guard-retention',
  'half-guard-knee-shield',
  'half-guard-wrestle-up',
  'shin-to-shin-entry',
  'single-leg-x-basics',
  'k-guard-entry',
  'hand-fighting',
  'snapdown-front-headlock',
  'single-leg-bjj',
  'sprawl-go-behind',
  'technical-stand-up',
  'bodylock-passing',
  'knee-cut-passing',
  'headquarters-passing',
  'side-control-pin',
  'mount-control',
  'back-control',
  'rear-naked-choke-system',
  'guillotine-system',
  'arm-triangle-mount',
  'kimura-system',
])

const blackbeltBodyToBodyTargets = new Set([
  'rear-naked-choke-system',
  'guillotine-system',
  'arm-triangle-mount',
  'kimura-system',
  'straight-ankle-lock-safety',
  'heel-hook-safety',
  'bodylock-passing',
])

const optionalDataModules = [
  {
    name: 'concepts',
    label: 'concepts',
    path: 'src/data/concepts.ts',
    exports: ['concepts', 'conceptNodes', 'conceptData'],
  },
  {
    name: 'positions',
    label: 'positions',
    path: 'src/data/positions.ts',
    exports: ['positions', 'positionNodes', 'positionData'],
  },
  {
    name: 'trainingMethods',
    label: 'training methods',
    path: 'src/data/trainingMethods.ts',
    exports: ['trainingMethods', 'trainingMethodData'],
  },
  {
    name: 'defensiveLayers',
    label: 'defensive layers',
    path: 'src/data/defensiveLayers.ts',
    exports: ['defensiveLayers', 'defensiveLayerData'],
  },
  {
    name: 'archetypes',
    label: 'archetypes',
    path: 'src/data/archetypes.ts',
    exports: ['archetypes', 'gameArchetypes', 'archetypeData'],
  },
  {
    name: 'curriculumPaths',
    label: 'curriculum paths',
    path: 'src/data/curriculumPaths.ts',
    exports: ['curriculumPaths', 'curricula', 'curriculumData'],
  },
  {
    name: 'journalSeedData',
    label: 'journal seed data',
    path: 'src/data/journalSeedData.ts',
    exports: ['journalSeedData', 'journalEntries', 'seedJournalEntries'],
  },
  {
    name: 'sharedKnowledge',
    label: 'shared knowledge',
    path: 'src/data/sharedKnowledge.ts',
    exports: ['sharedKnowledgeItems'],
  },
]

const isRecord = (value: unknown): value is AnyRecord => Boolean(value) && typeof value === 'object' && !Array.isArray(value)

const isLocalizedText = (value: unknown): value is Record<Lang, string> =>
  isRecord(value) && langs.every((lang) => typeof value[lang] === 'string')

const isLocalizedArray = (value: unknown): value is Record<Lang, string[]> =>
  isRecord(value) && langs.every((lang) => Array.isArray(value[lang]))

const asArray = (value: unknown): AnyRecord[] => (Array.isArray(value) ? value.filter(isRecord) : [])

const firstArrayExport = (moduleValue: AnyRecord, exportNames: string[]) => {
  for (const exportName of exportNames) {
    const value = moduleValue[exportName]
    if (Array.isArray(value)) return asArray(value)
  }
  return []
}

const loadOptionalDataSet = async (definition: (typeof optionalDataModules)[number]): Promise<DataSet> => {
  if (!existsSync(definition.path)) {
    return { name: definition.name, label: definition.label, items: [], optional: true }
  }

  const moduleValue = (await import(pathToFileURL(`${process.cwd()}/${definition.path}`).href)) as AnyRecord
  return {
    name: definition.name,
    label: definition.label,
    items: firstArrayExport(moduleValue, definition.exports),
    optional: true,
  }
}

const addError = (report: ValidationReport, message: string) => report.errors.push(message)
const addWarning = (report: ValidationReport, message: string) => report.warnings.push(message)
const addBrokenReference = (report: ValidationReport, message: string) => {
  report.brokenReferences.push(message)
  report.errors.push(`Broken reference: ${message}`)
}

const checkString = (report: ValidationReport, path: string, value: string) => {
  if (!value.trim()) addError(report, `${path} is empty`)
  if (placeholderPattern.test(value)) addError(report, `${path} contains placeholder text`)
}

const walkLocalizedContent = (report: ValidationReport, path: string, value: unknown) => {
  if (typeof value === 'string') {
    checkString(report, path, value)
    return
  }

  if (isLocalizedText(value)) {
    langs.forEach((lang) => checkString(report, `${path}.${lang}`, value[lang]))
    return
  }

  if (isLocalizedArray(value)) {
    langs.forEach((lang) => {
      if (!value[lang].length) addError(report, `${path}.${lang} has no items`)
      value[lang].forEach((item, index) => checkString(report, `${path}.${lang}[${index}]`, item))
    })
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => walkLocalizedContent(report, `${path}[${index}]`, item))
    return
  }

  if (isRecord(value)) {
    Object.entries(value).forEach(([key, child]) => walkLocalizedContent(report, `${path}.${key}`, child))
  }
}

const checkUniqueIds = (report: ValidationReport, dataSet: DataSet) => {
  const seen = new Set<string>()
  dataSet.items.forEach((item, index) => {
    const id = item.id
    if (typeof id !== 'string' || !id.trim()) {
      addError(report, `${dataSet.name}[${index}] is missing a string id`)
      return
    }
    if (seen.has(id)) addError(report, `${dataSet.name} has duplicate id "${id}"`)
    seen.add(id)
  })
}

const hasMeaningfulLocalizedText = (value: unknown, minLength: number) =>
  isLocalizedText(value) && langs.every((lang) => value[lang].trim().length >= minLength)

const textIncludesAny = (value: unknown, terms: string[]) => {
  const haystack = JSON.stringify(value).toLowerCase()
  return terms.some((term) => haystack.includes(term.toLowerCase()))
}

const bodySideValues = new Set(['left', 'right', 'near', 'far', 'inside', 'outside', 'top', 'bottom', 'center', 'both', 'either'])
const bodyPartValues = new Set([
  'head',
  'eyes',
  'ear',
  'chin',
  'neck',
  'shoulder',
  'chest',
  'sternum',
  'ribs',
  'spine',
  'hip',
  'pelvis',
  'hand',
  'wrist',
  'forearm',
  'elbow',
  'biceps',
  'triceps',
  'knee',
  'thigh',
  'shin',
  'ankle',
  'heel',
  'toes',
  'foot',
])
const bodyWords = ['hand', 'wrist', 'forearm', 'elbow', 'head', 'shoulder', 'chest', 'hip', 'knee', 'shin', 'foot', 'heel', 'tay', 'cổ tay', 'cẳng tay', 'khuỷu', 'đầu', 'vai', 'ngực', 'hông', 'gối', 'ống quyển', 'chân', 'gót', 'main', 'poignet', 'avant-bras', 'coude', 'tête', 'épaule', 'poitrine', 'hanche', 'genou', 'tibia', 'pied', 'talon']
const directionWords = ['left', 'right', 'near', 'far', 'inside', 'outside', 'across', 'diagonal', 'down', 'up', 'toward', 'away', 'rotate', 'pull', 'push', 'drive', 'pin', 'line', 'centerline', 'under', 'over', 'low', 'high', 'close', 'open', 'block', 'bên trái', 'bên phải', 'gần', 'xa', 'trong', 'ngoài', 'chéo', 'xuống', 'lên', 'về phía', 'ra xa', 'xoay', 'kéo', 'đẩy', 'ép', 'ghim', 'line', 'đường', 'dưới', 'trên', 'thấp', 'cao', 'đóng', 'mở', 'chặn', 'gauche', 'droite', 'proche', 'éloigné', 'intérieur', 'extérieur', 'diagonale', 'bas', 'haut', 'vers', 'loin', 'tourne', 'tirer', 'pousser', 'bloque', 'ligne', 'sous', 'sur', 'ferme', 'ouvre']
const bodyToBodyRoleMarkers: Record<Lang, { me: string[]; opponent: string[] }> = {
  en: { me: ['my ', "i ", "i'm "], opponent: ['opponent', 'their ', "they "] },
  vi: { me: ['tôi', 'của tôi', 'mình'], opponent: ['đối thủ', 'họ'] },
  fr: { me: ['mon ', 'ma ', 'mes ', 'je '], opponent: ['adversaire', 'adverse', 'son ', 'sa ', 'ses '] },
}

const localizedValue = (value: unknown, lang: Lang) => (isLocalizedText(value) ? value[lang].toLowerCase() : '')

const addDataClarityWarning = (report: ValidationReport, message: string) => {
  report.counts.bodyToBodyClarityWarnings = (report.counts.bodyToBodyClarityWarnings ?? 0) + 1
  if (report.counts.bodyToBodyClarityWarnings <= 20) {
    addWarning(report, `Data clarity: ${message}`)
  }
}

const validateSkills = (report: ValidationReport, skills: AnyRecord[], glossary: AnyRecord[], optionalSets: DataSet[]) => {
  const skillIds = new Set(skills.map((skill) => skill.id).filter((id): id is string => typeof id === 'string'))
  const conceptIds = new Set(optionalSets.find((set) => set.name === 'concepts')?.items.map((item) => item.id).filter((id): id is string => typeof id === 'string') ?? [])
  const positionIds = new Set(optionalSets.find((set) => set.name === 'positions')?.items.map((item) => item.id).filter((id): id is string => typeof id === 'string') ?? [])
  const sharedKnowledgeIds = new Set(sharedKnowledgeItems.map((item) => item.id))
  const domains = new Set(skillDomains)
  const microDetailIds = new Set(
    skills.flatMap((skill) =>
      isRecord(skill.microDetailSystem) && Array.isArray(skill.microDetailSystem.topFiveDetails)
        ? skill.microDetailSystem.topFiveDetails.map((detail) => detail.id).filter((id): id is string => typeof id === 'string')
        : [],
    ),
  )
  const validKnowledgeRefs = new Set<string>([
    ...skillIds,
    ...conceptIds,
    ...positionIds,
    ...sharedKnowledgeIds,
    ...microDetailIds,
  ])

  skills.forEach((skill, index) => {
    const path = `skills.${String(skill.id ?? index)}`
    ;['id', 'title', 'domain', 'level', 'shortDescription', 'whyItMatters', 'situation', 'primaryGoal'].forEach((field) => {
      if (skill[field] === undefined || skill[field] === null) addError(report, `${path}.${field} is required`)
    })

    if (typeof skill.domain === 'string' && !domains.has(skill.domain as never)) {
      addError(report, `${path}.domain "${skill.domain}" is not in domains.ts`)
    }

    if (!hasMeaningfulLocalizedText(skill.shortDescription, 24)) {
      addError(report, `${path}.shortDescription must be meaningful in vi/en/fr`)
    }

    if (!hasMeaningfulLocalizedText(skill.whyItMatters, 32)) {
      addWarning(report, `${path}.whyItMatters is short; consider deepening the explanation`)
    }

    ;['title', 'shortDescription', 'whyItMatters', 'situation', 'primaryGoal'].forEach((field) => {
      walkLocalizedContent(report, `${path}.${field}`, skill[field])
    })

    walkLocalizedContent(report, `${path}.keyConcepts`, skill.keyConcepts)
    walkLocalizedContent(report, `${path}.bodyChecklist`, skill.bodyChecklist)
    walkLocalizedContent(report, `${path}.decisionTree`, skill.decisionTree)
    walkLocalizedContent(report, `${path}.dangerSignals`, skill.dangerSignals)
    walkLocalizedContent(report, `${path}.commonMistakes`, skill.commonMistakes)
    walkLocalizedContent(report, `${path}.failureResponses`, skill.failureResponses)
    walkLocalizedContent(report, `${path}.drills`, skill.drills)
    walkLocalizedContent(report, `${path}.skillTests`, skill.skillTests)
    walkLocalizedContent(report, `${path}.bodyMechanicsSystem`, skill.bodyMechanicsSystem)
    walkLocalizedContent(report, `${path}.positionalRelationships`, skill.positionalRelationships)
    walkLocalizedContent(report, `${path}.reactionBranches`, skill.reactionBranches)
    walkLocalizedContent(report, `${path}.ifThenDecisions`, skill.ifThenDecisions)
    walkLocalizedContent(report, `${path}.technicalDetails`, skill.technicalDetails)
    walkLocalizedContent(report, `${path}.microDetailSystem`, skill.microDetailSystem)
    walkLocalizedContent(report, `${path}.quickCard`, skill.quickCard)
    walkLocalizedContent(report, `${path}.qualityChecklist`, skill.qualityChecklist)
    walkLocalizedContent(report, `${path}.bodyToBodyDetails`, skill.bodyToBodyDetails)
    walkLocalizedContent(report, `${path}.blackbeltDetails`, skill.blackbeltDetails)
    walkLocalizedContent(report, `${path}.rulesetRelevance`, skill.rulesetRelevance)
    walkLocalizedContent(report, `${path}.sharedPrincipleIds`, skill.sharedPrincipleIds)
    walkLocalizedContent(report, `${path}.sharedCueIds`, skill.sharedCueIds)
    walkLocalizedContent(report, `${path}.sharedErrorIds`, skill.sharedErrorIds)
    walkLocalizedContent(report, `${path}.sharedSafetyIds`, skill.sharedSafetyIds)
    walkLocalizedContent(report, `${path}.sharedMechanicIds`, skill.sharedMechanicIds)
    ;[
      skill.sharedPrincipleIds,
      skill.sharedCueIds,
      skill.sharedErrorIds,
      skill.sharedSafetyIds,
      skill.sharedMechanicIds,
    ]
      .flat()
      .filter((id): id is string => typeof id === 'string')
      .forEach((id) => {
        if (!sharedKnowledgeIds.has(id)) addBrokenReference(report, `${path}.sharedKnowledge -> ${String(id)}`)
      })

    const relatedSkills = Array.isArray(skill.relatedSkills) ? skill.relatedSkills : []
    relatedSkills.forEach((id) => {
      if (typeof id !== 'string' || !skillIds.has(id)) addBrokenReference(report, `${path}.relatedSkills -> ${String(id)}`)
    })

    const prerequisites = Array.isArray(skill.prerequisites) ? skill.prerequisites : []
    prerequisites.forEach((id) => {
      if (typeof id !== 'string' || !skillIds.has(id)) addBrokenReference(report, `${path}.prerequisites -> ${String(id)}`)
    })

    const tags = Array.isArray(skill.tags) ? skill.tags.map(String) : []
    const isModernTechnique = Boolean(skill.libraryTier) || tags.some((tag) => tag === 'modern-no-gi' || tag.startsWith('tier:'))
    if (isModernTechnique) {
      ;['libraryTier', 'metaStatus', 'riskLevel', 'techniqueFamily', 'modernSystemGroup'].forEach((field) => {
        if (!skill[field]) addWarning(report, `${path}.${field} is missing on modern technique`)
      })
      if (!skill.microDetailSystem) addWarning(report, `${path}.microDetailSystem is missing on modern technique`)
      if (!skill.qualityChecklist) addWarning(report, `${path}.qualityChecklist is missing on modern technique`)
      if (!skill.quickCard) addWarning(report, `${path}.quickCard is missing on modern technique`)
      if (!skill.bodyToBodyDetails) addWarning(report, `${path}.bodyToBodyDetails is missing on modern technique`)
    }

    if ((skill.libraryTier === 'advanced_niche' || skill.riskLevel === 'safety_critical') && prerequisites.length === 0) {
      addWarning(report, `${path} is advanced or safety-critical but has no prerequisites`)
    }

    const failureResponses = Array.isArray(skill.failureResponses) ? skill.failureResponses : []
    failureResponses.forEach((failure, failureIndex) => {
      if (!isRecord(failure) || !Array.isArray(failure.nextSkillIds)) return
      failure.nextSkillIds.forEach((id) => {
        if (typeof id !== 'string' || !skillIds.has(id)) addBrokenReference(report, `${path}.failureResponses[${failureIndex}].nextSkillIds -> ${String(id)}`)
      })
    })

    const reactionBranches = Array.isArray(skill.reactionBranches) ? skill.reactionBranches : []
    reactionBranches.forEach((branch, branchIndex) => {
      if (!isRecord(branch) || !Array.isArray(branch.nextSkillIds)) return
      branch.nextSkillIds.forEach((id) => {
        if (typeof id !== 'string' || !skillIds.has(id)) addBrokenReference(report, `${path}.reactionBranches[${branchIndex}].nextSkillIds -> ${String(id)}`)
      })
    })

    const ifThenDecisions = Array.isArray(skill.ifThenDecisions) ? skill.ifThenDecisions : []
    ifThenDecisions.forEach((decision, decisionIndex) => {
      if (!isRecord(decision) || !Array.isArray(decision.nextSkillIds)) return
      decision.nextSkillIds.forEach((id) => {
        if (typeof id !== 'string' || !skillIds.has(id)) addBrokenReference(report, `${path}.ifThenDecisions[${decisionIndex}].nextSkillIds -> ${String(id)}`)
      })
    })

    const relatedConceptIds = Array.isArray(skill.relatedConceptIds) ? skill.relatedConceptIds : []
    relatedConceptIds.forEach((id) => {
      if (conceptIds.size && (typeof id !== 'string' || !conceptIds.has(id))) addBrokenReference(report, `${path}.relatedConceptIds -> ${String(id)}`)
    })

    const relatedPositionIds = Array.isArray(skill.relatedPositionIds) ? skill.relatedPositionIds : []
    relatedPositionIds.forEach((id) => {
      if (positionIds.size && (typeof id !== 'string' || !positionIds.has(id))) addBrokenReference(report, `${path}.relatedPositionIds -> ${String(id)}`)
    })

    if (textIncludesAny(skill, safetyTerms) && !textIncludesAny(skill, ['tap early', 'tap sớm', 'supervision', 'giám sát', 'qualified', 'knee line', 'neck', 'spine', 'cổ', 'gối', 'cột sống'])) {
      addError(report, `${path} is safety-sensitive but does not mention safety guidance`)
    }

    if (technicalTargetSkillIds.includes(String(skill.id))) {
      const technicalDetails = isRecord(skill.technicalDetails) ? skill.technicalDetails : undefined
      if (!technicalDetails) {
        addError(report, `${path}.technicalDetails is required for technical target skill`)
      } else {
        const keyDetails = Array.isArray(technicalDetails.keyDetails) ? technicalDetails.keyDetails : []
        const microAdjustments = Array.isArray(technicalDetails.microAdjustments) ? technicalDetails.microAdjustments : []
        if (keyDetails.length < 10) addError(report, `${path}.technicalDetails.keyDetails must have at least 10 items`)
        if (microAdjustments.length < 5) addError(report, `${path}.technicalDetails.microAdjustments must have at least 5 items`)
        if (!isLocalizedArray(technicalDetails.commonFailurePatterns) || technicalDetails.commonFailurePatterns.en.length < 5) {
          addError(report, `${path}.technicalDetails.commonFailurePatterns must have at least 5 items`)
        }
        if (!isLocalizedArray(technicalDetails.liveCues) || technicalDetails.liveCues.en.length < 5) {
          addError(report, `${path}.technicalDetails.liveCues must have at least 5 items`)
        }
        if (!isLocalizedArray(technicalDetails.coachNotes) || technicalDetails.coachNotes.en.length < 3) {
          addError(report, `${path}.technicalDetails.coachNotes must have at least 3 items`)
        }
        if (technicalSubmissionTargets.has(String(skill.id)) && (!Array.isArray(technicalDetails.finishingMechanics) || !technicalDetails.finishingMechanics.length)) {
          addError(report, `${path}.technicalDetails.finishingMechanics is required for submission target`)
        }
        if (technicalSafetyTargets.has(String(skill.id)) && !textIncludesAny(technicalDetails, ['tap early', 'tap sớm', 'supervision', 'qualified', 'giám sát', 'không crank', 'do not crank'])) {
          addError(report, `${path}.technicalDetails must include explicit safety guidance`)
        }
      }
    }

    if (microDetailTargets.has(String(skill.id))) {
      const microDetailSystem = isRecord(skill.microDetailSystem) ? skill.microDetailSystem : undefined
      if (!microDetailSystem) {
        addError(report, `${path}.microDetailSystem is required for micro detail target skill`)
      } else {
        const topFiveDetails = Array.isArray(microDetailSystem.topFiveDetails) ? microDetailSystem.topFiveDetails : []
        const leftRightGuides = Array.isArray(microDetailSystem.leftRightGuides) ? microDetailSystem.leftRightGuides : []
        const fastFinishPaths = Array.isArray(microDetailSystem.fastFinishPaths) ? microDetailSystem.fastFinishPaths : []
        const troubleshootingTips = Array.isArray(microDetailSystem.troubleshootingTips) ? microDetailSystem.troubleshootingTips : []
        if (topFiveDetails.length < 5) addError(report, `${path}.microDetailSystem.topFiveDetails must have at least 5 items`)
        topFiveDetails.forEach((detail, detailIndex) => {
          if (!isRecord(detail)) return
          const hasStructuredBody = Array.isArray(detail.bodyParts) && detail.bodyParts.some((bodyPart) => typeof bodyPart === 'string' && bodyPart.trim().length > 0)
          const hasStructuredDirection = typeof detail.direction === 'string' && detail.direction.trim().length > 0
          langs.forEach((lang) => {
            const instruction = localizedValue(detail.shortInstruction, lang)
            const cue = localizedValue(detail.correctionCue, lang)
            const namesBody = textIncludesAny(instruction, bodyWords) || hasStructuredBody
            const namesDirection = textIncludesAny(instruction, directionWords) || hasStructuredDirection
            if (instruction && (!namesBody || !namesDirection)) {
              addDataClarityWarning(report, `${path}.microDetailSystem.topFiveDetails[${detailIndex}].shortInstruction.${lang} should name body part and direction`)
            }
            if (cue && cue.length > 80) {
              addDataClarityWarning(report, `${path}.microDetailSystem.topFiveDetails[${detailIndex}].correctionCue.${lang} is long for a live cue`)
            }
          })
        })
        if (leftRightGuides.length < 2) addError(report, `${path}.microDetailSystem.leftRightGuides must have at least 2 items`)
        if (troubleshootingTips.length < 5) addError(report, `${path}.microDetailSystem.troubleshootingTips must have at least 5 items`)
        if (!isLocalizedArray(microDetailSystem.doNotDo) || microDetailSystem.doNotDo.en.length < 5) addError(report, `${path}.microDetailSystem.doNotDo must have at least 5 items`)
        if (!isLocalizedArray(microDetailSystem.safetyNotes) || microDetailSystem.safetyNotes.en.length < 3) addError(report, `${path}.microDetailSystem.safetyNotes must be localized and non-empty`)
        if (technicalSubmissionTargets.has(String(skill.id)) && !fastFinishPaths.length) {
          addError(report, `${path}.microDetailSystem.fastFinishPaths is required for submission target`)
        }
      }

      const quickCard = isRecord(skill.quickCard) ? skill.quickCard : undefined
      if (!quickCard) {
        addError(report, `${path}.quickCard is required for micro detail target skill`)
      } else {
        walkLocalizedContent(report, `${path}.quickCard`, quickCard)
        const threeCues = isRecord(quickCard.threeCues) ? quickCard.threeCues : undefined
        if (!threeCues || !Array.isArray(threeCues.vi) || threeCues.vi.length !== 3 || !Array.isArray(threeCues.en) || threeCues.en.length !== 3 || !Array.isArray(threeCues.fr) || threeCues.fr.length !== 3) {
          addError(report, `${path}.quickCard.threeCues must contain exactly 3 localized cues`)
        }
        if (technicalSafetyTargets.has(String(skill.id)) && !textIncludesAny(quickCard, ['tap early', 'tap sớm', 'supervision', 'giám sát', 'qualified', 'knee line', 'neck', 'spine', 'cổ', 'gối', 'cột sống'])) {
          addError(report, `${path}.quickCard must include explicit safety guidance`)
        }
      }
    }

    if (qualityChecklistTargets.has(String(skill.id))) {
      const qualityChecklist = isRecord(skill.qualityChecklist) ? skill.qualityChecklist : undefined
      if (!qualityChecklist) {
        addError(report, `${path}.qualityChecklist is required for checklist target skill`)
      } else {
        const checks = Array.isArray(qualityChecklist.checks) ? qualityChecklist.checks : []
        const criticalChecks = checks.filter((check) => isRecord(check) && check.severity === 'critical')
        if (checks.length < 6) addError(report, `${path}.qualityChecklist.checks must have at least 6 items`)
        if (criticalChecks.length < 2) addError(report, `${path}.qualityChecklist must have at least 2 critical checks`)
        checks.forEach((item, checkIndex) => {
          const checkPath = `${path}.qualityChecklist.checks[${checkIndex}]`
          if (isRecord(item) && Array.isArray(item.relatedMicroDetailIds) && item.relatedMicroDetailIds.length) {
            const unresolved = item.relatedMicroDetailIds.filter((id) => typeof id !== 'string' || !validKnowledgeRefs.has(id))
            if (unresolved.length) {
              addWarning(report, `${checkPath}.relatedMicroDetailIds contains unresolved optional references: ${unresolved.join(', ')}`)
            }
          }
        })
      }
    }

    const sharedReferenceCount = [
      skill.sharedPrincipleIds,
      skill.sharedCueIds,
      skill.sharedErrorIds,
      skill.sharedSafetyIds,
      skill.sharedMechanicIds,
    ]
      .flat()
      .filter((id) => typeof id === 'string').length

    if (topThirtySkillIds.has(String(skill.id)) && sharedReferenceCount < 5) {
      addWarning(report, `${path} has only ${sharedReferenceCount} shared knowledge references`)
    }

    const bodyToBodyDetails = isRecord(skill.bodyToBodyDetails) ? skill.bodyToBodyDetails : undefined
    if (blackbeltBodyToBodyTargets.has(String(skill.id)) && !bodyToBodyDetails) {
      addWarning(report, `${path}.bodyToBodyDetails is missing for blackbelt target skill`)
    }
    if (bodyToBodyDetails) {
      const phases = Array.isArray(bodyToBodyDetails.phases) ? bodyToBodyDetails.phases.filter(isRecord) : []
      const contactIds = new Set<string>()
      if (phases.length < 3) addWarning(report, `${path}.bodyToBodyDetails has fewer than 3 phases`)
      let contactCount = 0
      phases.forEach((phase, phaseIndex) => {
        const contacts = Array.isArray(phase.contacts) ? phase.contacts.filter(isRecord) : []
        contactCount += contacts.length
        contacts.forEach((contact, contactIndex) => {
          const contactPath = `${path}.bodyToBodyDetails.phases[${phaseIndex}].contacts[${contactIndex}]`
          const id = contact.id
          if (typeof id !== 'string' || !id.trim()) addError(report, `${contactPath}.id is required`)
          else if (contactIds.has(id)) addError(report, `${path}.bodyToBodyDetails has duplicate contact id "${id}"`)
          else contactIds.add(id)

          const myBodyPart = isRecord(contact.myBodyPart) ? contact.myBodyPart : undefined
          const opponentBodyPart = isRecord(contact.opponentBodyPart) ? contact.opponentBodyPart : undefined
          if (!myBodyPart || myBodyPart.role !== 'me') addError(report, `${contactPath}.myBodyPart.role must be "me"`)
          if (!opponentBodyPart || opponentBodyPart.role !== 'opponent') addError(report, `${contactPath}.opponentBodyPart.role must be "opponent"`)
          if (myBodyPart) {
            if (!bodySideValues.has(String(myBodyPart.side))) addError(report, `${contactPath}.myBodyPart.side "${String(myBodyPart.side)}" is invalid`)
            if (!bodyPartValues.has(String(myBodyPart.bodyPart))) addError(report, `${contactPath}.myBodyPart.bodyPart "${String(myBodyPart.bodyPart)}" is invalid`)
            if (String(myBodyPart.side) === 'either' && !myBodyPart.detail) addDataClarityWarning(report, `${contactPath}.myBodyPart uses either-side without detail`)
          }
          if (opponentBodyPart) {
            if (!bodySideValues.has(String(opponentBodyPart.side))) addError(report, `${contactPath}.opponentBodyPart.side "${String(opponentBodyPart.side)}" is invalid`)
            if (!bodyPartValues.has(String(opponentBodyPart.bodyPart))) addError(report, `${contactPath}.opponentBodyPart.bodyPart "${String(opponentBodyPart.bodyPart)}" is invalid`)
            if (String(opponentBodyPart.side) === 'either' && !opponentBodyPart.detail) addDataClarityWarning(report, `${contactPath}.opponentBodyPart uses either-side without detail`)
          }
          ;['title', 'contactType', 'exactInstruction', 'whyItWorks', 'commonMisplacement', 'correctionCue', 'liveCue'].forEach((field) => {
            if (contact[field] === undefined || contact[field] === null) addError(report, `${contactPath}.${field} is required`)
          })
          langs.forEach((lang) => {
            const exactInstruction = localizedValue(contact.exactInstruction, lang)
            const markers = bodyToBodyRoleMarkers[lang]
            if (exactInstruction && (!markers.me.some((marker) => exactInstruction.includes(marker)) || !markers.opponent.some((marker) => exactInstruction.includes(marker)))) {
              addDataClarityWarning(report, `${contactPath}.exactInstruction.${lang} should explicitly say my body part and opponent body part`)
            }
          })
          if (!contact.forceDirection) addWarning(report, `${contactPath}.forceDirection is missing`)
          if (textIncludesAny(skill, safetyTerms) && !contact.safetyNote && String(contact.contactType) === 'finish_pressure') {
            addWarning(report, `${contactPath} is finish pressure on safety-sensitive skill without local safetyNote`)
          }
        })
      })
      if (contactCount < 4) addWarning(report, `${path}.bodyToBodyDetails has fewer than 4 contacts`)
    }
  })

  glossary.forEach((term, index) => {
    const path = `glossary.${String(term.id ?? index)}`
    ;['id', 'term', 'definition', 'examples'].forEach((field) => {
      if (term[field] === undefined || term[field] === null) addError(report, `${path}.${field} is required`)
    })
    walkLocalizedContent(report, path, term)
    const relatedSkillIds = Array.isArray(term.relatedSkillIds) ? term.relatedSkillIds : []
    relatedSkillIds.forEach((id) => {
      if (typeof id !== 'string' || !skillIds.has(id)) addBrokenReference(report, `${path}.relatedSkillIds -> ${String(id)}`)
    })
  })
}

const validateStateMachines = (report: ValidationReport, stateMachines: AnyRecord[], skills: AnyRecord[], optionalSets: DataSet[]) => {
  const skillIds = new Set(skills.map((skill) => skill.id).filter((id): id is string => typeof id === 'string'))
  const positionIds = new Set(optionalSets.find((set) => set.name === 'positions')?.items.map((item) => item.id).filter((id): id is string => typeof id === 'string') ?? [])
  const safetyCriticalSkillIds = new Set(
    skills
      .filter((skill) =>
        skill.libraryTier === 'safety_critical' ||
        skill.riskLevel === 'safety_critical' ||
        (Array.isArray(skill.tags) && skill.tags.some((tag) => ['heel-hook', 'neck-safety', 'shoulder-lock-safety', 'smother', 'buggy-choke', 'false-reap'].includes(String(tag)))),
      )
      .map((skill) => String(skill.id)),
  )

  stateMachines.forEach((stateMachine, index) => {
    const path = `techniqueStateMachines.${String(stateMachine.id ?? index)}`
    if (typeof stateMachine.id !== 'string' || !stateMachine.id.trim()) addError(report, `${path}.id is required`)
    if (typeof stateMachine.skillId !== 'string' || !skillIds.has(stateMachine.skillId)) {
      addBrokenReference(report, `${path}.skillId -> ${String(stateMachine.skillId)}`)
    }
    if (typeof stateMachine.fromPositionId === 'string' && !positionIds.has(stateMachine.fromPositionId)) {
      addBrokenReference(report, `${path}.fromPositionId -> ${stateMachine.fromPositionId}`)
    }

    walkLocalizedContent(report, path, stateMachine)

    const outcomes = Array.isArray(stateMachine.outcomes) ? stateMachine.outcomes.filter(isRecord) : []
    if (outcomes.length < 3) addError(report, `${path}.outcomes must include at least 3 outcomes`)

    const outcomeIds = new Set<string>()
    outcomes.forEach((outcome, outcomeIndex) => {
      const outcomePath = `${path}.outcomes[${outcomeIndex}]`
      if (typeof outcome.id !== 'string' || !outcome.id.trim()) addError(report, `${outcomePath}.id is required`)
      else if (outcomeIds.has(outcome.id)) addError(report, `${path}.outcomes has duplicate id "${outcome.id}"`)
      else outcomeIds.add(outcome.id)

      if (!['success', 'failure', 'counter', 'reset', 'safety_abort', 'branch'].includes(String(outcome.result))) {
        addError(report, `${outcomePath}.result is invalid`)
      }
      const hasTarget = ['toSkillId', 'toPositionId', 'toSubmissionId', 'toProblemId', 'toSafetyNoteId'].some((field) => typeof outcome[field] === 'string' && String(outcome[field]).trim())
      if (!hasTarget && !hasMeaningfulLocalizedText(outcome.explanation, 20)) addError(report, `${outcomePath} needs a target or meaningful explanation`)
      if (typeof outcome.toSkillId === 'string' && !skillIds.has(outcome.toSkillId)) addBrokenReference(report, `${outcomePath}.toSkillId -> ${outcome.toSkillId}`)
      if (typeof outcome.toPositionId === 'string' && !positionIds.has(outcome.toPositionId)) addBrokenReference(report, `${outcomePath}.toPositionId -> ${outcome.toPositionId}`)
      if (typeof outcome.probability !== 'number' && !['low', 'medium', 'high'].includes(String(outcome.confidence))) addError(report, `${outcomePath}.confidence is required when probability is absent`)
    })

    if (outcomes.length && outcomes.every((outcome) => typeof outcome.probability === 'number')) {
      const sum = outcomes.reduce((total, outcome) => total + Number(outcome.probability), 0)
      if (sum !== 100) addError(report, `${path}.outcome probabilities must sum to 100, got ${sum}`)
    }

    ;['attacker', 'defender'].forEach((roleName) => {
      const roleValue = stateMachine[roleName]
      if (!isRecord(roleValue)) return
      if (!hasMeaningfulLocalizedText(roleValue.goal, 20)) addError(report, `${path}.${roleName}.goal is too short`)
      if (!isLocalizedArray(roleValue.recognitionCues) || !roleValue.recognitionCues.en.length) addError(report, `${path}.${roleName}.recognitionCues is required`)
      if (!isLocalizedArray(roleValue.primaryActions) || !roleValue.primaryActions.en.length) addError(report, `${path}.${roleName}.primaryActions is required`)
      if (!Array.isArray(roleValue.commonErrors) || roleValue.commonErrors.length === 0) addError(report, `${path}.${roleName}.commonErrors is required`)
      if (!Array.isArray(roleValue.knowledgeChecks) || roleValue.knowledgeChecks.length === 0) addError(report, `${path}.${roleName}.knowledgeChecks is required`)
    })

    if (!Array.isArray(stateMachine.trainingProgressions) || stateMachine.trainingProgressions.length === 0) {
      addWarning(report, `${path} has no training progression`)
    }

    if (typeof stateMachine.skillId === 'string' && safetyCriticalSkillIds.has(stateMachine.skillId)) {
      const hasSafetyAbort = outcomes.some((outcome) => outcome.result === 'safety_abort')
      const defender = isRecord(stateMachine.defender) ? stateMachine.defender : undefined
      const hasSafetyCheck = [stateMachine.attacker, defender]
        .filter(isRecord)
        .some((roleValue) => Array.isArray(roleValue.knowledgeChecks) && roleValue.knowledgeChecks.some((item) => isRecord(item) && item.safetyCritical === true))
      if (!hasSafetyAbort) addError(report, `${path} is safety-sensitive but has no safety_abort outcome`)
      if (!defender) addError(report, `${path} is safety-sensitive but has no defender perspective`)
      if (!hasSafetyCheck) addError(report, `${path} is safety-sensitive but has no safety-critical knowledge check`)
    }

    const results = new Set(outcomes.map((outcome) => outcome.result))
    const skill = skills.find((item) => item.id === stateMachine.skillId)
    const tags = isRecord(skill) && Array.isArray(skill.tags) ? skill.tags.map(String) : []
    if ((tags.includes('choke') || tags.includes('submission') || String(skill?.domain) === 'submission_systems') && (!results.has('success') || !results.has('failure') || (!results.has('counter') && !results.has('safety_abort')))) {
      addWarning(report, `${path} submission should include success, failure, and counter/safety_abort`)
    }
  })

  const stateMachineSkillIds = new Set(stateMachines.map((item) => item.skillId).filter((id): id is string => typeof id === 'string'))
  ;['rear-naked-choke-system', 'arm-triangle-mount', 'bodylock-passing', 'heel-hook-safety', 'false-reap-entry'].forEach((id) => {
    if (!stateMachineSkillIds.has(id)) addWarning(report, `priority skill ${id} has no state machine`)
  })
}

const validateGenericDataSet = (report: ValidationReport, dataSet: DataSet, knownIds: Record<string, Set<string>>) => {
  checkUniqueIds(report, dataSet)
  dataSet.items.forEach((item, index) => {
    const path = `${dataSet.name}.${String(item.id ?? index)}`
    walkLocalizedContent(report, path, item)

    const relatedSkillIds = Array.isArray(item.relatedSkillIds) ? item.relatedSkillIds : []
    relatedSkillIds.forEach((id) => {
      if (typeof id !== 'string' || !knownIds.skills.has(id)) addBrokenReference(report, `${path}.relatedSkillIds -> ${String(id)}`)
    })

    const relatedConceptIds = Array.isArray(item.relatedConceptIds) ? item.relatedConceptIds : []
    relatedConceptIds.forEach((id) => {
      if (knownIds.concepts.size && (typeof id !== 'string' || !knownIds.concepts.has(id))) {
        addBrokenReference(report, `${path}.relatedConceptIds -> ${String(id)}`)
      }
    })

    const relatedPositionIds = Array.isArray(item.relatedPositionIds) ? item.relatedPositionIds : []
    relatedPositionIds.forEach((id) => {
      if (knownIds.positions.size && (typeof id !== 'string' || !knownIds.positions.has(id))) {
        addBrokenReference(report, `${path}.relatedPositionIds -> ${String(id)}`)
      }
    })
  })
}

const main = async () => {
  const skills = asArray(skillNodes)
  const glossary = asArray(glossaryTerms)
  const optionalSets = await Promise.all(optionalDataModules.map(loadOptionalDataSet))

  const dataSets: DataSet[] = [
    { name: 'skills', label: 'skills', items: skills, optional: false },
    { name: 'glossaryTerms', label: 'glossary terms', items: glossary, optional: false },
    { name: 'techniqueStateMachines', label: 'technique state machines', items: techniqueStateMachines as AnyRecord[], optional: false },
    ...optionalSets,
  ]

  const report: ValidationReport = {
    counts: Object.fromEntries(dataSets.map((set) => [set.name, set.items.length])),
    errors: [],
    warnings: [],
    brokenReferences: [],
  }

  dataSets.forEach((set) => checkUniqueIds(report, set))
  validateSkills(report, skills, glossary, optionalSets)
  validateStateMachines(report, techniqueStateMachines as AnyRecord[], skills, optionalSets)

  const knownIds = {
    skills: new Set(skills.map((item) => item.id).filter((id): id is string => typeof id === 'string')),
    concepts: new Set(optionalSets.find((set) => set.name === 'concepts')?.items.map((item) => item.id).filter((id): id is string => typeof id === 'string') ?? []),
    positions: new Set(optionalSets.find((set) => set.name === 'positions')?.items.map((item) => item.id).filter((id): id is string => typeof id === 'string') ?? []),
    sharedKnowledge: new Set(sharedKnowledgeItems.map((item) => item.id)),
  }
  const validSkillDetailRefs = new Set(
    skills.flatMap((skill) => [
      ...(isRecord(skill.microDetailSystem)
        ? [
            ...(Array.isArray(skill.microDetailSystem.topFiveDetails) ? skill.microDetailSystem.topFiveDetails.map((detail) => detail.id) : []),
            ...(Array.isArray(skill.microDetailSystem.fastFinishPaths) ? skill.microDetailSystem.fastFinishPaths.map((path) => path.id) : []),
          ]
        : []),
      ...(isRecord(skill.technicalDetails)
        ? [
            ...(Array.isArray(skill.technicalDetails.keyDetails) ? skill.technicalDetails.keyDetails.map((detail) => detail.id) : []),
            ...(Array.isArray(skill.technicalDetails.microAdjustments) ? skill.technicalDetails.microAdjustments.map((adjustment) => adjustment.id) : []),
          ]
        : []),
    ]),
  )

  optionalSets.filter((set) => set.items.length > 0).forEach((set) => validateGenericDataSet(report, set, knownIds))

  const concepts = optionalSets.find((set) => set.name === 'concepts')?.items ?? []
  const positions = optionalSets.find((set) => set.name === 'positions')?.items ?? []

  concepts.forEach((concept, index) => {
    if (Array.isArray(concept.relatedSkillIds) && concept.relatedSkillIds.length === 0) {
      addWarning(report, `concepts.${String(concept.id ?? index)} has no related skills`)
    }
  })

  positions.forEach((position, index) => {
    if (Array.isArray(position.relatedSkillIds) && position.relatedSkillIds.length === 0) {
      addWarning(report, `positions.${String(position.id ?? index)} has no related skills`)
    }
  })

  const chains = getTechniqueChains(skillNodes)
  chains.forEach((chain) => {
    chain.steps.forEach((step, stepIndex) => {
      step.nextSkillIds.forEach((id) => {
        if (!knownIds.skills.has(id)) addBrokenReference(report, `techniqueChains.${chain.id}.steps[${stepIndex}].nextSkillIds -> ${id}`)
      })
    })
    chain.failureBranches.forEach((branch, branchIndex) => {
      branch.nextSkillIds.forEach((id) => {
        if (!knownIds.skills.has(id)) addBrokenReference(report, `techniqueChains.${chain.id}.failureBranches[${branchIndex}].nextSkillIds -> ${id}`)
      })
    })
  })

  const troubleshooters = getTroubleshooters(skillNodes)
  troubleshooters.forEach((item) => {
    if (item.checklist.length === 0) addWarning(report, `troubleshooter.${item.id} has no checklist items`)
    item.diagnoses.forEach((diagnosis, diagnosisIndex) => {
      diagnosis.relatedDetailIds.forEach((id) => {
        if (!validSkillDetailRefs.has(id)) {
          addWarning(report, `troubleshooter.${item.id}.diagnoses[${diagnosisIndex}].relatedDetailIds contains unresolved optional reference: ${id}`)
        }
      })
    })
  })

  const escapeMaps = getEscapeMaps(skillNodes)
  escapeMaps.forEach((map) => {
    map.routes.forEach((route, routeIndex) => {
      route.followUpSkillIds.forEach((id) => {
        if (!knownIds.skills.has(id)) addBrokenReference(report, `escapeMaps.${map.id}.routes[${routeIndex}].followUpSkillIds -> ${id}`)
      })
    })
  })

  skills.forEach((skill) => {
    if (getNextBestLinksForSkill(String(skill.id)).length === 0) {
      addWarning(report, `skills.${String(skill.id)} has no next best links`)
    }
  })

  checkUniqueIds(report, { name: 'sharedKnowledge', label: 'shared knowledge', items: sharedKnowledgeItems as AnyRecord[], optional: false })

  sharedKnowledgeItems.forEach((item, index) => {
    const path = `sharedKnowledge.${item.id ?? index}`
    walkLocalizedContent(report, path, item)
    ;(item.relatedConceptIds ?? []).forEach((id) => {
      if (!knownIds.concepts.size) return
      if (!knownIds.concepts.has(id)) addBrokenReference(report, `${path}.relatedConceptIds -> ${String(id)}`)
    })
    ;(item.relatedSkillIds ?? []).forEach((id) => {
      if (!knownIds.skills.has(id)) addBrokenReference(report, `${path}.relatedSkillIds -> ${String(id)}`)
    })
  })

  const duplicateBlocks = findDuplicateBlocks(
    skills.map((skill) => ({
      id: skill.id,
      texts: [
        skill.whyItMatters,
        skill.situation,
        skill.primaryGoal,
        skill.bodyMechanicsSystem,
        skill.technicalDetails,
        skill.ifThenDecisions,
        skill.commonMistakes,
        skill.failureResponses,
      ],
    })),
    90,
    3,
  )

  duplicateBlocks.slice(0, 5).forEach((block) => {
    addWarning(report, `Repeated long content detected in ${block.count} skills: ${block.text.slice(0, 140)}...`)
  })

  console.log('No-Gi Mind data validation')
  console.log('==========================')
  console.log(`skills: ${report.counts.skills}`)
  console.log(`glossary terms: ${report.counts.glossaryTerms}`)
  console.log(`technique state machines: ${report.counts.techniqueStateMachines}`)
  console.log(`concepts: ${report.counts.concepts ?? 0}`)
  console.log(`positions: ${report.counts.positions ?? 0}`)
  console.log(`training methods: ${report.counts.trainingMethods ?? 0}`)
  console.log(`defensive layers: ${report.counts.defensiveLayers ?? 0}`)
  console.log(`archetypes: ${report.counts.archetypes ?? 0}`)
  console.log(`curriculum paths: ${report.counts.curriculumPaths ?? 0}`)
  console.log(`journal seed data: ${report.counts.journalSeedData ?? 0}`)
  console.log('')
  console.log('Coverage summary')
  console.log(`skills with microDetailSystem: ${skills.filter((skill) => Boolean(skill.microDetailSystem)).length}/${skills.length}`)
  console.log(`skills with qualityChecklist: ${skills.filter((skill) => Boolean(skill.qualityChecklist)).length}/${skills.length}`)
  console.log(`skills with quickCard: ${skills.filter((skill) => Boolean(skill.quickCard)).length}/${skills.length}`)
  console.log(`skills with bodyToBodyDetails: ${skills.filter((skill) => Boolean(skill.bodyToBodyDetails)).length}/${skills.length}`)
  console.log(`skills with blackbeltDetails: ${skills.filter((skill) => Boolean(skill.blackbeltDetails)).length}/${skills.length}`)
  console.log(`modern expansion skills: ${skills.filter((skill) => skill.libraryTier === 'modern_expansion').length}`)
  console.log(`advanced niche skills: ${skills.filter((skill) => skill.libraryTier === 'advanced_niche').length}`)
  console.log(`safety-critical skills: ${skills.filter((skill) => skill.libraryTier === 'safety_critical' || skill.riskLevel === 'safety_critical').length}`)
  console.log(`skills missing microDetailSystem: ${skills.filter((skill) => !skill.microDetailSystem).length}`)
  console.log(`skills missing qualityChecklist: ${skills.filter((skill) => !skill.qualityChecklist).length}`)
  console.log(`skills missing quickCard: ${skills.filter((skill) => !skill.quickCard).length}`)
  console.log(`skills missing bodyToBodyDetails: ${skills.filter((skill) => !skill.bodyToBodyDetails).length}`)
  console.log(`skills missing blackbeltDetails: ${skills.filter((skill) => !skill.blackbeltDetails).length}`)
  console.log(`skills with techniqueStateMachine: ${techniqueStateMachines.length}/${skills.length}`)
  console.log(`body-to-body clarity warnings: ${report.counts.bodyToBodyClarityWarnings ?? 0}`)
  console.log('')
  console.log(`validation errors: ${report.errors.length}`)
  console.log(`warnings: ${report.warnings.length}`)
  console.log(`broken references: ${report.brokenReferences.length}`)
  console.log(`shared knowledge items: ${sharedKnowledgeItems.length}`)
  const missingMicro = skills.filter((skill) => !skill.microDetailSystem).map((skill) => String(skill.id))
  const missingChecklist = skills.filter((skill) => !skill.qualityChecklist).map((skill) => String(skill.id))
  const missingQuick = skills.filter((skill) => !skill.quickCard).map((skill) => String(skill.id))
  if (missingMicro.length || missingChecklist.length || missingQuick.length) {
    console.log('')
    console.log('Missing coverage samples')
    if (missingMicro.length) console.log(`- microDetailSystem: ${missingMicro.slice(0, 10).join(', ')}${missingMicro.length > 10 ? '...' : ''}`)
    if (missingChecklist.length) console.log(`- qualityChecklist: ${missingChecklist.slice(0, 10).join(', ')}${missingChecklist.length > 10 ? '...' : ''}`)
    if (missingQuick.length) console.log(`- quickCard: ${missingQuick.slice(0, 10).join(', ')}${missingQuick.length > 10 ? '...' : ''}`)
  }
  if (duplicateBlocks.length) {
    console.log('')
    console.log('Top repeated phrases')
    duplicateBlocks.slice(0, 5).forEach((block) => console.log(`- (${block.count}) ${block.text.slice(0, 140)}...`))
  }

  if (report.warnings.length) {
    console.log('')
    console.log('Warnings')
    report.warnings.forEach((warning) => console.log(`- ${warning}`))
  }

  if (report.brokenReferences.length) {
    console.log('')
    console.log('Broken references')
    report.brokenReferences.forEach((reference) => console.log(`- ${reference}`))
  }

  if (report.errors.length) {
    console.log('')
    console.log('Validation errors')
    report.errors.forEach((error) => console.log(`- ${error}`))
    process.exit(1)
  }

  console.log('')
  console.log('Data validation passed.')
}

main().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
