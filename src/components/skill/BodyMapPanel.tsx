import { useTranslation } from 'react-i18next'
import type { BodyMapItem } from '../../data/skills/skillViewModel'

type Props = {
  title: string
  tone: 'attacker' | 'defender'
  items: BodyMapItem[]
}

const toneStyles = {
  attacker: 'border-cyan-400/20 bg-cyan-400/5 text-cyan-200',
  defender: 'border-amber-400/20 bg-amber-400/5 text-amber-200',
}

export const BodyMapPanel = ({ title, tone, items }: Props) => {
  const { t } = useTranslation()

  return (
    <section className={`rounded-lg border p-4 ${toneStyles[tone]}`}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest">{title}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.key} className="rounded-md border border-white/8 bg-slate-950/45 px-3 py-2">
            <p className="text-xs font-semibold text-slate-100">{item.label}</p>
            {item.cues.length > 0 ? (
              <ul className="mt-1 space-y-1">
                {item.cues.map((cue) => (
                  <li key={cue} className="text-xs leading-5 text-slate-400">{cue}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-xs text-slate-600">{t('cardOS.noCue')}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
