import React, {
  useReducer,
  useCallback,
  type ReactNode,
  useEffect
} from 'react'
import { type ThemeConfig, type LanguageConfig } from '../types'
import { AVAILABLE_LANGUAGES } from '../config/languages'
import { AppContext } from './use-app'

// --- Cookie utility functions ---
const setCookie = (name: string, value: string, days: number): void => {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  // Add SameSite=Lax for better security
  document.cookie = `${name}=${value || ''}${expires}; path=/; SameSite=Lax`
}

const getCookie = (name: string): string | null => {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

const removeCookie = (name: string): void => {
  document.cookie = `${name}=; Max-Age=-99999999; path=/; SameSite=Lax`
}

// App State Interface
export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  phone?: string
  role:
    | 'student'
    | 'teacher'
    | 'admin'
    | 'parent'
    | 'accountant'
    | 'principal'
    | 'driver'
}
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
  | { type: 'INITIALIZE' }

// Initial State
const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  loading: true,
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
      if (action.payload) {
        setCookie('user', JSON.stringify(action.payload), 7) // Store user for 7 days
      } else {
        removeCookie('user')
      }
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
      try {
        setCookie(
          'theme',
          JSON.stringify({ ...state.theme, ...action.payload }),
          365
        )
      } catch (e) {
        console.error('Failed to set theme cookie', e)
      }
      return {
        ...state,
        theme: { ...state.theme, ...action.payload }
      }
    case 'SET_LANGUAGE':
      try {
        setCookie('language', JSON.stringify(action.payload), 365)
      } catch (e) {
        console.error('Failed to set language cookie', e)
      }
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
      removeCookie('user')
      removeCookie('token') // Also remove token
      return {
        ...initialState,
        loading: false,
        theme: state.theme,
        language: state.language
      }
    case 'INITIALIZE': {
      try {
        const userCookie = getCookie('user')
        const themeCookie = getCookie('theme')
        const languageCookie = getCookie('language')
        return {
          ...initialState,
          user: userCookie ? JSON.parse(userCookie) : null,
          isAuthenticated: !!userCookie,
          theme: themeCookie ? JSON.parse(themeCookie) : initialState.theme,
          language: languageCookie
            ? JSON.parse(languageCookie)
            : initialState.language,
          loading: false
        }
      } catch (error) {
        return { ...initialState, loading: false }
      }
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

  useEffect(() => {
    dispatch({ type: 'INITIALIZE' })
  }, [])

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
    // If you store tokens in HttpCommon headers, clear it here.
    // For example: HttpCommon.defaults.headers.common['Authorization'] = '';
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
