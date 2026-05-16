import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { storageKeys } from '../utils/storage'
import type { KnowledgeItemType } from '../types/knowledgeSearch'

type SearchStore = {
  query: string
  type: KnowledgeItemType | ''
  mode: import('../utils/searchEngine').SearchMode
  setQuery: (query: string) => void
  setType: (type: KnowledgeItemType | '') => void
  setMode: (mode: import('../utils/searchEngine').SearchMode) => void
  clear: () => void
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      query: '',
      type: '',
      mode: 'quick',
      setQuery: (query) => set({ query }),
      setType: (type) => set({ type }),
      setMode: (mode) => set({ mode }),
      clear: () => set({ query: '', type: '' }),
    }),
    {
      name: storageKeys.search,
      partialize: (state) => ({ type: state.type, mode: state.mode }),
    },
  ),
)
