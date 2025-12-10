/**
 * Homepage - Main Entry Point
 * 
 * Assembles the Hero, Featured Projects, and other sections.
 * Fetches data from Sanity on the server.
 */

import { getSiteSettings, getFeaturedProjects } from '@/sanity/lib'
import { Hero } from '@/components/home/Hero'
import { FeaturedProjects } from '@/components/home/FeaturedProjects'

export const revalidate = 60 // ISR every 60 seconds

export default async function HomePage() {
    const settings = await getSiteSettings()
    const projects = await getFeaturedProjects()

    return (
        <>
            <Hero
                title={settings?.heroTitle}
                subtitle={settings?.heroSubtitle}
                image={settings?.heroImage}
                siteSettings={settings} // Pass settings for socials
            />

            <FeaturedProjects projects={projects} />

            {/* Services Preview could go here */}
        </>
    )
}
