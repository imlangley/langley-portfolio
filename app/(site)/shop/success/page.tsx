
import Link from 'next/link'
import * as cheerio from 'cheerio'
import { CheckCircle2, Download, ArrowLeft } from 'lucide-react'

interface PageProps {
    searchParams: Promise<{
        url?: string;
        cookie?: string;
        transaction_status?: string;
        status_code?: string;
    }>
}

async function getSuccessData(targetUrl: string, cookie?: string): Promise<{ accessUrl: string; accessText: string } | null> {
    if (!targetUrl) return null

    try {
        const headers: HeadersInit = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }

        if (cookie) {
            headers['Cookie'] = cookie
        }

        const res = await fetch(targetUrl, {
            headers,
            next: { revalidate: 0 } // Don't cache success results
        })

        const html = await res.text()
        const $ = cheerio.load(html)

        let accessUrl = ''
        let accessText = 'Access Content'

        // 1. Try finding the specific button with "Access" text
        $('button').each((i, el) => {
            const text = $(el).text().trim()
            const onclick = $(el).attr('onclick')

            if (onclick && (text.includes('Access') || text.includes('Akses') || text.includes('Download'))) {
                // Extract URL from location.href=`URL`, location.href='URL', or location.href="URL"
                const match = onclick.match(/location\.href\s*=\s*[`"']([^`"']+)["'`]/);
                if (match && match[1]) {
                    accessUrl = match[1]
                    accessText = text
                }
            }
        })

        // 2. Fallback: Try known anchor tags (old method)
        if (!accessUrl) {
            $('a').each((i, el) => {
                const text = $(el).text().trim().toLowerCase()
                const href = $(el).attr('href')
                if (href && (text === 'access' || text === 'akses' || text === 'download' || text.includes('contact'))) {
                    // Filter out contact links if they are just mailto/whatsapp
                    if (!href.includes('whatsapp') && !href.includes('mailto')) {
                        accessUrl = href
                        accessText = $(el).text().trim()
                    }
                }
            })
        }

        // 3. Fallback: Check for specific success wrapper class
        if (!accessUrl) {
            const btn = $('.btn-success').first()
            if (btn.length > 0 && btn.attr('href')) {
                accessUrl = btn.attr('href') || ''
            }
        }

        return {
            accessUrl,
            accessText
        }

    } catch (error) {
        console.error('Error fetching success page:', error)
        return null
    }
}

// ... Re-implementing component ...

export default async function SuccessPage({ searchParams }: PageProps) {
    const { url, cookie, transaction_status } = await searchParams

    // Check if this is a callback from Payment Provider
    const isPending = transaction_status === 'pending'

    // If it's a direct success scrape (old flow)
    const successData = url ? await getSuccessData(url, cookie) : null

    return (
        <section className="flex min-h-[60svh] items-center justify-center py-16">
            <div className="w-full max-w-md space-y-6 rounded-md border border-shell-border bg-shell-bg p-6 text-center sm:p-8">
                <CheckCircle2
                    className={`mx-auto h-14 w-14 ${isPending ? 'text-syn-yellow' : 'text-syn-green'}`}
                    aria-hidden="true"
                />
                <div className="space-y-2">
                    <h1 className="text-3xl font-black tracking-tight text-shell-text">
                        {isPending ? 'Payment pending' : 'Order successful'}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {isPending
                            ? "We received your payment request. Complete payment if you haven't already."
                            : 'Thank you for your purchase. Your access is ready.'}
                    </p>
                </div>

                {isPending ? (
                    <div className="space-y-4">
                        <p className="rounded-md border border-shell-border bg-shell-bg-alt p-4 text-left text-sm text-muted-foreground">
                            Once payment completes, the order is processed automatically. Check email for confirmation.
                        </p>
                        <Link
                            href="/shop"
                            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-ae-purple text-sm font-semibold text-[#0b0b14] transition-colors hover:bg-ae-cyan"
                        >
                            Return to shop
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <ol className="space-y-2 text-left text-sm text-muted-foreground">
                            <li>1. Check email for the receipt and backup link.</li>
                            <li>2. Use the button below to access your content.</li>
                        </ol>
                        {successData?.accessUrl ? (
                            <a
                                href={successData.accessUrl}
                                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-ae-purple text-sm font-semibold text-[#0b0b14] transition-colors hover:bg-ae-cyan"
                            >
                                <Download className="h-4 w-4" aria-hidden="true" />
                                {successData.accessText}
                            </a>
                        ) : (
                            <p className="rounded-md border border-shell-border bg-shell-bg-alt p-4 text-left text-sm text-muted-foreground">
                                Could not auto-fetch the access link. Check your inbox (and spam) for Sociabuzz.
                            </p>
                        )}
                        <Link
                            href="/shop"
                            className="inline-flex items-center justify-center gap-2 font-mono text-[12px] text-shell-text-muted hover:text-shell-text"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                            Back to shop
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}
