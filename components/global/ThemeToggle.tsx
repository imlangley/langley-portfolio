'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface ThemeToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export function ThemeToggle({ className, ...props }: ThemeToggleProps) {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className={cn("w-9 h-9", className)} /> // Placeholder
    }

    const isDark = theme === 'dark'

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={cn(
                "relative flex items-center justify-center p-2 rounded-full transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring",
                className
            )}
            aria-label="Toggle theme"
            data-testid="theme-toggle"
            type="button"
            {...props}
        >
            <motion.div
                initial={false}
                animate={{
                    scale: isDark ? 1 : 0,
                    opacity: isDark ? 1 : 0,
                    rotate: isDark ? 0 : 90,
                }}
                transition={{ duration: 0.2 }}
                className="absolute"
            >
                <Moon className="h-5 w-5" />
            </motion.div>
            <motion.div
                initial={false}
                animate={{
                    scale: isDark ? 0 : 1,
                    opacity: isDark ? 0 : 1,
                    rotate: isDark ? -90 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="absolute"
            >
                <Sun className="h-5 w-5" />
            </motion.div>
        </button>
    )
}
