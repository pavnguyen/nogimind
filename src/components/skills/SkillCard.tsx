import { memo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, GitFork, Network } from 'lucide-react'
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
    <article className="rounded-lg border border-white/10 bg-slate-950/65 p-4 transition hover:border-cyan-300/35 hover:bg-white/[0.06]">
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <DomainBadge domain={skill.domain} />
          <LevelBadge level={skill.level} />
        </div>
        <h3 className="mt-3 text-lg font-semibold text-white">{getLocalizedText(skill.title, language)}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">{getLocalizedText(skill.shortDescription, language)}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {skill.tags.slice(0, 4).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm text-slate-400">
        <div className="flex gap-4">
          <span className="inline-flex items-center gap-1.5">
            <GitFork className="h-4 w-4 text-emerald-300" aria-hidden="true" />
            {skill.prerequisites.length} {t('common.prerequisites')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Network className="h-4 w-4 text-cyan-300" aria-hidden="true" />
            {skill.relatedSkills.length} {t('common.related')}
          </span>
        </div>
        <Link to={`/skills/${skill.id}`} className="inline-flex items-center gap-1.5 font-medium text-cyan-200 hover:text-cyan-100">
          {t('common.open')}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
})

SkillCard.displayName = 'SkillCard'
