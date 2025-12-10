'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, Video, Code, Filter, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProjectCard, ProjectCategory } from '@/sanity/lib/fetch'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface ProjectGridProps {
    projects: ProjectCard[]
    categories: ProjectCategory[]
}

const ALL_FILTER = 'all'

export function ProjectGrid({ projects, categories }: ProjectGridProps) {
    const [activeCategory, setActiveCategory] = useState(ALL_FILTER)
    const [activeType, setActiveType] = useState<string | null>(null)

    // Filter Logic
    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const matchCategory = activeCategory === ALL_FILTER || project.category?.slug === activeCategory
            const matchType = activeType === null || project.projectType === activeType || project.projectType === 'mixed'
            return matchCategory && matchType
        })
    }, [projects, activeCategory, activeType])

    return (
        <div className="space-y-12">

            {/* Search/Filter Bar */}
            <div className="sticky top-24 z-30 w-full glass-card p-2 rounded-2xl flex flex-col md:flex-row justify-between gap-4 items-center">

                {/* Category Pills */}
                <div className="flex overflow-x-auto gap-2 w-full md:w-auto p-1 no-scrollbar mask-gradient">
                    <button
                        onClick={() => setActiveCategory(ALL_FILTER)}
                        className={cn(
                            "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap border",
                            activeCategory === ALL_FILTER
                                ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                                : "bg-transparent border-transparent hover:bg-muted text-muted-foreground hover:text-foreground"
                        )}
                    >
                        All Works
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat._id}
                            onClick={() => setActiveCategory(cat.slug)}
                            className={cn(
                                "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap border",
                                activeCategory === cat.slug
                                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                                    : "bg-transparent border-transparent hover:bg-muted text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Type Toggles */}
                <div className="flex items-center bg-muted/50 p-1.5 rounded-xl border border-border/50">
                    <button
                        onClick={() => setActiveType(null)}
                        className={cn(
                            "px-3 py-2 rounded-lg transition-all flex items-center gap-2 text-sm font-medium",
                            activeType === null ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <LayoutGrid className="w-4 h-4" /> <span className="hidden sm:inline">All</span>
                    </button>
                    <button
                        onClick={() => setActiveType(activeType === 'web' ? null : 'web')}
                        className={cn(
                            "px-3 py-2 rounded-lg transition-all flex items-center gap-2 text-sm font-medium",
                            activeType === 'web' ? "bg-background shadow-sm text-blue-500" : "text-muted-foreground hover:text-blue-500"
                        )}
                    >
                        <Code className="w-4 h-4" /> <span className="hidden sm:inline">Dev</span>
                    </button>
                    <button
                        onClick={() => setActiveType(activeType === 'video' ? null : 'video')}
                        className={cn(
                            "px-3 py-2 rounded-lg transition-all flex items-center gap-2 text-sm font-medium",
                            activeType === 'video' ? "bg-background shadow-sm text-red-500" : "text-muted-foreground hover:text-red-500"
                        )}
                    >
                        <Video className="w-4 h-4" /> <span className="hidden sm:inline">Video</span>
                    </button>
                </div>
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20"
            >
                <AnimatePresence mode='popLayout'>
                    {filteredProjects.map((project) => (
                        <motion.div
                            layout
                            key={project._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="group"
                        >
                            <Link href={`/projects/${project.slug}`} className="flex flex-col h-full">
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted border border-border/50 transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/5">
                                    {project.coverImage && (
                                        <Image
                                            src={urlFor(project.coverImage).width(600).height(450).url()}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    )}

                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="px-5 py-2 rounded-full bg-background/90 text-foreground font-semibold shadow-lg scale-90 group-hover:scale-100 transition-transform">
                                            View Case Study
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-5 space-y-2 px-1">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                                        {project.projectType && (
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                                                {project.projectType}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">{project.summary}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
                <div className="py-24 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                        <Filter className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold">No projects found.</h3>
                    <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
                    <button onClick={() => { setActiveCategory(ALL_FILTER); setActiveType(null) }} className="mt-4 text-primary font-medium hover:underline">
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    )
}
