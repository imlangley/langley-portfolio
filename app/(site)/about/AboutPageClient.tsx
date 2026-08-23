'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import {
    ChevronDown,
    Download,
    TerminalSquare,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { Reveal } from '@/components/motion/Reveal'
import { RouteCanvas } from '@/components/three/RouteCanvas'
import { CanvasErrorBoundary } from '@/components/three/CanvasErrorBoundary'

interface Tool {
    _id: string
    name: string
    iconUrl: string | null
}

interface FaqItem {
    question: string
    answer: unknown
}

interface AboutPageClientProps {
    displayName: string
    displayRole: string
    avatarUrl: string | null
    shortBio?: string
    longBio?: unknown
    faqItems?: FaqItem[]
    tools?: Tool[]
    projectsCount: number
    yearsExperience: number
}

export function AboutPageClient({
    displayName,
    displayRole,
    avatarUrl,
    shortBio,
    longBio,
    faqItems,
    projectsCount,
    yearsExperience,
}: AboutPageClientProps) {
    const [openFaq, setOpenFaq] = useState<string | null>(null)

    const stats = [
        { label: 'projects', value: `${projectsCount}+` },
        { label: 'years', value: `${yearsExperience}+` },
        { label: 'joined', value: '2020' },
        { label: 'tz', value: 'GMT+7' },
    ]

    return (
        <section className="py-12 sm:py-16">
            <div>
                <div className="flex min-w-0 flex-1 flex-col">
                    <div className="grid flex-1 gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
                        <motion.div
                            initial={{ opacity: 0, x: -32 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="relative mx-auto aspect-square max-w-[220px] overflow-hidden rounded-md border border-shell-border bg-shell-bg-alt lg:max-w-none">
                                {avatarUrl ? (
                                    <Image
                                        src={avatarUrl}
                                        alt={displayName}
                                        fill
                                        className="object-cover"
                                        sizes="280px"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center font-mono text-6xl text-shell-text-muted/30">
                                        {displayName[0]}
                                    </div>
                                )}
                            </div>
                            <h1 className="mt-4 text-2xl font-black tracking-tight text-shell-text">
                                {displayName}
                            </h1>
                            <p className="mt-1 font-mono text-[12px] text-ae-cyan">{displayRole}</p>
                            {shortBio && (
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{shortBio}</p>
                            )}
                            <dl className="mt-5 grid grid-cols-2 gap-2">
                                {stats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="rounded-md border border-shell-border bg-shell-bg-alt px-3 py-2"
                                    >
                                        <dt className="font-mono text-[10px] uppercase tracking-wider text-shell-text-muted">
                                            {stat.label}
                                        </dt>
                                        <dd className="mt-0.5 text-lg font-bold text-shell-text">{stat.value}</dd>
                                    </div>
                                ))}
                            </dl>
                            <div className="mt-4 flex flex-col gap-2">
                                <Link
                                    href="/uptime"
                                    className="inline-flex items-center justify-center rounded-md bg-ae-purple px-4 py-2.5 text-sm font-semibold text-[#0b0b14] transition-colors hover:bg-ae-cyan"
                                >
                                    Open status.log
                                </Link>
                                <a
                                    href="/resume.pdf"
                                    download
                                    className="inline-flex items-center justify-center gap-2 rounded-md border border-shell-border bg-shell-bg-alt px-4 py-2.5 text-sm font-semibold text-shell-text transition-colors hover:border-shell-accent/50"
                                >
                                    <Download className="h-4 w-4" aria-hidden="true" />
                                    Download CV
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 32 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                            className="flex min-h-[420px] flex-col overflow-hidden rounded-lg border border-shell-border"
                        >
                            <div className="flex items-center gap-4 border-b border-shell-border bg-shell-bg px-4 font-mono text-[11px]">
                                <span className="flex h-9 items-center gap-2 border-b-2 border-shell-accent px-1 text-shell-text">
                                    <TerminalSquare className="h-3.5 w-3.5" aria-hidden="true" />
                                    Terminal
                                </span>
                            </div>
                            <div className="flex-1 space-y-6 overflow-y-auto p-5 font-mono text-sm text-shell-text sm:p-6">
                                <div>
                                    <p className="mb-2 text-ae-purple">
                                        <span className="text-syn-green">➜</span>{' '}
                                        <span className="text-syn-yellow">~</span> cat bio.txt
                                    </p>
                                    <div className="border-l-2 border-shell-border pl-4 text-[13px] leading-relaxed text-muted-foreground">
                                        {longBio ? (
                                            <PortableText value={longBio as never} />
                                        ) : (
                                            <p>Loading editor profile configuration…</p>
                                        )}
                                    </div>
                                </div>
                                <p className="text-ae-purple">
                                    <span className="text-syn-green">➜</span>{' '}
                                    <span className="text-syn-yellow">~</span>{' '}
                                    <span className="inline-block h-4 w-2 bg-shell-text blink align-middle" />
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="relative mt-10 overflow-hidden rounded-lg border border-shell-border bg-[#07070c]">
                            <CanvasErrorBoundary>
                            <RouteCanvas variant="distort" className="h-[190px] w-full sm:h-[230px]" accent="#00c8ff" />
                        </CanvasErrorBoundary>
                            <span className="pointer-events-none absolute left-3 top-2 font-mono text-[10px] uppercase tracking-[0.16em] text-shell-text-muted/70">
                                viewport · profile.blend
                            </span>
                        </div>

                        {faqItems && faqItems.length > 0 && (
                        <div className="mt-10">
                            <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-shell-text-muted">
                                FAQ
                            </h2>
                            <ul className="space-y-2">
                                {faqItems.map((item, index) => {
                                    const id = `faq-${index}`
                                    const open = openFaq === id
                                    return (
                                        <Reveal key={id} delay={index * 0.06} y={14}>
                                        <li className="rounded-md border border-shell-border bg-shell-bg-alt">
                                            <button
                                                type="button"
                                                aria-expanded={open}
                                                onClick={() => setOpenFaq(open ? null : id)}
                                                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-shell-text"
                                            >
                                                {item.question}
                                                <ChevronDown
                                                    className={cn(
                                                        'h-4 w-4 shrink-0 text-shell-text-muted transition-transform',
                                                        open && 'rotate-180'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </button>
                                            {open && (
                                                <div className="border-t border-shell-border px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                                                    <PortableText value={item.answer as never} />
                                                </div>
                                            )}
                                        </li>
                                        </Reveal>
                                    )
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
