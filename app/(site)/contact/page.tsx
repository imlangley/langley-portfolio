'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Send, CheckCircle, MapPin, Mail, MessageSquare, Sparkles, AlertCircle } from 'lucide-react'
import {
    AnimatedInput,
    AnimatedTextarea,
    SplitText,
    ShimmerButton,
    DecryptedText,
    Magnet,
    StarBorder
} from '@/components/reactbits'

// Confetti component for success state
function Confetti() {
    const colors = ['#f97316', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899']

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                        backgroundColor: colors[i % colors.length],
                        left: `${50 + (Math.random() - 0.5) * 10}%`,
                        top: '50%',
                    }}
                    initial={{
                        y: 0,
                        x: 0,
                        scale: 0,
                        rotate: 0
                    }}
                    animate={{
                        y: -400 - Math.random() * 400,
                        x: (Math.random() - 0.5) * 800,
                        scale: [0, 1, 1, 0],
                        rotate: Math.random() * 720 - 360,
                    }}
                    transition={{
                        duration: 2 + Math.random(),
                        ease: [0.33, 1, 0.68, 1],
                        delay: Math.random() * 0.3,
                    }}
                />
            ))}
        </div>
    )
}

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [showConfetti, setShowConfetti] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const formRef = useRef<HTMLFormElement>(null)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setErrors({})
        setStatus('submitting')

        // Get form data
        const formData = new FormData(e.target as HTMLFormElement)
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const message = formData.get('message') as string

        // Validate
        const newErrors: Record<string, string> = {}
        if (!name || name.length < 2) newErrors.name = 'Name must be at least 2 characters'
        if (!email || !email.includes('@')) newErrors.email = 'Please enter a valid email'
        if (!message || message.length < 10) newErrors.message = 'Message must be at least 10 characters'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            setStatus('error')
            setTimeout(() => setStatus('idle'), 2000)
            return
        }

        // Simulate API call
        setTimeout(() => {
            setStatus('success')
            setShowConfetti(true)

            // Reset form
            if (formRef.current) {
                formRef.current.reset()
            }

            setTimeout(() => {
                setShowConfetti(false)
                setTimeout(() => setStatus('idle'), 1000)
            }, 3000)
        }, 1500)
    }

    return (
        <div className="min-h-screen pt-32 pb-20">
            {/* Confetti animation on success */}
            <AnimatePresence>
                {showConfetti && <Confetti />}
            </AnimatePresence>

            {/* Background elements */}
            <div className="fixed top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="fixed bottom-1/4 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10" />

            <div className="container max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-12">

                {/* Contact Info (Left) */}
                <motion.div
                    className="md:col-span-5 space-y-10"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="space-y-4">
                        <SplitText
                            text="Let's Talk"
                            className="text-5xl font-extrabold tracking-tight"
                            delay={40}
                        />
                        <motion.p
                            className="text-xl text-muted-foreground leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Have a visionary project? I&apos;d love to hear about it. Fill out the form or email me directly.
                        </motion.p>
                    </div>

                    <div className="space-y-6">
                        <motion.div
                            className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border group hover:border-primary/50 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ x: 4 }}
                        >
                            <motion.div
                                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary"
                                whileHover={{ scale: 1.1, rotate: 10 }}
                            >
                                <Mail className="w-5 h-5" />
                            </motion.div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Email Me</p>
                                <p className="text-lg font-semibold">hello@langley.page</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border group hover:border-primary/50 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ x: 4 }}
                        >
                            <motion.div
                                className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent"
                                whileHover={{ scale: 1.1, rotate: -10 }}
                            >
                                <MapPin className="w-5 h-5" />
                            </motion.div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Location</p>
                                <p className="text-lg font-semibold">Remote / Worldwide</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border group hover:border-primary/50 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ x: 4 }}
                        >
                            <motion.div
                                className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500"
                                whileHover={{ scale: 1.1, rotate: 10 }}
                            >
                                <MessageSquare className="w-5 h-5" />
                            </motion.div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                                <p className="text-lg font-semibold">Within 24 Hours</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Contact Form (Right) */}
                <motion.div
                    className="md:col-span-7"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <StarBorder color="hsl(var(--primary))" speed={15}>
                        <motion.form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="p-5 md:p-10 rounded-2xl bg-card space-y-8"
                            animate={status === 'error' ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">
                                    <DecryptedText text="Project Form" speed={60} />
                                </h3>
                                <p className="text-muted-foreground">Tell me a bit about what you need.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <AnimatedInput
                                    name="name"
                                    label="Your Name"
                                    placeholder="John Doe"
                                    error={errors.name}
                                    required
                                />
                                <AnimatedInput
                                    name="email"
                                    type="email"
                                    label="Email Address"
                                    placeholder="you@company.com"
                                    error={errors.email}
                                    required
                                />
                            </div>

                            <motion.div
                                className="relative"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <label className="block text-sm font-medium text-muted-foreground mb-2 ml-1">
                                    Service Type
                                </label>
                                <select
                                    name="service"
                                    className="w-full px-4 py-4 rounded-xl bg-card border-2 border-border focus:border-primary outline-none transition-all text-foreground cursor-pointer"
                                >
                                    <option value="music">Music Video</option>
                                    <option value="commercial">Commercial Edit</option>
                                    <option value="vfx">Visual Effects</option>
                                    <option value="color">Color Grading</option>
                                    <option value="web">Web Development</option>
                                    <option value="other">Other Inquiry</option>
                                </select>
                            </motion.div>

                            <AnimatedTextarea
                                name="message"
                                label="Your Message"
                                placeholder="Describe your project goals, timeline, and budget..."
                                error={errors.message}
                                required
                            />

                            <Magnet disabled={status === 'submitting' || status === 'success'}>
                                <motion.button
                                    type="submit"
                                    disabled={status === 'submitting' || status === 'success'}
                                    className={`
                                        w-full h-14 md:h-16 rounded-xl font-bold text-base md:text-lg 
                                        flex items-center justify-center gap-2 md:gap-3 
                                        transition-all
                                        ${status === 'success'
                                            ? 'bg-green-500 text-white'
                                            : status === 'error'
                                                ? 'bg-red-500 text-white'
                                                : 'bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25'
                                        }
                                        disabled:cursor-not-allowed
                                    `}
                                    whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                                    whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                                >
                                    <AnimatePresence mode="wait">
                                        {status === 'idle' && (
                                            <motion.span
                                                key="idle"
                                                className="flex items-center gap-3"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                Send Inquiry <Send className="w-5 h-5" />
                                            </motion.span>
                                        )}
                                        {status === 'submitting' && (
                                            <motion.div
                                                key="submitting"
                                                className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                                                transition={{ rotate: { duration: 1, repeat: Infinity, ease: 'linear' } }}
                                            />
                                        )}
                                        {status === 'success' && (
                                            <motion.span
                                                key="success"
                                                className="flex items-center gap-3"
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                            >
                                                <Sparkles className="w-5 h-5" />
                                                Message Sent!
                                                <CheckCircle className="w-6 h-6" />
                                            </motion.span>
                                        )}
                                        {status === 'error' && (
                                            <motion.span
                                                key="error"
                                                className="flex items-center gap-3"
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                            >
                                                <AlertCircle className="w-5 h-5" />
                                                Please fix errors above
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </Magnet>
                        </motion.form>
                    </StarBorder>
                </motion.div>

            </div>
        </div>
    )
}
