import { useState, useCallback } from 'react'

const STORAGE_KEY = 'nogimind_reported_broken_videos'

interface ReportEntry {
  youtubeId: string
  skillId?: string
  reportedAt: string
}

function getStoredReports(): ReportEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveReport(entry: ReportEntry) {
  try {
    const existing = getStoredReports()
    const serialized = JSON.stringify(entry)
    if (!existing.some((e) => JSON.stringify(e) === serialized)) {
      existing.push(entry)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
    }
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

export function useVideoReport(skillId?: string) {
  const [reportedIds, setReportedIds] = useState<Set<string>>(() => {
    const stored = getStoredReports()
    return new Set(stored.map((e) => e.youtubeId).filter(Boolean))
  })

  const handleReport = useCallback(
    (youtubeId: string) => {
      if (reportedIds.has(youtubeId)) return
      saveReport({ youtubeId, skillId, reportedAt: new Date().toISOString() })
      setReportedIds((prev) => new Set(prev).add(youtubeId))
    },
    [reportedIds, skillId],
  )

  return { reportedIds, handleReport }
}
