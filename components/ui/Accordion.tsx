import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// Since we haven't installed radix-ui/react-accordion, we should install it OR
// build a simple custom one. Given the constraint to use what we have, 
// I will build a simple custom one using Framer Motion to avoid adding more deps unplanned.
// Actually, I'll use Framer Motion as it's already installed.

import { motion, AnimatePresence } from 'framer-motion'

interface AccordionItemProps {
    value: string
    trigger: React.ReactNode
    children: React.ReactNode
    isOpen?: boolean
    onClick?: () => void
}

export function Accordion({ children, className }: { children: React.ReactNode, className?: string }) {
    // Simple state management for one-at-a-time opening
    const [openItem, setOpenItem] = React.useState<string | null>(null)

    return (
        <div className={cn("space-y-2", className)}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    const childElement = child as any
                    return React.cloneElement(childElement, {
                        isOpen: childElement.props.value === openItem,
                        onClick: () => setOpenItem(childElement.props.value === openItem ? null : childElement.props.value),
                    })
                }
                return child
            })}
        </div>
    )
}

export function AccordionItem({ value, children }: { value: string, children: React.ReactNode }) {
    return <div className="border border-border rounded-lg overflow-hidden">{children}</div>
}

export function AccordionTrigger({ children, onClick, isOpen }: any) {
    return (
        <button
            onClick={onClick}
            className="flex flex-1 items-center justify-between w-full p-4 font-medium transition-all hover:bg-muted/50 [&[data-state=open]>svg]:rotate-180"
            data-state={isOpen ? "open" : "closed"}
        >
            {children}
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </button>
    )
}

export function AccordionContent({ children, isOpen }: any) {
    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <div className="p-4 pt-0 text-sm text-muted-foreground">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
