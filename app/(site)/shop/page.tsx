
import { ShopCard, ShopItem } from '@/components/shop/ShopCard'
import { BlurText } from '@/components/reactbits'
import { ShoppingBag, ExternalLink } from 'lucide-react'

// Revalidate every hour
export const revalidate = 3600

async function getShopItems(): Promise<ShopItem[]> {
    try {
        const res = await fetch('https://sociabuzz.com/shop/get_data_shop_v2/langlieyy/1', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; LangleyPortfolio/1.0)',
                'X-Requested-With': 'XMLHttpRequest'
            },
            next: { revalidate: 3600 }
        })

        if (!res.ok) throw new Error('Failed to fetch shop items')

        const data = await res.json()

        return (data.data || []).map((item: any) => ({
            id: item.id?.toString() || Math.random().toString(),
            title: item.title,
            price: item.price,
            image: item.image || item.image_origin,
            link: `https://sociabuzz.com${item.link}`
        }))
    } catch (error) {
        console.error('Shop fetch error:', error)
        return []
    }
}

export default async function ShopPage() {
    const items = await getShopItems()

    return (
        <div className="min-h-screen pt-24 pb-20 px-6">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-widest">
                            <ShoppingBag className="w-3 h-3" />
                            <span>Digital Archive</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                            <BlurText
                                text="Creative Assets"
                                delay={50}
                                animateBy="words"
                                direction="bottom"
                            />
                        </h1>

                        <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
                            Project files, templates, and presets from my personal workshop.
                            Grab the source files to deconstruct and learn from my workflow.
                        </p>
                    </div>

                    <a
                        href="https://sociabuzz.com/langlieyy/shop"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
                    >
                        <span>View on Sociabuzz</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </div>

                {/* Grid */}
                {items.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {items.map((item) => (
                            <div key={item.id} className="h-[400px]">
                                <ShopCard item={item} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-64 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-3xl bg-white/5">
                        <ShoppingBag className="w-12 h-12 text-muted-foreground/50 mb-4" />
                        <p className="text-muted-foreground">No items currently available.</p>
                        <a
                            href="https://sociabuzz.com/langlieyy/shop"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium"
                        >
                            Check Sociabuzz Directly &rarr;
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}
