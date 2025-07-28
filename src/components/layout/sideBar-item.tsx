/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '../../utils'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
export interface iSideBarItemsProps extends NavLinkProps {
  Icon?: any // the icon of the side bar element
  children: React.ReactNode // this will be name or the value of the sidebar content,
  animateClassName?: string
}
const SideBarItem = ({
  Icon,
  children,
  animateClassName,
  ...props
}: iSideBarItemsProps) => {
  // the baseclass holds the classes when the sidebar items is not active
  // im not really good at colors but you can change the colors to match the design
  const baseClassName = `block border py-2.5 px-4  group !relative
 mb-5 mx-2 rounded-lg hover:bg-[var(--color-primary-variant)] transition-all duration-300
`
  // when the sidebar item is active it appends to the baseclass by concatinating the base class and some overide classes
  const activeClassName = `${baseClassName} bg-[var(--color-primary-variant)] shadow-sm active`
  return (
    <NavLink
      {...props}
      className={({ isActive }) => (isActive ? activeClassName : baseClassName)}
    >
      {({ isActive }: { isActive: boolean }) => (
        <>
          <div className="flex items-center justify-start  space-x-4  ">
            <span>
              <Icon width={20} height={20} />
            </span>
            <h2 className="leading-tight text-[var(--color-light)] first-letter:uppercase group-[.active]:font-black group-[.active]:text-background">
              {children}
            </h2>
          </div>
          <AnimatePresence>
            {isActive && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 }
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 }
                }}
                // layoutId
                layoutId="hoverBackground"
                className={cn(
                  'absolute left-0 right-0 bottom-0 h-[2px] w-full bg-blue-500 rounded-lg inset-0 size-full bg-purple-600/20',
                  animateClassName
                )}
              ></motion.span>
            )}
          </AnimatePresence>
        </>
      )}
    </NavLink>
  )
}

export default SideBarItem
