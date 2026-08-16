'use client'

import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { Tool } from '@/sanity/lib/fetch'
import { useCursor } from '@/context/CursorContext'

interface ToolsSectionProps {
    tools: Tool[]
}

export function ToolsSection({ tools }: ToolsSectionProps) {
    const { setCursorVariant } = useCursor()

    if (!tools.length) return null

    return (
        <section className="py-16 sm:py-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-shell-text-muted">
                Toolchain
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-shell-text sm:text-3xl">
                Tools I work with
            </h2>

            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {tools.map((tool) => {
                    const inner = (
                        <div className="flex h-full items-center gap-3 rounded-lg border border-shell-border px-3.5 py-3 transition-colors hover:border-shell-accent/50">
                            <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded border border-shell-border bg-shell-bg-alt">
                                {tool.icon?.asset ? (
                                    <Image
                                        src={urlFor(tool.icon).width(80).height(80).url()}
                                        alt=""
                                        fill
                                        className="object-contain p-1"
                                    />
                                ) : (
                                    <span className="flex h-full items-center justify-center font-mono text-[11px] text-shell-text-muted">
                                        {tool.name.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <span className="truncate text-sm text-shell-text">{tool.name}</span>
                        </div>
                    )

                    return (
                        <li key={tool._id}>
                            {tool.url ? (
                                <a
                                    href={tool.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={() => setCursorVariant('button')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                >
                                    {inner}
                                </a>
                            ) : (
                                inner
                            )}
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default ToolsSection
