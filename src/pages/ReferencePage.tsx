import { useMemo, useRef } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Badge } from '../components/common/Badge'
import { BookOpen, BookText, Search as SearchIcon } from 'lucide-react'
import { HubTabBar } from '../components/layout/HubTabBar'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'
import { useGlossaryQuery } from '../queries/glossaryQueries'
import { useManifestQuery } from '../queries/contentQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getLocalizedArray, getLocalizedTechnicalText } from '../utils/localization'
import { haystackIncludesQuery, normalizeSearchQuery } from '../utils/searchText'

export default function ReferencePage() {
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'glossary'

  // Glossary data, computed at top level (hooks must be unconditional)
  const termsQuery = useGlossaryQuery()
  const terms = useMemo(() => termsQuery.data ?? [], [termsQuery.data])
  const manifestQuery = useManifestQuery(lang)
  const manifest = useMemo(() => manifestQuery.data ?? [], [manifestQuery.data])
  const byId = useMemo(() => new Map(manifest.map((skill) => [skill.id, skill])), [manifest])
  const parentRef = useRef<HTMLDivElement>(null)

  const glossaryQuery = searchParams.get('q') ?? ''
  const filteredTerms = useMemo(() => {
    const normalizedQuery = normalizeSearchQuery(glossaryQuery)
    return terms.filter((term) => {
      const haystack = [
        term.term,
        getLocalizedTechnicalText(term.definition, lang),
        ...getLocalizedArray(term.examples, lang),
      ].join(' ')
      return haystackIncludesQuery(haystack, normalizedQuery)
    })
  }, [glossaryQuery, lang, terms])

  // Virtualizer for glossary, top level
  // virtualizer API is safe but the incompatible-library rule flags it
  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: activeTab === 'glossary' ? filteredTerms.length : 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 160,
    overscan: 4,
  })

  const setGlossaryQuery = (value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set('q', value)
    else next.delete('q')
    setSearchParams(next)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'glossary':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-warm-400">{t('glossary.subtitle')}</p>
              <Link
                to="/glossary"
                className="px-1.5 py-2 text-xs font-medium text-warm-400 hover:text-warm-200 transition-colors"
              >
                {t('common.open')} →
              </Link>
            </div>
            <input
              value={glossaryQuery}
              onChange={(event) => setGlossaryQuery(event.target.value)}
              placeholder={t('glossary.q')}
              className="w-full rounded-md border border-warm-50/10 bg-warm-900 px-3 py-2 text-sm text-warm-50 outline-none focus:border-warm-400"
            />
            <SectionCard>
              <div ref={parentRef} className="h-[480px] overflow-auto pr-2">
                <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
                  {virtualizer.getVirtualItems().map((virtualItem) => {
                    const term = filteredTerms[virtualItem.index]
                    return (
                      <article
                        key={term.id}
                        className="absolute left-0 right-0 rounded-lg border border-warm-50/10 bg-warm-900/70 p-4"
                        style={{ transform: `translateY(${virtualItem.start}px)` }}
                      >
                        <h2 className="text-sm font-semibold text-warm-50">{term.term}</h2>
                        <p className="mt-1 text-xs leading-5 text-warm-300 line-clamp-2">
                          {getLocalizedTechnicalText(term.definition, lang)}
                        </p>
                        {term.relatedSkillIds?.length ? (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {term.relatedSkillIds.map((id) => byId.get(id)).filter(Boolean).slice(0, 3).map((skill) => (
                              <Link key={skill?.id} to={`/skills/${skill?.id}`} className="rounded-md border border-warm-50/10 px-2.5 py-2 text-xs text-warm-300 hover:bg-warm-50/10">
                                {skill?.name ?? ''}
                              </Link>
                            ))}
                          </div>
                        ) : null}
                      </article>
                    )
                  })}
                </div>
              </div>
            </SectionCard>
          </div>
        )

      case 'search':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-warm-400">{t('search.whatFor')}</p>
              <Link
                to="/search"
                className="px-1.5 py-2 text-xs font-medium text-warm-400 hover:text-warm-200 transition-colors"
              >
                {t('common.open')} →
              </Link>
            </div>
            <Link
              to="/search"
              className="group block rounded-2xl border border-warm-50/[0.06] bg-warm-900/40 p-6 transition-all hover:border-warm-400/20 hover:bg-warm-900/70"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl hallmark-accent-bg hallmark-accent-text">
                  <SearchIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-warm-50 group-hover:text-warm-200 transition-colors">
                    {t('search.heading')}
                  </h2>
                  <p className="mt-1 text-sm text-warm-400">{t('search.subtitle')}</p>
                </div>
              </div>
            </Link>
          </div>
        )

      default:
        return null
    }
  }

  if (activeTab === 'about') return <Navigate to="/about" replace />

  return (
    <PageShell
      header={
        <div className="relative overflow-hidden rounded-3xl border border-warm-50/[0.06] bg-warm-900/30 p-5 sm:p-7 lg:p-8 hallmark-hero">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full hallmark-blur-blob blur-[80px]" />
          <div className="relative z-10 space-y-4">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl hallmark-icon-box sm:h-14 sm:w-14">
                <BookOpen className="h-7 w-7 text-on-accent" aria-hidden="true" />
              </div>
              <div className="w-full min-w-0 sm:w-auto">
                <Badge className="hallmark-badge text-[10px] uppercase tracking-widest">{t('modeUx.reference.badge')}</Badge>
                <h1 className="mt-1 display-heading text-2xl font-extrabold text-warm-50 sm:text-3xl lg:text-4xl">{t('modeUx.reference.heading')}</h1>
                <p className="mt-1 max-w-2xl text-base leading-relaxed text-warm-400">{t('modeUx.reference.subtitle')}</p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <HubTabBar
        tabs={[
          { id: 'glossary', labelKey: 'nav.glossary', icon: BookText },
          { id: 'search', labelKey: 'nav.search', icon: SearchIcon },
        ]}

        className="mb-6"
      />

      <div className="animate-slideUp" key={activeTab}>
        {renderTabContent()}
      </div>
    </PageShell>
  )
}
