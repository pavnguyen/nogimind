import { useMemo, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Badge } from '../components/common/Badge'
import { BookOpen, BookText, Info, Search as SearchIcon } from 'lucide-react'
import { HubTabBar } from '../components/layout/HubTabBar'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'
import { useGlossaryQuery } from '../queries/glossaryQueries'
import { useManifestQuery } from '../queries/contentQueries'
import { useSettingsStore } from '../stores/useSettingsStore'
import { getLocalizedArray, getLocalizedTechnicalText } from '../utils/localization'

export default function ReferencePage() {
  const { t } = useTranslation()
  const lang = useSettingsStore((state) => state.language)
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'glossary'

  // Glossary data — computed at top level (hooks must be unconditional)
  const termsQuery = useGlossaryQuery()
  const terms = useMemo(() => termsQuery.data ?? [], [termsQuery.data])
  const manifestQuery = useManifestQuery(lang)
  const manifest = useMemo(() => manifestQuery.data ?? [], [manifestQuery.data])
  const byId = useMemo(() => new Map(manifest.map((skill) => [skill.id, skill])), [manifest])
  const parentRef = useRef<HTMLDivElement>(null)

  const glossaryQuery = searchParams.get('q') ?? ''
  const filteredTerms = useMemo(() => {
    if (!glossaryQuery.trim()) return terms
    const normalized = glossaryQuery.trim().toLowerCase()
    return terms.filter((term) => {
      const haystack = [
        term.term,
        getLocalizedTechnicalText(term.definition, lang),
        ...getLocalizedArray(term.examples, lang),
      ].join(' ').toLowerCase()
      return haystack.includes(normalized)
    })
  }, [glossaryQuery, lang, terms])

  // Virtualizer for glossary — top level
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
              <p className="text-sm text-slate-400">{t('glossary.subtitle')}</p>
              <Link
                to="/glossary"
                className="text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                {t('common.open')} →
              </Link>
            </div>
            <input
              value={glossaryQuery}
              onChange={(event) => setGlossaryQuery(event.target.value)}
              placeholder={t('glossary.q')}
              className="w-full rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-slate-400"
            />
            <SectionCard>
              <div ref={parentRef} className="h-[480px] overflow-auto pr-2">
                <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
                  {virtualizer.getVirtualItems().map((virtualItem) => {
                    const term = filteredTerms[virtualItem.index]
                    return (
                      <article
                        key={term.id}
                        className="absolute left-0 right-0 rounded-lg border border-white/10 bg-slate-900/70 p-4"
                        style={{ transform: `translateY(${virtualItem.start}px)` }}
                      >
                        <h2 className="text-sm font-semibold text-white">{term.term}</h2>
                        <p className="mt-1 text-xs leading-5 text-slate-300 line-clamp-2">
                          {getLocalizedTechnicalText(term.definition, lang)}
                        </p>
                        {term.relatedSkillIds?.length ? (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {term.relatedSkillIds.map((id) => byId.get(id)).filter(Boolean).slice(0, 3).map((skill) => (
                              <Link key={skill?.id} to={`/skills/${skill?.id}`} className="rounded-md border border-white/10 px-2 py-0.5 text-[10px] text-slate-300 hover:bg-white/10">
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
              <p className="text-sm text-slate-400">{t('search.whatFor')}</p>
              <Link
                to="/search"
                className="text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                {t('common.open')} →
              </Link>
            </div>
            <Link
              to="/search"
              className="group block rounded-2xl border border-white/[0.06] bg-slate-900/40 p-6 transition-all hover:border-slate-400/20 hover:bg-slate-900/70"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl hallmark-accent-bg hallmark-accent-text">
                  <SearchIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white group-hover:text-slate-200 transition-colors">
                    {t('search.heading')}
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">{t('search.subtitle')}</p>
                </div>
              </div>
            </Link>
          </div>
        )

      case 'about':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{t('about.philosophy')}</p>
              <Link
                to="/about"
                className="text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                {t('common.open')} →
              </Link>
            </div>
            <SectionCard>
              <div className="space-y-4 text-sm leading-6 text-slate-300">
                <p>{t('about.philosophy')}</p>
                <p>{t('about.system')}</p>
                <p className="hallmark-text-caution">{t('about.safety')}</p>
              </div>
            </SectionCard>
            <SectionCard title={t('detail.concepts')}>
              <div className="flex flex-wrap gap-2">
                {(t('about.themes', { returnObjects: true }) as string[]).map((theme: string) => (
                  <Badge className="hallmark-badge" key={theme}>{theme}</Badge>
                ))}
              </div>
            </SectionCard>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <PageShell
      header={
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-slate-900/30 p-8 hallmark-hero">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full hallmark-blur-blob blur-[80px]" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl hallmark-icon-box">
                <BookOpen className="h-7 w-7 text-slate-950" aria-hidden="true" />
              </div>
              <div>
                <Badge className="hallmark-badge text-[10px] uppercase tracking-widest">{t('modeUx.reference.badge')}</Badge>
                <h1 className="mt-1 display-heading text-3xl font-extrabold text-white lg:text-4xl">{t('modeUx.reference.heading')}</h1>
                <p className="mt-1 max-w-2xl text-base leading-relaxed text-slate-400">{t('modeUx.reference.subtitle')}</p>
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
          { id: 'about', labelKey: 'nav.philosophy', icon: Info },
        ]}

        className="mb-6"
      />

      <div className="animate-slideUp" key={activeTab}>
        {renderTabContent()}
      </div>
    </PageShell>
  )
}
