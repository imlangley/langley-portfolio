'use client'

import { ReactNode } from 'react'
import { MenuBar } from './MenuBar'
import { Toolbar } from './Toolbar'
import { StatusBar } from './StatusBar'
import { useCursor } from '@/context/CursorContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FolderOpen, User, Mail, Settings } from 'lucide-react'

interface AppLayoutProps {
    children: ReactNode
}

// Mobile navigation link component
function MobileNavLink({ href, label }: { href: string; label: string }) {
    const pathname = usePathname()
    const isActive = pathname === href

    const icons: Record<string, React.ReactNode> = {
        'Home': <Home className="w-5 h-5" />,
        'Projects': <FolderOpen className="w-5 h-5" />,
        'About': <User className="w-5 h-5" />,
        'Contact': <Mail className="w-5 h-5" />,
        'Studio': <Settings className="w-5 h-5" />,
    }

    return (
        <Link
            href={href}
            data-testid={`mobile-nav-${label.toLowerCase()}`}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${isActive
                ? 'text-blue-400 bg-[#2a2a2a]'
                : 'text-gray-500 hover:text-white'
                }`}
        >
            {icons[label]}
            <span className="text-[9px] font-medium uppercase tracking-wider">{label}</span>
        </Link>
    )
}

export function AppLayout({ children }: AppLayoutProps) {
    const { setCursorVariant } = useCursor()

    return (
        <div className="min-h-screen bg-[#161616] text-gray-300 font-sans selection:bg-blue-500/30 selection:text-white overflow-hidden flex flex-col md:block">
            {/* Desktop Shell Elements */}
            <div className="hidden md:block">
                <MenuBar />
                <Toolbar />
            </div>

            {/* Mobile Header (Simplified) */}
            <div className="md:hidden h-14 bg-[#1f1f1f] border-b border-[#333] flex items-center justify-between px-4 z-50 fixed top-0 left-0 w-full">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                        Ae
                    </div>
                    <span className="font-bold text-gray-200">Langley.aep</span>
                </div>
            </div>

            {/* Main Content Viewport */}
            <main
                className="flex-1 md:fixed md:top-10 md:left-14 md:right-0 md:bottom-6 overflow-y-auto scrollbar-hide bg-[#0d0d0d] pt-14 md:pt-0"
                onMouseEnter={() => setCursorVariant('default')}
            >
                <div className="min-h-full w-full relative">
                    {/* Editor Gutter (Fake) - Desktop Only */}
                    <div className="absolute left-0 top-0 bottom-0 w-10 border-r border-[#333] bg-[#1e1e1e] z-0 hidden md:flex flex-col items-end pr-2 pt-4 text-gray-600 font-mono text-[10px] select-none pointer-events-none">
                        {Array.from({ length: 50 }).map((_, i) => (
                            <div key={i} className="leading-6">{i + 1}</div>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="pl-0 md:pl-10 relative z-10 w-full min-h-screen">
                        {children}
                    </div>
                </div>
            </main>

            <div className="hidden md:block">
                <StatusBar />
            </div>

            {/* Mobile Bottom Bar (Navigation) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#1f1f1f] border-t border-[#333] flex items-center justify-around z-50 pb-2">
                <MobileNavLink href="/" label="Home" />
                <MobileNavLink href="/projects" label="Projects" />
                <MobileNavLink href="/about" label="About" />
                <MobileNavLink href="/contact" label="Contact" />
                <MobileNavLink href="/studio" label="Studio" />
            </div>
        </div>
    )
}
