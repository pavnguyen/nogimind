import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { storageKeys } from '../utils/storage'
import type { KnowledgeItemType } from '../types/knowledgeSearch'

type SearchStore = {
  query: string
  type: KnowledgeItemType | ''
  setQuery: (query: string) => void
  setType: (type: KnowledgeItemType | '') => void
  clear: () => void
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      query: '',
      type: '',
      setQuery: (query) => set({ query }),
      setType: (type) => set({ type }),
      clear: () => set({ query: '', type: '' }),
    }),
    {
      name: storageKeys.search,
      partialize: (state) => ({ query: state.query, type: state.type }),
    },
  ),
)
