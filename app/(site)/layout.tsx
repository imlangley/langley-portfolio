/**
 * Site Layout
 * 
 * Wraps pages that share the main site chrome (Editor Shell).
 * This separates the marketing site from the Studio or other isolated routes.
 * AppLayout provides the editor shell (MenuBar, Toolbar, StatusBar).
 * 
 * Note: CursorProvider and CustomCursor are in root layout.tsx
 */

import { Footer } from '@/components/global/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { AppLayout } from '@/components/shell/AppLayout'
import { ScrollProgress } from '@/components/reactbits/ScrollProgress'
import { CommandMenuWrapper } from '@/components/global/CommandMenuWrapper'

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {/* Scroll Progress Indicator */}
            <ScrollProgress color="#3b82f6" height={3} />
            {/* CustomCursor rendered here for site pages only (studio doesn't need it) */}
            <CustomCursor />
            {/* Command Menu - Accessible with Cmd/Ctrl + K */}
            <CommandMenuWrapper />
            {/* Editor Shell Wrapper - only for site pages, not studio */}
            <AppLayout>
                <div className="flex flex-col">
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer />
                </div>
            </AppLayout>
        </>
    )
}

