'use client'

import { usePathname } from 'next/navigation'
import { GitBranch, Wifi, Bell, Check, XCircle, AlertTriangle, Folder, Home, ChevronRight, Info } from 'lucide-react'
import { ThemeToggle } from '@/components/global/ThemeToggle'
import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'

// Get breadcrumb from pathname
function useBreadcrumb() {
    const pathname = usePathname()
    
    const segments = pathname.split('/').filter(Boolean)
    
    if (segments.length === 0) {
        return { icon: <Home className="w-3 h-3" />, text: 'Home', path: '/' }
    }
    
    const pageNames: Record<string, string> = {
        'projects': 'Projects',
        'about': 'About',
        'uptime': 'Status',
        'services': 'Services',
        'studio': 'Studio',
    }
    
    // Build breadcrumb path
    const breadcrumb = segments.map((seg, i) => {
        // Check if it's a known page
        if (pageNames[seg]) return pageNames[seg]
        // Otherwise it's likely a slug - capitalize first letter
        return seg.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    }).join(' / ')
    
    return { 
        icon: <Folder className="w-3 h-3" />, 
        text: breadcrumb, 
        path: pathname 
    }
}

// Pulse effect component
function PulseIndicator({ active }: { active: boolean }) {
    if (!active) return null
    
    return (
        <motion.span
            className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full"
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
        />
    )
}

export function StatusBar() {
    const { icon, text } = useBreadcrumb()
    const [hasNotification, setHasNotification] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)
    
    // Simulate a notification appearing after page load
    useEffect(() => {
        const timer = setTimeout(() => setHasNotification(true), 3000)
        return () => clearTimeout(timer)
    }, [])
    
    const currentYear = new Date().getFullYear()
    
    return (
        <div
            className="h-6 w-full bg-primary text-primary-foreground flex items-center justify-between px-3 fixed bottom-0 left-0 z-50 select-none text-[11px] font-medium tracking-wide"
            role="status"
            aria-label="Editor status bar"
        >
            {/* Left: Breadcrumb & Info */}
            <div className="flex items-center gap-4 h-full">
                {/* Current Page Breadcrumb */}
                <motion.div 
                    key={text}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-pointer transition-colors h-4"
                >
                    {icon}
                    <ChevronRight className="w-2.5 h-2.5 opacity-60" />
                    <span className="max-w-[200px] truncate">{text}</span>
                </motion.div>
                
                {/* Git Branch */}
                <div className="flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-pointer transition-colors h-4">
                    <GitBranch className="w-3 h-3" />
                    <span>main</span>
                    <Check className="w-2.5 h-2.5 text-green-300 ml-0.5" />
                </div>
                
                {/* Status Indicators */}
                <div className="flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-pointer transition-colors h-4">
                    <XCircle className="w-3 h-3" />
                    <span>0</span>
                    <AlertTriangle className="w-3 h-3 ml-1" />
                    <span>0</span>
                </div>
            </div>

            {/* Right: Info & Controls */}
            <div className="flex items-center gap-4 h-full">
                {/* Last Updated */}
                <div 
                    className="relative flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-pointer transition-colors h-4"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <Info className="w-3 h-3" />
                    <span className="hidden sm:inline">© {currentYear}</span>
                    
                    {/* Tooltip */}
                    <AnimatePresence>
                        {showTooltip && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-shell-bg text-shell-text text-[10px] rounded shadow-lg whitespace-nowrap border border-shell-border"
                            >
                                Built with Next.js & Sanity
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                
                <div className="flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-pointer transition-colors h-4">
                    <span>UTF-8</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-pointer transition-colors h-4">
                    <span>TypeScript React</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-pointer transition-colors h-4">
                    <Wifi className="w-3 h-3" />
                    <span className="ml-1">Live</span>
                </div>
                
                {/* Notification Bell with Pulse */}
                <div 
                    className="relative hover:bg-white/10 px-1 rounded cursor-pointer transition-colors h-4 flex items-center"
                    onClick={() => setHasNotification(false)}
                >
                    <Bell className="w-3 h-3" />
                    <PulseIndicator active={hasNotification} />
                </div>
                
                {/* Theme Toggle - Desktop */}
                <ThemeToggle
                    className="!p-0.5 !h-4 !w-4 text-white hover:bg-white/10 rounded"
                    data-testid="theme-toggle-desktop"
                />
            </div>
        </div>
    )
}

