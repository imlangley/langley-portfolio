
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { cookie, referer, ...data } = body;

        if (!cookie) {
            return NextResponse.json({ error: 'Missing session cookie' }, { status: 400 });
        }

        // Forward all cookies provided by the client (which should match the server-side fetch)
        // Clean them slightly to remove duplicates or bad formatting
        const cleanCookie = cookie.split(/;/)
            .map((c: string) => c.trim())
            .filter((c: string) => c.length > 0)
            .join('; ');

        // Forward the request to Sociabuzz
        const targetReferer = referer || 'https://sociabuzz.com/payment/';
        
        console.log('Proxy Request:', {
            url: 'https://sociabuzz.com/payment/send/create',
            referer: targetReferer,
            cookieCount: cleanCookie.split(';').length,
            cookies: cleanCookie.substring(0, 100) + '...' // Log start for debug
        });

        const res = await fetch('https://sociabuzz.com/payment/send/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cleanCookie,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                'Origin': 'https://sociabuzz.com',
                'Referer': targetReferer,
                // Attempt to send CSRF token as header too if available in data
                ...(data.sb_token_csrf ? { 'X-Csrf-Token': data.sb_token_csrf } : {})
            },
            body: JSON.stringify(data),
        });

        const responseText = await res.text();
        console.log(`Sociabuzz Response: ${res.status} ${res.statusText}`);
        
        // Try parsing JSON
        let responseData;
        try {
            responseData = JSON.parse(responseText);
        } catch (e) {
            console.error('Failed to parse Sociabuzz response body:', responseText);
            return NextResponse.json({ 
                error: 'Invalid response from payment provider',
                status: res.status,
                statusText: res.statusText,
                bodyPreview: responseText.substring(0, 500)
            }, { status: 502 });
        }

        if (!res.ok) {
            console.error('Sociabuzz API Error:', responseData);
            return NextResponse.json(responseData, { status: res.status });
        }

        console.log('Sociabuzz Success Response:', JSON.stringify(responseData, null, 2));
        return NextResponse.json(responseData);

    } catch (error: any) {
        console.error('Payment creation proxy error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
