'use client'
import { ArrowUpIcon } from '@sahayeta/icons'
import { useEffect, useState } from 'react'

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      setIsVisible(scrollTop > 100)

      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const maxScroll = documentHeight - windowHeight
      const currentScroll = scrollTop
      const scrollPercent = (currentScroll / maxScroll) * 100
      setScrollProgress(scrollPercent)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="fixed bottom-12 right-8 z-20 flex items-center justify-center lg:right-20">
      {isVisible && (
        <CircularProgressBar percentage={scrollProgress} circleWidth={100} />
      )}
    </div>
  )
}

const CircularProgressBar = ({
  percentage,
  circleWidth
}: {
  percentage: number
  circleWidth: number
}) => {
  const radius = 32
  const dashArray = radius * Math.PI * 2
  const dashOffset = dashArray - (dashArray * percentage) / 100
  return (
    <button
      className="flex items-center justify-center"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg
        className="absolute"
        width={circleWidth}
        height={circleWidth}
        viewBox={'0 0 ${circleWidth} ${circleWidth}'}
      >
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="3px"
          r={radius}
          className="fill-none stroke-primary"
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="3px"
          r={radius}
          className="svg-stroke-rounded fill-none stroke-blue-700"
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset
          }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />
      </svg>
      <div className="h-8 w-8 text-blue-700">
        <ArrowUpIcon />
      </div>
    </button>
  )
}
