'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'

interface TimelineItem {
    date: string
    title: string
    subtitle?: string
    description?: string
    icon?: ReactNode
}

interface TimelineProps {
    items: TimelineItem[]
    className?: string
}

export function Timeline({ items, className = '' }: TimelineProps) {
    return (
        <div className={`relative ${className}`}>
            {/* Vertical line */}
            <motion.div
                className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
                style={{ transformOrigin: 'top' }}
            />
            
            <div className="space-y-12">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        className={`relative flex items-start gap-8 ${
                            index % 2 === 0 
                                ? 'md:flex-row' 
                                : 'md:flex-row-reverse'
                        }`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                        {/* Content card */}
                        <div className={`flex-1 ml-12 md:ml-0 ${
                            index % 2 === 0 
                                ? 'md:text-right md:pr-12' 
                                : 'md:text-left md:pl-12'
                        }`}>
                            <motion.div
                                className="inline-block p-4 rounded-xl bg-card border border-border"
                                whileHover={{ 
                                    scale: 1.02,
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                <span className="inline-block px-3 py-1 text-xs font-mono text-primary bg-primary/10 rounded-full mb-2">
                                    {item.date}
                                </span>
                                <h3 className="text-lg font-semibold text-foreground">
                                    {item.title}
                                </h3>
                                {item.subtitle && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {item.subtitle}
                                    </p>
                                )}
                                {item.description && (
                                    <p className="text-sm text-muted-foreground mt-2">
                                        {item.description}
                                    </p>
                                )}
                            </motion.div>
                        </div>
                        
                        {/* Center dot */}
                        <motion.div
                            className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                                type: 'spring', 
                                stiffness: 500, 
                                damping: 20,
                                delay: index * 0.1 + 0.2 
                            }}
                        >
                            <motion.div
                                className="w-4 h-4 rounded-full bg-primary"
                                whileHover={{ scale: 1.2 }}
                            >
                                {item.icon && (
                                    <span className="absolute inset-0 flex items-center justify-center text-xs text-primary-foreground">
                                        {item.icon}
                                    </span>
                                )}
                            </motion.div>
                        </motion.div>
                        
                        {/* Empty spacer for alternating layout */}
                        <div className="hidden md:block flex-1" />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
