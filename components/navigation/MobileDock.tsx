'use client'

import { ReactNode, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FolderOpen, User, Activity, ShoppingBag } from 'lucide-react'

interface DockItemProps {
    href: string
    icon: ReactNode
    label: string
    isActive: boolean
    mouseX: ReturnType<typeof useMotionValue<number>>
}

function DockItem({ href, icon, label, isActive, mouseX }: DockItemProps) {
    const ref = useRef<HTMLAnchorElement>(null)

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
        return val - bounds.x - bounds.width / 2
    })

    // Horizontal magnetic scale — thumb-friendly 44px base, 56px max
    const sizeSync = useTransform(distance, [-100, 0, 100], [44, 56, 44])
    const size = useSpring(sizeSync, {
        mass: 0.12,
        stiffness: 220,
        damping: 18,
    })

    const [hovered, setHovered] = useState(false)

    return (
        <Link
            ref={ref}
            href={href}
            data-testid={`mobile-dock-link-${label.toLowerCase()}`}
            onTouchStart={() => setHovered(true)}
            onTouchEnd={() => setHovered(false)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative flex items-center justify-center touch-manipulation"
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
        >
            <motion.div
                style={{ width: size, height: size }}
                className={`
                    relative flex items-center justify-center rounded-2xl
                    transition-all duration-200
                    ${isActive
                        ? 'bg-ae-purple text-[#0b0b14]'
                        : 'bg-white/[0.04] text-shell-text-muted active:bg-white/[0.12] active:text-shell-text'
                    }
                `}
            >
                <div className="flex items-center justify-center w-5 h-5">
                    {icon}
                </div>

                {/* Active indicator — AE pin on top for bottom dock */}
                {isActive && (
                    <motion.div
                        layoutId="mobileDockActive"
                        className="absolute -top-1 w-6 h-1 bg-ae-cyan rounded-full"
                        transition={{ type: 'spring' as const, stiffness: 320, damping: 28 }}
                    />
                )}
            </motion.div>

            {/* Tooltip — above for bottom dock */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                        className="absolute bottom-full mb-3 z-50 whitespace-nowrap rounded-md border border-shell-border bg-shell-bg px-3 py-1 text-[11px] font-medium text-shell-text pointer-events-none"
                    >
                        {label}
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
    { href: '/uptime', label: 'Status', icon: <Activity className="w-5 h-5" /> },
]

interface MobileDockProps {
    items?: NavItem[]
    className?: string
}

export function MobileDock({ items = defaultNavItems, className = '' }: MobileDockProps) {
    const pathname = usePathname()
    const mouseX = useMotionValue(Infinity)

    return (
        <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' as const, stiffness: 160, damping: 20 }}
            className={`
                fixed bottom-4 left-1/2 -translate-x-1/2 z-50
                ${className}
            `}
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
                    <div className="rounded-md border border-shell-border bg-shell-bg p-1.5">
                <nav
                    onMouseMove={(e) => mouseX.set(e.clientX)}
                    onMouseLeave={() => mouseX.set(Infinity)}
                    onTouchMove={(e) => mouseX.set(e.touches[0].clientX)}
                    onTouchEnd={() => mouseX.set(Infinity)}
                    className="flex items-center gap-1.5 px-2 py-1"
                    aria-label="Mobile navigation"
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
                </nav>
            </div>
        </motion.div>
    )
}
