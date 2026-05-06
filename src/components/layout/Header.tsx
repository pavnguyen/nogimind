import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Menu, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '../i18n/LanguageSwitcher'
import { useUiStore } from '../../stores/useUiStore'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { useSearchStore } from '../../stores/useSearchStore'
import { searchKnowledge } from '../../utils/knowledgeSearch'
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

    const timeout = window.setTimeout(() => {
      setSuggestions(searchKnowledge(trimmed, language).slice(0, 5))
    }, 120)

    return () => window.clearTimeout(timeout)
  }, [language, open, query])

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return navigate('/search')
    navigate('/search')
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/75 px-4 py-3 backdrop-blur lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="rounded-md border border-white/10 p-2 text-slate-200 lg:hidden"
          aria-label={t('nav.settings')}
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white lg:hidden">{t('app.name')}</p>
          <p className="hidden max-w-3xl truncate text-sm text-slate-400 lg:block">{t('app.thesis')}</p>
        </div>
        <div ref={rootRef} className="relative hidden w-full max-w-md md:block">
          <form onSubmit={submitSearch} className="flex w-full items-center gap-2 rounded-md border border-white/10 bg-slate-900 px-2 py-1.5">
            <Search className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setOpen(event.target.value.trim().length >= 2)
              }}
              onFocus={() => setOpen(Boolean(query.trim()))}
              placeholder={t('search.headerPlaceholder')}
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </form>
          {open && query.trim().length >= 2 ? (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-lg border border-white/10 bg-slate-950/95 p-2 shadow-xl backdrop-blur">
              {suggestions.length ? (
                <div className="grid gap-2">
                  {suggestions.map((result) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      type="button"
                      onClick={() => {
                        navigate(result.url)
                        setOpen(false)
                      }}
                      className="rounded-md border border-white/10 bg-slate-900/80 p-3 text-left hover:border-cyan-300/30 hover:bg-white/10"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone="cyan">{t(`knowledgeTypes.${result.type}`)}</Badge>
                        <Badge tone="emerald">{t('search.score', { score: result.score })}</Badge>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-white">{getLocalizedText(result.title, language)}</p>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{getLocalizedText(result.description, language)}</p>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      navigate('/search')
                      setOpen(false)
                    }}
                    className="rounded-md border border-cyan-300/20 px-3 py-2 text-left text-sm text-cyan-100 hover:bg-white/10"
                  >
                    {t('search.openFullResults')}
                  </button>
                </div>
              ) : (
                <p className="px-3 py-2 text-sm text-slate-400">{t('search.noResults')}</p>
              )}
            </div>
          ) : null}
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
