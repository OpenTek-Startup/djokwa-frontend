import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../utils/themeSlice'
import { cn } from '../../utils'
import { rootState } from 'utils/userUtils'
import IconSprite from 'components/ui/iconSprite'
type Props = {
  className?: string // for the round ball
  containerClassName?: string // the container housing the round ball
}
// dear reader/tester please fixed this code style or color for me
// this is the code that toggle the theme in the app
// it can be used at any place in the app as long as you import it
// containerClassName-->is for the big container or the box
// className is for the round circle
// you can customize the color here
// or importing and customize
export function ThemeSwitcher({ className, containerClassName }: Props) {
  const isDarkTheme =
    useSelector((state: rootState) => state.themeSlice.currentTheme) == 'dark'

  const dispath = useDispatch()
  const toggleSwitch = () => dispath(toggleTheme())

  return (
    <>
      {/* <p className='text-green-600 dark:text-blue-600'>testing the code here</p> */}
      <div
        key="somerandomtexthere"
        className={cn(
          'w-[min(8rem,calc(100%-1rem))] bg-background ring-1 cursor-pointer py-1.5 px-4  rounded-full flex items-center mx-auto ',
          isDarkTheme && 'justify-end',
          isDarkTheme && 'bg-gray-600 active',
          containerClassName
        )}
        // data-isDarkTheme={isDarkTheme}
        onClick={toggleSwitch}
      >
        <motion.div
          className={cn(
            'size-10  transition-colors duration-500 ring-[1px] bg-gray-500 rounded-full',
            isDarkTheme && 'bg-red-600',
            className
          )}
          layout
          // transition={spring}
        >
          <div className="flex  size-full items-center justify-center rounded-full">
            {isDarkTheme ? (
              <IconSprite name="moon" />
            ) : (
              <IconSprite name="AdminIcon" />
            )}
          </div>
        </motion.div>
      </div>
    </>
  )
}
