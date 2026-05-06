import { useTranslation } from 'react-i18next'
import { SectionCard } from '../common/SectionCard'
import { NextStepCard } from './NextStepCard'

export type NextStepItem = {
  title: string
  body: string
  to: string
  badge?: string
}

type NextStepStripProps = {
  title: string
  items: NextStepItem[]
  description?: string
}

export const NextStepStrip = ({ title, items, description }: NextStepStripProps) => {
  const { t } = useTranslation()
  if (!items.length) return null

  return (
    <SectionCard title={title} description={description}>
      <div className="grid gap-3 xl:grid-cols-2">
        {items.map((item) => (
          <NextStepCard key={`${item.to}-${item.title}`} title={item.title} body={item.body} to={item.to} badge={item.badge ?? t('common.next')} />
        ))}
      </div>
    </SectionCard>
  )
}
