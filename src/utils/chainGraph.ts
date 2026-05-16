import type { Edge, Node } from '@xyflow/react'
import type { LanguageCode } from '../types/skill'
import type { TechniqueChainItem } from './knowledgeModules'
import { getLocalizedText } from './localization'

export type ChainFlowNodeData = {
  label: string
  sublabel?: string
  variant: 'start' | 'step' | 'failure' | 'endgoal'
  skillId: string
  stepId?: string
}

export const buildChainGraph = (
  chain: TechniqueChainItem,
  lang: LanguageCode,
): { nodes: Node<ChainFlowNodeData>[]; edges: Edge[] } => {
  const nodes: Node<ChainFlowNodeData>[] = []
  const edges: Edge[] = []

  // Start node
  const startLabel = getLocalizedText(chain.startNode, lang)
  nodes.push({
    id: `${chain.id}-start`,
    type: 'chainFlowNode',
    position: { x: 0, y: 0 },
    data: {
      label: getLocalizedText(chain.title, lang),
      sublabel: startLabel,
      variant: 'start',
      skillId: chain.skillId,
    },
  })

  // Step nodes — main flow
  let prevId = `${chain.id}-start`
  chain.steps.forEach((step, index) => {
    const stepId = `${chain.id}-step-${index}`
    const stepTitle = getLocalizedText(step.title, lang)
    const stepGoal = getLocalizedText(step.goal, lang)
    const stepDetail = getLocalizedText(step.keyDetail, lang)

    nodes.push({
      id: stepId,
      type: 'chainFlowNode',
      position: { x: (index + 1) * 280, y: 0 },
      data: {
        label: stepTitle,
        sublabel: stepDetail || stepGoal,
        variant: 'step',
        skillId: chain.skillId,
        stepId: step.id,
      },
    })
    edges.push({
      id: `${prevId}-${stepId}`,
      source: prevId,
      target: stepId,
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#22d3ee', strokeWidth: 2 },
      label: stepGoal,
    })
    prevId = stepId
  })

  // Failure branch nodes — rendered below the main flow
  chain.failureBranches.forEach((branch, index) => {
    const branchId = `${chain.id}-failure-${index}`
    const failureLabel = getLocalizedText(branch.failure, lang)
    const responseLabel = getLocalizedText(branch.response, lang)
    const yOffset = 140 + index * 120

    nodes.push({
      id: branchId,
      type: 'chainFlowNode',
      position: { x: 280, y: yOffset },
      data: {
        label: failureLabel,
        sublabel: responseLabel,
        variant: 'failure',
        skillId: chain.skillId,
      },
    })
    // Connect the start or first step to the first failure branch
    edges.push({
      id: `${chain.id}-start-${branchId}`,
      source: `${chain.id}-start`,
      target: branchId,
      type: 'smoothstep',
      animated: false,
      style: { stroke: '#fb7185', strokeWidth: 1.5, strokeDasharray: '6 3' },
      label: `⚠ ${failureLabel}`,
    })
  })

  // End goal node
  const endLabel = getLocalizedText(chain.endGoal, lang)
  nodes.push({
    id: `${chain.id}-end`,
    type: 'chainFlowNode',
    position: { x: (chain.steps.length + 1) * 280, y: 0 },
    data: {
      label: endLabel,
      sublabel: 'Goal',
      variant: 'endgoal',
      skillId: chain.skillId,
    },
  })
  if (chain.steps.length > 0) {
    edges.push({
      id: `${prevId}-${chain.id}-end`,
      source: prevId,
      target: `${chain.id}-end`,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#34d399', strokeWidth: 2 },
      label: '→ Goal',
    })
  }

  return { nodes, edges }
}
