import { useRef } from 'react'
import { Header } from '@/components/Header/Header'
import { TierBoard } from '@/components/TierBoard/TierBoard'
import { UnrankedPool } from '@/components/UnrankedPool/UnrankedPool'
import { ActionBar } from '@/components/ActionBar/ActionBar'
import { DetailPanel } from '@/components/DetailPanel/DetailPanel'
import { Container } from './Container'
import { DndContext, rectIntersection, DragOverlay } from '@dnd-kit/core'
import { useDragAndDrop } from '@/hooks/useDragAndDrop'
import { useTierList } from '@/hooks/useTierList'
import { cn } from '@/utils/cn'
import type { Concept } from '@/types'

export const MainLayout = () => {
  const { sensors, handleDragStart, handleDragOver, handleDragEnd } = useDragAndDrop()
  const { state } = useTierList()
  const tierBoardRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-base font-mono">
      <Header />
      <main>
        <Container>
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            collisionDetection={rectIntersection}
          >
            <div className="space-y-6">
              <TierBoard ref={tierBoardRef} />
              <UnrankedPool />
              <ActionBar tierBoardRef={tierBoardRef} />
            </div>

            <DragOverlay>
              {/* @ts-ignore - DragOverlay render prop type is complex */}
              {({ active }) => {
                if (!active) return null
                const concept = state.concepts.find((c: Concept) => c.id === active.id)
                if (!concept) return null
                return (
                  <div
                    className={cn(
                      'concept-chip dragging',
                      'opacity-60'
                    )}
                    style={{
                      boxShadow: 'var(--shadow-drag)',
                      minWidth: '160px',
                      maxWidth: '240px',
                      transform: 'rotate(1deg)',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="drag-handle">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <line x1="9" y1="4" x2="9" y2="20" />
                          <line x1="15" y1="4" x2="15" y2="20" />
                        </svg>
                      </span>
                      <span className="text-text-muted truncate">{concept.name}</span>
                    </div>
                  </div>
                )
              }}
            </DragOverlay>
          </DndContext>
        </Container>
      </main>
      <DetailPanel />
    </div>
  )
}