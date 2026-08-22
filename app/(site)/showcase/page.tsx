'use client'

import { useState } from 'react'
import { FileCode2 } from 'lucide-react'
import {
    SplitText,
    DecryptedText,
    GlitchText,
    RotatingText,
    AnimatedCounter,
} from '@/components/reactbits'
import { cn } from '@/lib/utils'

const DEMOS = [
    { id: 'split-text', file: 'SplitText.tsx', note: 'character reveal' },
    { id: 'decrypted-text', file: 'DecryptedText.tsx', note: 'decode pass' },
    { id: 'glitch-text', file: 'GlitchText.tsx', note: 'signal noise' },
    { id: 'rotating-text', file: 'RotatingText.tsx', note: 'role cycle' },
    { id: 'counter', file: 'AnimatedCounter.tsx', note: 'value tween' },
] as const

type DemoId = (typeof DEMOS)[number]['id']

export default function ShowcasePage() {
    const [active, setActive] = useState<DemoId>('split-text')

    return (
        <section className="w-full border-b border-shell-border bg-shell-bg-alt">
            <div className="flex flex-col py-12 sm:py-16">
                <aside
                    className="hidden w-56 shrink-0 flex-col border-r border-shell-border bg-shell-bg lg:flex"
                    aria-label="Animation files"
                >
                    <div className="border-b border-shell-border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-shell-text-muted">
                        Explorer
                    </div>
                    <ul className="space-y-0.5 p-2">
                        {DEMOS.map((demo) => (
                            <li key={demo.id}>
                                <button
                                    type="button"
                                    onClick={() => setActive(demo.id)}
                                    aria-pressed={active === demo.id}
                                    className={cn(
                                        'flex w-full items-center gap-2 rounded px-2 py-1 text-left font-mono text-[11px] transition-colors',
                                        active === demo.id
                                            ? 'border-l-2 border-shell-accent bg-shell-active text-shell-text'
                                            : 'text-shell-text-muted hover:bg-shell-active/60 hover:text-shell-text'
                                    )}
                                >
                                    <FileCode2 className="h-3 w-3 shrink-0 text-syn-yellow" aria-hidden="true" />
                                    {demo.file}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                <div className="flex min-w-0 flex-1 flex-col">
                    <div
                        className="flex gap-1 overflow-x-auto border-b border-shell-border bg-shell-bg px-3 py-2 scrollbar-hide lg:hidden"
                        role="group"
                        aria-label="Select animation"
                    >
                        {DEMOS.map((demo) => (
                            <button
                                key={demo.id}
                                type="button"
                                onClick={() => setActive(demo.id)}
                                aria-pressed={active === demo.id}
                                className={cn(
                                    'shrink-0 rounded border px-2.5 py-1 font-mono text-[11px]',
                                    active === demo.id
                                        ? 'border-shell-accent/60 bg-shell-active text-shell-text'
                                        : 'border-shell-border text-shell-text-muted'
                                )}
                            >
                                {demo.file.replace('.tsx', '')}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16">
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-shell-text-muted">
                            {DEMOS.find((d) => d.id === active)?.note}
                        </p>
                        <div className="min-h-[80px] text-center text-3xl font-black tracking-tight text-shell-text sm:text-5xl">
                            {active === 'split-text' && (
                                <SplitText text="Hello World" className="text-3xl font-black sm:text-5xl" delay={50} />
                            )}
                            {active === 'decrypted-text' && (
                                <DecryptedText text="DECRYPT ME" className="font-mono text-3xl sm:text-5xl" />
                            )}
                            {active === 'glitch-text' && (
                                <GlitchText text="GLITCH" className="text-3xl font-black sm:text-5xl" />
                            )}
                            {active === 'rotating-text' && (
                                <RotatingText
                                    texts={['Editor', 'Developer', 'Compositor']}
                                    className="text-3xl font-black text-ae-cyan sm:text-5xl"
                                />
                            )}
                            {active === 'counter' && (
                                <AnimatedCounter value={2026} duration={2} className="text-5xl font-black text-ae-purple" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
