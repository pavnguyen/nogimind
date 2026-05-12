import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../common/Badge'
import { SectionCard } from '../common/SectionCard'
import { TechniqueStateGraph } from './TechniqueStateGraph'
import type { LanguageCode, SkillNode } from '../../types/skill'
import type { RolePerspectiveData, TechniqueStateMachine } from '../../types/stateMachine'
import { getLocalizedArray, getLocalizedText } from '../../utils/localization'

type Props = {
  stateMachine: TechniqueStateMachine
  skill: SkillNode
  skillsById: Map<string, SkillNode>
  lang: LanguageCode
  simple?: boolean
}

const text = {
  en: {
    heading: 'Attacker / Defender View',
    graph: 'Outcome Map',
    estimate: 'Outcome probabilities are educational estimates, not competition statistics.',
    attacker: 'Attacker',
    defender: 'Defender',
    cues: 'Recognition cues',
    actions: 'Primary actions',
    errors: 'Common errors',
    checks: 'Knowledge checks',
    training: 'Training progression',
    outcomes: 'Outcomes',
    reveal: 'Show answer',
  },
  vi: {
    heading: 'Góc nhìn tấn công / phòng thủ',
    graph: 'Bản đồ kết quả',
    estimate: 'Xác suất chỉ là ước lượng học tập, không phải thống kê thi đấu chính thức.',
    attacker: 'Tấn công',
    defender: 'Phòng thủ',
    cues: 'Dấu hiệu nhận biết',
    actions: 'Hành động chính',
    errors: 'Lỗi thường gặp',
    checks: 'Câu hỏi kiểm tra',
    training: 'Tiến trình tập',
    outcomes: 'Kết quả',
    reveal: 'Xem đáp án',
  },
  fr: {
    heading: 'Vue attaquant / défenseur',
    graph: 'Carte des résultats',
    estimate: 'Les probabilités sont des estimations pédagogiques, pas des statistiques officielles.',
    attacker: 'Attaquant',
    defender: 'Défenseur',
    cues: 'Signaux à reconnaître',
    actions: 'Actions principales',
    errors: 'Erreurs communes',
    checks: 'Questions de contrôle',
    training: 'Progression d’entraînement',
    outcomes: 'Résultats',
    reveal: 'Voir la réponse',
  },
}

const l = (lang: LanguageCode, key: keyof typeof text.en) => text[lang]?.[key] ?? text.en[key]

const RolePanel = ({ data, lang }: { data: RolePerspectiveData; lang: LanguageCode }) => (
  <div className="space-y-4">
    <p className="text-sm leading-6 text-slate-300">{getLocalizedText(data.goal, lang)}</p>
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">{l(lang, 'cues')}</p>
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          {getLocalizedArray(data.recognitionCues, lang).map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <div className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-200">{l(lang, 'actions')}</p>
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          {getLocalizedArray(data.primaryActions, lang).map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </div>
    <div className="grid gap-3 md:grid-cols-2">
      {data.commonErrors.map((item) => (
        <div key={getLocalizedText(item.error, 'en')} className="rounded-lg border border-amber-300/15 bg-amber-300/10 p-4">
          <p className="text-sm font-semibold text-amber-100">{getLocalizedText(item.error, lang)}</p>
          <p className="mt-2 text-sm text-slate-300">{getLocalizedText(item.consequence, lang)}</p>
          <p className="mt-2 text-sm text-emerald-100">{getLocalizedText(item.correction, lang)}</p>
        </div>
      ))}
    </div>
  </div>
)

export const TechniqueStateMachineSection = ({ stateMachine, skill, skillsById, lang, simple }: Props) => {
  const [role, setRole] = useState<'attacker' | 'defender'>('attacker')
  const activeRole = role === 'attacker' ? stateMachine.attacker : stateMachine.defender

  return (
    <SectionCard title={l(lang, 'heading')} description={l(lang, 'estimate')}>
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {stateMachine.attacker ? (
            <button type="button" onClick={() => setRole('attacker')} className={`rounded-md px-3 py-2 text-sm font-semibold ${role === 'attacker' ? 'bg-emerald-300 text-slate-950' : 'border border-white/10 text-slate-300'}`}>
              {l(lang, 'attacker')}
            </button>
          ) : null}
          {stateMachine.defender ? (
            <button type="button" onClick={() => setRole('defender')} className={`rounded-md px-3 py-2 text-sm font-semibold ${role === 'defender' ? 'bg-emerald-300 text-slate-950' : 'border border-white/10 text-slate-300'}`}>
              {l(lang, 'defender')}
            </button>
          ) : null}
        </div>

        {activeRole ? <RolePanel data={activeRole} lang={lang} /> : null}

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{l(lang, 'outcomes')}</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {stateMachine.outcomes.map((outcomeValue) => {
              const target = outcomeValue.toSkillId ? skillsById.get(outcomeValue.toSkillId) : undefined
              return (
                <div key={outcomeValue.id} className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={outcomeValue.result === 'safety_abort' ? 'amber' : outcomeValue.result === 'success' ? 'emerald' : 'slate'}>{outcomeValue.result.replace('_', ' ')}</Badge>
                    <span className="text-sm font-semibold text-white">{getLocalizedText(outcomeValue.label, lang)}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{getLocalizedText(outcomeValue.explanation, lang)}</p>
                  <p className="mt-2 text-xs text-slate-500">{getLocalizedText(outcomeValue.triggerSignal, lang)}</p>
                  {target ? <Link to={`/skills/${target.id}`} className="mt-3 inline-flex text-sm font-semibold text-cyan-200 hover:text-cyan-100">{getLocalizedText(target.title, lang)}</Link> : null}
                </div>
              )
            })}
          </div>
        </div>

        {!simple ? (
          <>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{l(lang, 'checks')}</p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {[...(stateMachine.attacker?.knowledgeChecks ?? []), ...(stateMachine.defender?.knowledgeChecks ?? [])].slice(0, 5).map((item) => (
                  <details key={getLocalizedText(item.question, 'en')} className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
                    <summary className="cursor-pointer text-sm font-semibold text-white">
                      {item.safetyCritical ? <span className="mr-2 text-amber-200">Safety</span> : null}
                      {getLocalizedText(item.question, lang)}
                    </summary>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{getLocalizedText(item.answer, lang)}</p>
                  </details>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{l(lang, 'training')}</p>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {stateMachine.trainingProgressions.map((step) => (
                  <div key={getLocalizedText(step.phase, 'en')} className="rounded-lg border border-white/10 bg-slate-900/60 p-4">
                    <Badge>{step.intensity}</Badge>
                    <p className="mt-3 text-sm font-semibold text-white">{getLocalizedText(step.phase, lang)}</p>
                    <p className="mt-2 text-sm text-slate-400">{getLocalizedText(step.instruction, lang)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">{l(lang, 'graph')}</p>
              <TechniqueStateGraph stateMachine={stateMachine} skill={skill} skillsById={skillsById} lang={lang} />
            </div>
          </>
        ) : null}
      </div>
    </SectionCard>
  )
}
