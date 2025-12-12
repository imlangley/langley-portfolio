'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useState, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface AccordionItem {
    id: string
    title: string
    content: ReactNode
    icon?: ReactNode
}

interface AccordionProps {
    items: AccordionItem[]
    allowMultiple?: boolean
    className?: string
}

export function Accordion({ 
    items, 
    allowMultiple = false,
    className = '' 
}: AccordionProps) {
    const [openItems, setOpenItems] = useState<string[]>([])
    
    const toggleItem = (id: string) => {
        if (allowMultiple) {
            setOpenItems(prev => 
                prev.includes(id) 
                    ? prev.filter(i => i !== id)
                    : [...prev, id]
            )
        } else {
            setOpenItems(prev => 
                prev.includes(id) ? [] : [id]
            )
        }
    }
    
    return (
        <div className={`space-y-2 ${className}`}>
            {items.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-xl border border-border overflow-hidden bg-card"
                >
                    <motion.button
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                        onClick={() => toggleItem(item.id)}
                        whileTap={{ scale: 0.99 }}
                    >
                        <div className="flex items-center gap-3">
                            {item.icon && (
                                <span className="text-primary">
                                    {item.icon}
                                </span>
                            )}
                            <span className="font-medium text-foreground">
                                {item.title}
                            </span>
                        </div>
                        <motion.div
                            animate={{ rotate: openItems.includes(item.id) ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        </motion.div>
                    </motion.button>
                    
                    <AnimatePresence initial={false}>
                        {openItems.includes(item.id) && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                            >
                                <div className="p-4 pt-0 text-sm text-muted-foreground border-t border-border">
                                    {item.content}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    )
}
