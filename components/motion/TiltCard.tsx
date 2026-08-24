'use client'

import { useRef, useState, useCallback } from 'react'

interface TiltCardProps {
    children: React.ReactNode
    className?: string
    maxTilt?: number
    scale?: number
}

/**
 * Pointer-tracked 3D tilt wrapper. Applies rotateX/rotateY based on cursor
 * position within the card. GPU-composited via transform only.
 */
export function TiltCard({ children, className = '', maxTilt = 8, scale = 1.02 }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [style, setStyle] = useState<React.CSSProperties>({})
    const raf = useRef(0)

    const onMove = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            cancelAnimationFrame(raf.current)
            raf.current = requestAnimationFrame(() => {
                const el = ref.current
                if (!el) return
                const rect = el.getBoundingClientRect()
                const px = (e.clientX - rect.left) / rect.width - 0.5
                const py = (e.clientY - rect.top) / rect.height - 0.5
                setStyle({
                    transform: `perspective(800px) rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg) scale(${scale})`,
                    transition: 'transform 0.12s ease-out',
                })
            })
        },
        [maxTilt, scale, raf]
    )

    const onLeave = useCallback(() => {
        cancelAnimationFrame(raf.current)
        setStyle({
            transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        })
    }, [raf])

    return (
        <div
            ref={ref}
            className={className}
            style={{ transformStyle: 'preserve-3d', ...style }}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
        >
            {children}
        </div>
    )
}
