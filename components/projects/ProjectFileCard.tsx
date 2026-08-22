'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FileCode2, Film, Clapperboard } from 'lucide-react'
import type { ProjectCard as ProjectCardData } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/image'
import { useCursor } from '@/context/CursorContext'
import { cn } from '@/lib/utils'

function typeMeta(type: ProjectCardData['projectType']) {
    if (type === 'video') return { icon: Film, tone: 'text-syn-magenta', ext: 'aep' }
    if (type === 'web') return { icon: FileCode2, tone: 'text-syn-yellow', ext: 'tsx' }
    return { icon: Clapperboard, tone: 'text-syn-teal', ext: 'mix' }
}

interface ProjectFileCardProps {
    project: ProjectCardData
    sizes?: string
}

/**
 * FileCard — a project presented as a file in the workspace.
 * Reads as a designed comp tile even before the thumbnail loads.
 */
export function ProjectFileCard({ project, sizes }: ProjectFileCardProps) {
    const { setCursorVariant } = useCursor()
    const meta = typeMeta(project.projectType)
    const Icon = meta.icon

    return (
        <Link
            href={`/projects/${project.slug}`}
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
            className="group flex h-full flex-col overflow-hidden rounded-md border border-shell-border bg-shell-bg transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:border-shell-accent/60 hover:[transform:translateZ(14px)]"
        >
            {/* File header row */}
            <div className="flex items-center gap-1.5 border-b border-shell-border px-3 py-1.5 font-mono text-[10px] text-shell-text-muted">
                <Icon className={cn('h-3 w-3 shrink-0', meta.tone)} aria-hidden="true" />
                <span className="truncate">
                    {project.slug}
                    <span className="opacity-60">.{meta.ext}</span>
                </span>
                {project.isPinned && (
                    <span className="ml-auto shrink-0 text-shell-accent" aria-label="Pinned">
                        ◆
                    </span>
                )}
            </div>

            {/* Media — placeholder stays intentional while image loads/fails */}
            <div className="relative aspect-[16/10] overflow-hidden bg-shell-bg-alt">
                {/* Comp placeholder grid — visible until image covers it */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.14]"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, #4a5568 1px, transparent 1px), linear-gradient(to bottom, #4a5568 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center font-mono text-4xl text-shell-text-muted/30"
                >
                    {project.title.charAt(0).toUpperCase()}
                </div>
                {project.coverImage?.asset && (
                    <Image
                        src={urlFor(project.coverImage).width(640).height(400).url()}
                        alt={project.title}
                        fill
                        sizes={sizes ?? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                )}
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col gap-1.5 p-3.5">
                <h3 className="text-[15px] font-semibold tracking-tight text-shell-text">
                    {project.title}
                </h3>
                <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.summary || 'Composition from the workshop.'}
                </p>
                {project.tags && project.tags.length > 0 && (
                    <ul className="mt-1 flex flex-wrap gap-1">
                        {project.tags.slice(0, 2).map((tag) => (
                            <li
                                key={tag.slug}
                                className="rounded border border-shell-border px-1.5 py-0.5 font-mono text-[10px] text-shell-text-muted"
                            >
                                {tag.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Link>
    )
}
