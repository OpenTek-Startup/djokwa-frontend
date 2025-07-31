import React from 'react'
import { Outlet } from 'react-router-dom'
import Hero from 'components/guest/Hero'
import Statistics from 'components/guest/statistics'
import HowItWorks from 'components/guest/HowItWorks'
import { AnimatePresence, motion } from 'framer-motion'

const LandingPage: React.FC = () => {
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
