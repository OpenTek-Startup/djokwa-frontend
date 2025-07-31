import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  HomeIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon,
  ChartBarIcon,
  CogIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { cn } from '../../utils'
import { useApp } from '../../contexts/use-app'
import { ThemeSwitcher } from 'components/common/theme-switcher'
import { LanguageSwitcher } from 'components/common/language-switcher'
import IconSprite from 'components/ui/iconSprite'

interface NavigationItem {
  key: string
  icon: React.ComponentType<{ className?: string }>
  path: string
}

const Sidebar: React.FC = () => {
  const { t } = useTranslation('dashboard')
  const { state, toggleSidebar } = useApp()
  const location = useLocation()

  const navigationItems: NavigationItem[] = [
    {
      key: 'dashboard',
      icon: HomeIcon,
      path: '/dashboard'
    },
    {
      key: 'students',
      icon: AcademicCapIcon,
      path: '/students'
    },
    {
      key: 'teachers',
      icon: UserGroupIcon,
      path: '/teachers'
    },
    {
      key: 'courses',
      icon: BookOpenIcon,
      path: '/courses'
    },
    {
      key: 'reports',
      icon: ChartBarIcon,
      path: '/reports'
    },
    {
      key: 'settings',
      icon: CogIcon,
      path: '/settings'
    }
  ]

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Overlay for mobile */}
      {state.sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-foreground bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed left-0 top-0 z-30 h-full bg-background border-r border-gray-200 transition-all duration-300 shadow-sm',
          state.sidebarOpen ? 'w-64' : 'w-16'
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <div
            className={cn(
              'flex items-center transition-opacity duration-300 cursor-pointer',
              state.sidebarOpen ? 'opacity-100' : 'opacity-0'
            )}
            onClick={() => (window.location.href = '/')}
          >
            <div className="flex size-8 items-center justify-center rounded-lg ">
              <IconSprite name="djokwa" />
            </div>
            {state.sidebarOpen && (
              <span className="ml-3 text-xl font-bold text-foreground/90">
                DJOKWA
              </span>
            )}
          </div>

          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-1.5 transition-colors hover:bg-foreground/10"
          >
            {state.sidebarOpen ? (
              <ChevronLeftIcon className="size-5 text-foreground/50" />
            ) : (
              <ChevronRightIcon className="size-5 text-foreground/50" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 px-3 py-4">
          {navigationItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              className={cn(
                'flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group relative',
                isActive(item.path)
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-foreground/70 hover:bg-foreground/10'
              )}
            >
              <item.icon className="size-6" />
              {state.sidebarOpen && (
                <span className="ml-3 text-sm font-medium">
                  {t(`navigation.${item.key}`)}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center justify-center space-x-2 border-t border-foreground/20 p-4">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </>
  )
}

export default Sidebar
