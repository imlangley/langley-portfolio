import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import * as cheerio from 'cheerio'
import { ArrowLeft, FileArchive, ShieldCheck, ShoppingBag } from 'lucide-react'
import { BuyButton } from '@/components/shop/BuyButton'

interface PageProps {
    params: Promise<{ slug: string }>
}

async function getProductDetails(slug: string) {
    try {
        const url = `https://sociabuzz.com/langlieyy/p/${slug}`
        const res = await fetch(url, {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
            next: { revalidate: 3600 },
        })

        if (!res.ok) return null

        const html = await res.text()
        const $ = cheerio.load(html)
        const title = $('h1').first().text().trim()
        const price = $('.price.shop-product-price').first().text().trim()
        const image = $('meta[property="og:image"]').attr('content') || ''
        const descriptionHtml = $('.servicedetail-intro').first().html() || ''

        if (!title) return null

        return { title, price, image, descriptionHtml, url }
    } catch (error) {
        console.error('Error fetching product:', error)
        return null
    }
}

export default async function ShopDetailPage({ params }: PageProps) {
    const { slug } = await params
    const product = await getProductDetails(slug)

    if (!product) notFound()

    return (
        <section className="w-full border-b border-shell-border bg-shell-bg-alt">
            <div className="flex min-h-[calc(100svh-2.75rem)] flex-col">
                <div className="flex items-stretch border-b border-shell-border bg-shell-bg font-mono text-[11px]">
                    <Link
                        href="/shop"
                        className="flex items-center gap-2 border-r border-shell-border px-4 py-2 text-shell-text-muted transition-colors hover:text-shell-text"
                    >
                        <ArrowLeft className="h-3 w-3" aria-hidden="true" />
                        shop
                    </Link>
                    <span className="flex items-center gap-2 bg-shell-bg-alt px-4 py-2 text-shell-text">
                        <FileArchive className="h-3 w-3 text-syn-orange" aria-hidden="true" />
                        {slug}.zip
                        <span className="ml-1 h-1.5 w-1.5 rounded-full bg-shell-accent" aria-hidden="true" />
                    </span>
                </div>

                <div className="grid flex-1 gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                    <div className="border-b border-shell-border bg-shell-bg p-4 sm:p-6 lg:border-b-0 lg:border-r">
                        <div className="relative aspect-square overflow-hidden rounded-md border border-shell-border bg-shell-bg-alt">
                            {product.image ? (
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-shell-text-muted/30">
                                    <ShoppingBag className="h-16 w-16" aria-hidden="true" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 p-5 sm:p-8">
                        <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ae-cyan">
                                Instant delivery
                            </p>
                            <h1 className="mt-2 text-3xl font-black tracking-tight text-shell-text sm:text-4xl">
                                {product.title}
                            </h1>
                            <p className="mt-3 font-mono text-2xl font-bold text-ae-purple">{product.price}</p>
                        </div>

                        {product.descriptionHtml && (
                            <div
                                className="prose prose-invert max-w-none border-t border-shell-border pt-6 text-sm leading-relaxed text-muted-foreground"
                                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                            />
                        )}

                        <div className="mt-auto space-y-3 border-t border-shell-border pt-6">
                            <BuyButton
                                slug={slug}
                                title={product.title}
                                price={product.price}
                                url={product.url}
                            />
                            <p className="flex items-center justify-center gap-2 font-mono text-[11px] text-shell-text-muted">
                                <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                                Checkout processed by Sociabuzz
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
