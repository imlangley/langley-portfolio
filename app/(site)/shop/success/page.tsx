
import Link from 'next/link'
import * as cheerio from 'cheerio'
import { CheckCircle2, Download, ArrowLeft, ExternalLink } from 'lucide-react'
import { TiltedCard, BlurText, ShimmerButton } from '@/components/reactbits'

interface PageProps {
    searchParams: Promise<{ url?: string; cookie?: string }>
}

async function getSuccessData(targetUrl: string, cookie?: string) {
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

        // ... rest of scraping logic ...


        const html = await res.text()
        const $ = cheerio.load(html)

        // The "Access" button is a <button> with onclick location.href
        // Example: onclick="location.href=`https://...`"
        let accessUrl = ''
        let accessText = 'Access Content'

        // 1. Try finding the specific button with "Access" text
        $('button').each((i, el) => {
            const text = $(el).text().trim()
            const onclick = $(el).attr('onclick')

            if (onclick && (text.includes('Access') || text.includes('Akses') || text.includes('Download'))) {
                // Extract URL from location.href=`URL` or location.href='URL'
                const match = onclick.match(/location\.href=[`"'](.*)[`"']/)
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
                if (href && (text === 'access' || text === 'akses' || text === 'download')) {
                    accessUrl = href
                    accessText = $(el).text().trim()
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

export default async function SuccessPage({ searchParams }: PageProps) {
    const { url, cookie } = await searchParams
    const successData = url ? await getSuccessData(url, cookie) : null

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center">

            <div className="max-w-md w-full text-center space-y-8">

                {/* Success Icon Animation */}
                <div className="relative mx-auto w-24 h-24">
                    <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full animate-pulse" />
                    <CheckCircle2 className="relative w-24 h-24 text-green-500 mx-auto" />
                </div>

                <div className="space-y-2">
                    <div className="text-4xl text-center flex justify-center font-black tracking-tight text-white">
                        <BlurText text="Order Successful!" delay={0.1} />
                    </div>
                    <p className="text-zinc-400">
                        Thank you for your purchase. Your access is ready.
                    </p>
                </div>

                <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/10 backdrop-blur-sm space-y-6">

                    <div className="space-y-4">
                        <div className="text-sm text-zinc-500 uppercase tracking-widest font-medium">
                            What to do next
                        </div>
                        <ul className="text-left space-y-3 text-zinc-300 text-sm">
                            <li className="flex gap-3">
                                <span className="bg-blue-500/20 text-blue-400 w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">1</span>
                                Check your email for the receipt and backup link.
                            </li>
                            <li className="flex gap-3">
                                <span className="bg-blue-500/20 text-blue-400 w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0">2</span>
                                Click the button below to access your content now.
                            </li>
                        </ul>
                    </div>

                    {successData?.accessUrl ? (
                        <ShimmerButton
                            href={successData.accessUrl}
                            className="w-full justify-center h-12"
                        >
                            <span className="flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                {successData.accessText}
                            </span>
                        </ShimmerButton>
                    ) : (
                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-400 text-sm text-left">
                            <p className="font-semibold mb-1">Confirmation Required</p>
                            We couldn't auto-fetch the direct access link. Please check your email inbox (and spam folder) for the access link from Sociabuzz.
                        </div>
                    )}
                </div>

                <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Shop
                </Link>

            </div>
        </div>
    )
}
