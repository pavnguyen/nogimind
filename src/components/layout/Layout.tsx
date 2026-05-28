import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from './Header'
import { MobileNav } from './MobileNav'
import { Sidebar } from './Sidebar'
import { KeyboardShortcutsOverlay } from '../common/KeyboardShortcutsOverlay'
import { useUiStore } from '../../stores/useUiStore'
import { useTranslation } from 'react-i18next'
import { cn } from '../../utils/cn'

/**
 * Two-key chord state for shortcuts like "g d" → /, "g s" → /search, etc.
 * Resets after 800ms of inactivity.
 */
let chordBuffer: string[] = []
let chordTimer: ReturnType<typeof setTimeout> | null = null

const chordRoutes: Record<string, string> = {
  d: '/',
  l: '/learn',
  t: '/study',
  f: '/troubleshooters',
  b: '/build',
  r: '/reference',
  s: '/search',
  g: '/settings',
}

export const Layout = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const toggleShortcuts = useUiStore((state) => state.toggleKeyboardShortcuts)
  const setShortcuts = useUiStore((state) => state.setShowKeyboardShortcuts)

  // Global keyboard shortcut listeners
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement)?.tagName
      const isEditable = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'

      // ? — Toggle shortcuts overlay (even when editing)
      if (event.key === '?' && !event.metaKey && !event.ctrlKey) {
        event.preventDefault()
        toggleShortcuts()
        return
      }

      // Esc — Close overlay
      if (event.key === 'Escape') {
        setShortcuts(false)
        return
      }

      // Don't process other shortcuts when editing
      if (isEditable) return

      // Two-key chord navigation: press 'g' then another key
      if (event.key === 'g') {
        chordBuffer = ['g']
        if (chordTimer) clearTimeout(chordTimer)
        chordTimer = setTimeout(() => {
          chordBuffer = []
        }, 800)
        return
      }

      if (chordBuffer[0] === 'g' && chordRoutes[event.key]) {
        event.preventDefault()
        chordBuffer = []
        if (chordTimer) clearTimeout(chordTimer)
        navigate(chordRoutes[event.key])
        return
      }

      // Not a chord key — reset buffer
      chordBuffer = []
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [navigate, toggleShortcuts, setShortcuts])

  return (
    <div className="min-h-screen text-slate-100">
      {/* Skip-to-content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-emerald-500 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-slate-950"
      >
        {t('accessibility.skipToContent')}
      </a>
      <div className="flex">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header />
          <main id="main-content" className="mx-auto w-full max-w-[1500px] flex-1 px-4 py-6 lg:px-8 lg:py-8" tabIndex={-1}>
            <Outlet />
          </main>
          <footer className="mx-auto w-full max-w-[1500px] px-4 pb-6 text-xs text-slate-500 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <a
                  href="https://www.lindigi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-md border border-white/[0.06] px-3 py-2 transition-colors hover:border-emerald-300/25 hover:text-emerald-100"
                >
                  {t('app.poweredBy')}
                </a>
              </div>
              <button
                type="button"
                onClick={() => setShortcuts(true)}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-[11px] font-medium transition-all',
                  'border-white/[0.06] text-slate-500 hover:border-cyan-400/20 hover:bg-cyan-400/[0.04] hover:text-cyan-300',
                )}
                aria-label={t('shortcuts.heading')}
              >
                <kbd className="inline-flex h-4 w-4 items-center justify-center rounded border border-current/20 bg-current/10 text-[10px] font-bold">
                  ?
                </kbd>
                <span className="hidden sm:inline">{t('shortcuts.heading')}</span>
              </button>
            </div>
          </footer>
          <div className="h-16 lg:hidden" />
        </div>
      </div>
      <MobileNav />
      <KeyboardShortcutsOverlay />
    </div>
  )
}
