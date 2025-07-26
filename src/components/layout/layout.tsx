import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'
import { cn } from '../../utils'
import Sidebar from './sidebar'
import { useApp } from '../../contexts/use-app'

const Layout: React.FC = () => {
  const { state } = useApp()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className={cn(
          'transition-all duration-300',
          state.sidebarOpen ? 'ml-64' : 'ml-16'
        )}
      >
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
