import { ShopCard, type ShopItem } from '@/components/shop/ShopCard'
import { Reveal } from '@/components/motion/Reveal'
import { RouteCanvas } from '@/components/three/RouteCanvas'
import { CanvasErrorBoundary } from '@/components/three/CanvasErrorBoundary'
import { ExternalLink, ShoppingBag } from 'lucide-react'

export const revalidate = 3600

async function getShopItems(): Promise<ShopItem[]> {
    try {
        const res = await fetch('https://sociabuzz.com/shop/get_data_shop_v2/langlieyy/1', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; LangleyPortfolio/1.0)',
                'X-Requested-With': 'XMLHttpRequest',
            },
            next: { revalidate: 3600 },
        })

        if (!res.ok) throw new Error('Failed to fetch shop items')

        const data: { data?: Array<{ id?: string | number; title: string; price: string; image?: string; image_origin?: string; link: string }> } =
            await res.json()

        return (data.data || []).map((item) => ({
            id: item.id?.toString() || item.link,
            title: item.title,
            price: item.price,
            image: item.image || item.image_origin || '',
            link: `https://sociabuzz.com${item.link}`,
        }))
    } catch (error) {
        console.error('Shop fetch error:', error)
        return []
    }
}

export default async function ShopPage() {
    const items = await getShopItems()

    return (
        <section className="py-12 sm:py-16">
            <div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-shell-text-muted">
                            Shop
                        </p>
                        <h1 className="mt-2 text-3xl font-black tracking-tight text-shell-text sm:text-4xl">
                            Creative assets
                        </h1>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                            Project files, templates, and presets from the workshop.
                            {items.length > 0 && <span className="ml-1 opacity-70">({items.length})</span>}
                        </p>
                    </div>
                        <a
                            href="https://sociabuzz.com/langlieyy/shop"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-[12px] text-shell-text-muted transition-colors hover:text-shell-text"
                        >
                            View on Sociabuzz
                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                    </div>

                    {items.length > 0 ? (
                        <>
                        <div className="relative mb-8 overflow-hidden rounded-lg border border-shell-border bg-[#07070c]">
                            <CanvasErrorBoundary>
                            <RouteCanvas variant="cubes" className="h-[140px] w-full sm:h-[170px]" accent="#00c8ff" />
                        </CanvasErrorBoundary>
                            <span className="pointer-events-none absolute left-3 top-2 font-mono text-[10px] uppercase tracking-[0.16em] text-shell-text-muted/70">
                                viewport · crates.glb
                            </span>
                        </div>

                        <ul className="perspective-1200 mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {items.map((item, i) => (
                                <li key={item.id}>
                                    <Reveal delay={(i % 3) * 0.08}>
                                        <ShopCard item={item} />
                                    </Reveal>
                                </li>
                            ))}
                        </ul>
                        </>
                    ) : (
                        <div className="flex min-h-64 flex-col items-center justify-center rounded-md border border-dashed border-shell-border bg-shell-bg px-6 py-12 text-center">
                            <ShoppingBag className="mb-3 h-8 w-8 text-shell-text-muted/50" aria-hidden="true" />
                            <p className="font-mono text-[12px] text-shell-text-muted">No items currently available.</p>
                            <a
                                href="https://sociabuzz.com/langlieyy/shop"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 font-mono text-[12px] text-ae-cyan hover:text-ae-purple"
                            >
                                Check Sociabuzz directly →
                            </a>
                        </div>
                    )}
            </div>
        </section>
    )
}
