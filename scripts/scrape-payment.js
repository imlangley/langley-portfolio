const fs = require('fs');

async function scrapePayment() {
    const url = 'https://sociabuzz.com/payment/x/7c0c7c4e-d846-11f0-89e9-062dd6ffe3b6';
    console.log(`Fetching ${url}...`);

    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        console.log('Status:', res.status);
        const html = await res.text();

        fs.writeFileSync('payment_dump.html', html);
        console.log('Saved to payment_dump.html');

    } catch (e) {
        console.error('Error:', e);
    }
}

scrapePayment();
