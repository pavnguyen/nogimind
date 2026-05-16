import { memo } from 'react'
import { Link } from 'react-router-dom'
import { GitFork, Network } from 'lucide-react'
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
      className="group block rounded-lg border border-white/10 bg-slate-950/65 p-4 transition hover:border-cyan-300/35 hover:bg-white/[0.06] hover:shadow-glow"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <DomainBadge domain={skill.domain} />
          <LevelBadge level={skill.level} />
          {skill.libraryTier ? <Badge>{t(`modern.library.${skill.libraryTier}`)}</Badge> : null}
          {skill.riskLevel === 'high' || skill.riskLevel === 'safety_critical' ? <Badge>{t(`modern.risk.${skill.riskLevel}`)}</Badge> : null}
        </div>
        <h3 className="mt-3 text-lg font-semibold text-white group-hover:text-cyan-100">{getLocalizedText(skill.title, language)}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400 line-clamp-2">{getLocalizedText(skill.shortDescription, language)}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {skill.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="text-[10px] text-slate-500 uppercase tracking-tighter">#{tag}</span>
        ))}
        {skill.modernSystemGroup ? <Badge tone="cyan">{t(`modern.system.${skill.modernSystemGroup}`)}</Badge> : null}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm text-slate-400">
        <div className="flex gap-4">
          <span className="inline-flex items-center gap-1.5 text-xs">
            <GitFork className="h-3.5 w-3.5 text-emerald-400/60" aria-hidden="true" />
            {skill.prerequisites.length}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs">
            <Network className="h-3.5 w-3.5 text-cyan-400/60" aria-hidden="true" />
            {skill.relatedSkills.length}
          </span>
        </div>
      </div>
    </Link>
  )
})

SkillCard.displayName = 'SkillCard'
