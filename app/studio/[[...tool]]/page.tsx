/**
 * Sanity Studio Route
 * 
 * Embeds Sanity Studio at /studio in your Next.js app.
 * This allows you to manage content without leaving your site.
 */

'use client'

import { useEffect } from 'react'
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

/**
 * Suppress flushSync warning in Sanity Studio
 * 
 * This is a known issue with Sanity Studio + React 18 concurrent rendering.
 * The warning occurs when Sanity's form components trigger state updates
 * during lifecycle methods (particularly with array fields like Social Links).
 * 
 * This doesn't affect functionality - it's just a console warning.
 * @see https://github.com/sanity-io/sanity/issues/4108
 */
function useSuppressFlushSyncWarning() {
    useEffect(() => {
        const originalError = console.error
        console.error = (...args) => {
            if (
                typeof args[0] === 'string' &&
                args[0].includes('flushSync was called from inside a lifecycle method')
            ) {
                // Suppress this specific warning
                return
            }
            originalError.apply(console, args)
        }

        return () => {
            console.error = originalError
        }
    }, [])
}

export default function StudioPage() {
    useSuppressFlushSyncWarning()
    
    return (
        <div className="h-screen w-full">
            <NextStudio config={config} />
        </div>
    )
}
