'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { useState } from 'react'

interface AnimatedAvatarProps {
    src: string
    alt: string
    size?: number
    className?: string
}

export function AnimatedAvatar({
    src,
    alt,
    size = 200,
    className = ''
}: AnimatedAvatarProps) {
    const [isHovered, setIsHovered] = useState(false)
    
    return (
        <motion.div
            className={`relative ${className}`}
            style={{ width: size, height: size }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
            {/* Outer glow ring */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)',
                }}
                animate={{
                    scale: isHovered ? 1.08 : 1.04,
                    opacity: isHovered ? 1 : 0.7,
                }}
                transition={{ duration: 0.3 }}
            />
            
            {/* Rotating gradient border */}
            <motion.div
                className="absolute inset-1 rounded-full overflow-hidden"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
                <div 
                    className="absolute inset-0"
                    style={{
                        background: 'conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary)))',
                    }}
                />
            </motion.div>
            
            {/* Image container */}
            <motion.div
                className="absolute inset-2 rounded-full overflow-hidden bg-background"
                animate={{
                    scale: isHovered ? 1.02 : 1,
                }}
                transition={{ duration: 0.3 }}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
            
            {/* Floating particles */}
            {isHovered && (
                <>
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-primary/60"
                            initial={{ 
                                x: size / 2, 
                                y: size / 2,
                                scale: 0 
                            }}
                            animate={{
                                x: size / 2 + Math.cos((i * 60) * Math.PI / 180) * (size / 2 + 20),
                                y: size / 2 + Math.sin((i * 60) * Math.PI / 180) * (size / 2 + 20),
                                scale: [0, 1, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.1,
                            }}
                        />
                    ))}
                </>
            )}
            
            {/* Status indicator */}
            <motion.div
                className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-green-500 border-2 border-background"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 500, damping: 15 }}
            >
                <motion.div
                    className="absolute inset-0 rounded-full bg-green-500"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.div>
        </motion.div>
    )
}
