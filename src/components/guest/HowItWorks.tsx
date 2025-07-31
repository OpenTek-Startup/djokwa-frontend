import questionImage from '../../assets/images/question.png'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from 'components/ui/button'
import { AnimatedText } from 'components/ui/animated-text'
import Heading from 'components/ui/heading'
import { useTranslation } from 'react-i18next'

const HowItWorks = () => {
  const { t } = useTranslation('landing')

  // interface for the steps array element
  interface iStep {
    heading: string
    description?: string
    index: number
    RenderLink?: React.ReactNode
  }
  // creating the steps in array it will be easier for another person reading my code or
  // me myself on a later to understand  what is going on here
  const MyButton = motion(Button)
  const MyLink = motion(Link)
  const variants = {
    initial: {
      scale: 0.5,
      opacity: 0.3,
      x: 'var(--initial-x)',
      y: '-4rem',
      transition: {
        delay: 0.5,
        duration: 2
      }
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: '-2rem',
      y: '-3rem',
      transition: {
        // delay: 0.5,
        duration: 0.5
      }
    }
  }
  const img_variants = {
    initial: {
      opacity: 0.3,
      x: '-10rem',
      transition: {
        delay: 1,
        duration: 2
      }
    },
    animate: {
      opacity: 1,
      x: '0rem',
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  }
  const text_variants = {
    initial: {
      scale: 0.5,
      opacity: 0.3,
      y: '4rem',
      transition: {
        delay: 0.5,
        duration: 2
      }
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: '0rem',
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  }
  const steps: readonly iStep[] = [
    {
      heading: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.description'),
      index: 1,
      RenderLink: (
        <MyButton
          initial={{
            opacity: 0,
            y: 30
          }}
          variant={'default'}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1
          }}
        >
          <Link to="/register" className="block w-full text-background">
            {t('howItWorks.step1.link')}
          </Link>
        </MyButton>
      )
    },
    {
      heading: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.description'),
      index: 2,
      RenderLink: (
        <>
          {/* <br /> */}
          <p>
            {t('howItWorks.step2.linkText')}{' '}
            <MyLink
              className="italic underline underline-offset-2"
              to={'instruction/create'}
            >
              {t('howItWorks.step2.link')}&nbsp;
            </MyLink>
          </p>
        </>
      )
    },
    {
      heading: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.description'),
      index: 3,
      RenderLink: (
        <>
          {/* <br /> */}
          <p>
            {t('howItWorks.step3.linkText')}{' '}
            <MyLink
              className="italic underline underline-offset-2"
              to={'instruction/create'}
            >
              {t('howItWorks.step3.link')}&nbsp;
            </MyLink>
          </p>
        </>
      )
    }
  ]
  // renderSteps takes it arry of steps in the steps array and render it to the page
  const RenderSteps = ({ heading, description, RenderLink, index }: iStep) => {
    return (
      <li className="mb-4 ms-6 flex flex-col justify-start space-y-2 pt-4">
        <Heading className="mb-0 w-fit !text-2xl  font-semibold ">
          {heading}
          <motion.span
            viewport={{ once: true }}
            initial={{
              width: '0px'
            }}
            whileInView={{
              width: '100%'
            }}
            transition={{
              duration: 1
            }}
            className="mt-2 block h-[2px] rounded-full bg-[var(--color-bg-sidebar)]"
          />
        </Heading>
        <motion.span
          variants={variants}
          initial="initial"
          whileInView="animate"
          viewport={{ amount: 1, once: true }}
          className="sticky -start-2 top-4    flex size-5 items-center justify-center rounded-full   bg-[#9747ff] text-[0.7rem] text-background [--initial-x:-2.5rem]  "
        >
          {index}
        </motion.span>
        {/* RenderLink and description was not found on the design but i thought it wise to direct the user
                when s/he is using reading the instructions 
                */}
        <motion.p
          whileHover="hover"
          initial="initial"
          whileInView="animate"
          variants={text_variants}
          viewport={{ once: true, amount: 0.6 }}
          className="text-base font-normal text-foreground/50 dark:text-foreground/40"
        >
          {description}
        </motion.p>
        {RenderLink}{' '}
        {/*
                i juste passed one as a button in the array  but more can be passed
                */}
      </li>
    )
  }
  const words = t('howItWorks.titleWords', { returnObjects: true }) as any[]
  return (
    <div className="relative z-20 mx-auto bg-background p-6 lg:px-6">
      <div className="items-start md:flex md:gap-x-8 lg:gap-x-16">
        {/* setting the position to sticky will make the image to stick to the top when scrolling
            --when scrolling you will see the animation 
            you can change it by removing the position sticking  class or adding another class like static
            */}
        <div className="sticky  top-0 flex-none lg:w-[min(25rem,calc(100%-2rem))] ">
          <div className="relative w-full">
            <h1 className="w-full text-center text-4xl font-black uppercase text-foreground/50 opacity-30 lg:text-5xl">
              {t('howItWorks.backgroundTitle')}
            </h1>

            <AnimatedText
              className="!absolute  top-[calc(50%-0.6rem)] !m-0  -translate-y-1/2 text-2xl  italic text-black  lg:text-4xl"
              words={words}
            />
          </div>

          {/* <Heading className='py-6 text-4xl font-semibold text-center lg:text-start'>
                        How its Works
                    </Heading> */}
          <motion.img
            whileHover="hover"
            initial="initial"
            whileInView="animate"
            variants={img_variants}
            src={questionImage}
            loading="lazy" // the browser will download the image as the image is about to enter the viewport
            // for better automising
            className="mx-auto   max-h-[calc(100vh-10rem)]
                        max-w-[25rem] object-fill
                        transition-all
                        duration-300
                        hover:scale-[0.95] lg:mx-0"
            // max-h-[calc(100vh-10rem)] ==> with this you will be able to view the image when the phone is rotated
            alt="desk image"
          />
        </div>
        <div className="relative z-20 flex-1">
          {/* with flex-1 as a child of an element which has a display of flex it will grow and take the avaible space  */}
          <ol
            style={{
              borderLeft: '2px solid #f7c2e4'
            }}
            className="relative my-6 border-s border-gray-200 dark:border-gray-700 lg:space-y-10"
          >
            {
              // loops here and render each steps  with data from array of objects
              steps.map((step) => (
                <RenderSteps key={step.heading} {...step} />
              ))
            }
          </ol>
        </div>
      </div>
    </div>
  )
}
HowItWorks.displayName = 'howitworks'
export default HowItWorks
