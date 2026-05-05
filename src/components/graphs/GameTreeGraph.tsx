import { useMemo } from 'react'
import { Background, Controls, ReactFlow } from '@xyflow/react'
import type { GameTree } from '../../types/gameTree'
import type { LanguageCode, SkillNode } from '../../types/skill'
import { buildGameTreeGraph } from '../../utils/graph'
import { CustomSkillNode } from './CustomSkillNode'

const nodeTypes = { skillNode: CustomSkillNode }

export const GameTreeGraph = ({
  gameTree,
  skills,
  lang,
}: {
  gameTree: GameTree
  skills: SkillNode[]
  lang: LanguageCode
}) => {
  const graph = useMemo(() => buildGameTreeGraph(gameTree, skills, lang), [gameTree, skills, lang])
  return (
    <div className="h-[520px] overflow-hidden rounded-lg border border-white/10 bg-slate-950/70">
      <ReactFlow nodes={graph.nodes} edges={graph.edges} nodeTypes={nodeTypes} fitView>
        <Background color="#334155" gap={18} />
        <Controls />
      </ReactFlow>
    </div>
  )
}
