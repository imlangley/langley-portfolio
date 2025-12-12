'use client'

import { ReactNode, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useCursor } from '@/context/CursorContext'

interface TiltedCardProps {
    children: ReactNode
    className?: string
    containerClassName?: string
    rotateAmplitude?: number
    scaleOnHover?: number
    showMagneticEffect?: boolean
    showShine?: boolean
    showTooltip?: boolean
    tooltipText?: string
    displayOverlayContent?: boolean
    overlayContent?: ReactNode
}

export function TiltedCard({
    children,
    className = '',
    containerClassName = '',
    rotateAmplitude = 14,
    scaleOnHover = 1.05,
    showMagneticEffect = true,
    showShine = true,
    showTooltip = false,
    tooltipText = '',
    displayOverlayContent = false,
    overlayContent,
}: TiltedCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [hovered, setHovered] = useState(false)
    const { setCursorVariant } = useCursor()

    // Motion values for 3D tilt
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Spring config for smooth animation
    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]), springConfig)
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]), springConfig)

    // Shine effect position
    const shineX = useSpring(useTransform(x, [-0.5, 0.5], ['0%', '100%']), springConfig)
    const shineY = useSpring(useTransform(y, [-0.5, 0.5], ['0%', '100%']), springConfig)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        // Normalize to -0.5 to 0.5
        x.set(mouseX / width - 0.5)
        y.set(mouseY / height - 0.5)
    }

    const handleMouseLeave = () => {
        setHovered(false)
        setCursorVariant('default')
        x.set(0)
        y.set(0)
    }

    const handleMouseEnter = () => {
        setHovered(true)
        setCursorVariant('button')
    }

    return (
        <div className={`perspective-1000 ${containerClassName}`}>
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                animate={{
                    scale: hovered ? scaleOnHover : 1,
                }}
                transition={{ scale: { type: 'spring', stiffness: 300, damping: 20 } }}
                className={`relative ${className}`}
            >
                {/* Main content */}
                {children}

                {/* Shine overlay effect */}
                {showShine && (
                    <motion.div
                        className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
                        style={{
                            background: hovered
                                ? `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.15), transparent 50%)`
                                : 'none',
                        }}
                    />
                )}

                {/* Overlay content on hover */}
                {displayOverlayContent && overlayContent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hovered ? 1 : 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl backdrop-blur-sm"
                    >
                        {overlayContent}
                    </motion.div>
                )}

                {/* Tooltip */}
                {showTooltip && tooltipText && hovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-shell-bg border border-shell-border rounded-md text-sm font-medium text-shell-text whitespace-nowrap z-50"
                        style={{ transform: 'translateZ(40px)' }}
                    >
                        {tooltipText}
                    </motion.div>
                )}
            </motion.div>
        </div>
    )
}

export default TiltedCard
