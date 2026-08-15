'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { FileCode2, Film, Folder, ChevronDown, Search, X } from 'lucide-react'
import type { ProjectCard, ProjectCategory } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/image'
import { useCursor } from '@/context/CursorContext'
import { cn } from '@/lib/utils'

interface ProjectWorkspaceProps {
    projects: ProjectCard[]
    categories: ProjectCategory[]
}

const TYPE_FILTERS = [
    { id: 'all', label: 'All' },
    { id: 'web', label: 'Dev' },
    { id: 'video', label: 'Video' },
] as const

type TypeFilter = (typeof TYPE_FILTERS)[number]['id']

function typeMeta(type: ProjectCard['projectType']) {
    if (type === 'video') return { icon: Film, tone: 'text-syn-magenta', ext: '.aep' }
    if (type === 'web') return { icon: FileCode2, tone: 'text-syn-yellow', ext: '.tsx' }
    return { icon: Film, tone: 'text-syn-teal', ext: '.mix' }
}

export function ProjectWorkspace({ projects, categories }: ProjectWorkspaceProps) {
    const { setCursorVariant } = useCursor()
    const [activeCategory, setActiveCategory] = useState<string>('all')
    const [activeType, setActiveType] = useState<TypeFilter>('all')
    const [query, setQuery] = useState('')

    const filtered = useMemo(() => {
        return projects.filter((project) => {
            if (activeCategory !== 'all' && project.category?.slug !== activeCategory) return false
            if (activeType !== 'all' && project.projectType !== activeType) return false
            if (query.trim()) {
                const haystack = [
                    project.title,
                    project.summary,
                    ...(project.tags?.map((t) => t.name) ?? []),
                    ...(project.tools?.map((t) => t.name) ?? []),
                ]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase()
                if (!haystack.includes(query.trim().toLowerCase())) return false
            }
            return true
        })
    }, [projects, activeCategory, activeType, query])

    const countFor = (slug: string) =>
        slug === 'all'
            ? projects.length
            : projects.filter((p) => p.category?.slug === slug).length

    return (
        <section className="w-full border-b border-shell-border bg-shell-bg-alt">
            <div className="flex min-h-[calc(100svh-2.75rem)] flex-col lg:flex-row">
                {/* Explorer rail — category tree */}
                <aside
                    className="hidden lg:flex w-56 shrink-0 flex-col border-r border-shell-border bg-shell-bg"
                    aria-label="Project categories"
                >
                    <div className="border-b border-shell-border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-shell-text-muted">
                        Explorer
                    </div>
                    <div className="px-2 py-2">
                        <div className="flex items-center gap-1.5 px-2 py-1 font-mono text-[11px] text-shell-text-muted">
                            <ChevronDown className="h-3 w-3" aria-hidden="true" />
                            <Folder className="h-3 w-3 text-syn-blue" aria-hidden="true" />
                            projects
                        </div>
                        <ul className="mt-0.5 space-y-0.5 pl-3">
                            {[{ _id: 'all', name: 'all', slug: 'all' }, ...categories].map((cat) => {
                                const isActive = activeCategory === cat.slug
                                return (
                                    <li key={cat._id}>
                                        <button
                                            type="button"
                                            onClick={() => setActiveCategory(cat.slug)}
                                            aria-pressed={isActive}
                                            className={cn(
                                                'flex w-full items-center justify-between gap-2 rounded px-2 py-1 font-mono text-[11px] transition-colors',
                                                isActive
                                                    ? 'border-l-2 border-shell-accent bg-shell-active text-shell-text'
                                                    : 'text-shell-text-muted hover:bg-shell-active/60 hover:text-shell-text'
                                            )}
                                        >
                                            <span className="flex items-center gap-2 truncate">
                                                <Folder className="h-3 w-3 shrink-0 text-syn-blue/70" aria-hidden="true" />
                                                {cat.name}
                                            </span>
                                            <span className="shrink-0 tabular-nums opacity-60">{countFor(cat.slug)}</span>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </aside>

                {/* Editor pane */}
                <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-stretch border-b border-shell-border bg-shell-bg font-mono text-[11px]">
                        <span className="flex items-center gap-2 border-r border-shell-border bg-shell-bg-alt px-4 py-2 text-shell-text">
                            <Folder className="h-3 w-3 text-syn-blue" aria-hidden="true" />
                            projects
                            <span className="ml-1 h-1.5 w-1.5 rounded-full bg-shell-accent" aria-hidden="true" />
                        </span>
                        <span className="ml-auto hidden items-center px-4 py-2 text-shell-text-muted sm:flex">
                            {filtered.length} of {projects.length}
                        </span>
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-col gap-2.5 border-b border-shell-border bg-shell-bg px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
                        <div
                            className="flex items-center gap-1 rounded-md border border-shell-border bg-shell-bg-alt p-0.5"
                            role="group"
                            aria-label="Filter by type"
                        >
                            {TYPE_FILTERS.map((filter) => (
                                <button
                                    key={filter.id}
                                    type="button"
                                    onClick={() => setActiveType(filter.id)}
                                    aria-pressed={activeType === filter.id}
                                    className={cn(
                                        'rounded px-3 py-1 font-mono text-[11px] transition-colors',
                                        activeType === filter.id
                                            ? 'bg-shell-accent text-[#0b0b14]'
                                            : 'text-shell-text-muted hover:text-shell-text'
                                    )}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>

                        <label className="relative flex items-center sm:w-72">
                            <Search
                                className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-shell-text-muted"
                                aria-hidden="true"
                            />
                            <span className="sr-only">Search projects</span>
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="search projects…"
                                className="w-full rounded-md border border-shell-border bg-shell-bg-alt py-1.5 pl-8 pr-8 font-mono text-[11px] text-shell-text outline-none transition-colors placeholder:text-shell-text-muted/70 focus:border-shell-accent/60"
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery('')}
                                    aria-label="Clear search"
                                    className="absolute right-2 text-shell-text-muted hover:text-shell-text"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </label>
                    </div>

                    {/* Category strip — replaces the explorer rail below lg */}
                    <div
                        className="flex gap-1 overflow-x-auto border-b border-shell-border bg-shell-bg px-3 py-2 scrollbar-hide lg:hidden"
                        role="group"
                        aria-label="Filter by category"
                    >
                        {[{ _id: 'all', name: 'all', slug: 'all' }, ...categories].map((cat) => (
                            <button
                                key={cat._id}
                                type="button"
                                onClick={() => setActiveCategory(cat.slug)}
                                aria-pressed={activeCategory === cat.slug}
                                className={cn(
                                    'flex shrink-0 items-center gap-1.5 rounded border px-2.5 py-1 font-mono text-[11px] transition-colors',
                                    activeCategory === cat.slug
                                        ? 'border-shell-accent/60 bg-shell-active text-shell-text'
                                        : 'border-shell-border text-shell-text-muted hover:text-shell-text'
                                )}
                            >
                                {cat.name}
                                <span className="tabular-nums opacity-60">{countFor(cat.slug)}</span>
                            </button>
                        ))}
                    </div>

                    {/* Results */}
                    <div className="flex-1 p-3 sm:p-4">
                        {filtered.length === 0 ? (
                            <p className="px-2 py-10 text-center font-mono text-[12px] text-shell-text-muted">
                                no matching files
                            </p>
                        ) : (
                            <motion.ul
                                layout
                                className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
                            >
                                <AnimatePresence mode="popLayout">
                                    {filtered.map((project) => {
                                        const meta = typeMeta(project.projectType)
                                        const Icon = meta.icon
                                        return (
                                            <motion.li
                                                key={project._id}
                                                layout
                                                initial={{ opacity: 0, y: 12 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.97 }}
                                                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                                            >
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
                                                        <h2 className="text-sm font-bold tracking-tight text-shell-text">
                                                            {project.title}
                                                        </h2>
                                                        <p className="line-clamp-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                                                            {project.summary}
                                                        </p>
                                                        {project.tags && project.tags.length > 0 && (
                                                            <ul className="flex flex-wrap gap-1">
                                                                {project.tags.slice(0, 3).map((tag) => (
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
                                            </motion.li>
                                        )
                                    })}
                                </AnimatePresence>
                            </motion.ul>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
