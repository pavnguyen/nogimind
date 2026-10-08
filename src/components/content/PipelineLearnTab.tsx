import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormattedText } from '../../components/common/FormattedText'
import { SectionAccordion } from '../skill/SectionAccordion'
import { SKILL_SECTIONS } from '../../utils/skillAnchors'
import type { SkillDetail } from '../../content-runtime/skills'

type Props = {
  detail: SkillDetail
}

export const PipelineLearnTab = ({ detail }: Props) => {
  const { t } = useTranslation()
  const [checkAnswers, setCheckAnswers] = useState<Record<string, boolean | undefined>>({})
  const systemLogic = detail.systemLogic
  const whyItWorks = detail.whyItWorks ?? []
  const keyCorrections = detail.keyCorrections ?? []
  const moneyDetails = detail.moneyDetails ?? []
  const coachingCues = detail.coachingCues ?? []
  const commonMistakes = detail.commonMistakes ?? []
  const microDetailSystem = detail.microDetailSystem
  const qualityChecklist = detail.qualityChecklist
  const passedChecks = qualityChecklist?.checks.filter((check) => checkAnswers[check.id] === true).length ?? 0
  const hasCriticalFailure = qualityChecklist?.checks.some((check) => check.severity === 'critical' && checkAnswers[check.id] === false) ?? false
  const isReady = Boolean(qualityChecklist && passedChecks >= qualityChecklist.passThreshold && !hasCriticalFailure)
  const nextStep = detail.nextStep || detail.shortInstruction
  const shortInstruction = detail.shortInstruction

  return (
    <div className="animate-slideUp space-y-4 pt-4">
      {/* Short instruction, hero cue */}
      {shortInstruction && (
        <div className="rounded-2xl border border-gold-300/18 bg-linear-to-br from-gold-300/[0.08] via-warm-950/45 to-warm-950/20 px-5 py-4 shadow-[0_18px_45px_rgba(185,140,60,0.08)] sm:px-6 sm:py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
            {t('cardOS.threeCues')}
          </p>
          <div className="mt-2 max-w-5xl">
            <FormattedText text={shortInstruction} className="text-[17px] font-semibold leading-8 tracking-tight text-warm-50 sm:text-[19px] sm:leading-9" />
          </div>
        </div>
      )}

      {/* System Logic, supports both object format (migrated) and array format (legacy) */}
      {systemLogic && (
        <SectionAccordion
          id={SKILL_SECTIONS.systemLogic}
          title={t('cardOS.systemLogic')}
          accentColor="gold"
          defaultOpen
        >
          {Array.isArray(systemLogic) ? (
            <ul className="space-y-2">
              {systemLogic.map((item, i) => (
                <li key={i} className="flex items-start gap-3 rounded-lg bg-warm-50/[0.025] px-3 py-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300/70" />
                  <p className="text-[13px] leading-6 text-warm-300">{item}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-3">
              {/* Core Principle */}
              {systemLogic.corePrinciple && (
                <div className="rounded-xl border border-gold-300/15 bg-gold-300/[0.045] px-4 py-3.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
                    {t('cardOS.corePrinciple', 'Core Principle')}
                  </p>
                  <p className="mt-2 text-[15px] font-semibold leading-7 text-warm-100">
                    {systemLogic.corePrinciple}
                  </p>
                </div>
              )}

              {/* Decision Tree */}
              {systemLogic.decisionTree && systemLogic.decisionTree.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold/70">
                    {t('cardOS.decisionTree', 'Decision Tree')}
                  </p>
                  <div className="space-y-2">
                    {systemLogic.decisionTree.map((branch, i) => (
                      <div
                        key={i}
                        className="grid gap-2 rounded-xl border border-warm-50/[0.06] bg-warm-950/45 px-3 py-3 sm:grid-cols-[auto_1fr_auto_1fr] sm:items-start"
                      >
                        <span className="mt-0.5 shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
                          IF
                        </span>
                        <p className="min-w-0 text-[13px] leading-6 text-warm-300">
                          {branch.condition}
                        </p>
                        <span className="mt-0.5 shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] text-jade">
                          THEN
                        </span>
                        <p className="min-w-0 text-[13px] leading-6 text-warm-200">
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
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold/70">
                    {t('cardOS.exitStrategies', 'Exit Strategies')}
                  </p>
                  <ul className="space-y-1.5">
                    {systemLogic.exitStrategies.map((strategy, i) => (
                      <li key={i} className="flex items-start gap-3 rounded-lg bg-warm-50/[0.025] px-3 py-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300/60" />
                        <p className="text-[13px] leading-6 text-warm-300">{strategy}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </SectionAccordion>
      )}

      {microDetailSystem && (
        <SectionAccordion
          id={SKILL_SECTIONS.microDetails}
          title={t('microDetailSystem.heading')}
          accentColor="steel"
          defaultOpen
          badge={String(microDetailSystem.topFiveDetails.length)}
        >
          <p className="mb-3 text-sm leading-6 text-warm-300">{microDetailSystem.overview}</p>
          <div className="grid gap-3 md:grid-cols-2">
            {microDetailSystem.topFiveDetails.map((detail) => (
              <article key={detail.id} className="rounded-xl border border-warm-50/[0.06] bg-warm-950/45 p-3.5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-warm-100">{detail.title}</h3>
                  <span className="shrink-0 rounded-md bg-steel-300/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-steel">{detail.category.replace(/_/g, ' ')}</span>
                </div>
                <p className="mt-2 text-[13px] leading-6 text-warm-200">{detail.shortInstruction}</p>
                <p className="mt-2 text-xs leading-5 text-warm-400"><strong className="text-warm-300">{t('microDetailSystem.why')}: </strong>{detail.whyItWorks}</p>
                <p className="mt-2 text-xs leading-5 text-copper"><strong>{t('microDetails.cardWrong')}: </strong>{detail.commonMistake}</p>
                <p className="mt-2 text-xs leading-5 text-jade"><strong>{t('microDetails.cardFixWith')}: </strong>{detail.correctionCue}</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-gold">{detail.liveCue}</p>
                {detail.safetyNote && <p className="mt-2 text-xs leading-5 text-gold">{detail.safetyNote}</p>}
              </article>
            ))}
          </div>
          {microDetailSystem.troubleshootingTips.length > 0 && (
            <div className="mt-4 space-y-2">
              {microDetailSystem.troubleshootingTips.map((tip, index) => (
                <p key={index} className="rounded-lg bg-warm-50/[0.025] px-3 py-2 text-xs leading-5 text-warm-300">
                  <strong>{tip.problem}</strong> {tip.quickFix} <span className="text-gold">{tip.cue}</span>
                </p>
              ))}
            </div>
          )}
          {microDetailSystem.doNotDo.length > 0 && (
            <p className="mt-3 text-xs leading-5 text-copper">{microDetailSystem.doNotDo.join(' · ')}</p>
          )}
          {microDetailSystem.safetyNotes.length > 0 && (
            <p className="mt-3 text-xs leading-5 text-gold">{microDetailSystem.safetyNotes.join(' · ')}</p>
          )}
        </SectionAccordion>
      )}

      {qualityChecklist && (
        <SectionAccordion
          id={SKILL_SECTIONS.readyCheck}
          title={t('qualityChecklist.heading')}
          accentColor="gold"
          defaultOpen
          badge={`${qualityChecklist.passThreshold}/${qualityChecklist.checks.length}`}
        >
          <p className="mb-3 text-sm leading-6 text-warm-300">{qualityChecklist.overview}</p>
          <div className="space-y-2">
            {qualityChecklist.checks.map((check) => (
              <article key={check.id} className="rounded-xl border border-warm-50/[0.06] bg-warm-950/45 p-3.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-warm-100">{check.title}</h3>
                  <span className={`rounded-md px-2 py-0.5 text-[10px] uppercase tracking-wide ${check.severity === 'critical' ? 'bg-copper-300/10 text-copper' : check.severity === 'major' ? 'bg-gold-300/10 text-gold' : 'bg-warm-300/10 text-warm-300'}`}>{check.severity}</span>
                </div>
                <p className="mt-2 text-[13px] leading-6 text-warm-300">{check.question}</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <p className="rounded-lg bg-jade-300/[0.05] px-3 py-2 text-xs leading-5 text-jade">✓ {check.successSignal}</p>
                  <p className="rounded-lg bg-copper-300/[0.05] px-3 py-2 text-xs leading-5 text-copper">! {check.failureSignal}</p>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label={check.title}>
                  <button type="button" aria-pressed={checkAnswers[check.id] === true} onClick={() => setCheckAnswers((current) => ({ ...current, [check.id]: true }))} className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${checkAnswers[check.id] === true ? 'border-jade-300/40 bg-jade-300/15 text-jade' : 'border-warm-50/10 text-warm-300 hover:bg-warm-50/5'}`}>{t('qualityChecklist.yes')}</button>
                  <button type="button" aria-pressed={checkAnswers[check.id] === false} onClick={() => setCheckAnswers((current) => ({ ...current, [check.id]: false }))} className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${checkAnswers[check.id] === false ? 'border-copper-300/40 bg-copper-300/15 text-copper' : 'border-warm-50/10 text-warm-300 hover:bg-warm-50/5'}`}>{t('qualityChecklist.no')}</button>
                  <p className="text-xs leading-5 text-gold">{t('qualityChecklist.quickFixes')}: {check.quickFix}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-gold-300/10 bg-gold-300/[0.04] px-3 py-2 text-xs leading-5 text-warm-300" aria-live="polite">
            <p className={`font-semibold ${isReady ? 'text-jade' : 'text-gold'}`}>
              {isReady ? t('qualityChecklist.ready') : t('qualityChecklist.needsWork')} · {passedChecks}/{qualityChecklist.checks.length}
            </p>
            <p className="mt-1">{qualityChecklist.ifPassed}</p>
            <p className="mt-1 text-copper">{qualityChecklist.ifFailed}</p>
          </div>
        </SectionAccordion>
      )}

      {/* Why It Works */}
      {whyItWorks.length > 0 && (
        <SectionAccordion
          id={SKILL_SECTIONS.whyItWorks}
          title={t('cardOS.whyItWorks', 'Why It Works')}
          accentColor="jade"
          defaultOpen
        >
          <ul className="grid gap-2 sm:grid-cols-2">
            {whyItWorks.map((reason, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-warm-50/[0.05] bg-warm-950/35 px-3 py-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-jade-300" />
                <p className="text-[13px] leading-6 text-warm-300">{reason}</p>
              </li>
            ))}
          </ul>
        </SectionAccordion>
      )}

      {/* Key Corrections */}
      {keyCorrections.length > 0 && (
        <SectionAccordion
          id={SKILL_SECTIONS.keyCorrections}
          title={t('cardOS.topDetails')}
          accentColor="steel"
          defaultOpen
        >
          <div className="grid gap-3 md:grid-cols-2">
            {keyCorrections.map((correction, i) => {
              // Parse "If X, do Y" structure for visual emphasis
              const match = correction.match(/^(If .+?[,.]) (.+)$/)
              return (
                <div
                  key={i}
                  className="rounded-xl border border-warm-50/[0.06] bg-warm-950/45 p-3.5"
                >
                  {match ? (
                    <>
                      <div className="mb-2 rounded-lg border border-copper-300/15 bg-copper-300/[0.05] px-3 py-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-copper">
                          {t('microDetails.cardWrong')}
                        </p>
                        <p className="mt-0.5 text-xs leading-5 text-copper">{match[1]}</p>
                      </div>
                      <div className="rounded-lg border border-jade-300/15 bg-jade-300/[0.05] px-3 py-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-jade">
                          {t('microDetails.cardFixWith')}
                        </p>
                        <p className="mt-0.5 text-xs leading-5 text-jade">{match[2]}</p>
                      </div>
                    </>
                  ) : (
                    <p className="text-[13px] leading-6 text-warm-200">{correction}</p>
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
          id={SKILL_SECTIONS.moneyDetails}
          title={t('cardOS.moneyDetails')}
          accentColor="jade"
          defaultOpen
        >
          <div className="grid gap-2">
            {moneyDetails.map((detail, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-jade-300/15 bg-jade-300/[0.05] px-3.5 py-3"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-jade-300" />
                <p className="text-[13px] font-semibold leading-6 text-jade">
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
          id={SKILL_SECTIONS.coachingCues}
          title={t('detail.coachingCues', 'Coaching Cues')}
          accentColor="gold"
        >
          <div className="flex flex-wrap gap-2">
            {coachingCues.map((cue, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full border border-gold-300/20 bg-gold-300/[0.06] px-3 py-1.5 text-[13px] font-semibold text-gold"
              >
                <span className="text-gold">↗</span>
                {cue}
              </span>
            ))}
          </div>
        </SectionAccordion>
      )}

      {/* Common Mistakes */}
      {commonMistakes.length > 0 && (
        <SectionAccordion
          id={SKILL_SECTIONS.commonMistakes}
          title={t('detail.commonMistakes')}
          accentColor="copper"
        >
          <ul className="grid gap-2 sm:grid-cols-2">
            {commonMistakes.map((mistake, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-copper-300/12 bg-copper-300/[0.035] px-3 py-2.5 text-[13px] leading-6 text-warm-300"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper-300" />
                {mistake}
              </li>
            ))}
          </ul>
        </SectionAccordion>
      )}

      {/* Next Step */}
      {nextStep && (
        <SectionAccordion
          id={SKILL_SECTIONS.nextStep}
          title={t('cardOS.nextStep')}
          accentColor="warm"
          defaultOpen
        >
          <div className="rounded-xl border border-gold-300/15 bg-gold-300/[0.045] px-4 py-3">
            <FormattedText text={nextStep} className="text-[13px] leading-6 text-warm-300" />
          </div>
        </SectionAccordion>
      )}
    </div>
  )
}
