import React from 'react'
import { Download, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useTierList } from '@/hooks/useTierList'
import { usePngExport } from '@/hooks/usePngExport'
import { cn } from '@/utils/cn'

export const ActionBar = () => {
  const { resetAll, state } = useTierList()
  const { exportAsPng } = usePngExport()
  const tierBoardRef = React.useRef<HTMLDivElement>(null)

  const hasRankedConcepts = state.concepts.some((c) => c.tier !== 'unranked')

  const handleDownload = React.useCallback(async () => {
    if (!tierBoardRef.current) return
    try {
      await exportAsPng(tierBoardRef.current)
    } catch (error) {
      console.error('Failed to download PNG:', error)
    }
  }, [exportAsPng])

  // Listen for export event from header
  React.useEffect(() => {
    const handleExport = () => handleDownload()
    window.addEventListener('export-png', handleExport)
    return () => window.removeEventListener('export-png', handleExport)
  }, [handleDownload])

  const tierCounts = ['S', 'A', 'B', 'C', 'D'].map(tier => ({
    tier,
    count: state.concepts.filter((c) => c.tier === tier).length,
  }))
  const unrankedCount = state.concepts.filter((c) => c.tier === 'unranked').length

  return (
    <div
      ref={tierBoardRef}
      className={cn('stats-bar')}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-wrap items-center gap-4 flex-1 min-w-0">
        {tierCounts.map(({ tier, count }) => (
          <span key={tier} className="stat-item">
            <span
              className="stat-dot"
              style={{ backgroundColor: `var(--color-tier-${tier.toLowerCase()})` }}
              aria-hidden="true"
            />
            <span className="stat-value">{count}</span>
          </span>
        ))}
        <span className="stat-item">
          <span className="stat-value">Unranked: {unrankedCount}</span>
        </span>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <Button
          variant="secondary"
          size="sm"
          onClick={resetAll}
          disabled={!hasRankedConcepts}
          aria-label="Clear all rankings"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          Clear All
        </Button>

        <Button
          variant="primary"
          size="sm"
          onClick={handleDownload}
          disabled={!hasRankedConcepts}
          aria-label="Export tier list as PNG"
        >
          <Download className="w-4 h-4" aria-hidden="true" />
          Export PNG
        </Button>
      </div>
    </div>
  )
}