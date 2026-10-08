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
          <p className="hallmark-text-caution">{t('about.safety')}</p>
        </div>
      </SectionCard>
      <SectionCard title={t('detail.concepts')}>
        <div className="flex flex-wrap gap-2">
          {themes.map((theme) => (
            <Badge key={theme}>{theme}</Badge>
          ))}
        </div>
      </SectionCard>
      <SectionCard title={t('about.thanks.heading')}>
        <div className="space-y-4">
          <p className="text-base leading-8 text-slate-300">{t('about.thanks.body')}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.facebook.com/profile.php?id=100087911966054"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-amber-300/30 hover:text-amber-100"
            >
              Guardian HCM · Facebook
            </a>
            <a
              href="https://www.instagram.com/guardianhcmc/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-amber-300/30 hover:text-amber-100"
            >
              Guardian HCM · Instagram
            </a>
          </div>
        </div>
      </SectionCard>
    </PageShell>
  )
}
