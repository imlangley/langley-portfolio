'use client'

import { motion } from 'motion/react'

interface UptimeBarProps {
    percentage: number
}

export function UptimeBar({ percentage }: UptimeBarProps) {
    const clampedPercentage = Math.max(0, Math.min(100, percentage))
    const color =
        clampedPercentage >= 99
            ? 'bg-syn-green'
            : clampedPercentage >= 95
              ? 'bg-syn-yellow'
              : clampedPercentage >= 90
                ? 'bg-syn-orange'
                : 'bg-ae-pink'

    return (
        <div className="h-1.5 w-full overflow-hidden rounded-sm bg-shell-bg-alt">
            <motion.div
                className={`h-full ${color}`}
                initial={{ width: 0 }}
                animate={{ width: `${clampedPercentage}%` }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
        </div>
    )
}
