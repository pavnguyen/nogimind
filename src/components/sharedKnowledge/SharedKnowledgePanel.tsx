import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SectionCard } from '../common/SectionCard'
import { SharedKnowledgeCard } from './SharedKnowledgeCard'
import type { LanguageCode } from '../../types/skill'
import type { SharedKnowledgeItem } from '../../types/sharedKnowledge'

type Props = {
  lang: LanguageCode
  principles: SharedKnowledgeItem[]
  cues: SharedKnowledgeItem[]
  errors: SharedKnowledgeItem[]
  safety: SharedKnowledgeItem[]
  mechanics: SharedKnowledgeItem[]
}

const group = (title: string, items: SharedKnowledgeItem[], lang: LanguageCode) =>
  items.length ? (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-white">{title}</p>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => <SharedKnowledgeCard key={item.id} item={item} lang={lang} />)}
      </div>
    </div>
  ) : null

export const SharedKnowledgePanel = ({ lang, principles, cues, errors, safety, mechanics }: Props) => {
  const { t } = useTranslation()

  return (
    <SectionCard title={t('sharedKnowledge.heading')} description={t('sharedKnowledge.subtitle')}>
      <div className="space-y-5">
        {group(t('sharedKnowledge.groups.principles'), principles, lang)}
        {group(t('sharedKnowledge.groups.cues'), cues, lang)}
        {group(t('sharedKnowledge.groups.mechanics'), mechanics, lang)}
        {group(t('sharedKnowledge.groups.errors'), errors, lang)}
        {group(t('sharedKnowledge.groups.safety'), safety, lang)}
        <div className="flex justify-end">
          <Link to="/search" className="text-sm font-medium text-cyan-200 hover:text-cyan-100">
            {t('sharedKnowledge.searchMore')}
          </Link>
        </div>
      </div>
    </SectionCard>
  )
}
