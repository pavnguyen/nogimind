import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'

// Prevent the browser from restoring scroll position on popstate
// We handle scroll-to-top ourselves on every route change
history.scrollRestoration = 'manual'
import App from './App.tsx'
import './i18n/i18n'
import '@fontsource/fraunces/400.css'
import '@fontsource/fraunces/500.css'
import '@fontsource/fraunces/600.css'
import '@fontsource/fraunces/700.css'
import '@fontsource/fraunces/800.css'
import './styles/hallmark-themes.css'
import './index.css'
import { queryClient } from './queries/queryClient'

// ── Performance initialisation ────────────────────────────────────────────
//
// Three-phase warmup executed after first render:
//   Phase 1 (eager, microtask): start manifest prefetch
//   Phase 2 (later idle):        pre-warm search cache in IndexedDB
//   Phase 3 (later idle):        build search indexes in Web Worker
//
// Search still initializes on demand if the user opens Search before warmup.
// The idle-callback phases degrade gracefully to setTimeout fallbacks.

/** Phase 1: Eagerly prefetch manifests for all 3 locales. */
function prefetchManifests() {
  import('./content-runtime/manifests').then(({ prefetchManifest }) => {
    prefetchManifest('en'); prefetchManifest('vi'); prefetchManifest('fr')
  }).catch(() => {})
}

/** Phase 2: Pre-warm the IndexedDB search cache. */
function phaseTwoPreWarm() {
  import('./utils/knowledgeSearch').then(({ preWarmSearchCache }) => {
    preWarmSearchCache().catch(() => {})
  }).catch(() => {})
}

/** Phase 3: Build search indexes in the worker (requires cache to be warm). */
function phaseThreeWarmIndexes() {
  import('./utils/knowledgeSearch').then(({ warmSearchIndexes }) => {
    warmSearchIndexes().catch(() => {})
  }).catch(() => {})
}

function shouldWarmSearchInBackground(): boolean {
  const connection = (navigator as unknown as { connection?: { saveData?: boolean } }).connection
  return !connection?.saveData
}

// ── Execute warmup phases ──────────────────────────────────────────────────

// Phase 1: fire immediately after module evaluation (microtask via queueMicrotask)
if (typeof queueMicrotask !== 'undefined') {
  queueMicrotask(prefetchManifests)
} else {
  setTimeout(prefetchManifests, 0)
}

// Phases 2–3: use requestIdleCallback so search becomes fast after startup
// without competing with initial route rendering on mobile devices.
const idleCallback = typeof requestIdleCallback !== 'undefined'
  ? (fn: () => void, timeout: number) => requestIdleCallback(fn, { timeout })
  : (fn: () => void, timeout: number) => setTimeout(fn, timeout)

if (shouldWarmSearchInBackground()) {
  idleCallback(phaseTwoPreWarm, 2500)
  idleCallback(phaseThreeWarmIndexes, 6000)
}

// Cleanup listeners on full-reload (HMR)
if (import.meta.hot) {
  import.meta.hot.dispose(() => {})
}

// ── Web Vitals ─────────────────────────────────────────────────────────────

/**
 * Report Web Vitals to the console in development, or to an analytics endpoint
 * in production. The native PerformanceObserver API is used to capture:
 *   - CLS (Cumulative Layout Shift)
 *   - FID (First Input Delay) / INP (Interaction to Next Paint)
 *   - LCP (Largest Contentful Paint)
 *   - TTFB (Time to First Byte)
 */
function reportWebVital(metric: { name: string; value: number; rating?: string }) {
  const { name, value, rating } = metric
  if (import.meta.env.DEV) {
    console.debug(`[Web Vitals] ${name}: ${value.toFixed(2)}${rating ? ` (${rating})` : ''}`)
  }
  // In production, send to analytics endpoint if configured
  // if (import.meta.env.PROD && typeof navigator !== 'undefined') {
  //   navigator.sendBeacon?.('/api/vitals', JSON.stringify(metric))
  // }
}

function initWebVitals(): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

  try {
    // LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      if (entries.length > 0) {
        const lastEntry = entries[entries.length - 1]
        reportWebVital({
          name: 'LCP',
          value: lastEntry.startTime,
          rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs-improvement' : 'poor',
        })
      }
    })
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

    // CLS
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0
      for (const entry of list.getEntries()) {
        if (!(entry as unknown as { hadRecentInput?: boolean }).hadRecentInput) {
          clsValue += (entry as unknown as { value: number }).value
        }
      }
      reportWebVital({
        name: 'CLS',
        value: clsValue,
        rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor',
      })
    })
    clsObserver.observe({ type: 'layout-shift', buffered: true })

    // FID (or INP if available)
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        reportWebVital({
          name: 'FID',
          value: (entry as unknown as { processingStart: number }).processingStart - entry.startTime,
          rating: (entry as unknown as { processingStart: number }).processingStart - entry.startTime < 100 ? 'good' : 'needs-improvement',
        })
        break
      }
    })
    fidObserver.observe({ type: 'first-input', buffered: true })

    // TTFB via Navigation Timing API
    if (performance.getEntriesByType?.('navigation').length > 0) {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      reportWebVital({
        name: 'TTFB',
        value: nav.responseStart - nav.requestStart,
        rating: nav.responseStart - nav.requestStart < 800 ? 'good' : 'needs-improvement',
      })
    }
  } catch {
    // PerformanceObserver not supported — silently skip
  }
}

// ── PWA: clear old content cache on service worker update ────────────────
// When the SW updates (new deploy), the old `nogimind-content` cache is stale.
// The new cache `nogimind-content-v2` uses NetworkFirst strategy so fresh
// content loads automatically. Clean up the old cache to free storage.
if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    caches.delete('nogimind-content').catch(() => {})
  }, { once: true })
}

// Init Web Vitals after render
initWebVitals()

// ── DevTools (production-aware) ────────────────────────────────────────────
import { DevTools } from './DevTools'

// ── Render ────────────────────────────────────────────────────────────────

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {import.meta.env.DEV && <DevTools />}
    </QueryClientProvider>
  </StrictMode>,
)
