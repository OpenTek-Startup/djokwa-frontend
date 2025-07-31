// import React from 'react';
// import { NavLink } from 'react-router-dom';

import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'components/ui/button'
import Heading from 'components/ui/heading'
import { LanguageSwitcher } from 'components/common/language-switcher'
import NavItem from 'components/layout/nav-item'
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar'
import SpringModal from 'components/ui/modal'
import { ThemeSwitcher } from 'components/common/theme-switcher'
import useGetLoginUser from 'utils/userUtils'
import IconSprite from 'components/ui/iconSprite'
// import { useDashBoardContext } from '../../../pages/Layout/DashBoardLayout';
// type Props = {}
type iNavProp = {
  name: string
  to: string
}
const navLinks: readonly iNavProp[] = [
  {
    name: 'home',
    to: '/'
  },
  {
    name: 'dashboard',
    to: '/dashboard'
  },
  {
    name: 'about-us',
    to: '/about'
  },
  {
    name: 'contact-us',
    to: '/contact'
  }
]
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const user = useGetLoginUser() // if the user login he will update the state of the user
  // const { user:U } = useDashBoardContext() // doing this will throw an error  because we are trying to use a context outside a provider

  return (
    <>
      <SpringModal className="md:hidden" isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex flex-col space-y-2">
          {navLinks.map((link) => {
            // if (link.name.toLowerCase() == 'dashboard' && user == null) return // dont show dashboard option if user is null
            return (
              <NavItem
                hideSpan
                onClick={() => {
                  setIsOpen(false)
                }}
                className="bg-red-200 px-6 text-foreground"
                to={link.to}
                key={link.to}
              >
                {link.name}
              </NavItem>
            )
          })}
        </div>
        {user ? (
          'user'
        ) : (
          <Button
            className="mx-auto mt-4 block
              w-[min(25rem,calc(100%-2rem))]
              flex-none text-lg uppercase"
            variant={'default'}
          >
            <Link to="login" className="block w-full">
              login
            </Link>
          </Button>
        )}
      </SpringModal>
      <nav className="sticky top-0 z-[1000] flex h-14  w-full bg-background/100 px-4 shadow-sm ">
        <div className="mx-auto flex size-full items-center justify-between">
          <Link to="/">
            <Heading className="my-6 flex flex-col text-center font-serif text-xl uppercase">
              {/* <IconRepository.DjokwaIcon className="mx-auto  w-3/4" /> */}
              <IconSprite name="djokwa" />
            </Heading>
          </Link>
          <div className="flex items-center ">
            <div className="hidden items-center space-x-3 px-4 md:flex">
              {navLinks.map((link) => {
                return (
                  <NavItem
                    className="flex-none text-sm capitalize lg:text-lg"
                    to={link.to}
                    key={link.to}
                  >
                    {link.name}
                  </NavItem>
                )
              })}
              {user ? (
                <Link to="/dashboard">
                  {/* we can redirect the user base on s/he role 
                  e.g 
                  if(user.role === "admin"){
                  //goto  admin dashboard
                  }
                  else(user.role === "student"){
                  //goto  student dashboard
                  }
                  
                  */}
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt={String(user.userId)}
                    />
                    <AvatarFallback>{user.fullname}</AvatarFallback>
                  </Avatar>
                </Link>
              ) : (
                <Button className="flex-none px-6 py-1">
                  <Link to="/login" className="block w-full">
                    login
                  </Link>
                </Button>
              )}
              <ThemeSwitcher className="size-4" containerClassName="lg:w-16" />
            </div>
            <ThemeSwitcher
              className="size-4 "
              containerClassName="w-16 md:hidden"
            />
            <LanguageSwitcher />
            <span
              className="ml-2 flex size-8 items-center justify-center hover:bg-slate-400 hover:ring-1 md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu size={25} />
            </span>
          </div>
        </div>
      </nav>
    </>
  )
}
