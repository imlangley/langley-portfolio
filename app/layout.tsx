/**
 * Root Layout
 * 
 * Includes global providers (Theme, SmoothScroll) and global CSS.
 * Does NOT include AppLayout - that's in app/(site)/layout.tsx
 * so that /studio route renders standalone without the editor shell.
 */

import { draftMode } from 'next/headers'
import { Inter } from 'next/font/google' // Using Google Fonts
import { ThemeProvider } from '@/providers/ThemeProvider'
import { SmoothScroll } from '@/providers/SmoothScroll'
import { PreviewBanner } from '@/components/PreviewBanner'
import { ToastProviderWrapper } from '@/providers/ToastProviderWrapper'
import './globals.css'
import { cn } from '@/lib/utils'
import { CursorProvider } from '@/context/CursorContext'

import type { Metadata } from 'next'

import { getSiteSettings } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/image'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings()

    const title = settings?.siteTitle || 'Langley | Developer & Editor'
    const description = settings?.siteDescription || 'Portfolio of web development and video editing work.'

    // Dynamic favicon from Sanity, fallback to local file
    const icons = settings?.favicon
        ? { icon: urlFor(settings.favicon).width(128).height(128).url() }
        : { icon: '/icon.svg' }

    return {
        title,
        description,
        icons,
    }
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isEnabled } = await draftMode()

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                    <CursorProvider>
                        <ToastProviderWrapper>
                            <SmoothScroll>
                                {isEnabled && <PreviewBanner />}
                                {/* Children rendered directly - AppLayout is in (site)/layout.tsx */}
                                {children}
                            </SmoothScroll>
                        </ToastProviderWrapper>
                    </CursorProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}

