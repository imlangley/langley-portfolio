
'use client'

import { motion } from 'motion/react'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { TiltedCard } from '@/components/reactbits'
import { useCursor } from '@/context/CursorContext'

export interface ShopItem {
    id: string
    title: string
    price: string
    image: string
    link: string
}

interface ShopCardProps {
    item: ShopItem & { slug?: string }
}

export function ShopCard({ item }: ShopCardProps) {
    const { setCursorVariant } = useCursor()

    // Extract slug from link if not provided directly
    const slug = item.slug || item.link.split('/').pop() || ''
    const href = `/shop/${slug}`

    return (
        <TiltedCard
            rotateAmplitude={8}
            scaleOnHover={1.02}
            showShine={true}
            containerClassName="h-full"
            className="h-full"
        >
            <Link
                href={href}
                className="block h-full"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
            >
                <motion.div
                    className="relative h-full flex flex-col bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden group hover:border-primary/20 transition-colors"
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    {/* Image Area */}
                    <div className="relative aspect-square w-full overflow-hidden bg-black/20">
                        {item.image ? (
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                                <ShoppingBag className="w-12 h-12 opacity-20" />
                            </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                        {/* External Link Icon */}

                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow p-5 space-y-4">
                        <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors text-balance line-clamp-2">
                            {item.title}
                        </h3>

                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-xl font-bold text-blue-400">
                                    {item.price}
                                </span>
                            </div>

                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest bg-secondary/30 px-2 py-1 rounded">
                                Digital Asset
                            </span>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </TiltedCard>
    )
}
