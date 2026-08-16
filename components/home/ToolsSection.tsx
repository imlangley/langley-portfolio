'use client'

import Image from 'next/image'
import { Puzzle } from 'lucide-react'
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
        <section className="border-b border-shell-border bg-shell-bg">
            <div className="px-4 py-8 sm:px-6 sm:py-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-shell-text-muted">
                    Layer 03 · Toolchain
                </p>
                <h2 className="mt-1 text-3xl font-black tracking-tight text-shell-text sm:text-4xl">
                    Extensions
                </h2>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                    Editor and compositor stack used to cut, compile, and ship.
                </p>

                <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                    {tools.map((tool) => {
                        const inner = (
                            <div className="flex h-full items-center gap-3 rounded-md border border-shell-border bg-shell-bg-alt px-3 py-2.5 transition-colors hover:border-shell-accent/50">
                                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded border border-shell-border bg-shell-bg">
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
                                <span className="truncate text-[13px] font-medium text-shell-text">{tool.name}</span>
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
            </div>
        </section>
    )
}

export default ToolsSection
