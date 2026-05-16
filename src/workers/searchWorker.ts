import { setSearchData, syncSearchKnowledge, syncWarmSearchIndexes } from '../utils/searchEngine'
import type { SearchDataBundle } from '../utils/searchEngine'
import type { KnowledgeItemType, KnowledgeSearchResult } from '../types/knowledgeSearch'
import type { LanguageCode } from '../types/skill'

export type WorkerSearchRequest = {
  type: 'search'
  id: string
  payload: {
    query: string
    lang: LanguageCode
    filters: { type?: KnowledgeItemType | ''; mode?: import('../utils/searchEngine').SearchMode }
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

export type WorkerWarmupRequest = {
  type: 'warmup'
  payload: {
    langs: LanguageCode[]
    types: (KnowledgeItemType | '')[]
  }
}

export type WorkerWarmupResponse = {
  type: 'warmup-complete'
  payload: {
    langs: LanguageCode[]
    types: (KnowledgeItemType | '')[]
  }
}

export type WorkerMessage = WorkerSearchRequest | WorkerInitRequest | WorkerWarmupRequest

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const { type } = event.data

  switch (type) {
    case 'init': {
      // Receive data from main thread to avoid duplicate bundling
      let t = self.performance.now()
      setSearchData(event.data.payload)
      self.console.log(`[perf] worker:init:setData ${(self.performance.now() - t).toFixed(2)} ms`)

      self.postMessage({ type: 'ready' })
      break
    }

    case 'warmup': {
      const { langs, types } = event.data.payload
      const t = self.performance.now()
      syncWarmSearchIndexes(langs, types)
      self.console.log(`[perf] worker:warmup ${(self.performance.now() - t).toFixed(2)} ms`)
      self.postMessage({ type: 'warmup-complete', payload: { langs, types } })
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
