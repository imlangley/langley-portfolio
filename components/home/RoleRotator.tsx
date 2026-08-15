'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

interface RoleRotatorProps {
    roles: string[]
    interval?: number
    className?: string
}

export function RoleRotator({ roles, interval = 2800, className }: RoleRotatorProps) {
    const [index, setIndex] = useState(0)
    const [visible, setVisible] = useState(true)
    const reduceMotion = useReducedMotion()

    useEffect(() => {
        if (roles.length <= 1) return

        if (reduceMotion) {
            const id = setInterval(() => setIndex((p) => (p + 1) % roles.length), interval)
            return () => clearInterval(id)
        }

        let swapTimer: ReturnType<typeof setTimeout>
        const cycle = setInterval(() => {
            setVisible(false)
            swapTimer = setTimeout(() => {
                setIndex((p) => (p + 1) % roles.length)
                setVisible(true)
            }, 260)
        }, interval)

        return () => {
            clearInterval(cycle)
            clearTimeout(swapTimer)
        }
    }, [roles.length, interval, reduceMotion])

    const current = roles[index] ?? ''

    return (
        <span className={cn('block', className)}>
            <span className="sr-only">{current}</span>
            <motion.span
                aria-hidden="true"
                className="block text-ae-cyan will-change-transform [text-wrap:balance]"
                animate={
                    reduceMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: visible ? 1 : 0, y: visible ? 0 : '-45%' }
                }
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            >
                {current}
            </motion.span>
        </span>
    )
}
