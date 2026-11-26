import { Badge } from '@/components/ui/Badge'
import type { TierId } from '@/types'

interface TierBadgeProps {
  tier: TierId
  style?: React.CSSProperties
}

export const TierBadge = ({ tier, style }: TierBadgeProps) => {
  return (
    <Badge tier={tier} aria-label={`Tier ${tier}`} style={style} />
  )
}