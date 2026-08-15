'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { useEffect } from 'react';

export interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
}

// Individual character with clamped blur animation
function AnimatedChar({ char, delay }: { char: string; delay: number }) {
    // Use motion value for blur to clamp negative values
    const blurValue = useMotionValue(10);

    // Clamp blur to minimum 0 to prevent invalid CSS
    const clampedBlur = useTransform(blurValue, (v) => Math.max(0, v));
    const filter = useTransform(clampedBlur, (v) => `blur(${v}px)`);


    useEffect(() => {
        const timeout = setTimeout(() => {
            blurValue.set(0);
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [delay, blurValue]);

    return (
        <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay,
                type: "spring",
                damping: 12,
                stiffness: 100,
            }}
            style={{ filter }}
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
    );
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
    const characters = text.split("");
    const staggerDelay = 0.03;

    return (
        <motion.h1
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay }}
        >
            {characters.map((char, index) => (
                <AnimatedChar
                    key={index}
                    char={char}
                    delay={delay + index * staggerDelay}
                />
            ))}
        </motion.h1>
    );
}

export interface SlideInProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export function SlideIn({ children, delay = 0, className }: SlideInProps) {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay, duration: 0.5, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
