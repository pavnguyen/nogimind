import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Menu, Search, Command } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '../i18n/LanguageSwitcher'
import { useUiStore } from '../../stores/useUiStore'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { useSearchStore } from '../../stores/useSearchStore'
import { getLocalizedText } from '../../utils/localization'
import { Badge } from '../common/Badge'
import type { KnowledgeSearchResult } from '../../types/knowledgeSearch'

export const Header = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const setMobileNavOpen = useUiStore((state) => state.setMobileNavOpen)
  const language = useSettingsStore((state) => state.language)
  const query = useSearchStore((state) => state.query)
  const setQuery = useSearchStore((state) => state.setQuery)
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<KnowledgeSearchResult[]>([])
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Keyboard shortcut: Cmd+K to focus search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    window.addEventListener('mousedown', handleClick)
    return () => window.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    if (!open) {
      setSuggestions([])
      return
    }

    const trimmed = query.trim()
    if (trimmed.length < 2) {
      setSuggestions([])
      return
    }

    let cancelled = false
    const timeout = window.setTimeout(() => {
      import('../../utils/knowledgeSearch')
        .then(async ({ searchKnowledge }) => {
          if (!cancelled) {
            const results = await searchKnowledge(trimmed, language)
            if (!cancelled) setSuggestions(results.slice(0, 6))
          }
        })
        .catch(() => {
          if (!cancelled) setSuggestions([])
        })
    }, 120)

    return () => {
      cancelled = true
      window.clearTimeout(timeout)
    }
  }, [language, open, query])

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return navigate('/search')
    navigate('/search')
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-slate-950/60 px-4 py-2.5 backdrop-blur-xl lg:px-6">
      <div className="flex items-center justify-between gap-4">
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-white/[0.06] px-3 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-white/[0.04] hover:text-white lg:hidden"
          aria-label={t('nav.settings')}
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
          <span className="text-xs text-slate-500">{t('app.name')}</span>
        </button>

        {/* Brand (desktop) */}
        <div className="hidden min-w-0 lg:block">
          <p className="max-w-xl truncate text-sm text-slate-400">
            {t('app.thesis')}
          </p>
        </div>

        {/* Search */}
        <div ref={rootRef} className="relative w-full max-w-md">
          <form onSubmit={submitSearch} className="group flex items-center gap-2 rounded-lg border border-white/[0.08] bg-slate-900/80 px-3 py-1.5 transition-all focus-within:border-emerald-400/30 focus-within:bg-slate-900/60 focus-within:shadow-[0_0_0_1px_rgba(52,211,153,0.15)]">
            <Search className="h-4 w-4 shrink-0 text-slate-500 transition-colors group-focus-within:text-emerald-400" aria-hidden="true" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setOpen(event.target.value.trim().length >= 2)
              }}
              onFocus={() => setOpen(Boolean(query.trim()))}
              placeholder={t('search.headerPlaceholder')}
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
            <kbd className="hidden shrink-0 items-center gap-0.5 rounded border border-white/[0.08] bg-slate-800 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 md:flex">
              <Command className="h-2.5 w-2.5" />
              <span>K</span>
            </kbd>
          </form>
          {open && query.trim().length >= 2 && (
            <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 animate-scale-in rounded-xl border border-white/[0.08] bg-slate-950/95 p-2 shadow-glow-lg backdrop-blur-2xl">
              {suggestions.length ? (
                <div className="grid gap-1">
                  {suggestions.map((result) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      type="button"
                      onClick={() => {
                        navigate(result.url)
                        setOpen(false)
                      }}
                      className="group flex items-start gap-3 rounded-lg border border-transparent px-3 py-2.5 text-left transition-all hover:border-white/[0.06] hover:bg-white/[0.04]"
                    >
                      <Badge tone="cyan" className="mt-0.5 shrink-0 text-[10px]">{t(`knowledgeTypes.${result.type}`)}</Badge>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white group-hover:text-emerald-100">
                          {getLocalizedText(result.title, language)}
                        </p>
                        <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
                          {getLocalizedText(result.description, language)}
                        </p>
                      </div>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      navigate('/search')
                      setOpen(false)
                    }}
                    className="mt-1 rounded-lg border border-emerald-400/15 px-3 py-2 text-center text-sm font-medium text-emerald-100 transition-all hover:bg-emerald-400/10"
                  >
                    {t('search.openFullResults')}
                  </button>
                </div>
              ) : (
                <p className="px-3 py-3 text-center text-sm text-slate-500">{t('search.noResults')}</p>
              )}
            </div>
          )}
        </div>

        <LanguageSwitcher />
      </div>
    </header>
  )
}
