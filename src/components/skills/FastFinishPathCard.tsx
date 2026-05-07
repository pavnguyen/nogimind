import { Badge } from '../common/Badge'
import { useTranslation } from 'react-i18next'
import { getLocalizedText } from '../../utils/localization'
import type { LanguageCode, FastFinishPath } from '../../types/skill'

type Props = {
  path: FastFinishPath
  lang: LanguageCode
}

export const FastFinishPathCard = ({ path, lang }: Props) => (
  <FastFinishPathCardInner path={path} lang={lang} />
)

const FastFinishPathCardInner = ({ path, lang }: Props) => {
  const { t } = useTranslation()

  return (
    <article className="rounded-lg border border-emerald-300/15 bg-emerald-300/10 p-4">
      <Badge tone="emerald">{t('microDetailSystem.fastPath')}</Badge>
      <h3 className="mt-3 text-sm font-semibold text-emerald-50">{getLocalizedText(path.title, lang)}</h3>
      <div className="mt-4 space-y-3">
        {path.steps.slice(0, 6).map((step) => (
          <div key={step.id} className="rounded-md border border-white/10 bg-slate-950/60 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{step.order}</p>
            <p className="mt-2 text-sm text-slate-200">{getLocalizedText(step.instruction, lang)}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-rose-200">{t('quickMode.avoid')}</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">{getLocalizedText(step.commonMistake, lang)}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-emerald-50">
        <span className="font-semibold">{t('microDetailSystem.trigger')}: </span>
        {getLocalizedText(path.finishTrigger, lang)}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        <span className="font-semibold text-white">{t('microDetailSystem.abort')}: </span>
        {getLocalizedText(path.abortSignal, lang)}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        <span className="font-semibold text-white">{t('microDetailSystem.next')}: </span>
        {getLocalizedText(path.nextBestOption, lang)}
      </p>
      {path.safetyNote ? <p className="mt-3 rounded-md border border-amber-300/15 bg-amber-300/10 px-3 py-2 text-sm text-amber-100">{getLocalizedText(path.safetyNote, lang)}</p> : null}
    </article>
  )
}
