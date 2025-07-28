import { NavLink } from 'react-router-dom'
import { iSideBarItemsProps } from './sideBar-item'
import { cn } from '../../utils'
type iNavProps = Omit<iSideBarItemsProps, 'animateClassName' | 'Icon'> & {
  hideSpan?: boolean
}

const NavItem = ({
  children,
  to,

  className,
  hideSpan,

  ...props
}: iNavProps) => {
  return (
    <NavLink
      to={to}
      {...props}
      className={({ isActive }) =>
        cn(
          'text-lg uppercase group text-foreground hover:text-blue-400',
          className,
          isActive && 'active'
        )
      }
    >
      {children}
      {!hideSpan && (
        <span className="mx-auto block  h-[2px] w-0 max-w-[min(80%,30rem)] rounded-full bg-[var(--color-bg-sidebar)] transition-all  duration-500 group-hover:w-full group-[.active]:w-full"></span>
      )}
    </NavLink>
  )
}

export default NavItem
