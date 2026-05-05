import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import type { LanguageCode, SkillNode } from '../../types/skill'
import { getLocalizedText } from '../../utils/localization'

export const DraggableSkillCard = ({ skill, lang }: { skill: SkillNode; lang: LanguageCode }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `pool:${skill.id}`,
    data: { type: 'pool', skillId: skill.id },
  })

  return (
    <button
      ref={setNodeRef}
      type="button"
      style={{ transform: CSS.Translate.toString(transform) }}
      className={`w-full rounded-md border border-white/10 bg-slate-900 p-3 text-left text-sm text-slate-200 shadow-sm ${
        isDragging ? 'opacity-60' : 'hover:bg-white/10'
      }`}
      {...listeners}
      {...attributes}
    >
      <span className="font-medium">{getLocalizedText(skill.title, lang)}</span>
      <span className="mt-1 block text-xs text-slate-500">{skill.tags.slice(0, 2).join(', ')}</span>
    </button>
  )
}
