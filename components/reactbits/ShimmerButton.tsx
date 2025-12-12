'use client'

import { motion } from 'motion/react'
import { ReactNode } from 'react'
import Link from 'next/link'

interface ShimmerButtonProps {
    children: ReactNode
    className?: string
    onClick?: () => void
    href?: string
    disabled?: boolean
    type?: 'button' | 'submit'
}

export function ShimmerButton({
    children,
    className = '',
    onClick,
    href,
    disabled = false,
    type = 'button'
}: ShimmerButtonProps) {
    const buttonContent = (
        <>
            {/* Shimmer effect using framer motion */}
            <motion.span 
                className="absolute inset-0 overflow-hidden rounded-xl"
                initial={false}
            >
                <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                />
            </motion.span>
            
            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
        </>
    )

    const baseClasses = `
        relative inline-flex items-center justify-center gap-2
        px-6 py-3 rounded-xl
        bg-primary text-primary-foreground
        font-semibold
        overflow-hidden
        transition-all duration-300
        hover:shadow-lg hover:shadow-primary/25
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
    `
    
    if (href) {
        return (
            <motion.div
                className="relative w-full md:w-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Link href={href} className={baseClasses}>
                    {buttonContent}
                </Link>
            </motion.div>
        )
    }

    return (
        <motion.div
            className="relative w-full md:w-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <button
                onClick={onClick}
                type={type}
                disabled={disabled}
                className={baseClasses}
            >
                {buttonContent}
            </button>
        </motion.div>
    )
}
