/**
 * Revalidation Webhook API Route
 * 
 * Handles on-demand revalidation triggered by Sanity webhooks.
 * When content is published in Sanity, this endpoint is called
 * to refresh the cached pages.
 * 
 * Setup in Sanity:
 * 1. Go to sanity.io/manage → API → Webhooks
 * 2. Create webhook with URL: https://yoursite.com/api/revalidate?secret=XXX
 * 3. Filter: _type in ["project", "siteSettings", "profile", "service", "testimonial", "faq"]
 * 4. Trigger on: Create, Update, Delete
 * 
 * Query Parameters:
 * - secret: Must match SANITY_WEBHOOK_SECRET
 * - tag: Optional cache tag to revalidate (e.g., "projects", "settings")
 */

import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Type for Sanity webhook body
interface SanityWebhookBody {
  _type?: string
  slug?: { current?: string }
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get('secret')
  const path = searchParams.get('path') // Allow manual path revalidation

  // Validate the secret
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json(
      { message: 'Invalid webhook secret' },
      { status: 401 }
    )
  }

  try {
    // Parse the webhook body to get document info
    const body: SanityWebhookBody = await request.json().catch(() => ({}))
    const { _type, slug } = body

    // If a specific path is provided via query param, revalidate it
    if (path) {
      revalidatePath(path)
      return NextResponse.json({ revalidated: true, path })
    }

    // Otherwise, revalidate based on document type
    switch (_type) {
      case 'project':
        if (slug?.current) {
          revalidatePath(`/projects/${slug.current}`)
        }
        revalidatePath('/projects')
        revalidatePath('/') // Homepage may show featured projects
        break

      case 'siteSettings':
        revalidatePath('/', 'layout') // Revalidate entire layout
        break

      case 'profile':
        revalidatePath('/about')
        revalidatePath('/') // Homepage hero might use profile
        break

      case 'service':
        revalidatePath('/services')
        revalidatePath('/')
        break

      case 'testimonial':
        revalidatePath('/') // If shown on homepage
        break

      case 'faq':
        revalidatePath('/about') // If shown on about page
        break

      default:
        // Revalidate everything as fallback
        revalidatePath('/', 'layout')
    }

    return NextResponse.json({
      revalidated: true,
      type: _type,
      slug: slug?.current,
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}

// Also handle GET requests for manual testing
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get('secret')
  const path = searchParams.get('path') || '/'

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json(
      { message: 'Invalid webhook secret' },
      { status: 401 }
    )
  }

  revalidatePath(path)
  return NextResponse.json({ revalidated: true, path })
}
