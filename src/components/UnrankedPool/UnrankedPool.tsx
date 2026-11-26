import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { ConceptCard } from '@/components/ConceptCard/ConceptCard'
import { useTierList } from '@/hooks/useTierList'
import { cn } from '@/utils/cn'

export const UnrankedPool = () => {
  const { state } = useTierList()

  const unrankedConcepts = state.concepts
    .filter((c): c is typeof c => c.tier === 'unranked')
    .sort((a, b) => state.concepts.indexOf(a) - state.concepts.indexOf(b))

  const isEmpty = unrankedConcepts.length === 0

  const { setNodeRef, isOver } = useDroppable({ id: 'unranked' })

  return (
    <section aria-labelledby="unranked-heading" className="w-full">
      <div className="unranked-label" id="unranked-heading">
        <span className="unranked-title">UNRANKED</span>
        <span className="unranked-hint">Drag up to rank</span>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          'unranked-pool',
          isOver && 'active'
        )}
        role="list"
        aria-label="Unranked concepts pool"
      >
        <SortableContext
          items={unrankedConcepts.map(c => c.id)}
          strategy={rectSortingStrategy}
        >
          {unrankedConcepts.map((concept, index) => (
            <ConceptCard key={concept.id} concept={concept} index={index} />
          ))}

          {isEmpty && (
            <div className="w-full text-center py-8" style={{ color: 'var(--color-text-dim)' }}>
              <span style={{ fontSize: 'var(--text-micro)', letterSpacing: 'var(--text-micro--letter-spacing)', textTransform: 'uppercase' }}>
                No unranked concepts
              </span>
            </div>
          )}
        </SortableContext>
      </div>
    </section>
  )
}