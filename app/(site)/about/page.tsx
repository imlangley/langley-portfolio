import { getProfile, getFaq, getTools, getTestimonials, getAllProjects } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import type { Metadata } from 'next'
import { TerminalSquare, Settings2, Hash, Laptop, MapPin, Calendar, Clock, ChevronDown, Quote, MessageSquare, Download, Sparkles } from 'lucide-react'
import { AboutPageClient } from './AboutPageClient'

export const metadata: Metadata = {
    title: 'Properties | Langley',
    description: 'Editor configuration and user properties.',
}

export const revalidate = 60

export default async function AboutPage() {
    const [profile, faq, tools, testimonials, projects] = await Promise.all([
        getProfile(),
        getFaq(),
        getTools(),
        getTestimonials(),
        getAllProjects()
    ])

    const displayName = profile?.name || "Langley"
    const displayRole = profile?.role || "Video Editor / Developer"

    // Calculate stats
    const yearsExperience = new Date().getFullYear() - 2020
    const projectsCount = projects?.length || 50

    // Convert tools to client-friendly format
    const toolsData = tools?.map(tool => ({
        _id: tool._id,
        name: tool.name,
        iconUrl: tool.icon ? urlFor(tool.icon).width(32).height(32).url() : null
    })) || []

    // Convert testimonials to client-friendly format  
    const testimonialsData = testimonials?.map(t => ({
        _id: t._id,
        name: t.name,
        role: t.role,
        testimonialBody: t.testimonialBody,
        avatarUrl: t.avatarImage ? urlFor(t.avatarImage).width(80).height(80).url() : null
    })) || []

    // Avatar URL
    const avatarUrl = profile?.avatarImage
        ? urlFor(profile.avatarImage).width(400).height(400).url()
        : null

    return (
        <AboutPageClient
            displayName={displayName}
            displayRole={displayRole}
            avatarUrl={avatarUrl}
            shortBio={profile?.shortBio}
            longBio={profile?.longBio}
            faqItems={faq?.items}
            tools={toolsData}
            testimonials={testimonialsData}
            projectsCount={projectsCount}
            yearsExperience={yearsExperience}
        />
    )
}
