'use client'

import dynamic from 'next/dynamic'
import { useSyncExternalStore, useRef, useEffect, type MutableRefObject } from 'react'

const WorkspaceScene = dynamic(
    () => import('./WorkspaceScene').then((m) => m.WorkspaceScene),
    { ssr: false, loading: () => null }
)

export type SceneTier = 'full' | 'lite'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function subscribeToReducedMotion(onChange: () => void) {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
}

function useReducedMotion() {
    return useSyncExternalStore(
        subscribeToReducedMotion,
        () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
        () => false
    )
}

function detectWebGL() {
    try {
        const canvas = document.createElement('canvas')
        return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
    } catch {
        return false
    }
}

function subscribeToNothing() {
    return () => {}
}

function useWebGLSupported() {
    return useSyncExternalStore(subscribeToNothing, detectWebGL, () => false)
}

function detectTier(): SceneTier {
    const cores = navigator.hardwareConcurrency ?? 4
    const coarse = window.matchMedia('(pointer: coarse)').matches
    return !coarse && cores > 4 ? 'full' : 'lite'
}

export function WorkspaceCanvas({ className = '' }: { className?: string }) {
    const reducedMotion = useReducedMotion()
    const webglSupported = useWebGLSupported()
    const tier: SceneTier = webglSupported ? detectTier() : 'lite'

    // Scroll progress via ref: read in useFrame — re-render-free updates.
    const scrollRef = useRef(0)

    useEffect(() => {
        let raf = 0
        const el = document.querySelector('[data-hero-canvas-root]')
        const update = () => {
            if (!el) return
            const rect = el.getBoundingClientRect()
            const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)))
            scrollRef.current = p
            raf = requestAnimationFrame(update)
        }
        raf = requestAnimationFrame(update)
        return () => cancelAnimationFrame(raf)
    }, [])

    if (!webglSupported) return null

    return (
        <div className={className} aria-hidden="true">
            <WorkspaceScene reducedMotion={reducedMotion} tier={tier} scrollRef={scrollRef as MutableRefObject<number>} />
        </div>
    )
}
