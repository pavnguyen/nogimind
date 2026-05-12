import { useMemo } from 'react'
import { Background, Controls, ReactFlow } from '@xyflow/react'
import type { LanguageCode, SkillNode } from '../../types/skill'
import type { TechniqueStateMachine } from '../../types/stateMachine'
import { buildTechniqueStateGraph } from '../../utils/stateGraph'

type Props = {
  stateMachine: TechniqueStateMachine
  skill: SkillNode
  skillsById: Map<string, SkillNode>
  lang: LanguageCode
}

export const TechniqueStateGraph = ({ stateMachine, skill, skillsById, lang }: Props) => {
  const graph = useMemo(() => buildTechniqueStateGraph(stateMachine, skill, skillsById, lang), [stateMachine, skill, skillsById, lang])

  return (
    <div className="h-[360px] overflow-hidden rounded-lg border border-white/10 bg-slate-950/70">
      <ReactFlow nodes={graph.nodes} edges={graph.edges} fitView nodesDraggable={false} nodesConnectable={false} elementsSelectable={false}>
        <Background color="#334155" gap={18} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  )
}
