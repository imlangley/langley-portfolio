'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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
        <section className="border-b border-shell-border py-16 sm:py-24">
            <div className="grid items-center gap-10 md:grid-cols-[240px_1fr]">
                <div className="relative aspect-square w-full max-w-[240px] overflow-hidden rounded-lg border border-shell-border bg-shell-bg-alt">
                    {profile.avatarImage?.asset ? (
                        <Image
                            src={urlFor(profile.avatarImage).width(480).height(480).url()}
                            alt={profile.name || 'Profile'}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center font-mono text-5xl text-shell-text-muted/30">
                            {profile.name?.charAt(0) || 'L'}
                        </div>
                    )}
                </div>

                <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-shell-text-muted">
                        About
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-shell-text sm:text-3xl">
                        {profile.name || 'Langley'}
                    </h2>
                    <p className="mt-1 font-mono text-xs text-ae-cyan">
                        {profile.role || 'Developer / Editor'}
                    </p>
                    <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                        {profile.shortBio ||
                            'A creator working at the intersection of video editing and web development.'}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-1.5">
                        {skills.map((skill) => (
                            <li
                                key={skill}
                                className="rounded border border-shell-border px-2 py-1 font-mono text-[11px] text-shell-text-muted"
                            >
                                {skill}
                            </li>
                        ))}
                    </ul>

                    <Link
                        href="/about"
                        onMouseEnter={() => setCursorVariant('button')}
                        onMouseLeave={() => setCursorVariant('default')}
                        className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-shell-text-muted transition-colors hover:text-shell-text"
                    >
                        More about me
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
