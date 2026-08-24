'use client'

import { ReactNode } from 'react'
import { SiteHeader } from './SiteHeader'
import { PageBackdrop } from '@/components/three/PageBackdrop'

export interface AppLayoutProps {
    children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground font-sans antialiased selection:bg-primary/30 selection:text-primary">
            <SiteHeader />
            <PageBackdrop />

            <main className="flex-1">
                <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>
            </main>
        </div>
    )
}
