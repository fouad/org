import { useEffect } from 'react'
import { animate } from 'motion'

function AnimatedBars() {
  useEffect(() => {
    animate(
      '#bar1',
      {
        transform: [
          'scaleY(1.0) translateY(0rem)',
          'scaleY(1.5) translateY(-0.082rem)',
          'scaleY(1.0) translateY(0rem)',
        ],
      },
      {
        duration: 1.0,
        repeat: Infinity,
        easing: ['ease-in-out'],
      }
    )
    animate(
      '#bar2',
      {
        transform: [
          'scaleY(1.0) translateY(0rem)',
          'scaleY(3) translateY(-0.083rem)',
          'scaleY(1.0) translateY(0rem)',
        ],
      },
      {
        delay: 0.2,
        duration: 1.5,
        repeat: Infinity,
        easing: ['ease-in-out'],
      }
    )
    animate(
      '#bar3',
      {
        transform: [
          'scaleY(1.0)  translateY(0rem)',
          'scaleY(0.5) translateY(0.37rem)',
          'scaleY(1.0)  translateY(0rem)',
        ],
      },
      {
        delay: 0.3,
        duration: 1.5,
        repeat: Infinity,
        easing: ['ease-in-out'],
      }
    )
  }, [])

  return (
    <div className="w-auto flex items-end overflow-hidden">
      <span
        id="bar1"
        className={`w-1 mr-[3px] h-2 bg-green-400 dark:bg-green-500 opacity-75`}
      />
      <span
        id="bar2"
        className={`w-1 mr-[3px] h-1 bg-green-400 dark:bg-green-500`}
      />
      <span
        id="bar3"
        className={`w-1 h-3 bg-green-400 dark:bg-green-500 opacity-80`}
      />
    </div>
  )
}

export default function NowOnline() {
  return (
    <div className="flex flex-row-reverse items-center sm:flex-row mb-8 space-x-0 sm:space-x-2 w-full">
      <AnimatedBars />
      <div className="inline-flex flex-col sm:flex-row w-full max-w-full truncate">
        <p className="capsize text-gray-800 dark:text-gray-200 font-medium">
          Online
        </p>
        <span className="capsize mx-2 text-gray-500 dark:text-gray-300 hidden sm:block">
          {' – '}
        </span>
        <p className="capsize text-gray-500 dark:text-gray-300 max-w-max truncate">
          Likely working
        </p>
      </div>
    </div>
  )
}
