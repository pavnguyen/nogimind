import { useTranslation } from 'react-i18next'
import type { BodyChecklist as BodyChecklistType, LanguageCode } from '../../types/skill'
import { getLocalizedText } from '../../utils/localization'

const fields: (keyof BodyChecklistType)[] = ['head', 'eyes', 'rightHand', 'leftHand', 'hips', 'insideLeg', 'outsideLeg', 'spine', 'pressure']

export const BodyChecklist = ({ checklist, lang }: { checklist: BodyChecklistType; lang: LanguageCode }) => {
  const { t } = useTranslation()
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {fields
        .filter((field) => checklist[field])
        .map((field) => (
          <div key={field} className="rounded-md border border-white/10 bg-slate-900/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">{t(`body.${field}`)}</p>
            <p className="mt-1 text-sm leading-6 text-slate-300">{getLocalizedText(checklist[field], lang)}</p>
          </div>
        ))}
    </div>
  )
}
