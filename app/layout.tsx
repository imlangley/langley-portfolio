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
import { TargetCursor } from '@/components/reactbits'

import { getSiteSettings } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/image'

import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export async function generateMetadata(): Promise<Metadata> {
    const siteSettings = await getSiteSettings()

    return {
        title: siteSettings?.siteTitle || 'Langley | Developer & Editor',
        description: siteSettings?.siteDescription || 'Portfolio of web development and video editing work.',
        icons: {
            icon: siteSettings?.favicon ? urlFor(siteSettings.favicon).width(128).height(128).url() : '/favicon.ico',
        },
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
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <CursorProvider>
                        <ToastProviderWrapper>
                            <TargetCursor
                                targetSelector="a, button, [role='button'], input, textarea, .cursor-target"
                                spinDuration={4}
                                hoverDuration={0.3}
                            />
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

