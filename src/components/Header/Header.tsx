import { Button } from '@/components/ui/Button'
import { useTierList } from '@/hooks/useTierList'
import { HelpCircle } from 'lucide-react'

export const Header = () => {
  const { resetAll, state } = useTierList()
  const hasRankedConcepts = state.concepts.some((c) => c.tier !== 'unranked')

  return (
    <header className="app-header" role="banner">
      <div className="header-inner">
        <h1 className="header-title">System Design Tier List</h1>

        <div className="header-actions">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Keyboard shortcuts"
            title="Keyboard shortcuts"
          >
            <HelpCircle className="w-4 h-4" aria-hidden="true" />
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={resetAll}
            disabled={!hasRankedConcepts}
            aria-label="Clear all rankings"
          >
            Clear All
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => window.dispatchEvent(new CustomEvent('export-png'))}
            disabled={!hasRankedConcepts}
            aria-label="Export as PNG"
          >
            Export PNG
          </Button>
        </div>
      </div>
    </header>
  )
}