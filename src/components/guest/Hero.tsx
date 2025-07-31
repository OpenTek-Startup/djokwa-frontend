import deskImage from 'assets/images/desk.png'
// import Heading from '../components/ui/heading'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from 'components/ui/button'
import { AnimatedText } from 'components/ui/animated-text'
import { useTranslation } from 'react-i18next'
const Hero = () => {
  const { t } = useTranslation('landing')
  // hero section here but more can be added to make the hero page looks great
  const words = t('hero.titleWords', { returnObjects: true }) as any[]

  const img_variants = {
    initial: {
      opacity: 0,
      y: '5rem'
      // transition: {
      //     duration: 1.5
      // }
    },
    animate: {
      opacity: 1,
      y: '0rem'
      // transition: {
      //     duration: 0.5
      // }
    },
    hover: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  }
  return (
    <div className="sticky top-0 md:static">
      <div className="mx-auto grid-cols-[repeat(2,1fr)] gap-6 px-4 py-10 md:grid lg:h-[min(35rem,100vh)] lg:items-center lg:px-10">
        <div>
          <AnimatedText
            className="mb-6  text-center text-4xl font-black capitalize leading-[2.2rem] tracking-tight sm:text-4xl md:text-start md:text-4xl lg:text-6xl lg:font-semibold lg:leading-[1.1]"
            inView
            words={words}
          />
          {/* <Heading className='text-4xl font-poppins sm:text-4xl lg:text-6xl font-black lg:font-semibold text-center md:text-start
            tracking-tight leading-[2.2rem] lg:leading-[1.1] mb-6 capitalize 
            '>
                        Ensure a better follow-up for your <span className='font-bold text-pink-600'>Institute </span>
          </Heading> */}
          <p className="mb-6 text-center text-lg leading-tight text-foreground/60 md:text-start lg:text-xl">
            {t('hero.description')}
          </p>

          <div className="mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:gap-2 ">
            <Button className="" variant={'default'} size="lg">
              {t('hero.getStarted')}
            </Button>
            {/* this button was not on the design */}
            <Button variant={'secondary'} size="lg">
              <Link
                to={'#'} // link to the desire page here
                className="block"
              >
                {t('hero.learnMore')}
                {/* the learn more button can redirect the user to 
                        about page or scroll to show the user the steps s/he can use to create an account
                        */}
              </Link>
            </Button>
          </div>
        </div>
        <div>
          <motion.img
            src={deskImage}
            whileHover="hover"
            initial="initial"
            whileInView="animate"
            variants={img_variants}
            className="mx-auto max-w-lg
                        object-fill transition-all
                        duration-300 hover:scale-[0.95]
                        "
            alt="desk image"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
