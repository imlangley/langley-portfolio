import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'
import { getSociabuzzSession } from '@/lib/sociabuzz'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { slug, fullname, email, whatsapp, lang = 'id' } = body

        if (!slug || !fullname || !email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // 1. Get a fresh session specifically for the requested language
        // This ensures Sociabuzz treats the user as ID (Rupiah) or Intl (USD)
        const { cookies: sessionCookies, csrfToken: sessionCsrf } = await getSociabuzzSession(lang)
        
        console.log(`[Checkout] Initialized session for lang=${lang}. Got cookies: ${!!sessionCookies}, csrf: ${!!sessionCsrf}`)

        // 2. Fetch the "Buy" page using this session to get the form-specific CSRF token 
        // (Sociabuzz sometimes rotates tokens or requires a fresh visit)
        const buyUrl = `https://sociabuzz.com/langlieyy/p/${slug}/buy`
        const pageRes = await fetch(buyUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Cookie': sessionCookies
            }
        })

        if (!pageRes.ok) {
            throw new Error(`Failed to fetch buy page: ${pageRes.status}`)
        }

        // Parse CSRF token from the page itself as a fallback/confirmation
        const html = await pageRes.text()
        const $ = cheerio.load(html)
        const pageCsrfToken = $('input[name="csrf_test_name"]').val() as string
        
        // Use the token from the page if available, otherwise fallback to the one from cookies
        const finalCsrfToken = pageCsrfToken || sessionCsrf

        if (!finalCsrfToken) {
            console.error('[Checkout] Failed to find CSRF token')
            throw new Error('Payment gateway initialization failed (CSRF)')
        }

        // 3. Submit the checkout form using the SAME session
        const formData = new URLSearchParams()
        formData.append('csrf_test_name', finalCsrfToken)
        formData.append('data[name]', fullname)
        formData.append('data[message]', '') // Optional message
        formData.append('data[email]', email)
        formData.append('data[whatsapp]', whatsapp || '')
        formData.append('data[amount_custom]', '') // For custom items
        
        // IMPORTANT: The session cookie must be passed here to maintain the language/currency context
        const buyRes = await fetch(buyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Cookie': sessionCookies,
                'Origin': 'https://sociabuzz.com',
                'Referer': buyUrl
            },
            body: formData
        })

        const buyData = await buyRes.json()

        if (buyData.status !== 'success') {
            console.error('[Checkout] Sociabuzz error:', buyData)
            throw new Error(buyData.message || 'Payment processing failed')
        }

        // Return the redirect URL and the session cookie so the client can follow it if needed 
        // (though usually just redirecting to the URL is enough)
        return NextResponse.json({ 
            redirectUrl: buyData.redirect_url,
            // Pass the session cookie back to client so they can carry the session if needed (optional)
            sessionCookie: sessionCookies
        })

    } catch (error: any) {
        console.error('[Checkout] Error:', error)
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        )
    }
}
