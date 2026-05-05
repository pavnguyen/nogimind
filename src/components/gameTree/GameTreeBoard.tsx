import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import type { GameTree, GameTreeLaneId } from '../../types/gameTree'
import type { LanguageCode, SkillNode } from '../../types/skill'
import { DraggableSkillCard } from './DraggableSkillCard'
import { GameTreeLane } from './GameTreeLane'

const lanes: GameTreeLaneId[] = ['standing', 'guard', 'passing', 'pinning', 'submissions', 'escapes', 'legLocks']

const parseLane = (id: string): GameTreeLaneId | undefined => {
  const [, lane] = id.split(':')
  return lanes.includes(lane as GameTreeLaneId) ? (lane as GameTreeLaneId) : undefined
}

export const GameTreeBoard = ({
  skills,
  gameTree,
  lang,
  onChange,
}: {
  skills: SkillNode[]
  gameTree: GameTree
  lang: LanguageCode
  onChange: (tree: GameTree) => void
}) => {
  const byId = new Map(skills.map((skill) => [skill.id, skill]))

  const removeSkill = (lane: GameTreeLaneId, skillId: string) => {
    onChange({ ...gameTree, [lane]: gameTree[lane].filter((id) => id !== skillId) })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const activeData = active.data.current as { type?: string; lane?: GameTreeLaneId; skillId?: string }
    const overData = over.data.current as { lane?: GameTreeLaneId; skillId?: string } | undefined
    const targetLane = overData?.lane ?? parseLane(String(over.id))
    const skillId = activeData.skillId
    if (!targetLane || !skillId) return

    if (activeData.type === 'pool') {
      if (gameTree[targetLane].includes(skillId)) return
      onChange({ ...gameTree, [targetLane]: [...gameTree[targetLane], skillId] })
      return
    }

    const sourceLane = activeData.lane
    if (!sourceLane) return

    if (sourceLane === targetLane) {
      const oldIndex = gameTree[sourceLane].indexOf(skillId)
      const overSkillId = overData?.skillId
      const newIndex = overSkillId ? gameTree[sourceLane].indexOf(overSkillId) : gameTree[sourceLane].length - 1
      if (oldIndex < 0 || newIndex < 0) return
      onChange({ ...gameTree, [sourceLane]: arrayMove(gameTree[sourceLane], oldIndex, newIndex) })
      return
    }

    const sourceItems = gameTree[sourceLane].filter((id) => id !== skillId)
    const targetItems = [...gameTree[targetLane]]
    const overSkillId = overData?.skillId
    const insertIndex = overSkillId ? Math.max(0, targetItems.indexOf(overSkillId)) : targetItems.length
    targetItems.splice(insertIndex, 0, skillId)
    onChange({ ...gameTree, [sourceLane]: sourceItems, [targetLane]: [...new Set(targetItems)] })
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid gap-4 xl:grid-cols-[280px_1fr]">
        <aside className="rounded-lg border border-white/10 bg-slate-950/60 p-3">
          <div className="max-h-[720px] space-y-2 overflow-y-auto pr-1">
            {skills.map((skill) => (
              <DraggableSkillCard key={skill.id} skill={skill} lang={lang} />
            ))}
          </div>
        </aside>
        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {lanes.map((lane) => (
            <GameTreeLane
              key={lane}
              lane={lane}
              skills={gameTree[lane].map((id) => byId.get(id)).filter(Boolean) as SkillNode[]}
              lang={lang}
              onRemove={removeSkill}
            />
          ))}
        </div>
      </div>
    </DndContext>
  )
}
