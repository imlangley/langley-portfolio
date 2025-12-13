import { getProfile, getSiteSettings } from '@/sanity/lib/fetch'
import type { Metadata } from 'next'
import { ContactPageClient } from './ContactPageClient'

export const metadata: Metadata = {
    title: 'Contact | Langley',
    description: 'Get in touch for collaborations and inquiries.',
}

export const revalidate = 60

export default async function ContactPage() {
    let profile = null
    let siteSettings = null

    try {
        [profile, siteSettings] = await Promise.all([
            getProfile(),
            getSiteSettings()
        ])
    } catch (error) {
        console.error("Error fetching data for ContactPage:", error)
    }

    return (
        <ContactPageClient
            profile={profile}
            siteSettings={siteSettings}
        />
    )
}

