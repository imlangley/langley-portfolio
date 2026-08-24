'use client'

import { useRef, useState, useCallback } from 'react'

interface TiltCardProps {
    children: React.ReactNode
    className?: string
    maxTilt?: number
    scale?: number
}

export function TiltCard({ children, className = '', maxTilt = 10, scale = 1.03 }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [transform, setTransform] = useState(
        'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)'
    )
    const [glare, setGlare] = useState<React.CSSProperties>({ opacity: 0 })
    const raf = useRef(0)

    const onMove = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            cancelAnimationFrame(raf.current)
            raf.current = requestAnimationFrame(() => {
                const el = ref.current
                if (!el) return
                const rect = el.getBoundingClientRect()
                const px = (e.clientX - rect.left) / rect.width
                const py = (e.clientY - rect.top) / rect.height
                const rx = ((py - 0.5) * -maxTilt).toFixed(2)
                const ry = ((px - 0.5) * maxTilt).toFixed(2)
                setTransform(`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`)
                setGlare({
                    background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(153,153,255,0.1) 0%, transparent 55%)`,
                    opacity: '1',
                })
            })
        },
        [maxTilt, scale]
    )

    const onLeave = useCallback(() => {
        cancelAnimationFrame(raf.current)
        setTransform('perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)')
        setGlare({ opacity: 0 })
    }, [])

    return (
        <div
            ref={ref}
            className={className}
            style={{
                transform,
                transition: 'transform 0.15s ease-out',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                position: 'relative',
            }}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
        >
            {children}
            <div
                className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
                style={{ ...glare, transition: 'opacity 0.3s ease-out' }}
            />
        </div>
    )
}
