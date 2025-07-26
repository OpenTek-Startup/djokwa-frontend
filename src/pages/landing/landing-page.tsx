import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { useApp } from '../../contexts/use-app'
import { AcademicCapIcon } from '@heroicons/react/24/solid'

const LandingPage: React.FC = () => {
  const { state } = useApp()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-gray-800">
      <div className="p-8 text-center">
        <div className="mb-6 flex items-center justify-center">
          <AcademicCapIcon className="size-16 text-primary-600" />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
          Welcome to DJOKWA School
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl">
          Your modern, all-in-one solution for managing students, teachers, and
          courses with ease and efficiency.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          {state.isAuthenticated ? (
            <Button asChild size="lg">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <Button asChild size="lg">
              <Link to="/login">Login to Your Account</Link>
            </Button>
          )}
        </div>
      </div>
      <footer className="absolute bottom-0 py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} DJOKWA. All Rights Reserved.
      </footer>
    </div>
  )
}

export default LandingPage
