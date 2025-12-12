'use client'

import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ExternalLink, Github, Share2, Download, Copy, Check, Twitter, Linkedin } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Magnet } from '@/components/reactbits/Magnet'

interface Tool {
    name: string
    slug: string
    icon?: { asset?: { url?: string } }
    url?: string
}

interface StickySidebarProps {
    clientName?: string
    date?: string
    role?: string
    duration?: string
    tools?: Tool[]
    liveUrl?: string
    repoUrl?: string
    accentColor?: string
    className?: string
}

export function StickySidebar({
    clientName,
    date,
    role,
    duration,
    tools,
    liveUrl,
    repoUrl,
    accentColor,
    className
}: StickySidebarProps) {
    const [copied, setCopied] = useState(false)
    const [showShareMenu, setShowShareMenu] = useState(false)

    const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    }) : null

    const handleCopyLink = async () => {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleShare = (platform: 'twitter' | 'linkedin') => {
        const url = encodeURIComponent(window.location.href)
        const title = encodeURIComponent(document.title)

        const urls = {
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        }

        window.open(urls[platform], '_blank', 'width=600,height=400')
        setShowShareMenu(false)
    }

    return (
        <aside className={cn("lg:sticky lg:top-24 space-y-6 h-fit relative z-50", className)}>
            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
                {liveUrl && (
                    <Magnet padding={50} disabled={false}>
                        <motion.a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group w-full flex items-center justify-center gap-2 h-14 rounded-xl font-bold text-lg transition-all shadow-lg"
                            style={{
                                backgroundColor: accentColor || 'var(--primary)',
                                color: 'white'
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>Visit Live Site</span>
                            <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1" />

                            {/* Shimmer Effect */}
                            <motion.div
                                className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                                    animate={{ x: ["-100%", "200%"] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 2.5,
                                        ease: "linear",
                                        repeatDelay: 2
                                    }}
                                />
                            </motion.div>
                        </motion.a>
                    </Magnet>
                )}

                {repoUrl && (
                    <Magnet padding={50} disabled={false}>
                        <motion.a
                            href={repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 h-14 rounded-xl border border-border bg-card hover:bg-secondary text-lg font-medium transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Github className="w-5 h-5" />
                            <span>View Source</span>
                        </motion.a>
                    </Magnet>
                )}
            </div>

            {/* Project Info Card */}
            <motion.div
                className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {/* Header with accent */}
                <div
                    className="h-2"
                    style={{ backgroundColor: accentColor || 'var(--primary)' }}
                />

                <div className="p-6 space-y-5">
                    {/* Client */}
                    {clientName && (
                        <div>
                            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                                Client
                            </h4>
                            <p className="text-lg font-semibold">{clientName}</p>
                        </div>
                    )}

                    {/* Timeline */}
                    {formattedDate && (
                        <>
                            <div className="h-px bg-border" />
                            <div>
                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                                    Timeline
                                </h4>
                                <p className="text-lg font-semibold">{formattedDate}</p>
                                {duration && (
                                    <p className="text-sm text-muted-foreground">{duration}</p>
                                )}
                            </div>
                        </>
                    )}

                    {/* Role */}
                    {role && (
                        <>
                            <div className="h-px bg-border" />
                            <div>
                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                                    Role
                                </h4>
                                <p className="text-lg font-semibold">{role}</p>
                            </div>
                        </>
                    )}

                    {/* Tools */}
                    {tools && tools.length > 0 && (
                        <>
                            <div className="h-px bg-border" />
                            <div>
                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                                    Tech & Tools
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {tools.map((tool) => (
                                        <motion.span
                                            key={tool.slug}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-lg text-sm font-medium border border-border/50 hover:border-border transition-colors"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {tool.icon?.asset?.url && (
                                                <Image
                                                    src={tool.icon.asset.url}
                                                    alt={tool.name}
                                                    width={16}
                                                    height={16}
                                                    className="object-contain"
                                                />
                                            )}
                                            {tool.name}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>

            {/* Share Buttons */}
            <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="flex gap-2">
                    <motion.button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-card hover:bg-secondary transition-colors font-medium"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Share2 className="w-4 h-4" />
                        Share
                    </motion.button>

                    <motion.button
                        onClick={handleCopyLink}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-card hover:bg-secondary transition-colors font-medium"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {copied ? (
                            <Check className="w-4 h-4 text-green-500" />
                        ) : (
                            <Copy className="w-4 h-4" />
                        )}
                    </motion.button>
                </div>

                {/* Share Menu */}
                {showShareMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 p-2 rounded-xl border border-border bg-card shadow-lg z-50"
                    >
                        <button
                            onClick={() => handleShare('twitter')}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                        >
                            <Twitter className="w-4 h-4" />
                            Share on X
                        </button>
                        <button
                            onClick={() => handleShare('linkedin')}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                        >
                            <Linkedin className="w-4 h-4" />
                            Share on LinkedIn
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </aside>
    )
}
