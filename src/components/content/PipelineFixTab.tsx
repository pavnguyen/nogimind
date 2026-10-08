import { useTranslation } from 'react-i18next'
import { FormattedText } from '../../components/common/FormattedText'
import { SectionAccordion } from '../skill/SectionAccordion'
import { SKILL_SECTIONS } from '../../utils/skillAnchors'
import type { SkillDetail } from '../../content-runtime/skills'

type Props = {
  detail: SkillDetail
}

export const PipelineFixTab = ({ detail }: Props) => {
  const { t } = useTranslation()

  const fixItFast = detail.fixItFast ?? []
  const safetySummary = detail.safetySummary ?? []

  const hasAnyContent =
    fixItFast.length > 0 ||
    safetySummary.length > 0

  if (!hasAnyContent) return null

  return (
    <div className="animate-slideUp space-y-4 pt-4">
      {/* Fix It Fast */}
      {fixItFast.length > 0 && (
        <SectionAccordion
          id={SKILL_SECTIONS.fixItFast}
          title={t('cardOS.fixItFast')}
          accentColor="copper"
          defaultOpen
        >
          <div className="grid gap-3 md:grid-cols-2">
            {fixItFast.map((fix, i) => {
              // Parse "Can't X? Do Y" structure
              const match = fix.match(/^(Can't .+?\?) (.+)$/)
              return (
                <div
                  key={i}
                  className="rounded-xl border border-warm-50/[0.06] bg-warm-950/45 p-3.5"
                >
                  {match ? (
                    <>
                      <div className="mb-2 rounded-lg border border-copper-300/15 bg-copper-300/[0.05] px-3 py-2">
                        <FormattedText text={match[1]} className="text-[13px] font-semibold leading-5 text-copper" />
                      </div>
                      <div className="rounded-lg border border-jade-300/15 bg-jade-300/[0.05] px-3 py-2">
                        <FormattedText text={match[2]} className="text-[13px] font-semibold leading-5 text-jade" />
                      </div>
                    </>
                  ) : (
                    <FormattedText text={fix} className="text-[13px] leading-6 text-warm-200" />
                  )}
                </div>
              )
            })}
          </div>
        </SectionAccordion>
      )}

      {/* Safety */}
      {safetySummary.length > 0 && (
        <SectionAccordion
          id={SKILL_SECTIONS.safety}
          title={t('cardOS.safety')}
          accentColor="gold"
          defaultOpen
        >
          <ul className="grid gap-2 md:grid-cols-2">
            {safetySummary.map((note, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-gold-300/15 bg-gold-300/[0.05] px-3 py-2.5 text-[13px] leading-6 text-gold"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300" />
                <FormattedText text={note} className="text-[13px] leading-6 text-gold" />
              </li>
            ))}
          </ul>
        </SectionAccordion>
      )}
    </div>
  )
}
