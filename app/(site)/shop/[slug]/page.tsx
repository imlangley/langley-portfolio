
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import * as cheerio from 'cheerio'
import { ShoppingBag, ArrowLeft, ExternalLink, ShieldCheck, Zap } from 'lucide-react'
import { BlurText, TiltedCard } from '@/components/reactbits'
import { BuyButton } from '@/components/shop/BuyButton'

interface PageProps {
    params: Promise<{ slug: string }>
}

async function getProductDetails(slug: string) {
    try {
        const url = `https://sociabuzz.com/langlieyy/p/${slug}`
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            next: { revalidate: 3600 }
        })

        if (!res.ok) return null

        const html = await res.text()
        const $ = cheerio.load(html)

        // Extract using selectors from analysis
        const title = $('h1').first().text().trim()
        const price = $('.price.shop-product-price').first().text().trim()
        const image = $('meta[property="og:image"]').attr('content') || ''

        // Get description HTML but clean it up if needed
        const descriptionHtml = $('.servicedetail-intro').first().html() || ''

        if (!title) return null

        return {
            title,
            price,
            image,
            descriptionHtml,
            url
        }
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
        <div className="min-h-screen pt-24 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Shop
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Image */}
                    <div className="lg:sticky lg:top-24">
                        <TiltedCard
                            rotateAmplitude={5}
                            scaleOnHover={1.02}
                            showShine={true}
                            className="w-full aspect-square rounded-3xl overflow-hidden border border-white/10 bg-card/50 backdrop-blur-sm"
                        >
                            {product.image ? (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-secondary/20">
                                    <ShoppingBag className="w-24 h-24 text-muted-foreground/30" />
                                </div>
                            )}
                        </TiltedCard>
                    </div>

                    {/* Right: Details */}
                    <div className="space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-widest mb-4">
                                <Zap className="w-3 h-3" />
                                <span>Instant Delivery</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
                                <BlurText
                                    text={product.title}
                                    className="text-white"
                                    delay={0}
                                />
                            </h1>

                            <div className="text-3xl font-bold text-blue-400 font-mono">
                                {product.price}
                            </div>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none border-t border-white/10 pt-8 text-gray-300">
                            <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                        </div>

                        <div className="flex flex-col gap-4 border-t border-white/10 pt-8">
                            <BuyButton
                                slug={slug}
                                title={product.title}
                                price={product.price}
                                url={product.url}
                            />

                            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                <ShieldCheck className="w-3 h-3" />
                                <span>Fast checkout securely processed by Sociabuzz</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
