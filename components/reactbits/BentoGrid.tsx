'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'

interface BentoItem {
    id: string
    title: string
    description?: string
    icon?: ReactNode
    className?: string
    span?: 'sm' | 'md' | 'lg' | 'xl'
    children?: ReactNode
}

interface BentoGridProps {
    items: BentoItem[]
    className?: string
}

const spanClasses = {
    sm: 'col-span-1 row-span-1',
    md: 'col-span-1 md:col-span-2 row-span-1',
    lg: 'col-span-1 row-span-2',
    xl: 'col-span-1 md:col-span-2 row-span-2',
}

export function BentoGrid({ items, className = '' }: BentoGridProps) {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${className}`}>
            {items.map((item, index) => (
                <motion.div
                    key={item.id}
                    className={`
                        relative group p-6 rounded-2xl
                        bg-card border border-border
                        overflow-hidden
                        hover:border-primary/50
                        transition-colors duration-300
                        ${spanClasses[item.span || 'sm']}
                        ${item.className || ''}
                    `}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ 
                        duration: 0.5, 
                        delay: index * 0.1,
                        ease: [0.33, 1, 0.68, 1]
                    }}
                    whileHover={{ y: -4 }}
                >
                    {/* Gradient overlay on hover */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    
                    {/* Corner accent */}
                    <motion.div
                        className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    
                    {/* Content */}
                    <div className="relative z-10">
                        {item.icon && (
                            <motion.div
                                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                            >
                                {item.icon}
                            </motion.div>
                        )}
                        
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            {item.title}
                        </h3>
                        
                        {item.description && (
                            <p className="text-sm text-muted-foreground">
                                {item.description}
                            </p>
                        )}
                        
                        {item.children}
                    </div>
                    
                    {/* Hover glow effect */}
                    <motion.div
                        className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                </motion.div>
            ))}
        </div>
    )
}

// Export a BentoCard for individual use
export function BentoCard({
    children,
    className = '',
    span = 'sm'
}: {
    children: ReactNode
    className?: string
    span?: 'sm' | 'md' | 'lg' | 'xl'
}) {
    return (
        <motion.div
            className={`
                relative group p-6 rounded-2xl
                bg-card border border-border
                overflow-hidden
                hover:border-primary/50
                transition-colors duration-300
                ${spanClasses[span]}
                ${className}
            `}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    )
}
