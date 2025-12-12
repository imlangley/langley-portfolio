'use client'

import { useRef, useEffect } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface SquaresProps {
  speed?: number
  squareSize?: number
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left'
  borderColor?: string
  hoverFillColor?: string
  className?: string
}

export function Squares({
  speed = 1,
  squareSize = 40,
  direction = 'diagonal',
  borderColor = 'rgba(255,255,255,0.1)',
  hoverFillColor = 'rgba(59,130,246,0.3)',
  className = '',
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let offset = 0
    let animationId: number
    let mouseX = -1000
    let mouseY = -1000

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouseX = -1000
      mouseY = -1000
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    const getDirection = () => {
      switch (direction) {
        case 'up':
          return { x: 0, y: -1 }
        case 'down':
          return { x: 0, y: 1 }
        case 'left':
          return { x: -1, y: 0 }
        case 'right':
          return { x: 1, y: 0 }
        case 'diagonal':
        default:
          return { x: 1, y: 1 }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const dir = getDirection()
      const cols = Math.ceil(canvas.width / squareSize) + 2
      const rows = Math.ceil(canvas.height / squareSize) + 2

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * squareSize + (offset * dir.x) % squareSize
          const y = row * squareSize + (offset * dir.y) % squareSize

          // Check if mouse is hovering this square
          const squareCenterX = x + squareSize / 2
          const squareCenterY = y + squareSize / 2
          const distance = Math.sqrt(
            Math.pow(mouseX - squareCenterX, 2) + Math.pow(mouseY - squareCenterY, 2)
          )

          // Fill nearby squares with hover color
          if (distance < squareSize * 2) {
            const opacity = 1 - distance / (squareSize * 2)
            ctx.fillStyle = hoverFillColor.replace('0.3', String(opacity * 0.5))
            ctx.fillRect(x, y, squareSize, squareSize)
          }

          // Draw border
          ctx.strokeStyle = borderColor
          ctx.lineWidth = 1
          ctx.strokeRect(x, y, squareSize, squareSize)
        }
      }

      if (!prefersReducedMotion) {
        offset += speed * 0.5
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationId)
    }
  }, [speed, squareSize, direction, borderColor, hoverFillColor, prefersReducedMotion])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  )
}
