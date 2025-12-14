'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { TerminalSquare, Settings2, Laptop, MapPin, Calendar, Clock, ChevronDown, Quote, MessageSquare, Download, Sparkles, HelpCircle } from 'lucide-react'
import {
    AnimatedAvatar,
    AnimatedCounter,
    ShimmerButton,
    RotatingText,
    DecryptedText,
    SplitText,
    TiltedCard,
    Accordion,
    Magnet
} from '@/components/reactbits'

interface Tool {
    _id: string
    name: string
    iconUrl: string | null
}

interface Testimonial {
    _id: string
    name: string
    role?: string
    testimonialBody: any
    avatarUrl: string | null
}

interface FaqItem {
    question: string
    answer: any
}

interface AboutPageClientProps {
    displayName: string
    displayRole: string
    avatarUrl: string | null
    shortBio?: string
    longBio?: any
    faqItems?: FaqItem[]
    tools: Tool[]
    projectsCount: number
    yearsExperience: number
}

export function AboutPageClient({
    displayName,
    displayRole,
    avatarUrl,
    shortBio,
    longBio,
    faqItems,
    tools,
    projectsCount,
    yearsExperience
}: AboutPageClientProps) {

    // Stats for the counter animations
    const stats = [
        { value: projectsCount, label: 'Projects', suffix: '+' },
        { value: yearsExperience, label: 'Years Experience', suffix: '+' },
        { value: 100, label: 'Happy Clients', suffix: '%' },
        { value: 24, label: 'Hour Support', suffix: '/7' },
    ]

    // Convert FAQ items to accordion format
    const accordionItems = faqItems?.map((item, i) => ({
        id: `faq-${i}`,
        title: item.question,
        icon: <HelpCircle className="w-4 h-4" />,
        content: (
            <div className="prose prose-sm dark:prose-invert max-w-none">
                <PortableText value={item.answer} />
            </div>
        )
    })) || []

    return (
        <div className="min-h-screen bg-background pt-10 pb-20 px-4 md:px-8 overflow-x-hidden">
            <div className="max-w-7xl mx-auto overflow-hidden">

                {/* Hero Section with Avatar and Title */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Animated Avatar */}
                    <div className="flex justify-center mb-8">
                        {avatarUrl ? (
                            <AnimatedAvatar
                                src={avatarUrl}
                                alt={displayName}
                                size={180}
                            />
                        ) : (
                            <motion.div
                                className="w-44 h-44 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                            >
                                <span className="text-6xl font-bold text-primary-foreground">
                                    {displayName[0]}
                                </span>
                            </motion.div>
                        )}
                    </div>

                    {/* Name with DecryptedText effect */}
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold text-foreground mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <DecryptedText
                            text={displayName}
                            speed={80}
                        />
                    </motion.h1>

                    {/* Role with RotatingText */}
                    <div className="flex items-center justify-center gap-2 text-xl text-muted-foreground mb-6">
                        <span>I&apos;m a</span>
                        <RotatingText
                            texts={[displayRole, 'Creative Director', 'Problem Solver', 'Tech Enthusiast']}
                            mainClassName="text-primary font-semibold"
                            rotationInterval={3000}
                            staggerDuration={0.02}
                        />
                    </div>

                    {/* Short Bio */}
                    {shortBio && (
                        <motion.p
                            className="max-w-2xl mx-auto text-muted-foreground text-lg"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            {shortBio}
                        </motion.p>
                    )}

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mt-8 w-full max-w-md mx-auto sm:max-w-none sm:w-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <ShimmerButton href="/contact">
                            <Sparkles className="w-4 h-4" />
                            Let&apos;s Work Together
                        </ShimmerButton>

                        <Magnet padding={0} className="w-full sm:w-auto">
                            <motion.a
                                href="/resume.pdf"
                                download
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-border text-foreground font-semibold hover:border-primary hover:text-primary transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Download className="w-4 h-4" />
                                Download CV
                            </motion.a>
                        </Magnet>
                    </motion.div>
                </motion.div>

                {/* Stats Section with Animated Counters */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className="text-center p-6 rounded-2xl bg-card border border-border"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -4, borderColor: 'hsl(var(--primary))' }}
                        >
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                                <AnimatedCounter
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    duration={2}
                                />
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT: Properties Panel (Stats) */}
                    <motion.div
                        className="lg:col-span-4 space-y-px bg-card border border-border select-none h-fit"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* Panel Header */}
                        <div className="h-9 bg-muted flex items-center px-4 justify-between border-b border-border">
                            <span className="text-xs font-medium text-foreground uppercase tracking-widest flex items-center gap-2">
                                <Settings2 className="w-3.5 h-3.5" /> Properties
                            </span>
                            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                        </div>

                        {/* Stats Grid */}
                        <div className="p-4 space-y-6">
                            {/* Key Values */}
                            <div className="space-y-4 text-xs font-mono">
                                <motion.div
                                    className="flex justify-between items-center text-muted-foreground"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Location</span>
                                    <span className="text-foreground">Indonesia</span>
                                </motion.div>
                                <motion.div
                                    className="flex justify-between items-center text-muted-foreground"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> Timezone</span>
                                    <span className="text-foreground">GMT+7</span>
                                </motion.div>
                                <motion.div
                                    className="flex justify-between items-center text-muted-foreground"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> Joined</span>
                                    <span className="text-foreground">2020</span>
                                </motion.div>
                                <motion.div
                                    className="flex justify-between items-center text-muted-foreground"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <span className="flex items-center gap-2"><Laptop className="w-3 h-3" /> System</span>
                                    <span className="text-foreground text-right">After Effects<br />VS Code</span>
                                </motion.div>
                            </div>

                            {/* Tool Stack (Icons) */}
                            <div className="pt-2">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-3">Loaded Extensions</span>
                                <div className="flex flex-wrap gap-2">
                                    {tools.map((tool, i) => (
                                        <motion.div
                                            key={tool._id}
                                            className="w-8 h-8 bg-background border border-border rounded flex items-center justify-center hover:border-primary/50 transition-colors cursor-pointer"
                                            title={tool.name}
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05, type: 'spring', stiffness: 500 }}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                        >
                                            {tool.iconUrl ? (
                                                <Image
                                                    src={tool.iconUrl}
                                                    alt={tool.name}
                                                    width={16}
                                                    height={16}
                                                    className="opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                                                />
                                            ) : (
                                                <span className="text-[10px] font-bold text-muted-foreground">{tool.name[0]}</span>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT: Terminal (Bio) */}
                    <motion.div
                        className="lg:col-span-8 bg-background font-mono text-sm border border-border flex flex-col min-h-[500px]"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* Terminal Header */}
                        <div className="h-9 bg-card flex items-center px-4 gap-4 border-b border-border">
                            <div className="flex items-center gap-2 text-foreground border-b-2 border-primary h-full px-2 bg-background">
                                <TerminalSquare className="w-3.5 h-3.5" />
                                <span className="text-xs uppercase">Terminal</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground h-full px-2 hover:text-foreground cursor-pointer transition-colors">
                                <span className="text-xs uppercase">Output</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground h-full px-2 hover:text-foreground cursor-pointer transition-colors">
                                <span className="text-xs uppercase">Debug Console</span>
                            </div>
                        </div>

                        {/* Terminal Content */}
                        <div className="flex-1 p-6 text-foreground overflow-y-auto space-y-6">
                            {/* Command 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex gap-2 text-primary mb-2">
                                    <span>➜</span>
                                    <span className="text-yellow-500 dark:text-yellow-400">~</span>
                                    <span>cat</span>
                                    <span className="text-muted-foreground">bio.txt</span>
                                </div>
                                <div className="pl-4 border-l-2 border-border text-muted-foreground leading-relaxed max-w-2xl">
                                    {longBio ? (
                                        <PortableText value={longBio} />
                                    ) : (
                                        <p>Loading editor profile configuration...</p>
                                    )}
                                </div>
                            </motion.div>

                            {/* Blinking Cursor */}
                            <div className="flex gap-2 text-primary">
                                <span>➜</span>
                                <span className="text-yellow-500 dark:text-yellow-400">~</span>
                                <motion.span
                                    className="w-2 h-5 bg-muted-foreground"
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* FAQ Section with Accordion */}
                {accordionItems.length > 0 && (
                    <motion.div
                        className="mt-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-center mb-8">
                            <SplitText
                                text="Frequently Asked Questions"
                                className="text-2xl md:text-3xl font-bold text-foreground"
                                delay={50}
                            />
                        </div>
                        <div className="max-w-3xl mx-auto">
                            <Accordion items={accordionItems} />
                        </div>
                    </motion.div>
                )}


            </div>
        </div>
    )
}
