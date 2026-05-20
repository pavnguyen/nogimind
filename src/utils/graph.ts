import type { Edge, Node } from '@xyflow/react'
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


