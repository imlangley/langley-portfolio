'use client'

import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import { Play, Pause, ChevronRight, Clock, Diamond } from 'lucide-react'
import type { SiteSettings, Profile } from '@/sanity/lib/fetch'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface HeroProps {
    siteSettings?: SiteSettings | null
    profile?: Profile | null
}

export function Hero({ siteSettings, profile }: HeroProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Timeline Scrubbing Animation
    const playheadX = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { stiffness: 100, damping: 30 })
    const timeDisplay = useTransform(scrollYProgress, [0, 1], [0, 10]) // 0 to 10 seconds

    // Copy
    const copyId = "Video Editor yang kebetulan bisa ngoding"
    const copyEn = "Video Editor who happens to code"

    // Render Frame (Simulated 30fps)
    const [currentTime, setCurrentTime] = useState("00:00:00:00")

    useEffect(() => {
        const unsubscribe = timeDisplay.onChange(v => {
            const frames = Math.floor((v % 1) * 30).toString().padStart(2, '0') // 30fps standard
            const seconds = Math.floor(v).toString().padStart(2, '0')
            setCurrentTime(`00:00:${seconds}:${frames}`)
        })
        return () => unsubscribe()
    }, [timeDisplay])

    return (
        <section ref={containerRef} className="relative h-[300vh] w-full bg-[#0d0d0d]">

            {/* Sticky Viewport */}
            <div className="sticky top-0 md:top-10 h-screen md:h-[calc(100vh-40px)] flex flex-col">

                {/* Composition Toolbar (Desktop Only) */}
                <div className="h-8 bg-[#1f1f1f] border-b border-[#333] hidden md:flex items-center justify-between px-4 text-xs select-none z-20">
                    <div className="flex items-center gap-4 text-gray-400">
                        <span className="text-white font-medium">Main_Comp</span>
                        <span>1920 x 1080 (1.00)</span>
                        <span>30 fps</span>
                    </div>
                    <div className="flex items-center gap-4 text-blue-400 font-mono">
                        <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {currentTime}</span>
                        <span className="text-gray-500">Full</span>
                        <span className="text-green-500">86%</span>
                    </div>
                </div>

                {/* Main Viewport Area */}
                <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-[#0d0d0d]">

                    {/* Grid / Safe Margins */}
                    <div className="absolute inset-0 pointer-events-none opacity-10"
                        style={{
                            backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                            backgroundSize: '100px 100px'
                        }}
                    />

                    {/* Graph Editor Curve Background (Subtle) */}
                    <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" preserveAspectRatio="none">
                        <path d="M0,1080 C500,1080 500,0 1920,0" stroke="white" strokeWidth="2" fill="none" />
                    </svg>

                    {/* Content Layers */}
                    <div className="relative z-10 text-center space-y-4 px-4">

                        {/* Layer 1: Title */}
                        <motion.h1
                            className="text-5xl md:text-8xl font-black tracking-tighter text-white select-none cursor-default mix-blend-difference"
                            style={{
                                opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
                                scale: useTransform(scrollYProgress, [0, 0.15], [1, 1.5]),
                                filter: useTransform(scrollYProgress, [0, 0.15], ["blur(0px)", "blur(20px)"])
                            }}
                        >
                            VIDEO EDITOR
                        </motion.h1>

                        {/* Layer 2: Transition / Transformation */}
                        <motion.div
                            className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{
                                opacity: useTransform(scrollYProgress, [0.1, 0.2, 0.3], [0, 1, 0]),
                                scale: useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1.2])
                            }}
                        >
                            &
                        </motion.div>

                        {/* Layer 3: Subtitle (The Hook) */}
                        <motion.div
                            className="relative"
                            style={{
                                opacity: useTransform(scrollYProgress, [0.25, 0.4], [0, 1]),
                                y: useTransform(scrollYProgress, [0.25, 0.4], [100, 0])
                            }}
                        >
                            <div className="text-2xl md:text-5xl font-bold text-white mb-2">
                                <span className="opacity-50">yang kebetulan</span> <span className="text-blue-500 underline decoration-wavy decoration-blue-500/30">bisa ngoding</span>.
                            </div>
                            <div className="text-sm md:text-xl text-gray-500 font-mono">
                                (who happens to code.)
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Timeline Panel (Bottom - Desktop Only) */}
                <div className="h-64 bg-[#1f1f1f] border-t border-[#333] hidden md:flex flex-col select-none relative z-30 shadow-2xl">

                    {/* Timeline Tools */}
                    <div className="h-8 bg-[#252526] border-b border-[#333] flex items-center px-2 gap-2 text-gray-400 text-xs">
                        <span>Render Queue</span>
                        <div className="h-4 w-px bg-[#444]" />
                        <span className="text-white bg-gray-700 px-2 py-0.5 rounded-sm">Timeline: Main_Comp</span>
                    </div>

                    {/* Timeline Tracks */}
                    <div className="flex-1 flex relative overflow-hidden">
                        {/* Layer List (Left) */}
                        <div className="w-80 bg-[#1f1f1f] border-r border-[#333] flex flex-col text-xs font-medium text-gray-300">

                            {/* Track 1 */}
                            <div className="h-8 flex items-center px-2 border-b border-[#333] bg-[#2a2a2a] gap-2 hover:bg-[#333] transition-colors">
                                <div className="w-4 h-4 rounded text-center leading-4 text-[10px] bg-purple-600 text-white font-bold">T</div>
                                <span className="flex-1 truncate">1. Video Editor Title</span>
                                <Diamond className="w-3 h-3 text-purple-500 fill-purple-500" />
                            </div>

                            {/* Track 2 */}
                            <div className="h-8 flex items-center px-2 border-b border-[#333] bg-[#2a2a2a] gap-2 hover:bg-[#333] transition-colors">
                                <div className="w-4 h-4 rounded text-center leading-4 text-[10px] bg-red-600 text-white font-bold">S</div>
                                <span className="flex-1 truncate">2. Transition Matte</span>
                                <Diamond className="w-3 h-3 text-gray-600" />
                            </div>

                            {/* Track 3 */}
                            <div className="h-8 flex items-center px-2 border-b border-[#333] bg-[#2a2a2a] gap-2 hover:bg-[#333] transition-colors">
                                <div className="w-4 h-4 rounded text-center leading-4 text-[10px] bg-blue-600 text-white font-bold">T</div>
                                <span className="flex-1 truncate">3. Subtitle (Bisa Ngoding)</span>
                                <Diamond className="w-3 h-3 text-blue-500 fill-blue-500" />
                            </div>

                        </div>

                        {/* Timeline Visualization (Right) */}
                        <div className="flex-1 relative bg-[#181818]">
                            {/* Ruler */}
                            <div className="h-6 border-b border-[#333] bg-[#222] relative">
                                <div className="absolute top-0 bottom-0 left-0 w-full flex justify-between px-2 text-[10px] text-gray-500 pt-1 font-mono">
                                    <span>00s</span><span>02s</span><span>04s</span><span>06s</span><span>08s</span><span>10s</span>
                                </div>
                            </div>

                            {/* Playhead */}
                            <motion.div
                                className="absolute top-0 bottom-0 w-[1px] bg-blue-500 z-50 overflow-visible"
                                style={{ left: playheadX }}
                            >
                                <div className="absolute top-0 -translate-x-1/2 w-3 h-4 bg-blue-500 text-[8px] flex items-center justify-center text-white polygon-marker" />
                            </motion.div>

                            {/* Keyframes & Bars */}
                            <div className="mt-[1px] relative space-y-[1px]">
                                {/* Track 1 Data */}
                                <div className="h-8 bg-[#222] relative flex items-center">
                                    <div className="absolute left-[0%] w-[15%] h-5 bg-purple-500/30 border border-purple-500/50 rounded-sm ml-px" />
                                    {/* Keyframes */}
                                    <Diamond className="w-3 h-3 text-yellow-500 fill-yellow-500 absolute left-[0%] z-10" />
                                    <Diamond className="w-3 h-3 text-yellow-500 fill-yellow-500 absolute left-[15%] z-10" />
                                </div>

                                {/* Track 2 Data */}
                                <div className="h-8 bg-[#222] relative flex items-center">
                                    <div className="absolute left-[10%] w-[20%] h-5 bg-red-500/30 border border-red-500/50 rounded-sm ml-px" />
                                </div>

                                {/* Track 3 Data */}
                                <div className="h-8 bg-[#222] relative flex items-center">
                                    <div className="absolute left-[25%] right-0 h-5 bg-blue-500/30 border border-blue-500/50 rounded-sm ml-px" />
                                    <Diamond className="w-3 h-3 text-blue-400 fill-blue-400 absolute left-[25%] z-10" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
