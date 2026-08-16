'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, FileCode2, Film } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import type { ProjectCard } from '@/sanity/lib/fetch'
import { useCursor } from '@/context/CursorContext'
import { cn } from '@/lib/utils'

interface FeaturedProjectsSectionProps {
    projects: ProjectCard[]
}

function typeMeta(type: ProjectCard['projectType']) {
    if (type === 'video') return { icon: Film, tone: 'text-syn-magenta', ext: '.aep' }
    if (type === 'web') return { icon: FileCode2, tone: 'text-syn-yellow', ext: '.tsx' }
    return { icon: Film, tone: 'text-syn-teal', ext: '.mix' }
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
    const { setCursorVariant } = useCursor()

    const featured = [
        ...projects.filter((p) => p.isPinned),
        ...projects.filter((p) => !p.isPinned),
    ].slice(0, 6)

    if (!featured.length) return null

    return (
        <section id="projects" className="border-b border-shell-border bg-shell-bg-alt">
            <div className="px-4 py-8 sm:px-6 sm:py-10">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-shell-text-muted">
                            Layer 02 · Selected work
                        </p>
                        <h2 className="mt-1 text-3xl font-black tracking-tight text-shell-text sm:text-4xl">
                            Timeline comps
                        </h2>
                    </div>
                    <Link
                        href="/projects"
                        onMouseEnter={() => setCursorVariant('button')}
                        onMouseLeave={() => setCursorVariant('default')}
                        className="inline-flex items-center gap-2 rounded-md bg-ae-purple px-5 py-2.5 text-sm font-semibold text-[#0b0b14] transition-colors hover:bg-ae-cyan"
                    >
                        View all
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </div>

                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {featured.map((project) => {
                        const meta = typeMeta(project.projectType)
                        const Icon = meta.icon
                        return (
                            <li key={project._id}>
                                <Link
                                    href={`/projects/${project.slug}`}
                                    onMouseEnter={() => setCursorVariant('button')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                    className="group flex h-full flex-col overflow-hidden rounded-md border border-shell-border bg-shell-bg transition-colors hover:border-shell-accent/50"
                                >
                                    <div className="flex items-center gap-1.5 border-b border-shell-border px-3 py-1.5 font-mono text-[10px] text-shell-text-muted">
                                        <Icon className={cn('h-3 w-3 shrink-0', meta.tone)} aria-hidden="true" />
                                        <span className="truncate">
                                            {project.slug}
                                            {meta.ext}
                                        </span>
                                        {project.isPinned && (
                                            <span className="ml-auto shrink-0 text-shell-accent">pinned</span>
                                        )}
                                    </div>
                                    <div className="relative aspect-[16/10] overflow-hidden bg-shell-bg-alt">
                                        {project.coverImage?.asset ? (
                                            <Image
                                                src={urlFor(project.coverImage).width(640).height(400).url()}
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center font-mono text-3xl text-shell-text-muted/25">
                                                {project.title.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col gap-2 p-3">
                                        <h3 className="text-sm font-bold tracking-tight text-shell-text">
                                            {project.title}
                                        </h3>
                                        <p className="line-clamp-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                                            {project.summary || 'Composition from the workshop.'}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}

export default FeaturedProjectsSection
