import React, { useReducer, useCallback, type ReactNode } from 'react'
import { type User, type ThemeConfig, type LanguageConfig } from '../types'
import { AVAILABLE_LANGUAGES } from '../config/languages'
import { AppContext } from './use-app'

// App State Interface
interface AppState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  theme: ThemeConfig
  language: LanguageConfig
  sidebarOpen: boolean
}

// Actions
type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_THEME'; payload: Partial<ThemeConfig> }
  | { type: 'SET_LANGUAGE'; payload: LanguageConfig }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR'; payload: boolean }
  | { type: 'LOGOUT' }

// Initial State
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  theme: {
    mode: 'light',
    primaryColor: '#3b82f6',
    borderRadius: 'medium',
    fontSize: 'medium'
  },
  language: AVAILABLE_LANGUAGES[0], // Default to English
  sidebarOpen: true
}

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        loading: false,
        error: null
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case 'SET_THEME':
      return {
        ...state,
        theme: { ...state.theme, ...action.payload }
      }
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload
      }
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen
      }
    case 'SET_SIDEBAR':
      return {
        ...state,
        sidebarOpen: action.payload
      }
    case 'LOGOUT':
      return {
        ...initialState,
        theme: state.theme,
        language: state.language
      }
    default:
      return state
  }
}

// Context
export interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  // Helper functions
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setTheme: (theme: Partial<ThemeConfig>) => void
  setLanguage: (language: LanguageConfig) => void
  toggleSidebar: () => void
  setSidebar: (open: boolean) => void
  logout: () => void
}

// Provider Component
interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Helper functions
  const setUser = useCallback((user: User | null) => {
    dispatch({ type: 'SET_USER', payload: user })
  }, [])

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading })
  }, [])

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error })
  }, [])

  const setTheme = useCallback((theme: Partial<ThemeConfig>) => {
    dispatch({ type: 'SET_THEME', payload: theme })
  }, [])

  const setLanguage = useCallback((language: LanguageConfig) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language })
  }, [])

  const toggleSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' })
  }, [])

  const setSidebar = useCallback((open: boolean) => {
    dispatch({ type: 'SET_SIDEBAR', payload: open })
  }, [])

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' })
  }, [])

  const value: AppContextType = {
    state,
    dispatch,
    setUser,
    setLoading,
    setError,
    setTheme,
    setLanguage,
    toggleSidebar,
    setSidebar,
    logout
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
