'use client'

import dynamic from 'next/dynamic'
import { useSyncExternalStore } from 'react'

const WorkspaceScene = dynamic(
    () => import('./WorkspaceScene').then((m) => m.WorkspaceScene),
    { ssr: false, loading: () => null }
)

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

export function WorkspaceCanvas({ className = '' }: { className?: string }) {
    const reducedMotion = useReducedMotion()
    const webglSupported = useWebGLSupported()

    if (!webglSupported) return null

    return (
        <div className={className} aria-hidden="true">
            <WorkspaceScene reducedMotion={reducedMotion} />
        </div>
    )
}
