import React from 'react'
import { TierListProvider } from './context/TierListContext'
import { MainLayout } from './components/Layout/MainLayout'

function App() {
  return (
    <TierListProvider>
      <MainLayout />
    </TierListProvider>
  )
}

export default App