import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Badge } from '../common/Badge'
import { SectionCard } from '../common/SectionCard'
import type { LanguageCode } from '../../types/skill'
import { getNextBestLinksForSkill } from '../../utils/knowledgeGraph'
import { getLocalizedText } from '../../utils/localization'

type Props = {
  skillId: string
  lang: LanguageCode
  className?: string
}

export const NextBestStepPanel = ({ skillId, lang, className }: Props) => {
  const { t } = useTranslation()
  const links = getNextBestLinksForSkill(skillId).slice(0, 6)

  if (!links.length) return null

  return (
    <SectionCard
      title={t('knowledgeGraph.nextBestHeading')}
      description={t('knowledgeGraph.nextBestBody')}
      className={className}
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {links.map((link, index) => (
          <Link
            key={`${link.type}:${link.id}`}
            to={link.url}
            className="rounded-lg border border-white/10 bg-slate-950/55 p-4 transition hover:border-cyan-300/35 hover:bg-white/[0.06]"
          >
            <div className="flex items-center justify-between gap-3">
              <Badge tone={index === 0 ? 'emerald' : 'cyan'}>{t(`knowledgeTypes.${link.type}`)}</Badge>
              {index === 0 ? <Sparkles className="h-4 w-4 text-emerald-200" aria-hidden="true" /> : null}
            </div>
            <h2 className="mt-3 text-sm font-semibold text-white">{getLocalizedText(link.title, lang)}</h2>
            {link.reason ? <p className="mt-2 text-sm leading-6 text-slate-400">{getLocalizedText(link.reason, lang)}</p> : null}
            <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-200">
              {t('common.open')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </div>
          </Link>
        ))}
      </div>
    </SectionCard>
  )
}
