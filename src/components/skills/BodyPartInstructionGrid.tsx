import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { BodyPartInstruction, BodyPartKey, LanguageCode, MechanicType } from '../../types/skill'
import { getLocalizedArray, getLocalizedText } from '../../utils/localization'
import { Badge } from '../common/Badge'

export type MechanicsFilter = 'all' | 'headNeck' | 'armsHands' | 'torsoHips' | 'legsFeet' | 'pressure' | 'safety'

const filterBodyParts: Record<Exclude<MechanicsFilter, 'all' | 'pressure' | 'safety'>, BodyPartKey[]> = {
  headNeck: ['head', 'eyes', 'ears', 'chin', 'neck'],
  armsHands: ['hands', 'wrists', 'elbows', 'forearms', 'biceps'],
  torsoHips: ['shoulders', 'chest', 'sternum', 'ribs', 'spine', 'hips', 'pelvis'],
  legsFeet: ['knees', 'thighs', 'shins', 'ankles', 'heels', 'toes', 'feet'],
}

const pressureTypes: MechanicType[] = ['pressure', 'weight_distribution']
const safetyTypes: MechanicType[] = ['safety', 'escape_mechanic']

export const instructionMatchesFilter = (instruction: BodyPartInstruction, filter: MechanicsFilter) => {
  if (filter === 'all') return true
  if (filter === 'pressure') return pressureTypes.includes(instruction.mechanicType)
  if (filter === 'safety') return safetyTypes.includes(instruction.mechanicType)
  return filterBodyParts[filter].includes(instruction.bodyPart)
}

export const BodyPartInstructionGrid = ({
  instructions,
  lang,
  filter,
}: {
  instructions: BodyPartInstruction[]
  lang: LanguageCode
  filter: MechanicsFilter
}) => {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const filtered = instructions.filter((instruction) => instructionMatchesFilter(instruction, filter))

  if (!filtered.length) return null

  return (
    <div className="grid gap-3 xl:grid-cols-2">
      {filtered.map((instruction) => {
        const key = `${instruction.bodyPart}-${instruction.role}-${instruction.mechanicType}-${getLocalizedText(instruction.instruction, 'en')}`
        const isExpanded = expanded[key] ?? false
        return (
        <article
          key={key}
          className="rounded-lg border border-white/10 bg-slate-950/60 p-4"
        >
          <div className="flex flex-wrap gap-2">
            <Badge tone="cyan">{t(`body.${instruction.bodyPart}`)}</Badge>
            <Badge tone="emerald">{t(`mechanics.roles.${instruction.role}`)}</Badge>
            <Badge>{t(`mechanics.mechanicTypes.${instruction.mechanicType}`)}</Badge>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-200">{getLocalizedText(instruction.instruction, lang)}</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('mechanics.whyItMatters')}</p>
          <p className="mt-1 text-sm leading-6 text-slate-400">{getLocalizedText(instruction.whyItMatters, lang)}</p>
          <button
            type="button"
            onClick={() => setExpanded((current) => ({ ...current, [key]: !isExpanded }))}
            className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2 py-1 text-xs font-medium text-slate-300 hover:bg-white/10"
          >
            {isExpanded ? <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" /> : <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
            {t('mechanics.correctionCues')}
          </button>
          {isExpanded ? <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-200">{t('mechanics.commonErrors')}</p>
              <ul className="mt-1 space-y-1 text-xs leading-5 text-slate-400">
                {getLocalizedArray(instruction.commonErrors, lang).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200">{t('mechanics.correctionCues')}</p>
              <ul className="mt-1 space-y-1 text-xs leading-5 text-slate-400">
                {getLocalizedArray(instruction.correctionCues, lang).map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div> : null}
        </article>
        )
      })}
    </div>
  )
}
