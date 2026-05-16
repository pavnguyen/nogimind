import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SectionAccordion } from './SectionAccordion'
import type { NextStepView } from '../../data/skills/skillViewModel'

type Props = { view: NextStepView }

const ChipLink = ({ id, prefix = '/skills/' }: { id: string; prefix?: string }) => (
  <Link
    to={`${prefix}${id}`}
    className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300 transition-colors hover:border-cyan-400/30 hover:bg-cyan-400/8 hover:text-cyan-200"
  >
    {id.replace(/-/g, ' ')}
    <svg className="h-3 w-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  </Link>
)

export const NextStepSection = ({ view }: Props) => {
  const { t } = useTranslation()

  const hasContent =
    view.relatedSkillIds.length > 0 ||
    view.prerequisiteIds.length > 0

  if (!hasContent) return null

  return (
    <SectionAccordion
      id="next-step"
      title={t('cardOS.nextStep')}
      accentColor="slate"
      defaultOpen
    >
      <div className="space-y-4">
        {view.relatedSkillIds.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
              {t('common.relatedSkills')}
            </p>
            <div className="flex flex-wrap gap-2">
              {view.relatedSkillIds.map((id) => <ChipLink key={id} id={id} />)}
            </div>
          </div>
        )}

        {view.prerequisiteIds.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
              {t('common.prerequisites')}
            </p>
            <div className="flex flex-wrap gap-2">
              {view.prerequisiteIds.map((id) => (
                <ChipLink key={id} id={id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionAccordion>
  )
}
