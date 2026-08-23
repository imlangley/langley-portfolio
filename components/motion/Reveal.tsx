'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealProps {
    children: ReactNode
    className?: string
    delay?: number
    y?: number
    x?: number
    once?: boolean
}

export function Reveal({ children, className, delay = 0, y = 24, x = 0, once = true }: RevealProps) {
    const reduce = useReducedMotion()

    if (reduce) return <div className={className}>{children}</div>

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y, x }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once, margin: '-60px' }}
            transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    )
}
