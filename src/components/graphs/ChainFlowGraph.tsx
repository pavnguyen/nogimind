import { useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Background, Controls, ReactFlow, type Node } from '@xyflow/react'
import type { LanguageCode } from '../../types/skill'
import type { TechniqueChainItem } from '../../utils/knowledgeModules'
import { buildChainGraph, type ChainFlowNodeData } from '../../utils/chainGraph'
import { ChainFlowNode } from './ChainFlowNode'

const nodeTypes = { chainFlowNode: ChainFlowNode }

const Legend = () => (
  <div className="pointer-events-none absolute bottom-3 left-3 z-10 flex flex-wrap gap-3 rounded-lg border border-white/10 bg-slate-950/90 p-2.5 text-[11px] leading-none backdrop-blur-sm">
    <span className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full bg-cyan-400" />
      <span className="text-slate-400">Start</span>
    </span>
    <span className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full bg-emerald-400" />
      <span className="text-slate-400">Step</span>
    </span>
    <span className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full bg-rose-400" />
      <span className="text-slate-400">Failure</span>
    </span>
    <span className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full bg-violet-400" />
      <span className="text-slate-400">Goal</span>
    </span>
  </div>
)

type Props = {
  chain: TechniqueChainItem
  lang: LanguageCode
}

export const ChainFlowGraph = ({ chain, lang }: Props) => {
  const navigate = useNavigate()

  // Compute nodes/edges from props directly (not via useNodesState) so they
  // update reactively when chain or lang changes — avoids stale state bug.
  const { nodes, edges } = useMemo(
    () => buildChainGraph(chain, lang),
    [chain, lang],
  )

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node<ChainFlowNodeData>) => {
      navigate(`/skills/${node.data.skillId}`)
    },
    [navigate],
  )

  return (
    <div className="h-[360px] overflow-hidden rounded-lg border border-white/10 bg-slate-950/70">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        onNodeClick={onNodeClick}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background color="#1e293b" gap={20} />
        <Controls showInteractive={false} className="!bg-slate-900/80 !border-white/10" />
      </ReactFlow>
      <Legend />
    </div>
  )
}
