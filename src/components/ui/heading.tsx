import React from 'react'
import { cn } from '../../utils'

interface IHeadingProps {
  className?: string // the className is optional
  children: React.ReactNode // react children must be passed to the  component
}
// heading element has an in built style for heading but it can be customise   by passing classname to this component
const Heading = ({ children, className, ...props }: IHeadingProps) => {
  return (
    <h2
      {...props}
      className={cn(
        'text-xl font-bricolage sm:text-2xl lg:text-3xl font-medium ',
        className
      )}
    >
      {children}
    </h2>
  )
}

export default Heading
