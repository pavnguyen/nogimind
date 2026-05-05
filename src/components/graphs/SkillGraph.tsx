import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Background, Controls, ReactFlow } from '@xyflow/react'
import type { LanguageCode, SkillNode } from '../../types/skill'
import { buildSkillGraph, type SkillGraphFilters } from '../../utils/graph'
import { CustomSkillNode } from './CustomSkillNode'

const nodeTypes = { skillNode: CustomSkillNode }

export const SkillGraph = ({
  skills,
  filters,
  lang,
}: {
  skills: SkillNode[]
  filters: SkillGraphFilters
  lang: LanguageCode
}) => {
  const navigate = useNavigate()
  const graph = useMemo(() => buildSkillGraph(skills, filters, lang), [skills, filters, lang])

  return (
    <div className="h-[680px] overflow-hidden rounded-lg border border-white/10 bg-slate-950/70">
      <ReactFlow
        nodes={graph.nodes}
        edges={graph.edges}
        nodeTypes={nodeTypes}
        fitView
        onNodeClick={(_, node) => navigate(`/skills/${node.id}`)}
      >
        <Background color="#334155" gap={18} />
        <Controls />
      </ReactFlow>
    </div>
  )
}
