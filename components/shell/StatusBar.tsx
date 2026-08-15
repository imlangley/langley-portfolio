'use client'

import { usePathname } from 'next/navigation'
import { GitBranch, Wifi, Bell, Check, XCircle, AlertTriangle, Folder, Home, ChevronRight, Info } from 'lucide-react'
import { ThemeToggle } from '@/components/global/ThemeToggle'
import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'

function useBreadcrumb() {
    const pathname = usePathname()
    const segments = pathname.split('/').filter(Boolean)

    if (segments.length === 0) {
        return { icon: <Home className="w-3 h-3" aria-hidden="true" />, text: 'Home' }
    }

    const pageNames: Record<string, string> = {
        'projects': 'Projects',
        'about': 'About',
        'uptime': 'Status',
        'services': 'Services',
        'shop': 'Shop',
        'studio': 'Studio',
    }

    const breadcrumb = segments.map((seg) => {
        if (pageNames[seg]) return pageNames[seg]
        return seg.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    }).join(' / ')

    return {
        icon: <Folder className="w-3 h-3" aria-hidden="true" />,
        text: breadcrumb,
    }
}

function PulseIndicator({ active }: { active: boolean }) {
    if (!active) return null
    return (
        <motion.span
            className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-syn-teal rounded-full shadow-glow-teal"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
        />
    )
}

function NotificationBell() {
    const [hasNotification, setHasNotification] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => setHasNotification(true), 3000)
        return () => clearTimeout(timer)
    }, [])
    return (
        <button
            type="button"
            onClick={() => setHasNotification(false)}
            aria-label={hasNotification ? 'Notifications: 1 new. Activate to dismiss.' : 'Notifications'}
            className="relative hover:bg-white/15 px-1.5 py-0.5 rounded transition-colors h-5 flex items-center"
        >
            <Bell className="w-3 h-3" aria-hidden="true" />
            <PulseIndicator active={hasNotification} />
        </button>
    )
}

function InfoTooltip() {
    const [show, setShow] = useState(false)
    const year = new Date().getFullYear()
    return (
        <div
            className="relative hidden md:flex items-center gap-1 hover:bg-white/15 px-1.5 py-0.5 rounded transition-colors h-5"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
        >
            <Info className="w-3 h-3" aria-hidden="true" />
            <span>© {year}</span>
            <AnimatePresence>
                {show && (
                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-md border border-shell-border bg-shell-bg px-2 py-1 text-[10px] text-shell-text"
                    >
                        Built with Next.js & Sanity
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function StatusBar() {
    const { icon, text } = useBreadcrumb()

    return (
        <div
            role="status"
            aria-label="Editor status bar"
            className="relative h-7 w-full flex items-center justify-between px-3 z-40 select-none text-[11px] font-medium tracking-wide"
            style={{
                background: 'hsl(240 100% 70%)',
                backdropFilter: 'blur(18px) saturate(1.6)',
                WebkitBackdropFilter: 'blur(18px) saturate(1.6)',
                borderTop: '1px solid hsl(228 30% 96% / 0.1)',
                color: 'hsl(0 0% 100%)',
            }}
        >
            <div className="flex items-center gap-3 h-full">
                <motion.div
                    key={text}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1 px-1.5 py-0.5 rounded h-5"
                >
                    {icon}
                    <ChevronRight className="w-2.5 h-2.5 opacity-60" aria-hidden="true" />
                    <span className="max-w-[180px] truncate">{text}</span>
                </motion.div>

                <div className="hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded h-5">
                    <GitBranch className="w-3 h-3" aria-hidden="true" />
                    <span>main</span>
                    <Check className="w-2.5 h-2.5 text-green-300 ml-0.5" aria-hidden="true" />
                </div>

                <div className="hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded h-5">
                    <XCircle className="w-3 h-3" aria-hidden="true" />
                    <span>0</span>
                    <AlertTriangle className="w-3 h-3 ml-1" aria-hidden="true" />
                    <span>0</span>
                </div>
            </div>

            <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
                <span className="text-[10px] font-mono opacity-80">Langley · Portfolio</span>
            </div>

            <div className="flex items-center gap-2 h-full">
                <InfoTooltip />
                <span className="hidden md:inline px-1.5 py-0.5 rounded h-5 flex items-center">UTF-8</span>
                <span className="hidden md:inline px-1.5 py-0.5 rounded h-5 flex items-center">TypeScript React</span>
                <div className="hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded h-5">
                    <Wifi className="w-3 h-3" aria-hidden="true" />
                    <span>Live</span>
                </div>
                <NotificationBell />
                <ThemeToggle
                    className="!p-0.5 !h-5 !w-5 text-white hover:bg-white/15 rounded"
                    data-testid="theme-toggle-desktop"
                />
            </div>
        </div>
    )
}
