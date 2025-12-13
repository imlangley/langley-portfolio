import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { url, cookie } = body;

        if (!url) {
            return NextResponse.json({ message: 'URL is required' }, { status: 400 });
        }

        const headers: HeadersInit = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://sociabuzz.com/',
        };

        if (cookie) {
            headers['Cookie'] = cookie;
        }

        const res = await fetch(url, {
            headers,
            cache: 'no-store',
            next: { revalidate: 0 }
        });

        if (!res.ok) {
            return NextResponse.json({ status: 'error', message: 'Failed to fetch status' }, { status: res.status });
        }

        const html = await res.text();
        const $ = cheerio.load(html);

        // Check for success indicators
        const title = $('title').text().trim();
        const successMessage = $('h1').text().trim(); // "Payment successful!"
        const isSuccess = title.toLowerCase().includes('success') || successMessage.toLowerCase().includes('payment successful');

        if (isSuccess) {
            // Try to grab the access URL if possible, to pass back?
            // Usually the success page has an "Access" button.
            // We can reuse the logic from verify-payment or just return 'paid' and let client redirect to /shop/success
            // which will then scrape the "Access" button itself.
            return NextResponse.json({ status: 'paid' });
        }

        return NextResponse.json({ status: 'pending' });

    } catch (error: any) {
        console.error('Check status error:', error);
        return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }
}
