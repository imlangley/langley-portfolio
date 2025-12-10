/**
 * Sanity Library Index
 * 
 * Re-exports all Sanity utilities for convenient imports.
 * 
 * Usage:
 * ```ts
 * import { client, urlFor, getSiteSettings, type Project } from '@/sanity/lib'
 * ```
 */

// Client exports
export { client, previewClient, getClient, sanityConfig, projectId, dataset, apiVersion } from './client'

// Image utilities
export { urlFor, getImageUrl, getImageSrcSet, getImageLqip, type SanityImage } from './image'

// GROQ queries (for custom usage)
export * from './queries'

// Fetch functions and types
export * from './fetch'
