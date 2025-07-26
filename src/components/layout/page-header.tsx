import React from 'react'

interface PageHeaderProps {
  title: string
  description: string
  children?: React.ReactNode
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  children
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center sm:gap-0">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {children && (
        <div className="flex items-center space-x-2">{children}</div>
      )}
    </div>
  )
}

export default PageHeader
