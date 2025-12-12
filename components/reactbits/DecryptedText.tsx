'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface DecryptedTextProps {
  text: string
  speed?: number
  maxIterations?: number
  characters?: string
  className?: string
  revealDirection?: 'start' | 'end' | 'center'
  animateOn?: 'view' | 'hover'
}

export function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
  className = '',
  revealDirection = 'start',
  animateOn = 'view',
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const getRandomChar = useCallback(() => {
    return characters[Math.floor(Math.random() * characters.length)]
  }, [characters])

  const animate = useCallback(() => {
    if (isAnimating || prefersReducedMotion) return
    setIsAnimating(true)

    let iteration = 0
    const textArray = text.split('')
    const revealed = new Array(text.length).fill(false)

    const interval = setInterval(() => {
      const newText = textArray.map((char, i) => {
        if (revealed[i] || char === ' ') return char

        // Determine reveal order based on direction
        let shouldReveal = false
        const progress = iteration / maxIterations

        if (revealDirection === 'start') {
          shouldReveal = i < text.length * progress
        } else if (revealDirection === 'end') {
          shouldReveal = i > text.length * (1 - progress)
        } else {
          const center = text.length / 2
          const distance = Math.abs(i - center)
          shouldReveal = distance > (text.length / 2) * (1 - progress)
        }

        if (shouldReveal) {
          revealed[i] = true
          return char
        }

        return getRandomChar()
      })

      setDisplayText(newText.join(''))
      iteration++

      if (iteration >= maxIterations) {
        clearInterval(interval)
        setDisplayText(text)
        setIsAnimating(false)
        setHasAnimated(true)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, maxIterations, getRandomChar, revealDirection, isAnimating, prefersReducedMotion])

  useEffect(() => {
    if (animateOn === 'view' && !hasAnimated && !prefersReducedMotion) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            animate()
            observer.disconnect()
          }
        },
        { threshold: 0.5 }
      )

      if (containerRef.current) {
        observer.observe(containerRef.current)
      }

      return () => observer.disconnect()
    }
  }, [animate, animateOn, hasAnimated, prefersReducedMotion])

  const handleMouseEnter = () => {
    if (animateOn === 'hover' && !prefersReducedMotion) {
      setHasAnimated(false)
      animate()
    }
  }

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>
  }

  return (
    <motion.span
      ref={containerRef}
      className={`font-mono ${className}`}
      onMouseEnter={handleMouseEnter}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
    </motion.span>
  )
}
