'use client'

import { TextReveal, SlideIn } from '@/components/ui/TextReveal'
import Link from 'next/link'
import { ArrowRight, Play, Layers, Clock, Film, ChevronDown, Sparkles, Code2, Video } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { useCursor } from '@/context/CursorContext'
import {
    RotatingText,
    DecryptedText,
    Magnet,
    ClickSpark,
    Squares,
    BlurText,
    GradientText,
} from '@/components/reactbits'

interface HeroProps {
    siteSettings?: any
    profile?: any
}

export function Hero({ siteSettings, profile }: HeroProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { setCursorVariant } = useCursor()

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    })

    // Parallax effects
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    const scrollToProjects = (e: React.MouseEvent) => {
        e.preventDefault()
        const el = document.getElementById('projects')
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const roles = ['Video Editor', 'Web Developer', 'Motion Designer', 'Creative Technologist']

    return (
        <section
            ref={containerRef}
            className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Animated Grid Background */}
            <div className="absolute inset-0 z-0 opacity-60">
                <Squares
                    speed={0.2}
                    squareSize={60}
                    direction="diagonal"
                    borderColor="rgba(59,130,246,0.15)"
                    hoverFillColor="rgba(147, 51, 234, 0.25)"
                    className="w-full h-full"
                />
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-[1] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50 z-[1] pointer-events-none" />

            {/* Floating Orbs */}
            <motion.div
                className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-blue-500/10 blur-[100px] z-0"
                animate={{
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-purple-500/10 blur-[120px] z-0"
                animate={{
                    x: [0, -40, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Main Content */}
            <motion.div
                className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
                style={{ y, opacity }}
            >
                {/* Status Badge */}
                <SlideIn delay={0.1}>
                    <motion.div
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-8"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                    >
                        <motion.span
                            className="w-2 h-2 rounded-full bg-green-500"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-xs font-medium text-blue-400 tracking-widest uppercase">
                            Available for Projects
                        </span>
                    </motion.div>
                </SlideIn>

                {/* Main Headline with Rotating Text */}
                <SlideIn delay={0.2} className="mb-6">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter">
                        <span className="text-foreground">I'm a </span>
                        <RotatingText
                            texts={roles}
                            rotationInterval={2500}
                            staggerDuration={0.02}
                            staggerFrom="first"
                            mainClassName="text-blue-400"
                            elementLevelClassName="hover:text-purple-400 transition-colors"
                        />
                    </h1>
                </SlideIn>

                {/* Subtitle with Blur Reveal */}
                <SlideIn delay={0.4} className="mb-8">
                    <div className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed mx-auto">
                        <BlurText
                            text="Crafting immersive digital experiences where motion graphics precision meets modern web engineering."
                            delay={30}
                            animateBy="words"
                            direction="bottom"
                            className="justify-center"
                        />
                    </div>
                </SlideIn>

                {/* Tech Stack Pills */}
                <SlideIn delay={0.5} className="flex flex-wrap justify-center gap-3 mb-10">
                    {['After Effects', 'Next.js', 'TypeScript', 'Framer Motion', 'Premiere Pro'].map(
                        (tech, i) => (
                            <motion.span
                                key={tech}
                                className="px-4 py-2 text-xs font-medium rounded-full border border-border bg-card/50 text-muted-foreground backdrop-blur-sm"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + i * 0.1 }}
                                whileHover={{
                                    scale: 1.05,
                                    borderColor: 'hsl(var(--primary))',
                                    color: 'hsl(var(--foreground))',
                                }}
                            >
                                {tech}
                            </motion.span>
                        )
                    )}
                </SlideIn>

                {/* CTA Buttons with Magnetic Effect */}
                <SlideIn delay={0.7} className="flex flex-wrap items-center justify-center gap-4">
                    <ClickSpark sparkColor="#3b82f6" sparkCount={12}>
                        <Magnet padding={20} magnetStrength={0.2}>
                            <button
                                onClick={scrollToProjects}
                                onMouseEnter={() => setCursorVariant('button')}
                                onMouseLeave={() => setCursorVariant('default')}
                                className="group relative flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all overflow-hidden"
                            >
                                <motion.span
                                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                                <span className="relative flex items-center gap-3">
                                    <Play className="w-5 h-5 fill-current" />
                                    View My Work
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </Magnet>
                    </ClickSpark>

                    <Magnet padding={20} magnetStrength={0.2}>
                        <Link
                            href="/contact"
                            onMouseEnter={() => setCursorVariant('button')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-border hover:border-primary/50 text-foreground hover:text-primary transition-all bg-card/50 backdrop-blur-sm"
                        >
                            <Sparkles className="w-5 h-5" />
                            Let's Talk
                        </Link>
                    </Magnet>
                </SlideIn>

                {/* Stats Row */}
                <SlideIn delay={0.9} className="mt-16 grid grid-cols-3 gap-8 md:gap-16">
                    {[
                        { value: '5+', label: 'Years Experience' },
                        { value: '50+', label: 'Projects Completed' },
                        { value: '30+', label: 'Happy Clients' },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 + i * 0.1 }}
                        >
                            <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                                {stat.value}
                            </div>
                            <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </SlideIn>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
            >
                <motion.button
                    onClick={scrollToProjects}
                    className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    onMouseEnter={() => setCursorVariant('button')}
                    onMouseLeave={() => setCursorVariant('default')}
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <ChevronDown className="w-5 h-5" />
                </motion.button>
            </motion.div>

            {/* Corner Decorations */}
            <div className="absolute top-20 left-10 hidden lg:block z-0">
                <motion.div
                    className="flex items-center gap-2 text-muted-foreground/50 font-mono text-xs"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 0.5, x: 0 }}
                    transition={{ delay: 1.5 }}
                >
                    <Code2 className="w-4 h-4" />
                    <span>// Welcome to my portfolio</span>
                </motion.div>
            </div>
            <div className="absolute top-20 right-10 hidden lg:block z-0">
                <motion.div
                    className="flex items-center gap-2 text-muted-foreground/50 font-mono text-xs"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 0.5, x: 0 }}
                    transition={{ delay: 1.5 }}
                >
                    <Video className="w-4 h-4" />
                    <span>Composition: Hero_v3.aep</span>
                </motion.div>
            </div>
        </section>
    )
}
