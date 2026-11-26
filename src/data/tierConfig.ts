import type { TierConfig, TierId } from '../types'

// Tier colors optimized for dark backgrounds
export const TIER_CONFIGS: TierConfig[] = [
  { id: 'S', label: 'S', color: '#FF6B6B', colorText: '#0D1117', bgColor: '#FF6B6B', borderColor: '#FF6B6B', order: 0 },
  { id: 'A', label: 'A', color: '#FFD93D', colorText: '#0D1117', bgColor: '#FFD93D', borderColor: '#FFD93D', order: 1 },
  { id: 'B', label: 'B', color: '#6BCB77', colorText: '#0D1117', bgColor: '#6BCB77', borderColor: '#6BCB77', order: 2 },
  { id: 'C', label: 'C', color: '#4D96FF', colorText: '#FFFFFF', bgColor: '#4D96FF', borderColor: '#4D96FF', order: 3 },
  { id: 'D', label: 'D', color: '#A0AEC0', colorText: '#0D1117', bgColor: '#A0AEC0', borderColor: '#A0AEC0', order: 4 },
]

export const TIER_IDS: TierId[] = ['S', 'A', 'B', 'C', 'D']

export const getTierConfig = (id: TierId): TierConfig | undefined => {
  return TIER_CONFIGS.find(tier => tier.id === id)
}

export const getTierColor = (id: TierId): string => {
  return getTierConfig(id)?.color ?? '#A0AEC0'
}

export const getTierTextColor = (id: TierId): string => {
  return getTierConfig(id)?.colorText ?? '#FFFFFF'
}

export const getTierBgColor = (id: TierId): string => {
  return getTierConfig(id)?.bgColor ?? '#A0AEC0'
}

export const getTierBorderColor = (id: TierId): string => {
  return getTierConfig(id)?.borderColor ?? '#A0AEC0'
}