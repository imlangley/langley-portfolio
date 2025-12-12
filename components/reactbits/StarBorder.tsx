'use client'

import { ReactNode } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface StarBorderProps {
  children: ReactNode
  color?: string
  speed?: number
  className?: string
}

export function StarBorder({
  children,
  color = '#3b82f6',
  speed = 6,
  className = '',
}: StarBorderProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div className={`relative p-[2px] rounded-lg overflow-hidden ${className}`}>
      <style jsx>{`
        @keyframes star-border {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      
      {/* Animated border gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${color}, transparent, ${color}, transparent)`,
          animation: prefersReducedMotion ? 'none' : `star-border ${speed}s linear infinite`,
        }}
      />
      
      {/* Inner content */}
      <div className="relative rounded-lg bg-card z-10">
        {children}
      </div>
    </div>
  )
}
