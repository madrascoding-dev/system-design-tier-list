import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { useTierList } from '@/hooks/useTierList'
import { cn } from '@/utils/cn'
import type { Concept } from '@/types'
import type { DraggableAttributes } from '@dnd-kit/core'

interface ConceptCardProps {
  concept: Concept
  index: number
}

export const ConceptCard = ({ concept, index }: ConceptCardProps) => {
  const { state, selectConcept } = useTierList()
  const isSelected = state.selectedConceptId === concept.id

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: concept.id })

  // Transform style for the main chip (the element that moves)
  const chipStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  }

  // Extract draggable style (touchAction: none) from attributes for the button
  const draggableStyle = (attributes as DraggableAttributes & { style?: React.CSSProperties }).style

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    selectConcept(concept.id)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      selectConcept(concept.id)
    }
  }

  // Debug: Log when drag handle mouseDown fires, AND call draggable's onMouseDown
  const handleDragMouseDown = (e: React.MouseEvent) => {
    console.log('Drag handle mouseDown:', concept.name)
    // Call the draggable's onMouseDown to ensure drag activation works
    listeners?.onMouseDown?.(e)
  }

  // Remove style from attributes to avoid conflicts
  const { style: _unused, ...restAttributes } = attributes as DraggableAttributes & { style?: React.CSSProperties }

  return (
    <div
      ref={setNodeRef}
      style={chipStyle}
      className={cn(
        'concept-chip',
        isDragging && 'dragging',
        isSelected && 'selected'
      )}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={concept.name}
      data-index={index}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center gap-2 w-full">
        {/* Drag Handle - THIS is the draggable element (has attributes/listeners) */}
        <button
          {...restAttributes}
          {...listeners}
          style={draggableStyle}
          className="drag-handle"
          data-drag-handle
          aria-label={`Drag ${concept.name}`}
          tabIndex={-1}
          onMouseDown={handleDragMouseDown}
        >
          <GripVertical className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Concept Name - click to open detail */}
        <span
          className="truncate flex-1 min-w-0 cursor-pointer select-none"
          onClick={handleContentClick}
        >
          {concept.name}
        </span>
      </div>
    </div>
  )
}