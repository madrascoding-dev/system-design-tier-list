export type TierId = 'S' | 'A' | 'B' | 'C' | 'D'
export type Location = TierId | 'unranked'

export interface TierConfig {
  id: TierId
  label: string
  color: string
  colorText: string
  bgColor: string
  borderColor: string
  order: number
}

export interface Concept {
  id: string
  name: string
  tier: Location
  description: string
  useCases: string[]
  tools: string[]
}

export interface TierListState {
  concepts: Concept[]
  selectedConceptId: string | null
}

export type TierListAction =
  | { type: 'INITIALIZE'; payload: Concept[] }
  | { type: 'MOVE_CONCEPT'; payload: { conceptId: string; targetTier: Location; index?: number } }
  | { type: 'REORDER_WITHIN_TIER'; payload: { tierId: TierId; conceptIds: string[] } }
  | { type: 'RESET' }
  | { type: 'SELECT_CONCEPT'; payload: string | null }
  | { type: 'SET_CONCEPTS'; payload: Concept[] }