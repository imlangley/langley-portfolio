/**
 * Homepage - Main Entry Point
 * 
 * Assembles the Hero, Featured Projects, and other sections.
 * Fetches data from Sanity on the server.
 */

import { getSiteSettings, getFeaturedProjects, getProfile } from '@/sanity/lib'
import { Hero } from '@/components/home/Hero'
import { FeaturedProjects } from '@/components/home/FeaturedProjects'

export const revalidate = 60 // ISR every 60 seconds

export default async function HomePage() {
    const [settings, projects, profile] = await Promise.all([
        getSiteSettings(),
        getFeaturedProjects(),
        getProfile()
    ])

    return (
        <>
            <Hero siteSettings={settings} profile={profile} />
            <FeaturedProjects projects={projects} />
        </>
    )
}
