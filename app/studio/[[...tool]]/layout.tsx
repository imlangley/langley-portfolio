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
    // Just pass children through - root layout provides html/body
    // and (site) layout is NOT applied here since /studio is not in (site) group
    return <>{children}</>
}

