'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ProjectCard } from '@/sanity/lib/fetch'
import { useCursor } from '@/context/CursorContext'
import { Reveal } from '@/components/motion/Reveal'
import { ProjectFileCard } from '@/components/projects/ProjectFileCard'

interface FeaturedProjectsSectionProps {
    projects: ProjectCard[]
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
    const { setCursorVariant } = useCursor()

    const featured = [
        ...projects.filter((p) => p.isPinned),
        ...projects.filter((p) => !p.isPinned),
    ].slice(0, 6)

    if (!featured.length) return null

    return (
        <section id="projects" className="py-14 sm:py-20">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="font-mono text-[11px] text-syn-green">
                        {'// layer 02 · selected work'}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-shell-text sm:text-3xl">
                        Recent comps
                    </h2>
                </div>
                <Link
                    href="/projects"
                    onMouseEnter={() => setCursorVariant('button')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-shell-text-muted transition-colors hover:text-shell-text"
                >
                    All projects
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
            </div>

            <ul className="perspective-1200 mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((project, i) => (
                    <li key={project._id}>
                        <Reveal delay={(i % 3) * 0.07}>
                            <ProjectFileCard project={project} />
                        </Reveal>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default FeaturedProjectsSection
