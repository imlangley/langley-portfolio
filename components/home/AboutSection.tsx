'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, FileText, Folder, Settings2 } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import type { Profile, Tool } from '@/sanity/lib/fetch'
import { useCursor } from '@/context/CursorContext'

interface AboutSectionProps {
    profile: Profile | null
    tools: Tool[]
}

export function AboutSection({ profile, tools }: AboutSectionProps) {
    const { setCursorVariant } = useCursor()

    if (!profile) return null

    const skills =
        tools.length > 0
            ? tools.slice(0, 6).map((t) => t.name)
            : ['After Effects', 'VS Code', 'Motion', 'Web']

    return (
        <section className="border-b border-shell-border bg-shell-bg-alt">
            <div className="flex flex-col lg:flex-row">
                <aside className="hidden lg:flex w-56 shrink-0 flex-col border-r border-shell-border bg-shell-bg">
                    <div className="border-b border-shell-border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-shell-text-muted">
                        Inspector
                    </div>
                    <div className="px-3 py-3 font-mono text-[11px] text-shell-text-muted">
                        <div className="flex items-center gap-1.5 px-1 py-1">
                            <Folder className="h-3 w-3 text-syn-blue" aria-hidden="true" />
                            about
                        </div>
                        <p className="mt-3 px-1 text-[10px] uppercase tracking-wider">Loaded</p>
                        <ul className="mt-1 space-y-1">
                            {skills.map((skill) => (
                                <li
                                    key={skill}
                                    className="rounded border border-shell-border bg-shell-bg-alt px-2 py-1 text-shell-text"
                                >
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <div className="min-w-0 flex-1">
                    <div className="grid gap-0 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
                        <div className="border-b border-shell-border bg-shell-bg p-4 md:border-b-0 md:border-r">
                            <div className="relative aspect-square overflow-hidden rounded-md border border-shell-border bg-shell-bg-alt">
                                {profile.avatarImage?.asset ? (
                                    <Image
                                        src={urlFor(profile.avatarImage).width(500).height(500).url()}
                                        alt={profile.name || 'Profile'}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center font-mono text-6xl text-shell-text-muted/30">
                                        {profile.name?.charAt(0) || 'L'}
                                    </div>
                                )}
                            </div>
                            <p className="mt-3 font-mono text-[11px] text-ae-cyan">
                                {profile.role || 'Developer / Editor'}
                            </p>
                        </div>

                        <div className="space-y-5 p-5 sm:p-8">
                            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-shell-text-muted">
                                <Settings2 className="h-3 w-3" aria-hidden="true" />
                                Layer 01 · Profile
                            </div>
                            <h2 className="text-3xl font-black tracking-tight text-shell-text sm:text-4xl">
                                {profile.name || 'Langley'}
                            </h2>
                            <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                                {profile.shortBio ||
                                    'A creator working at the intersection of video editing and web development.'}
                            </p>
                            <ul className="flex flex-wrap gap-1.5 md:hidden">
                                {skills.map((skill) => (
                                    <li
                                        key={skill}
                                        className="rounded border border-shell-border bg-shell-bg px-2 py-1 font-mono text-[11px] text-shell-text-muted"
                                    >
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/about"
                                onMouseEnter={() => setCursorVariant('button')}
                                onMouseLeave={() => setCursorVariant('default')}
                                className="inline-flex items-center gap-2 rounded-md border border-shell-border bg-shell-bg px-5 py-2.5 text-sm font-semibold text-shell-text transition-colors hover:border-shell-accent/50"
                            >
                                Open properties
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
