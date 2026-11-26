import { TierRow } from './TierRow'
import { TIER_IDS } from '@/data/tierConfig'
import { cn } from '@/utils/cn'

export const TierBoard = () => {
  return (
    <div className={cn('tier-board animate-stagger-in')} role="list" aria-label="Tier list board">
      {TIER_IDS.map((tier, index) => (
        <TierRow key={tier} tier={tier} index={index} />
      ))}
    </div>
  )
}