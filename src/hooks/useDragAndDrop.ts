import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useTierList } from '@/hooks/useTierList'
import type { TierId } from '@/types'

export function useDragAndDrop() {
  const { state, moveConcept, reorderInTier } = useTierList()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
        delay: 50,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (_event: DragStartEvent) => {
    // Could add drag start logic here if needed
  }

  const handleDragOver = (_event: DragOverEvent) => {
    // Could add drag over logic for visual feedback
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    if (activeId === overId) return

    const activeConcept = state.concepts.find((c) => c.id === activeId)
    if (!activeConcept) return

    // If dropped on a concept (not the tier drop zone), use that concept's tier as target
    const overConcept = state.concepts.find((c) => c.id === overId)
    const targetTier = (overConcept?.tier ?? overId) as TierId | 'unranked'

    const isSameTier = activeConcept.tier === targetTier

    if (isSameTier) {
      const tierConcepts = state.concepts
        .filter((c) => c.tier === targetTier)
        .map((c) => c.id)

      const oldIndex = tierConcepts.indexOf(activeId)
      const newIndex = tierConcepts.indexOf(overId)

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        const newOrder = arrayMove(tierConcepts, oldIndex, newIndex)
        reorderInTier(targetTier as TierId, newOrder)
      }
    } else {
      const targetTierConcepts = state.concepts
        .filter((c) => c.tier === targetTier)
        .map((c) => c.id)

      let insertIndex = targetTierConcepts.length

      if (overConcept && overConcept.tier === targetTier) {
        insertIndex = targetTierConcepts.indexOf(overId)
      }

      moveConcept(activeId, targetTier, insertIndex)
    }
  }

  return {
    sensors,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  }
}