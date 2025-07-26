import { AnimatedNumber } from '../ui/animated-text'
import { cn } from '../../utils'
const Statistics = () => {
  interface iStat {
    number: number
    text: string
  }
  // stats hold the stats
  const stats: iStat[] = [
    {
      number: 500,
      text: 'Total Students'
    },
    {
      number: 1000,
      text: 'Solid Tuitors'
    },
    {
      number: 4500,
      text: 'Satified Parents'
    }
  ]

  const SingleStats = ({ number, text }: iStat) => {
    return (
      <div // i used this //text-gray-400\\ insteand of text-white because white doesnot fit very well but you can update it for a better color
        className={cn(
          'flex font-semibold flex-col space-y-1  group text-foreground/40 py-2 justify-center items-center mx-auto'
        )}
      >
        <h2 className="text-2xl font-black transition-all  duration-300 group-hover:scale-[1.20]">
          {' '}
          <AnimatedNumber
            className="text-4xl font-black [text-shadow:_0_1px_0_var(--tw-shadow-color,blue)] lg:text-6xl"
            value={number}
          />{' '}
          <sup className="text-3xl font-black text-[#c8d6dd] [text-shadow:_0_1px_0_var(--tw-shadow-color,blue)] lg:text-5xl">
            +
          </sup>
        </h2>
        <p className="text-foreground/70 transition-all duration-300 group-hover:scale-[0.9]">
          {text}
        </p>
      </div>
    )
  }

  return (
    <div
      className="relative z-20 bg-gradient-to-t from-[var(--color-bg-sidebar)] py-2 pb-6
            
            "
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(min(13rem,calc(100%-2rem)),1fr))] items-center justify-between gap-y-4">
        {stats.map((stat) => {
          return <SingleStats key={stat.text} {...stat} />
        })}
      </div>
    </div>
  )
}

export default Statistics
