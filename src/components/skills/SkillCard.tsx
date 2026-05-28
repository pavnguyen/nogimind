import { memo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, GitFork, Network } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { SkillNode } from '../../types/skill'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { getLocalizedText } from '../../utils/localization'
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
      className="group block rounded-xl border border-white/[0.07] bg-slate-950/55 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300/25 hover:bg-slate-900/70 hover:shadow-[0_18px_45px_rgba(8,145,178,0.08)] sm:p-5"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <DomainBadge domain={skill.domain} />
          <LevelBadge level={skill.level} />
          {skill.libraryTier ? <Badge>{t(`modern.library.${skill.libraryTier}`)}</Badge> : null}
          {skill.riskLevel === 'high' || skill.riskLevel === 'safety_critical' ? <Badge>{t(`modern.risk.${skill.riskLevel}`)}</Badge> : null}
        </div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <h3 className="text-[17px] font-semibold leading-6 tracking-tight text-white transition-colors group-hover:text-cyan-100">
            {getLocalizedText(skill.title, language)}
          </h3>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-600 transition-colors group-hover:text-cyan-300" aria-hidden="true" />
        </div>
        <p className="mt-2 text-[13px] leading-6 text-slate-400 line-clamp-2">
          {getLocalizedText(skill.shortDescription, language)}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-2 gap-y-1.5">
        {skill.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-md bg-white/[0.03] px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
            #{tag}
          </span>
        ))}
        {skill.modernSystemGroup ? <Badge tone="cyan">{t(`modern.system.${skill.modernSystemGroup}`)}</Badge> : null}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-3 text-slate-500">
        <div className="flex gap-3">
          <span className="inline-flex items-center gap-1.5 text-[11px]">
            <GitFork className="h-3.5 w-3.5 text-emerald-400/60" aria-hidden="true" />
            {skill.prerequisites.length}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px]">
            <Network className="h-3.5 w-3.5 text-cyan-400/60" aria-hidden="true" />
            {skill.relatedSkills.length}
          </span>
        </div>
      </div>
    </Link>
  )
})

SkillCard.displayName = 'SkillCard'
