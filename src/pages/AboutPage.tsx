import { useTranslation } from 'react-i18next'
import { Badge } from '../components/common/Badge'
import { PageShell } from '../components/common/PageShell'
import { SectionCard } from '../components/common/SectionCard'

export default function AboutPage() {
  const { t } = useTranslation()
  const themes = t('about.themes', { returnObjects: true }) as string[]
  return (
    <PageShell
      header={
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">{t('about.heading')}</h1>
          <p className="mt-1 text-sm text-slate-400">{t('app.thesis')}</p>
        </div>
      }
    >
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
    </PageShell>
  )
}
