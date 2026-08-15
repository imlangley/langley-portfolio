'use client'

import { ReactNode } from 'react'
import { MenuBar } from './MenuBar'
import { StatusBar } from './StatusBar'
import { ThemeToggle } from '@/components/global/ThemeToggle'
import { SideDock } from '@/components/navigation/SideDock'
import { ScrollProgress } from '@/components/reactbits/ScrollProgress'
import { useCursor } from '@/context/CursorContext'
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

            {/* Desktop Shell Elements */}
            <div className="hidden md:block shrink-0 h-11">
                <MenuBar />
            </div>

            {/* Mobile Header — liquid glass */}
            <header className="md:hidden sticky top-0 h-14 flex items-center justify-between px-4 z-50 shrink-0"
                style={{
                    background: 'hsl(231 22% 9% / 0.92)',
                    backdropFilter: 'blur(20px) saturate(1.6)',
                    WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
                    borderBottom: '1px solid hsl(228 30% 96% / 0.06)',
                }}
            >
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-ae-purple flex items-center justify-center text-[10px] font-black text-white">
                        Ae
                    </div>
                    <span className="font-bold text-shell-text text-sm">
                        Langley<span className="text-shell-accent">.aep</span>
                    </span>
                </div>
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

            {/* Side Dock — hidden on lg+ where the Explorer rail handles navigation */}
            <div className="hidden md:block lg:hidden">
                <SideDock />
            </div>

            <div className="hidden lg:block shrink-0 z-40">
                <StatusBar />
            </div>

            {/* Mobile Bottom Dock — thumb-reachable, liquid glass */}
            <div className="md:hidden">
                <MobileDock />
            </div>

            <div className="h-24 shrink-0 md:h-28 lg:h-0" aria-hidden />
        </div>
    )
}
