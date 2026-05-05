import { useTranslation } from 'react-i18next'
import type { ConnectionPoint, LanguageCode } from '../../types/skill'
import { getLocalizedArray, getLocalizedText } from '../../utils/localization'
import { Badge } from '../common/Badge'

export const ConnectionPointList = ({ points, lang }: { points: ConnectionPoint[]; lang: LanguageCode }) => {
  const { t } = useTranslation()
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {points.map((point) => (
        <article key={point.id} className="rounded-md border border-white/10 bg-slate-950/55 p-4">
          <div className="flex flex-wrap gap-2">
            <Badge tone="emerald">{t(`mechanics.roles.${point.role}`)}</Badge>
            <Badge tone="cyan">{t(`body.${point.yourBodyPart}`)}</Badge>
            {point.opponentBodyPart ? <Badge>{t(`body.${point.opponentBodyPart}`)}</Badge> : null}
          </div>
          <h4 className="mt-3 font-semibold text-white">{getLocalizedText(point.name, lang)}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{getLocalizedText(point.purpose, lang)}</p>
          {point.pressureDirection ? (
            <p className="mt-2 text-sm leading-6 text-cyan-100">
              <span className="font-semibold">{t('mechanics.pressureDirection')}: </span>
              {getLocalizedText(point.pressureDirection, lang)}
            </p>
          ) : null}
          <ul className="mt-2 space-y-1 text-xs leading-5 text-slate-500">
            {getLocalizedArray(point.commonErrors, lang).map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>
      ))}
    </div>
  )
}
