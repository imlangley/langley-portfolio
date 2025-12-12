'use client'

import { ReactNode, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCursor } from '@/context/CursorContext'
import { Home, FolderOpen, User, Mail, Settings, Code } from 'lucide-react'

interface DockItemProps {
    href: string
    icon: ReactNode
    label: string
    isActive: boolean
    mouseX: ReturnType<typeof useMotionValue<number>>
}

function DockItem({ href, icon, label, isActive, mouseX }: DockItemProps) {
    const ref = useRef<HTMLAnchorElement>(null)
    const { setCursorVariant } = useCursor()

    // Calculate distance from mouse for magnetic effect
    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
        return val - bounds.x - bounds.width / 2
    })

    // Scale based on proximity (macOS dock effect)
    const widthSync = useTransform(distance, [-150, 0, 150], [48, 72, 48])
    const width = useSpring(widthSync, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    })

    const [hovered, setHovered] = useState(false)

    return (
        <Link
            ref={ref}
            href={href}
            onMouseEnter={() => {
                setHovered(true)
                setCursorVariant('button')
            }}
            onMouseLeave={() => {
                setHovered(false)
                setCursorVariant('default')
            }}
            className="relative flex items-center justify-center"
        >
            <motion.div
                style={{ width, height: width }}
                className={`
                    relative flex items-center justify-center rounded-xl
                    transition-colors duration-200
                    ${isActive
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                        : 'bg-shell-surface text-shell-text-muted hover:bg-shell-active hover:text-shell-text'
                    }
                `}
            >
                <div className="flex items-center justify-center w-6 h-6">
                    {icon}
                </div>

                {/* Active indicator dot */}
                {isActive && (
                    <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-2 w-1.5 h-1.5 bg-primary rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                )}
            </motion.div>

            {/* Tooltip */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 5, x: '-50%' }}
                        className="absolute -top-10 left-1/2 px-3 py-1.5 bg-shell-bg border border-shell-border rounded-md text-xs font-medium text-shell-text whitespace-nowrap z-50 shadow-xl"
                    >
                        {label}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-shell-bg border-r border-b border-shell-border rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>
        </Link>
    )
}

export interface NavItem {
    href: string
    label: string
    icon: ReactNode
}

const defaultNavItems: NavItem[] = [
    { href: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { href: '/projects', label: 'Projects', icon: <FolderOpen className="w-5 h-5" /> },
    { href: '/about', label: 'About', icon: <User className="w-5 h-5" /> },
    { href: '/contact', label: 'Contact', icon: <Mail className="w-5 h-5" /> },
]

interface FloatingDockProps {
    items?: NavItem[]
    className?: string
}

export function FloatingDock({ items = defaultNavItems, className = '' }: FloatingDockProps) {
    const pathname = usePathname()
    const mouseX = useMotionValue(Infinity)

    return (
        <motion.nav
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100, damping: 20 }}
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={`
                fixed bottom-6 left-1/2 -translate-x-1/2 z-50
                flex items-end gap-2 px-4 py-3
                bg-shell-bg/90 backdrop-blur-xl
                border border-shell-border rounded-2xl
                shadow-2xl shadow-black/50
                ${className}
            `}
            aria-label="Main navigation"
        >
            {items.map((item) => (
                <DockItem
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    label={item.label}
                    isActive={
                        item.href === '/'
                            ? pathname === '/'
                            : pathname.startsWith(item.href)
                    }
                    mouseX={mouseX}
                />
            ))}
        </motion.nav>
    )
}

export default FloatingDock
