'use client'

import { TextReveal, SlideIn } from '@/components/ui/TextReveal'
import Link from 'next/link'
import { ArrowRight, Play, Layers, Clock, Film } from 'lucide-react'
import { motion } from 'framer-motion'

interface HeroProps {
    siteSettings?: any
    profile?: any
}

export function Hero({ siteSettings, profile }: HeroProps) {
    const tagline = "Video editor who happens to code."

    const scrollToProjects = (e: React.MouseEvent) => {
        e.preventDefault()
        const el = document.getElementById('projects')
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section className="min-h-[85vh] flex flex-col lg:flex-row items-center justify-center p-6 lg:px-20 gap-12 lg:gap-20 overflow-hidden">
            {/* Left: Content */}
            <div className="flex-1 max-w-2xl space-y-8 z-10">
                <div className="space-y-4">
                    <SlideIn delay={0.1}>
                        <div className="flex items-center gap-2 text-blue-400 font-mono text-sm tracking-widest uppercase">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            Active Composition
                        </div>
                    </SlideIn>

                    <TextReveal
                        text={tagline}
                        className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter text-white"
                        delay={0.2}
                    />

                    <SlideIn delay={0.5} className="text-gray-400 text-lg max-w-lg leading-relaxed">
                        I build immersive web experiences with the precision of a video editor.
                        Merging motion graphics sensibility with rigorous software engineering.
                    </SlideIn>
                </div>

                <SlideIn delay={0.7} className="flex flex-wrap items-center gap-4">
                    <Link
                        href="#projects"
                        onClick={scrollToProjects}
                        className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-all hover:scale-105 active:scale-95"
                    >
                        <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                        View Projects
                    </Link>
                    <Link
                        href="/contact"
                        className="px-6 py-3 rounded-md border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white transition-all bg-[#1e1e1e]/50 backdrop-blur-sm"
                    >
                        Contact Me
                    </Link>
                </SlideIn>
            </div>

            {/* Right: AE Panel Visualization (Decorative) */}
            <SlideIn delay={0.3} className="flex-1 w-full max-w-xl hidden md:block">
                <div className="relative aspect-video rounded-xl bg-[#1e1e1e] border border-[#333] shadow-2xl overflow-hidden group">
                    {/* Header */}
                    <div className="h-8 bg-[#2a2a2a] border-b border-[#333] flex items-center px-4 justify-between">
                        <span className="text-[10px] uppercase font-bold text-gray-500">Composition: Main_Hero</span>
                        <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-500/50" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                            <div className="w-2 h-2 rounded-full bg-green-500/50" />
                        </div>
                    </div>

                    {/* Timeline Area (Fake) */}
                    <div className="p-4 space-y-3 relative">
                        {/* Grid Lines */}
                        <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-10">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className="border-r border-white h-full" />
                            ))}
                        </div>

                        {/* Layers */}
                        {[
                            { name: 'Headline.mp4', color: 'bg-indigo-500', width: '80%', icon: Film },
                            { name: 'Shape Layer 1', color: 'bg-purple-500', width: '40%', icon: Layers },
                            { name: 'Camera 1', color: 'bg-pink-500', width: '100%', icon: Play },
                        ].map((layer, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.8 + (i * 0.1) }}
                                className="flex items-center gap-3 relative z-10"
                            >
                                <div className="w-32 text-[10px] text-gray-400 font-mono flex items-center gap-2">
                                    <layer.icon className="w-3 h-3" />
                                    {layer.name}
                                </div>
                                <div className="flex-1 h-6 bg-[#111] rounded-sm relative overflow-hidden">
                                    <motion.div
                                        className={`absolute top-0.5 bottom-0.5 left-0 rounded-sm ${layer.color} opacity-60 backdrop-blur-sm`}
                                        initial={{ width: 0 }}
                                        animate={{ width: layer.width }}
                                        transition={{ delay: 1 + (i * 0.2), duration: 1.5, type: "spring" }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Time Indicator */}
                    <motion.div
                        className="absolute top-8 bottom-0 w-px bg-red-500 z-20 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                        animate={{ left: ['0%', '100%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute top-0 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-[8px] font-bold text-white px-1 py-0.5 rounded-sm">
                            00:00:00
                        </div>
                    </motion.div>
                </div>
            </SlideIn>
        </section>
    )
}
