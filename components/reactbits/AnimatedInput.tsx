'use client'

import { forwardRef, useState, useId, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface AnimatedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string
  error?: string
  helperText?: string
  shake?: boolean
}

const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ label, error, helperText, className, shake, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(!!props.defaultValue || !!props.value)
    const inputId = useId()

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      setHasValue(!!e.target.value)
      onBlur?.(e)
    }

    const isFloating = isFocused || hasValue

    return (
      <div className="relative w-full">
        <motion.div
          animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <motion.label
            htmlFor={inputId}
            animate={{
              y: isFloating ? -10 : 0,
              scale: isFloating ? 0.85 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            className={cn(
              'absolute left-4 top-4 pointer-events-none origin-left',
              isFloating ? 'text-primary' : 'text-muted-foreground',
              error && 'text-destructive'
            )}
          >
            {label}
          </motion.label>

          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full px-4 pt-6 pb-2 bg-background border rounded-lg',
              'outline-none transition-all duration-200 placeholder-transparent',
              'focus:ring-2 focus:ring-primary/20',
              isFocused ? 'border-primary' : 'border-input',
              error && 'border-destructive focus:ring-destructive/20',
              className
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => {
              setHasValue(!!e.target.value)
              props.onChange?.(e)
            }}
            {...props}
            placeholder=" "
          />

          {/* Focus indicator line */}
          <motion.div
            className={cn(
              'absolute bottom-0 left-0 h-0.5 bg-primary',
              error && 'bg-destructive'
            )}
            initial={{ width: '0%', left: '50%' }}
            animate={{
              width: isFocused ? '100%' : '0%',
              left: isFocused ? '0%' : '50%',
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Helper text or error message */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 min-h-[1.25rem]"
        >
          {error ? (
            <span className="text-sm text-destructive">{error}</span>
          ) : helperText ? (
            <span className="text-sm text-muted-foreground">{helperText}</span>
          ) : null}
        </motion.div>
      </div>
    )
  }
)

AnimatedInput.displayName = 'AnimatedInput'

interface AnimatedTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  label: string
  error?: string
  helperText?: string
  shake?: boolean
}

const AnimatedTextarea = forwardRef<HTMLTextAreaElement, AnimatedTextareaProps>(
  ({ label, error, helperText, className, shake, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(!!props.defaultValue || !!props.value)
    const textareaId = useId()

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false)
      setHasValue(!!e.target.value)
      onBlur?.(e)
    }

    const isFloating = isFocused || hasValue

    return (
      <div className="relative w-full">
        <motion.div
          animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <motion.label
            htmlFor={textareaId}
            animate={{
              y: isFloating ? -10 : 0,
              scale: isFloating ? 0.85 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            className={cn(
              'absolute left-4 top-4 pointer-events-none origin-left',
              isFloating ? 'text-primary' : 'text-muted-foreground',
              error && 'text-destructive'
            )}
          >
            {label}
          </motion.label>

          <textarea
            ref={ref}
            id={textareaId}
            className={cn(
              'w-full px-4 pt-6 pb-3 bg-background border rounded-lg',
              'outline-none transition-all duration-200 min-h-[120px] resize-y placeholder-transparent',
              'focus:ring-2 focus:ring-primary/20',
              isFocused ? 'border-primary' : 'border-input',
              error && 'border-destructive focus:ring-destructive/20',
              className
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => {
              setHasValue(!!e.target.value)
              props.onChange?.(e)
            }}
            {...props}
            placeholder=" "
          />

          {/* Focus indicator line */}
          <motion.div
            className={cn(
              'absolute bottom-0 left-0 h-0.5 bg-primary',
              error && 'bg-destructive'
            )}
            initial={{ width: '0%', left: '50%' }}
            animate={{
              width: isFocused ? '100%' : '0%',
              left: isFocused ? '0%' : '50%',
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Helper text or error message */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 min-h-[1.25rem]"
        >
          {error ? (
            <span className="text-sm text-destructive">{error}</span>
          ) : helperText ? (
            <span className="text-sm text-muted-foreground">{helperText}</span>
          ) : null}
        </motion.div>
      </div>
    )
  }
)

AnimatedTextarea.displayName = 'AnimatedTextarea'

export { AnimatedInput, AnimatedTextarea }
