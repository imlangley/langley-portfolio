'use client'

import { ReactLenis } from 'lenis/react'
import { usePathname } from 'next/navigation'

interface SmoothScrollProps {
    children: React.ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
    const pathname = usePathname()

    // Disable Lenis on Sanity Studio routes to allow native scrolling
    if (pathname?.startsWith('/studio')) {
        return <>{children}</>
    }

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    )
}
