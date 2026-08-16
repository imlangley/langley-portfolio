import Link from 'next/link';
import { redirect } from 'next/navigation';
import * as cheerio from 'cheerio';
import { PaymentInterface } from './PaymentInterface';

export const dynamic = 'force-dynamic';

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PaymentPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const paymentUrl = Array.isArray(params.url) ? params.url[0] : (params.url as string);
    const cookie = Array.isArray(params.cookie) ? params.cookie[0] : (params.cookie as string || '');

    if (!paymentUrl) {
        return <div>Error: Missing payment URL</div>;
    }

    // 1. Fetch the payment page HTML to get the CSRF token and config
    const res = await fetch(paymentUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            ...(cookie ? { 'Cookie': cookie } : {}),
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        return <div>Error fetching payment page: {res.status}</div>;
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // Check for success state immediately
    const title = $('title').text().trim();
    const successMessage = $('h1').text().trim();
    if (title.toLowerCase().includes('payment successful') || successMessage.toLowerCase().includes('payment successful')) {
        redirect(`/shop/success?url=${encodeURIComponent(paymentUrl)}&cookie=${encodeURIComponent(cookie)}`);
    }

    // Extract variables from the script tag
    // We look for the main config script which usually contains base_url
    const scriptContent = $('script').filter((i, el) => {
        const content = $(el).html() || '';
        return content.includes('base_url') && content.includes('token');
    }).html();

    if (!scriptContent) {
        console.error('Failed to parse payment page script. HTML preview:', html.substring(0, 500));
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 space-y-6">
                <div className="space-y-2">
                    <div className="text-red-500 font-bold text-xl">Payment Configuration Error</div>
                    <p className="text-zinc-400 max-w-md">
                        We couldn&apos;t load the embedded checkout. This usually happens if the session expired or the payment provider updated their system.
                    </p>
                </div>

                <div className="flex flex-col gap-3 w-full max-w-xs">
                    <a
                        href={paymentUrl}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
                    >
                        Continue to Sociabuzz
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                    <Link
                        href="/shop"
                        className="px-6 py-3 bg-white/5 text-zinc-400 rounded-xl font-medium hover:bg-white/10 transition-colors"
                    >
                        Return to Shop
                    </Link>
                </div>
            </div>
        );
    }

    // Helper to extract variable values with robust regex
    const extractVar = (name: string) => {
        // Handle single or double quotes, and optional var/const/let prefix
        // Pattern: (var|const|let)?\s*name\s*=\s*['"]value['"]
        const patterns = [
            new RegExp(`(const|var|let)?\\s*${name}\\s*=\\s*['"]([^'"]+)['"]`),
            new RegExp(`${name}\\s*=\\s*['"]([^'"]+)['"]`)
        ];

        for (const regex of patterns) {
            const match = scriptContent.match(regex);
            if (match) return match[2] || match[1]; // match[2] if prefix exists, else match[1]
        }
        return '';
    };

    const config = {
        base_url: extractVar('base_url'),
        token: extractVar('token'), // Order ID
        is_borne_fee: extractVar('is_borne_fee'),
        initial_amount: extractVar('initial_amount'),
        initial_currency: extractVar('initial_currency'),
        initial_country: extractVar('initial_country'),
        feature: extractVar('feature'),
        amount: extractVar('amount'),
        currency_def: extractVar('currency_def'),
        convertion: extractVar('convertion'),
        country: extractVar('country'),
        risk: extractVar('risk') || 'safe',
        message: extractVar('message_customer'),
        direct: extractVar('direct'),
        service_fee: extractVar('service_fee'),
        country_stripe_account: extractVar('country_stripe_account'),
        base_amount: extractVar('base_amount'),
        base_currency: extractVar('base_currency'),
    };

    // Extract CSRF token
    // Extract CSRF token
    const val = $('input[name="sb_token_csrf"]').val();
    const csrfToken = Array.isArray(val) ? val[0] : (val as string);

    // 2. Fetch available payment methods from API
    // Extract valid cookies from the response (handling CSRF rotation)
    const setCookieHeader = res.headers.get('set-cookie');
    let finalCookie = cookie;

    if (setCookieHeader) {
        // Simple merge: Append new cookies to the old ones. 
        // In a perfect world we'd parse and overwrite, but appending usually works for libraries like Axios/Fetch 
        // as they take the last occurrence or servers handle duplicates.
        // However, raw string concatenation might be messy.
        // Let's just pass the new ones if exist, or concatenated.
        // Better strategy: The new 'sociabuzz_sb_cookie_csrf' will be in set-cookie.
        // We should treat the response cookies as the "fresh" ones.

        // Note: res.headers.get('set-cookie') might combine multiple cookies with comma.
        // We'll just prepend/append them.
        finalCookie = `${cookie}; ${setCookieHeader}`;
    }

    const settingUrl = new URL(`${config.base_url}pay/setting`);
    // ... URLs params ...
    settingUrl.searchParams.append('amount', config.initial_amount);
    settingUrl.searchParams.append('currency', config.initial_currency);
    settingUrl.searchParams.append('base_amount', config.base_amount);
    settingUrl.searchParams.append('base_currency', config.base_currency);
    settingUrl.searchParams.append('currency_def', config.currency_def);
    settingUrl.searchParams.append('convertion', config.convertion);
    settingUrl.searchParams.append('country', config.country);
    settingUrl.searchParams.append('feature', config.feature);
    settingUrl.searchParams.append('is_borne_fee', config.is_borne_fee);
    settingUrl.searchParams.append('risk', config.risk);
    settingUrl.searchParams.append('message', config.message);
    settingUrl.searchParams.append('direct', config.direct);
    settingUrl.searchParams.append('service_fee', config.service_fee);
    settingUrl.searchParams.append('country_account', config.country_stripe_account);

    const settingRes = await fetch(settingUrl.toString(), {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest',
            'Cookie': finalCookie, // Use the updated cookie for this call too
        },
        cache: 'no-store',
    });

    if (!settingRes.ok) {
        return <div>Error fetching payment settings: {settingRes.status}</div>;
    }

    const settingData = await settingRes.json();

    // Validate configuration
    if (!settingData || !settingData.payment_channel) {
        console.error('Invalid payment configuration:', settingData);
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 space-y-6">
                <div className="space-y-2">
                    <div className="text-red-500 font-bold text-xl">Payment Configuration Error</div>
                    <p className="text-zinc-400 max-w-md">
                        We received an invalid response from the payment provider. Please try the direct link below.
                    </p>
                </div>

                <div className="flex flex-col gap-3 w-full max-w-xs">
                    <a
                        href={paymentUrl}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
                    >
                        Continue to Sociabuzz
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                    <Link
                        href="/shop"
                        className="px-6 py-3 bg-white/5 text-zinc-400 rounded-xl font-medium hover:bg-white/10 transition-colors"
                    >
                        Return to Shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[60svh] px-4 py-10">
            <PaymentInterface
                config={{
                    ...config,
                    sb_token_csrf: csrfToken || ''
                }}
                paymentData={settingData}
                cookie={finalCookie} // Pass the FRESH cookie to the client
            />
        </div>
    );
}
