import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useVideoReport } from './useVideoReport'

const STORAGE_KEY = 'nogimind_reported_broken_videos'

beforeEach(() => {
  localStorage.clear()
})

// ── Initialization ─────────────────────────────────────────────────────────

describe('useVideoReport', () => {
  it('initializes with empty reportedIds when localStorage is empty', () => {
    const { result } = renderHook(() => useVideoReport())
    expect(result.current.reportedIds).toBeInstanceOf(Set)
    expect(result.current.reportedIds.size).toBe(0)
  })

  it('initializes with existing reportedIds from localStorage', () => {
    const existing = [
      { youtubeId: 'abc123', reportedAt: '2024-01-01T00:00:00.000Z' },
      { youtubeId: 'def456', reportedAt: '2024-01-02T00:00:00.000Z' },
    ]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))

    const { result } = renderHook(() => useVideoReport())
    expect(result.current.reportedIds.size).toBe(2)
    expect(result.current.reportedIds.has('abc123')).toBe(true)
    expect(result.current.reportedIds.has('def456')).toBe(true)
  })

  it('handles corrupt localStorage gracefully', () => {
    localStorage.setItem(STORAGE_KEY, 'not-valid-json')

    const { result } = renderHook(() => useVideoReport())
    expect(result.current.reportedIds.size).toBe(0)
  })

  // ── handleReport behavior ──────────────────────────────────────────────

  it('adds youtubeId to reportedIds when handleReport is called', () => {
    const { result } = renderHook(() => useVideoReport())

    act(() => {
      result.current.handleReport('test123')
    })

    expect(result.current.reportedIds.has('test123')).toBe(true)
    expect(result.current.reportedIds.size).toBe(1)
  })

  it('persists report to localStorage', () => {
    const { result } = renderHook(() => useVideoReport())

    act(() => {
      result.current.handleReport('test123')
    })

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    expect(stored).toHaveLength(1)
    expect(stored[0].youtubeId).toBe('test123')
    expect(stored[0]).toHaveProperty('reportedAt')
  })

  it('includes skillId in localStorage entry when provided', () => {
    const { result } = renderHook(() => useVideoReport('skill-01'))

    act(() => {
      result.current.handleReport('test123')
    })

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    expect(stored[0].skillId).toBe('skill-01')
  })

  it('does not add duplicate youtubeId', () => {
    const { result } = renderHook(() => useVideoReport())

    act(() => {
      result.current.handleReport('test123')
    })

    act(() => {
      result.current.handleReport('test123')
    })

    // Still only 1 entry in the Set
    expect(result.current.reportedIds.size).toBe(1)

    // Still only 1 entry in localStorage
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    expect(stored).toHaveLength(1)
  })

  it('can report multiple different videos', () => {
    const { result } = renderHook(() => useVideoReport())

    act(() => {
      result.current.handleReport('vid-1')
    })
    act(() => {
      result.current.handleReport('vid-2')
    })
    act(() => {
      result.current.handleReport('vid-3')
    })

    expect(result.current.reportedIds.size).toBe(3)
    expect(result.current.reportedIds.has('vid-1')).toBe(true)
    expect(result.current.reportedIds.has('vid-2')).toBe(true)
    expect(result.current.reportedIds.has('vid-3')).toBe(true)

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    expect(stored).toHaveLength(3)
  })

  // ── Edge cases ──────────────────────────────────────────────────────────

  it('preserves existing reports and adds new ones', () => {
    const existing = [
      { youtubeId: 'old-vid', reportedAt: '2024-01-01T00:00:00.000Z' },
    ]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))

    const { result } = renderHook(() => useVideoReport())

    expect(result.current.reportedIds.has('old-vid')).toBe(true)

    act(() => {
      result.current.handleReport('new-vid')
    })

    expect(result.current.reportedIds.size).toBe(2)

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    expect(stored).toHaveLength(2)
    expect(stored.some((e: { youtubeId: string }) => e.youtubeId === 'old-vid')).toBe(true)
    expect(stored.some((e: { youtubeId: string }) => e.youtubeId === 'new-vid')).toBe(true)
  })

  it('handles localStorage setItem throwing (full storage)', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })

    const { result } = renderHook(() => useVideoReport())

    // Should not throw
    act(() => {
      result.current.handleReport('test123')
    })

    // reportedIds should still be updated in memory
    expect(result.current.reportedIds.has('test123')).toBe(true)

    setItemSpy.mockRestore()
  })
})
