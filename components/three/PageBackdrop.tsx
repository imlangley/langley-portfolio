'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

const BackdropScene = dynamic(() => import('./BackdropScene').then(m => m.BackdropScene), {
    ssr: false,
    loading: () => null,
})

type BackdropVariant = 'particles' | 'grid' | 'orbs' | 'waves'

const ROUTE_VARIANTS: Record<string, BackdropVariant> = {
    '/': 'particles',
    '/projects': 'grid',
    '/about': 'orbs',
    '/shop': 'waves',
    '/uptime': 'particles',
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const subscribeNoop = () => () => {}

function useReducedMotion() {
    return useSyncExternalStore(
        s => { window.matchMedia(REDUCED_MOTION_QUERY).addEventListener('change', s); return () => window.matchMedia(REDUCED_MOTION_QUERY).removeEventListener('change', s) },
        () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
        () => false,
    )
}

function useTier() {
    return useSyncExternalStore(
        subscribeNoop,
        () => !window.matchMedia('(pointer: coarse)').matches && (navigator.hardwareConcurrency ?? 4) > 4 ? 'full' : 'lite',
        () => 'lite' as const,
    )
}

/**
 * Fixed-position 3D backdrop rendered behind all page content.
 * Variant changes per route. Pauses rAF when tab is hidden.
 * Zero re-renders — scroll/pointer fed via refs read in useFrame.
 */
export function PageBackdrop() {
    const pathname = usePathname()
    const reducedMotion = useReducedMotion()
    const tier = useTier()
    const scrollRef = useRef(0)
    const [visible, setVisible] = useState(true)

    const variant: BackdropVariant =
        ROUTE_VARIANTS[pathname] ??
        // detail pages inherit their parent's variant
        pathname.startsWith('/projects/') ? 'grid' :
        pathname.startsWith('/shop/') ? 'waves' : 'particles'

    useEffect(() => {
        let raf = 0
        const update = () => {
            scrollRef.current = Math.min(1, Math.max(0, window.scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)))
            raf = requestAnimationFrame(update)
        }
        raf = requestAnimationFrame(update)

        const onVis = () => setVisible(!document.hidden)
        document.addEventListener('visibilitychange', onVis)

        return () => {
            cancelAnimationFrame(raf)
            document.removeEventListener('visibilitychange', onVis)
        }
    }, [])

    if (reducedMotion || !visible) return null

    return (
        <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
            <BackdropScene
                variant={variant}
                tier={tier}
                scrollRef={scrollRef}
            />
        </div>
    )
}
