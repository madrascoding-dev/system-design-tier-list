import { useEffect } from 'react'
import { X } from 'lucide-react'
import { useTierList } from '@/hooks/useTierList'
import { cn } from '@/utils/cn'

interface DetailSectionProps {
  title: string
  children: React.ReactNode
}

const DetailSection = ({ title, children }: DetailSectionProps) => (
  <div className="mb-6">
    <h3 className="detail-section-title">{title}</h3>
    <div className="detail-section-body">{children}</div>
  </div>
)

export const DetailPanel = () => {
  const { state, selectConcept } = useTierList()
  const selectedConcept = state.concepts.find(c => c.id === state.selectedConceptId)
  const isOpen = !!state.selectedConceptId

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        selectConcept(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectConcept])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!selectedConcept) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'detail-backdrop',
          isOpen && 'open'
        )}
        onClick={() => selectConcept(null)}
        aria-hidden="true"
      />

      {/* Detail Panel Drawer */}
      <aside
        className={cn(
          'detail-panel',
          isOpen && 'open'
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 id="detail-title" className="text-subheading text-text">
              {selectedConcept.name}
            </h2>
            <button
              onClick={() => selectConcept(null)}
              className="p-1 text-text-muted hover:text-text transition-colors rounded-sm hover:bg-surface-hover"
              aria-label="Close detail panel"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <DetailSection title="DESCRIPTION">
              <p>{selectedConcept.description}</p>
            </DetailSection>

            <DetailSection title="USE CASES">
              <ul>
                {selectedConcept.useCases.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </DetailSection>

            <DetailSection title="TOOLS">
              <div className="flex flex-wrap gap-2">
                {selectedConcept.tools.map((tool, index) => (
                  <span
                    key={index}
                    className="tool-chip"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </DetailSection>
          </div>
        </div>
      </aside>
    </>
  )
}