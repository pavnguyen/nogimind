import { useState, type FormEvent } from 'react'
import { Menu, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '../i18n/LanguageSwitcher'
import { useUiStore } from '../../stores/useUiStore'

export const Header = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const setMobileNavOpen = useUiStore((state) => state.setMobileNavOpen)
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = query.trim()
    navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search')
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
        <form onSubmit={submitSearch} className="hidden w-full max-w-sm items-center gap-2 rounded-md border border-white/10 bg-slate-900 px-2 py-1.5 md:flex">
          <Search className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('search.headerPlaceholder')}
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </form>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
