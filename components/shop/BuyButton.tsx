'use client'

import { ShoppingBag } from 'lucide-react'

interface BuyButtonProps {
    slug: string
    title: string
    price: string
    url: string
}

export function BuyButton({ url }: BuyButtonProps) {
    return (
        <a
            href={url}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-ae-purple text-sm font-semibold text-[#0b0b14] transition-colors hover:bg-ae-cyan"
        >
            Buy now
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
        </a>
    )
}
