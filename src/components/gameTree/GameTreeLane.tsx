import { useDroppable } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { GameTreeLaneId } from '../../types/gameTree'
import type { LanguageCode, SkillNode } from '../../types/skill'
import { getLocalizedText } from '../../utils/localization'

const SortableSkillCard = ({
  lane,
  skill,
  lang,
  onRemove,
}: {
  lane: GameTreeLaneId
  skill: SkillNode
  lang: LanguageCode
  onRemove: (lane: GameTreeLaneId, skillId: string) => void
}) => {
  const { t } = useTranslation()
  const id = `lane:${lane}:${skill.id}`
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: { type: 'laneItem', lane, skillId: skill.id },
  })

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center justify-between gap-2 rounded-md border border-white/10 bg-slate-950 p-3 ${
        isDragging ? 'opacity-60' : ''
      }`}
      {...attributes}
      {...listeners}
    >
      <span className="min-w-0 text-sm font-medium text-slate-200">{getLocalizedText(skill.title, lang)}</span>
      <button
        type="button"
        onClick={() => onRemove(lane, skill.id)}
        className="shrink-0 rounded p-1 text-slate-500 hover:bg-rose-400/10 hover:text-rose-200"
        title={t('common.remove')}
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}

export const GameTreeLane = ({
  lane,
  skills,
  lang,
  onRemove,
}: {
  lane: GameTreeLaneId
  skills: SkillNode[]
  lang: LanguageCode
  onRemove: (lane: GameTreeLaneId, skillId: string) => void
}) => {
  const { t } = useTranslation()
  const { setNodeRef, isOver } = useDroppable({
    id: `lane:${lane}`,
    data: { lane },
  })

  return (
    <section
      ref={setNodeRef}
      className={`min-h-64 rounded-lg border p-3 ${isOver ? 'border-cyan-300 bg-cyan-300/10' : 'border-white/10 bg-slate-900/55'}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-white">{t(`lanes.${lane}`)}</h3>
        <span className="text-xs text-slate-500">{skills.length}</span>
      </div>
      <SortableContext items={skills.map((skill) => `lane:${lane}:${skill.id}`)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {skills.map((skill) => (
            <SortableSkillCard key={skill.id} lane={lane} skill={skill} lang={lang} onRemove={onRemove} />
          ))}
        </div>
      </SortableContext>
    </section>
  )
}
