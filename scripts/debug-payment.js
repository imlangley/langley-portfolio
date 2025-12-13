// Native fetch in Node 18+

async function debugPayment() {
    const paymentUrl = 'https://sociabuzz.com/payment/x/d674abee-d84a-11f0-b4b9-062dd6ffe3b6';

    console.log('1. Fetching Payment Page to get Cookies/CSRF...');
    // Mimic the browser's first hit
    const res = await fetch(paymentUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    });

    console.log(`Page Status: ${res.status}`);
    const html = await res.text();

    // Extract CSRF Token
    const csrfMatch = html.match(/name="sb_token_csrf"\s+value="([^"]+)"/);
    const csrfToken = csrfMatch ? csrfMatch[1] : null;
    console.log(`Extracted CSRF Token: ${csrfToken}`);

    // Extract Cookies
    // Native fetch (Node 18+) uses getSetCookie()
    const rawCookies = res.headers.getSetCookie ? res.headers.getSetCookie() : [res.headers.get('set-cookie')];

    if (!rawCookies || rawCookies.length === 0 || !rawCookies[0]) {
        console.error('No cookies received!');
        console.log('Headers:', res.headers);
        return;
    }

    // Process cookies for next request
    const cookieMap = rawCookies.map(c => c.split(';')[0]);
    const finalCookie = cookieMap.join('; ');
    console.log(`Cookies for Request: ${finalCookie}`);

    // Extract other hidden fields
    // Try multiple patterns
    let orderId = null;
    const orderPatterns = [
        /const\s+token\s*=\s*['"]([^'"]+)['"]/,
        /var\s+token\s*=\s*['"]([^'"]+)['"]/,
        /token\s*=\s*['"]([^'"]+)['"]/
    ];

    for (const p of orderPatterns) {
        const m = html.match(p);
        if (m) {
            orderId = m[1];
            break;
        }
    }

    console.log(`Order ID: ${orderId}`);

    if (!csrfToken || !orderId) {
        console.error('Failed to extract required fields');
        require('fs').writeFileSync('debug_fail.html', html);
        console.log('Saved HTML to debug_fail.html');
        return;
    }

    console.log('\n2. Attempting API Request...');

    // Construct payload
    // Use the extracted CSRF token as the hash
    const payload = {
        sb_token_csrf: csrfToken, // This must match the cookie hash!
        order_id: orderId,
        final_currency: 'IDR',
        currency_def: 'IDR',
        payment_method: 'gopay',
        type_payment: '',
        source_payment: '',
        fullname: 'Debug User',
        document: '',
        country: 'ID',
        country_pay: 'ID',
        referer: paymentUrl
    };

    console.log('Payload:', payload);

    const apiUrl = 'https://sociabuzz.com/payment/send/create';

    const apiRes = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': finalCookie,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest',
            'Origin': 'https://sociabuzz.com',
            'Referer': paymentUrl
        },
        body: JSON.stringify(payload)
    });

    console.log(`API Status: ${apiRes.status} ${apiRes.statusText}`);
    const apiText = await apiRes.text();
    console.log('API Response Body Preview:', apiText.substring(0, 500));
}

debugPayment();
