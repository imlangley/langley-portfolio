'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useInView, useMotionValue, useTransform } from 'motion/react'

interface AnimatedCounterProps {
    value: number
    duration?: number
    className?: string
    prefix?: string
    suffix?: string
    decimals?: number
}

export function AnimatedCounter({
    value,
    duration = 2,
    className = '',
    prefix = '',
    suffix = '',
    decimals = 0
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-50px' })
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, { duration: duration * 1000 })
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
        if (isInView) {
            motionValue.set(value)
        }
    }, [isInView, value, motionValue])

    useEffect(() => {
        const unsubscribe = springValue.on('change', (latest) => {
            setDisplayValue(latest)
        })
        return unsubscribe
    }, [springValue])

    const formattedValue = decimals > 0 
        ? displayValue.toFixed(decimals)
        : Math.round(displayValue).toString()

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3 }}
        >
            {prefix}{formattedValue}{suffix}
        </motion.span>
    )
}
