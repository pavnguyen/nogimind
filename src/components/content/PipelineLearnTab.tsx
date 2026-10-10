import { useMemo, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { FormattedText } from '../../components/common/FormattedText'
import { SectionAccordion } from '../skill/SectionAccordion'
import { ProblemFixCard } from '../skill/ProblemFixCard'
import { SkillSectionNav, type SkillNavItem } from '../skill/SkillSectionNav'
import type { SectionAccent } from '../skill/sectionAccents'
import { SKILL_SECTIONS } from '../../utils/skillAnchors'
import { firstItemPreview, previewOf, splitCues, splitProblemAndFix } from '../../utils/skillParagraphs'
import { cn } from '../../utils/cn'
import type { SkillDetail } from '../../content-runtime/skills'

type Props = {
  detail: SkillDetail
}

type LearnSection = {
  id: string
  title: string
  accent: SectionAccent
  badge?: string
  preview?: string
  defaultOpen?: boolean
  content: ReactNode
}

const Bullet = ({ tone, children }: { tone: SectionAccent; children: ReactNode }) => (
  <li className="flex items-start gap-2.5 rounded-xl border border-warm-50/[0.05] bg-warm-950/35 px-3 py-2.5">
    <span
      className={cn(
        'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full',
        tone === 'copper' ? 'bg-copper-300' : tone === 'jade' ? 'bg-jade-300' : 'bg-gold-300',
      )}
    />
    <p className="max-w-prose text-[13px] leading-6 text-warm-300">{children}</p>
  </li>
)

export const PipelineLearnTab = ({ detail }: Props) => {
  const { t } = useTranslation()
  const [checkAnswers, setCheckAnswers] = useState<Record<string, boolean | undefined>>({})

  const shortInstruction = detail.shortInstruction
  const cueList = useMemo(() => (shortInstruction ? splitCues(shortInstruction) : []), [shortInstruction])

  // Sections are declared as data so the section rail, the badge counts and the
  // expand/collapse control all derive from one list instead of repeating ids.
  // Everything they render is derived inside the callback, so the memo depends
  // only on the skill payload, the locale and the checklist answers.
  const sections = useMemo<LearnSection[]>(() => {
    const systemLogic = detail.systemLogic
    const whyItWorks = detail.whyItWorks ?? []
    const keyCorrections = detail.keyCorrections ?? []
    const moneyDetails = detail.moneyDetails ?? []
    const coachingCues = detail.coachingCues ?? []
    const commonMistakes = detail.commonMistakes ?? []
    const microDetailSystem = detail.microDetailSystem
    const qualityChecklist = detail.qualityChecklist
    const nextStep = detail.nextStep || detail.shortInstruction

    const decisionTree = !systemLogic || Array.isArray(systemLogic) ? [] : (systemLogic.decisionTree ?? [])
    const exitStrategies = !systemLogic || Array.isArray(systemLogic) ? [] : (systemLogic.exitStrategies ?? [])
    const corePrinciple = !systemLogic || Array.isArray(systemLogic) ? undefined : systemLogic.corePrinciple

    const passedChecks = qualityChecklist?.checks.filter((check) => checkAnswers[check.id] === true).length ?? 0
    const hasCriticalFailure = qualityChecklist?.checks.some((check) => check.severity === 'critical' && checkAnswers[check.id] === false) ?? false
    const isReady = Boolean(qualityChecklist && passedChecks >= qualityChecklist.passThreshold && !hasCriticalFailure)
    const checkProgress = qualityChecklist?.checks.length
      ? Math.round((passedChecks / qualityChecklist.checks.length) * 100)
      : 0

    const list: LearnSection[] = []

    if (systemLogic) {
      list.push({
        id: SKILL_SECTIONS.systemLogic,
        title: t('cardOS.systemLogic'),
        accent: 'gold',
        badge: decisionTree.length > 0 ? String(decisionTree.length) : undefined,
        preview: corePrinciple ? previewOf(corePrinciple, 96) : firstItemPreview(decisionTree.map((branch) => branch.condition)),
        defaultOpen: true,
        content: Array.isArray(systemLogic) ? (
          <ul className="space-y-2">
            {systemLogic.map((item, i) => (
              <Bullet key={i} tone="gold">{item}</Bullet>
            ))}
          </ul>
        ) : (
          <div className="space-y-3">
            {corePrinciple && (
              <div className="rounded-xl border border-gold-300/15 bg-gold-300/[0.045] px-3.5 py-3">
                <p className="label-eyebrow text-gold">
                  {t('cardOS.corePrinciple', 'Core Principle')}
                </p>
                <p className="mt-1.5 max-w-prose text-[15px] font-semibold leading-7 text-warm-100">{corePrinciple}</p>
              </div>
            )}

            {decisionTree.length > 0 && (
              <div>
                <p className="label-eyebrow mb-2 text-gold/70">
                  {t('cardOS.decisionTree', 'Decision Tree')}
                </p>
                <div className="grid gap-2 md:grid-cols-2">
                  {decisionTree.map((branch, i) => (
                    <article key={i} className="rounded-xl border border-warm-50/[0.06] bg-warm-950/45 px-3 py-2.5">
                      <p className="flex gap-2 text-[13px] leading-6 text-warm-300">
                        <span className="label-eyebrow mt-0.5 shrink-0 rounded bg-warm-50/[0.06] px-1.5 py-0.5 text-warm-400">
                          IF
                        </span>
                        <span className="min-w-0">{branch.condition}</span>
                      </p>
                      <p className="mt-2 flex gap-2 text-[13px] leading-6 text-warm-200">
                        <span className="label-eyebrow mt-0.5 shrink-0 rounded bg-jade-300/[0.12] px-1.5 py-0.5 text-jade">
                          THEN
                        </span>
                        <span className="min-w-0">{branch.action}</span>
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {exitStrategies.length > 0 && (
              <div>
                <p className="label-eyebrow mb-2 text-gold/70">
                  {t('cardOS.exitStrategies', 'Exit Strategies')}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {exitStrategies.map((strategy, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-gold-300/15 bg-gold-300/[0.05] px-2.5 py-1 text-[12px] leading-5 text-warm-200"
                    >
                      {strategy}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ),
      })
    }

    if (microDetailSystem) {
      list.push({
        id: SKILL_SECTIONS.microDetails,
        title: t('microDetailSystem.heading'),
        accent: 'steel',
        badge: String(microDetailSystem.topFiveDetails.length),
        preview: previewOf(microDetailSystem.overview, 96),
        content: (
          <>
            {/* Overview and the do-not-do / safety notes share one row on
                desktop, so a wide card is not half empty. */}
            <div className="mb-3 grid gap-3 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
              <p className="max-w-prose text-[13px] leading-6 text-warm-300">{microDetailSystem.overview}</p>
              {(microDetailSystem.doNotDo.length > 0 || microDetailSystem.safetyNotes.length > 0) && (
                <div className="space-y-1.5">
                  {microDetailSystem.doNotDo.length > 0 && (
                    <p className="rounded-lg bg-copper-300/[0.05] px-3 py-2 text-xs leading-5 text-copper">
                      <strong className="font-semibold">{t('microDetailSystem.doNotDo')}: </strong>
                      {microDetailSystem.doNotDo.join(' · ')}
                    </p>
                  )}
                  {microDetailSystem.safetyNotes.length > 0 && (
                    <p className="rounded-lg bg-gold-300/[0.05] px-3 py-2 text-xs leading-5 text-gold">
                      <strong className="font-semibold">{t('microDetailSystem.safety')}: </strong>
                      {microDetailSystem.safetyNotes.join(' · ')}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="grid gap-2.5 md:grid-cols-2">
              {microDetailSystem.topFiveDetails.map((item) => (
                <article key={item.id} className="rounded-xl border border-warm-50/[0.06] bg-warm-950/45 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[13px] font-semibold text-warm-100">{item.title}</h3>
                    <span className="label-eyebrow shrink-0 rounded-md bg-steel-300/10 px-1.5 py-0.5 text-steel">
                      {item.category.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="mt-1.5 max-w-prose text-[13px] leading-6 text-warm-200">{item.shortInstruction}</p>
                  <p className="mt-1.5 max-w-prose text-xs leading-5 text-warm-400">
                    <strong className="text-warm-300">{t('microDetailSystem.why')}: </strong>
                    {item.whyItWorks}
                  </p>
                  <p className="mt-1.5 max-w-prose text-xs leading-5 text-copper">
                    <strong>{t('microDetails.cardWrong')}: </strong>
                    {item.commonMistake}
                  </p>
                  <p className="mt-1.5 max-w-prose text-xs leading-5 text-jade">
                    <strong>{t('microDetails.cardFixWith')}: </strong>
                    {item.correctionCue}
                  </p>
                  <p className="mt-1.5 max-w-prose text-xs font-semibold leading-5 text-gold">{item.liveCue}</p>
                  {item.safetyNote && <p className="mt-1.5 max-w-prose text-xs leading-5 text-gold">{item.safetyNote}</p>}
                </article>
              ))}
            </div>
            {microDetailSystem.troubleshootingTips.length > 0 && (
              <div className="mt-3 space-y-1.5">
                {microDetailSystem.troubleshootingTips.map((tip, index) => (
                  <div key={index} className="rounded-lg bg-warm-50/[0.025] px-3 py-2">
                    <p className="max-w-prose text-xs leading-5 text-warm-300">
                      <strong>{tip.problem}</strong> {tip.quickFix} <span className="text-gold">{tip.cue}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        ),
      })
    }

    if (qualityChecklist) {
      list.push({
        id: SKILL_SECTIONS.readyCheck,
        title: t('qualityChecklist.heading'),
        accent: 'gold',
        badge: `${passedChecks}/${qualityChecklist.checks.length}`,
        preview: previewOf(qualityChecklist.overview, 96),
        content: (
          <>
            {/* The readiness verdict sits beside the overview: on desktop the
                card is wide, and the verdict is the line the reader scans for. */}
            <div className="mb-3 grid gap-3 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
              <div>
                <p className="max-w-prose text-[13px] leading-6 text-warm-300">{qualityChecklist.overview}</p>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-warm-50/[0.06]" aria-hidden="true">
                  <div
                    className={cn('h-full rounded-full transition-[width] duration-300', isReady ? 'bg-jade-400' : 'bg-gold-400')}
                    style={{ width: `${checkProgress}%` }}
                  />
                </div>
              </div>
              <div
                className="rounded-lg border border-gold-300/10 bg-gold-300/[0.04] px-3 py-2 text-xs leading-5 text-warm-300"
                aria-live="polite"
              >
                <p className={cn('font-semibold', isReady ? 'text-jade' : 'text-gold')}>
                  {isReady ? t('qualityChecklist.ready') : t('qualityChecklist.needsWork')} · {passedChecks}/
                  {qualityChecklist.checks.length}
                </p>
                <p className="mt-1 max-w-prose">{qualityChecklist.ifPassed}</p>
                <p className="mt-1 max-w-prose text-copper">{qualityChecklist.ifFailed}</p>
              </div>
            </div>
            <div className="space-y-2">
              {qualityChecklist.checks.map((check) => (
                <article key={check.id} className="rounded-xl border border-warm-50/[0.06] bg-warm-950/45 p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[13px] font-semibold text-warm-100">{check.title}</h3>
                    <span
                      className={cn(
                        'label-eyebrow rounded-md px-1.5 py-0.5',
                        check.severity === 'critical'
                          ? 'bg-copper-300/10 text-copper'
                          : check.severity === 'major'
                            ? 'bg-gold-300/10 text-gold'
                            : 'bg-warm-300/10 text-warm-300',
                      )}
                    >
                      {check.severity}
                    </span>
                  </div>
                  <p className="mt-1.5 max-w-prose text-[13px] leading-6 text-warm-300">{check.question}</p>
                  <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                    <p className="rounded-lg bg-jade-300/[0.05] px-2.5 py-1.5 text-xs leading-5 text-jade">✓ {check.successSignal}</p>
                    <p className="rounded-lg bg-copper-300/[0.05] px-2.5 py-1.5 text-xs leading-5 text-copper">! {check.failureSignal}</p>
                  </div>
                  <div className="mt-2.5 flex flex-wrap items-center gap-2" role="group" aria-label={check.title}>
                    <button
                      type="button"
                      aria-pressed={checkAnswers[check.id] === true}
                      onClick={() => setCheckAnswers((current) => ({ ...current, [check.id]: true }))}
                      className={cn(
                        'rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors',
                        checkAnswers[check.id] === true
                          ? 'border-jade-300/40 bg-jade-300/15 text-jade'
                          : 'border-warm-50/10 text-warm-300 hover:bg-warm-50/5',
                      )}
                    >
                      {t('qualityChecklist.yes')}
                    </button>
                    <button
                      type="button"
                      aria-pressed={checkAnswers[check.id] === false}
                      onClick={() => setCheckAnswers((current) => ({ ...current, [check.id]: false }))}
                      className={cn(
                        'rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors',
                        checkAnswers[check.id] === false
                          ? 'border-copper-300/40 bg-copper-300/15 text-copper'
                          : 'border-warm-50/10 text-warm-300 hover:bg-warm-50/5',
                      )}
                    >
                      {t('qualityChecklist.no')}
                    </button>
                    <p className="max-w-prose text-xs leading-5 text-gold">
                      {t('qualityChecklist.quickFixes')}: {check.quickFix}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </>
        ),
      })
    }

    if (whyItWorks.length > 0) {
      list.push({
        id: SKILL_SECTIONS.whyItWorks,
        title: t('cardOS.whyItWorks', 'Why It Works'),
        accent: 'jade',
        badge: String(whyItWorks.length),
        preview: firstItemPreview(whyItWorks, 96),
        content: (
          <ul className="grid gap-2 sm:grid-cols-2">
            {whyItWorks.map((reason, i) => (
              <Bullet key={i} tone="jade">{reason}</Bullet>
            ))}
          </ul>
        ),
      })
    }

    if (keyCorrections.length > 0) {
      list.push({
        id: SKILL_SECTIONS.keyCorrections,
        title: t('cardOS.topDetails'),
        accent: 'steel',
        badge: String(keyCorrections.length),
        preview: firstItemPreview(keyCorrections, 96),
        content: (
          <div className="grid gap-2 md:grid-cols-2">
            {keyCorrections.map((correction, i) => {
              const pair = splitProblemAndFix(correction)
              if (!pair) {
                return (
                  <div key={i} className="rounded-xl border border-warm-50/[0.06] bg-warm-950/45 p-3">
                    <p className="max-w-prose text-[13px] leading-6 text-warm-200">{correction}</p>
                  </div>
                )
              }
              return <ProblemFixCard key={i} problem={pair.problem} fix={pair.fix} />
            })}
          </div>
        ),
      })
    }

    if (moneyDetails.length > 0) {
      list.push({
        id: SKILL_SECTIONS.moneyDetails,
        title: t('cardOS.moneyDetails'),
        accent: 'jade',
        badge: String(moneyDetails.length),
        preview: firstItemPreview(moneyDetails, 96),
        content: (
          <div className="grid gap-2 md:grid-cols-2">
            {moneyDetails.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 rounded-xl border border-jade-300/15 bg-jade-300/[0.05] px-3 py-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-jade-300" />
                <p className="max-w-prose text-[13px] font-semibold leading-6 text-jade">{item}</p>
              </div>
            ))}
          </div>
        ),
      })
    }

    if (coachingCues.length > 0) {
      list.push({
        id: SKILL_SECTIONS.coachingCues,
        title: t('detail.coachingCues', 'Coaching Cues'),
        accent: 'gold',
        badge: String(coachingCues.length),
        preview: previewOf(coachingCues.join(' · '), 96),
        content: (
          <div className="flex flex-wrap gap-1.5">
            {coachingCues.map((cue, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full border border-gold-300/20 bg-gold-300/[0.06] px-2.5 py-1 text-[13px] font-semibold text-gold"
              >
                <span aria-hidden="true" className="text-gold">↗</span>
                {cue}
              </span>
            ))}
          </div>
        ),
      })
    }

    if (commonMistakes.length > 0) {
      list.push({
        id: SKILL_SECTIONS.commonMistakes,
        title: t('detail.commonMistakes'),
        accent: 'copper',
        badge: String(commonMistakes.length),
        preview: firstItemPreview(commonMistakes, 96),
        content: (
          <ul className="grid gap-2 sm:grid-cols-2">
            {commonMistakes.map((mistake, i) => (
              <Bullet key={i} tone="copper">{mistake}</Bullet>
            ))}
          </ul>
        ),
      })
    }

    if (nextStep) {
      list.push({
        id: SKILL_SECTIONS.nextStep,
        title: t('cardOS.nextStep'),
        accent: 'warm',
        preview: previewOf(nextStep, 96),
        content: (
          <div className="rounded-xl border border-gold-300/15 bg-gold-300/[0.045] px-3.5 py-3">
            <FormattedText text={nextStep} className="max-w-prose text-[13px] leading-6 text-warm-300" />
          </div>
        ),
      })
    }

    return list
  }, [checkAnswers, detail, t])

  const navItems = useMemo<SkillNavItem[]>(
    () => sections.map((section) => ({ id: section.id, title: section.title, badge: section.badge, accent: section.accent })),
    [sections],
  )

  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(sections.filter((section) => section.defaultOpen).map((section) => [section.id, true])),
  )

  const allOpen = sections.length > 0 && sections.every((section) => openIds[section.id])

  const jumpTo = (id: string) => {
    setOpenIds((current) => ({ ...current, [id]: true }))
    document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  if (sections.length === 0 && !shortInstruction) return null

  return (
    <div className="animate-slideUp space-y-3 pt-4">
      {/* Key cues. On desktop the label becomes a left rail so the cue text uses
          the whole width, and a chained cue ("A > B > C") is shown as numbered
          steps instead of one wrapping paragraph. */}
      {shortInstruction && (
        <div className="rounded-2xl border border-gold-300/18 bg-linear-to-br from-gold-300/[0.08] via-warm-950/45 to-warm-950/20 px-4 py-3.5 shadow-[0_18px_45px_rgba(185,140,60,0.08)] sm:px-5 sm:py-4">
          <div className="gap-2 lg:grid lg:grid-cols-[8.5rem_minmax(0,1fr)] lg:items-start lg:gap-5">
            <p className="label-eyebrow text-gold lg:pt-1">
              {t('cardOS.threeCues')}
            </p>
            {cueList.length > 1 ? (
              <ol className="mt-2 grid gap-x-5 gap-y-2.5 sm:grid-cols-2 lg:mt-0 lg:grid-cols-3">
                {cueList.map((cue, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-300/15 text-[10px] font-bold tabular-nums text-gold"
                    >
                      {i + 1}
                    </span>
                    <FormattedText
                      text={cue}
                      className="min-w-0 text-[15px] font-semibold leading-6 tracking-tight text-warm-50 sm:text-[16px] sm:leading-7"
                    />
                  </li>
                ))}
              </ol>
            ) : (
              <div className="mt-1.5 lg:mt-0">
                <FormattedText
                  text={shortInstruction}
                  className="text-[16px] font-semibold leading-7 tracking-tight text-warm-50 sm:text-[18px] sm:leading-8"
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="gap-3 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:items-start lg:gap-6">
        <SkillSectionNav
          items={navItems}
          onSelect={jumpTo}
          variant="strip"
          ariaLabel={t('cardOS.jumpToSection')}
          className="lg:hidden"
        />
        <SkillSectionNav
          items={navItems}
          onSelect={jumpTo}
          variant="rail"
          ariaLabel={t('cardOS.jumpToSection')}
          className="hidden lg:sticky lg:top-32 lg:block"
        />

        <div className="min-w-0 space-y-3">
          {sections.length > 2 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  setOpenIds(
                    allOpen
                      ? {}
                      : Object.fromEntries(sections.map((section) => [section.id, true])),
                  )
                }
                className="rounded-full border border-warm-50/10 px-3 py-1 text-[11px] font-semibold text-warm-400 transition-colors hover:bg-warm-50/[0.05] hover:text-warm-200"
              >
                {allOpen ? t('cardOS.collapseAll') : t('cardOS.expandAll')}
              </button>
            </div>
          )}

          {sections.map((section) => (
            <SectionAccordion
              key={section.id}
              id={section.id}
              title={section.title}
              badge={section.badge}
              preview={section.preview}
              accentColor={section.accent}
              open={Boolean(openIds[section.id])}
              onOpenChange={(next) => setOpenIds((current) => ({ ...current, [section.id]: next }))}
            >
              {section.content}
            </SectionAccordion>
          ))}
        </div>
      </div>
    </div>
  )
}
