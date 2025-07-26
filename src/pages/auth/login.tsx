import React, { useState, type FormEvent, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApp } from '../../contexts/use-app'
import { storage } from '../../utils'
import { type User, UserRole } from '../../types'
import {
  AcademicCapIcon,
  AtSymbolIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline'

const Login: React.FC = () => {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const location = useLocation()
  const { setUser, state } = useApp()

  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (state.isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [state.isAuthenticated, navigate])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError(t('login.errors.emptyFields'))
      return
    }

    setLoading(true)

    // --- Mock Authentication ---
    // In a real app, you would make an API call here.
    // For example: const user = await api.auth.login({ email, password });
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@example.com',
          role: UserRole.ADMIN,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        storage.set('user', mockUser)
        setUser(mockUser)

        const from = location.state?.from?.pathname || '/dashboard'
        navigate(from, { replace: true })
      } else {
        setError(t('login.errors.invalidCredentials'))
      }
      setLoading(false)
    }, 1000)
    // --- End Mock Authentication ---
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background/50">
      <div className="w-full max-w-md space-y-6 rounded-lg p-8 shadow-md">
        <div className="flex flex-col items-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary-600">
            <AcademicCapIcon className="size-8 text-foreground" />
          </div>
          <h2 className="text-center text-2xl font-bold text-foreground/90">
            {t('login.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-foreground/60">
            {t('login.subtitle')}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              {t('login.emailLabel')}
            </label>
            <div className="relative">
              <AtSymbolIcon className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-foreground/40" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 shadow-sm placeholder:text-foreground/40 focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                placeholder={t('login.emailPlaceholder')}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              {t('login.passwordLabel')}
            </label>
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-foreground/40" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 shadow-sm placeholder:text-foreground/40 focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                placeholder={t('login.passwordPlaceholder')}
              />
            </div>
          </div>

          {error && <p className="text-center text-sm text-red-600">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-primary-300"
            >
              {loading ? t('login.loadingButton') : t('login.submitButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
