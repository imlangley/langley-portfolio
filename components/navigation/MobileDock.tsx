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
    mouseX: ReturnType<typeof useMotionValue<number>>
}

function DockItem({ href, icon, label, isActive, mouseX }: DockItemProps) {
    const ref = useRef<HTMLAnchorElement>(null)
    const { setCursorVariant } = useCursor()

    // Calculate distance from mouse for magnetic effect (Vertical - using 'mouseX' prop but treating as Y)
    // NOTE: 'mouseX' prop name is kept for interface compatibility but we pass Y coordinates
    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 }
        return val - bounds.y - bounds.height / 2
    })

    // Scale based on proximity - reduced sizes for mobile
    // Base: 40px, Active/Hover: 52px
    const sizeSync = useTransform(distance, [-100, 0, 100], [40, 52, 40])
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
            onTouchStart={() => setHovered(true)}
            onTouchEnd={() => setHovered(false)}
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
                <div className="flex items-center justify-center w-4 h-4 md:w-5 md:h-5">
                    {icon}
                </div>

                {/* Active indicator - dot on the left */}
                {isActive && (
                    <motion.div
                        layoutId="mobileDockActive"
                        className="absolute -left-1 w-1 h-1 bg-primary rounded-full"
                        transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
                    />
                )}
            </motion.div>

            {/* Tooltip - positioned left for right-side dock */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: -16 }}
                        exit={{ opacity: 0, x: -5 }}
                        className="absolute right-full mr-2 px-2 py-1 bg-shell-bg border border-shell-border rounded-md text-[10px] font-medium text-shell-text whitespace-nowrap z-50 shadow-xl pointer-events-none"
                    >
                        {label}
                        <div className="absolute rightless w-0 h-0" /> {/* Simplify arrow or remove for clean look */}
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

interface MobileDockProps {
    items?: NavItem[]
    className?: string
}

export function MobileDock({ items = defaultNavItems, className = '' }: MobileDockProps) {
    const pathname = usePathname()
    // For vertical dock, we track MouseY
    const mouseY = useMotionValue(Infinity)

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: 'spring' as const, stiffness: 100, damping: 20 }}
            className={`
                fixed top-1/2 -translate-y-1/2 right-3 z-50
                ${className}
            `}
        >
            <GlassSurface
                width="auto"
                height="auto"
                borderRadius={16}
                backgroundOpacity={0.25}
                blur={12}
                saturation={1.8}
            >
                <nav
                    onMouseEnter={(e) => mouseY.set(e.clientY)}
                    onMouseMove={(e) => mouseY.set(e.clientY)}
                    onMouseLeave={() => mouseY.set(Infinity)}
                    onTouchMove={(e) => mouseY.set(e.touches[0].clientY)}
                    onTouchEnd={() => mouseY.set(Infinity)}
                    className="flex flex-col items-center gap-3 px-2 py-4"
                    aria-label="Mobile navigation dock"
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
                            // Pass mouseY for vertical scaling if we want, or disable scaling for mobile simplicity
                            mouseX={mouseY}
                        />
                    ))}
                </nav>
            </GlassSurface>
        </motion.div>
    )
}
