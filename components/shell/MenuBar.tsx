'use client'

import { motion } from 'motion/react'
import { Search, ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

const menuItems = ['File', 'Edit', 'Composition', 'Layer', 'Effect', 'View', 'Help']

function openCommandPalette() {
    document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
    )
}

function useFilePath() {
    const pathname = usePathname()
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length === 0) return 'index.tsx'
    return `${segments[segments.length - 1]}.tsx`
}

export function MenuBar() {
    const filename = useFilePath()

    return (
        <div
            className="h-11 w-full flex items-center justify-between px-4 fixed top-0 left-0 z-50 select-none"
            style={{
                background: 'hsl(231 22% 9% / 0.92)',
                backdropFilter: 'blur(20px) saturate(1.6)',
                WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
                borderBottom: '1px solid hsl(228 30% 96% / 0.06)',
            }}
        >
            <div className="flex items-center gap-5 min-w-0">
                <motion.div
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    className="flex items-center gap-2.5 shrink-0"
                >
                    <div className="relative w-5 h-5 rounded bg-ae-purple flex items-center justify-center">
                        <span className="text-[9px] font-black text-white">Ae</span>
                    </div>
                    <span className="text-[13px] font-bold text-shell-text tracking-tight">
                        Langley<span className="text-shell-accent">.aep</span>
                    </span>
                </motion.div>

                <nav
                    className="hidden lg:flex items-center gap-0.5 text-[12px] text-shell-text-muted"
                    aria-label="Application menu"
                >
                    {menuItems.map((item) => (
                        <motion.button
                            key={item}
                            type="button"
                            whileHover={{ y: -0.5 }}
                            className="px-2.5 py-1 hover:text-shell-text hover:bg-shell-active/50 rounded transition-colors"
                        >
                            {item}
                        </motion.button>
                    ))}
                </nav>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 hidden xl:flex items-center gap-1.5 text-[11px] font-mono text-shell-text-muted">
                <span className="text-syn-blue">~/langley</span>
                <ChevronRight className="w-3 h-3 opacity-50" aria-hidden="true" />
                <span className="text-shell-text">{filename}</span>
            </div>

            <div className="flex items-center gap-3">
                <motion.button
                    type="button"
                    onClick={openCommandPalette}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Open command palette"
                    className="flex items-center gap-2 pl-2.5 pr-2 py-1 rounded-md bg-shell-active/50 border border-shell-border text-[11px] text-shell-text-muted hover:text-shell-text hover:border-shell-accent/40 transition-colors"
                >
                    <Search className="w-3 h-3" aria-hidden="true" />
                    <span className="hidden sm:inline">Search</span>
                    <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-shell-bg-alt border border-shell-border text-[9px] font-mono">
                        ⌘K
                    </kbd>
                </motion.button>

                <div className="hidden sm:block h-4 w-px bg-shell-border" aria-hidden="true" />

                <div className="flex items-center gap-1.5" aria-hidden="true">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
            </div>
        </div>
    )
}
