import { setSearchData, syncInitSearchIndexes, syncSearchKnowledge } from '../utils/searchEngine'
import type { SearchDataBundle } from '../utils/searchEngine'
import type { KnowledgeItemType, KnowledgeSearchResult } from '../types/knowledgeSearch'
import type { LanguageCode } from '../types/skill'

export type WorkerSearchRequest = {
  type: 'search'
  id: string
  payload: {
    query: string
    lang: LanguageCode
    filters: { type?: KnowledgeItemType | '' }
  }
}

export type WorkerInitRequest = {
  type: 'init'
  payload: SearchDataBundle
}

export type WorkerSearchResponse = {
  type: 'search-results'
  id: string
  payload: KnowledgeSearchResult[]
}

export type WorkerMessage = WorkerSearchRequest | WorkerInitRequest

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const { type } = event.data

  switch (type) {
    case 'init': {
      // Receive data from main thread to avoid duplicate bundling
      let t = self.performance.now()
      setSearchData(event.data.payload)
      self.console.log(`[perf] worker:init:setData ${(self.performance.now() - t).toFixed(2)} ms`)

      t = self.performance.now()
      syncInitSearchIndexes()
      self.console.log(`[perf] worker:init:buildIndexes ${(self.performance.now() - t).toFixed(2)} ms`)

      self.postMessage({ type: 'ready' })
      break
    }

    case 'search': {
      const { id, payload } = event.data
      const t = self.performance.now()
      const results = syncSearchKnowledge(payload.query, payload.lang, payload.filters)
      self.console.log(`[perf] worker:search:execute ${id} ${(self.performance.now() - t).toFixed(2)} ms`)
      self.postMessage({ type: 'search-results', id, payload: results })
      break
    }
  }
}
