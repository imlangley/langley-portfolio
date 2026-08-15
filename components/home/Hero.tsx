'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, ShoppingBag, FileCode2, Film, Folder, ChevronRight } from 'lucide-react'
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
    { label: 'hero.tsx', kind: 'code' as const, active: true },
    { label: 'projects.tsx', kind: 'code' as const, href: '/projects' },
    { label: 'about.md', kind: 'doc' as const, href: '/about' },
    { label: 'shop.tsx', kind: 'code' as const, href: '/shop' },
    { label: 'status.log', kind: 'doc' as const, href: '/uptime' },
]

const TIMELINE_ROWS = [
    { name: 'hero', color: '#9999ff', start: 0, span: 34 },
    { name: 'projects', color: '#00c8ff', start: 30, span: 30 },
    { name: 'about', color: '#c586c0', start: 56, span: 22 },
    { name: 'contact', color: '#4ec9b0', start: 74, span: 24 },
]

export function Hero({ siteSettings, profile, tools = [] }: HeroProps) {
    const { setCursorVariant } = useCursor()
    const [hoverRow, setHoverRow] = useState<string | null>(null)

    const roles: string[] = profile?.role
        ? profile.role.split('&').map((r: string) => r.trim()).filter(Boolean)
        : ['Developer', 'Video Editor', 'Motion Designer']
    const techStack: string[] = tools?.slice(0, 6).map((t) => t.name) ?? []
    const bio =
        siteSettings?.heroSubtitle ||
        profile?.shortBio ||
        'Code on one screen, composition on the other.'

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="relative w-full border-b border-shell-border bg-shell-bg-alt">
            <div className="flex min-h-[calc(100svh-2.75rem)] flex-col lg:flex-row">
                {/* Explorer rail */}
                <aside
                    className="hidden lg:flex w-56 shrink-0 flex-col border-r border-shell-border bg-shell-bg"
                    aria-label="Project explorer"
                >
                    <div className="flex items-center gap-2 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-shell-text-muted border-b border-shell-border">
                        Explorer
                    </div>
                    <div className="px-2 py-2">
                        <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono text-shell-text-muted">
                            <ChevronRight className="w-3 h-3" aria-hidden="true" />
                            <Folder className="w-3 h-3 text-syn-blue" aria-hidden="true" />
                            langley
                        </div>
                        <ul className="mt-0.5 space-y-0.5 pl-3">
                            {EXPLORER.map((file) => {
                                const Icon = file.kind === 'code' ? FileCode2 : Film
                                const body = (
                                    <>
                                        <Icon
                                            className={`w-3 h-3 ${file.kind === 'code' ? 'text-syn-yellow' : 'text-syn-magenta'}`}
                                            aria-hidden="true"
                                        />
                                        {file.label}
                                    </>
                                )
                                return (
                                    <li key={file.label}>
                                        {file.active ? (
                                            <span className="flex items-center gap-2 rounded px-2 py-1 text-[11px] font-mono bg-shell-active text-shell-text border-l-2 border-shell-accent">
                                                {body}
                                            </span>
                                        ) : (
                                            <Link
                                                href={file.href ?? '/'}
                                                className="flex items-center gap-2 rounded px-2 py-1 text-[11px] font-mono text-shell-text-muted hover:bg-shell-active/60 hover:text-shell-text transition-colors"
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

                {/* Editor pane */}
                <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-stretch border-b border-shell-border bg-shell-bg text-[11px] font-mono">
                        <span className="flex items-center gap-2 border-r border-shell-border bg-shell-bg-alt px-4 py-2 text-shell-text">
                            <FileCode2 className="w-3 h-3 text-syn-yellow" aria-hidden="true" />
                            hero.tsx
                            <span className="ml-1 h-1.5 w-1.5 rounded-full bg-shell-accent" aria-hidden="true" />
                        </span>
                        <span className="hidden sm:flex items-center gap-2 border-r border-shell-border px-4 py-2 text-shell-text-muted">
                            <Film className="w-3 h-3 text-syn-magenta" aria-hidden="true" />
                            hero.aep
                        </span>
                    </div>

                    <div className="flex flex-1 flex-col lg:flex-row">
                        {/* Code column */}
                        <div className="flex min-w-0 flex-1 items-center px-4 py-8 sm:px-8 sm:py-10 lg:py-12">
                            <div className="flex w-full gap-3 sm:gap-5">
                                <div
                                    aria-hidden="true"
                                    className="hidden sm:flex shrink-0 flex-col items-end pt-1 font-mono text-[11px] leading-[2.1] text-shell-text-muted/35 select-none"
                                >
                                    {Array.from({ length: 9 }).map((_, i) => (
                                        <span key={i}>{i + 1}</span>
                                    ))}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="font-mono text-[11px] sm:text-xs text-syn-green mb-3">
                                        {'// portfolio — developer & editor'}
                                    </p>

                                    <h1 className="text-[1.9rem] leading-[1.06] sm:text-4xl md:text-5xl xl:text-6xl font-black tracking-tighter">
                                        <span className="block text-foreground">
                                            {siteSettings?.heroTitle || "Hi, I'm Langley"}
                                        </span>
                                        <span className="mt-1 block overflow-hidden pb-[0.12em] sm:mt-2">
                                            <RoleRotator roles={roles} interval={2800} />
                                        </span>
                                    </h1>

                                    <p className="mt-4 max-w-lg text-[15px] sm:text-base text-muted-foreground leading-relaxed">
                                        {bio}
                                    </p>

                                    {techStack.length > 0 && (
                                        <ul className="mt-6 flex flex-wrap gap-1.5">
                                            {techStack.map((tech) => (
                                                <li
                                                    key={tech}
                                                    className="rounded border border-shell-border bg-shell-bg px-2 py-1 font-mono text-[10px] sm:text-[11px] text-shell-text-muted"
                                                >
                                                    {tech}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                                        <button
                                            type="button"
                                            onClick={scrollToProjects}
                                            onMouseEnter={() => setCursorVariant('button')}
                                            onMouseLeave={() => setCursorVariant('default')}
                                            className="group inline-flex items-center justify-center gap-2 rounded-md bg-ae-purple px-6 py-3 font-semibold text-[#0b0b14] transition-colors hover:bg-ae-cyan"
                                        >
                                            View My Work
                                            <ArrowRight
                                                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                                                aria-hidden="true"
                                            />
                                        </button>
                                        <Link
                                            href="/shop"
                                            onMouseEnter={() => setCursorVariant('button')}
                                            onMouseLeave={() => setCursorVariant('default')}
                                            className="inline-flex items-center justify-center gap-2 rounded-md border border-shell-border bg-shell-bg px-6 py-3 font-semibold text-shell-text transition-colors hover:border-shell-accent/50"
                                        >
                                            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                                            Visit Shop
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Composition viewport — 3D preview lives here */}
                        <div className="flex w-full shrink-0 flex-col border-t border-shell-border lg:w-[46%] lg:border-l lg:border-t-0 xl:w-[48%]">
                            <div className="flex items-center justify-between border-b border-shell-border bg-shell-bg px-3 py-1.5 font-mono text-[10px] text-shell-text-muted">
                                <span className="text-syn-orange">Composition</span>
                                <span>hero.aep</span>
                            </div>
                            <div className="relative flex-1 min-h-[240px] sm:min-h-[300px] bg-[#07070c]">
                                <WorkspaceCanvas className="absolute inset-0 h-full w-full" />
                            </div>
                        </div>
                    </div>

                    {/* Timeline dock */}
                    <div className="border-t border-shell-border bg-shell-bg">
                        <div className="flex items-center justify-between px-3 py-1.5 font-mono text-[10px] text-shell-text-muted border-b border-shell-border">
                            <span>Timeline</span>
                            <span className="hidden sm:inline">
                                {hoverRow ? `layer: ${hoverRow}` : `${TIMELINE_ROWS.length} layers`}
                            </span>
                        </div>
                        <ul className="divide-y divide-shell-border/60">
                            {TIMELINE_ROWS.map((row) => (
                                <li
                                    key={row.name}
                                    onMouseEnter={() => setHoverRow(row.name)}
                                    onMouseLeave={() => setHoverRow(null)}
                                    className="flex items-center gap-2 px-3 py-1"
                                >
                                    <span className="w-20 shrink-0 truncate font-mono text-[10px] text-shell-text-muted">
                                        {row.name}
                                    </span>
                                    <span className="relative h-2 flex-1 rounded-sm bg-shell-bg-alt">
                                        <motion.span
                                            className="absolute inset-y-0 rounded-sm"
                                            style={{ backgroundColor: row.color, left: `${row.start}%` }}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${row.span}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
