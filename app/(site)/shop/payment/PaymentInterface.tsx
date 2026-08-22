'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, CreditCard, Wallet, Smartphone, ShieldCheck, Loader2 } from 'lucide-react';

// import { QRCodeSVG } from 'qrcode.react';

interface PaymentMethod {
    name: string;
    alias: string;
    logo?: string;
    icon?: string;
    total_fee?: string;
    total_pay?: string;
    show?: boolean;
    active?: boolean;
    type?: string;
    source?: string;
    payment_currency?: string;
    currency_convert?: string;
}

interface PaymentCategory {
    name: string;
    alias?: string;
    available: PaymentMethod[];
}

interface PaymentConfig {
    token: string;
    amount: string;
    currency_def: string;
    sb_token_csrf: string;
    base_url: string;
    initial_amount: string;
    initial_currency: string;
    base_amount: string;
    base_currency: string;
    convertion: string;
    country: string;
    feature: string;
    is_borne_fee: string;
    risk: string;
    message: string;
    direct: string;
    service_fee: string;
    country_stripe_account: string;
}

interface PaymentInterfaceProps {
    config: PaymentConfig;
    paymentData: {
        payment_channel: PaymentCategory[];
        amount_convert: number;
        currency_convert: string;
    };
    cookie: string;
}



interface PaymentResult {
    status?: string;
    payment_method?: string;
    type_payment?: string;
    data?: {
        qr_string?: string;
        account_number?: string;
        pay_code?: string;
        retail_outlet_name?: string;
        expiration_date?: string;
        payment_link?: string;
    };
}

export function PaymentInterface({ config, paymentData, cookie }: PaymentInterfaceProps) {
    const router = useRouter();
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
    const [selectedCategoryType, setSelectedCategoryType] = useState<string>('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [openCategory, setOpenCategory] = useState<string | null>('ewallet');
    const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);

    // Polling for payment status
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (paymentResult) {
            const checkStatus = async () => {
                try {
                    const checkUrl = config.base_url + 'x/' + config.token;
                    const res = await fetch('/api/payment/check', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            url: checkUrl,
                            cookie // Pass the cookie from props
                        })
                    });
                    const data = await res.json();

                    if (data.status === 'paid') {
                        const successUrl = `/shop/success?url=${encodeURIComponent(checkUrl)}&cookie=${encodeURIComponent(cookie)}`;
                        router.push(successUrl);
                    }
                } catch (err) {
                    console.error('Polling error:', err);
                }
            };

            // Poll every 5 seconds
            interval = setInterval(checkStatus, 5000);

            // Check immediately once
            checkStatus();
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [paymentResult, config, cookie, router]);

    // Filter categories that have available methods
    const activeCategories = paymentData.payment_channel.filter(
        cat => cat.available && cat.available.length > 0 && cat.available.some(m => m.show !== false)
    );

    const handleSelectMethod = (method: PaymentMethod, categoryName: string) => {
        setSelectedMethod(method);
        setSelectedCategoryType(categoryName);
        setError('');
    };

    const handlePayment = async () => {
        if (!selectedMethod) return;

        // Basic validation
        if ((selectedCategoryType === 'credit_card' || selectedMethod.name === 'paypal') && !email) {
            setError('Email is required for this payment method');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // Construct payload based on reverse-engineered logic
            const payload = {
                sb_token_csrf: config.sb_token_csrf,
                order_id: config.token,
                final_currency: selectedMethod.payment_currency || selectedMethod.currency_convert || config.currency_def || 'IDR',
                currency_def: config.currency_def || 'IDR',
                payment_method: selectedMethod.name,
                type_payment: selectedMethod.type || selectedCategoryType || 'ewallet', // Fallback to category
                source_payment: selectedMethod.source || '',
                // These might need to be populated from the checkout form if not in session?
                // For now, assuming Sociabuzz session handles it or we pass dummy if needed
                fullname: 'Guest', // Retrieve from somewhere if possible, or maybe Sociabuzz has it in session
                account_email: email, // Added email
                document: '', // For some methods
                country: config.country || 'ID',
                country_pay: config.country || 'ID', // Just guessing
                // Clean cookie client-side too just in case
                cookie: cookie.split(/, |; /).filter(part => {
                    const [key] = part.split('=');
                    const reserved = ['path', 'domain', 'expires', 'max-age', 'samesite', 'secure', 'httponly'];
                    return key && !reserved.includes(key.toLowerCase().trim()) && part.includes('=');
                }).join('; '),
                referer: config.base_url + 'x/' + config.token, // Construct original URL
                return_url: window.location.origin + '/shop/success' // Try to force redirect back here
            };

            const res = await fetch('/api/payment/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const text = await res.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch {
                console.error('Failed to parse API response:', text);
                throw new Error('Server returned invalid response');
            }

            if (!res.ok || data.status === false) {
                // Handle validation errors from API
                if (data.errors) {
                    const firstError = Object.values(data.errors)[0] as string;
                    throw new Error(firstError || 'Payment validation failed');
                }
                throw new Error(data.message || 'Payment creation failed');
            }

            // Handle Success
            if (data.data?.redirect_url) {
                window.location.href = data.data.redirect_url;
            } else if (data.data?.success_url) {
                window.location.href = data.data.success_url;
            } else {
                setPaymentResult(data);
            }

        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Payment failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-8 relative">
            {/* Payment Result Modal */}
            {paymentResult && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
                    <div className="rounded-md border border-shell-border bg-shell-bg p-6 max-w-md w-full space-y-6">
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-shell-text mb-2">Payment Created!</h3>
                            <p className="text-muted-foreground text-sm">Please complete your payment.</p>
                        </div>

                        {/* QRIS Display - QRCodeSVG package missing, commented out */}
                        {paymentResult.payment_method === 'qris' && paymentResult.data?.qr_string && (
                            <div className="flex flex-col items-center space-y-4 bg-white p-4 rounded-md">
                                {/* <QRCodeSVG value={paymentResult.data.qr_string} size={200} /> */}
                                <div className="w-[200px] h-[200px] bg-gray-200 flex items-center justify-center text-black text-xs text-center p-2">
                                    QR Code Placeholder (Package Missing)
                                </div>
                                <p className="text-black font-mono text-sm font-bold">Scan with any QRIS app</p>
                            </div>
                        )}

                        {/* Retail / VA Code Display */}
                        {(paymentResult.type_payment === 'retail_outlet' || paymentResult.type_payment === 'bank_transfer') && (
                            <div className="rounded-md border border-shell-border bg-shell-bg-alt p-4 space-y-2 text-center">
                                <p className="text-shell-text-muted text-xs uppercase tracking-wider">Payment Code / VA Number</p>
                                <div className="flex items-center justify-center gap-3">
                                    <div className="text-2xl font-mono font-bold text-shell-text tracking-widest">
                                        {paymentResult.data?.account_number || paymentResult.data?.pay_code || 'ERROR'}
                                    </div>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(paymentResult.data?.account_number || paymentResult.data?.pay_code || '')}
                                        className="p-2 hover:bg-shell-active rounded-md transition-colors text-shell-text-muted hover:text-shell-text"
                                        title="Copy Code"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                                    </button>
                                </div>
                                {paymentResult.data?.retail_outlet_name && (
                                    <p className="text-ae-cyan text-sm font-bold">{paymentResult.data.retail_outlet_name}</p>
                                )}
                            </div>
                        )}

                        {/* Expiration */}
                        {paymentResult.data?.expiration_date && (
                            <p className="text-center text-xs text-shell-text-muted">
                                Expires: {paymentResult.data.expiration_date}
                            </p>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => setPaymentResult(null)}
                                className="flex-1 py-3 rounded-md border border-shell-border bg-shell-bg-alt text-sm font-medium text-shell-text transition-colors hover:bg-shell-active"
                            >
                                Close
                            </button>
                            {paymentResult.data?.payment_link && (
                                <a
                                    href={paymentResult.data.payment_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 py-3 rounded-md bg-ae-purple text-sm font-semibold text-[#0b0b14] text-center transition-colors hover:bg-ae-cyan"
                                >
                                    Pay Now
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-shell-text">
                    Select Payment Method
                </h1>
                <p className="text-shell-text-muted">Secure payment powered by Sociabuzz</p>
            </div>

            {/* Email Input (Conditional or Always?) - Let's add it always for receipt */}
            <div className="space-y-2">
                <label htmlFor="payment-email" className="text-sm font-medium text-muted-foreground">Email for Receipt</label>
                <input
                    id="payment-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded-md border border-shell-border bg-shell-bg p-3 text-sm text-shell-text outline-none transition-colors placeholder:text-shell-text-muted/60 focus:border-shell-accent/60"
                />
            </div>

            {/* Error Message */}
            {error && (
                <div className="rounded-md border border-ae-pink/40 bg-shell-bg p-4 text-sm text-ae-pink text-center">
                    {error}
                </div>
            )}

            {/* Payment Methods Accordion */}
            <div className="space-y-3">
                {activeCategories.map((category) => (
                    <div key={category.name} className="overflow-hidden rounded-md border border-shell-border bg-shell-bg">
                        <button
                            onClick={() => setOpenCategory(openCategory === category.name ? null : category.name)}
                            aria-expanded={openCategory === category.name}
                            className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-shell-active/60"
                        >
                            <div className="flex items-center gap-3">
                                {getCategoryIcon(category.name)}
                                <span className="text-sm font-medium text-shell-text">
                                    {category.alias || formatCategoryName(category.name)}
                                </span>
                            </div>
                            <ChevronDown
                                className={`h-4 w-4 shrink-0 text-shell-text-muted transition-transform ${openCategory === category.name ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>

                        <AnimatePresence>
                            {openCategory === category.name && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="grid gap-2 p-4 pt-0">
                                        {category.available.map((method) => (
                                            <button
                                                key={method.name}
                                                onClick={() => handleSelectMethod(method, category.name)} // Update handler
                                                aria-pressed={selectedMethod?.name === method.name}
                                                className={`relative flex items-center justify-between rounded-md border p-4 transition-colors ${selectedMethod?.name === method.name
                                                    ? 'border-shell-accent/60 bg-shell-active'
                                                    : 'border-shell-border bg-shell-bg-alt hover:border-shell-accent/40 hover:bg-shell-active/60'
                                                    }`}
                                            >
                                                <div className="flex min-w-0 flex-1 items-center gap-4">
                                                    <div className="relative flex h-8 w-12 flex-shrink-0 items-center justify-center rounded border border-shell-border bg-white p-1">
                                                        {/* Use the scraped icon URL — white bg required for logo legibility */}
                                                        {method.icon || method.logo ? (
                                                            // eslint-disable-next-line @next/next/no-img-element
                                                            <img
                                                                src={method.icon || `https://storage.sociabuzz.com/storage/payment/logo/${method.logo}`}
                                                                alt={method.alias || method.name}
                                                                className="max-h-full max-w-full object-contain"
                                                            />
                                                        ) : (
                                                            <div className="h-full w-full rounded bg-gray-200" />
                                                        )}
                                                    </div>
                                                    <div className="min-w-0 text-left">
                                                        <div className="truncate text-sm font-medium text-shell-text">
                                                            {method.alias || method.name}
                                                        </div>
                                                        {method.total_fee && parseFloat(method.total_fee) > 0 && (
                                                            <div className="truncate font-mono text-[11px] text-shell-text-muted">
                                                                Fee: {config.currency_def} {method.total_fee}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="ml-2 flex-shrink-0 text-right font-mono text-sm font-bold text-shell-text">
                                                    {paymentData.currency_convert} {method.total_pay}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="pt-4 space-y-4">
                <button
                    type="button"
                    onClick={handlePayment}
                    disabled={!selectedMethod || isLoading}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-ae-purple text-sm font-semibold text-[#0b0b14] transition-colors hover:bg-ae-cyan disabled:opacity-50"
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                            Processing...
                        </span>
                    ) : (
                        `Pay ${selectedMethod ? `${paymentData.currency_convert} ${selectedMethod.total_pay}` : ''}`
                    )}
                </button>

                <div className="flex items-center justify-center gap-2 font-mono text-[11px] text-shell-text-muted">
                    <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                    <span>Securely processed by Sociabuzz</span>
                </div>
            </div>
        </div>
    );
}

function getCategoryIcon(name: string) {
    if (name.includes('wallet') || name.includes('qris')) return <Smartphone className="h-4 w-4 text-syn-blue" />;
    if (name.includes('bank')) return <Wallet className="h-4 w-4 text-syn-magenta" />;
    if (name.includes('card')) return <CreditCard className="h-4 w-4 text-syn-teal" />;
    if (name.includes('crypto')) return <ShieldCheck className="h-4 w-4 text-syn-orange" />;
    return <Wallet className="h-4 w-4 text-shell-text-muted" />;
}

function formatCategoryName(name: string) {
    return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
