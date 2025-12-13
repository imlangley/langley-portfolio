'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, CreditCard, Wallet, Smartphone, ShieldCheck, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { ShimmerButton } from '@/components/reactbits';
import { QRCodeSVG } from 'qrcode.react';

interface PaymentMethod {
    name: string;
    alias: string;
    logo?: string;
    icon?: string;
    total_fee?: string;
    total_pay?: string;
    show?: boolean;
    active?: boolean;
    // Add other fields as needed
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

export function PaymentInterface({ config, paymentData, cookie }: PaymentInterfaceProps) {
    const [selectedMethod, setSelectedMethod] = useState<any>(null);
    const [selectedCategoryType, setSelectedCategoryType] = useState<string>('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [openCategory, setOpenCategory] = useState<string | null>('ewallet');
    const [paymentResult, setPaymentResult] = useState<any>(null);

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
                        // Redirect to success page
                        const successUrl = `/shop/success?url=${encodeURIComponent(checkUrl)}&cookie=${encodeURIComponent(cookie)}`;
                        window.location.href = successUrl;
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
    }, [paymentResult, config, cookie]);

    // Filter categories that have available methods
    const activeCategories = paymentData.payment_channel.filter(
        cat => cat.available && cat.available.length > 0 && cat.available.some(m => m.show !== false)
    );

    const handleSelectMethod = (method: any, categoryName: string) => {
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
            } catch (e) {
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

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Payment failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-8 relative">
            {/* Payment Result Modal */}
            {paymentResult && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-6">
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-white mb-2">Payment Created!</h3>
                            <p className="text-zinc-400 text-sm">Please complete your payment.</p>
                        </div>

                        {/* QRIS Display */}
                        {paymentResult.payment_method === 'qris' && paymentResult.data?.qr_string && (
                            <div className="flex flex-col items-center space-y-4 bg-white p-4 rounded-xl">
                                <QRCodeSVG value={paymentResult.data.qr_string} size={200} />
                                <p className="text-black font-mono text-sm font-bold">Scan with any QRIS app</p>
                            </div>
                        )}

                        {/* Retail / VA Code Display */}
                        {(paymentResult.type_payment === 'retail_outlet' || paymentResult.type_payment === 'bank_transfer') && (
                            <div className="bg-zinc-800 p-4 rounded-xl space-y-2 text-center">
                                <p className="text-zinc-400 text-xs uppercase tracking-wider">Payment Code / VA Number</p>
                                <div className="flex items-center justify-center gap-3">
                                    <div className="text-2xl font-mono font-bold text-white tracking-widest">
                                        {paymentResult.data?.account_number || paymentResult.data?.pay_code || 'ERROR'}
                                    </div>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(paymentResult.data?.account_number || paymentResult.data?.pay_code || '')}
                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-400 hover:text-white"
                                        title="Copy Code"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                                    </button>
                                </div>
                                {paymentResult.data?.retail_outlet_name && (
                                    <p className="text-blue-400 text-sm font-bold">{paymentResult.data.retail_outlet_name}</p>
                                )}
                            </div>
                        )}

                        {/* Expiration */}
                        {paymentResult.data?.expiration_date && (
                            <p className="text-center text-xs text-zinc-500">
                                Expires: {paymentResult.data.expiration_date}
                            </p>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => setPaymentResult(null)}
                                className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors font-medium"
                            >
                                Close
                            </button>
                            {paymentResult.data?.payment_link && (
                                <a
                                    href={paymentResult.data.payment_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white text-center rounded-lg font-bold transition-colors"
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
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    Select Payment Method
                </h1>
                <p className="text-zinc-500">Secure payment powered by Sociabuzz</p>
            </div>

            {/* Email Input (Conditional or Always?) - Let's add it always for receipt */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Email for Receipt</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                    {error}
                </div>
            )}

            {/* Payment Methods Accordion */}
            <div className="space-y-4">
                {activeCategories.map((category) => (
                    <div key={category.name} className="border border-white/5 rounded-xl bg-zinc-900/50 overflow-hidden">
                        <button
                            onClick={() => setOpenCategory(openCategory === category.name ? null : category.name)}
                            className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                {getCategoryIcon(category.name)}
                                <span className="font-medium text-zinc-200">
                                    {category.alias || formatCategoryName(category.name)}
                                </span>
                            </div>
                            <ChevronDown
                                className={`w-5 h-5 text-zinc-500 transition-transform ${openCategory === category.name ? 'rotate-180' : ''
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
                                    <div className="p-4 pt-0 grid gap-3">
                                        {category.available.map((method) => (
                                            <button
                                                key={method.name}
                                                onClick={() => handleSelectMethod(method, category.name)} // Update handler
                                                className={`relative flex items-center justify-between p-4 rounded-lg border transition-all ${selectedMethod?.name === method.name
                                                    ? 'bg-blue-500/10 border-blue-500/50 ring-1 ring-blue-500/50'
                                                    : 'bg-black/20 border-white/5 hover:border-white/10 hover:bg-white/5'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                                    <div className="w-12 h-8 relative bg-white rounded flex-shrink-0 flex items-center justify-center p-1">
                                                        {/* Use the scraped icon URL */}
                                                        {method.icon || method.logo ? (
                                                            <img
                                                                src={method.icon || `https://storage.sociabuzz.com/storage/payment/logo/${method.logo}`}
                                                                alt={method.alias || method.name}
                                                                className="max-w-full max-h-full object-contain"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-zinc-200 rounded" />
                                                        )}
                                                    </div>
                                                    <div className="text-left min-w-0">
                                                        <div className="text-sm font-medium text-white truncate">
                                                            {method.alias || method.name}
                                                        </div>
                                                        {method.total_fee && parseFloat(method.total_fee) > 0 && (
                                                            <div className="text-xs text-zinc-500 truncate">
                                                                Fee: {config.currency_def} {method.total_fee}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-right flex-shrink-0 ml-2">
                                                    <div className="text-sm font-bold text-white">
                                                        {paymentData.currency_convert} {method.total_pay}
                                                    </div>
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
                <ShimmerButton
                    onClick={handlePayment}
                    disabled={!selectedMethod || isLoading}
                    className="w-full h-14 text-lg font-medium"
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                        </span>
                    ) : (
                        `Pay ${selectedMethod ? `${paymentData.currency_convert} ${selectedMethod.total_pay}` : ''}`
                    )}
                </ShimmerButton>

                <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Securely processed by Sociabuzz</span>
                </div>
            </div>
        </div>
    );
}

function getCategoryIcon(name: string) {
    if (name.includes('wallet') || name.includes('qris')) return <Smartphone className="w-5 h-5 text-blue-400" />;
    if (name.includes('bank')) return <Wallet className="w-5 h-5 text-purple-400" />;
    if (name.includes('card')) return <CreditCard className="w-5 h-5 text-emerald-400" />;
    if (name.includes('crypto')) return <ShieldCheck className="w-5 h-5 text-orange-400" />;
    return <Wallet className="w-5 h-5 text-zinc-400" />;
}

function formatCategoryName(name: string) {
    return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
