import { getProjectBySlug, getAllProjectSlugs, getSiteSettings, getRelatedProjects } from '@/sanity/lib'
import { ProjectDetailEnhanced } from '@/components/projects/ProjectDetailEnhanced'
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

    if (!project) {
        return {
            title: 'Project Not Found',
            description: 'The requested project could not be found.'
        }
    }

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

// Longer revalidation for detail pages
export const revalidate = 300

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) {
        notFound()
    }

    // Fetch related projects based on category and tags
    const tagIds = project.tags?.map((t: any) => t._id) || []
    const relatedProjects = await getRelatedProjects(
        project._id,
        project.category?._id ?? null,
        tagIds
    )

    return (
        <ProjectDetailEnhanced
            project={project}
            relatedProjects={relatedProjects}
        />
    )
}
