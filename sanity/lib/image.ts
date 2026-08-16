/**
 * Sanity Image URL Builder
 * 
 * Provides utilities for generating optimized image URLs from Sanity assets.
 * Supports responsive images, hotspots, and crops.
 */

import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

/**
 * Image URL builder instance.
 * Built from explicit env config — reading config off the lazy client proxy
 * resolved to undefined projectId/dataset and broke every image URL.
 */
const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
})

/**
 * Generate an image URL from a Sanity image reference.
 * 
 * Usage:
 * ```ts
 * // Basic usage
 * urlFor(image).width(800).url()
 * 
 * // With hotspot/crop (auto-applied from image metadata)
 * urlFor(image).width(800).height(600).fit('crop').url()
 * 
 * // Responsive srcset
 * const srcset = [320, 640, 1024, 1920]
 *   .map(w => `${urlFor(image).width(w).url()} ${w}w`)
 *   .join(', ')
 * ```
 * 
 * @param source - Sanity image source (from document)
 * @returns Image URL builder for chaining
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * Type for Sanity image fields (for TypeScript hints).
 */
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
  alt?: string
}

/**
 * Generate a responsive image URL with common defaults.
 * 
 * @param image - Sanity image object
 * @param width - Desired width
 * @param quality - Image quality (1-100, default 80)
 */
export function getImageUrl(
  image: SanityImageSource | null | undefined,
  width: number = 800,
  quality: number = 80
): string | null {
  if (!image) return null
  
  return urlFor(image)
    .width(width)
    .quality(quality)
    .auto('format') // Auto-select best format (webp, etc.)
    .url()
}

/**
 * Generate srcset for responsive images.
 * 
 * @param image - Sanity image object
 * @param widths - Array of widths for srcset
 */
export function getImageSrcSet(
  image: SanityImageSource | null | undefined,
  widths: number[] = [320, 640, 1024, 1440, 1920]
): string | null {
  if (!image) return null
  
  return widths
    .map((w) => `${urlFor(image).width(w).auto('format').url()} ${w}w`)
    .join(', ')
}

/**
 * Get LQIP (Low Quality Image Placeholder) for blur-up loading.
 * Note: Requires requesting asset metadata in your GROQ query:
 * `image{..., asset->{..., metadata{lqip}}}`
 * 
 * @param image - Sanity image with asset metadata
 */
export function getImageLqip(
  image: { asset?: { metadata?: { lqip?: string } } } | null | undefined
): string | undefined {
  return image?.asset?.metadata?.lqip
}
