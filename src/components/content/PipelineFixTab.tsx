import { useTranslation } from 'react-i18next'
import { FormattedText } from '../../components/common/FormattedText'
import { SectionAccordion } from '../skill/SectionAccordion'
import { ProblemFixCard } from '../skill/ProblemFixCard'
import { SKILL_SECTIONS } from '../../utils/skillAnchors'
import { splitProblemAndFix } from '../../utils/skillParagraphs'
import type { SkillDetail } from '../../content-runtime/skills'

type Props = {
  detail: SkillDetail
}

export const PipelineFixTab = ({ detail }: Props) => {
  const { t } = useTranslation()

  const fixItFast = detail.fixItFast ?? []
  const safetySummary = detail.safetySummary ?? []
  const hasAnyContent = fixItFast.length > 0 || safetySummary.length > 0

  if (!hasAnyContent) return null

  // Safety-critical skills lead with the safety rules: the reader sees the
  // non-negotiables before the troubleshooting list.
  const isSafetyCritical = (detail.tags ?? []).some((tag) => tag.includes('safety-critical'))

  const safetySection = safetySummary.length > 0 && (
    <SectionAccordion
      key="safety"
      id={SKILL_SECTIONS.safety}
      title={t('cardOS.safety')}
      badge={String(safetySummary.length)}
      preview={safetySummary[0]}
      accentColor="gold"
      defaultOpen
    >
      <ul className="grid gap-2 md:grid-cols-2">
        {safetySummary.map((note, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 rounded-xl border border-gold-300/15 bg-gold-300/[0.05] px-3 py-2.5"
          >
            <span aria-hidden="true" className="mt-0.5 shrink-0 text-[13px] text-gold">!</span>
            <FormattedText text={note} className="max-w-prose text-[13px] leading-6 text-gold" />
          </li>
        ))}
      </ul>
    </SectionAccordion>
  )

  const fixSection = fixItFast.length > 0 && (
    <SectionAccordion
      key="fix"
      id={SKILL_SECTIONS.fixItFast}
      title={t('cardOS.fixItFast')}
      badge={String(fixItFast.length)}
      preview={fixItFast[0]}
      accentColor="copper"
      defaultOpen
    >
      <div className="grid gap-2 md:grid-cols-2">
        {fixItFast.map((fix, i) => {
          const pair = splitProblemAndFix(fix)
          if (pair) return <ProblemFixCard key={i} problem={pair.problem} fix={pair.fix} />
          return (
            <div key={i} className="rounded-xl border border-warm-50/[0.06] bg-warm-950/45 px-3 py-2.5">
              <FormattedText text={fix} className="max-w-prose text-[13px] leading-6 text-warm-200" />
            </div>
          )
        })}
      </div>
    </SectionAccordion>
  )

  return (
    <div className="animate-slideUp space-y-3 pt-4">
      {isSafetyCritical ? (
        <>
          {safetySection}
          {fixSection}
        </>
      ) : (
        <>
          {fixSection}
          {safetySection}
        </>
      )}
    </div>
  )
}
