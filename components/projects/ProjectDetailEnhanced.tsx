'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib'
import { PortableText } from '@portabletext/react'
import { ParallaxHero } from './ParallaxHero'
import { StickySidebar } from './StickySidebar'
import { RelatedProjects } from './RelatedProjects'
import type { Project, RelatedProject as RelatedProjectType } from '@/sanity/lib/fetch'

// Portable Text components with animations
const ptComponents = {
    block: {
        h2: ({ children }: any) => (
            <FadeInSection>
                <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-6 tracking-tight text-foreground">
                    {children}
                </h2>
            </FadeInSection>
        ),
        h3: ({ children }: any) => (
            <FadeInSection>
                <h3 className="text-2xl font-bold mt-10 mb-4 text-foreground">
                    {children}
                </h3>
            </FadeInSection>
        ),
        normal: ({ children }: any) => (
            <FadeInSection>
                <p className="mb-6 text-lg text-muted-foreground leading-relaxed">
                    {children}
                </p>
            </FadeInSection>
        ),
        blockquote: ({ children }: any) => (
            <FadeInSection>
                <blockquote className="border-l-4 border-primary pl-6 py-4 italic my-10 text-xl text-foreground font-medium bg-secondary/30 rounded-r-lg">
                    {children}
                </blockquote>
            </FadeInSection>
        ),
    },
    list: {
        bullet: ({ children }: any) => (
            <FadeInSection>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground text-lg">
                    {children}
                </ul>
            </FadeInSection>
        ),
        number: ({ children }: any) => (
            <FadeInSection>
                <ol className="list-decimal pl-6 mb-6 space-y-2 text-muted-foreground text-lg">
                    {children}
                </ol>
            </FadeInSection>
        ),
    },
    marks: {
        link: ({ children, value }: any) => (
            <a 
                href={value.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            >
                {children}
            </a>
        ),
        code: ({ children }: any) => (
            <code className="px-1.5 py-0.5 rounded bg-secondary text-sm font-mono">
                {children}
            </code>
        ),
    },
    types: {
        code: ({ value }: any) => (
            <FadeInSection>
                <pre className="my-8 p-6 rounded-xl bg-secondary text-foreground overflow-x-auto border border-border">
                    <code className="text-sm font-mono">
                        {value.code}
                    </code>
                </pre>
            </FadeInSection>
        ),
    },
}

// Fade-in animation wrapper
function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    )
}

interface ProjectDetailEnhancedProps {
    project: Project
    relatedProjects: RelatedProjectType[]
}

export function ProjectDetailEnhanced({ project, relatedProjects }: ProjectDetailEnhancedProps) {
    return (
        <article className="min-h-screen">
            {/* Parallax Hero */}
            <ParallaxHero
                imageUrl={project.coverImage ? urlFor(project.coverImage).width(1920).height(1080).url() : ''}
                title={project.title}
                summary={project.summary}
                projectType={project.projectType}
                accentColor={project.accentColor}
                isCommission={project.isCommission}
                clientName={project.clientName}
                date={project.date}
                category={project.category}
                tags={project.tags}
            />

            {/* Main Content */}
            <div className="container max-w-7xl py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                {/* Sidebar */}
                <div className="lg:col-span-4 order-2 lg:order-1">
                    <StickySidebar
                        clientName={project.clientName}
                        date={project.date}
                        tools={project.tools}
                        liveUrl={project.liveUrl}
                        repoUrl={project.repoUrl}
                        accentColor={project.accentColor}
                    />
                </div>

                {/* Content Column */}
                <div className="lg:col-span-8 order-1 lg:order-2 space-y-12">
                    {/* Description */}
                    {project.description && (
                        <div className="prose prose-xl dark:prose-invert max-w-none">
                            <PortableText value={project.description} components={ptComponents} />
                        </div>
                    )}

                    {/* Main Video Embed */}
                    {project.videoEmbedUrl && (
                        <FadeInSection>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold">Featured Video</h3>
                                <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-border bg-black">
                                    <iframe
                                        src={project.videoEmbedUrl}
                                        className="w-full h-full"
                                        allowFullScreen
                                        title={project.title}
                                    />
                                </div>
                            </div>
                        </FadeInSection>
                    )}

                    {/* Gallery */}
                    {project.gallery && project.gallery.length > 0 && (
                        <FadeInSection>
                            <div className="space-y-8">
                                <h3 className="text-2xl font-bold">Project Gallery</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {project.gallery.map((item, i) => (
                                        <GalleryItem key={i} item={item} index={i} />
                                    ))}
                                </div>
                            </div>
                        </FadeInSection>
                    )}
                </div>
            </div>

            {/* Related Projects */}
            <div className="border-t border-border bg-secondary/20">
                <RelatedProjects
                    projects={relatedProjects}
                    currentProjectId={project._id}
                    title="More Projects"
                />
            </div>
        </article>
    )
}

// Gallery Item with Lightbox potential
function GalleryItem({ item, index }: { item: any; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative rounded-xl overflow-hidden bg-secondary border border-border shadow-sm hover:shadow-xl transition-all"
        >
            {item.type === 'video' ? (
                <div className="aspect-video bg-black">
                    <iframe 
                        src={item.videoEmbedUrl} 
                        className="w-full h-full" 
                        allowFullScreen 
                    />
                </div>
            ) : (
                <div className="relative aspect-[4/3] cursor-pointer">
                    <Image
                        src={urlFor(item.image).width(800).url()}
                        alt={item.caption || 'Project visual'}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Zoom indicator on hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                            Click to expand
                        </span>
                    </div>
                </div>
            )}
            {item.caption && (
                <div className="p-4 bg-card border-t border-border">
                    <p className="text-sm text-muted-foreground font-medium">{item.caption}</p>
                </div>
            )}
        </motion.div>
    )
}
