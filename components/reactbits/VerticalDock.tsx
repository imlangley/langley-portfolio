'use client'

import {
    motion,
    MotionValue,
    useMotionValue,
    useSpring,
    useTransform,
    type SpringOptions,
    AnimatePresence
} from 'motion/react'
import React, { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export interface DockItemData {
    icon: React.ReactNode
    label: string
    onClick: () => void
    isActive?: boolean
    className?: string
}

export interface VerticalDockProps {
    items: DockItemData[]
    className?: string
    distance?: number
    panelWidth?: number
    baseItemSize?: number
    magnification?: number
    spring?: SpringOptions
    position?: 'left' | 'right'
}

interface DockItemProps {
    className?: string
    children: React.ReactNode
    onClick?: () => void
    mouseY: MotionValue<number>
    spring: SpringOptions
    distance: number
    baseItemSize: number
    magnification: number
    isActive?: boolean
    label: string
}

function DockItem({
    children,
    className = '',
    onClick,
    mouseY,
    spring,
    distance,
    magnification,
    baseItemSize,
    isActive,
    label
}: DockItemProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    const mouseDistance = useTransform(mouseY, val => {
        const rect = ref.current?.getBoundingClientRect() ?? {
            y: 0,
            height: baseItemSize
        }
        return val - rect.y - baseItemSize / 2
    })

    const targetSize = useTransform(
        mouseDistance,
        [-distance, 0, distance],
        [baseItemSize, magnification, baseItemSize]
    )
    const size = useSpring(targetSize, spring)

    return (
        <div className="relative flex items-center group">
            <motion.div
                ref={ref}
                style={{
                    width: size,
                    height: size
                }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={onClick}
                className={cn(
                    'relative flex items-center justify-center rounded-xl',
                    'bg-shell-surface border border-shell-border shadow-lg',
                    'cursor-pointer transition-colors hover:bg-shell-bg-alt',
                    isActive && 'bg-primary/20 border-primary/50',
                    className
                )}
                tabIndex={0}
                role="button"
                aria-label={label}
            >
                <div className="w-[60%] h-[60%] flex items-center justify-center">
                    {children}
                </div>

                {/* Active indicator dot */}
                {isActive && (
                    <motion.div
                        className="absolute -right-1 w-1.5 h-1.5 rounded-full bg-primary"
                        layoutId="activeIndicator"
                    />
                )}
            </motion.div>

            {/* Tooltip */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-popover border border-border text-sm font-medium text-popover-foreground whitespace-nowrap z-50 shadow-lg"
                    >
                        {label}
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-popover" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function DockIcon({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('flex items-center justify-center text-foreground', className)}>{children}</div>
}

export function VerticalDock({
    items,
    className = '',
    spring = { mass: 0.1, stiffness: 150, damping: 12 },
    magnification = 56,
    distance = 140,
    panelWidth = 56,
    baseItemSize = 40,
    position = 'left'
}: VerticalDockProps) {
    const mouseY = useMotionValue(Infinity)
    const isHovered = useMotionValue(0)

    const maxWidth = Math.max(panelWidth, magnification + 8)
    const widthRow = useTransform(isHovered, [0, 1], [panelWidth, maxWidth])
    const width = useSpring(widthRow, spring)

    return (
        <motion.div
            style={{ width, scrollbarWidth: 'none' }}
            className={cn(
                'fixed top-1/2 -translate-y-1/2 flex flex-col items-center z-40',
                position === 'left' ? 'left-3' : 'right-3',
                className
            )}
        >
            <motion.div
                onMouseMove={({ pageY }) => {
                    isHovered.set(1)
                    mouseY.set(pageY)
                }}
                onMouseLeave={() => {
                    isHovered.set(0)
                    mouseY.set(Infinity)
                }}
                className="flex flex-col items-center gap-2 p-2 rounded-2xl bg-shell-bg/80 backdrop-blur-xl border border-shell-border shadow-xl"
                role="toolbar"
                aria-label="Navigation dock"
            >
                {items.map((item, index) => (
                    <DockItem
                        key={index}
                        onClick={item.onClick}
                        className={item.className}
                        mouseY={mouseY}
                        spring={spring}
                        distance={distance}
                        magnification={magnification}
                        baseItemSize={baseItemSize}
                        isActive={item.isActive}
                        label={item.label}
                    >
                        <DockIcon>{item.icon}</DockIcon>
                    </DockItem>
                ))}
            </motion.div>
        </motion.div>
    )
}

export default VerticalDock
