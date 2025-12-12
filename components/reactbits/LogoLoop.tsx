'use client'

import { useRef, ReactNode } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'

interface LogoItem {
    id: string
    name: string
    icon?: string
    url?: string
}

interface LogoLoopProps {
    items: LogoItem[]
    direction?: 'left' | 'right'
    speed?: number
    pauseOnHover?: boolean
    className?: string
    itemClassName?: string
    showNames?: boolean
}

export function LogoLoop({
    items,
    direction = 'left',
    speed = 30,
    pauseOnHover = true,
    className = '',
    itemClassName = '',
    showNames = true,
}: LogoLoopProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    // Double the items for seamless loop
    const duplicatedItems = [...items, ...items]

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
        >
            {/* Gradient masks for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <motion.div
                initial={{ x: direction === 'left' ? 0 : '-50%' }}
                animate={{ x: direction === 'left' ? '-50%' : 0 }}
                transition={{
                    duration: speed,
                    ease: 'linear',
                    repeat: Infinity,
                    repeatType: 'loop',
                }}
                className={`flex items-center gap-8 ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
                style={{ width: 'max-content' }}
            >
                {duplicatedItems.map((item, index) => (
                    <LogoItem
                        key={`${item.id}-${index}`}
                        item={item}
                        className={itemClassName}
                        showName={showNames}
                    />
                ))}
            </motion.div>
        </div>
    )
}

interface LogoItemProps {
    item: LogoItem
    className?: string
    showName?: boolean
}

function LogoItem({ item, className = '', showName = true }: LogoItemProps) {
    const content = (
        <motion.div
            whileHover={{ scale: 1.1, y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`
                flex flex-col items-center gap-2 px-6 py-4
                bg-card/50 hover:bg-secondary 
                border border-border hover:border-primary/30
                rounded-xl transition-colors duration-200
                ${className}
            `}
        >
            {item.icon ? (
                <div className="relative w-10 h-10 flex items-center justify-center">
                    <Image
                        src={item.icon}
                        alt={item.name}
                        fill
                        className="object-contain filter brightness-90 hover:brightness-100 transition-all"
                    />
                </div>
            ) : (
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary text-muted-foreground text-sm font-bold">
                    {item.name.charAt(0).toUpperCase()}
                </div>
            )}
            {showName && (
                <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">
                    {item.name}
                </span>
            )}
        </motion.div>
    )

    if (item.url) {
        return (
            <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                {content}
            </a>
        )
    }

    return content
}

// Alternative: Static grid layout for tools
interface LogoGridProps {
    items: LogoItem[]
    columns?: number
    className?: string
    itemClassName?: string
}

export function LogoGrid({
    items,
    columns = 4,
    className = '',
    itemClassName = '',
}: LogoGridProps) {
    return (
        <div
            className={`grid gap-4 ${className}`}
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
            {items.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                >
                    <LogoItem item={item} className={itemClassName} showName />
                </motion.div>
            ))}
        </div>
    )
}

export default LogoLoop
