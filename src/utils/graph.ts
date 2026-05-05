import type { Edge, Node } from '@xyflow/react'
import type { GameTree, GameTreeLaneId } from '../types/gameTree'
import type { LanguageCode, SkillDomain, SkillLevel, SkillNode } from '../types/skill'
import { getDomainLabel, getLocalizedText } from './localization'

export type SkillGraphFilters = {
  domain?: SkillDomain | ''
  level?: SkillLevel | ''
  tag?: string
}

const domainOrder: SkillDomain[] = [
  'positional_awareness',
  'survival_defense',
  'escapes',
  'guard_retention',
  'guard_offense',
  'wrestle_up_wrestling',
  'passing',
  'pins_rides',
  'back_control',
  'submission_systems',
]

const laneOrder: GameTreeLaneId[] = ['standing', 'guard', 'passing', 'pinning', 'submissions', 'escapes', 'legLocks']

const toNode = (skill: SkillNode, lang: LanguageCode, x: number, y: number, active = false): Node => ({
  id: skill.id,
  type: 'skillNode',
  position: { x, y },
  data: {
    label: getLocalizedText(skill.title, lang),
    domain: getDomainLabel(skill.domain, lang),
    level: skill.level,
    active,
  },
})

export const buildSkillGraph = (
  skills: SkillNode[],
  filters: SkillGraphFilters,
  lang: LanguageCode,
): { nodes: Node[]; edges: Edge[] } => {
  const filtered = skills.filter((skill) => {
    if (filters.domain && skill.domain !== filters.domain) return false
    if (filters.level && skill.level !== filters.level) return false
    if (filters.tag && !skill.tags.includes(filters.tag)) return false
    return true
  })
  const ids = new Set(filtered.map((skill) => skill.id))
  const nodes = filtered.map((skill, index) => {
    const domainIndex = domainOrder.indexOf(skill.domain)
    const withinDomain = filtered.slice(0, index).filter((item) => item.domain === skill.domain).length
    return toNode(skill, lang, domainIndex * 280, withinDomain * 150)
  })
  const edges: Edge[] = filtered.flatMap((skill) => [
    ...skill.prerequisites
      .filter((source) => ids.has(source))
      .map((source) => ({
        id: `${source}-${skill.id}`,
        source,
        target: skill.id,
        type: 'smoothstep',
        animated: false,
      })),
    ...skill.relatedSkills
      .filter((target) => ids.has(target))
      .map((target) => ({
        id: `${skill.id}-${target}-related`,
        source: skill.id,
        target,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#22d3ee', strokeDasharray: '5 5' },
      })),
  ])
  return { nodes, edges }
}

export const buildSkillDetailGraph = (skill: SkillNode, allSkills: SkillNode[], lang: LanguageCode) => {
  const ids = new Set(allSkills.map((item) => item.id))
  const byId = new Map(allSkills.map((item) => [item.id, item]))
  const previous = skill.prerequisites.filter((id) => ids.has(id)).map((id) => byId.get(id)!)
  const nextIds = [...skill.relatedSkills, ...skill.failureResponses.flatMap((failure) => failure.nextSkillIds)].filter((id) => ids.has(id))
  const next = [...new Set(nextIds)].map((id) => byId.get(id)!)
  const nodes = [
    ...previous.map((item, index) => toNode(item, lang, 0, index * 150)),
    toNode(skill, lang, 360, Math.max(0, previous.length - 1) * 75, true),
    ...next.map((item, index) => toNode(item, lang, 720, index * 150)),
  ]
  const edges: Edge[] = [
    ...previous.map((item) => ({ id: `${item.id}-${skill.id}`, source: item.id, target: skill.id, type: 'smoothstep' })),
    ...next.map((item) => ({ id: `${skill.id}-${item.id}`, source: skill.id, target: item.id, type: 'smoothstep', animated: true })),
  ]
  return { nodes, edges }
}

export const buildGameTreeGraph = (gameTree: GameTree, allSkills: SkillNode[], lang: LanguageCode) => {
  const byId = new Map(allSkills.map((skill) => [skill.id, skill]))
  const nodes: Node[] = []
  const edges: Edge[] = []

  laneOrder.forEach((lane, laneIndex) => {
    gameTree[lane].forEach((skillId, index) => {
      const skill = byId.get(skillId)
      if (!skill) return
      nodes.push(toNode(skill, lang, laneIndex * 260, index * 145))
      const nextId = gameTree[lane][index + 1]
      if (nextId && byId.has(nextId)) {
        edges.push({ id: `${skillId}-${nextId}`, source: skillId, target: nextId, type: 'smoothstep', animated: true })
      }
    })
  })

  return { nodes, edges }
}
