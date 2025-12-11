'use client';

import { motion } from 'framer-motion';

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
}

export function TextReveal({ text, className, delay = 0, duration = 0.5 }: TextRevealProps) {
    const characters = text.split("");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                duration: duration
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(10px)",
        },
    };

    return (
        <motion.h1
            className={className}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {characters.map((char, index) => (
                <motion.span variants={child} key={index}>
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.h1>
    );
}

export function SlideIn({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) {
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
