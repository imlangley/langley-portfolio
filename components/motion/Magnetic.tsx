'use client'

import { useRef, useCallback } from 'react'
import type { ReactNode } from 'react'

interface MagneticProps {
    children: ReactNode
    strength?: number
    className?: string
}

/**
 * Element subtly pulls toward the cursor when nearby.
 * Uses direct DOM manipulation for zero re-renders.
 */
export function Magnetic({ children, strength = 0.25, className = '' }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null)

    const onMove = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            const el = ref.current
            if (!el) return
            const rect = el.getBoundingClientRect()
            const dx = e.clientX - (rect.left + rect.width / 2)
            const dy = e.clientY - (rect.top + rect.height / 2)
            el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
            el.style.transition = 'transform 0.1s ease-out'
        },
        [strength]
    )

    const onLeave = useCallback(() => {
        const el = ref.current
        if (!el) return
        el.style.transform = 'translate(0px, 0px)'
        el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    }, [])

    return (
        <div ref={ref} className={className} onPointerMove={onMove} onPointerLeave={onLeave}>
            {children}
        </div>
    )
}
