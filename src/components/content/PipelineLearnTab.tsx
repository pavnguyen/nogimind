import { useTranslation } from 'react-i18next'
import { FormattedText } from '../../components/common/FormattedText'
import { SectionAccordion } from '../skill/SectionAccordion'
import type { SkillDetail } from '../../content-runtime/skills'

type Props = {
  detail: SkillDetail
}

export const PipelineLearnTab = ({ detail }: Props) => {
  const { t } = useTranslation()

  const systemLogic = detail.systemLogic
  const whyItWorks = detail.whyItWorks ?? []
  const keyCorrections = detail.keyCorrections ?? []
  const moneyDetails = detail.moneyDetails ?? []
  const coachingCues = detail.coachingCues ?? []
  const commonMistakes = detail.commonMistakes ?? []
  const nextStep = detail.nextStep || detail.shortInstruction
  const shortInstruction = detail.shortInstruction

  return (
    <div className="animate-slideUp space-y-4 pt-4">
      {/* Short instruction — hero cue */}
      {shortInstruction && (
        <div className="rounded-2xl border border-cyan-300/18 bg-gradient-to-br from-cyan-300/[0.08] via-slate-950/45 to-slate-950/20 px-5 py-4 shadow-[0_18px_45px_rgba(8,145,178,0.08)] sm:px-6 sm:py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
            {t('cardOS.threeCues')}
          </p>
          <div className="mt-2 max-w-5xl">
            <FormattedText text={shortInstruction} className="text-[17px] font-semibold leading-8 tracking-tight text-slate-50 sm:text-[19px] sm:leading-9" />
          </div>
        </div>
      )}

      {/* System Logic — supports both object format (migrated) and array format (legacy) */}
      {systemLogic && (
        <SectionAccordion
          id="pipeline-system-logic"
          title={t('cardOS.systemLogic')}
          accentColor="cyan"
          defaultOpen
        >
          {Array.isArray(systemLogic) ? (
            <ul className="space-y-2">
              {systemLogic.map((item, i) => (
                <li key={i} className="flex items-start gap-3 rounded-lg bg-white/[0.025] px-3 py-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/70" />
                  <p className="text-[13px] leading-6 text-slate-300">{item}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-3">
              {/* Core Principle */}
              {systemLogic.corePrinciple && (
                <div className="rounded-xl border border-cyan-300/15 bg-cyan-300/[0.045] px-4 py-3.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                    {t('cardOS.corePrinciple', 'Core Principle')}
                  </p>
                  <p className="mt-2 text-[15px] font-semibold leading-7 text-slate-100">
                    {systemLogic.corePrinciple}
                  </p>
                </div>
              )}

              {/* Decision Tree */}
              {systemLogic.decisionTree && systemLogic.decisionTree.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300/70">
                    {t('cardOS.decisionTree', 'Decision Tree')}
                  </p>
                  <div className="space-y-2">
                    {systemLogic.decisionTree.map((branch, i) => (
                      <div
                        key={i}
                        className="grid gap-2 rounded-xl border border-white/[0.06] bg-slate-950/45 px-3 py-3 sm:grid-cols-[auto_1fr_auto_1fr] sm:items-start"
                      >
                        <span className="mt-0.5 shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-300">
                          IF
                        </span>
                        <p className="min-w-0 text-[13px] leading-6 text-slate-300">
                          {branch.condition}
                        </p>
                        <span className="mt-0.5 shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-300">
                          THEN
                        </span>
                        <p className="min-w-0 text-[13px] leading-6 text-slate-200">
                          {branch.action}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exit Strategies */}
              {systemLogic.exitStrategies && systemLogic.exitStrategies.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300/70">
                    {t('cardOS.exitStrategies', 'Exit Strategies')}
                  </p>
                  <ul className="space-y-1.5">
                    {systemLogic.exitStrategies.map((strategy, i) => (
                      <li key={i} className="flex items-start gap-3 rounded-lg bg-white/[0.025] px-3 py-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/60" />
                        <p className="text-[13px] leading-6 text-slate-300">{strategy}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </SectionAccordion>
      )}

      {/* Why It Works */}
      {whyItWorks.length > 0 && (
        <SectionAccordion
          id="pipeline-why-it-works"
          title={t('cardOS.whyItWorks', 'Why It Works')}
          accentColor="emerald"
          defaultOpen
        >
          <ul className="grid gap-2 sm:grid-cols-2">
            {whyItWorks.map((reason, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-slate-950/35 px-3 py-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                <p className="text-[13px] leading-6 text-slate-300">{reason}</p>
              </li>
            ))}
          </ul>
        </SectionAccordion>
      )}

      {/* Key Corrections */}
      {keyCorrections.length > 0 && (
        <SectionAccordion
          id="pipeline-key-corrections"
          title={t('cardOS.topDetails')}
          accentColor="violet"
          defaultOpen
        >
          <div className="grid gap-3 md:grid-cols-2">
            {keyCorrections.map((correction, i) => {
              // Parse "If X, do Y" structure for visual emphasis
              const match = correction.match(/^(If .+?[,.]) (.+)$/)
              return (
                <div
                  key={i}
                  className="rounded-xl border border-white/[0.06] bg-slate-950/45 p-3.5"
                >
                  {match ? (
                    <>
                      <div className="mb-2 rounded-lg border border-rose-300/15 bg-rose-300/[0.05] px-3 py-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-rose-300">
                          {t('microDetails.cardWrong')}
                        </p>
                        <p className="mt-0.5 text-xs leading-5 text-rose-200">{match[1]}</p>
                      </div>
                      <div className="rounded-lg border border-emerald-300/15 bg-emerald-300/[0.05] px-3 py-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
                          {t('microDetails.cardFixWith')}
                        </p>
                        <p className="mt-0.5 text-xs leading-5 text-emerald-200">{match[2]}</p>
                      </div>
                    </>
                  ) : (
                    <p className="text-[13px] leading-6 text-slate-200">{correction}</p>
                  )}
                </div>
              )
            })}
          </div>
        </SectionAccordion>
      )}

      {/* Money Details */}
      {moneyDetails.length > 0 && (
        <SectionAccordion
          id="pipeline-money-details"
          title={t('cardOS.moneyDetails')}
          accentColor="emerald"
          defaultOpen
        >
          <div className="grid gap-2">
            {moneyDetails.map((detail, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-emerald-300/15 bg-emerald-300/[0.05] px-3.5 py-3"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                <p className="text-[13px] font-semibold leading-6 text-emerald-50">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </SectionAccordion>
      )}

      {/* Coaching Cues */}
      {coachingCues.length > 0 && (
        <SectionAccordion
          id="pipeline-coaching-cues"
          title={t('detail.coachingCues', 'Coaching Cues')}
          accentColor="cyan"
        >
          <div className="flex flex-wrap gap-2">
            {coachingCues.map((cue, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-1.5 text-[13px] font-semibold text-cyan-100"
              >
                <span className="text-cyan-300">↗</span>
                {cue}
              </span>
            ))}
          </div>
        </SectionAccordion>
      )}

      {/* Common Mistakes */}
      {commonMistakes.length > 0 && (
        <SectionAccordion
          id="pipeline-common-mistakes"
          title={t('detail.commonMistakes')}
          accentColor="rose"
        >
          <ul className="grid gap-2 sm:grid-cols-2">
            {commonMistakes.map((mistake, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-rose-300/12 bg-rose-300/[0.035] px-3 py-2.5 text-[13px] leading-6 text-slate-300"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-300" />
                {mistake}
              </li>
            ))}
          </ul>
        </SectionAccordion>
      )}

      {/* Next Step */}
      {nextStep && (
        <SectionAccordion
          id="pipeline-next-step"
          title={t('cardOS.nextStep')}
          accentColor="slate"
          defaultOpen
        >
          <div className="rounded-xl border border-cyan-300/15 bg-cyan-300/[0.045] px-4 py-3">
            <FormattedText text={nextStep} className="text-[13px] leading-6 text-slate-300" />
          </div>
        </SectionAccordion>
      )}
    </div>
  )
}
