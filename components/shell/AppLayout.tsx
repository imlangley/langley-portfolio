'use client'

import { ReactNode } from 'react'
import { MenuBar } from './MenuBar'
import { Toolbar } from './Toolbar'
import { StatusBar } from './StatusBar'
import { ThemeToggle } from '@/components/global/ThemeToggle'
import { SideDock } from '@/components/navigation/SideDock'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { useCursor } from '@/context/CursorContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FolderOpen, User, Mail, Settings } from 'lucide-react'
import { MobileDock } from '@/components/navigation/MobileDock'

export interface AppLayoutProps {
    children: ReactNode
}

// Mobile navigation link component
// MobileNavLink removed in favor of MobileDock

export function AppLayout({ children }: AppLayoutProps) {
    const { setCursorVariant } = useCursor()

    return (
        // Removed h-screen, h-[100dvh], overflow-hidden to allow Lenis smooth scroll
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary flex flex-col relative">
            {/* Scroll Progress Indicator */}
            <ScrollProgress />

            {/* Desktop Shell Elements - kept minimal for cleaner look */}
            <div className="hidden md:block shrink-0">
                <MenuBar />
            </div>

            {/* Mobile Header (Simplified) */}
            <header className="md:hidden h-14 bg-shell-bg border-b border-shell-border flex items-center justify-between px-4 z-50 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                        Ae
                    </div>
                    <span className="font-bold text-shell-text">Langley.aep</span>
                </div>
                {/* Theme Toggle - Mobile */}
                <ThemeToggle
                    className="text-shell-text-muted hover:text-shell-text"
                    data-testid="theme-toggle-mobile"
                />
            </header>

            {/* Main Content Viewport - Full width for immersive experience */}
            <main
                className="flex-1 relative bg-background"
                onMouseEnter={() => setCursorVariant('default')}
            >
                <div className="min-h-full w-full relative">
                    {/* Content Area - Full width now */}
                    <div className="relative z-10 w-full">
                        {children}
                    </div>
                </div>
            </main>

            {/* Side Dock Navigation - Desktop (Left Vertical) */}
            <div className="hidden md:block">
                <SideDock position="left" />
            </div>

            <div className="hidden md:block shrink-0 z-40">
                <StatusBar />
            </div>

            {/* Mobile Bottom Dock */}
            <div className="md:hidden">
                <MobileDock />
            </div>
        </div>
    )
}
