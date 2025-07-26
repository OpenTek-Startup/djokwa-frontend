import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { storage } from './utils'

import type { User, LanguageConfig } from './types'
// Import components (we'll create these next)
import Layout from './components/layout/layout'
import Dashboard from './pages/dashboard/dashboard'
import StudentRoutes from './pages/students/StudentRoutes'
import TeacherRoutes from './pages/teachers/TeacherRoutes'
import CourseRoutes from './pages/courses/CourseRoutes'
import Login from './pages/auth/login'
import LandingPage from './pages/landing/landing-page'
import LoadingSpinner from './components/common/loading-spinner'
import ErrorBoundary from './components/common/error-boundary'

// Import styles
import './styles/globals.css'
import './i18n'
import { AppProvider } from './contexts/app-context'
import { useApp } from './contexts/use-app'

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { state } = useApp()

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

// App Routes Component
const AppRoutes: React.FC = () => {
  const { state } = useApp()

  if (state.loading) {
    return <LoadingSpinner />
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        {StudentRoutes()}
        {TeacherRoutes()}
        {CourseRoutes()}
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

// Main App Component
const AppContent: React.FC = () => {
  const { state, setUser, setLanguage } = useApp()
  const { i18n } = useTranslation()

  useEffect(() => {
    // Initialize app on mount
    const initializeApp = async () => {
      try {
        // Load saved user from localStorage
        const savedUser = storage.get<User>('user')
        if (savedUser) {
          setUser(savedUser)
        }

        // Load saved language preference
        const savedLanguage = storage.get<LanguageConfig>('language')
        if (savedLanguage) {
          setLanguage(savedLanguage)
        }

        // Load saved theme
        const savedTheme = storage.get('theme')
        if (savedTheme) {
          // Apply theme logic here
        }
      } catch (error) {
        console.error('Error initializing app:', error)
      }
    }

    initializeApp()
  }, [setUser, setLanguage, i18n])

  // Save language changes to localStorage
  useEffect(() => {
    storage.set('language', state.language)
    i18n.changeLanguage(state.language.code)
  }, [state.language, i18n])

  // Save theme changes to localStorage
  useEffect(() => {
    const root = window.document.documentElement
    const isDark = state.theme.mode === 'dark'
    root.classList.toggle('dark', isDark)
    storage.set('theme', state.theme)
  }, [state.theme])

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
    </ErrorBoundary>
  )
}

// Root App Component with Provider
const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
