'use client'

import { useRef, useEffect, useCallback } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface GlitchTextProps {
  text: string
  speed?: number
  enableShadows?: boolean
  enableOnHover?: boolean
  className?: string
}

export function GlitchText({
  text,
  speed = 1,
  enableShadows = true,
  enableOnHover = false,
  className = '',
}: GlitchTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const createGlitchLayers = useCallback(() => {
    if (!containerRef.current || !textRef.current) return

    // Clear existing layers
    const existingLayers = containerRef.current.querySelectorAll('.glitch-layer')
    existingLayers.forEach((layer) => layer.remove())

    // Create glitch layers
    const colors = ['#ff00ff', '#00ffff', '#ffff00']
    colors.forEach((color, i) => {
      const layer = document.createElement('span')
      layer.className = `glitch-layer absolute inset-0 pointer-events-none`
      layer.style.color = color
      layer.style.mixBlendMode = 'screen'
      layer.style.opacity = '0.8'
      layer.textContent = text
      layer.setAttribute('aria-hidden', 'true')
      containerRef.current?.appendChild(layer)
    })
  }, [text])

  useEffect(() => {
    if (prefersReducedMotion) return
    if (!enableOnHover) {
      createGlitchLayers()
    }
  }, [createGlitchLayers, enableOnHover, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return

    const container = containerRef.current
    if (!container) return

    let animationId: number
    let frame = 0

    const animate = () => {
      frame++
      const layers = container.querySelectorAll('.glitch-layer') as NodeListOf<HTMLSpanElement>

      layers.forEach((layer, i) => {
        const offset = Math.sin(frame * 0.05 * speed + i) * 3
        const skew = Math.sin(frame * 0.03 * speed + i * 2) * 2
        layer.style.transform = `translateX(${offset}px) skewX(${skew}deg)`
        layer.style.clipPath = `inset(${Math.random() * 100}% 0 ${Math.random() * 100}% 0)`
      })

      animationId = requestAnimationFrame(animate)
    }

    if (!enableOnHover) {
      animate()
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [speed, enableOnHover, prefersReducedMotion])

  const handleMouseEnter = () => {
    if (enableOnHover && !prefersReducedMotion) {
      createGlitchLayers()
    }
  }

  const handleMouseLeave = () => {
    if (enableOnHover) {
      const existingLayers = containerRef.current?.querySelectorAll('.glitch-layer')
      existingLayers?.forEach((layer) => layer.remove())
    }
  }

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>
  }

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        ref={textRef}
        className="relative z-10"
        style={{
          textShadow: enableShadows
            ? '0 0 10px rgba(255,0,255,0.5), 0 0 20px rgba(0,255,255,0.3)'
            : 'none',
        }}
      >
        {text}
      </span>
    </div>
  )
}
