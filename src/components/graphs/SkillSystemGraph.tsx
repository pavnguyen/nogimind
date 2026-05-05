import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Background, Controls, ReactFlow } from '@xyflow/react'
import type { LanguageCode, SkillNode } from '../../types/skill'
import { buildSkillDetailGraph } from '../../utils/graph'
import { CustomSkillNode } from './CustomSkillNode'

const nodeTypes = { skillNode: CustomSkillNode }

export const SkillSystemGraph = ({
  skill,
  allSkills,
  lang,
}: {
  skill: SkillNode
  allSkills: SkillNode[]
  lang: LanguageCode
}) => {
  const navigate = useNavigate()
  const graph = useMemo(() => buildSkillDetailGraph(skill, allSkills, lang), [skill, allSkills, lang])

  return (
    <div className="h-[420px] overflow-hidden rounded-lg border border-white/10 bg-slate-950/70">
      <ReactFlow nodes={graph.nodes} edges={graph.edges} nodeTypes={nodeTypes} fitView onNodeClick={(_, node) => navigate(`/skills/${node.id}`)}>
        <Background color="#334155" gap={18} />
        <Controls />
      </ReactFlow>
    </div>
  )
}
