/**
 * Site Layout
 * 
 * Wraps pages that share the main site chrome (Editor Shell).
 * This separates the marketing site from the Studio or other isolated routes.
 * AppLayout provides the site shell (SiteHeader, MobileDock, Footer).
 * 
 * Note: CursorProvider and CustomCursor are in root layout.tsx
 */

import { Footer } from '@/components/global/Footer'
import { AppLayout } from '@/components/shell/AppLayout'
import { CommandMenuWrapper } from '@/components/global/CommandMenuWrapper'

import { getSiteSettings } from '@/sanity/lib/fetch'

export default async function SiteLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const siteSettings = await getSiteSettings()

    return (
        <>
            {/* Command Menu - Accessible with Cmd/Ctrl + K */}
            <CommandMenuWrapper />
            {/* Site shell - only for site pages, not studio */}
            <AppLayout>
                <div className="flex flex-col">
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer siteSettings={siteSettings} />
                </div>
            </AppLayout>
        </>
    )
}

