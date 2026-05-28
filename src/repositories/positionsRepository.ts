import { useSettingsStore } from '../stores/useSettingsStore'
import { getPositionDetail, getPositionManifest, type PositionDetail as PipelinePosition } from '../content-runtime/positions'
import { positions as legacyPositions } from '../data/positions'
import type { PositionNode } from '../types/position'

/**
 * Check if the pipeline is available by trying to fetch the position manifest.
 */
let pipelineAvailable: boolean | null = null

async function isPipelineAvailable(): Promise<boolean> {
  if (pipelineAvailable !== null) return pipelineAvailable
  try {
    const manifest = await getPositionManifest()
    pipelineAvailable = manifest.length > 0
    return pipelineAvailable
  } catch {
    pipelineAvailable = false
    return false
  }
}

/**
 * Convert a pipeline PositionDetail to a legacy PositionNode.
 */
function toPositionNode(d: PipelinePosition): PositionNode {
  return {
    id: d.id,
    title: { en: d.title, vi: d.title, fr: d.title },
    category: d.category as PositionNode['category'],
    status: d.status as PositionNode['status'],
    description: { en: d.description, vi: d.description, fr: d.description },
    topPlayerGoals: { en: d.topPlayerGoals, vi: d.topPlayerGoals, fr: d.topPlayerGoals },
    bottomPlayerGoals: { en: d.bottomPlayerGoals, vi: d.bottomPlayerGoals, fr: d.bottomPlayerGoals },
    controlPoints: { en: d.controlPoints, vi: d.controlPoints, fr: d.controlPoints },
    escapePriorities: { en: d.escapePriorities, vi: d.escapePriorities, fr: d.escapePriorities },
    advancementOptions: d.advancementOptions.map(opt => ({
      action: { en: opt.action, vi: opt.action, fr: opt.action },
      nextPositionId: opt.nextPositionId,
      relatedSkillIds: opt.relatedSkillIds,
      why: { en: opt.why, vi: opt.why, fr: opt.why },
    })),
    dangerSignals: { en: d.dangerSignals, vi: d.dangerSignals, fr: d.dangerSignals },
    relatedSkillIds: d.relatedSkillIds,
    relatedConceptIds: d.relatedConceptIds,
  }
}

/**
 * Get all positions.
 */
export const getPositions = async (): Promise<PositionNode[]> => {
  const locale = useSettingsStore.getState().language ?? 'en'

  try {
    const available = await isPipelineAvailable()
    if (!available) return legacyPositions

    const manifest = await getPositionManifest()
    if (manifest.length === 0) return legacyPositions

    const details = await Promise.allSettled(
      manifest.map(item => getPositionDetail(locale, item.id))
    )

    const result: PositionNode[] = []
    for (let i = 0; i < manifest.length; i++) {
      const detail = details[i]
      if (detail.status === 'fulfilled' && detail.value) {
        result.push(toPositionNode(detail.value))
      } else {
        const legacy = legacyPositions.find(p => p.id === manifest[i].id)
        if (legacy) result.push(legacy)
      }
    }

    return result.length > 0 ? result : legacyPositions
  } catch {
    return legacyPositions
  }
}

/**
 * Get a single position by ID.
 */
export const getPositionById = async (id: string): Promise<PositionNode | undefined> => {
  const locale = useSettingsStore.getState().language ?? 'en'
  const legacy = legacyPositions.find(p => p.id === id)

  try {
    const available = await isPipelineAvailable()
    if (!available) return legacy

    const detail = await getPositionDetail(locale, id)
    if (!detail) return legacy

    return toPositionNode(detail)
  } catch {
    return legacy
  }
}
