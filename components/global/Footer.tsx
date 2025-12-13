'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Github, Twitter, Linkedin, Instagram, Folder, Film, Layers, Monitor, Cpu, ExternalLink, Globe } from 'lucide-react'

// Helper to map platform names to icons
const getSocialIcon = (platform: string) => {
    switch (platform?.toLowerCase()) {
        case 'github': return Github
        case 'twitter': return Twitter
        case 'linkedin': return Linkedin
        case 'instagram': return Instagram
        default: return Globe
    }
}

interface FooterProps {

    siteSettings?: any
}

export function Footer({ siteSettings }: FooterProps) {
    const currentYear = new Date().getFullYear()

    const SOCIALS = siteSettings?.socials?.map((social: any) => ({
        label: social.label,
        href: social.url,
        // Map platform string to icon component dynamically or fallback
        icon: getSocialIcon(social.platform),
    })) || []

    // After Effects style compositions
    const COMPOSITIONS = [
        { id: 1, name: 'Portfolio_Main.aep', duration: '00:00:30:00', layers: 24, status: 'active' },
        { id: 2, name: 'Hero_Section.aep', duration: '00:00:15:00', layers: 12, status: 'ready' },
        { id: 3, name: 'Projects_Gallery.aep', duration: '00:00:45:00', layers: 36, status: 'ready' },
    ]

    return (
        <footer className="w-full bg-shell-bg-alt border-t border-shell-border font-sans text-xs select-none relative z-10">

            {/* Project Panel Header - After Effects Style */}
            <div className="flex items-center justify-between px-4 py-2 bg-shell-bg border-b border-shell-border">
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded bg-gradient-to-br from-[#9999FF] to-[#D291FF] flex items-center justify-center">
                        <Layers className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-[10px] font-bold text-shell-text uppercase tracking-widest">Project Panel</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-shell-text-muted">
                    <span className="px-2 py-0.5 rounded bg-[#9999FF]/20 text-[#9999FF] font-medium">AE 2024</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">

                {/* LEFT: Compositions Panel - After Effects Style */}
                <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-shell-border">
                    {/* Folder Header */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-shell-surface border-b border-shell-border/50">
                        <Folder className="w-3.5 h-3.5 text-[#9999FF]" />
                        <span className="text-[10px] text-shell-text font-medium">Compositions</span>
                        <span className="text-[10px] text-shell-text-muted ml-auto">{COMPOSITIONS.length} items</span>
                    </div>

                    {/* Composition Items */}
                    <div className="divide-y divide-shell-border/30">
                        {COMPOSITIONS.map((comp, index) => (
                            <motion.div
                                key={comp.id}
                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-shell-surface/50 transition-colors group cursor-default"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {/* Comp Icon */}
                                <div className={`relative w-5 h-5 rounded flex items-center justify-center ${comp.status === 'active'
                                    ? 'bg-[#9999FF]/30 border border-[#9999FF]'
                                    : 'bg-shell-surface border border-shell-border'
                                    }`}>
                                    <Film className={`w-3 h-3 ${comp.status === 'active' ? 'text-[#9999FF]' : 'text-shell-text-muted'}`} />
                                    {comp.status === 'active' && (
                                        <motion.div
                                            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500"
                                            animate={{ opacity: [1, 0.5, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                    )}
                                </div>

                                {/* Comp Name */}
                                <div className="flex-1 min-w-0">
                                    <span className="font-mono text-shell-text text-[11px] truncate block group-hover:text-[#9999FF] transition-colors">
                                        {comp.name}
                                    </span>
                                </div>

                                {/* Layers Count */}
                                <div className="flex items-center gap-1 text-[10px] text-shell-text-muted">
                                    <Layers className="w-3 h-3" />
                                    <span>{comp.layers}</span>
                                </div>

                                {/* Duration / Timecode */}
                                <div className="font-mono text-[10px] text-shell-text-muted w-24 text-right">
                                    {comp.duration}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* RAM Preview Status Bar */}
                    <div className="flex items-center gap-4 px-4 py-2 bg-shell-bg border-t border-shell-border/50 text-[10px]">
                        <div className="flex items-center gap-1.5">
                            <motion.div
                                className="w-2 h-2 rounded-full bg-green-500"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="text-shell-text-muted">RAM Preview:</span>
                            <span className="text-green-500 font-medium">Ready</span>
                        </div>
                        <div className="h-3 w-px bg-shell-border" />
                        <div className="flex items-center gap-1.5">
                            <Monitor className="w-3 h-3 text-shell-text-muted" />
                            <span className="text-shell-text-muted">Full</span>
                        </div>
                        <div className="h-3 w-px bg-shell-border" />
                        <div className="flex items-center gap-1.5">
                            <Cpu className="w-3 h-3 text-shell-text-muted" />
                            <span className="text-shell-text-muted">30 fps</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Quick Links & Meta */}
                <div className="lg:col-span-5 bg-shell-surface p-2 flex flex-col justify-between gap-6">

                    {/* Navigation */}
                    <div className="space-y-3">
                        <h4 className="text-[10px] uppercase tracking-widest text-shell-text-muted font-bold flex items-center gap-2">
                            <span>Quick Access</span>
                            <div className="h-px bg-shell-border flex-1" />
                        </h4>
                        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer navigation">
                            <Link href="/projects" className="text-shell-text-muted hover:text-[#9999FF] transition-colors flex items-center gap-1.5 text-[11px]">
                                <ExternalLink className="w-3 h-3" /> Projects
                            </Link>
                            <Link href="/about" className="text-shell-text-muted hover:text-[#9999FF] transition-colors flex items-center gap-1.5 text-[11px]">
                                <ExternalLink className="w-3 h-3" /> About
                            </Link>
                            <Link href="/contact" className="text-shell-text-muted hover:text-[#9999FF] transition-colors flex items-center gap-1.5 text-[11px]">
                                <ExternalLink className="w-3 h-3" /> Contact
                            </Link>
                        </nav>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-3">
                        <h4 className="text-[10px] uppercase tracking-widest text-shell-text-muted font-bold flex items-center gap-2">
                            <span>Connect</span>
                            <div className="h-px bg-shell-border flex-1" />
                        </h4>
                        <nav className="flex gap-2" aria-label="Social media links">
                            {SOCIALS.map((social: { label: string; href: string; icon: any }, i: number) => (
                                <motion.a
                                    key={social.label || i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 rounded-lg bg-shell-bg border border-shell-border flex items-center justify-center text-shell-text-muted hover:text-[#9999FF] hover:border-[#9999FF]/50 hover:bg-[#9999FF]/10 transition-all"
                                    aria-label={social.label}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </nav>
                    </div>

                    {/* Copyright */}
                    <div className="pt-3 border-t border-shell-border flex items-center justify-between text-[10px] text-shell-text-muted font-mono">
                        <span>© {currentYear} {siteSettings?.footerText || 'Langley'}</span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9999FF]" />
                            v2.0.4 [AE]
                        </span>
                    </div>

                </div>
            </div>

            {/* Mobile bottom spacing to account for fixed bottom navigation */}
            <div className="md:h-6 bg-shell-surface shrink-0" />
        </footer>
    )
}
