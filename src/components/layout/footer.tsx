import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
// import './template.css'
import Heading from 'components/ui/heading'
import { Button } from 'components/ui/button'
import IconSprite from 'components/ui/iconSprite'
import SearchComponent from 'components/ui/search'

const Footer = () => {
  // change the logo on the searchcomponent and fix the color later
  return (
    <div
      className="bg-foreground/10 px-4 pb-24 pt-10"
      style={{
        borderTop: '1px solid gray'
      }}
    >
      {/* start here */}
      <div className="mx-auto items-center justify-between gap-x-4 md:flex ">
        <Link to="/" className="flex-none ">
          <Heading className="my-6 flex flex-col text-center font-serif text-xl uppercase">
            Icon{' '}
            {/* <IconRepository.DjokwaIcon className="mx-auto  w-full" /> */}
          </Heading>
        </Link>
        <div className="flex flex-1 items-center justify-center gap-x-2 ">
          <SearchComponent
            className=""
            placeholder="Enter Email Address"
            containerClassName="ring-[1px] rounded-sm ring-gray-600 mx-0 !ml-0 flex-1 w-[calc(100%-7rem)]"
          />
          <Button className="w-28 bg-[#9747ff]" variant={'default'}>
            subscribe
          </Button>
        </div>
      </div>
      {/* end here */}

      <div className="container m-auto grid grid-cols-[repeat(auto-fit,minmax(min(12rem,calc(100%-60px)),_1fr))] items-start justify-between gap-x-4 gap-y-6">
        <Heading className="col-span-full mb-2 w-full text-center text-2xl font-semibold lg:col-end-auto lg:text-start">
          Follow up and management made easy for you
        </Heading>

        <div>
          <Heading className="mb-4 text-xl font-semibold">Contact Us</Heading>
          <ol className=" space-y-1 ">
            <li className="flex items-center gap-x-1">
              <IconSprite name="phone" height="20px" width="20px" />
              <a href="tel:66266326" className="ml-1 font-medium">
                66266322
              </a>
            </li>
            <li className="flex items-center gap-x-1">
              <Mail size={20} />
              <a href="tel:66266326" className="ml-1 font-medium">
                example@gmail.example
              </a>
            </li>
          </ol>
        </div>
        <div>
          <Heading className="mb-4 text-xl font-semibold">Company</Heading>
          <ol className=" space-y-1 ">
            <li className="flex items-center gap-x-1">
              <Link to="/about">About Us</Link>
            </li>
            <li className="flex items-center gap-x-1">
              <Link to="/contact">Testimonials</Link>
            </li>
            <li className="flex items-center gap-x-1">
              <Link to="services">Services</Link>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default Footer
