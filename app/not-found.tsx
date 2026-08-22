import Link from 'next/link'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
    return (
        <section className="flex min-h-[calc(100svh-2.75rem)] items-center justify-center border-b border-shell-border bg-shell-bg-alt px-4 py-16">
            <div className="w-full max-w-md overflow-hidden rounded-md border border-shell-border bg-shell-bg">
                <div className="flex items-center gap-1.5 border-b border-shell-border px-3 py-1.5 font-mono text-[10px] text-shell-text-muted">
                    <FileQuestion className="h-3 w-3 shrink-0 text-syn-magenta" aria-hidden="true" />
                    <span className="truncate">404.tsx</span>
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-shell-accent" aria-hidden="true" />
                </div>

                <div className="p-6 font-mono text-sm sm:p-8">
                    <p className="text-syn-green">{'// route not found in workspace'}</p>
                    <p className="mt-4 flex gap-2">
                        <span className="text-syn-green">➜</span>
                        <span className="text-syn-yellow">~</span>
                        <span className="text-shell-text-muted">
                            open <span className="text-ae-pink underline decoration-dotted">this-page</span>
                        </span>
                    </p>
                    <pre className="mt-3 border-l-2 border-shell-border pl-4 text-[13px] leading-relaxed text-muted-foreground">{`Error: ENOENT
    at resolve (router.ts)
    code: 'FILE_NOT_FOUND',
    statusCode: 404`}</pre>
                    <p className="mt-6 text-ae-purple">
                        <span className="text-syn-green">➜</span>{' '}
                        <span className="text-syn-yellow">~</span>{' '}
                        <span className="inline-block h-4 w-2 bg-shell-text blink align-middle" />
                    </p>
                </div>

                <div className="flex gap-2 border-t border-shell-border p-4">
                    <Link
                        href="/"
                        className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-ae-purple text-sm font-semibold text-[#0b0b14] transition-colors hover:bg-ae-cyan"
                    >
                        Back to home
                    </Link>
                    <Link
                        href="/projects"
                        className="inline-flex h-10 flex-1 items-center justify-center rounded-md border border-shell-border bg-shell-bg-alt text-sm font-semibold text-shell-text transition-colors hover:border-shell-accent/50"
                    >
                        Open projects
                    </Link>
                </div>
            </div>
        </section>
    )
}
