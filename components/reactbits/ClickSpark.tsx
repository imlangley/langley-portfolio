'use client'

import { useRef, useCallback, ReactNode } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface ClickSparkProps {
  children: ReactNode
  sparkColor?: string
  sparkCount?: number
  sparkRadius?: number
  duration?: number
  className?: string
}

interface Spark {
  id: number
  x: number
  y: number
  angle: number
}

export function ClickSpark({
  children,
  sparkColor = '#3b82f6',
  sparkCount = 8,
  sparkRadius = 50,
  duration = 400,
  className = '',
}: ClickSparkProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sparkIdRef = useRef(0)
  const prefersReducedMotion = usePrefersReducedMotion()

  const createSpark = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const sparksContainer = document.createElement('div')
      sparksContainer.style.position = 'absolute'
      sparksContainer.style.left = `${x}px`
      sparksContainer.style.top = `${y}px`
      sparksContainer.style.pointerEvents = 'none'
      sparksContainer.style.zIndex = '9999'

      for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement('div')
        const angle = (i / sparkCount) * 360

        spark.style.position = 'absolute'
        spark.style.width = '4px'
        spark.style.height = '4px'
        spark.style.borderRadius = '50%'
        spark.style.backgroundColor = sparkColor
        spark.style.boxShadow = `0 0 6px ${sparkColor}`
        spark.style.transform = 'translate(-50%, -50%)'
        spark.style.animation = `spark-fly ${duration}ms ease-out forwards`
        spark.style.setProperty('--angle', `${angle}deg`)
        spark.style.setProperty('--radius', `${sparkRadius}px`)

        sparksContainer.appendChild(spark)
      }

      containerRef.current.appendChild(sparksContainer)

      setTimeout(() => {
        sparksContainer.remove()
      }, duration)
    },
    [sparkColor, sparkCount, sparkRadius, duration, prefersReducedMotion]
  )

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onClick={createSpark}
    >
      <style jsx global>{`
        @keyframes spark-fly {
          0% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateX(var(--radius));
            opacity: 0;
          }
        }
      `}</style>
      {children}
    </div>
  )
}
