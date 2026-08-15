'use client'

import { motion, AnimatePresence } from 'motion/react'
import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
    id: string
    type: ToastType
    title: string
    message?: string
    duration?: number
    showConfetti?: boolean
}

interface ToastContextType {
    toasts: Toast[]
    addToast: (toast: Omit<Toast, 'id'>) => void
    removeToast: (id: string) => void
    success: (title: string, message?: string, showConfetti?: boolean) => void
    error: (title: string, message?: string) => void
    warning: (title: string, message?: string) => void
    info: (title: string, message?: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}

const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-ae-cyan" />,
}

const borderColors = {
    success: 'border-l-green-500',
    error: 'border-l-red-500',
    warning: 'border-l-yellow-500',
    info: 'border-l-blue-500',
}

// Confetti particle component
function ConfettiParticle({ index }: { index: number }) {
    const colors = ['#f97316', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899']
    const color = colors[index % colors.length]
    // Deterministic pseudo-random from index keeps render pure
    const rand = (n: number) => (Math.sin(n * 127.1 + 311.7) + 1) / 2

    return (
        <motion.div
            className="absolute w-2 h-2 rounded-full"
            style={{
                backgroundColor: color,
                left: '50%',
                top: '50%',
            }}
            initial={{
                scale: 0,
                x: 0,
                y: 0,
            }}
            animate={{
                scale: [0, 1, 1, 0],
                x: Math.cos((index * 30) * Math.PI / 180) * (80 + rand(index) * 40),
                y: Math.sin((index * 30) * Math.PI / 180) * (80 + rand(index + 7) * 40) - 20,
                rotate: rand(index + 13) * 720,
            }}
            transition={{
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1],
                delay: index * 0.02,
            }}
        />
    )
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`
                relative overflow-hidden
                flex items-start gap-3 p-4
                bg-card border border-border border-l-4 ${borderColors[toast.type]}
                rounded-lg shadow-lg
                min-w-[300px] max-w-md
            `}
        >
            {/* Confetti for success with showConfetti */}
            {toast.type === 'success' && toast.showConfetti && (
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                        <ConfettiParticle key={i} index={i} />
                    ))}
                </div>
            )}
            
            <div className="flex-shrink-0 mt-0.5">
                {icons[toast.type]}
            </div>
            
            <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">
                    {toast.title}
                </p>
                {toast.message && (
                    <p className="mt-1 text-sm text-muted-foreground">
                        {toast.message}
                    </p>
                )}
            </div>
            
            <button
                onClick={onRemove}
                className="flex-shrink-0 p-1 hover:bg-muted rounded transition-colors"
            >
                <X className="w-4 h-4 text-muted-foreground" />
            </button>
        </motion.div>
    )
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])
    
    const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9)
        const newToast = { ...toast, id }
        
        setToasts(prev => [...prev, newToast])
        
        // Auto remove after duration
        const duration = toast.duration || 5000
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id))
        }, duration)
    }, [])
    
    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])
    
    const success = useCallback((title: string, message?: string, showConfetti: boolean = false) => {
        addToast({ type: 'success', title, message, showConfetti })
    }, [addToast])
    
    const error = useCallback((title: string, message?: string) => {
        addToast({ type: 'error', title, message })
    }, [addToast])
    
    const warning = useCallback((title: string, message?: string) => {
        addToast({ type: 'warning', title, message })
    }, [addToast])
    
    const info = useCallback((title: string, message?: string) => {
        addToast({ type: 'info', title, message })
    }, [addToast])
    
    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast, success, error, warning, info }}>
            {children}
            
            {/* Toast container */}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                <AnimatePresence mode="popLayout">
                    {toasts.map(toast => (
                        <ToastItem
                            key={toast.id}
                            toast={toast}
                            onRemove={() => removeToast(toast.id)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    )
}
