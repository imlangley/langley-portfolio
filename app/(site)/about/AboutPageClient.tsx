'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import {
    Calendar,
    ChevronDown,
    Clock,
    Download,
    Folder,
    Laptop,
    MapPin,
    TerminalSquare,
} from 'lucide-react'
import { cn } from '@/lib/utils'

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
    tools: Tool[]
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
    tools,
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
        <section className="w-full border-b border-shell-border bg-shell-bg-alt">
            <div className="flex min-h-[60svh] flex-col lg:flex-row">
                <aside
                    className="hidden w-56 shrink-0 flex-col border-r border-shell-border bg-shell-bg lg:flex"
                    aria-label="Profile inspector"
                >
                    <div className="border-b border-shell-border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-shell-text-muted">
                        Properties
                    </div>
                    <div className="space-y-4 px-3 py-3 font-mono text-[11px]">
                        <div className="flex items-center gap-1.5 text-shell-text-muted">
                            <Folder className="h-3 w-3 text-syn-blue" aria-hidden="true" />
                            profile
                        </div>
                        <dl className="space-y-2 text-shell-text-muted">
                            <div className="flex items-center justify-between gap-2">
                                <dt className="flex items-center gap-1.5">
                                    <MapPin className="h-3 w-3" aria-hidden="true" />
                                    Location
                                </dt>
                                <dd className="text-shell-text">Indonesia</dd>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <dt className="flex items-center gap-1.5">
                                    <Clock className="h-3 w-3" aria-hidden="true" />
                                    Timezone
                                </dt>
                                <dd className="text-shell-text">GMT+7</dd>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <dt className="flex items-center gap-1.5">
                                    <Calendar className="h-3 w-3" aria-hidden="true" />
                                    Joined
                                </dt>
                                <dd className="text-shell-text">2020</dd>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <dt className="flex items-center gap-1.5">
                                    <Laptop className="h-3 w-3" aria-hidden="true" />
                                    System
                                </dt>
                                <dd className="text-right text-shell-text">AE / VS Code</dd>
                            </div>
                        </dl>
                        <div>
                            <p className="mb-2 text-[10px] uppercase tracking-wider text-shell-text-muted">
                                Extensions
                            </p>
                            <ul className="flex flex-wrap gap-1.5">
                                {tools.map((tool) => (
                                    <li
                                        key={tool._id}
                                        title={tool.name}
                                        className="flex h-8 w-8 items-center justify-center overflow-hidden rounded border border-shell-border bg-shell-bg-alt"
                                    >
                                        {tool.iconUrl ? (
                                            <Image src={tool.iconUrl} alt="" width={16} height={16} />
                                        ) : (
                                            <span className="text-[10px] text-shell-text-muted">
                                                {tool.name[0]}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </aside>

                <div className="flex min-w-0 flex-1 flex-col">
                    <div className="grid flex-1 gap-0 lg:grid-cols-[280px_1fr]">
                        <div className="border-b border-shell-border bg-shell-bg p-5 lg:border-b-0 lg:border-r">
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
                        </div>

                        <div className="flex min-h-[420px] flex-col bg-shell-bg-alt">
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
                        </div>
                    </div>

                    {faqItems && faqItems.length > 0 && (
                        <div className="border-t border-shell-border bg-shell-bg px-4 py-6 sm:px-6">
                            <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-shell-text-muted">
                                FAQ
                            </h2>
                            <ul className="space-y-2">
                                {faqItems.map((item, index) => {
                                    const id = `faq-${index}`
                                    const open = openFaq === id
                                    return (
                                        <li key={id} className="rounded-md border border-shell-border bg-shell-bg-alt">
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
