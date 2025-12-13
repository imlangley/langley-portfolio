'use client'

import { useMemo } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Play } from 'lucide-react'
import { TiltedCard, SplitText, Magnet, ShinyText } from '@/components/reactbits'
import { urlFor } from '@/sanity/lib/image'
import type { ProjectCard } from '@/sanity/lib/fetch'
import { useCursor } from '@/context/CursorContext'

interface FeaturedProjectsSectionProps {
    projects: ProjectCard[]
}

// Fisher-Yates shuffle for randomizing projects on each page load
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
    const { setCursorVariant } = useCursor()

    // Randomly shuffle projects on component mount (client-side only)
    const shuffledProjects = useMemo(() => {
        // Keep pinned projects at the front, shuffle the rest
        const pinned = projects.filter(p => p.isPinned)
        const nonPinned = projects.filter(p => !p.isPinned)
        return [...pinned, ...shuffleArray(nonPinned)].slice(0, 6)
    }, [projects])

    if (!projects.length) {
        return null
    }

    return (
        <section id="projects" className="relative py-24 px-6 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto relative">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-2 mb-4"
                    >
                        <div className="w-8 h-px bg-blue-500" />
                        <span className="text-blue-400 text-sm font-mono uppercase tracking-wider">
                            Featured Work
                        </span>
                        <div className="w-8 h-px bg-blue-500" />
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        <SplitText
                            text="Selected Projects"
                            delay={0.2}
                            animationFrom={{ opacity: 0, y: 30 }}
                            animationTo={{ opacity: 1, y: 0 }}
                        />
                    </h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        A curated collection of my best work spanning video editing, motion graphics, and web development.
                    </motion.p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {shuffledProjects.map((project, index) => (
                        <motion.div
                            key={project._id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </div>

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                >
                    <Magnet magnetStrength={0.3}>
                        <Link
                            href="/projects"
                            onMouseEnter={() => setCursorVariant('button')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium transition-all duration-300 group shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                        >
                            <span>View All Projects</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Magnet>
                </motion.div>
            </div>
        </section>
    )
}

interface ProjectCardProps {
    project: ProjectCard
}

function ProjectCard({ project }: ProjectCardProps) {
    const { setCursorVariant } = useCursor()

    const projectTypeIcon = {
        video: <Play className="w-4 h-4" />,
        web: <ExternalLink className="w-4 h-4" />,
        mixed: <ExternalLink className="w-4 h-4" />,
    }

    const projectTypeLabel = {
        video: 'Video',
        web: 'Web',
        mixed: 'Mixed',
    }

    return (
        <TiltedCard
            rotateAmplitude={12}
            scaleOnHover={1.02}
            showShine={true}
            containerClassName="h-full"
            className="h-full"
        >
            <Link
                href={`/projects/${project.slug}`}
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                className="block h-full"
            >
                <article
                    className="relative h-full flex flex-col rounded-xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-colors group"
                    style={{
                        '--accent-color': project.accentColor || '#3b82f6',
                    } as React.CSSProperties}
                >
                    {/* Cover Image */}
                    <div className="relative aspect-video overflow-hidden">
                        {project.coverImage?.asset ? (
                            <Image
                                src={urlFor(project.coverImage).width(600).height(340).url()}
                                alt={project.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div
                                className="w-full h-full flex items-center justify-center"
                                style={{ backgroundColor: project.accentColor || '#252525' }}
                            >
                                <span className="text-4xl font-bold text-white/20">
                                    {project.title.charAt(0)}
                                </span>
                            </div>
                        )}

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                        {/* Project type badge */}
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs text-white border border-white/10">
                            {projectTypeIcon[project.projectType] || projectTypeIcon.web}
                            <span>{projectTypeLabel[project.projectType] || 'Project'}</span>
                        </div>

                        {/* Pinned indicator */}
                        {project.isPinned && (
                            <div className="absolute top-3 left-3 px-2 py-1 bg-blue-600 rounded-full text-xs text-white font-medium">
                                Pinned
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5 flex flex-col">
                        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {project.title}
                        </h3>

                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
                            {project.summary || 'A creative project showcasing design and development skills.'}
                        </p>

                        {/* Tags */}
                        {project.tags && project.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {project.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag.slug}
                                        className="px-2 py-0.5 bg-secondary rounded text-xs text-muted-foreground"
                                    >
                                        {tag.name}
                                    </span>
                                ))}
                                {project.tags.length > 3 && (
                                    <span className="px-2 py-0.5 text-xs text-gray-600">
                                        +{project.tags.length - 3}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Accent bar */}
                        <div
                            className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ backgroundColor: project.accentColor || '#3b82f6' }}
                        />
                    </div>
                </article>
            </Link>
        </TiltedCard>
    )
}

export default FeaturedProjectsSection
