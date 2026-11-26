import { useContext } from 'react'
import { TierListContext } from '@/context/TierListContext'
import type { TierListContextValue } from '@/context/TierListContext'

export function useTierList(): TierListContextValue {
  const context = useContext(TierListContext)
  if (!context) {
    throw new Error('useTierList must be used within a TierListProvider')
  }
  return context
}