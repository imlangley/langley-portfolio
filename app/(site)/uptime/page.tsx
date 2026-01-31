import type { Metadata } from 'next'
import { UptimePageClient } from './UptimePageClient'

export const metadata: Metadata = {
    title: 'Server Status | Langley',
    description: 'Real-time uptime monitoring for Langley\'s infrastructure.',
}

export const revalidate = 30

export default function UptimePage() {
    return <UptimePageClient />
}
