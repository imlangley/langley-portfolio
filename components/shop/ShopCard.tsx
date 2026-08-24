'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FileArchive, ShoppingBag } from 'lucide-react'
import { useCursor } from '@/context/CursorContext'
import { TiltCard } from '@/components/motion/TiltCard'

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
    const slug = item.slug || item.link.split('/').pop() || ''
    const href = `/shop/${slug}`

    return (
        <TiltCard maxTilt={6}>
        <Link
            href={href}
            className="group flex h-full flex-col overflow-hidden rounded-md border border-shell-border bg-shell-bg transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:border-shell-accent/50 hover:[transform:translateZ(14px)]"
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
        >
            <div className="flex items-center gap-1.5 border-b border-shell-border px-3 py-1.5 font-mono text-[10px] text-shell-text-muted">
                <FileArchive className="h-3 w-3 shrink-0 text-syn-orange" aria-hidden="true" />
                <span className="truncate">{slug}.zip</span>
            </div>
            <div className="relative aspect-square overflow-hidden bg-shell-bg-alt">
                {item.image ? (
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-shell-text-muted/30">
                        <ShoppingBag className="h-10 w-10" aria-hidden="true" />
                    </div>
                )}
            </div>
            <div className="flex flex-1 flex-col gap-2 p-3">
                <h2 className="line-clamp-2 text-sm font-bold tracking-tight text-shell-text">
                    {item.title}
                </h2>
                <div className="mt-auto flex items-center justify-between border-t border-shell-border pt-2">
                    <span className="font-mono text-sm font-bold text-ae-purple">{item.price}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-shell-text-muted">
                        Digital
                    </span>
                </div>
            </div>
        </Link>
        </TiltCard>
    )
}
