import { useTranslation } from 'react-i18next'
import { SectionAccordion } from './SectionAccordion'
import { Badge } from '../common/Badge'
import { getTechnicalTokenLabel } from '../../utils/localization'
import type { KeyCorrectionsView } from '../../data/skills/skillViewModel'
import type { LanguageCode } from '../../types/skill'

type Props = {
  view: KeyCorrectionsView
  lang: LanguageCode
}

export const KeyCorrectionsSection = ({ view, lang }: Props) => {
  const { t } = useTranslation()

  if (!view.available || view.items.length === 0) return null

  return (
    <SectionAccordion
      id="key-corrections"
      title={t('cardOS.topDetails')}
      accentColor="violet"
      defaultOpen
    >
      <div className="grid gap-3 md:grid-cols-2">
        {view.items.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-white/8 bg-slate-950/50 p-4"
          >
            {/* Badge row */}
            <div className="mb-3 flex flex-wrap gap-1.5">
              <Badge tone="violet">
                {getTechnicalTokenLabel(item.category, lang)}
              </Badge>
              {item.bodyParts.slice(0, 3).map((part) => (
                <Badge key={part} tone="slate">
                  {getTechnicalTokenLabel(part, lang)}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <p className="mb-3 text-sm font-semibold text-white">{item.title}</p>

            {/* Common mistake */}
            <div className="mb-2 rounded-md border border-rose-400/15 bg-rose-400/5 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-400">
                {t('microDetails.cardWrong')}
              </p>
              <p className="mt-0.5 text-xs leading-5 text-rose-200">
                {item.commonMistake}
              </p>
            </div>

            {/* Correction cue */}
            <div className="mb-2 rounded-md border border-emerald-400/15 bg-emerald-400/5 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                {t('microDetails.cardFixWith')}
              </p>
              <p className="mt-0.5 text-xs leading-5 text-emerald-200">
                {item.correctionCue}
              </p>
            </div>

            {/* Live cue */}
            <div className="rounded-md border border-cyan-400/15 bg-cyan-400/5 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                {t('microDetails.cardCue')}
              </p>
              <p className="mt-0.5 text-xs font-medium leading-5 text-cyan-200">
                {item.liveCue}
              </p>
            </div>

            {/* Safety note (if any) */}
            {item.safetyNote && (
              <div className="mt-2 rounded-md border border-amber-300/15 bg-amber-300/8 px-3 py-2">
                <p className="text-xs text-amber-100">⚠ {item.safetyNote}</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </SectionAccordion>
  )
}
