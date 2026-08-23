'use client'

import Link from 'next/link'
import { FileWarning } from 'lucide-react'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <section className="flex min-h-[calc(100svh-2.75rem)] items-center justify-center border-b border-shell-border bg-shell-bg-alt px-4 py-16">
            <div className="w-full max-w-md space-y-6 rounded-md border border-shell-border bg-shell-bg p-6 text-center sm:p-8">
                <FileWarning className="mx-auto h-12 w-12 text-syn-yellow" aria-hidden="true" />
                <div className="space-y-2">
                    <h1 className="text-2xl font-black tracking-tight text-shell-text">Render failed</h1>
                    <p className="font-mono text-[12px] leading-relaxed text-muted-foreground">
                        {'// uncaught exception in this comp'}
                    </p>
                    <p className="font-mono text-[11px] text-shell-text-muted">
                        exit code 1 — the layer bailed out
                    </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                        type="button"
                        onClick={reset}
                        className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-ae-purple text-sm font-semibold text-[#0b0b14] transition-colors hover:bg-ae-cyan"
                    >
                        Retry
                    </button>
                    <Link
                        href="/"
                        className="inline-flex h-10 flex-1 items-center justify-center rounded-md border border-shell-border bg-shell-bg-alt text-sm font-semibold text-shell-text transition-colors hover:border-shell-accent/50"
                    >
                        Home
                    </Link>
                </div>
            </div>
        </section>
    )
}
