'use client'

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import {
  motion,
  AnimatePresence,
  Transition,
  type VariantLabels,
  type Target,
  type TargetAndTransition
} from 'motion/react'
import { cn } from '@/lib/utils'

export interface RotatingTextRef {
  next: () => void
  previous: () => void
  jumpTo: (index: number) => void
  reset: () => void
}

export interface RotatingTextProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof motion.span>,
    'children' | 'transition' | 'initial' | 'animate' | 'exit'
  > {
  texts: string[]
  transition?: Transition
  initial?: boolean | Target | VariantLabels
  animate?: boolean | VariantLabels | TargetAndTransition
  exit?: Target | VariantLabels
  animatePresenceMode?: 'sync' | 'wait'
  animatePresenceInitial?: boolean
  rotationInterval?: number
  staggerDuration?: number
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number
  loop?: boolean
  auto?: boolean
  splitBy?: string
  onNext?: (index: number) => void
  mainClassName?: string
  splitLevelClassName?: string
  elementLevelClassName?: string
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      transition = { type: 'spring', damping: 25, stiffness: 300 },
      initial = { y: '100%', opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: '-120%', opacity: 0 },
      animatePresenceMode = 'wait',
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = 'first',
      loop = true,
      auto = true,
      splitBy = 'characters',
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      className,
      ...rest
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0)

    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== 'undefined' && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' })
        return Array.from(segmenter.segment(text), (segment) => segment.segment)
      }
      return text.split('')
    }

    const elements = useMemo(() => {
      const currentText = texts[currentTextIndex]
      if (splitBy === 'characters') {
        const chars = splitIntoCharacters(currentText)
        return chars.map((char, i) => ({
          characters: [char],
          needsSpace: false,
          key: `char-${i}`
        }))
      } else if (splitBy === 'words') {
        return currentText.split(' ').map((word, i, arr) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i < arr.length - 1,
          key: `word-${i}`
        }))
      } else if (splitBy === 'lines') {
        return currentText.split('\n').map((line, i) => ({
          characters: splitIntoCharacters(line),
          needsSpace: false,
          key: `line-${i}`
        }))
      }
      return currentText.split(splitBy).map((part, i, arr) => ({
        characters: splitIntoCharacters(part),
        needsSpace: i < arr.length - 1,
        key: `part-${i}`
      }))
    }, [texts, currentTextIndex, splitBy])

    const getStaggerDelay = useCallback(
      (index: number, totalChars: number): number => {
        if (staggerDuration === 0) return 0
        const perCharDelay = staggerDuration / Math.max(totalChars - 1, 1)
        switch (staggerFrom) {
          case 'first':
            return index * perCharDelay
          case 'last':
            return (totalChars - 1 - index) * perCharDelay
          case 'center': {
            const center = (totalChars - 1) / 2
            return Math.abs(center - index) * perCharDelay
          }
          case 'random':
            return Math.random() * staggerDuration
          default:
            if (typeof staggerFrom === 'number') {
              return Math.abs(staggerFrom - index) * perCharDelay
            }
            return index * perCharDelay
        }
      },
      [staggerDuration, staggerFrom]
    )

    const next = useCallback(() => {
      setCurrentTextIndex((prev) => {
        const nextIndex = prev + 1
        if (nextIndex >= texts.length) {
          return loop ? 0 : prev
        }
        return nextIndex
      })
    }, [texts.length, loop])

    const previous = useCallback(() => {
      setCurrentTextIndex((prev) => {
        const prevIndex = prev - 1
        if (prevIndex < 0) {
          return loop ? texts.length - 1 : prev
        }
        return prevIndex
      })
    }, [texts.length, loop])

    const jumpTo = useCallback(
      (index: number) => {
        if (index >= 0 && index < texts.length) {
          setCurrentTextIndex(index)
        }
      },
      [texts.length]
    )

    const reset = useCallback(() => {
      setCurrentTextIndex(0)
    }, [])

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
      next,
      previous,
      jumpTo,
      reset
    ])

    useEffect(() => {
      if (onNext) {
        onNext(currentTextIndex)
      }
    }, [currentTextIndex, onNext])

    useEffect(() => {
      if (!auto) return
      const intervalId = setInterval(next, rotationInterval)
      return () => clearInterval(intervalId)
    }, [next, rotationInterval, auto])

    return (
      <motion.span
        className={cn('flex flex-wrap whitespace-pre-wrap relative', mainClassName, className)}
        {...rest}
        layout
        transition={transition}
      >
        <span className="sr-only">{texts[currentTextIndex]}</span>
        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          <motion.span
            key={currentTextIndex}
            className={cn(
              splitBy === 'lines' ? 'flex flex-col w-full' : 'flex flex-wrap whitespace-pre-wrap relative'
            )}
            layout
            aria-hidden="true"
          >
            {elements.map((wordObj, wordIndex, array) => {
              const previousCharsCount = array
                .slice(0, wordIndex)
                .reduce((sum, word) => sum + word.characters.length, 0)
              return (
                <span key={wordObj.key} className={cn('inline-flex', splitLevelClassName)}>
                  {wordObj.characters.map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      transition={{
                        ...transition,
                        delay: getStaggerDelay(
                          previousCharsCount + charIndex,
                          array.reduce((sum, word) => sum + word.characters.length, 0)
                        )
                      }}
                      className={cn('inline-block', elementLevelClassName)}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
                </span>
              )
            })}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    )
  }
)

RotatingText.displayName = 'RotatingText'
export { RotatingText }
export default RotatingText
