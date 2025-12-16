'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { LayoutGrid, Video, Code, Filter, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProjectCard, ProjectCategory } from '@/sanity/lib/fetch'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import { AnimatedFilterTabs } from './AnimatedFilterTabs'
import { AnimatedSearch } from './AnimatedSearch'
import { AnimatedCounter } from '@/components/reactbits'
import { LoadMoreButton } from './LoadMoreButton'
import { TiltedCard } from '@/components/reactbits/TiltedCard'

interface ProjectGridProps {
    projects: ProjectCard[]
    categories: ProjectCategory[]
}

const ALL_FILTER = 'all'
const ITEMS_PER_PAGE = 9

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 25
        }
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.2 }
    }
}

export function ProjectGridEnhanced({ projects, categories }: ProjectGridProps) {
    const [activeCategory, setActiveCategory] = useState(ALL_FILTER)
    const [activeType, setActiveType] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
    const [isLoadingMore, setIsLoadingMore] = useState(false)

    // Build category tabs
    const categoryTabs = useMemo(() => {
        const tabs: Array<{ id: string; label: string; icon?: React.ReactNode }> = [
            { id: ALL_FILTER, label: 'All Works', icon: <Sparkles className="w-4 h-4" /> }
        ]
        categories.forEach(cat => {
            tabs.push({ id: cat.slug, label: cat.name })
        })
        return tabs
    }, [categories])

    // Build type tabs
    const typeTabs = useMemo(() => [
        { id: 'all', label: 'All', icon: <LayoutGrid className="w-4 h-4" /> },
        { id: 'web', label: 'Dev', icon: <Code className="w-4 h-4" /> },
        { id: 'video', label: 'Video', icon: <Video className="w-4 h-4" /> },
    ], [])

    // Filter Logic with search
    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            // Category filter
            const matchCategory = activeCategory === ALL_FILTER || project.category?.slug === activeCategory

            // Type filter
            const matchType = activeType === null || activeType === 'all' ||
                project.projectType === activeType || project.projectType === 'mixed'

            // Search filter
            const searchLower = searchQuery.toLowerCase().trim()
            const matchSearch = !searchLower ||
                project.title.toLowerCase().includes(searchLower) ||
                project.summary?.toLowerCase().includes(searchLower) ||
                project.tags?.some(tag => tag.name.toLowerCase().includes(searchLower)) ||
                project.tools?.some(tool => tool.name.toLowerCase().includes(searchLower))

            return matchCategory && matchType && matchSearch
        })
    }, [projects, activeCategory, activeType, searchQuery])

    // Paginated projects
    const visibleProjects = useMemo(() => {
        return filteredProjects.slice(0, visibleCount)
    }, [filteredProjects, visibleCount])

    // Reset pagination when filters change
    const handleCategoryChange = useCallback((id: string) => {
        setActiveCategory(id)
        setVisibleCount(ITEMS_PER_PAGE)
    }, [])

    const handleTypeChange = useCallback((id: string) => {
        setActiveType(id === 'all' ? null : id)
        setVisibleCount(ITEMS_PER_PAGE)
    }, [])

    const handleSearchChange = useCallback((value: string) => {
        setSearchQuery(value)
        setVisibleCount(ITEMS_PER_PAGE)
    }, [])

    // Load more handler
    const handleLoadMore = useCallback(async () => {
        setIsLoadingMore(true)
        // Simulate loading delay for smooth animation
        await new Promise(resolve => setTimeout(resolve, 300))
        setVisibleCount(prev => prev + ITEMS_PER_PAGE)
        setIsLoadingMore(false)
    }, [])

    // Clear all filters
    const clearFilters = useCallback(() => {
        setActiveCategory(ALL_FILTER)
        setActiveType(null)
        setSearchQuery('')
        setVisibleCount(ITEMS_PER_PAGE)
    }, [])

    const hasActiveFilters = activeCategory !== ALL_FILTER || activeType !== null || searchQuery !== ''
    const hasMore = visibleProjects.length < filteredProjects.length

    return (
        <div className="space-y-8">
            {/* Filter Bar - only sticky on desktop */}
            <div className="md:sticky md:top-20 z-30 w-full space-y-4 py-4 md:bg-background/80 md:backdrop-blur-xl md:border-b md:border-border/50">

                {/* Top Row: Categories & Search */}
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    {/* Category Filter */}
                    <div className="w-full lg:w-auto overflow-x-auto scrollbar-hide">
                        <AnimatedFilterTabs
                            tabs={categoryTabs}
                            activeTab={activeCategory}
                            onTabChange={handleCategoryChange}
                            className="w-max"
                        />
                    </div>

                    {/* Search */}
                    <div className="w-full lg:w-80">
                        <AnimatedSearch
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search by title, tag, or tool..."
                        />
                    </div>
                </div>

                {/* Bottom Row: Type Filter & Results Count */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Type Filter */}
                    <AnimatedFilterTabs
                        tabs={typeTabs}
                        activeTab={activeType || 'all'}
                        onTabChange={handleTypeChange}
                    />

                    {/* Results Count */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <motion.span
                            initial={false}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.3 }}
                            key={filteredProjects.length}
                            className="font-bold text-foreground"
                        >
                            <AnimatedCounter value={filteredProjects.length} />
                        </motion.span>
                        <span>
                            {filteredProjects.length === 1 ? 'project' : 'projects'} found
                        </span>

                        {hasActiveFilters && (
                            <motion.button
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                onClick={clearFilters}
                                className="ml-2 text-primary hover:underline"
                            >
                                Clear filters
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <motion.div
                layout
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                data-testid="project-grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {visibleProjects.map((project, index) => (
                        <motion.div
                            key={project._id}
                            layout
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="group"
                        >
                            <Link href={`/projects/${project.slug}`} className="block h-full">
                                <TiltedCard
                                    rotateAmplitude={8}
                                    scaleOnHover={1.02}
                                    className="h-full"
                                >
                                    <div className="flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-colors duration-300">
                                        {/* Image */}
                                        <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                                            {project.coverImage && (
                                                <Image
                                                    src={urlFor(project.coverImage).width(600).height(375).url()}
                                                    alt={project.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            )}

                                            {/* Featured Badge */}
                                            {project.isFeatured && (
                                                <div className="absolute top-3 left-3">
                                                    <span className="px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                                        <Sparkles className="w-3 h-3" />
                                                        Featured
                                                    </span>
                                                </div>
                                            )}

                                            {/* Type Badge */}
                                            <div className="absolute top-3 right-3">
                                                <span className={cn(
                                                    "px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                                                    project.projectType === 'video'
                                                        ? "bg-red-500/90 text-white"
                                                        : project.projectType === 'web'
                                                            ? "bg-blue-500/90 text-white"
                                                            : "bg-purple-500/90 text-white"
                                                )}>
                                                    {project.projectType}
                                                </span>
                                            </div>

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                <span className="text-white text-sm font-medium">
                                                    View Case Study →
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 p-5 space-y-3">
                                            <div>
                                                <h3 className="text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">
                                                    {project.title}
                                                </h3>
                                                <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                                                    {project.summary}
                                                </p>
                                            </div>

                                            {/* Tags */}
                                            {project.tags && project.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5">
                                                    {project.tags.slice(0, 3).map((tag) => (
                                                        <span
                                                            key={tag.slug}
                                                            className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-md"
                                                        >
                                                            {tag.name}
                                                        </span>
                                                    ))}
                                                    {project.tags.length > 3 && (
                                                        <span className="px-2 py-0.5 text-muted-foreground text-xs">
                                                            +{project.tags.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </TiltedCard>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Load More */}
            {filteredProjects.length > 0 && (
                <LoadMoreButton
                    onClick={handleLoadMore}
                    isLoading={isLoadingMore}
                    hasMore={hasMore}
                    loadedCount={visibleProjects.length}
                    totalCount={filteredProjects.length}
                    className="pt-8"
                />
            )}

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-24 text-center"
                    data-testid="no-projects-message"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                        <Filter className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">No projects found</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        {searchQuery
                            ? `No results for "${searchQuery}". Try a different search term.`
                            : "Try adjusting your filters to find what you're looking for."
                        }
                    </p>
                    <button
                        onClick={clearFilters}
                        data-testid="clear-all-filters"
                        className="mt-6 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                    >
                        Clear all filters
                    </button>
                </motion.div>
            )}
        </div>
    )
}
