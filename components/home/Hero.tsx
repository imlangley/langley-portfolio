'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface HeroProps {
    title?: string
    subtitle?: string
    image?: any
    siteSettings?: any
}

export function Hero({ title, subtitle, image, siteSettings }: HeroProps) {
    const { scrollY } = useScroll()
    const yText = useTransform(scrollY, [0, 500], [0, 100])
    const opacity = useTransform(scrollY, [0, 500], [1, 0])

    // Staggered Text Animation Variants
    const containerVars = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const wordVars = {
        hidden: { y: 100, rotateX: 90, opacity: 0 },
        visible: {
            y: 0,
            rotateX: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 50, damping: 20 }
        }
    }

    const heroTitle = siteSettings?.heroTitle || "Cinematic Video Editor"
    const heroSubtitle = siteSettings?.heroSubtitle || "Crafting visual narratives that captivate and inspire."

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden snap-start bg-background perspective-1000">

            {/* Cinematic Background Element - Placeholder for Video Loop */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
                <div className="absolute inset-0 bg-radial-gradient from-accent/20 to-transparent blur-3xl opacity-40 animate-pulse duration-[5000ms]" />

                {/* Abstract Moving Shapes/Gradient */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-blob" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] mix-blend-screen animate-blob animation-delay-2000" />
            </div>

            <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">

                {/* Text Content */}
                <motion.div
                    className="lg:col-span-8 flex flex-col justify-center"
                    style={{ y: yText, opacity }}
                >
                    <motion.div
                        variants={containerVars}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        {/* Status Line */}
                        <motion.div variants={wordVars} className="overflow-hidden">
                            <span className="inline-block px-3 py-1 text-xs font-mono tracking-[0.2em] uppercase border border-white/20 text-white/70 backdrop-blur-md">
                                Available for Booking
                            </span>
                        </motion.div>

                        {/* Staggered Giant Title */}
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] text-white mix-blend-overlay">
                            {/* Split title for animation (Demo logic) */}
                            <span className="block overflow-hidden">
                                <motion.span variants={wordVars} className="block">VISUAL</motion.span>
                            </span>
                            <span className="block overflow-hidden">
                                <motion.span variants={wordVars} className="block text-stroke-sm text-transparent">STORYTELLING</motion.span>
                            </span>
                        </h1>

                        <motion.div variants={wordVars} className="max-w-xl">
                            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                                {heroSubtitle}
                            </p>
                        </motion.div>

                        <motion.div variants={wordVars} className="pt-8 flex gap-6">
                            <Link href="#projects" className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors">
                                <span className="relative z-10">Select Work</span>
                                {/* Hover Effect */}
                                <span className="absolute inset-0 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 mix-blend-difference" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Right Visual - Abstract/Video Placeholder */}
                <div className="hidden lg:col-span-4 lg:flex items-center justify-center h-full relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        className="relative w-full aspect-[9/16] max-h-[80vh] bg-black/50 border border-white/10 overflow-hidden"
                    >
                        {/* Placeholder for Showreel Preview */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center space-y-2 opacity-50">
                                <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center mx-auto">
                                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-white/80 border-b-[8px] border-b-transparent ml-1" />
                                </div>
                                <p className="text-xs font-mono uppercase tracking-widest text-white/60">Play Showreel</p>
                            </div>
                        </div>

                        {/* Grain/Scanline Overlay */}
                        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
                        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/80" />
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-10 md:left-20 flex items-center gap-4 text-white/50"
            >
                <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
                <div className="h-[1px] w-20 bg-white/20" />
            </motion.div>
        </section>
    )
}

