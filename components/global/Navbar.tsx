'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { ThemeToggle } from '@/components/global/ThemeToggle'
import { cn } from '@/lib/utils'
import { Home, Grid, User, LayoutGrid, Mail } from 'lucide-react'

const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Projects', href: '/projects', icon: LayoutGrid },
    { name: 'About', href: '/about', icon: User },
    // Services removed from nav to keep it clean, can be reached via about/contact
]

export function Navbar() {
    const pathname = usePathname()
    const { scrollY } = useScroll()
    const [hidden, setHidden] = useState(false)

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0
        if (latest > previous && latest > 150) {
            setHidden(true)
        } else {
            setHidden(false)
        }
    })

    return (
        <motion.header
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: -20, opacity: 0 },
            }}
            animate={hidden ? 'hidden' : 'visible'}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }} // iOS ease
            className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
        >
            <div className="pointer-events-auto flex items-center gap-4">

                {/* Brand Pill (Mobile only or Desktop) */}
                <Link href="/" className="hidden md:flex items-center justify-center w-12 h-12 rounded-full glass-heavy text-foreground hover:scale-110 transition-transform duration-300">
                    <span className="font-black text-xl tracking-tighter">L<span className="text-primary">.</span></span>
                </Link>

                {/* Main Nav Pill */}
                <nav className="glass-heavy rounded-full px-6 py-2 flex items-center gap-6 shadow-2xl shadow-primary/5">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative p-2 text-sm font-medium transition-colors hover:text-primary",
                                    isActive ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                <span className="hidden md:block">{item.name}</span>
                                <span className="md:hidden">
                                    <item.icon className="w-5 h-5" />
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-glow"
                                        className="absolute inset-0 bg-primary/10 rounded-full blur-md -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Actions Pill */}
                <div className="flex items-center gap-2 glass-heavy rounded-full p-2 pr-2 md:pr-4 pl-2">
                    <ThemeToggle />
                    <Link
                        href="/contact"
                        className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-105 active:scale-95"
                    >
                        Talk
                    </Link>
                    <Link
                        href="/contact"
                        className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground"
                    >
                        <Mail className="w-4 h-4" />
                    </Link>
                </div>

            </div>
        </motion.header>
    )
}
