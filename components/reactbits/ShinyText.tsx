'use client'

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface ShinyTextProps {
  text: string
  disabled?: boolean
  speed?: number
  className?: string
}

export function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = '',
}: ShinyTextProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const isAnimated = !disabled && !prefersReducedMotion

  return (
    <span
      className={`relative inline-block bg-clip-text ${className}`}
      style={{
        backgroundImage: isAnimated
          ? 'linear-gradient(120deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 60%)'
          : 'none',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animation: isAnimated ? `shiny-text ${speed}s linear infinite` : 'none',
      }}
    >
      <style jsx>{`
        @keyframes shiny-text {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }
      `}</style>
      {text}
    </span>
  )
}
