import { getProjectBySlug, getAllProjectSlugs, getSiteSettings } from '@/sanity/lib'
import { ProjectDetail } from '@/components/projects/ProjectDetail'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { urlFor } from '@/sanity/lib/image'

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const project = await getProjectBySlug(slug)
    const siteSettings = await getSiteSettings()

    if (!project) return {}

    const ogImage = project.coverImage ? urlFor(project.coverImage).width(1200).height(630).url() : undefined

    return {
        title: `${project.title} | ${siteSettings?.siteTitle || 'Langley'}`,
        description: project.summary,
        openGraph: {
            images: ogImage ? [ogImage] : [],
        },
    }
}

export async function generateStaticParams() {
    const slugs = await getAllProjectSlugs()
    return slugs.map(s => ({ slug: s.slug }))
}

export const revalidate = 60

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) {
        notFound()
    }

    return <ProjectDetail project={project} />
}
