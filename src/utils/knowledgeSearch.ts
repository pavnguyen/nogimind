import MiniSearch, { type SearchResult } from 'minisearch'
import { archetypes } from '../data/archetypes'
import { concepts } from '../data/concepts'
import { defensiveLayers } from '../data/defensiveLayers'
import { glossaryTerms } from '../data/glossaryTerms'
import { masteryStages } from '../data/masteryStages'
import { sharedKnowledgeItems } from '../data/sharedKnowledge'
import { techniqueStateMachineBySkillId, techniqueStateMachines } from '../data/techniqueStateMachines'
import { positions } from '../data/positions'
import { skillNodes } from '../data/skillNodes'
import { videoReferences } from '../data/videos'
import type { GrapplingArchetype } from '../types/archetype'
import type { ConceptNode } from '../types/concept'
import type { DefensiveLayer } from '../types/defense'
import type { GlossaryTerm } from '../types/glossary'
import type { KnowledgeItemType, KnowledgeSearchResult } from '../types/knowledgeSearch'
import type { PositionNode } from '../types/position'
import type { LanguageCode, LocalizedStringArray, LocalizedText, SkillNode } from '../types/skill'
import { getEscapeMaps, getMicroDetails, getTechniqueChains, getTroubleshooters } from './knowledgeModules'
import { getLocalizedArray, getLocalizedText } from './localization'

const lt = (text: string): LocalizedText => ({ vi: text, en: text, fr: text })

type SearchField = {
  name: string
  values: string[]
  weight: number
}

type SearchDocument = {
  id: string
  type: KnowledgeItemType
  title: LocalizedText
  description: LocalizedText
  tags: string[]
  url: string
  fields: SearchField[]
}

type SearchIndexDocument = {
  uid: string
  sourceId: string
  type: KnowledgeItemType
  title: LocalizedText
  description: LocalizedText
  tags: string[]
  url: string
  titleText: string
  descriptionText: string
  contentText: string
  tagsText: string
  fieldLookup: Record<string, string>
}

type StoredSearchResult = SearchResult &
  Pick<SearchIndexDocument, 'sourceId' | 'type' | 'title' | 'description' | 'tags' | 'url' | 'contentText' | 'fieldLookup'>

const searchIndexCache = new Map<LanguageCode, MiniSearch<SearchIndexDocument>>()

const isRecord = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === 'object' && !Array.isArray(value)

const isLocalizedText = (value: unknown): value is LocalizedText =>
  isRecord(value) && ['vi', 'en', 'fr'].every((lang) => typeof value[lang] === 'string')

const isLocalizedArray = (value: unknown): value is LocalizedStringArray =>
  isRecord(value) && ['vi', 'en', 'fr'].every((lang) => Array.isArray(value[lang]))

const collectStrings = (value: unknown, lang: LanguageCode): string[] => {
  if (typeof value === 'string') return [value]
  if (typeof value === 'number') return [String(value)]
  if (isLocalizedText(value)) return [getLocalizedText(value, lang), value.en, value.vi, value.fr]
  if (isLocalizedArray(value)) return [...getLocalizedArray(value, lang), ...value.en, ...value.vi, ...value.fr]
  if (Array.isArray(value)) return value.flatMap((item) => collectStrings(item, lang))
  if (isRecord(value)) return Object.values(value).flatMap((item) => collectStrings(item, lang))
  return []
}

const field = (name: string, value: unknown, lang: LanguageCode, weight = 1): SearchField => ({
  name,
  values: collectStrings(value, lang).filter(Boolean),
  weight,
})

const normalizeSearchTerm = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .trim()

const grapplingTermAliases: Record<string, string[]> = {
  guillotine: ['guillotine', 'guillotin', 'guilotine', 'gilotine', 'gilotin'],
  bodylock: ['bodylock', 'bodylok', 'khoa hong', 'body lock'],
  heelhook: ['heelhook', 'heel hook', 'outside heel hook', 'inside heel hook'],
  wrestleup: ['wrestleup', 'wrestle'],
  elbow: ['elbow', 'cui cho', 'khuyu tay', 'coude'],
  knee: ['knee', 'goi', 'dau goi', 'genou'],
  hip: ['hip', 'hong', 'hanche'],
  heel: ['heel', 'got', 'talon'],
  shoulder: ['shoulder', 'vai', 'ep vai', 'epaule'],
  chest: ['chest', 'nguc', 'sternum', 'poitrine'],
  head: ['head', 'dau', 'tete'],
  underhook: ['underhook', 'moc tay trong', 'hook trong', 'sous crochet'],
  crossface: ['crossface', 'ep mat', 'cross face'],
  'knee line': ['knee line', 'duong goi', 'ligne du genou'],
  'hip line': ['hip line', 'duong hong', 'ligne de hanche'],
  'rear naked choke': ['rear naked choke', 'rnc', 'siết cổ sau', 'siet co sau', 'étranglement arrière', 'etranglement arriere'],
  armbar: ['armbar', 'juji gatame', 'elbow line', 'thumb direction', 'armbar slipping', 'khoa tay', 'khóa tay', 'tuot khuyu', 'tuột khuỷu', 'cle de bras', 'clé de bras', 'ligne du coude'],
  triangle: ['triangle', 'triangle choke', 'one shoulder in one shoulder out', 'foot hidden behind knee', 'tam giac', 'tam giác', 'mot vai trong mot vai ngoai', 'triangle étranglement', 'triangle etranglement'],
  omoplata: ['omoplata', 'shoulder clamp', 'hip angle shoulder lock', 'khoa vai', 'khóa vai', 'kep vai', 'épaule clamp', 'cle epaule', 'clé épaule'],
  'arm triangle': ['arm triangle', 'tam giac tay', 'triangle de bras'],
  'straight ankle lock': ['straight ankle lock', 'ankle lock', 'khoa co chan', 'bẻ cổ chân', 'cle de cheville'],
  'heel hook': ['heel hook', 'be got', 'crochet de talon'],
  'single leg x': ['single leg x', 'slx', 'single-leg-x', 'singlelegx'],
  'k guard': ['k guard', 'k-guard', 'kguard'],
  'front headlock': ['front headlock', 'fhl'],
  clamp: ['clamp', 'kep', 'kẹp', 'serrage', 'body clamp'],
  centerline: ['centerline', 'duong giua', 'truc giua', 'ligne centrale'],
  slack: ['slack', 'xoa slack', 'remove slack', 'retirer slack'],
  'chest to hip': ['chest to hip', 'nguc ep hong', 'poitrine hanche'],
  'chest to back': ['chest to back', 'chest-to-back', 'nguc ap lung', 'poitrine dos'],
  'elbow under chin': ['elbow under chin', 'khuyu duoi cam', 'cui cho duoi cam', 'coude sous le menton'],
  'head blocks elbow': ['head blocks elbow', 'dau chan khuyu', 'tete bloque coude'],
  'shoulder pressure diagonal': ['shoulder pressure diagonal', 'vai ep cheo', 'pression epaule diagonale'],
  'right hand left wrist': ['right hand left wrist', 'tay phai co tay trai', 'main droite poignet gauche'],
  'left foot right hip': ['left foot right hip', 'chan trai hong phai', 'pied gauche hanche droite'],
  octopus: ['octopus', 'octopus guard', 'octopus sweep', 'octopus back take'],
  'clamp guard': ['clamp guard', 'kep vai guard', 'kẹp vai', 'shoulder clamp'],
  'shoulder crunch': ['shoulder crunch', 'kep vai', 'contrôle épaule', 'controle epaule'],
  's mount': ['s mount', 's-mount', 'smount'],
  gogoplata: ['gogoplata', 'shin throat', 'ong chan qua co'],
  'buggy choke': ['buggy choke', 'buggy', 'side control bottom choke'],
  'choi bar': ['choi bar', 'choibar'],
  tarikoplata: ['tarikoplata', 'tariko'],
  'crab ride': ['crab ride', 'crabride'],
  'wrist ride': ['wrist ride', 'cross wrist ride', 'dagestani handcuff'],
  'false reap': ['false reap', 'false-reap'],
  matrix: ['matrix', 'k guard matrix', 'k-guard matrix'],
  saddle: ['saddle', 'inside sankaku'],
  dogfight: ['dogfight', 'underhook half guard'],
  smother: ['smother', 'mother milk', 'mothers milk', 'ep nguc', 'pression poitrine'],
  'rear triangle': ['rear triangle', 'back triangle', 'tam giac sau'],
  'high wrist guillotine': ['high wrist guillotine', 'high-wrist guillotine'],
  'low wrist guillotine': ['low wrist guillotine', 'low-wrist guillotine', 'low elbow guillotine'],
  'high elbow guillotine': ['high elbow guillotine', 'marcelotine', 'guillotine coude haut'],
  'japanese necktie': ['japanese necktie', 'necktie', 'darce necktie', 'cavat cổ', 'cravate japonaise'],
  'peruvian necktie': ['peruvian necktie', 'cravate péruvienne', 'cravate peruvienne'],
  'aoki lock': ['aoki lock', 'aoki lock awareness', 'ankle lock heel exposure'],
  'z lock': ['z lock', 'z-lock', 'knee compression lock'],
  'shotgun ankle lock': ['shotgun ankle lock', 'shotgun ankle', 'ankle lock pressure'],
  'knee line escape': ['knee line escape', 'free knee line', 'thoat duong goi', 'thoát đường gối'],
  'compression safety': ['compression safety', 'compression vs strangle', 'smother distress', 'an toan nen ep', 'sécurité compression'],
}

const processSearchTerm = (term: string) => {
  const normalized = normalizeSearchTerm(term)
  if (!normalized) return false
  return grapplingTermAliases[normalized] ?? normalized
}

const tokenizeSearchText = (text: string) => text.split(/[^\p{Letter}\p{Number}]+/u).filter(Boolean)

const buildQueryVariants = (query: string) => {
  const normalized = normalizeSearchTerm(query)
  if (!normalized) return []

  const variants = new Set<string>()
  variants.add(normalized)

  const tokens = tokenizeSearchText(normalized).filter((token) => token.length >= 2)
  tokens.forEach((token) => variants.add(token))

  Object.entries(grapplingTermAliases).forEach(([key, values]) => {
    const keyNormalized = normalizeSearchTerm(key)
    if (normalized.includes(keyNormalized)) values.forEach((value) => variants.add(normalizeSearchTerm(value)))
    values.forEach((value) => {
      const valueNormalized = normalizeSearchTerm(value)
      if (normalized.includes(valueNormalized)) variants.add(keyNormalized)
    })
  })

  return [...variants].filter(Boolean)
}

const fieldText = (fields: SearchField[], predicate: (searchField: SearchField) => boolean) =>
  fields
    .filter(predicate)
    .flatMap((searchField) => searchField.values)
    .join(' ')

const weightedContentText = (fields: SearchField[]) =>
  fields
    .flatMap((searchField) =>
      Array.from({ length: Math.max(1, Math.round(searchField.weight)) }, () => searchField.values.join(' ')),
    )
    .join(' ')

const toIndexDocument = (document: SearchDocument): SearchIndexDocument => {
  const fieldLookup = Object.fromEntries(
    document.fields.map((searchField) => [searchField.name, normalizeSearchTerm(searchField.values.join(' '))]),
  )

  return {
    uid: `${document.type}:${document.id}`,
    sourceId: document.id,
    type: document.type,
    title: document.title,
    description: document.description,
    tags: document.tags,
    url: document.url,
    titleText: fieldText(document.fields, (searchField) => ['title', 'term'].includes(searchField.name)),
    descriptionText: fieldText(document.fields, (searchField) =>
      ['description', 'definition', 'overview', 'threat', 'philosophy', 'start and goal'].includes(searchField.name),
    ),
    contentText: weightedContentText(document.fields),
    tagsText: [document.id, document.type, ...document.tags].join(' '),
    fieldLookup,
  }
}

const getSearchIndex = (lang: LanguageCode) => {
  const cached = searchIndexCache.get(lang)
  if (cached) return cached

  const index = new MiniSearch<SearchIndexDocument>({
    idField: 'uid',
    fields: ['titleText', 'descriptionText', 'contentText', 'tagsText'],
    storeFields: ['sourceId', 'type', 'title', 'description', 'tags', 'url', 'contentText', 'fieldLookup'],
    tokenize: tokenizeSearchText,
    processTerm: processSearchTerm,
    searchOptions: {
      boost: {
        titleText: 8,
        descriptionText: 4,
        contentText: 2,
        tagsText: 3,
      },
      prefix: (term) => term.length >= 3,
      fuzzy: (term) => {
        if (term.length >= 7) return 0.2
        if (term.length >= 4) return 1
        return false
      },
      maxFuzzy: 2,
      combineWith: 'OR',
      weights: {
        fuzzy: 0.35,
        prefix: 0.75,
      },
    },
  })

  index.addAll(buildDocuments(lang).map(toIndexDocument))
  searchIndexCache.set(lang, index)
  return index
}

const skillDocument = (skill: SkillNode, lang: LanguageCode): SearchDocument => ({
  id: skill.id,
  type: 'skill',
  title: skill.title,
  description: skill.shortDescription,
  tags: skill.tags,
  url: `/skills/${skill.id}`,
  fields: [
    field('title', skill.title, lang, 8),
    field('system logic', [skill.shortDescription, skill.whyItMatters, skill.situation, skill.primaryGoal, skill.quickCard], lang, 5),
    field('key concepts', skill.keyConcepts, lang, 3),
    field('body checklist', skill.bodyChecklist, lang, 3),
    field('money details', [skill.microDetailSystem, skill.blackbeltDetails, skill.qualityChecklist, skill.commonMistakes], lang, 6),
    field('fix it fast', [skill.microDetailSystem?.troubleshootingTips, skill.qualityChecklist?.checks, skill.commonMistakes, skill.failureResponses], lang, 5),
    field('body mechanics', skill.bodyMechanicsSystem, lang, 3),
    field('technical details', skill.technicalDetails, lang, 4),
    field('body position', skill.bodyToBodyDetails, lang, 7),
    field('outcomes branches', [techniqueStateMachineBySkillId.get(skill.id), skill.reactionBranches, skill.ifThenDecisions], lang, 6),
    field('safety', [skill.riskLevel, skill.dangerSignals, skill.bodyMechanicsSystem.safetyNotes], lang, 5),
    field('next step', [skill.prerequisites, skill.relatedSkills, skill.sharedPrincipleIds, skill.sharedCueIds, skill.sharedSafetyIds], lang, 3),
    field('classification', [skill.libraryTier, skill.metaStatus, skill.riskLevel, skill.techniqueFamily, skill.modernSystemGroup, skill.rulesetRelevance], lang, 4),
    field('shared knowledge', [skill.sharedPrincipleIds, skill.sharedCueIds, skill.sharedErrorIds, skill.sharedSafetyIds, skill.sharedMechanicIds], lang, 2),
    field('if-then decisions', skill.ifThenDecisions, lang, 3),
    field('danger signals', skill.dangerSignals, lang, 3),
    field('correction cues', [skill.commonMistakes, skill.failureResponses, skill.reactionBranches], lang, 2),
    field('drills and tests', [skill.drills, skill.skillTests], lang, 1),
    field('tags', skill.tags, lang, 2),
  ],
})

const anchorByFieldName: Record<string, string> = {
  'quick card': 'system-logic',
  'system logic': 'system-logic',
  'body-to-body details': 'body-position',
  'body position': 'body-position',
  'micro details': 'money-details',
  'micro detail system': 'money-details',
  'blackbelt details': 'money-details',
  'money details': 'money-details',
  'quality checklist': 'money-details',
  'state machine': 'outcomes-branches',
  'outcomes branches': 'outcomes-branches',
  'attacker view': 'outcomes-branches',
  'defender view': 'outcomes-branches',
  'fix it fast': 'fix-it-fast',
  safety: 'safety',
  'next step': 'next-step',
}

const withSectionAnchor = (url: string, matchedFields: string[]) => {
  if (!url.startsWith('/skills/')) return url
  const cleanUrl = url.replace(/\?(layer|section)=[^#]+/, '')
  const anchor = matchedFields.map((fieldName) => anchorByFieldName[fieldName]).find(Boolean)
  return anchor ? `${cleanUrl}#${anchor}` : cleanUrl
}

const sharedKnowledgeDocument = (item: (typeof sharedKnowledgeItems)[number], lang: LanguageCode): SearchDocument => ({
  id: item.id,
  type: 'shared_knowledge',
  title: item.title,
  description: item.shortText,
  tags: item.tags,
  url: `/knowledge/${item.id}`,
  fields: [
    field('title', item.title, lang, 8),
    field('short text', item.shortText, lang, 4),
    field('deep text', item.deepText ?? '', lang, 3),
    field('tags', item.tags, lang, 2),
    field('related concepts', item.relatedConceptIds ?? [], lang, 2),
    field('related skills', item.relatedSkillIds ?? [], lang, 2),
  ],
})

const conceptDocument = (concept: ConceptNode, lang: LanguageCode): SearchDocument => ({
  id: concept.id,
  type: 'concept',
  title: concept.title,
  description: concept.shortDefinition,
  tags: concept.tags,
  url: `/concepts/${concept.id}`,
  fields: [
    field('title', concept.title, lang, 8),
    field('definition', [concept.shortDefinition, concept.whyItMatters], lang, 4),
    field('deep explanation', [concept.deepExplanation, concept.beginnerView, concept.advancedView], lang, 3),
    field('if-then examples', concept.ifThenExamples, lang, 3),
    field('training cues', [concept.trainingCues, concept.commonMisunderstandings], lang, 2),
    field('tags', concept.tags, lang, 2),
  ],
})

const positionDocument = (position: PositionNode, lang: LanguageCode): SearchDocument => ({
  id: position.id,
  type: 'position',
  title: position.title,
  description: position.description,
  tags: [position.category, position.status],
  url: `/positions/${position.id}`,
  fields: [
    field('title', position.title, lang, 8),
    field('description', position.description, lang, 4),
    field('goals', [position.topPlayerGoals, position.bottomPlayerGoals], lang, 3),
    field('control points', position.controlPoints, lang, 3),
    field('escape priorities', position.escapePriorities, lang, 3),
    field('advancement options', position.advancementOptions, lang, 2),
    field('danger signals', position.dangerSignals, lang, 3),
  ],
})

const glossaryDocument = (term: GlossaryTerm, lang: LanguageCode): SearchDocument => ({
  id: term.id,
  type: 'glossary',
  title: lt(term.term),
  description: term.definition,
  tags: ['glossary'],
  url: `/glossary?q=${encodeURIComponent(term.term)}`,
  fields: [
    field('term', term.term, lang, 8),
    field('definition', term.definition, lang, 4),
    field('examples', term.examples, lang, 3),
  ],
})

const defenseDocument = (layer: DefensiveLayer, lang: LanguageCode): SearchDocument => ({
  id: layer.id,
  type: 'defense',
  title: layer.title,
  description: layer.threat,
  tags: [layer.category],
  url: `/defense/${layer.id}`,
  fields: [
    field('title', layer.title, lang, 8),
    field('threat', layer.threat, lang, 4),
    field('danger signals', [layer.earlyDangerSignals, layer.lateDangerSignals], lang, 4),
    field('safe responses', [layer.immediatePriorities, layer.safeResponses, layer.unsafeResponses], lang, 3),
    field('training advice', layer.trainingAdvice, lang, 2),
  ],
})

const archetypeDocument = (archetype: GrapplingArchetype, lang: LanguageCode): SearchDocument => ({
  id: archetype.id,
  type: 'archetype',
  title: archetype.title,
  description: archetype.shortDescription,
  tags: ['archetype', ...archetype.coreSkillIds.slice(0, 4)],
  url: `/archetypes/${archetype.id}`,
  fields: [
    field('title', archetype.title, lang, 8),
    field('description', [archetype.shortDescription, archetype.philosophy], lang, 4),
    field('best for', [archetype.bestFor, archetype.notIdealFor], lang, 2),
    field('strategy', archetype.ifThenStrategy, lang, 3),
    field('training priorities', [archetype.trainingPriorities, archetype.commonWeaknesses], lang, 3),
    field('linked ids', [archetype.coreSkillIds, archetype.coreConceptIds, archetype.supportSkillIds], lang, 1),
  ],
})

const microDetailDocuments = (lang: LanguageCode): SearchDocument[] =>
  getMicroDetails(skillNodes).map((detail) => ({
    id: `${detail.skillId}:${detail.id}`,
    type: 'micro_detail',
    title: detail.title,
    description: detail.instruction,
    tags: detail.tags,
    url: `/skills/${detail.skillId}`,
    fields: [
      field('title', detail.title, lang, 8),
      field('instruction', [detail.instruction, detail.whyItWorks, detail.correctionCue], lang, 5),
      field('body parts', detail.bodyParts, lang, 3),
      field('category', [detail.category, detail.skillDomain], lang, 2),
    ],
  }))

const chainDocuments = (lang: LanguageCode): SearchDocument[] =>
  getTechniqueChains(skillNodes).map((chain) => ({
    id: `chain:${chain.id}`,
    type: 'technique_chain',
    title: chain.title,
    description: chain.endGoal,
    tags: chain.conceptTags,
    url: `/chains?q=${encodeURIComponent(chain.title.en)}`,
    fields: [
      field('title', chain.title, lang, 8),
      field('start and goal', [chain.startNode, chain.endGoal], lang, 4),
      field('steps', chain.steps, lang, 4),
      field('failure branches', chain.failureBranches, lang, 3),
      field('tags', chain.conceptTags, lang, 2),
    ],
  }))

const troubleshooterDocuments = (lang: LanguageCode): SearchDocument[] =>
  getTroubleshooters(skillNodes, lang).map((item) => ({
    id: `troubleshooter:${item.skillId}:${item.id}`,
    type: 'troubleshooter',
    title: item.title,
    description: item.overview,
    tags: [item.category],
    url: `/troubleshooters/${item.skillId}`,
    fields: [
      field('title', item.title, lang, 8),
      field('overview', item.overview, lang, 4),
      field('checklist', item.checklist, lang, 3),
      field('diagnoses', item.diagnoses, lang, 4),
      field('safety notes', item.safetyNotes, lang, 2),
    ],
  }))

const escapeMapDocuments = (lang: LanguageCode): SearchDocument[] =>
  getEscapeMaps(skillNodes, lang).map((map) => ({
    id: `escape-map:${map.skillId}:${map.id}`,
    type: 'escape_map',
    title: map.title,
    description: map.overview,
    tags: [map.category],
    url: `/escape-maps/${map.skillId}`,
    fields: [
      field('title', map.title, lang, 8),
      field('overview', map.overview, lang, 4),
      field('routes', map.routes, lang, 4),
      field('preventions', map.priorityPreventions, lang, 3),
      field('category', map.category, lang, 2),
    ],
  }))

const masteryDocuments = (lang: LanguageCode): SearchDocument[] =>
  masteryStages.map((stage) => ({
    id: stage.id,
    type: 'mastery',
    title: stage.title,
    description: stage.shortDescription,
    tags: ['mastery', stage.id],
    url: '/mastery',
    fields: [
      field('title', stage.title, lang, 8),
      field('philosophy', [stage.shortDescription, stage.philosophy, stage.highLevelExecution], lang, 4),
      field('what to learn', stage.whatToLearn, lang, 3),
      field('technical focus', stage.technicalFocus, lang, 3),
      field('common mistakes', stage.commonMistakes, lang, 3),
      field('linked ids', [stage.keySkillIds, stage.keyConceptIds], lang, 1),
    ],
  }))

const videoReferenceDocuments = (lang: LanguageCode): SearchDocument[] =>
  videoReferences.map((video) => {
    const relatedSkills = skillNodes.filter((skill) => video.relatedSkillIds.includes(skill.id))
    return {
      id: video.id,
      type: 'video_reference',
      title: video.title,
      description: video.whyUseful,
      tags: ['video', 'youtube', video.relevance, video.level, ...video.techniqueTags],
      url: `/skills/${video.relatedSkillIds[0] ?? ''}#video-references`,
      fields: [
        field('title', video.title, lang, 8),
        field('video channel', video.channelName, lang, 5),
        field('video reference', ['video', 'youtube', 'public youtube reference', 'video tham khảo', 'référence vidéo'], lang, 5),
        field('related skill titles', relatedSkills.map((skill) => skill.title), lang, 6),
        field('technique tags', video.techniqueTags, lang, 5),
        field('why useful', video.whyUseful, lang, 4),
        field('what to watch for', video.whatToWatchFor, lang, 4),
        field('timestamps', video.timestamps?.map((timestamp) => [timestamp.label, timestamp.note]) ?? [], lang, 2),
      ],
    }
  })

const stateMachineDocuments = (lang: LanguageCode): SearchDocument[] =>
  techniqueStateMachines.map((stateMachine) => ({
    id: `state-machine:${stateMachine.skillId}`,
    type: 'skill',
    title: lt(stateMachine.skillId),
    description: stateMachine.attacker?.goal ?? stateMachine.defender?.goal ?? lt(stateMachine.skillId),
    tags: ['state-machine', stateMachine.startingRole ?? 'neutral'],
    url: `/skills/${stateMachine.skillId}?layer=system`,
    fields: [
      field('state machine id', [stateMachine.id, stateMachine.skillId], lang, 8),
      field('outcomes', stateMachine.outcomes, lang, 5),
      field('attacker view', stateMachine.attacker, lang, 5),
      field('defender view', stateMachine.defender, lang, 5),
      field('knowledge checks', [stateMachine.attacker?.knowledgeChecks, stateMachine.defender?.knowledgeChecks], lang, 4),
      field('training progressions', stateMachine.trainingProgressions, lang, 3),
    ],
  }))

const buildDocuments = (lang: LanguageCode): SearchDocument[] => [
  ...skillNodes.map((skill) => skillDocument(skill, lang)),
  ...stateMachineDocuments(lang),
  ...sharedKnowledgeItems.map((item) => sharedKnowledgeDocument(item, lang)),
  ...microDetailDocuments(lang),
  ...chainDocuments(lang),
  ...troubleshooterDocuments(lang),
  ...escapeMapDocuments(lang),
  ...concepts.map((concept) => conceptDocument(concept, lang)),
  ...positions.map((position) => positionDocument(position, lang)),
  ...glossaryTerms.map((term) => glossaryDocument(term, lang)),
  ...defensiveLayers.map((layer) => defenseDocument(layer, lang)),
  ...archetypes.map((archetypeValue) => archetypeDocument(archetypeValue, lang)),
  ...masteryDocuments(lang),
  ...videoReferenceDocuments(lang),
]

const indexFieldLabels: Record<string, string> = {
  titleText: 'title',
  descriptionText: 'description',
  contentText: 'content',
  tagsText: 'tags',
}

const getMatchedFields = (result: StoredSearchResult) => {
  const matchedTerms = [...new Set([...result.terms, ...result.queryTerms].map(normalizeSearchTerm).filter((term) => term.length >= 2))]
  const matchedFields = Object.entries(result.fieldLookup ?? {})
    .filter(([, haystack]) => matchedTerms.some((term) => haystack.includes(term)))
    .map(([name]) => name)

  if (matchedFields.length) return [...new Set(matchedFields)]

  return [
    ...new Set(
      Object.values(result.match ?? {})
        .flat()
        .map((fieldName) => indexFieldLabels[fieldName] ?? fieldName),
    ),
  ]
}

export const searchKnowledge = (
  query: string,
  lang: LanguageCode,
  filters: { type?: KnowledgeItemType | '' } = {},
): KnowledgeSearchResult[] => {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return []

  const index = getSearchIndex(lang)
  const variants = buildQueryVariants(normalizedQuery)
  const merged = new Map<string, KnowledgeSearchResult & { rawScore: number; contentText: string }>()

  const variantWeights = variants.map((_, indexPosition) => (indexPosition === 0 ? 1 : indexPosition === 1 ? 0.85 : indexPosition === 2 ? 0.7 : 0.55))

  variants.forEach((variant, indexPosition) => {
    const weight = variantWeights[indexPosition] ?? 0.5
    const results = index.search(variant, {
      filter: (result) => !filters.type || result.type === filters.type,
    })

    results.forEach((result) => {
      const storedResult = result as StoredSearchResult
      const id = storedResult.sourceId
      const baseScore = Math.max(1, storedResult.score)
      const current = merged.get(id)
      const nextScore = baseScore * weight

      if (current) {
        current.rawScore = Math.max(current.rawScore, nextScore)
        current.score = Math.max(current.score, Math.round(nextScore))
        current.matchedFields = [...new Set([...current.matchedFields, ...getMatchedFields(storedResult)])]
        current.url = withSectionAnchor(current.url, current.matchedFields)
        return
      }

      const matchedFields = getMatchedFields(storedResult)
      merged.set(id, {
        id: storedResult.sourceId,
        type: storedResult.type,
        title: storedResult.title,
        description: storedResult.description,
        tags: storedResult.tags,
        url: withSectionAnchor(storedResult.url, matchedFields),
        score: Math.max(1, Math.round(nextScore)),
        matchedFields,
        rawScore: nextScore,
        contentText: storedResult.contentText,
      })
    })
  })

  const results = [...merged.values()]
  const queryNorm = normalizeSearchTerm(normalizedQuery)
  const queryTokens = tokenizeSearchText(queryNorm).filter((token) => token.length >= 2)

  const exactBoosted = results.map((result) => {
    const title = normalizeSearchTerm(getLocalizedText(result.title, lang))
    const description = normalizeSearchTerm(getLocalizedText(result.description, lang))
    const tagText = normalizeSearchTerm(result.tags.join(' '))
    const content = normalizeSearchTerm(result.contentText ?? '')
    const primaryHaystack = [title, description, tagText].join(' ')
    const haystack = [title, description, tagText, content].join(' ')
    const tokenCoverage = queryTokens.length
      ? queryTokens.filter((token) => haystack.includes(token)).length / queryTokens.length
      : 1
    const primaryCoverage = queryTokens.length
      ? queryTokens.filter((token) => primaryHaystack.includes(token)).length / queryTokens.length
      : 1
    let bonus = 0
    if (title === queryNorm) bonus += 60
    if (title.includes(queryNorm)) bonus += 30
    if (queryTokens.length > 1 && queryTokens.every((token) => title.includes(token))) bonus += 120
    if (description.includes(queryNorm)) bonus += 10
    if (tagText.includes(queryNorm)) bonus += 8
    bonus += primaryCoverage * 80
    return {
      ...result,
      score: Math.max(1, Math.round((result.score + bonus) * (0.4 + tokenCoverage * 0.6))),
    }
  })

  return exactBoosted
    .sort((a, b) => b.score - a.score || getLocalizedText(a.title, lang).localeCompare(getLocalizedText(b.title, lang)))
    .slice(0, 80)
}
