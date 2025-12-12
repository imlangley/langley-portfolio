'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Clock, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SplitText } from '@/components/reactbits/SplitText'

interface ParallaxHeroProps {
    imageUrl: string
    title: string
    summary: string
    projectType: string
    accentColor?: string
    isCommission?: boolean
    clientName?: string
    date?: string
    category?: { name: string; slug: string }
    tags?: { name: string; slug: string }[]
}

export function ParallaxHero({
    imageUrl,
    title,
    summary,
    projectType,
    accentColor,
    isCommission,
    clientName,
    date,
    category,
    tags
}: ParallaxHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    // Parallax effects
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.8])
    const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    // Format date
    const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    }) : null

    // Accent color style
    const accentGradient = accentColor 
        ? `linear-gradient(to top, ${accentColor}40, transparent)`
        : 'linear-gradient(to top, var(--background), transparent)'

    return (
        <div 
            ref={containerRef}
            className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden"
        >
            {/* Background Image with Parallax */}
            <motion.div 
                className="absolute inset-0"
                style={{ y: imageY, scale: imageScale }}
            >
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />
            </motion.div>

            {/* Gradient Overlays */}
            <motion.div 
                className="absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
            />
            <div 
                className="absolute inset-0"
                style={{ background: accentGradient }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

            {/* Content */}
            <motion.div 
                className="absolute inset-0 flex flex-col justify-end"
                style={{ y: contentY, opacity: contentOpacity }}
            >
                <div className="container max-w-7xl pb-12 md:pb-20 space-y-6">
                    
                    {/* Breadcrumb */}
                    <motion.nav
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-2 text-sm text-white/70"
                    >
                        <Link 
                            href="/projects" 
                            className="flex items-center gap-2 hover:text-white transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Projects
                        </Link>
                        {category && (
                            <>
                                <span>/</span>
                                <span className="text-white/50">{category.name}</span>
                            </>
                        )}
                    </motion.nav>

                    {/* Badges */}
                    <motion.div 
                        className="flex flex-wrap gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <span className={cn(
                            "px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider backdrop-blur-sm",
                            projectType === 'video' 
                                ? "bg-red-600/90 text-white" 
                                : projectType === 'web'
                                    ? "bg-blue-600/90 text-white"
                                    : "bg-purple-600/90 text-white"
                        )}>
                            {projectType}
                        </span>
                        {isCommission && (
                            <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-bold uppercase tracking-wider">
                                Commission
                            </span>
                        )}
                    </motion.div>

                    {/* Title with Text Reveal */}
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
                            <SplitText
                                text={title}
                                className="inline"
                                delay={30}
                                animationFrom={{ opacity: 0, y: 50 }}
                                animationTo={{ opacity: 1, y: 0 }}
                                easing={[0.22, 1, 0.36, 1]}
                                threshold={0.1}
                            />
                        </h1>
                    </div>

                    {/* Summary */}
                    <motion.p 
                        className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        {summary}
                    </motion.p>

                    {/* Metadata Grid */}
                    <motion.div 
                        className="flex flex-wrap gap-6 pt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        {clientName && (
                            <div className="flex items-center gap-2 text-white/70">
                                <User className="w-4 h-4" />
                                <span className="text-sm font-medium">{clientName}</span>
                            </div>
                        )}
                        {formattedDate && (
                            <div className="flex items-center gap-2 text-white/70">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm font-medium">{formattedDate}</span>
                            </div>
                        )}
                        {tags && tags.length > 0 && (
                            <div className="flex items-center gap-2 text-white/70">
                                <Tag className="w-4 h-4" />
                                <div className="flex gap-2">
                                    {tags.slice(0, 3).map(tag => (
                                        <span 
                                            key={tag.slug}
                                            className="text-sm font-medium px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-sm"
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, repeat: Infinity, repeatType: "reverse", duration: 1 }}
            >
                <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
                    <motion.div 
                        className="w-1.5 h-1.5 rounded-full bg-white"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </div>
    )
}
