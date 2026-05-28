import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight,
  Search as SearchIcon,
  Clock,
  TrendingUp,
  Hash,
  Star,
} from 'lucide-react'
import { Badge } from '../components/common/Badge'
import { EmptyState } from '../components/common/EmptyState'
import { SkeletonCard } from '../components/common/Skeleton'
import { SectionCard } from '../components/common/SectionCard'
import { PageShell } from '../components/common/PageShell'
import { useSettingsStore } from '../stores/useSettingsStore'
import { useSearchStore } from '../stores/useSearchStore'
import type { KnowledgeItemType, KnowledgeSearchResult } from '../types/knowledgeSearch'
import { searchKnowledge } from '../utils/knowledgeSearch'
import { getLocalizedText } from '../utils/localization'

const coreResultTypes: KnowledgeItemType[] = ['skill', 'concept', 'position']
const advancedResultTypes: KnowledgeItemType[] = ['micro_detail', 'troubleshooter', 'escape_map', 'glossary', 'defense', 'archetype', 'mastery']
const filterTypes = [...coreResultTypes, ...advancedResultTypes]

const SEARCH_ANALYTICS_KEY = 'nogi_search_analytics'
const POPULAR_CUTOFF = 8

type SearchAnalyticsEntry = {
  query: string
  count: number
  lastSearched: number
}

const getSearchAnalytics = (): SearchAnalyticsEntry[] => {
  try {
    const raw = window.localStorage.getItem(SEARCH_ANALYTICS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const recordSearchQuery = (query: string) => {
  if (!query.trim()) return
  try {
    const q = query.trim().toLowerCase()
    const entries = getSearchAnalytics()
    const existing = entries.find((e) => e.query === q)
    if (existing) {
      existing.count += 1
      existing.lastSearched = Date.now()
    } else {
      entries.push({ query: q, count: 1, lastSearched: Date.now() })
    }
    // Keep only top 50 by count
    entries.sort((a, b) => b.count - a.count)
    window.localStorage.setItem(SEARCH_ANALYTICS_KEY, JSON.stringify(entries.slice(0, 50)))
  } catch { /* ignore */ }
}

const getPopularSearches = (): string[] => {
  try {
    const entries = getSearchAnalytics()
    return entries
      .slice(0, POPULAR_CUTOFF)
      .map((e) => e.query)
  } catch {
    return []
  }
}

/** Pre-defined popular BJJ search terms (fallback if no analytics yet) */
const DEFAULT_POPULAR: string[] = [
  'armbar', 'triangle', 'guillotine', 'kimura', 'heel hook',
  'rear naked choke', 'side control', 'mount escape',
  'guard retention', 'knee cut pass',
]

export default function SearchPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const language = useSettingsStore((state) => state.language)
  const [searchParams, setSearchParams] = useSearchParams()
  const query = useSearchStore((state) => state.query)
  const type = useSearchStore((state) => state.type)
  const mode = useSearchStore((state) => state.mode)
  const setQuery = useSearchStore((state) => state.setQuery)
  const setType = useSearchStore((state) => state.setType)
  const setMode = useSearchStore((state) => state.setMode)
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const trimmedDebouncedQuery = debouncedQuery.trim()

  // ── Keyboard navigation state ──────────────────────────────────────────
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const resultsContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // ── Popular searches state ─────────────────────────────────────────────
  const [popularSearches] = useState<string[]>(() => getPopularSearches())
  const displayPopular = popularSearches.length > 0 ? popularSearches : DEFAULT_POPULAR

  // ── Legacy query params migration ──────────────────────────────────────
  useEffect(() => {
    const legacyQuery = searchParams.get('q')
    const legacyType = searchParams.get('type')
    if (legacyQuery && legacyQuery !== query) setQuery(legacyQuery)
    if (legacyType && filterTypes.includes(legacyType as KnowledgeItemType) && legacyType !== type) {
      setType(legacyType as KnowledgeItemType)
    }
    if (legacyQuery || legacyType) {
      setSearchParams({}, { replace: true })
    }
  }, [query, setQuery, setSearchParams, setType, searchParams, type])

  // ── Debounce ───────────────────────────────────────────────────────────
  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedQuery(query), 160)
    return () => window.clearTimeout(timeout)
  }, [query])

  // ── Results state ──────────────────────────────────────────────────────
  const [results, setResults] = useState<KnowledgeSearchResult[]>(() => {
    try {
      const cached = window.localStorage.getItem('nogi_recent_searches')
      if (cached) {
        const parsed = JSON.parse(cached) as { query: string; results: KnowledgeSearchResult[]; ts: number }[]
        const match = parsed.find((r) => r.query === query.trim().toLowerCase())
        if (match && Date.now() - match.ts < 300_000) return match.results
      }
    } catch { /* ignore */ }
    return []
  })
  const [searching, setSearching] = useState(false)

  const visibleResults = useMemo(
    () => trimmedDebouncedQuery ? results : [],
    [results, trimmedDebouncedQuery],
  )
  const isSearching = Boolean(trimmedDebouncedQuery) && searching

  // ── Flat results for keyboard nav ──────────────────────────────────────
  const flatResults = useMemo(() => {
    const groups = type ? filterTypes : coreResultTypes
    const flat: { result: KnowledgeSearchResult; groupType: KnowledgeItemType }[] = []
    for (const gt of groups) {
      for (const r of visibleResults) {
        if (r.type === gt) {
          flat.push({ result: r, groupType: gt as KnowledgeItemType })
        }
      }
    }
    return flat
  }, [visibleResults, type])

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex < 0) return
    const container = resultsContainerRef.current
    if (!container) return
    const items = container.querySelectorAll<HTMLElement>('[data-result-index]')
    const el = items[selectedIndex]
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [selectedIndex])

  // ── Cache recent results ───────────────────────────────────────────────
  const cacheResults = useCallback((q: string, data: KnowledgeSearchResult[]) => {
    try {
      const raw = window.localStorage.getItem('nogi_recent_searches')
      const existing: { query: string; results: KnowledgeSearchResult[]; ts: number }[] = raw ? JSON.parse(raw) : []
      const filtered = existing.filter((r) => r.query !== q.toLowerCase())
      filtered.unshift({ query: q.toLowerCase(), results: data, ts: Date.now() })
      window.localStorage.setItem('nogi_recent_searches', JSON.stringify(filtered.slice(0, 10)))
    } catch { /* ignore */ }
  }, [])

  // ── Search execution ───────────────────────────────────────────────────
  useEffect(() => {
    if (!trimmedDebouncedQuery) return

    let cancelled = false
    const timeout = window.setTimeout(() => {
      setSearching(true)
      searchKnowledge(trimmedDebouncedQuery, language, { type, mode }).then((data) => {
        if (!cancelled) {
          setResults(data)
          cacheResults(trimmedDebouncedQuery, data)
          setSearching(false)
          // Record analytics after successful search
          recordSearchQuery(trimmedDebouncedQuery)
        }
      }).catch(() => {
        if (!cancelled) {
          setResults([])
          setSearching(false)
        }
      })
    })

    return () => {
      cancelled = true
      window.clearTimeout(timeout)
    }
  }, [trimmedDebouncedQuery, language, type, mode, cacheResults])

  // ── Grouped results ────────────────────────────────────────────────────
  const grouped = useMemo(
    () => (type ? filterTypes : coreResultTypes)
      .map((itemType) => ({
        type: itemType,
        results: visibleResults.filter((result) => result.type === itemType),
      }))
      .filter((group) => group.results.length),
    [visibleResults, type],
  )

  // ── Global keyboard event handler ───────────────────────────────────────
  // Uses window-level listener so arrow/enter/escape keys work from both the
  // search input (in PageShell header) and the results area.
  useEffect(() => {
    if (!trimmedDebouncedQuery && flatResults.length === 0) return

    const onKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in a textarea or other input
      const activeTag = document.activeElement?.tagName
      if (activeTag === 'TEXTAREA' || activeTag === 'SELECT') return

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault()
          setSelectedIndex((prev) => {
            if (prev >= flatResults.length - 1) return 0 // wrap to top
            return prev + 1
          })
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          setSelectedIndex((prev) => {
            if (prev <= 0) return flatResults.length - 1 // wrap to bottom
            return prev - 1
          })
          break
        }
        case 'Enter': {
          if (selectedIndex >= 0 && selectedIndex < flatResults.length) {
            e.preventDefault()
            const { result } = flatResults[selectedIndex]
            navigate(result.url)
          }
          break
        }
        case 'Escape': {
          if (query) {
            e.preventDefault()
            setQuery('')
            setSelectedIndex(-1)
          }
          break
        }
      }
    }

    window.addEventListener('keydown', onKeyDown, { passive: false })
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [trimmedDebouncedQuery, flatResults, selectedIndex, navigate, setQuery, query])

  // ── Popular search click handler ───────────────────────────────────────
  const handlePopularClick = useCallback((term: string) => {
    setQuery(term)
    inputRef.current?.focus()
  }, [setQuery])

  // ── Render helpers ─────────────────────────────────────────────────────
  const renderSnippet = (result: KnowledgeSearchResult) => {
    if (!result.snippet) return null
    return (
      <p className="mt-2 text-xs leading-5 text-slate-500 italic line-clamp-1 border-l-2 border-emerald-400/20 pl-2">
        {result.snippet}
      </p>
    )
  }

  const renderEmptyState = () => (
    <div className="animate-fadeIn space-y-6">
      {/* Popular searches */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-emerald-400" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {t('search.popularSearches', 'Popular searches')}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {displayPopular.map((term) => (
            <button
              key={term}
              onClick={() => handlePopularClick(term)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-slate-900/60 px-3.5 py-1.5 text-sm text-slate-300 transition-all hover:border-emerald-400/30 hover:bg-slate-900/80 hover:text-emerald-200 hover:shadow-[0_0_12px_rgba(52,211,153,0.08)]"
            >
              <Hash className="h-3 w-3 text-slate-600" aria-hidden="true" />
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/[0.06] bg-slate-900/40 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-amber-400" />
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {t('search.tipExact', 'Try exact terms')}
            </p>
          </div>
          <p className="text-sm text-slate-500">
            {t('search.tipExactBody', 'Search body parts, positions, submission names, or concepts for the best results.')}
          </p>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-slate-900/40 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-cyan-400" />
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {t('search.tipDeep', 'Deep Search')}
            </p>
          </div>
          <p className="text-sm text-slate-500">
            {t('search.tipDeepBody', 'Toggle "Search in details" above to find mentions inside micro-details, troubleshooters, and escape maps.')}
          </p>
        </div>
      </div>
    </div>
  )

  const renderResultCard = (result: KnowledgeSearchResult, flatIdx: number) => (
    <article
      key={`${result.type}-${result.id}`}
      data-result-index={flatIdx}
      data-selected={flatIdx === selectedIndex || undefined}
      className={`group rounded-xl border p-5 transition-all ${
        flatIdx === selectedIndex
          ? 'border-emerald-400/40 bg-slate-900/80 shadow-[0_0_16px_rgba(52,211,153,0.08)]'
          : 'border-white/[0.06] bg-slate-900/40 hover:border-emerald-400/20 hover:bg-slate-900/70'
      }`}
      onMouseEnter={() => setSelectedIndex(flatIdx)}
    >
      <div className="flex flex-wrap gap-2">
        <Badge tone="cyan">{t(`knowledgeTypes.${result.type}`)}</Badge>
        {flatIdx === selectedIndex && (
          <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-400/60 self-center ml-1">
            ↵ open
          </span>
        )}
      </div>
      <Link to={result.url} className="mt-3 block" tabIndex={-1}>
        <h2 className="text-base font-semibold text-white transition-colors group-hover:text-emerald-100">
          {getLocalizedText(result.title, language)}
        </h2>
        <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-slate-400">
          {getLocalizedText(result.description, language)}
        </p>
        {renderSnippet(result)}
      </Link>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
        <div className="flex flex-wrap gap-1.5">
          {result.matchedFields.slice(0, 3).map((field) => (
            <Badge key={field} tone="slate">{field}</Badge>
          ))}
        </div>
        <Link
          to={result.url}
          className="inline-flex items-center gap-1 text-sm font-medium text-emerald-200 opacity-0 transition-opacity group-hover:opacity-100"
          tabIndex={-1}
        >
          {t('common.open')}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )

  return (
    <PageShell
      header={
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">{t('search.heading')}</h1>
            <p className="mt-1 text-sm text-slate-400">{t('search.whatFor')}</p>
          </div>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setSelectedIndex(-1)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === 'Escape') {
                    e.stopPropagation()
                  }
                }}
                placeholder={t('search.placeholder')}
                className="w-full rounded-xl border border-white/[0.08] bg-slate-900/80 py-2.5 pl-10 pr-3 text-sm text-white outline-none transition-all focus:border-emerald-400/30 focus:shadow-[0_0_0_1px_rgba(52,211,153,0.15)]"
                aria-label={t('search.placeholder')}
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <select
              value={type}
              onChange={(event) => {
              setType(event.target.value as KnowledgeItemType | '')
              setSelectedIndex(-1)
            }}
              className="rounded-xl border border-white/[0.08] bg-slate-900/80 px-3 py-2.5 text-sm text-white outline-none transition-all focus:border-emerald-400/30"
            >
              <option value="">{t('common.all')}</option>
              {coreResultTypes.map((itemType) => <option key={itemType} value={itemType}>{t(`knowledgeTypes.${itemType}`)}</option>)}
              <optgroup label={t('search.advancedFilters')}>
                {advancedResultTypes.map((itemType) => <option key={itemType} value={itemType}>{t(`knowledgeTypes.${itemType}`)}</option>)}
              </optgroup>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={mode === 'deep'}
                onChange={(e) => {
                  setMode(e.target.checked ? 'deep' : 'quick')
                  setSelectedIndex(-1)
                }}
                className="rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
              />
              {t('search.searchInDetails', 'Search in details (Deep Search)')}
            </label>
          </div>
          {query.trim() && flatResults.length > 0 && (
            <div className="flex items-center gap-2 text-[11px] text-slate-600">
              <kbd className="rounded border border-white/[0.08] bg-slate-800 px-1.5 py-0.5 font-mono text-[10px]">↑↓</kbd>
              <span>{t('search.navigate', 'Navigate')}</span>
              <kbd className="rounded border border-white/[0.08] bg-slate-800 px-1.5 py-0.5 font-mono text-[10px]">↵</kbd>
              <span>{t('common.open')}</span>
              <kbd className="rounded border border-white/[0.08] bg-slate-800 px-1.5 py-0.5 font-mono text-[10px]">esc</kbd>
              <span>{t('search.clear', 'Clear')}</span>
            </div>
          )}
        </div>
      }
    >
      <div ref={resultsContainerRef} className="outline-none">
        {/* Empty state with popular searches */}
        {!query.trim() && !trimmedDebouncedQuery ? (
          renderEmptyState()
        ) : null}

        {/* Loading skeleton */}
        {trimmedDebouncedQuery && isSearching ? (
          <div className="animate-fadeIn space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-slate-500 animate-pulse" />
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{t('common.loading')}</p>
            </div>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : null}

        {/* No results */}
        {trimmedDebouncedQuery && !isSearching && !visibleResults.length ? (
          <EmptyState title={t('search.noResults')} description={t('search.nextStep')} />
        ) : null}

        {/* Results by group */}
        {(() => {
          const offsets: number[] = []
          let offset = 0
          for (const g of grouped) {
            offsets.push(offset)
            offset += g.results.length
          }
          const groupOffsets = offsets
          return grouped.map((group, i) => (
            <SectionCard
              key={group.type}
              title={t(`knowledgeTypes.${group.type}`)}
              description={t('search.resultCount', { count: group.results.length })}
            >
              <div className="grid gap-3 xl:grid-cols-2">
                {group.results.map((result) => {
                  const idx = groupOffsets[i] + group.results.indexOf(result)
                  return renderResultCard(result, idx)
                })}
              </div>
            </SectionCard>
          ))
        })()}
      </div>
    </PageShell>
  )
}
