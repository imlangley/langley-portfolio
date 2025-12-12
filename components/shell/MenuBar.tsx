'use client'

import { motion } from 'motion/react'
import { Link2, Layout, Settings, HelpCircle, Monitor } from 'lucide-react'
import Link from 'next/link'

export function MenuBar() {
    return (
        <div className="h-10 w-full bg-shell-bg border-b border-shell-border flex items-center justify-between px-4 fixed top-0 left-0 z-50 select-none">
            {/* Left: App Identity & Menus */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                        L
                    </div>
                    <span className="text-xs font-bold text-shell-text tracking-wide">Langley.aep</span>
                </div>

                <div className="hidden md:flex items-center gap-4 text-xs text-shell-text-muted">
                    <span className="hover:text-shell-text cursor-pointer transition-colors">File</span>
                    <span className="hover:text-shell-text cursor-pointer transition-colors">Edit</span>
                    <span className="hover:text-shell-text cursor-pointer transition-colors">View</span>
                    <span className="hover:text-shell-text cursor-pointer transition-colors">Go</span>
                    <span className="hover:text-shell-text cursor-pointer transition-colors">Run</span>
                    <span className="hover:text-shell-text cursor-pointer transition-colors">Terminal</span>
                    <span className="hover:text-shell-text cursor-pointer transition-colors">Help</span>
                </div>
            </div>

            {/* Center: Window Title (Simulated) */}
            <div className="absolute left-1/2 -translate-x-1/2 text-xs text-shell-text-muted font-mono hidden lg:block">
                Editor — portfolio-v2 [Read Only]
            </div>

            {/* Right: Window Controls & Actions */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <Monitor className="w-3.5 h-3.5 text-shell-text-muted hover:text-shell-text cursor-pointer" />
                    <Layout className="w-3.5 h-3.5 text-shell-text-muted hover:text-shell-text cursor-pointer" />
                </div>
                <div className="h-3 w-px bg-shell-border" />
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                </div>
            </div>
        </div>
    )
}
