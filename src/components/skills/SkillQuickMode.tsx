import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Badge } from '../common/Badge'
import { SectionCard } from '../common/SectionCard'
import { FastFinishPathCard } from './FastFinishPathCard'
import { MicroDetailCard } from './MicroDetailCard'
import { QuickCard } from './QuickCard'
import type { LanguageCode, SkillNode } from '../../types/skill'
import { getLocalizedText } from '../../utils/localization'

type Props = {
  skill: SkillNode
  lang: LanguageCode
  fullDetailPath: string
}

export const SkillQuickMode = ({ skill, lang, fullDetailPath }: Props) => {
  const { t } = useTranslation()
  const microDetailSystem = skill.microDetailSystem
  const qualityChecklist = skill.qualityChecklist
  const quickCard = skill.quickCard
  const criticalChecks = qualityChecklist?.checks.filter((check) => check.severity === 'critical') ?? []

  return (
    <div className="space-y-5">
      {quickCard ? <QuickCard card={quickCard} lang={lang} /> : null}

      {microDetailSystem ? (
        <SectionCard title={t('quickMode.topMicroDetails')} description={getLocalizedText(microDetailSystem.overview, lang)}>
          <div className="grid gap-3 xl:grid-cols-2">
            {microDetailSystem.topFiveDetails.map((detail) => (
              <MicroDetailCard key={detail.id} detail={detail} lang={lang} />
            ))}
          </div>
        </SectionCard>
      ) : null}

      {qualityChecklist && criticalChecks.length ? (
        <SectionCard title={t('quickMode.criticalChecks')}>
          <div className="grid gap-3 md:grid-cols-2">
            {criticalChecks.map((item) => (
              <article key={item.id} className="rounded-lg border border-rose-300/15 bg-rose-300/10 p-4">
                <div className="flex flex-wrap gap-2">
                  <Badge tone="rose">{item.severity}</Badge>
                  <Badge tone="slate">{item.bodyParts.join(' / ')}</Badge>
                </div>
                <p className="mt-3 text-sm font-semibold text-rose-50">{getLocalizedText(item.title, lang)}</p>
                <p className="mt-2 text-sm leading-6 text-rose-50/90">{getLocalizedText(item.quickFix, lang)}</p>
              </article>
            ))}
          </div>
        </SectionCard>
      ) : null}

      {microDetailSystem?.fastFinishPaths?.[0] ? (
        <SectionCard title={t('quickMode.fastPath')}>
          <FastFinishPathCard path={microDetailSystem.fastFinishPaths[0]} lang={lang} />
        </SectionCard>
      ) : null}

      {quickCard?.safetyReminder ? (
        <SectionCard title={t('quickMode.safetyReminder')}>
          <p className="text-sm leading-7 text-amber-100">{getLocalizedText(quickCard.safetyReminder, lang)}</p>
        </SectionCard>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <Link
          to={fullDetailPath}
          className="inline-flex items-center rounded-md border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100 hover:bg-cyan-300/15"
        >
          {t('quickMode.backToFull')}
        </Link>
      </div>
    </div>
  )
}
