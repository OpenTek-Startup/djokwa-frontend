import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './nav-bar'
import Footer from './footer'

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background/50">
      <div>
        <Navbar />
        <main className="px-6 py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
