'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, ArrowRight,  Home, User, Briefcase, Activity,  X } from 'lucide-react'

interface CommandItem {
    id: string
    title: string
    description?: string
    icon?: React.ReactNode
    shortcut?: string[]
    action: () => void
    category?: string
}

interface CommandMenuProps {
    items?: CommandItem[]
    onClose?: () => void
}

const defaultItems: CommandItem[] = [
    {
        id: 'home',
        title: 'Go to Home',
        description: 'Navigate to homepage',
        icon: <Home className="w-4 h-4" />,
        shortcut: ['G', 'H'],
        action: () => window.location.href = '/',
        category: 'Navigation',
    },
    {
        id: 'about',
        title: 'Go to About',
        description: 'Learn more about me',
        icon: <User className="w-4 h-4" />,
        shortcut: ['G', 'A'],
        action: () => window.location.href = '/about',
        category: 'Navigation',
    },
    {
        id: 'projects',
        title: 'Go to Projects',
        description: 'View all projects',
        icon: <Briefcase className="w-4 h-4" />,
        shortcut: ['G', 'P'],
        action: () => window.location.href = '/projects',
        category: 'Navigation',
    },
    {
        id: 'status',
        title: 'Go to Status',
        description: 'Server uptime monitoring',
        icon: <Activity className="w-4 h-4" />,
        shortcut: ['G', 'U'],
        action: () => window.location.href = '/uptime',
        category: 'Navigation',
    },
]

export function CommandMenu({ items = defaultItems, onClose }: CommandMenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [prevSearch, setPrevSearch] = useState(search)
    if (prevSearch !== search) {
        setPrevSearch(search)
        setSelectedIndex(0)
    }
    const inputRef = useRef<HTMLInputElement>(null)

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())
    )

    const groupedItems = filteredItems.reduce((acc, item) => {
        const category = item.category || 'General'
        if (!acc[category]) acc[category] = []
        acc[category].push(item)
        return acc
    }, {} as Record<string, CommandItem[]>)

    const close = useCallback(() => {
        setIsOpen(false)
        setSearch('')
        setSelectedIndex(0)
        onClose?.()
    }, [onClose])

    const executeItem = useCallback((item: CommandItem) => {
        close()
        item.action()
    }, [close])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Open with Cmd/Ctrl + K
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                setIsOpen(prev => !prev)
            }

            if (!isOpen) return

            // Close with Escape
            if (e.key === 'Escape') {
                close()
            }

            // Navigate with arrows
            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setSelectedIndex(prev =>
                    prev < filteredItems.length - 1 ? prev + 1 : 0
                )
            }

            if (e.key === 'ArrowUp') {
                e.preventDefault()
                setSelectedIndex(prev =>
                    prev > 0 ? prev - 1 : filteredItems.length - 1
                )
            }

            // Execute with Enter
            if (e.key === 'Enter' && filteredItems[selectedIndex]) {
                executeItem(filteredItems[selectedIndex])
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, filteredItems, selectedIndex, close, executeItem])

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={close}
                        />

                        {/* Command palette */}
                        <motion.div
                            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-50"
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="mx-4 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
                                {/* Search input */}
                                <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                                    <Search className="w-5 h-5 text-muted-foreground" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Type a command or search..."
                                        className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
                                    />
                                    <button
                                        onClick={close}
                                        className="p-1 hover:bg-muted rounded-md transition-colors"
                                    >
                                        <X className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                </div>

                                {/* Results - with scroll isolation */}
                                <div
                                    className="max-h-80 overflow-y-auto overscroll-contain p-2"
                                    onWheel={(e) => e.stopPropagation()}
                                >
                                    {Object.entries(groupedItems).map(([category, categoryItems]) => (
                                        <div key={category} className="mb-2">
                                            <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                {category}
                                            </div>
                                            {categoryItems.map((item) => {
                                                const globalIndex = filteredItems.indexOf(item)
                                                return (
                                                    <motion.button
                                                        key={item.id}
                                                        className={`
                                                            w-full flex items-center gap-3 px-3 py-2 rounded-lg
                                                            text-left transition-colors
                                                            ${globalIndex === selectedIndex
                                                                ? 'bg-primary text-primary-foreground'
                                                                : 'hover:bg-muted'
                                                            }
                                                        `}
                                                        onClick={() => executeItem(item)}
                                                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <span className={globalIndex === selectedIndex ? 'text-primary-foreground' : 'text-muted-foreground'}>
                                                            {item.icon}
                                                        </span>
                                                        <div className="flex-1">
                                                            <div className="font-medium text-sm">
                                                                {item.title}
                                                            </div>
                                                            {item.description && (
                                                                <div className={`text-xs ${globalIndex === selectedIndex ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                                                                    {item.description}
                                                                </div>
                                                            )}
                                                        </div>
                                                        {item.shortcut && (
                                                            <div className="flex gap-1">
                                                                {item.shortcut.map((key, i) => (
                                                                    <kbd
                                                                        key={i}
                                                                        className={`
                                                                            px-1.5 py-0.5 text-xs rounded border
                                                                            ${globalIndex === selectedIndex
                                                                                ? 'bg-primary-foreground/20 border-primary-foreground/30'
                                                                                : 'bg-muted border-border'
                                                                            }
                                                                        `}
                                                                    >
                                                                        {key}
                                                                    </kbd>
                                                                ))}
                                                            </div>
                                                        )}
                                                        <ArrowRight className={`w-4 h-4 ${globalIndex === selectedIndex ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                                                    </motion.button>
                                                )
                                            })}
                                        </div>
                                    ))}

                                    {filteredItems.length === 0 && (
                                        <div className="px-4 py-8 text-center text-muted-foreground">
                                            No results found for &quot;{search}&quot;
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="px-4 py-2 border-t border-border text-xs text-muted-foreground flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1 bg-muted rounded">↑↓</kbd>
                                        Navigate
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1 bg-muted rounded">↵</kbd>
                                        Select
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1 bg-muted rounded">esc</kbd>
                                        Close
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
