import { archetypes } from '../data/archetypes'
import { concepts } from '../data/concepts'
import { defensiveLayers } from '../data/defensiveLayers'
import { glossaryTerms } from '../data/glossaryTerms'
import { masteryStages } from '../data/masteryStages'
import { positions } from '../data/positions'
import { sharedKnowledgeItems } from '../data/sharedKnowledge'
import { skillNodes } from '../data/skillNodes'
import type { GrapplingArchetype } from '../types/archetype'
import type { ConceptNode } from '../types/concept'
import type { DefensiveLayer } from '../types/defense'
import type { LocalizedText, SkillNode } from '../types/skill'
import type { PositionNode } from '../types/position'
import type { SharedKnowledgeItem } from '../types/sharedKnowledge'
import type { MasteryStage } from '../data/masteryStages'
import { getEscapeMaps, getTechniqueChains, getTroubleshooters } from './knowledgeModules'
import {
  getArchetypeUrl,
  getChainUrl,
  getConceptUrl,
  getEscapeMapUrl,
  getMasteryUrl,
  getMicroDetailsUrl,
  getPositionUrl,
  getSkillUrl,
  getTroubleshooterUrl,
} from './knowledgeUrls'

const lt = (vi: string, en: string, fr: string): LocalizedText => ({ vi, en, fr })

export type KnowledgeItemType =
  | 'skill'
  | 'concept'
  | 'position'
  | 'glossary'
  | 'defense'
  | 'micro_detail'
  | 'shared_knowledge'
  | 'technique_chain'
  | 'troubleshooter'
  | 'escape_map'
  | 'problem'
  | 'archetype'
  | 'mastery'
  | 'quality_check'
  | 'quick_card'

export type KnowledgeLink = {
  type: KnowledgeItemType
  id: string
  title: LocalizedText
  description?: LocalizedText
  url: string
  reason?: LocalizedText
  strength: 'primary' | 'secondary' | 'related'
}

export type KnowledgeLinkGroup = {
  label: LocalizedText
  type: KnowledgeItemType
  links: KnowledgeLink[]
}

type KnowledgeMaps = {
  skills: Map<string, SkillNode>
  concepts: Map<string, ConceptNode>
  positions: Map<string, PositionNode>
  glossary: Map<string, { id: string; term: string; definition: LocalizedText; relatedSkillIds?: string[] }>
  defenses: Map<string, DefensiveLayer>
  shared: Map<string, SharedKnowledgeItem>
  archetypes: Map<string, GrapplingArchetype>
  mastery: Map<string, MasteryStage>
  chains: ReturnType<typeof getTechniqueChains>
  troubleshooters: ReturnType<typeof getTroubleshooters>
  escapeMaps: ReturnType<typeof getEscapeMaps>
}

const maps: KnowledgeMaps = {
  skills: new Map(skillNodes.map((skill) => [skill.id, skill])),
  concepts: new Map(concepts.map((concept) => [concept.id, concept])),
  positions: new Map(positions.map((position) => [position.id, position])),
  glossary: new Map(glossaryTerms.map((term) => [term.id, { id: term.id, term: term.term, definition: term.definition, relatedSkillIds: term.relatedSkillIds }])),
  defenses: new Map(defensiveLayers.map((layer) => [layer.id, layer])),
  shared: new Map(sharedKnowledgeItems.map((item) => [item.id, item])),
  archetypes: new Map(archetypes.map((item) => [item.id, item])),
  mastery: new Map(masteryStages.map((item) => [item.id, item])),
  chains: getTechniqueChains(skillNodes),
  troubleshooters: getTroubleshooters(skillNodes, 'en'),
  escapeMaps: getEscapeMaps(skillNodes, 'en'),
}

const uniqueById = <T extends KnowledgeLink>(links: T[]) => {
  const seen = new Set<string>()
  return links.filter((link) => {
    const key = `${link.type}:${link.id}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const group = (label: LocalizedText, type: KnowledgeItemType, links: KnowledgeLink[]): KnowledgeLinkGroup | undefined =>
  links.length ? { label, type, links: uniqueById(links) } : undefined

const skillLink = (skill: SkillNode, reason?: LocalizedText, strength: KnowledgeLink['strength'] = 'related'): KnowledgeLink => ({
  type: 'skill',
  id: skill.id,
  title: skill.title,
  description: skill.shortDescription,
  url: getSkillUrl(skill.id),
  reason,
  strength,
})

const conceptLink = (concept: ConceptNode, reason?: LocalizedText, strength: KnowledgeLink['strength'] = 'related'): KnowledgeLink => ({
  type: 'concept',
  id: concept.id,
  title: concept.title,
  description: concept.shortDefinition,
  url: getConceptUrl(concept.id),
  reason,
  strength,
})

const positionLink = (position: PositionNode, reason?: LocalizedText, strength: KnowledgeLink['strength'] = 'related'): KnowledgeLink => ({
  type: 'position',
  id: position.id,
  title: position.title,
  description: position.description,
  url: getPositionUrl(position.id),
  reason,
  strength,
})

const sharedLink = (item: SharedKnowledgeItem, reason?: LocalizedText, strength: KnowledgeLink['strength'] = 'related'): KnowledgeLink => ({
  type: 'shared_knowledge',
  id: item.id,
  title: item.title,
  description: item.shortText,
  url: `/knowledge/${item.id}`,
  reason,
  strength,
})

const masteryLink = (stage: MasteryStage, reason?: LocalizedText, strength: KnowledgeLink['strength'] = 'related'): KnowledgeLink => ({
  type: 'mastery',
  id: stage.id,
  title: stage.title,
  description: stage.shortDescription,
  url: getMasteryUrl(stage.id),
  reason,
  strength,
})

const archetypeLink = (archetype: GrapplingArchetype, reason?: LocalizedText, strength: KnowledgeLink['strength'] = 'related'): KnowledgeLink => ({
  type: 'archetype',
  id: archetype.id,
  title: archetype.title,
  description: archetype.shortDescription,
  url: getArchetypeUrl(archetype.id),
  reason,
  strength,
})

const microDetailLink = (skill: SkillNode, detailId: string, title: LocalizedText, description?: LocalizedText, reason?: LocalizedText): KnowledgeLink => ({
  type: 'micro_detail',
  id: `${skill.id}:${detailId}`,
  title,
  description,
  url: getMicroDetailsUrl(skill.id),
  reason,
  strength: 'related',
})

const quickCardLink = (skill: SkillNode): KnowledgeLink => ({
  type: 'quick_card',
  id: `${skill.id}:quick`,
  title: lt('Quick Mode', 'Quick Mode', 'Chế độ nhanh'),
  description: skill.quickCard?.goal,
  url: `${getSkillUrl(skill.id)}?mode=quick`,
  reason: lt('Gym-friendly view for fast review.', 'Gym-friendly view for fast review.', 'Vue rapide pour révision au gym.'),
  strength: 'primary',
})

const qualityCheckLink = (skill: SkillNode): KnowledgeLink => ({
  type: 'quality_check',
  id: `${skill.id}:quality`,
  title: lt('Technique Quality Checklist', 'Technique Quality Checklist', 'Technique Quality Checklist'),
  description: skill.qualityChecklist?.overview,
  url: `${getSkillUrl(skill.id)}?mode=quick`,
  reason: lt('Check whether the technique is ready to finish or control.', 'Check whether the technique is ready to finish or control.', 'Vérifier si la technique est prête à finir ou contrôler.'),
  strength: 'secondary',
})

const chainLink = (chain: ReturnType<typeof getTechniqueChains>[number], reason?: LocalizedText, strength: KnowledgeLink['strength'] = 'related'): KnowledgeLink => ({
  type: 'technique_chain',
  id: chain.id,
  title: chain.title,
  description: chain.endGoal,
  url: getChainUrl(chain.skillId),
  reason,
  strength,
})

const troubleshooterLink = (item: ReturnType<typeof getTroubleshooters>[number], reason?: LocalizedText, strength: KnowledgeLink['strength'] = 'related'): KnowledgeLink => ({
  type: 'troubleshooter',
  id: item.id,
  title: item.title,
  description: item.overview,
  url: getTroubleshooterUrl(item.skillId),
  reason,
  strength,
})

const escapeMapLink = (item: ReturnType<typeof getEscapeMaps>[number], reason?: LocalizedText, strength: KnowledgeLink['strength'] = 'related'): KnowledgeLink => ({
  type: 'escape_map',
  id: item.id,
  title: item.title,
  description: item.overview,
  url: getEscapeMapUrl(item.skillId),
  reason,
  strength,
})

const relatedSkillsForSkill = (skill: SkillNode) =>
  [...new Set([...skill.relatedSkills, ...skill.prerequisites])]
    .map((id) => maps.skills.get(id))
    .filter((item): item is SkillNode => Boolean(item))
    .slice(0, 6)
    .map((item, index) => skillLink(item, lt('Related skill in this lane.', 'Related skill in this lane.', 'Compétence liée dans cette ligne.'), index === 0 ? 'primary' : 'related'))

const conceptsForSkill = (skill: SkillNode) =>
  mapsConcepts()
    .filter((concept) => concept.relatedSkillIds.includes(skill.id))
    .slice(0, 6)
    .map((concept, index) => conceptLink(concept, lt('This concept appears in this skill.', 'This concept appears in this skill.', 'Ce concept apparaît dans ce skill.'), index === 0 ? 'primary' : 'related'))

const mapsConcepts = () => [...maps.concepts.values()]

const positionsForSkill = (skill: SkillNode) =>
  [...maps.positions.values()]
    .filter((position) => position.relatedSkillIds.includes(skill.id))
    .slice(0, 6)
    .map((position, index) => positionLink(position, lt('This position frames the skill.', 'This position frames the skill.', 'Cette position cadre la compétence.'), index === 0 ? 'primary' : 'related'))

const microDetailsForSkill = (skill: SkillNode) =>
  [
    ...(skill.microDetailSystem?.topFiveDetails ?? []).map((detail) =>
      microDetailLink(skill, detail.id, detail.title, detail.shortInstruction, lt('Core execution detail.', 'Core execution detail.', 'Détail d’exécution clé.')),
    ),
    ...(skill.microDetailSystem?.fastFinishPaths ?? []).map((path) =>
      microDetailLink(skill, path.id, path.title, path.finishTrigger, lt('Fast path for training or finishing.', 'Fast path for training or finishing.', 'Chemin rapide pour l’entraînement ou le finish.')),
    ),
  ].slice(0, 6)

const principlesForSkill = (skill: SkillNode) =>
  [...(skill.sharedPrincipleIds ?? [])]
    .map((id) => maps.shared.get(id))
    .filter((item): item is SharedKnowledgeItem => Boolean(item))
    .slice(0, 6)
    .map((item, index) => sharedLink(item, lt('Reusable principle or cue.', 'Reusable principle or cue.', 'Principe ou cue réutilisable.'), index === 0 ? 'primary' : 'related'))

const chainsForSkill = (skill: SkillNode) =>
  getTechniqueChains([skill])
    .slice(0, 3)
    .map((chain, index) => chainLink(chain, lt('A practical chain for this skill.', 'A practical chain for this skill.', 'Une chaîne pratique pour ce skill.'), index === 0 ? 'primary' : 'related'))

const troubleshootersForSkill = (skillId: string) =>
  getTroubleshooters(skillNodes).filter((item) => item.skillId === skillId).slice(0, 3).map((item, index) =>
    troubleshooterLink(item, lt('Use this when the finish does not land.', 'Use this when the finish does not land.', 'À utiliser quand le finish ne passe pas.'), index === 0 ? 'primary' : 'related'),
  )

const escapeMapsForSkill = (skillId: string) =>
  getEscapeMaps(skillNodes).filter((item) => item.skillId === skillId).slice(0, 3).map((item, index) =>
    escapeMapLink(item, lt('Opponent escape route for this skill.', 'Opponent escape route for this skill.', 'Route d’évasion adverse pour ce skill.'), index === 0 ? 'primary' : 'related'),
  )

const archetypesForSkill = (skill: SkillNode) =>
  [...maps.archetypes.values()]
    .filter((archetype) =>
      [...archetype.coreSkillIds, ...archetype.supportSkillIds, ...archetype.requiredDefensiveSkillIds].includes(skill.id),
    )
    .slice(0, 4)
    .map((archetype, index) => archetypeLink(archetype, lt('This archetype uses the skill.', 'This archetype uses the skill.', 'Cet archétype utilise ce skill.'), index === 0 ? 'primary' : 'related'))

const masteryForSkill = (skill: SkillNode) =>
  [...maps.mastery.values()]
    .filter((stage) => stage.keySkillIds.includes(skill.id))
    .slice(0, 4)
    .map((stage, index) => masteryLink(stage, lt('Mastery stage that uses this skill.', 'Mastery stage that uses this skill.', 'Étape de maîtrise qui utilise ce skill.'), index === 0 ? 'primary' : 'related'))

const skillGroups = (skill: SkillNode): KnowledgeLinkGroup[] => {
  const groups = [
    group(lt('Related skills', 'Related skills', 'Compétences liées'), 'skill', relatedSkillsForSkill(skill)),
    group(lt('Related concepts', 'Related concepts', 'Concepts liés'), 'concept', conceptsForSkill(skill)),
    group(lt('Related positions', 'Related positions', 'Positions liées'), 'position', positionsForSkill(skill)),
    group(lt('Related micro details', 'Related micro details', 'Détails micro liés'), 'micro_detail', microDetailsForSkill(skill)),
    group(lt('Related principles', 'Related principles', 'Principes liés'), 'shared_knowledge', principlesForSkill(skill)),
    group(lt('Related chains', 'Related chains', 'Chaînes liées'), 'technique_chain', chainsForSkill(skill)),
    group(lt('Related troubleshooters', 'Related troubleshooters', 'Dépanneurs liés'), 'troubleshooter', troubleshootersForSkill(skill.id)),
    group(lt('Related escape maps', 'Related escape maps', 'Cartes d’évasion liées'), 'escape_map', escapeMapsForSkill(skill.id)),
    group(lt('Related archetypes', 'Related archetypes', 'Archétypes liés'), 'archetype', archetypesForSkill(skill)),
    group(lt('Related mastery stages', 'Related mastery stages', 'Étapes de maîtrise liées'), 'mastery', masteryForSkill(skill)),
  ].filter((item): item is KnowledgeLinkGroup => Boolean(item))
  return groups
}

const conceptGroups = (conceptId: string): KnowledgeLinkGroup[] => {
  const concept = maps.concepts.get(conceptId)
  if (!concept) return []
  const skillLinks = concept.relatedSkillIds.map((id) => maps.skills.get(id)).filter((item): item is SkillNode => Boolean(item)).map((skill, index) => skillLink(skill, lt('Concept used here.', 'Concept used here.', 'Concept utilisé ici.'), index === 0 ? 'primary' : 'related'))
  const relatedConceptLinks = concept.relatedConceptIds.map((id) => maps.concepts.get(id)).filter((item): item is ConceptNode => Boolean(item)).map((item) => conceptLink(item, lt('Related concept.', 'Related concept.', 'Concept lié.')))
  const positionsLinks = [...maps.positions.values()]
    .filter((position) => position.relatedConceptIds.includes(concept.id))
    .map((position) => positionLink(position, lt('Position where this concept matters.', 'Position where this concept matters.', 'Position où ce concept compte.')))
  const sharedLinks = [...sharedKnowledgeItems]
    .filter((item) => (item.relatedConceptIds ?? []).includes(concept.id))
    .slice(0, 6)
    .map((item) => sharedLink(item, lt('Shared principle related to this concept.', 'Shared principle related to this concept.', 'Principe partagé lié à ce concept.')))
  const masteryLinks = [...maps.mastery.values()]
    .filter((stage) => stage.keyConceptIds.includes(concept.id))
    .map((stage) => masteryLink(stage, lt('Mastery stage that uses this concept.', 'Mastery stage that uses this concept.', 'Étape de maîtrise qui utilise ce concept.')))

  return [
    group(lt('Related skills', 'Related skills', 'Compétences liées'), 'skill', skillLinks),
    group(lt('Related concepts', 'Related concepts', 'Concepts liés'), 'concept', relatedConceptLinks),
    group(lt('Related positions', 'Related positions', 'Positions liées'), 'position', positionsLinks),
    group(lt('Related shared knowledge', 'Related shared knowledge', 'Connaissances partagées'), 'shared_knowledge', sharedLinks),
    group(lt('Related mastery stages', 'Related mastery stages', 'Étapes de maîtrise liées'), 'mastery', masteryLinks),
  ].filter((item): item is KnowledgeLinkGroup => Boolean(item))
}

const positionGroups = (positionId: string): KnowledgeLinkGroup[] => {
  const position = maps.positions.get(positionId)
  if (!position) return []
  const skills = position.relatedSkillIds.map((id) => maps.skills.get(id)).filter((item): item is SkillNode => Boolean(item)).map((skill, index) => skillLink(skill, lt('This skill starts or ends here.', 'This skill starts or ends here.', 'Ce skill commence ou finit ici.'), index === 0 ? 'primary' : 'related'))
  const conceptsForPosition = position.relatedConceptIds.map((id) => maps.concepts.get(id)).filter((item): item is ConceptNode => Boolean(item)).map((item) => conceptLink(item, lt('Concept used in this position.', 'Concept used in this position.', 'Concept utilisé dans cette position.')))
  const escapeMaps = getEscapeMaps(skillNodes)
    .filter((item) => position.relatedSkillIds.includes(item.skillId))
    .map((item) => escapeMapLink(item, lt('Escape route connected to this position.', 'Escape route connected to this position.', 'Route d’évasion liée à cette position.')))
  const sharedLinks = [...sharedKnowledgeItems].filter((item) => (item.relatedConceptIds ?? []).some((conceptId) => position.relatedConceptIds.includes(conceptId))).slice(0, 6).map((item) => sharedLink(item))
  return [
    group(lt('Related skills', 'Related skills', 'Compétences liées'), 'skill', skills),
    group(lt('Related concepts', 'Related concepts', 'Concepts liés'), 'concept', conceptsForPosition),
    group(lt('Related escape maps', 'Related escape maps', 'Cartes d’évasion liées'), 'escape_map', escapeMaps),
    group(lt('Related principles', 'Related principles', 'Principes liés'), 'shared_knowledge', sharedLinks),
  ].filter((item): item is KnowledgeLinkGroup => Boolean(item))
}

const troubleshooterGroups = (skillId: string): KnowledgeLinkGroup[] => {
  const skill = maps.skills.get(skillId)
  if (!skill) return []
  const relatedSkills = [skill].concat(skill.relatedSkills.map((id) => maps.skills.get(id)).filter((item): item is SkillNode => Boolean(item))).slice(0, 6).map((item, index) => skillLink(item, lt('Related to this troubleshooting path.', 'Related to this troubleshooting path.', 'Lié à ce chemin de diagnostic.'), index === 0 ? 'primary' : 'related'))
  const microDetails = microDetailsForSkill(skill)
  const conceptsForTroubleshooter = [...maps.concepts.values()].filter((concept) => concept.relatedSkillIds.includes(skill.id)).slice(0, 6).map((concept) => conceptLink(concept, lt('Concept that affects this submission.', 'Concept that affects this submission.', 'Concept qui affecte cette soumission.')))
  const escapeMaps = escapeMapsForSkill(skill.id)
  return [
    group(lt('Related skill', 'Related skill', 'Compétence liée'), 'skill', relatedSkills),
    group(lt('Related micro details', 'Related micro details', 'Détails micro liés'), 'micro_detail', microDetails),
    group(lt('Related concepts', 'Related concepts', 'Concepts liés'), 'concept', conceptsForTroubleshooter),
    group(lt('Related escape maps', 'Related escape maps', 'Cartes d’évasion liées'), 'escape_map', escapeMaps),
  ].filter((item): item is KnowledgeLinkGroup => Boolean(item))
}

const chainGroups = (chainId: string): KnowledgeLinkGroup[] => {
  const chain = maps.chains.find((item) => item.id === chainId || item.skillId === chainId)
  if (!chain) return []
  const skill = maps.skills.get(chain.skillId)
  const skillLinks = skill ? [skillLink(skill, lt('Start skill for this chain.', 'Start skill for this chain.', 'Skill de départ de cette chaîne.'), 'primary')] : []
  const stepSkills = chain.steps.flatMap((step) => step.nextSkillIds.map((id) => maps.skills.get(id)).filter((item): item is SkillNode => Boolean(item))).slice(0, 6).map((item) => skillLink(item, lt('Next skill in the chain.', 'Next skill in the chain.', 'Compétence suivante dans la chaîne.')))
  const conceptsForChain = [...maps.concepts.values()].filter((concept) => concept.relatedSkillIds.includes(chain.skillId)).slice(0, 6).map((concept) => conceptLink(concept, lt('Concept that supports this chain.', 'Concept that supports this chain.', 'Concept qui soutient cette chaîne.')))
  const positionsForChain = [...maps.positions.values()].filter((position) => position.relatedSkillIds.includes(chain.skillId)).slice(0, 6).map((position) => positionLink(position, lt('Position appearing in this chain.', 'Position appearing in this chain.', 'Position présente dans cette chaîne.')))
  const relatedProblems: KnowledgeLink[] = []
  return [
    group(lt('Chain skill', 'Chain skill', 'Skill de la chaîne'), 'skill', skillLinks),
    group(lt('Related skills', 'Related skills', 'Compétences liées'), 'skill', stepSkills),
    group(lt('Related concepts', 'Related concepts', 'Concepts liés'), 'concept', conceptsForChain),
    group(lt('Related positions', 'Related positions', 'Positions liées'), 'position', positionsForChain),
    group(lt('Related problems', 'Related problems', 'Problèmes liés'), 'problem', relatedProblems),
  ].filter((item): item is KnowledgeLinkGroup => Boolean(item))
}

const problemGroups = (_problemId: string): KnowledgeLinkGroup[] => []

const glossaryGroups = (termId: string): KnowledgeLinkGroup[] => {
  const term = maps.glossary.get(termId)
  if (!term) return []
  const skills = (term.relatedSkillIds ?? []).map((id) => maps.skills.get(id)).filter((item): item is SkillNode => Boolean(item)).map((skill, index) => skillLink(skill, lt('Glossary term used here.', 'Glossary term used here.', 'Terme du glossaire utilisé ici.'), index === 0 ? 'primary' : 'related'))
  return [group(lt('Related skills', 'Related skills', 'Compétences liées'), 'skill', skills)].filter((item): item is KnowledgeLinkGroup => Boolean(item))
}

const sharedKnowledgeGroups = (itemId: string): KnowledgeLinkGroup[] => {
  const item = maps.shared.get(itemId)
  if (!item) return []
  const skills = (item.relatedSkillIds ?? [])
    .map((id) => maps.skills.get(id))
    .filter((value): value is SkillNode => Boolean(value))
    .map((skill, index) => skillLink(skill, lt('This shared principle appears here.', 'This shared principle appears here.', 'Ce principe partagé apparaît ici.'), index === 0 ? 'primary' : 'related'))
  const concepts = (item.relatedConceptIds ?? [])
    .map((id) => maps.concepts.get(id))
    .filter((value): value is ConceptNode => Boolean(value))
    .map((concept) => conceptLink(concept, lt('Concept linked to this principle.', 'Concept linked to this principle.', 'Concept lié à ce principe.')))
  return [
    group(lt('Related skills', 'Related skills', 'Compétences liées'), 'skill', skills),
    group(lt('Related concepts', 'Related concepts', 'Concepts liés'), 'concept', concepts),
  ].filter((groupItem): groupItem is KnowledgeLinkGroup => Boolean(groupItem))
}

const defenseGroups = (defenseId: string): KnowledgeLinkGroup[] => {
  const layer = maps.defenses.get(defenseId)
  if (!layer) return []
  const skills = layer.relatedSkillIds
    .map((id) => maps.skills.get(id))
    .filter((value): value is SkillNode => Boolean(value))
    .map((skill, index) => skillLink(skill, lt('Related safety skill.', 'Related safety skill.', 'Kỹ năng an toàn liên quan.'), index === 0 ? 'primary' : 'related'))
  const concepts = layer.relatedConceptIds
    .map((id) => maps.concepts.get(id))
    .filter((value): value is ConceptNode => Boolean(value))
    .map((concept) => conceptLink(concept, lt('Concept behind this danger.', 'Concept behind this danger.', 'Concept phía sau nguy hiểm này.')))
  return [
    group(lt('Related skills', 'Related skills', 'Compétences liées'), 'skill', skills),
    group(lt('Related concepts', 'Related concepts', 'Concepts liés'), 'concept', concepts),
  ].filter((groupItem): groupItem is KnowledgeLinkGroup => Boolean(groupItem))
}

const masteryGroups = (stageId: string): KnowledgeLinkGroup[] => {
  const stage = maps.mastery.get(stageId)
  if (!stage) return []
  const skills = stage.keySkillIds.map((id) => maps.skills.get(id)).filter((item): item is SkillNode => Boolean(item)).map((skill, index) => skillLink(skill, lt('Key skill in this mastery stage.', 'Key skill in this mastery stage.', 'Compétence clé de cette étape.'), index === 0 ? 'primary' : 'related'))
  const concepts = stage.keyConceptIds.map((id) => maps.concepts.get(id)).filter((item): item is ConceptNode => Boolean(item)).map((concept) => conceptLink(concept, lt('Key concept in this mastery stage.', 'Key concept in this mastery stage.', 'Concept clé de cette étape.')))
  const archetypeLinks = [...maps.archetypes.values()].filter((archetype) =>
    [...archetype.coreSkillIds, ...archetype.supportSkillIds, ...archetype.requiredDefensiveSkillIds].some((id) => stage.keySkillIds.includes(id)),
  ).slice(0, 6).map((archetype) => archetypeLink(archetype, lt('Archetype supported by this stage.', 'Archetype supported by this stage.', 'Archétype soutenu par cette étape.')))
  return [
    group(lt('Key skills', 'Key skills', 'Compétences clés'), 'skill', skills),
    group(lt('Key concepts', 'Key concepts', 'Concepts clés'), 'concept', concepts),
    group(lt('Related archetypes', 'Related archetypes', 'Archétypes liés'), 'archetype', archetypeLinks),
  ].filter((item): item is KnowledgeLinkGroup => Boolean(item))
}

const archetypeGroups = (archetypeId: string): KnowledgeLinkGroup[] => {
  const archetype = maps.archetypes.get(archetypeId)
  if (!archetype) return []
  const coreSkills = archetype.coreSkillIds.map((id) => maps.skills.get(id)).filter((item): item is SkillNode => Boolean(item)).map((skill, index) => skillLink(skill, lt('Core skill for this archetype.', 'Core skill for this archetype.', 'Skill clé de cet archétype.'), index === 0 ? 'primary' : 'related'))
  const supportSkills = archetype.supportSkillIds.map((id) => maps.skills.get(id)).filter((item): item is SkillNode => Boolean(item)).map((skill) => skillLink(skill, lt('Support skill for this archetype.', 'Support skill for this archetype.', 'Skill de soutien de cet archétype.')))
  const defensiveSkills = archetype.requiredDefensiveSkillIds.map((id) => maps.skills.get(id)).filter((item): item is SkillNode => Boolean(item)).map((skill) => skillLink(skill, lt('Required defensive skill.', 'Required defensive skill.', 'Skill défensif requis.')))
  const concepts = archetype.coreConceptIds.map((id) => maps.concepts.get(id)).filter((item): item is ConceptNode => Boolean(item)).map((concept) => conceptLink(concept, lt('Core concept for this archetype.', 'Core concept for this archetype.', 'Concept clé de cet archétype.')))
  const mastery = [...maps.mastery.values()].filter((stage) =>
    stage.keySkillIds.some((id) => [...archetype.coreSkillIds, ...archetype.supportSkillIds, ...archetype.requiredDefensiveSkillIds].includes(id)),
  ).map((stage) => masteryLink(stage, lt('Mastery stage that trains this archetype.', 'Mastery stage that trains this archetype.', 'Étape de maîtrise pour cet archétype.')))
  return [
    group(lt('Core skills', 'Core skills', 'Compétences clés'), 'skill', coreSkills),
    group(lt('Support skills', 'Support skills', 'Compétences de soutien'), 'skill', supportSkills),
    group(lt('Required defensive skills', 'Required defensive skills', 'Compétences défensives requises'), 'skill', defensiveSkills),
    group(lt('Core concepts', 'Core concepts', 'Concepts clés'), 'concept', concepts),
    group(lt('Mastery stages', 'Mastery stages', 'Étapes de maîtrise'), 'mastery', mastery),
  ].filter((item): item is KnowledgeLinkGroup => Boolean(item))
}

export const getSkillKnowledgeLinks = (skillId: string): KnowledgeLinkGroup[] => {
  const skill = maps.skills.get(skillId)
  return skill ? skillGroups(skill) : []
}

export const getConceptKnowledgeLinks = (conceptId: string): KnowledgeLinkGroup[] => conceptGroups(conceptId)

export const getPositionKnowledgeLinks = (positionId: string): KnowledgeLinkGroup[] => positionGroups(positionId)

export const getTroubleshooterKnowledgeLinks = (skillId: string): KnowledgeLinkGroup[] => troubleshooterGroups(skillId)

export const getChainKnowledgeLinks = (chainId: string): KnowledgeLinkGroup[] => chainGroups(chainId)

export const getProblemKnowledgeLinks = (problemId: string): KnowledgeLinkGroup[] => problemGroups(problemId)

export const getRelatedItems = (itemType: KnowledgeItemType, itemId: string): KnowledgeLinkGroup[] => {
  switch (itemType) {
    case 'skill':
      return getSkillKnowledgeLinks(itemId)
    case 'concept':
      return getConceptKnowledgeLinks(itemId)
    case 'position':
      return getPositionKnowledgeLinks(itemId)
    case 'glossary':
      return glossaryGroups(itemId)
    case 'shared_knowledge':
      return sharedKnowledgeGroups(itemId)
    case 'defense':
      return defenseGroups(itemId)
    case 'archetype':
      return archetypeGroups(itemId)
    case 'mastery':
      return masteryGroups(itemId)
    case 'quick_card':
    case 'quality_check':
      return getSkillKnowledgeLinks(itemId)
    case 'technique_chain':
      return getChainKnowledgeLinks(itemId)
    case 'troubleshooter':
      return getTroubleshooterKnowledgeLinks(itemId)
    case 'problem':
      return getProblemKnowledgeLinks(itemId)
    default:
      return []
  }
}

export const getNextBestLinksForSkill = (skillId: string): KnowledgeLink[] => {
  const skill = maps.skills.get(skillId)
  if (!skill) return []

  const result: KnowledgeLink[] = []

  if (skill.quickCard) result.push(quickCardLink(skill))
  if (skill.microDetailSystem) result.push({
    type: 'micro_detail',
    id: `${skill.id}:micro-details`,
    title: lt('Micro Details', 'Micro Details', 'Chi tiết ăn tiền'),
    description: skill.microDetailSystem.overview,
    url: getMicroDetailsUrl(skill.id),
    reason: lt('Review the top execution details.', 'Review the top execution details.', 'Ôn các chi tiết thực thi quan trọng.'),
    strength: 'primary',
  })
  if (skill.qualityChecklist) result.push(qualityCheckLink(skill))

  const troubleshooter = getTroubleshooters(skillNodes).find((item) => item.skillId === skill.id)
  if (troubleshooter) result.push(troubleshooterLink(troubleshooter, lt('Use this if the finish is missing.', 'Use this if the finish is missing.', 'Dùng khi finish chưa ra.')))

  const escapeMap = getEscapeMaps(skillNodes).find((item) => item.skillId === skill.id)
  if (escapeMap) result.push(escapeMapLink(escapeMap, lt('Learn what opponents do when this fails.', 'Learn what opponents do when this fails.', 'Học đối thủ làm gì khi skill này fail.')))

  const chain = getTechniqueChains([skill])[0]
  if (chain) result.push(chainLink(chain, lt('See the practical next branch.', 'See the practical next branch.', 'Xem nhánh tiếp theo thực tế.')))

  const concept = [...maps.concepts.values()].find((item) => item.relatedSkillIds.includes(skill.id))
  if (concept) result.push(conceptLink(concept, lt('Understand the concept behind the skill.', 'Understand the concept behind the skill.', 'Hiểu concept phía sau skill.')))

  const position = [...maps.positions.values()].find((item) => item.relatedSkillIds.includes(skill.id))
  if (position) result.push(positionLink(position, lt('See the position this skill lives in.', 'See the position this skill lives in.', 'Xem vị trí mà skill này sống trong đó.')))

  const archetype = [...maps.archetypes.values()].find((item) =>
    [...item.coreSkillIds, ...item.supportSkillIds, ...item.requiredDefensiveSkillIds].includes(skill.id),
  )
  if (archetype) result.push(archetypeLink(archetype, lt('See the game style that uses this skill.', 'See the game style that uses this skill.', 'Xem kiểu game dùng skill này.')))

  const mastery = [...maps.mastery.values()].find((item) => item.keySkillIds.includes(skill.id))
  if (mastery) result.push(masteryLink(mastery, lt('See the mastery stage that owns this skill.', 'See the mastery stage that owns this skill.', 'Xem giai đoạn trưởng thành chứa skill này.')))

  return result.slice(0, 6)
}
