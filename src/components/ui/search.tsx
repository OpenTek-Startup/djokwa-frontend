import React from 'react'
import { cn } from '../../utils'
import IconSprite from './iconSprite'
import { Input } from './input'

interface iSearch extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: any
}
const SearchComponent = ({
  // className,
  containerClassName,
  ...props
}: iSearch) => {
  return (
    <div
      className={cn(
        'flex max-w-2xl px-4 w-full my-4 mx-auto items-stretch h-10  ',
        containerClassName
      )}
    >
      <span className="flex flex-none items-center justify-center px-2">
        <IconSprite name="search" width="20" height="20px" />
      </span>
      <Input
        placeholder="Search..."
        className="h-full flex-1 border-none bg-transparent pl-4 text-sm outline-none dark:placeholder:text-background"
        {...props}
        defaultValue={''}
      />
    </div>
  )
}

export default SearchComponent
