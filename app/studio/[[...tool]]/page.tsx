/**
 * Sanity Studio Route
 * 
 * Embeds Sanity Studio at /studio in your Next.js app.
 * This allows you to manage content without leaving your site.
 */

'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function StudioPage() {
    return (
        <div className="h-screen w-full">
            <NextStudio config={config} />
        </div>
    )
}
