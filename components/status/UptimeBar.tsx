'use client'

import { motion } from 'motion/react'

interface UptimeBarProps {
    percentage: number
}

export function UptimeBar({ percentage }: UptimeBarProps) {
    // Clamp percentage between 0 and 100
    const clampedPercentage = Math.max(0, Math.min(100, percentage))
    
    // Determine color based on uptime percentage
    const getColor = () => {
        if (clampedPercentage >= 99) return 'bg-green-500'
        if (clampedPercentage >= 95) return 'bg-yellow-500'
        if (clampedPercentage >= 90) return 'bg-orange-500'
        return 'bg-red-500'
    }

    return (
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
                className={`h-full ${getColor()} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${clampedPercentage}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            />
        </div>
    )
}
