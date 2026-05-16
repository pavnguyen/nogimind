import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { cn } from '../../utils/cn'
import type { ChainFlowNodeData } from '../../utils/chainGraph'

const variantStyles: Record<ChainFlowNodeData['variant'], { border: string; bg: string; text: string; subtext: string }> = {
  start: {
    border: 'border-cyan-400/40 hover:border-cyan-300/60',
    bg: 'bg-slate-950',
    text: 'text-cyan-50',
    subtext: 'text-cyan-300/70',
  },
  step: {
    border: 'border-emerald-400/30 hover:border-emerald-300/50',
    bg: 'bg-slate-950',
    text: 'text-emerald-50',
    subtext: 'text-emerald-300/60',
  },
  failure: {
    border: 'border-rose-400/30 hover:border-rose-300/50',
    bg: 'bg-slate-950',
    text: 'text-rose-50',
    subtext: 'text-rose-300/60',
  },
  endgoal: {
    border: 'border-violet-400/40 hover:border-violet-300/60',
    bg: 'bg-slate-950',
    text: 'text-violet-50',
    subtext: 'text-violet-300/70',
  },
}

const variantIcons: Record<ChainFlowNodeData['variant'], string> = {
  start: '●',
  step: '◆',
  failure: '✕',
  endgoal: '★',
}

export const ChainFlowNode = ({ data }: NodeProps<ChainFlowNodeData>) => {
  const navigate = useNavigate()
  const vs = variantStyles[data.variant]
  const handleClick = useCallback(() => {
    navigate(`/skills/${data.skillId}`)
  }, [navigate, data.skillId])

  return (
    <div
      onClick={handleClick}
      className={cn(
        'min-w-44 cursor-pointer rounded-lg border p-3 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-glow',
        'backdrop-blur-sm',
        vs.border,
        vs.bg,
      )}
    >
      <Handle type="target" position={Position.Left} className="!h-2.5 !w-2.5 !border-2 !border-slate-600 !bg-slate-800" />
      <div className="flex items-start gap-2">
        <span className={cn('mt-0.5 text-sm', data.variant === 'endgoal' ? 'text-violet-400' : data.variant === 'failure' ? 'text-rose-400' : 'text-cyan-400')}>
          {variantIcons[data.variant]}
        </span>
        <div className="min-w-0 flex-1">
          <p className={cn('text-sm font-semibold leading-tight', vs.text)}>
            {data.label}
          </p>
          {data.sublabel ? (
            <p className={cn('mt-1 text-[11px] leading-snug', vs.subtext)}>
              {data.sublabel}
            </p>
          ) : null}
          {data.variant === 'step' && (
            <span className="mt-1.5 inline-block rounded bg-emerald-400/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-300/80">
              Step
            </span>
          )}
          {data.variant === 'failure' && (
            <span className="mt-1.5 inline-block rounded bg-rose-400/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-rose-300/80">
              Failure branch
            </span>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!h-2.5 !w-2.5 !border-2 !border-slate-600 !bg-slate-800" />
    </div>
  )
}
