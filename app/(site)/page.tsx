/**
 * Homepage - Main Entry Point
 * 
 * Assembles the Hero, About, Featured Projects, and Tools sections.
 * Fetches data from Sanity on the server.
 */

import { getSiteSettings, getFeaturedProjects, getProfile, getTools } from '@/sanity/lib'
import { Hero } from '@/components/home/Hero'
import { AboutSection } from '@/components/home/AboutSection'
import { FeaturedProjectsSection } from '@/components/home/FeaturedProjectsSection'
import { ToolsSection } from '@/components/home/ToolsSection'

export const revalidate = 60 // ISR every 60 seconds

export default async function HomePage() {
    const [settings, projects, profile, tools] = await Promise.all([
        getSiteSettings(),
        getFeaturedProjects(),
        getProfile(),
        getTools(),
    ])

    return (
        <>
            <Hero siteSettings={settings} profile={profile} tools={tools} />
            <AboutSection profile={profile} tools={tools} />
            <FeaturedProjectsSection projects={projects} />
            <ToolsSection tools={tools} />
        </>
    )
}
