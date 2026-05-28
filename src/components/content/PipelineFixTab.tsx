import { useTranslation } from 'react-i18next'
import { FormattedText } from '../../components/common/FormattedText'
import { SectionAccordion } from '../skill/SectionAccordion'
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
          id="pipeline-fix-it-fast"
          title={t('cardOS.fixItFast')}
          accentColor="rose"
          defaultOpen
        >
          <div className="grid gap-3 md:grid-cols-2">
            {fixItFast.map((fix, i) => {
              // Parse "Can't X? Do Y" structure
              const match = fix.match(/^(Can't .+?\?) (.+)$/)
              return (
                <div
                  key={i}
                  className="rounded-xl border border-white/[0.06] bg-slate-950/45 p-3.5"
                >
                  {match ? (
                    <>
                      <div className="mb-2 rounded-lg border border-rose-300/15 bg-rose-300/[0.05] px-3 py-2">
                        <FormattedText text={match[1]} className="text-[13px] font-semibold leading-5 text-rose-100" />
                      </div>
                      <div className="rounded-lg border border-emerald-300/15 bg-emerald-300/[0.05] px-3 py-2">
                        <FormattedText text={match[2]} className="text-[13px] font-semibold leading-5 text-emerald-100" />
                      </div>
                    </>
                  ) : (
                    <FormattedText text={fix} className="text-[13px] leading-6 text-slate-200" />
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
          id="pipeline-safety"
          title={t('cardOS.safety')}
          accentColor="amber"
          defaultOpen
        >
          <ul className="grid gap-2 md:grid-cols-2">
            {safetySummary.map((note, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-amber-300/15 bg-amber-300/[0.05] px-3 py-2.5 text-[13px] leading-6 text-amber-100"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                <FormattedText text={note} className="text-[13px] leading-6 text-amber-100" />
              </li>
            ))}
          </ul>
        </SectionAccordion>
      )}
    </div>
  )
}
