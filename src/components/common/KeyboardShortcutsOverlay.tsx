import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useUiStore } from '../../stores/useUiStore'
import { cn } from '../../utils/cn'
import { X, Command, ArrowUp, ArrowRight } from 'lucide-react'

type ShortcutGroup = {
  labelKey: string
  keys: { label: string; keys: string[] }[]
}

const shortcutGroups: ShortcutGroup[] = [
  {
    labelKey: 'shortcuts.group.navigation',
    keys: [
      { label: 'Dashboard', keys: ['g', 'd'] },
      { label: 'Learn', keys: ['g', 'l'] },
      { label: 'Study', keys: ['g', 't'] },
      { label: 'Fix (Troubleshooters)', keys: ['g', 'f'] },
      { label: 'Build', keys: ['g', 'b'] },
      { label: 'Reference', keys: ['g', 'r'] },
      { label: 'Search', keys: ['g', 's'] },
      { label: 'Settings', keys: ['g', 'g'] },
    ],
  },
  {
    labelKey: 'shortcuts.group.search',
    keys: [
      { label: 'Focus search', keys: ['⌘', 'K'] },
      { label: 'Navigate results', keys: ['↑', '↓'] },
      { label: 'Open result', keys: ['↵', 'Enter'] },
      { label: 'Clear / close', keys: ['Esc'] },
    ],
  },
  {
    labelKey: 'shortcuts.group.general',
    keys: [
      { label: 'Toggle this help', keys: ['?'] },
      { label: 'Close overlay', keys: ['Esc'] },
    ],
  },
]

const groupIcons: Record<string, React.ReactNode> = {
  'shortcuts.group.navigation': <ArrowRight className="h-3.5 w-3.5" />,
  'shortcuts.group.search': <Command className="h-3.5 w-3.5" />,
  'shortcuts.group.general': <ArrowUp className="h-3.5 w-3.5" />,
}

export const KeyboardShortcutsOverlay = () => {
  const { t } = useTranslation()
  const show = useUiStore((state) => state.showKeyboardShortcuts)
  const setShow = useUiStore((state) => state.setShowKeyboardShortcuts)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  // Focus close button when dialog opens
  useEffect(() => {
    if (show) {
      // Small RAF delay so the dialog renders before focusing
      requestAnimationFrame(() => closeBtnRef.current?.focus())
    }
  }, [show])

  // Trap focus inside dialog when open
  useEffect(() => {
    if (!show) return

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const dialog = dialogRef.current
      if (!dialog) return
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleTab)
    return () => window.removeEventListener('keydown', handleTab)
  }, [show])

  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={() => setShow(false)}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setShow(false)
      }}
      role="dialog"
      aria-modal="true"
      aria-label={t('shortcuts.heading')}
    >
      <div
        ref={dialogRef}
        className="relative mx-4 w-full max-w-lg animate-scale-in rounded-2xl border border-white/[0.08] bg-slate-900/95 p-6 shadow-2xl backdrop-blur-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-400">
              <Command className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">{t('shortcuts.heading')}</h2>
              <p className="text-xs text-slate-500">{t('shortcuts.subtitle')}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShow(false)}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.06] text-slate-500 transition-colors hover:bg-white/[0.06] hover:text-white"
            aria-label={t('shortcuts.close')}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Groups */}
        <div className="space-y-5">
          {shortcutGroups.map((group) => (
            <div key={group.labelKey}>
              <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                {groupIcons[group.labelKey]}
                {t(group.labelKey)}
              </div>
              <div className="space-y-1">
                {group.keys.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-white/[0.03]"
                  >
                    <span className="text-sm text-slate-300">{item.label}</span>
                    <span className="flex items-center gap-1">
                      {item.keys.map((key, idx) => (
                        <span key={idx} className="flex items-center gap-0.5">
                          <kbd
                            className={cn(
                              'inline-flex items-center justify-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold leading-none',
                              key === '?' || key === 'Esc'
                                ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300'
                                : 'border-white/[0.08] bg-slate-800 text-slate-300',
                            )}
                          >
                            {key}
                          </kbd>
                          {idx < item.keys.length - 1 && <span className="text-[9px] text-slate-600">+</span>}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-6 rounded-lg border border-cyan-400/10 bg-cyan-400/[0.03] px-4 py-2.5">
          <p className="text-xs text-slate-400">
            {t('shortcuts.tip')}
          </p>
        </div>
      </div>
    </div>
  )
}
