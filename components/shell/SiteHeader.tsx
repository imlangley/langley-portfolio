'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { ThemeToggle } from '@/components/global/ThemeToggle'
import { cn } from '@/lib/utils'

const NAV = [
    { href: '/projects', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/shop', label: 'Shop' },
    { href: '/uptime', label: 'Status' },
]

/** Detail routes get a quiet back affordance in the header. */
const BACK_ROUTES: Array<{ pattern: RegExp; fallback: string }> = [
    { pattern: /^\/projects\/.+/, fallback: '/projects' },
    { pattern: /^\/shop\/(?!payment|success).+/, fallback: '/shop' },
    { pattern: /^\/shop\/(payment|success)/, fallback: '/shop' },
    { pattern: /^\/showcase\/.+/, fallback: '/showcase' },
]

export function SiteHeader() {
    const pathname = usePathname()
    const backRoute = BACK_ROUTES.find((r) => r.pattern.test(pathname))

    return (
        <header className="sticky top-0 z-40 h-14 w-full border-b border-shell-border bg-shell-bg/95 backdrop-blur-sm">
            <div className="mx-auto flex h-full max-w-6xl items-center gap-4 px-4 sm:px-6">
                {backRoute && (
                    <Link
                        href={backRoute.fallback}
                        aria-label="Back"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-shell-text-muted transition-colors hover:bg-shell-active hover:text-shell-text"
                    >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    </Link>
                )}

                <Link
                    href="/"
                    className="flex shrink-0 items-center gap-2 font-semibold tracking-tight text-shell-text"
                >
                    <span
                        className="flex h-6 w-6 items-center justify-center rounded bg-ae-purple text-[10px] font-black text-[#0b0b14]"
                        aria-hidden="true"
                    >
                        Ae
                    </span>
                    <span className="hidden sm:inline">Langley</span>
                </Link>

                <nav aria-label="Primary" className="ml-2 flex min-w-0 items-center gap-1 overflow-x-auto scrollbar-hide">
                    {NAV.map((item) => {
                        const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={active ? 'page' : undefined}
                                className={cn(
                                    'shrink-0 rounded-md px-2.5 py-1.5 text-sm transition-colors',
                                    active
                                        ? 'text-shell-text'
                                        : 'text-shell-text-muted hover:text-shell-text'
                                )}
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="ml-auto flex shrink-0 items-center gap-1">
                    <a
                        href="https://github.com/imlangley"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden h-8 w-8 items-center justify-center rounded-md text-shell-text-muted transition-colors hover:bg-shell-active hover:text-shell-text sm:flex"
                        aria-label="GitHub"
                    >
                        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                        </svg>
                    </a>
                    <ThemeToggle
                        className="text-shell-text-muted hover:text-shell-text"
                        data-testid="theme-toggle-desktop"
                    />
                </div>
            </div>
        </header>
    )
}
