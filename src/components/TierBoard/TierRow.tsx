import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { TierBadge } from './TierBadge'
import { ConceptCard } from '@/components/ConceptCard/ConceptCard'
import { useTierList } from '@/hooks/useTierList'
import { cn } from '@/utils/cn'
import { TIER_CONFIGS } from '@/data/tierConfig'
import type { TierId } from '@/types'

interface TierRowProps {
  tier: TierId
  index: number
}

export const TierRow = ({ tier, index }: TierRowProps) => {
  const { state } = useTierList()

  const tierConcepts = state.concepts
    .filter((c): c is typeof c => c.tier === tier)
    .sort((a, b) => state.concepts.indexOf(a) - state.concepts.indexOf(b))

  const isEmpty = tierConcepts.length === 0
  const tierConfig = TIER_CONFIGS.find(t => t.id === tier)

  // Alternate row backgrounds
  const rowBg = index % 2 === 0 ? 'var(--color-surface)' : 'var(--color-base)'

  // Make the entire row a droppable area (covers badge + drop zone)
  const { setNodeRef, isOver } = useDroppable({ id: tier })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'tier-row',
        index % 2 === 0 && 'tier-row-even',
        index % 2 === 1 && 'tier-row-odd',
        isOver && 'active'
      )}
      style={{ backgroundColor: rowBg }}
      role="list"
      aria-label={`Tier ${tier}`}
      data-tier={tier}
    >
      {/* Tier Badge - vertical rail */}
      <TierBadge tier={tier} style={{ backgroundColor: tierConfig?.color }} />

      {/* Drop Zone with Sortable Context */}
      <SortableContext
        items={tierConcepts.map(c => c.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          className={cn(
            'tier-drop-zone',
            isEmpty && 'empty'
          )}
          data-tier={tier}
          role="list"
          aria-label={`Tier ${tier} drop zone`}
        >
          {tierConcepts.map((concept, conceptIndex) => (
            <ConceptCard key={concept.id} concept={concept} index={conceptIndex} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}

