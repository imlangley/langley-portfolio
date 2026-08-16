'use client'

import Link from 'next/link'
import { ArrowRight, ShoppingBag, ChevronRight, Folder, FileCode2, Film, FileText, Activity } from 'lucide-react'
import { useCursor } from '@/context/CursorContext'
import { WorkspaceCanvas } from '@/components/three/WorkspaceCanvas'
import { RoleRotator } from './RoleRotator'
import type { Profile, SiteSettings, Tool } from '@/sanity/lib/fetch'

interface HeroProps {
    siteSettings?: SiteSettings | null
    profile?: Profile | null
    tools?: Tool[]
}

const EXPLORER = [
    { label: 'hero.tsx', icon: FileCode2, tone: 'text-syn-yellow', href: '/', active: true },
    { label: 'projects/', icon: Folder, tone: 'text-syn-blue', href: '/projects' },
    { label: 'about.md', icon: FileText, tone: 'text-syn-teal', href: '/about' },
    { label: 'shop.tsx', icon: Film, tone: 'text-syn-orange', href: '/shop' },
    { label: 'status.log', icon: Activity, tone: 'text-syn-green', href: '/uptime' },
]

const TIMELINE = [
    { name: 'hero', color: '#9999ff', start: 0, span: 34 },
    { name: 'projects', color: '#00c8ff', start: 30, span: 30 },
    { name: 'about', color: '#c586c0', start: 56, span: 22 },
    { name: 'contact', color: '#4ec9b0', start: 74, span: 24 },
]

export function Hero({ siteSettings, profile, tools = [] }: HeroProps) {
    const { setCursorVariant } = useCursor()

    const roles: string[] = profile?.role
        ? profile.role.split('&').map((r: string) => r.trim()).filter(Boolean)
        : ['Developer', 'Video Editor', 'Motion Designer']
    const techStack: string[] = tools?.slice(0, 5).map((t) => t.name) ?? []
    const bio =
        siteSettings?.heroSubtitle ||
        profile?.shortBio ||
        'Code on one screen, composition on the other.'

    return (
        <section className="py-10 sm:py-14">
            <div className="flex gap-0 overflow-hidden rounded-lg border border-shell-border bg-shell-bg">
                {/* Explorer rail — real navigation, workspace identity */}
                <aside className="hidden w-52 shrink-0 flex-col border-r border-shell-border bg-shell-bg-alt lg:flex" aria-label="Explorer">
                    <div className="px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-shell-text-muted">
                        Explorer
                    </div>
                    <div className="px-2 py-1">
                        <div className="flex items-center gap-1.5 px-2 py-1 font-mono text-[11px] text-shell-text-muted">
                            <ChevronRight className="h-3 w-3" aria-hidden="true" />
                            <Folder className="h-3 w-3 text-syn-blue" aria-hidden="true" />
                            langley
                        </div>
                        <ul className="mt-0.5 space-y-0.5 pl-3">
                            {EXPLORER.map((file) => {
                                const Icon = file.icon
                                const body = (
                                    <>
                                        <Icon className={`h-3 w-3 shrink-0 ${file.tone}`} aria-hidden="true" />
                                        <span className="truncate">{file.label}</span>
                                    </>
                                )
                                return (
                                    <li key={file.label}>
                                        {file.active ? (
                                            <span className="flex items-center gap-2 rounded border-l-2 border-shell-accent bg-shell-active px-2 py-1 font-mono text-[11px] text-shell-text">
                                                {body}
                                            </span>
                                        ) : (
                                            <Link
                                                href={file.href}
                                                className="flex items-center gap-2 rounded px-2 py-1 font-mono text-[11px] text-shell-text-muted transition-colors hover:bg-shell-active/60 hover:text-shell-text"
                                            >
                                                {body}
                                            </Link>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </aside>

                {/* Editor + comp viewport */}
                <div className="flex min-w-0 flex-1 flex-col">
                    <div className="grid flex-1 lg:grid-cols-[1fr_1.05fr]">
                        {/* Code column */}
                        <div className="flex min-w-0 items-center px-6 py-10 sm:px-10 lg:py-14">
                            <div className="min-w-0">
                                <p className="font-mono text-[11px] text-syn-green">
                                    {'// developer × editor'}
                                </p>

                                <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tighter sm:text-5xl">
                                    <span className="block text-foreground">
                                        {siteSettings?.heroTitle || "Hi, I'm Langley"}
                                    </span>
                                    <span className="mt-1 block overflow-hidden pb-[0.12em] text-shell-text-muted">
                                        <RoleRotator roles={roles} interval={2800} />
                                    </span>
                                </h1>

                                <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                                    {bio}
                                </p>

                                {techStack.length > 0 && (
                                    <ul className="mt-6 flex flex-wrap gap-1.5">
                                        {techStack.map((tech) => (
                                            <li
                                                key={tech}
                                                className="rounded border border-shell-border px-2 py-1 font-mono text-[11px] text-shell-text-muted"
                                            >
                                                {tech}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
                                    <Link
                                        href="/projects"
                                        onMouseEnter={() => setCursorVariant('button')}
                                        onMouseLeave={() => setCursorVariant('default')}
                                        className="group inline-flex items-center justify-center gap-2 rounded-md bg-ae-purple px-6 py-3 text-sm font-semibold text-[#0b0b14] transition-colors hover:bg-ae-cyan"
                                    >
                                        View my work
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                                    </Link>
                                    <Link
                                        href="/shop"
                                        onMouseEnter={() => setCursorVariant('button')}
                                        onMouseLeave={() => setCursorVariant('default')}
                                        className="inline-flex items-center justify-center gap-2 rounded-md border border-shell-border px-6 py-3 text-sm font-semibold text-shell-text transition-colors hover:border-shell-accent/50"
                                    >
                                        <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                                        Visit shop
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Composition viewport — 3D centerpiece */}
                        <div className="relative min-w-0 border-t border-shell-border bg-[#07070c] lg:border-l lg:border-t-0">
                            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-shell-border bg-shell-bg/90 px-3 py-1.5 font-mono text-[10px] text-shell-text-muted">
                                <span className="text-syn-orange">Composition</span>
                                <span>hero.aep</span>
                            </div>
                            <div className="h-[300px] sm:h-[380px] lg:h-full lg:min-h-[420px]">
                                <WorkspaceCanvas className="h-full w-full" />
                            </div>
                        </div>
                    </div>

                    {/* Timeline strip — the AE signature */}
                    <div className="border-t border-shell-border bg-shell-bg-alt px-4 py-3 sm:px-6">
                        <div className="flex items-center justify-between pb-1.5 font-mono text-[10px] text-shell-text-muted">
                            <span>Timeline</span>
                            <span className="tabular-nums opacity-70">00:00:00:00</span>
                        </div>
                        <ul className="space-y-1">
                            {TIMELINE.map((row) => (
                                <li key={row.name} className="flex items-center gap-2">
                                    <span className="w-16 shrink-0 truncate font-mono text-[10px] text-shell-text-muted">
                                        {row.name}
                                    </span>
                                    <span className="relative h-2 flex-1 rounded-sm bg-shell-bg">
                                        <span
                                            className="absolute inset-y-0 rounded-sm opacity-80"
                                            style={{ backgroundColor: row.color, left: `${row.start}%`, width: `${row.span}%` }}
                                        />
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
