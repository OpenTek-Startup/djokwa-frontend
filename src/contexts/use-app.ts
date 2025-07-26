import { useContext, createContext } from 'react'
import type { AppContextType } from './app-context'

export const AppContext = createContext<AppContextType | undefined>(undefined)

// Custom Hook
export const useApp = (): AppContextType => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
