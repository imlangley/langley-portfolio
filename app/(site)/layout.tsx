/**
 * Site Layout
 * 
 * Wraps pages that share the main site chrome (Editor Shell).
 * This separates the marketing site from the Studio or other isolated routes.
 * AppLayout provides the editor shell (MenuBar, Toolbar, StatusBar).
 */

import { Footer } from '@/components/global/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { CursorProvider } from '@/context/CursorContext'
import { AppLayout } from '@/components/shell/AppLayout'

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <CursorProvider>
            <CustomCursor />
            {/* Editor Shell Wrapper - only for site pages, not studio */}
            <AppLayout>
                <div className="flex min-h-screen flex-col">
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer />
                </div>
            </AppLayout>
        </CursorProvider>
    )
}

