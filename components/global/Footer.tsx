'use client'

import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

// You would typically fetch these from Sanity, but basic social icons map is easier static
// or passed as props.
const socials = [
    { name: 'GitHub', href: 'https://github.com', icon: Github },
    // Add others as needed
]

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t bg-background/50 backdrop-blur-sm">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <Link href="/" className="text-xl font-bold tracking-tighter">
                            Langley<span className="text-primary">.</span>
                        </Link>
                        <p className="text-muted-foreground text-sm">
                            Crafting visual narratives that captivate.
                        </p>
                    </div>

                    {/* Sitemaps */}
                    <div className="col-span-1">
                        <h3 className="font-semibold mb-4">Explore</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/projects" className="hover:text-primary">Projects</Link></li>
                            <li><Link href="/services" className="hover:text-primary">Services</Link></li>
                            <li><Link href="/about" className="hover:text-primary">About</Link></li>
                            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Socials Placeholder - dynamic socials come from Site Settings */}
                    <div className="col-span-1">
                        <h3 className="font-semibold mb-4">Connect</h3>
                        <div className="flex gap-4">
                            {/* This will be hydrated by real data in layout/page, 
                  but here we provide static fallbacks or structure */}
                            <a href="mailto:hello@langley.page" className="text-muted-foreground hover:text-primary">
                                <Mail className="h-5 w-5" />
                            </a>
                            {/* GitHub etc */}
                        </div>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>© {currentYear} Langley. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
