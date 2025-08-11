import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { storage } from './utils'
import type { User, LanguageConfig, UserRole } from './types'
import Layout from './pages/admin/layout'
import LoadingSpinner from './components/common/loading-spinner'
import ErrorBoundary from './components/common/error-boundary'
import { getRoutesForRole } from './routes'
import './styles/globals.css'
import './config/i18n'
import { AppProvider } from './contexts/app-context'
import { useApp } from './contexts/use-app'
import NotFoundPage from 'components/common/404'
import { AboutUs, ContactUs, LandingPage } from 'pages/guest'
import { LoginPage } from 'pages/auth/login'
import { BrowserRouter } from 'react-router-dom'
import { RegisterPage } from 'pages/auth/register'
import LayoutGuest from 'pages/guest/layout-guest'

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
      {/* Guest Routes */}
      <Route element={<LayoutGuest />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<h1>Services</h1>} />
        <Route path="/pricing" element={<h1>Pricing</h1>} />
        <Route path="/faq" element={<h1>FAQ</h1>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<h1>Forgot Password</h1>} />
        <Route path="/reset-password" element={<h1>Reset Password</h1>} />
        <Route path="/verify-email" element={<h1>Verify Email</h1>} />
        <Route path="/verify-phone" element={<h1>Verify Phone</h1>} />
      </Route>

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {getRoutesForRole(state.user?.role as UserRole)}
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFoundPage />} />
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
      <BrowserRouter>
        <div className="min-h-screen bg-background/50">
          <AppRoutes />
        </div>
      </BrowserRouter>
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
