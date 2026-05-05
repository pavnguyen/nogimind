import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Badge } from '../common/Badge'
import { getLocalizedText } from '../../utils/localization'
import type { LanguageCode, LeftRightGuide } from '../../types/skill'

type Props = {
  guide: LeftRightGuide
  lang: LanguageCode
}

export const LeftRightGuideCard = ({ guide, lang }: Props) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <article className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge tone="cyan">{t('microDetailSystem.leftRight')}</Badge>
          <h3 className="mt-3 text-sm font-semibold text-white">{getLocalizedText(guide.scenario, lang)}</h3>
        </div>
        <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-md border border-white/10 p-2 text-slate-300 hover:bg-white/10">
          {open ? <ChevronUp className="h-4 w-4" aria-hidden="true" /> : <ChevronDown className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>
      {open ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <p className="rounded-md border border-white/10 bg-slate-950/60 p-3 text-sm text-slate-300"><span className="font-semibold text-white">{t('microDetailSystem.leftHand')}: </span>{getLocalizedText(guide.leftHand, lang)}</p>
          <p className="rounded-md border border-white/10 bg-slate-950/60 p-3 text-sm text-slate-300"><span className="font-semibold text-white">{t('microDetailSystem.rightHand')}: </span>{getLocalizedText(guide.rightHand, lang)}</p>
          {guide.leftLeg ? <p className="rounded-md border border-white/10 bg-slate-950/60 p-3 text-sm text-slate-300"><span className="font-semibold text-white">{t('microDetailSystem.leftLeg')}: </span>{getLocalizedText(guide.leftLeg, lang)}</p> : null}
          {guide.rightLeg ? <p className="rounded-md border border-white/10 bg-slate-950/60 p-3 text-sm text-slate-300"><span className="font-semibold text-white">{t('microDetailSystem.rightLeg')}: </span>{getLocalizedText(guide.rightLeg, lang)}</p> : null}
          {guide.head ? <p className="rounded-md border border-white/10 bg-slate-950/60 p-3 text-sm text-slate-300"><span className="font-semibold text-white">{t('microDetailSystem.head')}: </span>{getLocalizedText(guide.head, lang)}</p> : null}
          {guide.hips ? <p className="rounded-md border border-white/10 bg-slate-950/60 p-3 text-sm text-slate-300"><span className="font-semibold text-white">{t('microDetailSystem.hips')}: </span>{getLocalizedText(guide.hips, lang)}</p> : null}
        </div>
      ) : (
        <p className="mt-3 text-sm leading-6 text-slate-400">{getLocalizedText(guide.note, lang)}</p>
      )}
    </article>
  )
}
