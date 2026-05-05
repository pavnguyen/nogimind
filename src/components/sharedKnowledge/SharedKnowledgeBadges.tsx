import { Badge } from '../common/Badge'
import { useTranslation } from 'react-i18next'

type Props = {
  title: string
  items: string[]
}

export const SharedKnowledgeBadges = ({ title, items }: Props) => (
) => {
  const { t } = useTranslation()

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.length ? items.map((item) => <Badge key={item}>{item}</Badge>) : <span className="text-sm text-slate-500">{t('common.none')}</span>}
      </div>
    </div>
  )
}
