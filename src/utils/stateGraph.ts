import type { Edge, Node } from '@xyflow/react'
import type { LanguageCode, SkillNode } from '../types/skill'
import type { TechniqueStateMachine } from '../types/stateMachine'
import { getLocalizedText } from './localization'

const outcomeColor = {
  success: '#34d399',
  failure: '#fbbf24',
  counter: '#fb7185',
  reset: '#38bdf8',
  safety_abort: '#f97316',
  branch: '#a78bfa',
} as const

export const buildTechniqueStateGraph = (
  stateMachine: TechniqueStateMachine,
  skill: SkillNode,
  skillsById: Map<string, SkillNode>,
  lang: LanguageCode,
): { nodes: Node[]; edges: Edge[] } => {
  const nodes: Node[] = [
    {
      id: 'skill',
      position: { x: 260, y: 140 },
      data: { label: getLocalizedText(skill.title, lang) },
      style: {
        border: '1px solid rgba(94, 234, 212, .5)',
        background: '#0f172a',
        color: '#f8fafc',
        borderRadius: 10,
        padding: 12,
        width: 190,
        textAlign: 'center',
      },
    },
  ]

  if (stateMachine.fromPositionId) {
    nodes.push({
      id: 'from',
      position: { x: 0, y: 140 },
      data: { label: stateMachine.fromPositionId },
      style: {
        border: '1px solid rgba(148, 163, 184, .35)',
        background: '#020617',
        color: '#cbd5e1',
        borderRadius: 10,
        padding: 10,
        width: 170,
        textAlign: 'center',
      },
    })
  }

  const edges: Edge[] = stateMachine.fromPositionId
    ? [{ id: 'from-skill', source: 'from', target: 'skill', animated: false, style: { stroke: '#475569' } }]
    : []

  stateMachine.outcomes.forEach((outcome, index) => {
    const y = 20 + index * 105
    const outcomeId = `outcome-${outcome.id}`
    const targetId = `target-${outcome.id}`
    const targetSkill = outcome.toSkillId ? skillsById.get(outcome.toSkillId) : undefined
    const targetLabel =
      targetSkill
        ? getLocalizedText(targetSkill.title, lang)
        : outcome.toPositionId ?? outcome.toSubmissionId ?? outcome.toProblemId ?? outcome.toSafetyNoteId ?? getLocalizedText(outcome.label, lang)

    nodes.push({
      id: outcomeId,
      position: { x: 560, y },
      data: { label: `${outcome.result.replace('_', ' ')}: ${getLocalizedText(outcome.label, lang)}` },
      style: {
        border: `1px solid ${outcomeColor[outcome.result]}`,
        background: '#0f172a',
        color: '#f8fafc',
        borderRadius: 10,
        padding: 10,
        width: 210,
        fontSize: 12,
      },
    })
    nodes.push({
      id: targetId,
      position: { x: 840, y },
      data: { label: targetLabel },
      style: {
        border: '1px solid rgba(148, 163, 184, .35)',
        background: '#020617',
        color: '#cbd5e1',
        borderRadius: 10,
        padding: 10,
        width: 190,
        fontSize: 12,
      },
    })
    edges.push(
      { id: `skill-${outcomeId}`, source: 'skill', target: outcomeId, style: { stroke: outcomeColor[outcome.result] } },
      { id: `${outcomeId}-${targetId}`, source: outcomeId, target: targetId, style: { stroke: '#475569' } },
    )
  })

  return { nodes, edges }
}
