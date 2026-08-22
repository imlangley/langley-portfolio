'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Folder, ChevronDown, Search, X } from 'lucide-react'
import type { ProjectCard, ProjectCategory } from '@/sanity/lib/fetch'
import { cn } from '@/lib/utils'
import { ProjectFileCard } from './ProjectFileCard'

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


export function ProjectWorkspace({ projects, categories }: ProjectWorkspaceProps) {
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
        <section className="py-10 sm:py-14">
            <div className="flex gap-0 overflow-hidden rounded-lg border border-shell-border bg-shell-bg">
                {/* Explorer rail — category tree */}
                <aside className="hidden w-52 shrink-0 flex-col border-r border-shell-border bg-shell-bg-alt lg:flex" aria-label="Categories">
                    <div className="px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-shell-text-muted">
                        Explorer
                    </div>
                    <div className="px-2 py-1">
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
                <div className="min-w-0 flex-1">
            <div className="px-5 py-8 sm:px-8 sm:py-10">
            <p className="font-mono text-[11px] text-syn-green">
                {'// projects'}
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-shell-text sm:text-4xl">
                All work
            </h1>

            {/* Filters — one quiet row */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div
                    className="flex items-center gap-1 overflow-x-auto rounded-lg border border-shell-border p-1 scrollbar-hide"
                    role="group"
                    aria-label="Filter projects"
                >
                    {TYPE_FILTERS.map((filter) => (
                        <button
                            key={filter.id}
                            type="button"
                            onClick={() => setActiveType(filter.id)}
                            aria-pressed={activeType === filter.id}
                            className={cn(
                                'shrink-0 rounded-md px-3 py-1.5 text-sm transition-colors',
                                activeType === filter.id
                                    ? 'bg-shell-active text-shell-text'
                                    : 'text-shell-text-muted hover:text-shell-text'
                            )}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Category strip — below lg */}
                <div className="mt-3 flex gap-1.5 overflow-x-auto scrollbar-hide lg:hidden" role="group" aria-label="Filter by category">
                    {[{ _id: 'all', name: 'all', slug: 'all' }, ...categories].map((cat) => (
                        <button
                            key={cat._id}
                            type="button"
                            onClick={() => setActiveCategory(cat.slug)}
                            aria-pressed={activeCategory === cat.slug}
                            className={cn(
                                'flex shrink-0 items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors',
                                activeCategory === cat.slug
                                    ? 'border-shell-accent/60 bg-shell-active text-shell-text'
                                    : 'border-shell-border text-shell-text-muted hover:text-shell-text'
                            )}
                        >
                            {cat.name}
                            <span className="font-mono text-[10px] opacity-60">{countFor(cat.slug)}</span>
                        </button>
                    ))}
                </div>

                <label className="relative flex items-center sm:w-64">
                    <Search
                        className="pointer-events-none absolute left-3 h-4 w-4 text-shell-text-muted"
                        aria-hidden="true"
                    />
                    <span className="sr-only">Search projects</span>
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search…"
                        className="w-full rounded-lg border border-shell-border bg-shell-bg py-2 pl-9 pr-8 text-sm text-shell-text outline-none transition-colors placeholder:text-shell-text-muted/70 focus:border-shell-accent/60"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            aria-label="Clear search"
                            className="absolute right-2.5 text-shell-text-muted hover:text-shell-text"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </label>
            </div>

            <p className="mt-5 font-mono text-[11px] text-shell-text-muted">
                {filtered.length} of {projects.length} projects
            </p>

            {/* Results */}
            <div className="mt-4">
                {filtered.length === 0 ? (
                    <p className="py-16 text-center text-sm text-shell-text-muted">
                        No matching projects.
                    </p>
                ) : (
                    <motion.ul layout className="perspective-1200 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <AnimatePresence mode="popLayout">
                            {filtered.map((project) => (
                                <motion.li
                                    key={project._id}
                                    layout
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                                >
                                    <ProjectFileCard project={project} />
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </motion.ul>
                )}
            </div>
                </div>
            </div>
            </div>
        </section>
    )
}
