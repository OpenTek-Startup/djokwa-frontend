import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../../components/layout/nav-bar'
import Footer from '../../components/layout/footer'

const LayoutGuest: React.FC = () => {
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

export default LayoutGuest
