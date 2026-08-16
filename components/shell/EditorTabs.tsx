'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Braces,
    FolderGit2,
    FileText,
    ShoppingBag,
    Activity,
    FileCode2,
    Package,
    CreditCard,
    CheckCircle2,
    Sparkles,
    ArrowLeft,
    X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface TabDef {
    href: string
    label: string
    icon: LucideIcon
    tone: string
    match: (pathname: string) => boolean
}

const TABS: TabDef[] = [
    {
        href: '/',
        label: 'index.tsx',
        icon: Braces,
        tone: 'text-syn-yellow',
        match: (p) => p === '/',
    },
    {
        href: '/projects',
        label: 'projects/',
        icon: FolderGit2,
        tone: 'text-syn-blue',
        match: (p) => p === '/projects' || p.startsWith('/projects/'),
    },
    {
        href: '/about',
        label: 'about.md',
        icon: FileText,
        tone: 'text-syn-teal',
        match: (p) => p === '/about',
    },
    {
        href: '/shop',
        label: 'shop.tsx',
        icon: ShoppingBag,
        tone: 'text-syn-orange',
        match: (p) => p === '/shop' || p.startsWith('/shop/'),
    },
    {
        href: '/uptime',
        label: 'status.log',
        icon: Activity,
        tone: 'text-syn-green',
        match: (p) => p === '/uptime',
    },
]

/** Resolves the transient "open file" tab for detail/sub routes. */
function resolveOpenFile(pathname: string): { label: string; icon: LucideIcon; tone: string; parent: string } | null {
    const segments = pathname.split('/').filter(Boolean)

    if (segments[0] === 'projects' && segments[1]) {
        return {
            label: `${segments[segments.length - 1]}.tsx`,
            icon: FileCode2,
            tone: 'text-syn-yellow',
            parent: '/projects',
        }
    }
    if (segments[0] === 'shop' && segments[1] === 'payment') {
        return { label: 'checkout.tsx', icon: CreditCard, tone: 'text-syn-orange', parent: '/shop' }
    }
    if (segments[0] === 'shop' && segments[1] === 'success') {
        return { label: 'receipt.log', icon: CheckCircle2, tone: 'text-syn-green', parent: '/shop' }
    }
    if (segments[0] === 'shop' && segments[1]) {
        return {
            label: `${segments[segments.length - 1].replace(/-\d+$/, '')}.zip`,
            icon: Package,
            tone: 'text-syn-orange',
            parent: '/shop',
        }
    }
    if (segments[0] === 'showcase') {
        return { label: 'gallery.jsx', icon: Sparkles, tone: 'text-syn-magenta', parent: '/' }
    }
    return null
}

export function EditorTabs() {
    const pathname = usePathname()
    const openFile = resolveOpenFile(pathname)

    return (
        <nav
            aria-label="Workspace files"
            className="z-40 flex h-9 w-full items-stretch overflow-x-auto border-b border-shell-border bg-shell-bg font-mono text-[11px] scrollbar-hide"
        >
            {/* Back — always available on sub-routes, mirrors editor "close tab" */}
            {openFile && (
                <Link
                    href={openFile.parent}
                    aria-label={`Back to ${openFile.parent === '/' ? 'home' : openFile.parent.replace('/', '')}`}
                    className="flex shrink-0 items-center gap-1 border-r border-shell-border px-2.5 text-shell-text-muted transition-colors hover:bg-shell-active hover:text-shell-text"
                >
                    <ArrowLeft className="h-3 w-3" aria-hidden="true" />
                    <span className="hidden sm:inline">back</span>
                </Link>
            )}

            {TABS.map((tab) => {
                const Icon = tab.icon
                const isActive = !openFile && tab.match(pathname)
                return (
                    <Link
                        key={tab.href}
                        href={tab.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                            'relative flex shrink-0 items-center gap-1.5 border-r border-shell-border px-3 transition-colors',
                            isActive
                                ? 'bg-shell-bg-alt text-shell-text'
                                : 'text-shell-text-muted hover:bg-shell-active/60 hover:text-shell-text'
                        )}
                    >
                        {isActive && (
                            <span
                                className="absolute inset-x-0 top-0 h-[2px] bg-shell-accent"
                                aria-hidden="true"
                            />
                        )}
                        <Icon className={cn('h-3 w-3 shrink-0', tab.tone)} aria-hidden="true" />
                        {tab.label}
                        {isActive && (
                            <span className="ml-1 h-1.5 w-1.5 rounded-full bg-shell-accent" aria-hidden="true" />
                        )}
                    </Link>
                )
            })}

            {/* Transient open-file tab with close affordance back to parent */}
            {openFile && (
                <span
                    aria-current="page"
                    className="relative flex shrink-0 items-center gap-1.5 border-r border-shell-border bg-shell-bg-alt px-3 text-shell-text"
                >
                    <span className="absolute inset-x-0 top-0 h-[2px] bg-shell-accent" aria-hidden="true" />
                    <openFile.icon className={cn('h-3 w-3 shrink-0', openFile.tone)} aria-hidden="true" />
                    {openFile.label}
                    <Link
                        href={openFile.parent}
                        aria-label={`Close tab, back to ${openFile.parent}`}
                        className="ml-1 flex h-4 w-4 items-center justify-center rounded-sm text-shell-text-muted transition-colors hover:bg-shell-active hover:text-shell-text"
                    >
                        <X className="h-3 w-3" aria-hidden="true" />
                    </Link>
                </span>
            )}
        </nav>
    )
}
