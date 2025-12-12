'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { ArrowLeft, ExternalLink, Github, Calendar, User, Wrench, Play, Share2 } from 'lucide-react'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib'
import { formatDate, cn } from '@/lib/utils'
import { PortableText } from '@portabletext/react'

const ptComponents = {
    block: {
        h2: ({ children }: any) => <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-6 tracking-tight text-foreground">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">{children}</h3>,
        normal: ({ children }: any) => <p className="mb-6 text-lg text-muted-foreground leading-relaxed">{children}</p>,
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-primary pl-6 py-2 italic my-8 text-xl text-foreground font-medium bg-secondary/30 rounded-r-lg">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground text-lg">{children}</ul>,
        number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-muted-foreground text-lg">{children}</ol>,
    },
}

export function ProjectDetail({ project }: { project: any }) {
    return (
        <article className="min-h-screen">

            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full bg-black overflow-hidden flex items-end">
                {project.coverImage && (
                    <Image
                        src={urlFor(project.coverImage).width(1920).height(1080).url()}
                        alt={project.title}
                        fill
                        sizes="100vw"
                        className="object-cover opacity-60"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                <div className="container max-w-7xl relative z-10 pb-12 md:pb-20">
                    <Link href="/projects" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-5 h-5" /> Back to Archive
                    </Link>

                    <div className="space-y-6 max-w-4xl animate-in slide-in-from-bottom-5 duration-700 fade-in">
                        <div className="flex flex-wrap gap-3">
                            <span className={cn(
                                "px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider",
                                project.projectType === 'video' ? "bg-red-600/90 text-white" : "bg-blue-600/90 text-white"
                            )}>
                                {project.projectType}
                            </span>
                            {project.isCommission && (
                                <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur text-white text-sm font-bold uppercase tracking-wider">
                                    Commission
                                </span>
                            )}
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
                            {project.title}
                        </h1>

                        <p className="text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed">
                            {project.summary}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container max-w-7xl py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                {/* Sidebar Info */}
                <aside className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-24">
                    {/* Actions */}
                    <div className="flex flex-col gap-4">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 h-14 rounded-xl bg-primary text-primary-foreground text-lg font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                            >
                                Visit Live Site <ExternalLink className="w-5 h-5" />
                            </a>
                        )}
                        {project.repoUrl && (
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 h-14 rounded-xl border border-border bg-card hover:bg-secondary text-lg font-medium transition-colors"
                            >
                                View Source <Github className="w-5 h-5" />
                            </a>
                        )}
                    </div>

                    {/* Metadata Card */}
                    <div className="rounded-2xl border border-border bg-card p-6 space-y-6 shadow-sm">
                        <div>
                            <h4 className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">
                                <User className="w-4 h-4" /> Client / Context
                            </h4>
                            <p className="text-lg font-medium">{project.clientName || 'Personal Project'}</p>
                        </div>
                        <div className="h-px bg-border/50" />
                        <div>
                            <h4 className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">
                                <Calendar className="w-4 h-4" /> Timeline
                            </h4>
                            <p className="text-lg font-medium">{formatDate(project.date)}</p>
                        </div>
                        <div className="h-px bg-border/50" />
                        <div>
                            <h4 className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">
                                <Wrench className="w-4 h-4" /> Tech & Tools
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tools?.map((tool: any) => (
                                    <span key={tool.slug} className="px-3 py-1 bg-secondary rounded-lg text-sm font-medium border border-border/50">
                                        {tool.name}
                                    </span>
                                )) || <p className="text-muted-foreground">No tools listed.</p>}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="lg:col-span-8 space-y-16">

                    {/* Detailed Description */}
                    {project.description && (
                        <div className="prose prose-xl dark:prose-invert max-w-none">
                            <PortableText value={project.description} components={ptComponents} />
                        </div>
                    )}

                    {/* Main Video Embed (if applicable) */}
                    {project.videoEmbedUrl && (
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold">Featured Video</h3>
                            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-border">
                                <iframe
                                    src={project.videoEmbedUrl}
                                    className="w-full h-full"
                                    allowFullScreen
                                    title={project.title}
                                />
                            </div>
                        </div>
                    )}

                    {/* Gallery */}
                    {project.gallery && project.gallery.length > 0 && (
                        <div className="space-y-8">
                            <h3 className="text-2xl font-bold">Project Gallery</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {project.gallery.map((item: any, i: number) => (
                                    <div key={i} className="group relative rounded-xl overflow-hidden bg-secondary border border-border shadow-sm hover:shadow-xl transition-all">
                                        {item.type === 'video' ? (
                                            <div className="aspect-video bg-black">
                                                <iframe src={item.videoEmbedUrl} className="w-full h-full" allowFullScreen />
                                            </div>
                                        ) : (
                                            <div className="relative aspect-[4/3]">
                                                <Image
                                                    src={urlFor(item.image).width(800).url()}
                                                    alt={item.caption || 'Project visual'}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                        )}
                                        {item.caption && (
                                            <div className="p-4 bg-card border-t border-border">
                                                <p className="text-sm text-muted-foreground font-medium">{item.caption}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

            </div>

        </article>
    )
}
