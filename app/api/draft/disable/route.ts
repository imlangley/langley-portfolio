/**
 * Disable Draft Mode API Route
 * 
 * Exits preview/draft mode and returns to viewing published content.
 * Call this from a "Exit Preview" button in your frontend.
 * 
 * Usage:
 * - GET /api/draft/disable → Disables draft mode and redirects to homepage
 * - GET /api/draft/disable?redirect=/projects → Redirects to specific page
 */

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const redirectTo = searchParams.get('redirect') || '/'

  // Disable Draft Mode
  const draft = await draftMode()
  draft.disable()

  // Redirect to the specified page or homepage
  redirect(redirectTo)
}
