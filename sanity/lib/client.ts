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
 * - Lazy initialization to avoid build-time failures when env vars are missing
 */

import { createClient, type ClientConfig } from '@sanity/client'

let _client: ReturnType<typeof createClient> | null = null
let _previewClient: ReturnType<typeof createClient> | null = null

function getSanityConfig(): ClientConfig {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId) {
    throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is not set')
  }
  return {
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
    useCdn: process.env.NODE_ENV === 'production',
  }
}

function getClientInstance(): ReturnType<typeof createClient> {
  if (!_client) {
    _client = createClient(getSanityConfig())
  }
  return _client
}

function getPreviewClientInstance(): ReturnType<typeof createClient> {
  if (!_previewClient) {
    const config = getSanityConfig()
    _previewClient = createClient({
      ...config,
      useCdn: false,
      token: process.env.SANITY_API_READ_TOKEN,
      perspective: 'previewDrafts',
    })
  }
  return _previewClient
}

/**
 * Standard Sanity client for fetching published content.
 * Uses CDN for fast, cached responses in production.
 * Lazily initialized to avoid build-time failures.
 */
export const client = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    const instance = getClientInstance()
    const value = Reflect.get(instance, prop, instance)
    // Bind methods to the real instance so private class fields resolve correctly.
    return typeof value === 'function' ? value.bind(instance) : value
  },
})

/**
 * Preview client for fetching draft content.
 * Requires SANITY_API_READ_TOKEN for authentication.
 * Used in preview/draft mode.
 * Lazily initialized.
 */
export const previewClient = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    const instance = getPreviewClientInstance()
    const value = Reflect.get(instance, prop, instance)
    return typeof value === 'function' ? value.bind(instance) : value
  },
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
 * These throw if accessed without env vars set.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'