'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'motion/react'

interface AnimatedCounterProps {
    value: number
    className?: string
    duration?: number
}

export function AnimatedCounter({
    value,
    className,
    duration = 0.5
}: AnimatedCounterProps) {
    const spring = useSpring(0, {
        stiffness: 100,
        damping: 20,
        duration: duration * 1000
    })
    
    const display = useTransform(spring, (current) => Math.round(current))
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
        spring.set(value)
    }, [spring, value])

    useEffect(() => {
        const unsubscribe = display.on("change", (latest) => {
            setDisplayValue(latest)
        })
        return unsubscribe
    }, [display])

    return (
        <motion.span
            key={value}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={className}
        >
            {displayValue}
        </motion.span>
    )
}
