
import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

export async function POST(req: NextRequest) {
    try {
        let body;
        try {
            body = await req.json();
        } catch (e) {
            console.error('JSON Parse Error:', e);
            return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
        }

        const { slug, fullname, email, whatsapp } = body

        if (!slug || !email || !fullname) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const targetUrl = `https://sociabuzz.com/langlieyy/p/${slug}/buy`

        // Step 1: GET request to establish session and get CSRF token
        const initialRes = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                'Referer': `https://sociabuzz.com/langlieyy/p/${slug}`,
            }
        })

        const initialHtml = await initialRes.text()
        const cookies = initialRes.headers.get('set-cookie') || ''
        
        // Extract CSRF token
        const $ = cheerio.load(initialHtml)
        const csrfToken = $('input[name="sb_token_csrf"]').val() as string

        if (!csrfToken) {
            console.error('Failed to extract CSRF token')
            return NextResponse.json(
                { error: 'Failed to initialize checkout session' },
                { status: 502 }
            )
        }

        // Step 2: POST request to submit form
        const formData = new FormData()
        formData.append('fullname', fullname)
        formData.append('email', email)
        formData.append('whatsapp', whatsapp || '') // Optional
        formData.append('address', '')
        formData.append('sb_token_csrf', csrfToken)
        formData.append('prev_url', targetUrl) // Mimic origin
        formData.append('years18', '1') // Auto-check 18+

        const submitRes = await fetch(targetUrl, {
            method: 'POST',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                'Cookie': cookies, // Pass the session cookie
                // Note: fetch automatically sets Content-Type for FormData
            },
            body: formData
        })

        const result = await submitRes.json()

        if (result.success === 'true' && result.content?.redirect) {
            // Clean cookies: remove attributes like Path, HttpOnly, and ensure semicolon separation
            const rawCookies = submitRes.headers.get('set-cookie') || cookies || ''
            const cleanCookies = rawCookies
                .split(',') // Split multiple cookies
                .map(c => c.split(';')[0].trim()) // Keep only 'name=value' part
                .join('; ') // Join with semicolons for Cookie header
            
            return NextResponse.json({ 
                success: true, 
                redirectUrl: result.content.redirect,
                sessionCookie: cleanCookies 
            })
        } else {
            console.error('Sociabuzz Error:', result)
            // Extract validation errors if present
             let errorMessage = 'Checkout failed'
             if (result.validates) {
                 const errors = Object.values(result.validates).filter(Boolean).join(', ')
                 if (errors) errorMessage = errors
             }

            return NextResponse.json(
                { error: errorMessage, details: result },
                { status: 400 }
            )
        }

    } catch (error) {
        console.error('Checkout Proxy Error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
