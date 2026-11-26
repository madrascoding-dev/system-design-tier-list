import { createContext, useReducer, type ReactNode } from 'react'
import type { TierListState, TierListAction, Concept, Location, TierId } from '@/types'
import { INITIAL_CONCEPTS } from '@/data/concepts'

const initialState: TierListState = {
  concepts: INITIAL_CONCEPTS,
  selectedConceptId: null,
}

function tierListReducer(state: TierListState, action: TierListAction): TierListState {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, concepts: action.payload }

    case 'MOVE_CONCEPT': {
      const { conceptId, targetTier, index } = action.payload
      const concepts = state.concepts.map((c) =>
        c.id === conceptId ? { ...c, tier: targetTier } : c
      )

      if (index !== undefined && targetTier !== 'unranked') {
        const targetTierConcepts = concepts.filter((c) => c.tier === targetTier)
        const otherConcepts = concepts.filter((c) => c.tier !== targetTier)
        const movedConcept = targetTierConcepts.find((c) => c.id === conceptId)!
        const remaining = targetTierConcepts.filter((c) => c.id !== conceptId)
        remaining.splice(index, 0, movedConcept)
        return { ...state, concepts: [...otherConcepts, ...remaining] }
      }

      return { ...state, concepts }
    }

    case 'REORDER_WITHIN_TIER': {
      const { tierId, conceptIds } = action.payload
      const tierConcepts = state.concepts.filter((c) => c.tier === tierId)
      const otherConcepts = state.concepts.filter((c) => c.tier !== tierId)

      const reordered = conceptIds
        .map((id) => tierConcepts.find((c) => c.id === id))
        .filter((c): c is Concept => c !== undefined)

      const remaining = tierConcepts.filter((c) => !conceptIds.includes(c.id))
      return { ...state, concepts: [...otherConcepts, ...reordered, ...remaining] }
    }

    case 'RESET':
      return {
        ...state,
        concepts: state.concepts.map((c) => ({ ...c, tier: 'unranked' })),
        selectedConceptId: null,
      }

    case 'SELECT_CONCEPT':
      return { ...state, selectedConceptId: action.payload }

    case 'SET_CONCEPTS':
      return { ...state, concepts: action.payload }

    default:
      return state
  }
}

export interface TierListContextValue {
  state: TierListState
  dispatch: React.Dispatch<TierListAction>
  moveConcept: (conceptId: string, targetTier: Location, index?: number) => void
  reorderInTier: (tierId: TierId, conceptIds: string[]) => void
  resetAll: () => void
  selectConcept: (conceptId: string | null) => void
}

const TierListContext = createContext<TierListContextValue | null>(null)

export function TierListProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tierListReducer, initialState)

  const moveConcept = (conceptId: string, targetTier: Location, index?: number) => {
    dispatch({ type: 'MOVE_CONCEPT', payload: { conceptId, targetTier, index } })
  }

  const reorderInTier = (tierId: TierId, conceptIds: string[]) => {
    dispatch({ type: 'REORDER_WITHIN_TIER', payload: { tierId, conceptIds } })
  }

  const resetAll = () => {
    dispatch({ type: 'RESET' })
  }

  const selectConcept = (conceptId: string | null) => {
    dispatch({ type: 'SELECT_CONCEPT', payload: conceptId })
  }

  return (
    <TierListContext.Provider
      value={{
        state,
        dispatch,
        moveConcept,
        reorderInTier,
        resetAll,
        selectConcept,
      }}
    >
      {children}
    </TierListContext.Provider>
  )
}

export { TierListContext }