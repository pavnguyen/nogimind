import { useTranslation } from 'react-i18next'
import { Badge } from '../common/Badge'
import { SectionCard } from '../common/SectionCard'
import type { BodyTarget, BodyToBodyContact, BodyToBodyDetailSystem, LanguageCode } from '../../types/skill'
import type { ViewMode } from '../../types/settings'
import { getLocalizedTechnicalText, getLocalizedText } from '../../utils/localization'

type Props = {
  system: BodyToBodyDetailSystem
  lang: LanguageCode
  viewMode?: ViewMode
}

const formatTarget = (target: BodyTarget, t: (key: string) => string) =>
  `${t(`bodyToBody.roles.${target.role}`)} ${t(`bodyToBody.sides.${target.side}`)} ${t(`bodyToBody.bodyParts.${target.bodyPart}`)}`

const ContactCard = ({ contact, lang }: { contact: BodyToBodyContact; lang: LanguageCode }) => {
  const { t } = useTranslation()

  return (
    <article className="rounded-lg border border-white/10 bg-slate-950/60 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="cyan">{contact.contactType}</Badge>
        {contact.forceDirection ? <Badge>{contact.forceDirection}</Badge> : null}
        {contact.pressureLevel ? <Badge tone={contact.pressureLevel === 'progressive' ? 'amber' : 'slate'}>{contact.pressureLevel}</Badge> : null}
      </div>
      <h3 className="mt-3 text-sm font-semibold text-white">{getLocalizedText(contact.title, lang)}</h3>
      <div className="mt-3 rounded-md border border-cyan-300/15 bg-cyan-300/10 p-3 text-sm font-semibold text-cyan-50">
        <span>{formatTarget(contact.myBodyPart, t)}</span>
        <span className="px-2 text-cyan-300">→</span>
        <span>{formatTarget(contact.opponentBodyPart, t)}</span>
      </div>
      {contact.myBodyPart.detail || contact.opponentBodyPart.detail ? (
        <div className="mt-2 grid gap-2 text-xs leading-5 text-slate-400 md:grid-cols-2">
          {contact.myBodyPart.detail ? <p>{getLocalizedTechnicalText(contact.myBodyPart.detail, lang)}</p> : null}
          {contact.opponentBodyPart.detail ? <p>{getLocalizedTechnicalText(contact.opponentBodyPart.detail, lang)}</p> : null}
        </div>
      ) : null}
      <div className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
        <p><span className="font-semibold text-slate-100">{t('bodyToBody.instruction')}: </span>{getLocalizedTechnicalText(contact.exactInstruction, lang)}</p>
        <p><span className="font-semibold text-slate-100">{t('bodyToBody.whyItWorks')}: </span>{getLocalizedTechnicalText(contact.whyItWorks, lang)}</p>
        <p><span className="font-semibold text-amber-100">{t('bodyToBody.commonMisplacement')}: </span>{getLocalizedTechnicalText(contact.commonMisplacement, lang)}</p>
        <p><span className="font-semibold text-emerald-100">{t('bodyToBody.correctionCue')}: </span>{getLocalizedTechnicalText(contact.correctionCue, lang)}</p>
        {contact.prevents ? <p><span className="font-semibold text-cyan-100">{t('bodyToBody.prevents')}: </span>{getLocalizedTechnicalText(contact.prevents, lang)}</p> : null}
        {contact.safetyNote ? <p className="rounded-md border border-amber-300/15 bg-amber-300/10 p-2 text-amber-100">{getLocalizedTechnicalText(contact.safetyNote, lang)}</p> : null}
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-cyan-200">{getLocalizedTechnicalText(contact.liveCue, lang)}</p>
    </article>
  )
}

export const BodyToBodyDetailsSection = ({ system, lang, viewMode = 'detailed' }: Props) => {
  const { t } = useTranslation()
  const phaseLimit = viewMode === 'advanced' ? system.phases.length : 2
  const contactLimit = viewMode === 'simple' ? 2 : viewMode === 'advanced' ? 99 : 3
  const visiblePhases = system.phases.slice(0, phaseLimit)

  return (
    <SectionCard title={t('bodyToBody.heading')} description={getLocalizedTechnicalText(system.overview, lang)}>
      <div className="space-y-5">
        <div className="rounded-lg border border-white/10 bg-slate-900/50 p-4">
          <p className="text-sm leading-6 text-slate-300">
            <span className="font-semibold text-slate-100">{t('bodyToBody.defaultOrientation')}: </span>
            {getLocalizedTechnicalText(system.defaultOrientation, lang)}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            <span className="font-semibold text-slate-200">{t('bodyToBody.mirrorNote')}: </span>
            {getLocalizedTechnicalText(system.leftRightMirrorNote, lang)}
          </p>
        </div>

        {system.mostImportantContacts.length ? (
          <div className="flex flex-wrap gap-2">
            {system.mostImportantContacts.map((id) => <Badge key={id} tone="emerald">{id}</Badge>)}
          </div>
        ) : null}

        {visiblePhases.map((phase) => (
          <div key={phase.id} className="space-y-3 rounded-lg border border-white/10 bg-slate-900/30 p-4">
            <div>
              <h3 className="text-base font-semibold text-white">{getLocalizedText(phase.title, lang)}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-400">{getLocalizedTechnicalText(phase.goal, lang)}</p>
            </div>
            <div className="grid gap-3 xl:grid-cols-2">
              {phase.contacts.slice(0, contactLimit).map((contact) => <ContactCard key={contact.id} contact={contact} lang={lang} />)}
            </div>
            {viewMode !== 'simple' ? (
              <div className="grid gap-3 text-sm md:grid-cols-2">
                <p className="rounded-md border border-emerald-300/15 bg-emerald-300/10 p-3 text-emerald-100">{getLocalizedTechnicalText(phase.successSignal, lang)}</p>
                <p className="rounded-md border border-rose-300/15 bg-rose-300/10 p-3 text-rose-100">{getLocalizedTechnicalText(phase.failureSignal, lang)}</p>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </SectionCard>
  )
}
