import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { useApp } from '../../contexts/use-app'
import { AcademicCapIcon } from '@heroicons/react/24/solid'
import Hero from 'components/guest/Hero'
import Statistics from 'components/guest/statistics'
import HowItWorks from 'components/guest/HowItWorks'
import { AnimatePresence, motion } from 'framer-motion'

const LandingPage: React.FC = () => {
  const { state } = useApp()

  return (
    <>
      <div className="container flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
        <AnimatePresence>
          <motion.div
            key={location.pathname}
            initial={{
              opacity: 0.5,
              y: 100
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              type: 'tween',
              ease: 'linear',
              duration: 0.5
            }}
          >
            <div className="p-8 text-center">
              <div className="mb-6 flex items-center justify-center">
                <AcademicCapIcon className="size-16 text-primary-600" />
              </div>
              <h1 className="text-5xl font-extrabold tracking-tight text-foreground/90 sm:text-6xl md:text-7xl">
                Welcome to DJOKWA School
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/60 sm:text-xl">
                Your modern, all-in-one solution for managing students,
                teachers, and courses with ease and efficiency.
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
            <Hero />
            <Statistics />
            <HowItWorks />
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}

export default LandingPage
