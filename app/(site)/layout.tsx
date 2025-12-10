/**
 * Site Layout
 * 
 * Wraps pages that share the main site chrome (Navbar/Footer).
 * This separates the marketing site from the Studio or other isolated routes.
 */

import { Navbar } from '@/components/global/Navbar'
import { Footer } from '@/components/global/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { CursorProvider } from '@/context/CursorContext'

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <CursorProvider>
            <div className="flex min-h-screen flex-col">
                <CustomCursor />
                <Navbar />
                <main className="flex-1 pt-16">
                    {children}
                </main>
                <Footer />
            </div>
        </CursorProvider>
    )
}
