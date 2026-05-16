import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'

// Prevent the browser from restoring scroll position on popstate
// We handle scroll-to-top ourselves on every route change
history.scrollRestoration = 'manual'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './App.tsx'
import './i18n/i18n'
import './index.css'
import { queryClient } from './queries/queryClient'
// Deferred search setup:
// 1. Pre-warm the IndexedDB cache (import data modules, save to IDB)
// 2. Warm the MiniSearch indexes in the worker (load from cache, build indexes)
// This keeps initial render light while making the first real search fast.
const initSearch = async () => {
  try {
    const { preWarmSearchCache, warmSearchIndexes } = await import('./utils/knowledgeSearch')
    // Step 1: ensure data is cached in IndexedDB (fast if already cached)
    await preWarmSearchCache()
    // Step 2: build search indexes in worker from cached data
    await warmSearchIndexes()
  } catch (err) {
    console.warn('Search init deferred:', err)
  }
}
if (typeof requestIdleCallback !== 'undefined') {
  requestIdleCallback(() => { initSearch() }, { timeout: 3000 })
} else {
  setTimeout(() => { initSearch() }, 2000)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {import.meta.env.DEV ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </QueryClientProvider>
  </StrictMode>,
)
