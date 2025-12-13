
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Loader2, Lock, ShieldCheck } from 'lucide-react'
import { ShimmerButton } from '@/components/reactbits'

interface CheckoutModalProps {
    isOpen: boolean
    onClose: () => void
    slug: string
    title: string
    price: string
}

export function CheckoutModal({ isOpen, onClose, slug, title, price }: CheckoutModalProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    // Form State
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        whatsapp: '',
        isAdult: false
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    slug,
                    ...formData
                })
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Checkout failed')
            }

            if (data.redirectUrl) {
                // If it's a success URL (free item), redirect to internal success page
                if (data.redirectUrl.includes('/payment/success')) {
                    const targetUrl = encodeURIComponent(data.redirectUrl)
                    const cookieParam = data.sessionCookie ? `&cookie=${encodeURIComponent(data.sessionCookie)}` : ''
                    window.location.href = `/shop/success?url=${targetUrl}${cookieParam}`
                } else {
                    // Paid item or other flow, go external
                    window.location.href = data.redirectUrl
                }
            } else {
                throw new Error('No redirect URL returned')
            }

        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Something went wrong. Please try again.')
            setIsLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-zinc-900/50">
                            <div>
                                <h3 className="text-xl font-bold text-white">Checkout</h3>
                                <p className="text-sm text-zinc-400 mt-1">{title}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            {error && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                                        placeholder="John Doe"
                                        value={formData.fullname}
                                        onChange={e => setFormData({ ...formData, fullname: e.target.value })}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-zinc-400 mb-1.5">WhatsApp (Optional)</label>
                                    <input
                                        type="tel"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                                        placeholder="+62..."
                                        value={formData.whatsapp}
                                        onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="pt-2">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="relative flex items-center mt-0.5">
                                            <input
                                                required
                                                type="checkbox"
                                                className="peer sr-only"
                                                checked={formData.isAdult}
                                                onChange={e => setFormData({ ...formData, isAdult: e.target.checked })}
                                                disabled={isLoading}
                                            />
                                            <div className="w-5 h-5 border border-white/20 rounded bg-black/40 peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors flex items-center justify-center">
                                                <svg className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors leading-tight">
                                            I confirm that I am 18 years or older and agree to the terms of service.
                                        </span>
                                    </label>
                                </div>

                                <div className="pt-6">
                                    <ShimmerButton
                                        type="submit"
                                        disabled={isLoading || !formData.isAdult}
                                        className="w-full h-12 text-sm disabled:opacity-50 disabled:cursor-not-allowed justify-center"
                                        onClick={() => { }} // handled by form submit
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Processing...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Proceed to Payment
                                                <Lock className="w-4 h-4" />
                                            </span>
                                        )}
                                    </ShimmerButton>

                                    <p className="text-center text-[10px] text-zinc-500 mt-4 flex items-center justify-center gap-1.5">
                                        <ShieldCheck className="w-3 h-3" />
                                        Securely processed by Sociabuzz
                                    </p>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
