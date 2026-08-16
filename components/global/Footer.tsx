'use client'

import Link from 'next/link'
import { Github, Twitter, Linkedin, Instagram, Globe } from 'lucide-react'
import type { SiteSettings, SocialLink } from '@/sanity/lib/fetch'

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
    siteSettings?: SiteSettings | null
}

export function Footer({ siteSettings }: FooterProps) {
    const currentYear = new Date().getFullYear()

    const SOCIALS = siteSettings?.socials?.map((social: SocialLink) => ({
        label: social.label,
        href: social.url,
        icon: getSocialIcon(social.platform),
    })) || []

    return (
        <footer className="border-t border-shell-border py-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                    <span
                        className="flex h-6 w-6 items-center justify-center rounded bg-ae-purple text-[10px] font-black text-[#0b0b14]"
                        aria-hidden="true"
                    >
                        Ae
                    </span>
                    <span className="text-sm font-semibold text-shell-text">
                        {siteSettings?.footerText || 'Langley'}
                    </span>
                </div>

                <nav className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Footer navigation">
                    <Link href="/projects" className="text-sm text-shell-text-muted transition-colors hover:text-shell-text">
                        Projects
                    </Link>
                    <Link href="/about" className="text-sm text-shell-text-muted transition-colors hover:text-shell-text">
                        About
                    </Link>
                    <Link href="/shop" className="text-sm text-shell-text-muted transition-colors hover:text-shell-text">
                        Shop
                    </Link>
                    <Link href="/uptime" className="text-sm text-shell-text-muted transition-colors hover:text-shell-text">
                        Status
                    </Link>
                    {SOCIALS.map((social, i) => (
                        <a
                            key={social.label || i}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="text-shell-text-muted transition-colors hover:text-shell-text"
                        >
                            <social.icon className="h-4 w-4" />
                        </a>
                    ))}
                </nav>

                <p className="font-mono text-[11px] text-shell-text-muted">
                    © {currentYear} Langley
                </p>
            </div>
        </footer>
    )
}
