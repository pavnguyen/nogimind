import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Badge } from '../common/Badge'
import { cn } from '../../utils/cn'
import { getLocalizedText } from '../../utils/localization'
import type { SharedKnowledgeItem } from '../../types/sharedKnowledge'
import type { LanguageCode } from '../../types/skill'

type Props = {
  item: SharedKnowledgeItem
  lang: LanguageCode
}

export const SharedKnowledgeCard = ({ item, lang }: Props) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <article className="rounded-lg border border-white/10 bg-slate-950/65 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <Badge tone="cyan">{t(`sharedKnowledge.categories.${item.category}`)}</Badge>
            {item.tags.slice(0, 2).map((tag) => <Badge key={tag}>{tag}</Badge>)}
          </div>
          <h3 className="mt-3 text-sm font-semibold text-white">{getLocalizedText(item.title, lang)}</h3>
        </div>
        <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-md border border-white/10 p-2 text-slate-300 hover:bg-white/10" aria-label={open ? t('sharedKnowledge.collapse') : t('sharedKnowledge.expand')}>
          {open ? <ChevronUp className="h-4 w-4" aria-hidden="true" /> : <ChevronDown className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{getLocalizedText(item.shortText, lang)}</p>
      {open && item.deepText ? <p className={cn('mt-3 text-sm leading-6 text-slate-400')}>{getLocalizedText(item.deepText, lang)}</p> : null}
    </article>
  )
}
