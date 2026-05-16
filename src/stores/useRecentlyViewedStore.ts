import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { storageKeys } from '../utils/storage'

type RecentlyViewedEntry = {
  skillId: string
  timestamp: number
}

type RecentlyViewedStore = {
  recentlyViewed: RecentlyViewedEntry[]
  recordView: (skillId: string) => void
  clearHistory: () => void
}

const MAX_ENTRIES = 50

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set) => ({
      recentlyViewed: [],
      recordView: (skillId) =>
        set((state) => {
          const filtered = state.recentlyViewed.filter((e) => e.skillId !== skillId)
          return {
            recentlyViewed: [{ skillId, timestamp: Date.now() }, ...filtered].slice(0, MAX_ENTRIES),
          }
        }),
      clearHistory: () => set({ recentlyViewed: [] }),
    }),
    {
      name: storageKeys.recentlyViewed,
      partialize: (state) => ({ recentlyViewed: state.recentlyViewed }),
    },
  ),
)
