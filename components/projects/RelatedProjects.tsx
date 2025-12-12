'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import { TiltedCard } from '@/components/reactbits/TiltedCard'

interface RelatedProject {
    _id: string
    title: string
    slug: string
    summary?: string
    coverImage?: any
    projectType?: string
    category?: { name: string; slug: string }
}

interface RelatedProjectsProps {
    projects: RelatedProject[]
    currentProjectId: string
    title?: string
    className?: string
}

export function RelatedProjects({
    projects,
    currentProjectId,
    title = "Related Projects",
    className
}: RelatedProjectsProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.2 })
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    // Filter out current project
    const filteredProjects = projects.filter(p => p._id !== currentProjectId)

    if (filteredProjects.length === 0) return null

    const checkScrollability = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10)
        }
    }

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.8
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
            setTimeout(checkScrollability, 300)
        }
    }

    return (
        <section 
            ref={containerRef}
            className={cn("py-20 overflow-hidden", className)}
        >
            <div className="container max-w-7xl">
                {/* Header */}
                <motion.div 
                    className="flex items-center justify-between mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
                    
                    {/* Navigation Arrows */}
                    <div className="flex gap-2">
                        <motion.button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className={cn(
                                "p-3 rounded-xl border border-border bg-card transition-all",
                                canScrollLeft 
                                    ? "hover:bg-secondary hover:border-foreground/20" 
                                    : "opacity-50 cursor-not-allowed"
                            )}
                            whileHover={canScrollLeft ? { scale: 1.05 } : {}}
                            whileTap={canScrollLeft ? { scale: 0.95 } : {}}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className={cn(
                                "p-3 rounded-xl border border-border bg-card transition-all",
                                canScrollRight 
                                    ? "hover:bg-secondary hover:border-foreground/20" 
                                    : "opacity-50 cursor-not-allowed"
                            )}
                            whileHover={canScrollRight ? { scale: 1.05 } : {}}
                            whileTap={canScrollRight ? { scale: 0.95 } : {}}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </motion.div>

                {/* Carousel */}
                <div className="relative">
                    {/* Gradient Masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                    {/* Scrollable Container */}
                    <div
                        ref={scrollRef}
                        onScroll={checkScrollability}
                        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-4 -mx-4"
                        style={{ scrollSnapType: 'x mandatory' }}
                    >
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project._id}
                                initial={{ opacity: 0, x: 50 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex-shrink-0 w-[320px] md:w-[380px]"
                                style={{ scrollSnapAlign: 'start' }}
                            >
                                <Link href={`/projects/${project.slug}`} className="group block">
                                    <TiltedCard
                                        rotateAmplitude={6}
                                        scaleOnHover={1.02}
                                        className="h-full"
                                    >
                                        <div className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300">
                                            {/* Image */}
                                            <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                                                {project.coverImage && (
                                                    <Image
                                                        src={urlFor(project.coverImage).width(500).height(312).url()}
                                                        alt={project.title}
                                                        fill
                                                        sizes="400px"
                                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                )}
                                                
                                                {/* Type Badge */}
                                                {project.projectType && (
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
                                                )}

                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <motion.div
                                                        initial={{ scale: 0.8, opacity: 0 }}
                                                        whileHover={{ scale: 1, opacity: 1 }}
                                                        className="p-4 rounded-full bg-white text-black"
                                                    >
                                                        <ArrowUpRight className="w-6 h-6" />
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-5">
                                                <h3 className="text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">
                                                    {project.title}
                                                </h3>
                                                {project.summary && (
                                                    <p className="text-muted-foreground text-sm line-clamp-2 mt-1.5">
                                                        {project.summary}
                                                    </p>
                                                )}
                                                {project.category && (
                                                    <p className="text-xs text-muted-foreground mt-3 uppercase tracking-wider">
                                                        {project.category.name}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </TiltedCard>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* View All Link */}
                <motion.div 
                    className="mt-10 text-center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                >
                    <Link 
                        href="/projects"
                        className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                    >
                        View all projects
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
