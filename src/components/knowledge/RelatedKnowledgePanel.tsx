import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Badge } from '../common/Badge'
import { SectionCard } from '../common/SectionCard'
import type { LanguageCode } from '../../types/skill'
import type { KnowledgeLinkGroup } from '../../utils/knowledgeGraph'
import { getLocalizedText } from '../../utils/localization'

type Props = {
  lang: LanguageCode
  groups: KnowledgeLinkGroup[]
  title?: string
  description?: string
  maxItemsPerGroup?: number
}

export const RelatedKnowledgePanel = ({ lang, groups, title, description, maxItemsPerGroup = 4 }: Props) => {
  const { t } = useTranslation()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  const visibleGroups = useMemo(() => groups.filter((group) => group.links.length > 0), [groups])

  if (!visibleGroups.length) return null

  const toggleGroup = (key: string) => {
    setOpenGroups((current) => ({ ...current, [key]: !current[key] }))
  }

  return (
    <SectionCard title={title ?? t('knowledgeGraph.relatedHeading')} description={description ?? t('knowledgeGraph.relatedBody')}>
      <div className="space-y-4">
        {visibleGroups.map((group) => {
          const key = `${group.type}:${getLocalizedText(group.label, 'en')}`
          const isOpen = Boolean(openGroups[key])
          const links = isOpen ? group.links : group.links.slice(0, maxItemsPerGroup)
          const canExpand = group.links.length > maxItemsPerGroup

          return (
            <div key={key} className="rounded-lg border border-white/10 bg-slate-950/40 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="cyan">{t(`knowledgeTypes.${group.type}`)}</Badge>
                  <p className="text-sm font-semibold text-white">{getLocalizedText(group.label, lang)}</p>
                </div>
                {canExpand ? (
                  <button
                    type="button"
                    onClick={() => toggleGroup(key)}
                    className="inline-flex items-center gap-1 rounded-md border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10"
                  >
                    {isOpen ? t('knowledgeGraph.viewLess') : t('knowledgeGraph.viewMore')}
                    {isOpen ? <ChevronDown className="h-4 w-4" aria-hidden="true" /> : <ChevronRight className="h-4 w-4" aria-hidden="true" />}
                  </button>
                ) : null}
              </div>

              <div className="grid gap-2">
                {links.map((link) => (
                  <Link
                    key={`${link.type}:${link.id}`}
                    to={link.url}
                    className="rounded-md border border-white/10 bg-slate-900/70 p-3 transition hover:border-cyan-300/35 hover:bg-white/[0.06]"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone={link.strength === 'primary' ? 'emerald' : link.strength === 'secondary' ? 'amber' : 'slate'}>
                        {t(`knowledgeGraph.strength.${link.strength}`)}
                      </Badge>
                      <p className="text-sm font-semibold text-white">{getLocalizedText(link.title, lang)}</p>
                    </div>
                    {link.description ? <p className="mt-2 text-sm leading-6 text-slate-400">{getLocalizedText(link.description, lang)}</p> : null}
                    {link.reason ? <p className="mt-2 text-xs leading-5 text-cyan-100/85">{getLocalizedText(link.reason, lang)}</p> : null}
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </SectionCard>
  )
}
