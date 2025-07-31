import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
// import './template.css'
import Heading from 'components/ui/heading'
import { Button } from 'components/ui/button'
import IconSprite from 'components/ui/iconSprite'
import SearchComponent from 'components/ui/search'

const Footer = () => {
  const { t } = useTranslation('common')
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
          <Heading className="my-6 flex items-center justify-center gap-2 text-center font-serif text-xl uppercase">
            <IconSprite
              name="djokwa"
              width="40px"
              height="40px"
              className="mx-auto  w-full"
            />
            <span>DJOKWA</span>
          </Heading>
        </Link>
        <div className="flex flex-1 items-center justify-center gap-x-2 ">
          <SearchComponent
            className=""
            placeholder={t('footer.subscribe.placeholder')}
            containerClassName="ring-[1px] rounded-sm ring-gray-600 mx-0 !ml-0 flex-1 w-[calc(100%-7rem)]"
          />
          <Button className="w-28 bg-[#9747ff]" variant={'default'}>
            {t('footer.subscribe.button')}
          </Button>
        </div>
      </div>
      {/* end here */}

      <div className="container m-auto grid grid-cols-[repeat(auto-fit,minmax(min(12rem,calc(100%-60px)),_1fr))] items-start justify-between gap-x-4 gap-y-6">
        <Heading className="col-span-full mb-2 w-full text-center text-2xl font-semibold lg:col-end-auto lg:text-start">
          {t('footer.tagline')}
        </Heading>

        <div>
          <Heading className="mb-4 text-xl font-semibold">
            {t('footer.contact.title')}
          </Heading>
          <ol className=" space-y-1 ">
            <li className="flex items-center gap-x-1">
              <IconSprite name="phone" height="20px" width="20px" />
              <a
                href={`tel:${t('footer.contact.phone')}`}
                className="ml-1 font-medium"
              >
                {t('footer.contact.phone')}
              </a>
            </li>
            <li className="flex items-center gap-x-1">
              <Mail size={20} />
              <a
                href={`mailto:${t('footer.contact.email')}`}
                className="ml-1 font-medium"
              >
                {t('footer.contact.email')}
              </a>
            </li>
          </ol>
        </div>
        <div>
          <Heading className="mb-4 text-xl font-semibold">
            {t('footer.company.title')}
          </Heading>
          <ol className=" space-y-1 ">
            <li className="flex items-center gap-x-1">
              <Link to="/about">{t('footer.company.about')}</Link>
            </li>
            <li className="flex items-center gap-x-1">
              <Link to="/contact">{t('footer.company.testimonials')}</Link>
            </li>
            <li className="flex items-center gap-x-1">
              <Link to="services">{t('footer.company.services')}</Link>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default Footer
