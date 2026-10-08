import { memo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, GitFork, Network } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { SkillNode } from '../../types/skill'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { getLocalizedText } from '../../utils/localization'
import { formatTagLabel } from '../../utils/tagLabel'
import { Badge } from '../common/Badge'
import { DomainBadge } from './DomainBadge'
import { LevelBadge } from './LevelBadge'

type SkillCardProps = {
  skill: SkillNode
}

export const SkillCard = memo(({ skill }: SkillCardProps) => {
  const { t } = useTranslation()
  const language = useSettingsStore((state) => state.language)

  return (
    <Link 
      to={`/skills/${skill.id}`} 
      className="group block rounded-xl border border-warm-50/[0.07] bg-warm-950/55 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-300/25 hover:bg-warm-900/70 hover:shadow-[0_18px_45px_rgba(185,140,60,0.08)] sm:p-5"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <DomainBadge domain={skill.domain} />
          <LevelBadge level={skill.level} />
          {skill.libraryTier ? <Badge>{t(`modern.library.${skill.libraryTier}`)}</Badge> : null}
          {skill.riskLevel === 'high' || skill.riskLevel === 'safety_critical' ? <Badge>{t(`modern.risk.${skill.riskLevel}`)}</Badge> : null}
        </div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <h3 className="text-[17px] font-semibold leading-6 tracking-tight text-warm-50 transition-colors group-hover:text-gold">
            {getLocalizedText(skill.title, language)}
          </h3>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-warm-600 transition-colors group-hover:text-gold" aria-hidden="true" />
        </div>
        <p className="mt-2 text-[13px] leading-6 text-warm-400 line-clamp-2">
          {getLocalizedText(skill.shortDescription, language)}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1.5">
        {skill.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-md bg-warm-50/[0.03] px-1.5 py-0.5 text-[10px] font-medium text-warm-500">
            #{formatTagLabel(tag)}
          </span>
        ))}
        {skill.modernSystemGroup ? <Badge tone="gold">{t(`modern.system.${skill.modernSystemGroup}`)}</Badge> : null}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-warm-50/[0.06] pt-3 text-warm-500">
        <div className="flex gap-3">
          <span className="inline-flex items-center gap-1.5 text-[11px]">
            <GitFork className="h-3.5 w-3.5 text-jade/60" aria-hidden="true" />
            {skill.prerequisites.length}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px]">
            <Network className="h-3.5 w-3.5 text-gold/60" aria-hidden="true" />
            {skill.relatedSkills.length}
          </span>
        </div>
      </div>
    </Link>
  )
})

SkillCard.displayName = 'SkillCard'
