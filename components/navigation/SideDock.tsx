'use client'

import { ReactNode, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCursor } from '@/context/CursorContext'
import { Home, FolderOpen, User, Mail, ShoppingBag } from 'lucide-react'
import { GlassSurface } from '@/components/reactbits/GlassSurface'

interface DockItemProps {
    href: string
    icon: ReactNode
    label: string
    isActive: boolean
    mouseY: ReturnType<typeof useMotionValue<number>>
}

function DockItem({ href, icon, label, isActive, mouseY }: DockItemProps) {
    const ref = useRef<HTMLAnchorElement>(null)
    const { setCursorVariant } = useCursor()

    // Calculate distance from mouse for magnetic effect
    const distance = useTransform(mouseY, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 }
        return val - bounds.y - bounds.height / 2
    })

    // Scale based on proximity (macOS dock effect)
    const sizeSync = useTransform(distance, [-120, 0, 120], [44, 60, 44])
    const size = useSpring(sizeSync, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    })

    const [hovered, setHovered] = useState(false)

    return (
        <Link
            ref={ref}
            href={href}
            data-testid={`dock-link-${label.toLowerCase()}`}
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
                style={{ width: size, height: size }}
                className={`
                    relative flex items-center justify-center rounded-xl
                    transition-colors duration-200
                    ${isActive
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                        : 'bg-shell-surface text-shell-text-muted hover:bg-shell-active hover:text-shell-text'
                    }
                `}
            >
                <div className="flex items-center justify-center w-5 h-5">
                    {icon}
                </div>

                {/* Active indicator dot - positioned on right for vertical dock */}
                {isActive && (
                    <motion.div
                        layoutId="sideActiveIndicator"
                        className="absolute -right-1 w-1.5 h-1.5 bg-primary rounded-full"
                        transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
                    />
                )}
            </motion.div>

            {/* Tooltip - positioned to the right for vertical dock */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 5 }}
                        className="absolute left-full ml-3 px-3 py-1.5 bg-shell-bg border border-shell-border rounded-md text-xs font-medium text-shell-text whitespace-nowrap z-50 shadow-xl"
                    >
                        {label}
                        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-shell-bg border-l border-b border-shell-border rotate-45" />
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
    { href: '/shop', label: 'Shop', icon: <ShoppingBag className="w-5 h-5" /> },
    { href: '/contact', label: 'Contact', icon: <Mail className="w-5 h-5" /> },
]

interface SideDockProps {
    items?: NavItem[]
    className?: string
    position?: 'left' | 'right'
}

export function SideDock({ items = defaultNavItems, className = '', position = 'left' }: SideDockProps) {
    const pathname = usePathname()
    const mouseY = useMotionValue(Infinity)

    return (
        <motion.div
            initial={{ opacity: 0, x: position === 'left' ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: 'spring' as const, stiffness: 100, damping: 20 }}
            className={`
                fixed top-1/2 -translate-y-1/2 z-50
                ${position === 'left' ? 'left-3' : 'right-3'}
                ${className}
            `}
        >
            <GlassSurface
                width="auto"
                height="auto"
                borderRadius={16}
                backgroundOpacity={0.20}
                blur={12}
                saturation={1.5}
            >
                <nav
                    onMouseEnter={(e) => mouseY.set(e.pageY)}
                    onMouseMove={(e) => mouseY.set(e.pageY)}
                    onMouseLeave={() => mouseY.set(Infinity)}
                    className="flex flex-col items-center gap-2 px-2 py-3"
                    aria-label="Side navigation"
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
                            mouseY={mouseY}
                        />
                    ))}
                </nav>
            </GlassSurface>
        </motion.div>
    )
}

export default SideDock
