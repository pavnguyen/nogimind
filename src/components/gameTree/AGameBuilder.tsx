import { useTranslation } from 'react-i18next'
import type { GameTree } from '../../types/gameTree'

const archetypes: Record<string, Partial<GameTree>> = {
  wrestleUp: {
    guard: ['seated-guard-retention', 'shin-to-shin-entry', 'half-guard-wrestle-up'],
    standing: ['technical-stand-up', 'single-leg-bjj'],
    passing: ['bodylock-passing'],
    submissions: ['back-control', 'rear-naked-choke-system'],
  },
  pressurePasser: {
    standing: ['hand-fighting'],
    passing: ['bodylock-passing', 'headquarters-passing', 'knee-cut-passing'],
    pinning: ['side-control-pin', 'mount-control'],
    submissions: ['arm-triangle-mount'],
  },
  frontHeadlock: {
    standing: ['hand-fighting', 'snapdown-front-headlock', 'sprawl-go-behind'],
    escapes: ['front-headlock-defense'],
    submissions: ['guillotine-system', 'back-control', 'rear-naked-choke-system'],
  },
  legLockSafety: {
    guard: ['shin-to-shin-entry', 'single-leg-x-basics', 'k-guard-entry'],
    legLocks: ['leg-lock-safety-basics', 'straight-ankle-lock-safety', 'heel-hook-safety'],
    escapes: ['technical-stand-up'],
  },
  backControl: {
    standing: ['hand-fighting', 'sprawl-go-behind'],
    passing: ['leg-drag-basics'],
    pinning: ['turtle-ride', 'mat-return-basics'],
    submissions: ['back-control', 'rear-naked-choke-system'],
  },
}

export const AGameBuilder = ({ onApply }: { onApply: (tree: Partial<GameTree>) => void }) => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-wrap gap-2">
      {Object.keys(archetypes).map((key) => (
        <button
          type="button"
          key={key}
          onClick={() => onApply(archetypes[key])}
          className="rounded-md border border-emerald-300/25 bg-emerald-300/10 px-3 py-2 text-sm font-medium text-emerald-100 hover:bg-emerald-300/15"
        >
          {t(`gameTree.archetypes.${key}`)}
        </button>
      ))}
    </div>
  )
}
