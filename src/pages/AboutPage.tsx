import { useTranslation } from 'react-i18next'
import { Badge } from '../components/common/Badge'
import { SectionCard } from '../components/common/SectionCard'

export default function AboutPage() {
  const { t } = useTranslation()
  const themes = t('about.themes', { returnObjects: true }) as string[]
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white">{t('about.heading')}</h1>
        <p className="mt-2 max-w-3xl text-slate-400">{t('app.thesis')}</p>
      </div>
      <SectionCard>
        <div className="space-y-5 text-base leading-8 text-slate-300">
          <p>{t('about.philosophy')}</p>
          <p>{t('about.system')}</p>
          <p className="text-amber-100">{t('about.safety')}</p>
        </div>
      </SectionCard>
      <SectionCard title={t('detail.concepts')}>
        <div className="flex flex-wrap gap-2">
          {themes.map((theme) => (
            <Badge key={theme} tone="emerald">{theme}</Badge>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
