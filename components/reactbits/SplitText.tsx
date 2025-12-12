'use client'

import { useMemo } from 'react'
import { motion, Variants, Transition } from 'motion/react'

interface SplitTextProps {
    text: string
    className?: string
    delay?: number
    animationFrom?: {
        opacity?: number
        y?: number
        x?: number
        scale?: number
        filter?: string
    }
    animationTo?: {
        opacity?: number
        y?: number
        x?: number
        scale?: number
        filter?: string
    }
    easing?: Transition['ease']
    threshold?: number
    textAlign?: 'left' | 'center' | 'right'
    splitBy?: 'char' | 'word' | 'line'
    staggerDuration?: number
    wordClassName?: string
    charClassName?: string
}

export function SplitText({
    text,
    className = '',
    delay = 0,
    animationFrom = { opacity: 0, y: 40, filter: 'blur(10px)' },
    animationTo = { opacity: 1, y: 0, filter: 'blur(0px)' },
    easing = [0.25, 0.46, 0.45, 0.94],
    splitBy = 'word',
    staggerDuration = 0.05,
    textAlign = 'center',
    wordClassName = '',
    charClassName = '',
}: SplitTextProps) {
    const elements = useMemo(() => {
        if (splitBy === 'char') {
            return text.split('').map((char, i) => ({
                text: char === ' ' ? '\u00A0' : char,
                key: `char-${i}`,
            }))
        } else if (splitBy === 'word') {
            return text.split(' ').map((word, i) => ({
                text: word,
                key: `word-${i}`,
            }))
        } else {
            // line
            return text.split('\n').map((line, i) => ({
                text: line,
                key: `line-${i}`,
            }))
        }
    }, [text, splitBy])

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDuration,
                delayChildren: delay,
            },
        },
    }

    const itemVariants: Variants = {
        hidden: animationFrom,
        visible: {
            ...animationTo,
            transition: {
                duration: 0.5,
                ease: easing,
            },
        },
    }

    return (
        <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={containerVariants}
            className={`inline-flex flex-wrap ${textAlign === 'center' ? 'justify-center' : textAlign === 'right' ? 'justify-end' : 'justify-start'} ${className}`}
        >
            {elements.map((element) => (
                <motion.span
                    key={element.key}
                    variants={itemVariants}
                    className={`inline-block ${splitBy === 'word' ? `mr-[0.25em] ${wordClassName}` : charClassName}`}
                >
                    {splitBy === 'word' && element.text.split('').map((char, charIndex) => (
                        <span key={`${element.key}-char-${charIndex}`} className="inline-block">
                            {char}
                        </span>
                    ))}
                    {splitBy !== 'word' && element.text}
                </motion.span>
            ))}
        </motion.span>
    )
}

export default SplitText
