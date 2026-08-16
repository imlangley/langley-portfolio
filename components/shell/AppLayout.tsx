'use client'

import { ReactNode } from 'react'
import { SiteHeader } from './SiteHeader'
import { MobileDock } from '@/components/navigation/MobileDock'

export interface AppLayoutProps {
    children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground font-sans antialiased selection:bg-primary/30 selection:text-primary">
            <SiteHeader />

            <main className="flex-1">
                <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>
            </main>

            {/* Mobile bottom dock — thumb-reachable navigation */}
            <div className="md:hidden">
                <MobileDock />
            </div>

            {/* Space so the fixed mobile dock never covers content */}
            <div className="h-20 shrink-0 md:hidden" aria-hidden />
        </div>
    )
}
