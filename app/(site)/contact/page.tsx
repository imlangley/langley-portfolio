'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, MapPin, Mail, MessageSquare } from 'lucide-react'

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setStatus('submitting')
        // Simulate delay
        setTimeout(() => {
            setStatus('success')
            setTimeout(() => setStatus('idle'), 3000)
        }, 1500)
    }

    return (
        <div className="min-h-screen pt-32 pb-20">
            <div className="container max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-12">

                {/* Contact Info (Left) */}
                <div className="md:col-span-5 space-y-10">
                    <div className="space-y-4">
                        <h1 className="text-5xl font-extrabold tracking-tight">Let's Talk</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Have a visionary project? I'd love to hear about it. Fill out the form or email me directly.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Email Me</p>
                                <p className="text-lg font-semibold">hello@langley.page</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border">
                            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Location</p>
                                <p className="text-lg font-semibold">Remote / Worldwide</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form (Right) */}
                <div className="md:col-span-7">
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-8 md:p-10 rounded-3xl bg-card border border-border shadow-xl space-y-8"
                    >
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-2xl font-bold">Project Form</h3>
                                <p className="text-muted-foreground">Tell me a bit about what you need.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-bold ml-1">Name</label>
                                    <input
                                        id="name"
                                        className="w-full px-4 py-4 rounded-xl bg-muted/50 border border-border focus:border-primary focus:bg-background outline-none transition-all placeholder:text-muted-foreground/50"
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-bold ml-1">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        className="w-full px-4 py-4 rounded-xl bg-muted/50 border border-border focus:border-primary focus:bg-background outline-none transition-all placeholder:text-muted-foreground/50"
                                        placeholder="you@company.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="service" className="text-sm font-bold ml-1">Service</label>
                                <select
                                    id="service"
                                    className="w-full px-4 py-4 rounded-xl bg-muted/50 border border-border focus:border-primary focus:bg-background outline-none transition-all text-foreground"
                                >
                                    <option value="music">Music Video</option>
                                    <option value="commercial">Commercial Edit</option>
                                    <option value="vfx">Visual Effects</option>
                                    <option value="color">Color Grading</option>
                                    <option value="other">Other Inquiry</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-bold ml-1">Message</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    className="w-full px-4 py-4 rounded-xl bg-muted/50 border border-border focus:border-primary focus:bg-background outline-none transition-all resize-none placeholder:text-muted-foreground/50"
                                    placeholder="Describe your project goals, timeline, and budget..."
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'submitting' || status === 'success'}
                            className="w-full h-16 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {status === 'idle' && (
                                <>Send Inquiry <Send className="w-5 h-5" /></>
                            )}
                            {status === 'submitting' && (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            )}
                            {status === 'success' && (
                                <>Message Sent! <CheckCircle className="w-6 h-6" /></>
                            )}
                        </button>
                    </motion.form>
                </div>

            </div>
        </div>
    )
}
