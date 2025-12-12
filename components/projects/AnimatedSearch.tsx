'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AnimatedSearchProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

export function AnimatedSearch({
    value,
    onChange,
    placeholder = "Search projects...",
    className
}: AnimatedSearchProps) {
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <motion.div
            className={cn(
                "relative flex items-center",
                className
            )}
            animate={{
                width: isFocused || value ? "100%" : "auto"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <motion.div
                className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300",
                    isFocused
                        ? "bg-background border-primary shadow-lg shadow-primary/10"
                        : "bg-muted/50 border-border/50 hover:border-border"
                )}
                style={{ width: "100%" }}
            >
                <motion.div
                    animate={{
                        scale: isFocused ? 1.1 : 1,
                        color: isFocused ? "var(--primary)" : "var(--muted-foreground)"
                    }}
                >
                    <Search className="w-4 h-4" />
                </motion.div>

                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:text-muted-foreground min-w-[120px]"
                />

                <AnimatePresence>
                    {value && (
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                onChange("")
                                inputRef.current?.focus()
                            }}
                            className="p-1 rounded-full hover:bg-muted transition-colors"
                        >
                            <X className="w-3.5 h-3.5 text-muted-foreground" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Search Results Count Indicator */}
            <AnimatePresence>
                {isFocused && value && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute -bottom-6 left-0 text-xs text-muted-foreground"
                    >
                        Press Enter to search
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
