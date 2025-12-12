/**
 * Sanity Studio Layout
 * 
 * Provides a minimal layout for the studio route.
 * Does NOT include AppLayout so Studio renders standalone.
 * Uses root layout's html/body, just provides metadata.
 */

import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Langley Studio',
    description: 'Content management for langley.page',
}

export default function StudioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Wrap in scrollable container - Sanity Studio needs full height with overflow
    return (
        <div className="h-screen w-full overflow-auto">
            {children}
        </div>
    )
}

