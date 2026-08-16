'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
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
    { name: 'hero', color: '#9999ff', start: 0, span: 34, keys: [0, 12, 34] },
    { name: 'projects', color: '#00c8ff', start: 30, span: 30, keys: [30, 44, 60] },
    { name: 'about', color: '#c586c0', start: 56, span: 22, keys: [56, 67, 78] },
    { name: 'contact', color: '#4ec9b0', start: 74, span: 24, keys: [74, 86, 98] },
]

/** Static, hand-tinted snippet — reads like the real file being edited. */
const CODE_SNIPPET: Array<Array<[string, string]>> = [
    [
        ['const', 'syn-magenta'],
        [' studio', 'syn-teal'],
        [' = ', 'foreground'],
        ['{', 'foreground'],
    ],
    [
        ['  editor', 'syn-blue'],
        [': ', 'foreground'],
        ["'after-effects'", 'syn-orange'],
        [',', 'foreground'],
    ],
    [
        ['  stack', 'syn-blue'],
        [': ', 'foreground'],
        ["'next · three'", 'syn-orange'],
        [',', 'foreground'],
    ],
    [
        ['  mode', 'syn-blue'],
        [': ', 'foreground'],
        ["'collab'", 'syn-orange'],
        [',', 'foreground'],
    ],
    [['}', 'foreground']],
]

function Timecode({ reducedMotion }: { reducedMotion: boolean }) {
    const [frame, setFrame] = useState(0)

    useEffect(() => {
        if (reducedMotion) return
        const id = setInterval(() => setFrame((f) => (f + 1) % 2400), 1000 / 24)
        return () => clearInterval(id)
    }, [reducedMotion])

    const seconds = Math.floor(frame / 24)
    const display = `00:00:${String(seconds).padStart(2, '0')}:${String(frame % 24).padStart(2, '0')}`

    return (
        <span className="tabular-nums text-shell-text" style={{ color: '#d7ba7d' }}>
            {display}
        </span>
    )
}

export function Hero({ siteSettings, profile, tools = [] }: HeroProps) {
    const { setCursorVariant } = useCursor()
    const reducedMotion = useReducedMotion() ?? false

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
            <div className="flex flex-col lg:flex-row lg:min-h-[calc(100svh-6.25rem)]">
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

                    {/* Render queue — AE detail */}
                    <div className="mt-auto border-t border-shell-border px-2 py-2 font-mono text-[10px] text-shell-text-muted">
                        <p className="px-2 py-1 uppercase tracking-[0.16em]">Render queue</p>
                        <div className="space-y-1 px-2">
                            <div className="flex items-center justify-between">
                                <span>portfolio.aep</span>
                                <span style={{ color: '#4ec9b0' }}>done</span>
                            </div>
                            <div className="h-1 rounded-sm bg-shell-bg-alt">
                                <motion.div
                                    className="h-full rounded-sm bg-ae-cyan"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '100%' }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                                />
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Editor pane */}
                <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex flex-1 flex-col lg:flex-row">
                        {/* Code column */}
                        <div className="flex min-w-0 flex-1 items-center px-4 py-10 sm:px-8 lg:py-12 xl:px-12">
                            <div className="flex w-full gap-3 sm:gap-5">
                                <div
                                    aria-hidden="true"
                                    className="hidden sm:flex shrink-0 flex-col items-end pt-1 font-mono text-[11px] leading-[2.05] text-shell-text-muted/35 select-none"
                                >
                                    {CODE_SNIPPET.map((_, i) => (
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

                                    {/* Dense, tinted snippet — the file being edited */}
                                    <div className="mt-6 max-w-md rounded-md border border-shell-border bg-shell-bg px-3 py-2.5 font-mono text-[11px] leading-[1.9] overflow-x-auto">
                                        {CODE_SNIPPET.map((line, i) => (
                                            <div key={i} className="whitespace-pre">
                                                {line.map(([text, tone], j) => (
                                                    <span key={j} className={tone}>
                                                        {text}
                                                    </span>
                                                ))}
                                            </div>
                                        ))}
                                    </div>

                                    {techStack.length > 0 && (
                                        <ul className="mt-5 flex flex-wrap gap-1.5">
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
                        <div className="flex w-full shrink-0 flex-col border-t border-shell-border lg:w-[52%] lg:border-l lg:border-t-0 xl:w-[54%]">
                            <div className="flex items-center justify-between border-b border-shell-border bg-shell-bg px-3 py-1.5 font-mono text-[10px] text-shell-text-muted">
                                <span className="text-syn-orange">Composition</span>
                                <span>hero.aep</span>
                                <span className="hidden sm:flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-sm bg-ae-cyan" aria-hidden="true" />
                                    1920×1080 · 24fps
                                </span>
                            </div>
                            <div className="relative flex-1 min-h-[300px] sm:min-h-[380px] lg:min-h-0 bg-[#07070c]">
                                <WorkspaceCanvas className="absolute inset-0 h-full w-full" />
                                {/* Safe-margin guides — AE viewport detail */}
                                <div aria-hidden="true" className="pointer-events-none absolute inset-[5%] border border-white/[0.06]" />
                                <div aria-hidden="true" className="pointer-events-none absolute inset-x-[8%] top-1/2 h-px bg-white/[0.04]" />
                                <div aria-hidden="true" className="pointer-events-none absolute inset-y-[8%] left-1/2 w-px bg-white/[0.04]" />
                            </div>
                        </div>
                    </div>

                    {/* Timeline dock */}
                    <div className="relative border-t border-shell-border bg-shell-bg">
                        <div className="flex items-center justify-between px-3 py-1.5 font-mono text-[10px] text-shell-text-muted border-b border-shell-border">
                            <span className="flex items-center gap-2">
                                Timeline
                                <Timecode reducedMotion={reducedMotion} />
                            </span>
                            <span className="hidden sm:inline">{TIMELINE_ROWS.length} layers</span>
                        </div>
                        <ul className="divide-y divide-shell-border/60">
                            {TIMELINE_ROWS.map((row) => (
                                <li key={row.name} className="relative flex items-center gap-2 px-3 py-1.5">
                                    <span className="w-20 shrink-0 truncate font-mono text-[10px] text-shell-text-muted">
                                        {row.name}
                                    </span>
                                    <span className="relative h-2.5 flex-1 rounded-sm bg-shell-bg-alt">
                                        <motion.span
                                            className="absolute inset-y-0 rounded-sm"
                                            style={{ backgroundColor: row.color, left: `${row.start}%` }}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${row.span}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                        />
                                        {/* Keyframe diamonds */}
                                        {row.keys.map((k) => (
                                            <span
                                                key={k}
                                                aria-hidden="true"
                                                className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rotate-45 bg-white/85"
                                                style={{ left: `calc(${k}% - 3px)` }}
                                            />
                                        ))}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        {/* Playhead sweep — spans only the bars region */}
                        {!reducedMotion && (
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-y-0 overflow-hidden"
                                style={{ left: 'calc(0.75rem + 5rem + 0.5rem)', right: '0.75rem' }}
                            >
                                <motion.div
                                    className="absolute top-0 bottom-0 w-px bg-ae-magenta/70"
                                    animate={{ left: ['0%', '100%'] }}
                                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
