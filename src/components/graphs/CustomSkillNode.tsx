import { Handle, Position, type Node, type NodeProps } from '@xyflow/react'
import { cn } from '../../utils/cn'

export type SkillFlowNode = Node<
  {
    label: string
    domain?: string
    level?: string
    active?: boolean
  },
  'skillNode'
>

export const CustomSkillNode = ({ data }: NodeProps<SkillFlowNode>) => (
  <div
    className={cn(
      'min-w-48 cursor-pointer rounded-lg border bg-slate-950/95 p-3 transition-colors hover:bg-white/5 shadow-glow',
      data.active ? 'border-emerald-300' : 'border-white/15',
    )}
  >
    <Handle type="target" position={Position.Left} className="!bg-cyan-300" />
    <p className="text-sm font-semibold text-white">{data.label}</p>
    {data.domain ? <p className="mt-1 text-xs text-slate-400">{data.domain}</p> : null}
    <Handle type="source" position={Position.Right} className="!bg-emerald-300" />
  </div>
)
