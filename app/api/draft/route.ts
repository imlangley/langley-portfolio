/**
 * Draft Mode API Route
 * 
 * Enables Next.js Draft Mode for previewing unpublished Sanity content.
 * Called from Sanity Studio's "Preview" button.
 * 
 * Flow:
 * 1. Sanity Studio opens /api/draft?secret=XXX&slug=YYY&type=ZZZ
 * 2. This route validates the secret
 * 3. Enables Draft Mode (sets a cookie)
 * 4. Redirects to the content page
 * 
 * Query Parameters:
 * - secret: Must match SANITY_PREVIEW_SECRET
 * - slug: The document's slug
 * - type: The document type (optional, defaults to 'project')
 */

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  
  // Get parameters from URL
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const type = searchParams.get('type') || 'project'

  // Validate the secret
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return NextResponse.json(
      { message: 'Invalid preview secret' },
      { status: 401 }
    )
  }

  // Validate slug is provided
  if (!slug) {
    return NextResponse.json(
      { message: 'Missing slug parameter' },
      { status: 400 }
    )
  }

  // Enable Draft Mode
  const draft = await draftMode()
  draft.enable()

  // Determine redirect URL based on document type
  let redirectUrl = '/'
  
  switch (type) {
    case 'project':
      redirectUrl = `/projects/${slug}`
      break
    case 'service':
      redirectUrl = `/services/${slug}`
      break
    case 'siteSettings':
    case 'profile':
      redirectUrl = '/'
      break
    default:
      redirectUrl = `/${slug}`
  }

  // Redirect to the content page
  redirect(redirectUrl)
}
