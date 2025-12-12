'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface FilterTab {
    id: string
    label: string
    icon?: React.ReactNode
    count?: number
}

interface AnimatedFilterTabsProps {
    tabs: FilterTab[]
    activeTab: string
    onTabChange: (id: string) => void
    className?: string
}

export function AnimatedFilterTabs({
    tabs,
    activeTab,
    onTabChange,
    className
}: AnimatedFilterTabsProps) {
    return (
        <div className={cn("flex gap-1 p-1 rounded-xl bg-muted/50 border border-border/50", className)}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                    <motion.button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={cn(
                            "relative px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
                            isActive
                                ? "text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeFilterTab"
                                className="absolute inset-0 bg-background rounded-lg shadow-sm border border-border/50"
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30
                                }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            {tab.icon}
                            <span>{tab.label}</span>
                            {typeof tab.count === 'number' && (
                                <motion.span
                                    key={tab.count}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className={cn(
                                        "text-xs px-1.5 py-0.5 rounded-full",
                                        isActive
                                            ? "bg-primary/20 text-primary"
                                            : "bg-muted-foreground/20"
                                    )}
                                >
                                    {tab.count}
                                </motion.span>
                            )}
                        </span>
                    </motion.button>
                )
            })}
        </div>
    )
}
