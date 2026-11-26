import { forwardRef } from 'react'
import { TierRow } from './TierRow'
import { TIER_IDS } from '@/data/tierConfig'
import { cn } from '@/utils/cn'

export const TierBoard = forwardRef<HTMLDivElement, {}>((_props, ref) => {
  return (
    <div
      ref={ref}
      className={cn('tier-board animate-stagger-in')}
      role="list"
      aria-label="Tier list board"
    >
      {TIER_IDS.map((tier, index) => (
        <TierRow key={tier} tier={tier} index={index} />
      ))}
    </div>
  )
})

TierBoard.displayName = 'TierBoard'