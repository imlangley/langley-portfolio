'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface ScrollProgressProps {
  color?: string
  height?: number
  className?: string
}

export function ScrollProgress({
  color = '#3b82f6',
  height = 3,
  className = '',
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const prefersReducedMotion = usePrefersReducedMotion()
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  if (prefersReducedMotion) {
    return null
  }

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-[100] origin-left ${className}`}
      style={{
        height,
        background: color,
        scaleX,
        boxShadow: `0 0 10px ${color}`,
      }}
    />
  )
}
