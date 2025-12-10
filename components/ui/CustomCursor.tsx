'use client'

import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useCursor } from '@/context/CursorContext'

export function CustomCursor() {
    const { cursorText, cursorVariant } = useCursor()

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 }
    const smoothX = useSpring(mouseX, smoothOptions)
    const smoothY = useSpring(mouseY, smoothOptions)

    useEffect(() => {
        // Only trigger on non-touch devices
        const isTouchDevice = window.matchMedia("(pointer: coarse)").matches
        if (isTouchDevice) return

        const manageMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e
            mouseX.set(clientX)
            mouseY.set(clientY)
        }

        window.addEventListener('mousemove', manageMouseMove)
        return () => window.removeEventListener('mousemove', manageMouseMove)
    }, [mouseX, mouseY])

    useEffect(() => {
        const isTouchDevice = window.matchMedia("(pointer: coarse)").matches
        if (isTouchDevice) return

        document.body.style.cursor = 'none'
        return () => {
            document.body.style.cursor = 'auto'
        }
    }, [])

    const variants = {
        default: {
            height: 16,
            width: 16,
            backgroundColor: "#ffffff",
            mixBlendMode: "difference" as any
        },
        project: {
            height: 100,
            width: 100,
            backgroundColor: "#ffffff",
            mixBlendMode: "difference" as any
        }
    }

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center text-black font-bold text-xs tracking-widest"
            style={{
                left: smoothX,
                top: smoothY,
                translateX: '-50%',
                translateY: '-50%'
            }}
            variants={variants}
            animate={cursorVariant}
        >
            <AnimatePresence mode="wait">
                {cursorText && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={cursorText}
                    >
                        {cursorText}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
