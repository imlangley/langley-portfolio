'use client'

import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { CommandMenu, useToast } from '@/components/reactbits'
import {
    Home,
    User,
    Briefcase,
    Mail,
    Moon,
    Sun,
    Monitor,
    Github,
    Twitter,
    Sparkles,
    Terminal,
    Palette
} from 'lucide-react'

export function CommandMenuWrapper() {
    const router = useRouter()
    const { theme, setTheme } = useTheme()
    const { addToast } = useToast()

    const commandItems = [
        // Navigation
        {
            id: 'home',
            title: 'Go to Home',
            description: 'Navigate to homepage',
            icon: <Home className="w-4 h-4" />,
            shortcut: ['G', 'H'],
            action: () => router.push('/'),
            category: 'Navigation',
        },
        {
            id: 'about',
            title: 'Go to About',
            description: 'Learn more about me',
            icon: <User className="w-4 h-4" />,
            shortcut: ['G', 'A'],
            action: () => router.push('/about'),
            category: 'Navigation',
        },
        {
            id: 'projects',
            title: 'Go to Projects',
            description: 'View all projects',
            icon: <Briefcase className="w-4 h-4" />,
            shortcut: ['G', 'P'],
            action: () => router.push('/projects'),
            category: 'Navigation',
        },
        {
            id: 'contact',
            title: 'Go to Contact',
            description: 'Get in touch',
            icon: <Mail className="w-4 h-4" />,
            shortcut: ['G', 'C'],
            action: () => router.push('/contact'),
            category: 'Navigation',
        },

        // Theme
        {
            id: 'theme-light',
            title: 'Switch to Light Mode',
            description: 'Change to light theme',
            icon: <Sun className="w-4 h-4" />,
            action: () => setTheme('light'),
            category: 'Theme',
        },
        {
            id: 'theme-dark',
            title: 'Switch to Dark Mode',
            description: 'Change to dark theme',
            icon: <Moon className="w-4 h-4" />,
            action: () => setTheme('dark'),
            category: 'Theme',
        },
        {
            id: 'theme-system',
            title: 'Use System Theme',
            description: 'Match system preference',
            icon: <Monitor className="w-4 h-4" />,
            action: () => setTheme('system'),
            category: 'Theme',
        },

        // Easter Eggs
        {
            id: 'animations',
            title: 'Animations Showcase',
            description: 'View all ReactBits animations',
            icon: <Sparkles className="w-4 h-4" />,
            action: () => router.push('/showcase'),
            category: 'Hidden',
        },
        {
            id: 'terminal',
            title: 'Open Terminal',
            description: 'Developer console mode',
            icon: <Terminal className="w-4 h-4" />,
            action: () => {
                // Log to console for developers
                console.log('%c🚀 Developer Mode Activated!', 'color: #3b82f6; font-size: 24px; font-weight: bold;')
                console.log('%cWelcome to the secret developer console.', 'color: #10b981; font-size: 14px;')
                console.log('%cType window.__secrets for more...', 'color: #f59e0b; font-size: 12px;')

                // Show toast to user
                addToast({
                    type: 'success',
                    title: '🚀 Developer Mode Activated!',
                    message: 'Open browser DevTools (F12) to see the secret console.',
                })
            },
            category: 'Hidden',
        },

        // External Links
        {
            id: 'github',
            title: 'View on GitHub',
            description: 'Check out the source code',
            icon: <Github className="w-4 h-4" />,
            action: () => window.open('https://github.com/langley', '_blank'),
            category: 'Links',
        },
        {
            id: 'twitter',
            title: 'Follow on Twitter',
            description: 'Stay updated',
            icon: <Twitter className="w-4 h-4" />,
            action: () => window.open('https://twitter.com/langley', '_blank'),
            category: 'Links',
        },
    ]

    return <CommandMenu items={commandItems} />
}
