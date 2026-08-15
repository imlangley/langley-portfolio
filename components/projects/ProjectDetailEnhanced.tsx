'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import {
    ArrowLeft,
    Calendar,
    Check,
    Copy,
    ExternalLink,
    FileCode2,
    Film,
    Github,
    Share2,
    User,
} from 'lucide-react'
import { urlFor } from '@/sanity/lib'
import type { GalleryItem, Project, RelatedProject, Tag, Tool } from '@/sanity/lib/fetch'
import { cn } from '@/lib/utils'

const ptComponents: PortableTextComponents = {
    block: {
        h2: ({ children }) => (
            <h2 className="mt-10 mb-4 text-2xl font-bold tracking-tight text-shell-text">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="mt-8 mb-3 text-xl font-bold text-shell-text">{children}</h3>
        ),
        normal: ({ children }) => (
            <p className="mb-4 text-[15px] leading-relaxed text-muted-foreground">{children}</p>
        ),
        blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-2 border-ae-purple pl-4 text-base italic text-shell-text">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="mb-4 list-disc space-y-1.5 pl-5 text-[15px] text-muted-foreground">{children}</ul>
        ),
        number: ({ children }) => (
            <ol className="mb-4 list-decimal space-y-1.5 pl-5 text-[15px] text-muted-foreground">{children}</ol>
        ),
    },
    marks: {
        link: ({ children, value }) => (
            <a
                href={value?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ae-cyan underline underline-offset-4 hover:text-ae-purple"
            >
                {children}
            </a>
        ),
        code: ({ children }) => (
            <code className="rounded border border-shell-border bg-shell-bg px-1.5 py-0.5 font-mono text-[12px]">
                {children}
            </code>
        ),
    },
    types: {
        code: ({ value }) => (
            <pre className="my-6 overflow-x-auto rounded-md border border-shell-border bg-shell-bg p-4">
                <code className="font-mono text-[13px] text-shell-text">{value?.code}</code>
            </pre>
        ),
    },
}

function typeMeta(type: Project['projectType']) {
    if (type === 'video') return { icon: Film, tone: 'text-syn-magenta', ext: '.aep', label: 'Comp' }
    if (type === 'web') return { icon: FileCode2, tone: 'text-syn-yellow', ext: '.tsx', label: 'App' }
    return { icon: Film, tone: 'text-syn-teal', ext: '.mix', label: 'Mixed' }
}

interface ProjectDetailEnhancedProps {
    project: Project
    relatedProjects: RelatedProject[]
}

export function ProjectDetailEnhanced({ project, relatedProjects }: ProjectDetailEnhancedProps) {
    const meta = typeMeta(project.projectType)
    const Icon = meta.icon
    const cover = project.coverImage ? urlFor(project.coverImage).width(1600).height(900).url() : ''
    const formattedDate = project.date
        ? new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
        : null
    const others = relatedProjects.filter((p) => p._id !== project._id)

    return (
        <article className="w-full border-b border-shell-border bg-shell-bg-alt">
            <div className="flex min-h-[calc(100svh-2.75rem)] flex-col">
                <div className="flex items-stretch overflow-x-auto border-b border-shell-border bg-shell-bg font-mono text-[11px]">
                    <Link
                        href="/projects"
                        className="flex shrink-0 items-center gap-2 border-r border-shell-border px-4 py-2 text-shell-text-muted transition-colors hover:text-shell-text"
                    >
                        <ArrowLeft className="h-3 w-3" aria-hidden="true" />
                        projects
                    </Link>
                    <span className="flex shrink-0 items-center gap-2 bg-shell-bg-alt px-4 py-2 text-shell-text">
                        <Icon className={cn('h-3 w-3', meta.tone)} aria-hidden="true" />
                        {project.slug}
                        {meta.ext}
                        <span className="ml-1 h-1.5 w-1.5 rounded-full bg-shell-accent" aria-hidden="true" />
                    </span>
                </div>

                <div className="grid flex-1 gap-0 lg:grid-cols-[minmax(0,1fr)_280px]">
                    <div className="min-w-0">
                        <div className="relative aspect-[16/9] overflow-hidden border-b border-shell-border bg-shell-bg">
                            {cover ? (
                                <Image
                                    src={cover}
                                    alt={project.title}
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 70vw"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center font-mono text-6xl text-shell-text-muted/20">
                                    {project.title.charAt(0)}
                                </div>
                            )}
                            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                                <span className="rounded border border-shell-border bg-shell-bg/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-shell-text">
                                    {meta.label}
                                </span>
                                {project.isCommission && (
                                    <span className="rounded border border-shell-border bg-shell-bg/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ae-cyan">
                                        Commission
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-8 p-5 sm:p-8">
                            <header>
                                {project.category && (
                                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-shell-text-muted">
                                        {project.category.name}
                                    </p>
                                )}
                                <h1 className="mt-2 text-3xl font-black tracking-tight text-shell-text sm:text-4xl">
                                    {project.title}
                                </h1>
                                {project.summary && (
                                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                                        {project.summary}
                                    </p>
                                )}
                                <div className="mt-4 flex flex-wrap gap-4 font-mono text-[11px] text-shell-text-muted">
                                    {project.clientName && (
                                        <span className="inline-flex items-center gap-1.5">
                                            <User className="h-3 w-3" aria-hidden="true" />
                                            {project.clientName}
                                        </span>
                                    )}
                                    {formattedDate && (
                                        <span className="inline-flex items-center gap-1.5">
                                            <Calendar className="h-3 w-3" aria-hidden="true" />
                                            {formattedDate}
                                        </span>
                                    )}
                                </div>
                            </header>

                            {project.description && (
                                <div>
                                    <PortableText value={project.description as never} components={ptComponents} />
                                </div>
                            )}

                            {project.videoEmbedUrl && (
                                <section>
                                    <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-shell-text-muted">
                                        Featured video
                                    </h2>
                                    <div className="aspect-video overflow-hidden rounded-md border border-shell-border bg-black">
                                        <iframe
                                            src={project.videoEmbedUrl}
                                            className="h-full w-full"
                                            allowFullScreen
                                            title={project.title}
                                        />
                                    </div>
                                </section>
                            )}

                            {project.gallery && project.gallery.length > 0 && (
                                <section>
                                    <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-shell-text-muted">
                                        Gallery
                                    </h2>
                                    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                        {project.gallery.map((item, i) => (
                                            <li key={`${item.type}-${i}`}>
                                                <GalleryFrame item={item} />
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </div>
                    </div>

                    <aside className="border-t border-shell-border bg-shell-bg p-5 lg:border-l lg:border-t-0">
                        <ProjectInspector
                            clientName={project.clientName}
                            date={formattedDate}
                            tools={project.tools}
                            tags={project.tags}
                            liveUrl={project.liveUrl}
                            repoUrl={project.repoUrl}
                        />
                    </aside>
                </div>

                {others.length > 0 && (
                    <section className="border-t border-shell-border bg-shell-bg px-4 py-8 sm:px-6">
                        <div className="mb-4 flex items-end justify-between">
                            <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-shell-text-muted">
                                More comps
                            </h2>
                            <Link
                                href="/projects"
                                className="font-mono text-[11px] text-ae-cyan hover:text-ae-purple"
                            >
                                View all →
                            </Link>
                        </div>
                        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                            {others.slice(0, 6).map((related) => {
                                const relatedMeta = typeMeta(related.projectType)
                                const RelatedIcon = relatedMeta.icon
                                return (
                                    <li key={related._id}>
                                        <Link
                                            href={`/projects/${related.slug}`}
                                            className="group flex h-full flex-col overflow-hidden rounded-md border border-shell-border bg-shell-bg-alt transition-colors hover:border-shell-accent/50"
                                        >
                                            <div className="flex items-center gap-1.5 border-b border-shell-border px-3 py-1.5 font-mono text-[10px] text-shell-text-muted">
                                                <RelatedIcon
                                                    className={cn('h-3 w-3 shrink-0', relatedMeta.tone)}
                                                    aria-hidden="true"
                                                />
                                                <span className="truncate">
                                                    {related.slug}
                                                    {relatedMeta.ext}
                                                </span>
                                            </div>
                                            <div className="relative aspect-[16/10] overflow-hidden bg-shell-bg">
                                                {related.coverImage ? (
                                                    <Image
                                                        src={urlFor(related.coverImage).width(640).height(400).url()}
                                                        alt={related.title}
                                                        fill
                                                        sizes="(max-width: 640px) 100vw, 33vw"
                                                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center font-mono text-3xl text-shell-text-muted/25">
                                                        {related.title.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-3">
                                                <h3 className="text-sm font-bold tracking-tight text-shell-text">
                                                    {related.title}
                                                </h3>
                                                {related.summary && (
                                                    <p className="mt-1 line-clamp-2 text-[13px] text-muted-foreground">
                                                        {related.summary}
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </section>
                )}
            </div>
        </article>
    )
}

function GalleryFrame({ item }: { item: GalleryItem }) {
    if (item.type === 'video' && item.videoEmbedUrl) {
        return (
            <div className="overflow-hidden rounded-md border border-shell-border bg-black">
                <div className="aspect-video">
                    <iframe src={item.videoEmbedUrl} className="h-full w-full" allowFullScreen title={item.caption || 'Video'} />
                </div>
                {item.caption && (
                    <p className="border-t border-shell-border bg-shell-bg px-3 py-2 text-[12px] text-muted-foreground">
                        {item.caption}
                    </p>
                )}
            </div>
        )
    }

    if (!item.image) return null

    return (
        <figure className="overflow-hidden rounded-md border border-shell-border bg-shell-bg">
            <div className="relative aspect-[4/3]">
                <Image
                    src={urlFor(item.image).width(800).url()}
                    alt={item.caption || 'Project visual'}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                />
            </div>
            {item.caption && (
                <figcaption className="border-t border-shell-border px-3 py-2 text-[12px] text-muted-foreground">
                    {item.caption}
                </figcaption>
            )}
        </figure>
    )
}

function ProjectInspector({
    clientName,
    date,
    tools,
    tags,
    liveUrl,
    repoUrl,
}: {
    clientName?: string
    date: string | null
    tools?: Tool[]
    tags?: Tag[]
    liveUrl?: string
    repoUrl?: string
}) {
    const [copied, setCopied] = useState(false)

    const copyLink = async () => {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="space-y-5 lg:sticky lg:top-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-shell-text-muted">
                Inspector
            </p>
            {liveUrl && (
                <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-ae-purple text-sm font-semibold text-[#0b0b14] transition-colors hover:bg-ae-cyan"
                >
                    Visit live site
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
            )}
            {repoUrl && (
                <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-shell-border bg-shell-bg-alt text-sm font-semibold text-shell-text transition-colors hover:border-shell-accent/50"
                >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    View source
                </a>
            )}

            <dl className="space-y-3 rounded-md border border-shell-border bg-shell-bg-alt p-4 font-mono text-[12px]">
                {clientName && (
                    <div>
                        <dt className="text-[10px] uppercase tracking-wider text-shell-text-muted">Client</dt>
                        <dd className="mt-1 text-shell-text">{clientName}</dd>
                    </div>
                )}
                {date && (
                    <div>
                        <dt className="text-[10px] uppercase tracking-wider text-shell-text-muted">Timeline</dt>
                        <dd className="mt-1 text-shell-text">{date}</dd>
                    </div>
                )}
                {tools && tools.length > 0 && (
                    <div>
                        <dt className="mb-2 text-[10px] uppercase tracking-wider text-shell-text-muted">Tools</dt>
                        <dd className="flex flex-wrap gap-1.5">
                            {tools.map((tool) => (
                                <span
                                    key={tool.slug}
                                    className="rounded border border-shell-border bg-shell-bg px-2 py-0.5 text-[11px] text-shell-text"
                                >
                                    {tool.name}
                                </span>
                            ))}
                        </dd>
                    </div>
                )}
                {tags && tags.length > 0 && (
                    <div>
                        <dt className="mb-2 text-[10px] uppercase tracking-wider text-shell-text-muted">Tags</dt>
                        <dd className="flex flex-wrap gap-1.5">
                            {tags.map((tag) => (
                                <span
                                    key={tag.slug}
                                    className="rounded border border-shell-border px-2 py-0.5 text-[11px] text-shell-text-muted"
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </dd>
                    </div>
                )}
            </dl>

            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={() => {
                        const url = encodeURIComponent(window.location.href)
                        const title = encodeURIComponent(document.title)
                        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank', 'width=600,height=400')
                    }}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-shell-border bg-shell-bg-alt py-2.5 text-[12px] font-medium text-shell-text hover:border-shell-accent/50"
                >
                    <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Share
                </button>
                <button
                    type="button"
                    onClick={() => void copyLink()}
                    aria-label={copied ? 'Link copied' : 'Copy link'}
                    className="inline-flex items-center justify-center rounded-md border border-shell-border bg-shell-bg-alt px-3 py-2.5 text-shell-text hover:border-shell-accent/50"
                >
                    {copied ? (
                        <Check className="h-3.5 w-3.5 text-syn-green" aria-hidden="true" />
                    ) : (
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                </button>
            </div>
        </div>
    )
}
