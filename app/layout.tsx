/**
 * Root Layout
 * 
 * Includes global providers (Theme, SmoothScroll) and global CSS.
 * Differentiates from 'app/(site)/layout.tsx' which contains the site chrome (Nav/Footer).
 */

import { draftMode } from 'next/headers'
import { Inter } from 'next/font/google' // Using Google Fonts
import { ThemeProvider } from '@/providers/ThemeProvider'
import { SmoothScroll } from '@/providers/SmoothScroll'
import { PreviewBanner } from '@/components/PreviewBanner'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata = {
    title: 'Langley | Developer & Editor',
    description: 'Portfolio of web development and video editing work.',
    icons: {
        icon: '/favicon.ico',
    },
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
                    <SmoothScroll>
                        {isEnabled && <PreviewBanner />}
                        {children}
                    </SmoothScroll>
                </ThemeProvider>
            </body>
        </html>
    )
}
