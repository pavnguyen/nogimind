import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { IfThenDecision, IfThenPriority, LanguageCode, SkillNode } from '../../types/skill'
import { getLocalizedText } from '../../utils/localization'
import { Badge } from '../common/Badge'

const priorityOrder: IfThenPriority[] = ['survive', 'prevent', 'recover', 'control', 'advance', 'submit', 'reset', 'disengage']

const priorityTone: Record<IfThenPriority, 'slate' | 'cyan' | 'emerald' | 'amber' | 'rose'> = {
  survive: 'rose',
  prevent: 'amber',
  recover: 'cyan',
  control: 'emerald',
  advance: 'cyan',
  submit: 'rose',
  reset: 'slate',
  disengage: 'slate',
}

export const IfThenDecisionList = ({
  decisions,
  skillsById,
  lang,
}: {
  decisions: IfThenDecision[]
  skillsById: Map<string, SkillNode>
  lang: LanguageCode
}) => {
  const { t } = useTranslation()
  if (!decisions.length) return null

  const groups = priorityOrder
    .map((priority) => ({ priority, items: decisions.filter((decision) => decision.priority === priority) }))
    .filter((group) => group.items.length)

  return (
    <div className="space-y-5">
      {groups.map((group) => (
        <section key={group.priority} className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge tone={priorityTone[group.priority]}>{t(`ifThen.priorities.${group.priority}`)}</Badge>
            <span className="text-xs text-slate-500">{group.items.length}</span>
          </div>
          <div className="grid gap-3 xl:grid-cols-2">
            {group.items.map((decision) => {
              const nextSkills = decision.nextSkillIds.map((id) => skillsById.get(id)).filter(Boolean)
              return (
                <article key={decision.id} className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <DecisionField label={t('ifThen.if')} text={getLocalizedText(decision.ifCondition, lang)} tone="text-amber-100" />
                    <DecisionField label={t('ifThen.bodySignal')} text={getLocalizedText(decision.bodySignal, lang)} tone="text-cyan-100" />
                    <DecisionField label={t('ifThen.then')} text={getLocalizedText(decision.thenAction, lang)} tone="text-slate-200" />
                    <DecisionField label={t('ifThen.why')} text={getLocalizedText(decision.why, lang)} tone="text-slate-400" />
                  </div>
                  <div className="mt-3 rounded-md border border-emerald-300/20 bg-emerald-300/10 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200">{t('ifThen.correctionCue')}</p>
                    <p className="mt-1 text-sm leading-6 text-emerald-50">{getLocalizedText(decision.correctionCue, lang)}</p>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    <span className="font-semibold text-rose-200">{t('ifThen.commonMistake')}: </span>
                    {getLocalizedText(decision.commonMistake, lang)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {nextSkills.map((skill) => (
                      <Link key={skill?.id} to={`/skills/${skill?.id}`} className="rounded-md border border-white/10 px-2 py-1 text-xs text-cyan-100 hover:bg-white/10">
                        {getLocalizedText(skill?.title, lang)}
                      </Link>
                    ))}
                    {!nextSkills.length ? <span className="text-xs text-slate-500">{t('common.none')}</span> : null}
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}

const DecisionField = ({ label, text, tone }: { label: string; text: string; tone: string }) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
    <p className={`mt-1 text-sm leading-6 ${tone}`}>{text}</p>
  </div>
)
