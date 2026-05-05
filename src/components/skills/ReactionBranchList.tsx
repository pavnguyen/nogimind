import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { LanguageCode, ReactionBranch, SkillNode } from '../../types/skill'
import { getLocalizedText } from '../../utils/localization'

export const ReactionBranchList = ({
  branches,
  skillsById,
  lang,
}: {
  branches: ReactionBranch[]
  skillsById: Map<string, SkillNode>
  lang: LanguageCode
}) => {
  const { t } = useTranslation()
  if (!branches.length) return null
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {branches.map((branch, index) => (
        <article key={`${getLocalizedText(branch.opponentReaction, 'en')}-${index}`} className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
          <p className="font-semibold text-white">{getLocalizedText(branch.opponentReaction, lang)}</p>
          <p className="mt-2 text-sm leading-6 text-amber-100">{getLocalizedText(branch.bodySignal, lang)}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{getLocalizedText(branch.recommendedResponse, lang)}</p>
          <p className="mt-2 text-sm leading-6 text-cyan-100">{getLocalizedText(branch.bodyMechanicAdjustment, lang)}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {branch.nextSkillIds.map((id) => skillsById.get(id)).filter(Boolean).map((skill) => (
              <Link key={skill?.id} to={`/skills/${skill?.id}`} className="rounded-md border border-white/10 px-2 py-1 text-xs text-cyan-100 hover:bg-white/10">
                {getLocalizedText(skill?.title, lang)}
              </Link>
            ))}
            {!branch.nextSkillIds.some((id) => skillsById.has(id)) ? <span className="text-xs text-slate-500">{t('common.none')}</span> : null}
          </div>
        </article>
      ))}
    </div>
  )
}
