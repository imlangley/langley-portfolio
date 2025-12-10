/**
 * Sanity Client Configuration
 * 
 * Creates and exports a configured Sanity client for querying content.
 * This client is used by the Next.js frontend to fetch data.
 * 
 * Features:
 * - Configurable for draft/preview mode
 * - Type-safe environment variable handling
 * - Reusable across the application
 */

import { createClient, type ClientConfig } from '@sanity/client'

/**
 * Sanity API configuration from environment variables.
 * NEXT_PUBLIC_ prefix makes these available in the browser.
 */
export const sanityConfig: ClientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  // useCdn: true for production, false for preview/development
  useCdn: process.env.NODE_ENV === 'production',
}

/**
 * Standard Sanity client for fetching published content.
 * Uses CDN for fast, cached responses in production.
 */
export const client = createClient(sanityConfig)

/**
 * Preview client for fetching draft content.
 * Requires SANITY_API_READ_TOKEN for authentication.
 * Used in preview/draft mode.
 */
export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false, // Disable CDN for fresh draft content
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'previewDrafts', // Fetch drafts instead of published
})

/**
 * Get the appropriate client based on preview mode.
 * 
 * @param preview - Whether to use the preview client
 * @returns Configured Sanity client
 */
export function getClient(preview = false) {
  return preview ? previewClient : client
}

/**
 * Re-export config values for convenience.
 */
export const projectId = sanityConfig.projectId
export const dataset = sanityConfig.dataset
export const apiVersion = sanityConfig.apiVersion
