'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { urlFor } from '@/sanity/lib/image'
import type { ProjectCard as ProjectCardType } from '@/sanity/lib/fetch'
import { cn } from '@/lib/utils'
import { useCursor } from '@/context/CursorContext'

interface FeaturedProjectsProps {
    projects: ProjectCardType[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { setCursorText, setCursorVariant } = useCursor()

    if (!projects?.length) return null

    // For simplicity in this vertical snap environment, we'll use a horizontal scroll container
    // that snaps to cards, rather than mapping vertical scroll to horizontal.
    // This feels better on trackpads when combined with vertical section snapping.

    return (
        <section id="projects" className="relative h-screen w-full snap-start bg-background flex flex-col justify-center overflow-hidden py-12">

            {/* Cinematic Section Title */}
            <div className="container absolute top-12 left-0 right-0 z-20 px-6 md:px-12 flex justify-between items-end">
                <div>
                    <span className="block text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-2">Selected Works</span>
                </div>
                <div className="hidden md:block">
                    <span className="block text-xs font-mono tracking-[0.2em] text-muted-foreground/50">DRAG TO EXPLORE</span>
                </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div
                className="w-full flex items-center overflow-x-auto snap-x snap-mandatory gap-6 px-6 md:px-12 pb-8 scrollbar-hide focus:outline-none"
                ref={containerRef}
            >
                {/* Intro Card / Title Slide */}
                <div className="snap-center shrink-0 w-[80vw] md:w-[30vw] h-[60vh] md:h-[70vh] flex items-center justify-center relative">
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent text-stroke leading-none opacity-50">
                        SELECT <br /> WORK
                    </h2>
                </div>

                {projects.map((project, index) => (
                    <ProjectCard
                        key={project._id}
                        project={project}
                        index={index}
                        setCursorText={setCursorText}
                        setCursorVariant={setCursorVariant}
                    />
                ))}

                {/* Outro / Link to Archive */}
                <div className="snap-center shrink-0 w-[50vw] md:w-[30vw] h-[60vh] md:h-[70vh] flex items-center justify-center">
                    <Link
                        href="/projects"
                        className="group flex flex-col items-center gap-4"
                        onMouseEnter={() => {
                            setCursorVariant('button')
                            setCursorText('OPEN')
                        }}
                        onMouseLeave={() => {
                            setCursorVariant('default')
                            setCursorText('')
                        }}
                    >
                        <div className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                            <span className="text-3xl">→</span>
                        </div>
                        <span className="text-sm font-mono tracking-widest uppercase">View All Projects</span>
                    </Link>
                </div>
            </div>

            {/* Progress Bar (Optional visual flair) */}
            <div className="absolute bottom-10 left-6 md:left-12 right-6 md:right-12 h-[1px] bg-white/10">
                <div className="h-full bg-white/50 w-1/3" />
            </div>
        </section>
    )
}

function ProjectCard({
    project,
    index,
    setCursorText,
    setCursorVariant
}: {
    project: ProjectCardType,
    index: number,
    setCursorText: (t: string) => void,
    setCursorVariant: (v: 'default' | 'project' | 'button') => void
}) {
    return (
        <Link
            href={`/projects/${project.slug}`}
            className="snap-center shrink-0 w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] relative group cursor-none"
            onMouseEnter={() => {
                setCursorVariant('project')
                setCursorText('WATCH')
            }}
            onMouseLeave={() => {
                setCursorVariant('default')
                setCursorText('')
            }}
        >
            <motion.div
                className="w-full h-full relative overflow-hidden bg-secondary border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-700"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
            >
                {/* Image / Video Layer */}
                {project.coverImage ? (
                    <>
                        <Image
                            src={urlFor(project.coverImage).width(1200).height(800).url()}
                            alt={project.title}
                            fill
                            className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                        />
                        {/* Video Preview Layer - Assuming visual style for now; 
                            In a real scenario, we'd wire up a videoUrl field. 
                            Using a placeholder or checking if sanity data has a video file.
                        */}
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {/* Fallback to image if no video, but pretending a video plays */}
                            <Image
                                src={urlFor(project.coverImage).width(1200).height(800).url()}
                                alt={project.title}
                                fill
                                className="object-cover opacity-80"
                            />
                            {/* Overlay Gradient for text readability */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />
                        </div>
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                        No Preview
                    </div>
                )}

                {/* Typography Layer */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="space-y-2">
                        <span className="inline-block px-2 py-1 text-[10px] font-mono tracking-[0.2em] uppercase border border-white/20 text-white/70 backdrop-blur-md mb-2">
                            {project.category?.name || 'Video Prod'}
                        </span>
                        <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
                            {project.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-400 max-w-lg line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {project.summary}
                        </p>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}
