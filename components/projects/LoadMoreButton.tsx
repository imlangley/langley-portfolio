'use client'

import { motion } from 'motion/react'
import { ChevronDown, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadMoreButtonProps {
    onClick: () => void
    isLoading?: boolean
    hasMore: boolean
    loadedCount: number
    totalCount: number
    className?: string
}

export function LoadMoreButton({
    onClick,
    isLoading = false,
    hasMore,
    loadedCount,
    totalCount,
    className
}: LoadMoreButtonProps) {
    if (!hasMore) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("flex flex-col items-center gap-4", className)}
        >
            <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{loadedCount}</span> of{" "}
                <span className="font-semibold text-foreground">{totalCount}</span> projects
            </p>
            
            <motion.button
                onClick={onClick}
                disabled={isLoading}
                className={cn(
                    "group relative px-8 py-4 rounded-2xl font-semibold text-lg",
                    "bg-gradient-to-r from-primary/10 to-primary/5",
                    "border border-primary/20 hover:border-primary/40",
                    "transition-all duration-300",
                    "hover:shadow-lg hover:shadow-primary/10",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <span className="flex items-center gap-2">
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Loading...
                        </>
                    ) : (
                        <>
                            Load More Projects
                            <motion.span
                                animate={{ y: [0, 4, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <ChevronDown className="w-5 h-5" />
                            </motion.span>
                        </>
                    )}
                </span>

                {/* Shimmer effect */}
                <motion.div
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                    initial={false}
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                        animate={{ x: ["0%", "200%"] }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "linear",
                            repeatDelay: 1
                        }}
                    />
                </motion.div>
            </motion.button>
        </motion.div>
    )
}
