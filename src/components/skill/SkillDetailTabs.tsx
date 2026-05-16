import type { ReactNode } from 'react'

export type TabId = 'learn' | 'fix' | 'watch'

type TabDef = {
  id: TabId
  label: string
  icon: ReactNode
  count?: number
  accent: string
}

type Props = {
  tabs: TabDef[]
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

const tabAccents: Record<TabId, string> = {
  learn: 'border-cyan-400 text-cyan-200 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.2),0_0_18px_rgba(34,211,238,0.16)]',
  fix: 'border-violet-400 text-violet-200 shadow-[inset_0_0_0_1px_rgba(167,139,250,0.2),0_0_18px_rgba(167,139,250,0.16)]',
  watch: 'border-sky-400 text-sky-100 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.22),0_0_20px_rgba(56,189,248,0.2)]',
}

const tabInactiveAccents: Record<TabId, string> = {
  learn: 'hover:text-cyan-300 border-transparent',
  fix: 'hover:text-violet-300 border-transparent',
  watch: 'hover:text-sky-200 border-transparent',
}

export const SkillDetailTabs = ({ tabs, activeTab, onTabChange }: Props) => {
  return (
    <div className="sticky top-16 z-30 -mx-4 bg-slate-950/90 px-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <nav className="flex gap-1 overflow-x-auto border-b border-white/8 pb-1 scrollbar-none" role="tablist">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative flex shrink-0 items-center gap-2 rounded-t-xl px-4 py-3 text-xs font-semibold
                transition-all duration-200
                ${isActive
                  ? `${tabAccents[tab.id]} border-b-2 bg-gradient-to-b from-white/[0.08] to-white/[0.03]`
                  : `text-slate-500 ${tabInactiveAccents[tab.id]} border-b-2 hover:bg-white/[0.02]`
                }
              `}
            >
              <span className="h-4 w-4">{tab.icon}</span>
              <span className="whitespace-nowrap">{tab.label}</span>
              {tab.id === 'watch' && (
                <span
                  aria-hidden="true"
                  className={`ml-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                    isActive
                      ? 'border-sky-300/40 bg-sky-300/15 text-sky-100'
                      : 'border-white/10 bg-white/[0.03] text-slate-500'
                  }`}
                >
                  <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.5 6.5 5 3.5-5 3.5v-7Zm-5.5 3.5a7 7 0 1 0 14 0 7 7 0 0 0-14 0Z" />
                  </svg>
                </span>
              )}
              {tab.count !== undefined && tab.count > 0 && (
                <span className="ml-0.5 rounded-full bg-white/8 px-1.5 py-0.5 text-[10px] tabular-nums">
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

// Tab panel wrapper
export const TabPanel = ({ id, activeTab, children }: { id: TabId; activeTab: TabId; children: ReactNode }) => {
  if (id !== activeTab) return null
  return <div className="animate-fadeIn">{children}</div>
}

// eslint-disable-next-line react-refresh/only-export-components
export const TabIcons = {
  learn: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
    </svg>
  ),
  system: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
    </svg>
  ),
  body: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
    </svg>
  ),
  details: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  fix: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.087 4.113" />
    </svg>
  ),
  safety: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
    </svg>
  ),
  videos: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  ),
  watch: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  ),
  next: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  ),
}
