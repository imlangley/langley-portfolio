'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

export type RouteVariant = 'cubes' | 'distort'

const RouteScenes = {
    cubes: dynamic(() => import('./RouteScenes').then((m) => m.CubesScene), { ssr: false }),
    distort: dynamic(() => import('./RouteScenes').then((m) => m.DistortScene), { ssr: false }),
}

function useTier() {
    // Lazy init on first client render; component is below a ssr:false
    // dynamic boundary so navigator access never runs on the server.
    const [tier] = useState<'full' | 'lite'>(() =>
        typeof navigator === 'undefined'
            ? 'lite'
            : !(window.matchMedia('(pointer: coarse)').matches) && (navigator.hardwareConcurrency ?? 4) > 4
              ? 'full'
              : 'lite'
    )
    return tier
}

/**
 * Interactive route-level canvas. Pauses its render loop entirely when
 * scrolled out of view (IntersectionObserver -> frameloop='never').
 */
export function RouteCanvas({
    variant,
    className = '',
    accent,
}: {
    variant: RouteVariant
    className?: string
    accent?: string
}) {
    const wrapRef = useRef<HTMLDivElement>(null)
    const [inView, setInView] = useState(false)
    const tier = useTier()
    const Scene = RouteScenes[variant]

    useEffect(() => {
        const el = wrapRef.current
        if (!el) return
        const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 })
        io.observe(el)
        return () => io.disconnect()
    }, [])

    return (
        <div ref={wrapRef} className={className} aria-hidden="true">
            <Scene active={inView} tier={tier} accent={accent} />
        </div>
    )
}
