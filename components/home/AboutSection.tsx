'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SplitText, Magnet, ShinyText } from '@/components/reactbits'
import { urlFor } from '@/sanity/lib/image'
import type { Profile } from '@/sanity/lib/fetch'
import { useCursor } from '@/context/CursorContext'

interface AboutSectionProps {
    profile: Profile | null
}

export function AboutSection({ profile }: AboutSectionProps) {
    const { setCursorVariant } = useCursor()

    if (!profile) {
        return null
    }

    const skills = ['Video Editing', 'Motion Graphics', 'Web Development', 'Creative Direction']

    return (
        <section className="relative py-24 px-6">
            {/* Background accent */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto relative">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Avatar/Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="relative"
                    >
                        <div className="relative aspect-square max-w-md mx-auto">
                            {/* Decorative frame */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl" />
                            <div className="absolute -inset-2 border border-border rounded-xl" />
                            
                            {/* Main image container */}
                            <div className="relative aspect-square rounded-lg overflow-hidden bg-card border border-border">
                                {profile.avatarImage?.asset ? (
                                    <Image
                                        src={urlFor(profile.avatarImage).width(500).height(500).url()}
                                        alt={profile.name || 'Profile'}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-card">
                                        <span className="text-8xl font-bold text-muted-foreground">
                                            {profile.name?.charAt(0) || 'L'}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Floating role badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="absolute -bottom-4 -right-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-lg shadow-blue-500/30"
                            >
                                {profile.role || 'Creative Professional'}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <div className="space-y-6">
                        {/* Section Label */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2"
                        >
                            <div className="w-8 h-px bg-blue-500" />
                            <span className="text-blue-400 text-sm font-mono uppercase tracking-wider">
                                About Me
                            </span>
                        </motion.div>

                        {/* Name */}
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                            <SplitText
                                text={profile.name || 'Hello, I\'m Langley'}
                                delay={0.2}
                                animationFrom={{ opacity: 0, y: 30 }}
                                animationTo={{ opacity: 1, y: 0 }}
                                textAlign="left"
                            />
                        </h2>

                        {/* Bio */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-lg text-muted-foreground leading-relaxed"
                        >
                            {profile.shortBio || 'A passionate creator working at the intersection of video editing and web development.'}
                        </motion.p>

                        {/* Skills tags */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap gap-2"
                        >
                            {skills.map((skill, index) => (
                                <motion.span
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className="px-3 py-1.5 bg-secondary border border-border rounded-full text-sm text-muted-foreground hover:bg-secondary/80 hover:border-primary/30 transition-colors"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="pt-4"
                        >
                            <Magnet magnetStrength={0.3}>
                                <Link
                                    href="/about"
                                    onMouseEnter={() => setCursorVariant('button')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-border hover:border-primary rounded-lg text-foreground font-medium transition-all duration-300 group hover:shadow-lg hover:shadow-primary/10"
                                >
                                    <ShinyText
                                        text="Learn More About Me"
                                        speed={4}
                                        className="text-muted-foreground group-hover:text-foreground"
                                    />
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Magnet>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection
