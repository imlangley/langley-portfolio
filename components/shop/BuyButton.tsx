
'use client'

import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { ShimmerButton } from '@/components/reactbits'


interface BuyButtonProps {
    slug: string
    title: string
    price: string
    url: string
}

export function BuyButton({ slug, title, price, url }: BuyButtonProps) {
    return (
        <ShimmerButton
            onClick={() => window.location.href = `${url}`}
            className="w-full text-center justify-center h-14 text-lg cursor-pointer"
        >
            <span className="flex items-center gap-2">
                Buy Now
                <ShoppingBag className="w-5 h-5" />
            </span>
        </ShimmerButton>
    )
}
