'use client'

import { useRef, useState, useCallback } from 'react'

interface TiltCardProps {
    children: React.ReactNode
    className?: string
    maxTilt?: number
    scale?: number
}

export function TiltCard({ children, className = '', maxTilt = 12, scale = 1.04 }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [outer, setOuter] = useState<React.CSSProperties>({
        transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)',
    })
    const [inner, setInner] = useState<React.CSSProperties>({ transform: 'translateZ(0px)' })
    const [shine, setShine] = useState<React.CSSProperties>({ opacity: 0 })
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
                setOuter({
                    transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`,
                    transition: 'transform 0.08s ease-out',
                })
                setInner({
                    transform: 'translateZ(28px)',
                    transition: 'transform 0.15s ease-out',
                })
                setShine({
                    opacity: 1,
                    background: `radial-gradient(600px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.09) 0%, transparent 50%)`,
                })
            })
        },
        [maxTilt, scale]
    )

    const onLeave = useCallback(() => {
        cancelAnimationFrame(raf.current)
        setOuter({
            transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        })
        setInner({
            transform: 'translateZ(0px)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        })
        setShine({ opacity: 0 })
    }, [])

    return (
        <div
            ref={ref}
            className={className}
            style={{
                ...outer,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                position: 'relative',
            }}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
        >
            <div style={{ ...inner, transformStyle: 'preserve-3d', willChange: 'transform' }}>
                {children}
            </div>
            <div
                className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
                style={{ ...shine, transition: 'opacity 0.4s ease-out' }}
            />
        </div>
    )
}
