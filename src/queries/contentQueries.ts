/**
 * contentQueries.ts
 * React Query hooks for the generated content pipeline (Phase 2).
 * Wraps the content-runtime API and provides legacy fallback.
 */

import { useQuery } from '@tanstack/react-query'
import { getManifest } from '../content-runtime/manifests'
import { getSkillDetail, type SkillDetail } from '../content-runtime/skills'
import { getSkillVideos } from '../content-runtime/videos'
import type { LanguageCode } from '../types/skill'

// ── Query key factories ────────────────────────────────────────────────────

export const contentKeys = {
  manifest: (locale: string) => ['content', 'manifest', locale] as const,
  skillDetail: (skillId: string, locale: string) => ['content', 'skill', skillId, locale] as const,
  skillVideos: (skillId: string) => ['content', 'videos', skillId] as const,
}

// ── Manifest query ─────────────────────────────────────────────────────────

/**
 * Load the skill manifest for a given locale.
 * The manifest is a lightweight list of all skills with metadata.
 * Used on DashboardPage for stats, and can be used for search results.
 */
export function useManifestQuery(locale: LanguageCode) {
  return useQuery({
    queryKey: contentKeys.manifest(locale),
    queryFn: () => getManifest(locale),
    staleTime: 5 * 60 * 1000,   // 5 min — manifests rarely change in a session
    gcTime: 30 * 60 * 1000,
  })
}

// ── Skill detail query (generated + legacy fallback) ───────────────────────

export interface ContentSkillDetailResult {
  /** The artifact from the generated content pipeline, if available */
  detail: SkillDetail | null
  /** Whether the data came from the generated pipeline or legacy fallback */
  source: 'generated' | 'legacy' | 'none'
}

/**
 * Load a skill's full detail from the generated content pipeline.
 * Falls back to the legacy `useSkillQuery` if the generated file is not found.
 *
 * Usage:
 * ```ts
 * const { data, isLoading } = useContentSkillDetailQuery(skillId, language)
 * ```
 */
export function useContentSkillDetailQuery(
  skillId: string | undefined,
  locale: LanguageCode,
) {
  return useQuery({
    queryKey: contentKeys.skillDetail(skillId ?? '__missing__', locale),
    queryFn: async (): Promise<ContentSkillDetailResult> => {
      if (!skillId) return { detail: null, source: 'none' }

      const detail = await getSkillDetail(locale, skillId)
      if (detail) {
        return { detail, source: 'generated' }
      }

      // Legacy fallback — return null detail but signal legacy source
      // The caller can use useSkillQuery() separately for full SkillNode data
      return { detail: null, source: 'legacy' }
    },
    enabled: Boolean(skillId),
    staleTime: 10 * 60 * 1000,
  })
}

// ── Skill videos query (pipeline) ──────────────────────────────────────────

/**
 * Load video references for a skill from the generated content pipeline.
 */
export function useSkillVideosQuery(skillId: string | undefined) {
  return useQuery({
    queryKey: contentKeys.skillVideos(skillId ?? '__missing__'),
    queryFn: () => (skillId ? getSkillVideos(skillId) : Promise.resolve(null)),
    enabled: Boolean(skillId),
    staleTime: 10 * 60 * 1000,
  })
}

// ── Prefetch utilities ─────────────────────────────────────────────────────

/** Prefetch the manifest for all default locales. Call once at app startup. */
export function prefetchAllManifests(queryClient: {
  prefetchQuery: (opts: { queryKey: unknown; queryFn: () => Promise<unknown>; staleTime?: number }) => void
}) {
  for (const locale of ['en', 'vi', 'fr'] as LanguageCode[]) {
    queryClient.prefetchQuery({
      queryKey: contentKeys.manifest(locale),
      queryFn: () => getManifest(locale),
      staleTime: 5 * 60 * 1000,
    })
  }
}

/** Prefetch a single skill detail. */
export function prefetchSkillDetail(
  queryClient: {
    prefetchQuery: (opts: { queryKey: unknown; queryFn: () => Promise<unknown>; staleTime?: number }) => void
  },
  skillId: string,
  locale: LanguageCode,
) {
  queryClient.prefetchQuery({
    queryKey: contentKeys.skillDetail(skillId, locale),
    queryFn: () => getSkillDetail(locale, skillId),
    staleTime: 10 * 60 * 1000,
  })
}
