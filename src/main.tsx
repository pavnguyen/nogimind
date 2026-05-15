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
// Defer search initialization so 1.3MB of data chunks are not loaded on initial page render
const initSearch = () => {
  import('./utils/knowledgeSearch')
    .then(({ initSearchIndexes }) => initSearchIndexes())
    .catch((err) => console.warn('Search init deferred:', err))
}
if (typeof requestIdleCallback !== 'undefined') {
  requestIdleCallback(() => initSearch(), { timeout: 3000 })
} else {
  setTimeout(initSearch, 2000)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {import.meta.env.DEV ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </QueryClientProvider>
  </StrictMode>,
)
