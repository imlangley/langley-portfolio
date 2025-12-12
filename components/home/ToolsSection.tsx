'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { SplitText } from '@/components/reactbits'
import { urlFor } from '@/sanity/lib/image'
import type { Tool } from '@/sanity/lib/fetch'
import { useCursor } from '@/context/CursorContext'

interface ToolsSectionProps {
    tools: Tool[]
}

// Since Sanity doesn't have category field, we can either:
// 1. Show all tools in a flowing grid
// 2. Group by naming convention (if tools are named with prefixes)
// Here we'll use a flowing animated grid

export function ToolsSection({ tools }: ToolsSectionProps) {
    const { setCursorVariant } = useCursor()

    if (!tools.length) {
        return null
    }

    // Split tools into rows for staggered animation
    const rows = [
        tools.slice(0, Math.ceil(tools.length / 2)),
        tools.slice(Math.ceil(tools.length / 2)),
    ]

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-2 mb-4"
                    >
                        <div className="w-8 h-px bg-purple-500" />
                        <span className="text-purple-400 text-sm font-mono uppercase tracking-wider">
                            Tech Stack
                        </span>
                        <div className="w-8 h-px bg-purple-500" />
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        <SplitText
                            text="Tools & Software"
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
                        The technologies and software I use to bring creative visions to life.
                    </motion.p>
                </div>

                {/* Tools Marquee/Grid */}
                <div className="space-y-4">
                    {rows.map((row, rowIndex) => (
                        <ToolRow 
                            key={rowIndex}
                            tools={row}
                            direction={rowIndex % 2 === 0 ? 'left' : 'right'}
                            speed={30 + rowIndex * 5}
                        />
                    ))}
                </div>

                {/* Static Grid Alternative (visible on smaller screens) */}
                <div className="mt-8 md:hidden">
                    <div className="grid grid-cols-3 gap-3">
                        {tools.slice(0, 9).map((tool, index) => (
                            <motion.div
                                key={tool._id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <ToolItem tool={tool} compact />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

interface ToolRowProps {
    tools: Tool[]
    direction: 'left' | 'right'
    speed: number
}

function ToolRow({ tools, direction, speed }: ToolRowProps) {
    // Duplicate items for seamless loop
    const duplicated = [...tools, ...tools, ...tools]

    return (
        <div className="relative overflow-hidden hidden md:block">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <motion.div
                initial={{ x: direction === 'left' ? 0 : '-33.33%' }}
                animate={{ x: direction === 'left' ? '-33.33%' : 0 }}
                transition={{
                    duration: speed,
                    ease: 'linear',
                    repeat: Infinity,
                    repeatType: 'loop',
                }}
                className="flex items-center gap-4 py-2 hover:[animation-play-state:paused]"
                style={{ width: 'max-content' }}
            >
                {duplicated.map((tool, index) => (
                    <ToolItem key={`${tool._id}-${index}`} tool={tool} />
                ))}
            </motion.div>
        </div>
    )
}

interface ToolItemProps {
    tool: Tool
    compact?: boolean
}

function ToolItem({ tool, compact = false }: ToolItemProps) {
    const { setCursorVariant } = useCursor()

    const content = (
        <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={`
                flex items-center gap-3 bg-card/80 backdrop-blur-sm
                border border-border hover:border-primary/30 hover:bg-secondary
                rounded-xl transition-all duration-200
                ${compact ? 'flex-col p-3' : 'px-5 py-3'}
            `}
        >
            {/* Icon */}
            <div className={`relative flex items-center justify-center ${compact ? 'w-8 h-8' : 'w-10 h-10'}`}>
                {tool.icon?.asset ? (
                    <Image
                        src={urlFor(tool.icon).width(80).height(80).url()}
                        alt={tool.name}
                        fill
                        className="object-contain"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-foreground font-bold text-sm">
                        {tool.name.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>

            {/* Name */}
            <span className={`text-foreground font-medium whitespace-nowrap ${compact ? 'text-xs' : 'text-sm'}`}>
                {tool.name}
            </span>
        </motion.div>
    )

    if (tool.url) {
        return (
            <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                className="block"
            >
                {content}
            </a>
        )
    }

    return (
        <div
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
        >
            {content}
        </div>
    )
}

export default ToolsSection
