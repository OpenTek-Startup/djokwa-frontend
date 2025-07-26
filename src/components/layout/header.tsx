import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import { useApp } from '../../contexts/use-app'
import { storage } from '../../utils'

const Header: React.FC = () => {
  const { t } = useTranslation('dashboard')
  const { state, logout: appLogout } = useApp()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = () => {
    // Clear user from storage and context
    storage.clear()
    appLogout()
    // No need to navigate here, the ProtectedRoute in App.tsx will handle it.
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
      {/* Search Bar */}
      <div className="flex items-center">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t('header.searchPlaceholder')}
            className="w-64 rounded-lg border border-transparent bg-gray-100 py-2 pl-10 pr-4 text-sm text-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Right Side: Notifications & User Menu */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
          <span className="sr-only">View notifications</span>
          <BellIcon className="size-6" aria-hidden="true" />
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <div>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
              <UserCircleIcon className="size-8 text-gray-400" />
              {state.user && (
                <span className="ml-2 mr-1 hidden text-sm font-medium text-gray-700 sm:block">
                  {`${state.user.firstName} ${state.user.lastName}`}
                </span>
              )}
              <ChevronDownIcon className="hidden size-4 text-gray-400 sm:block" />
            </button>
          </div>

          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabIndex={-1}
            >
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-0"
              >
                <UserCircleIcon className="mr-2 size-5 text-gray-500" />
                {t('header.profile')}
              </a>
              <a
                href="/settings"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-1"
              >
                <CogIcon className="mr-2 size-5 text-gray-500" />
                {t('header.settings')}
              </a>
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-2"
              >
                <ArrowRightOnRectangleIcon className="mr-2 size-5 text-gray-500" />
                {t('header.logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
