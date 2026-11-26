import React from 'react'
import { cn } from '@/utils/cn'
import { getTierColor, getTierTextColor } from '@/data/tierConfig'
import type { TierId } from '@/types'

interface BadgeProps {
  tier: TierId
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ tier, className, style, children }, ref) => {
    const bgColor = getTierColor(tier)
    const textColor = getTierTextColor(tier)

    return (
      <span
        ref={ref}
        className={cn('tier-badge', className)}
        style={{
          backgroundColor: bgColor,
          color: textColor,
          ...style,
        }}
      >
        {children ?? tier}
      </span>
    )
  }
)

Badge.displayName = 'Badge'