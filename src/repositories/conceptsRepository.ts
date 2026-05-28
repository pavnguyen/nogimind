import { useSettingsStore } from '../stores/useSettingsStore'
import { getConceptDetail, getConceptManifest } from '../content-runtime/concepts'
import { concepts as legacyConcepts } from '../data/concepts'
import type { ConceptNode } from '../types/concept'

/**
 * Check if the pipeline is available by trying to fetch the concept manifest.
 */
let pipelineAvailable: boolean | null = null

async function isPipelineAvailable(): Promise<boolean> {
  if (pipelineAvailable !== null) return pipelineAvailable
  try {
    const manifest = await getConceptManifest()
    pipelineAvailable = manifest.length > 0
    return pipelineAvailable
  } catch {
    pipelineAvailable = false
    return false
  }
}

/**
 * Get all concepts as ConceptNode (legacy format).
 * For backward compatibility — returns full ConceptNode objects.
 */
export const getConcepts = async (): Promise<ConceptNode[]> => {
  const locale = useSettingsStore.getState().language ?? 'en'

  try {
    const available = await isPipelineAvailable()
    if (!available) return legacyConcepts

    const manifest = await getConceptManifest()
    if (manifest.length === 0) return legacyConcepts

    // Load each concept detail from pipeline
    const details = await Promise.allSettled(
      manifest.map(item => getConceptDetail(locale, item.id))
    )

    const result: ConceptNode[] = []
    for (let i = 0; i < manifest.length; i++) {
      const detail = details[i]
      const legacy = detail.status === 'fulfilled' && detail.value
        ? undefined
        : legacyConcepts.find(c => c.id === manifest[i]?.id)
      if (detail.status === 'fulfilled' && detail.value) {
        const d = detail.value
        // Build a ConceptNode-compatible object from pipeline data
        result.push({
          id: d.id,
          title: { vi: d.title, en: d.title, fr: d.title }, // will be refined by locale
          category: d.category as ConceptNode['category'],
          level: d.level as ConceptNode['level'],
          shortDefinition: { en: d.shortDefinition, vi: d.shortDefinition, fr: d.shortDefinition },
          whyItMatters: { en: d.whyItMatters, vi: d.whyItMatters, fr: d.whyItMatters },
          deepExplanation: { en: d.deepExplanation, vi: d.deepExplanation, fr: d.deepExplanation },
          beginnerView: { en: d.beginnerView, vi: d.beginnerView, fr: d.beginnerView },
          advancedView: { en: d.advancedView, vi: d.advancedView, fr: d.advancedView },
          ifThenExamples: d.ifThenExamples.map(ex => ({
            if: { en: ex.if, vi: ex.if, fr: ex.if },
            then: { en: ex.then, vi: ex.then, fr: ex.then },
            why: { en: ex.why, vi: ex.why, fr: ex.why },
            relatedSkillIds: ex.relatedSkillIds,
          })),
          commonMisunderstandings: d.commonMisunderstandings.map(m => ({
            misunderstanding: { en: m.misunderstanding, vi: m.misunderstanding, fr: m.misunderstanding },
            correction: { en: m.correction, vi: m.correction, fr: m.correction },
          })),
          trainingCues: { en: d.trainingCues, vi: d.trainingCues, fr: d.trainingCues },
          relatedSkillIds: d.relatedSkillIds,
          relatedConceptIds: d.relatedConceptIds,
          tags: d.tags,
        })
      } else if (legacy) {
        result.push(legacy)
      }
    }

    if (result.length > 0) return result
    return legacyConcepts
  } catch {
    return legacyConcepts
  }
}

/**
 * Get a single concept by ID.
 */
export const getConceptById = async (id: string): Promise<ConceptNode | undefined> => {
  const locale = useSettingsStore.getState().language ?? 'en'
  const foundLegacy = legacyConcepts.find(c => c.id === id)

  try {
    const available = await isPipelineAvailable()
    if (!available) return foundLegacy

    const detail = await getConceptDetail(locale, id)
    if (!detail) return foundLegacy

    return {
      id: detail.id,
      title: { en: detail.title, vi: detail.title, fr: detail.title },
      category: detail.category as ConceptNode['category'],
      level: detail.level as ConceptNode['level'],
      shortDefinition: { en: detail.shortDefinition, vi: detail.shortDefinition, fr: detail.shortDefinition },
      whyItMatters: { en: detail.whyItMatters, vi: detail.whyItMatters, fr: detail.whyItMatters },
      deepExplanation: { en: detail.deepExplanation, vi: detail.deepExplanation, fr: detail.deepExplanation },
      beginnerView: { en: detail.beginnerView, vi: detail.beginnerView, fr: detail.beginnerView },
      advancedView: { en: detail.advancedView, vi: detail.advancedView, fr: detail.advancedView },
      ifThenExamples: detail.ifThenExamples.map(ex => ({
        if: { en: ex.if, vi: ex.if, fr: ex.if },
        then: { en: ex.then, vi: ex.then, fr: ex.then },
        why: { en: ex.why, vi: ex.why, fr: ex.why },
        relatedSkillIds: ex.relatedSkillIds,
      })),
      commonMisunderstandings: detail.commonMisunderstandings.map(m => ({
        misunderstanding: { en: m.misunderstanding, vi: m.misunderstanding, fr: m.misunderstanding },
        correction: { en: m.correction, vi: m.correction, fr: m.correction },
      })),
      trainingCues: { en: detail.trainingCues, vi: detail.trainingCues, fr: detail.trainingCues },
      relatedSkillIds: detail.relatedSkillIds,
      relatedConceptIds: detail.relatedConceptIds,
      tags: detail.tags,
    }
  } catch {
    return foundLegacy
  }
}
