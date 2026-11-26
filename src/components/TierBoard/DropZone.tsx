import { useDroppable } from '@dnd-kit/core'
import { cn } from '@/utils/cn'
import type { TierId } from '@/types'

interface DropZoneProps {
  tier: TierId
  children: React.ReactNode
  isEmpty: boolean
}

export const DropZone = ({ tier, children, isEmpty }: DropZoneProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: tier })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'tier-drop-zone',
        isOver && 'active',
        isEmpty && 'empty'
      )}
      data-tier={tier}
      role="list"
      aria-label={`Tier ${tier} drop zone`}
    >
      {children}
    </div>
  )
}