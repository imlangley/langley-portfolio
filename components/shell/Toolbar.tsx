'use client'

import {
    MousePointer2,
    Hand,
    Search,
    Type,
    PenTool,
    RotateCw,
    Camera,
    Box,
    Layers,
    Move,
    FolderOpen,
    Home,
    User,
    Mail,
    Settings
} from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCursor } from '@/context/CursorContext'
import { Magnetic } from '@/components/ui/Magnetic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Toolbar() {
    const [activeTool, setActiveTool] = useState('select')
    const { setCursorVariant } = useCursor()
    const pathname = usePathname()

    const TOOLS = [
        { id: 'select', icon: MousePointer2, label: 'Selection Tool (V)', color: 'text-blue-400' },
        { id: 'hand', icon: Hand, label: 'Hand Tool (H)', color: 'text-white' },
        { id: 'zoom', icon: Search, label: 'Zoom Tool (Z)', color: 'text-white' }, // Search icon as Zoom proxy
        { id: 'rotate', icon: RotateCw, label: 'Rotation Tool (W)', color: 'text-white' },
        { id: 'camera', icon: Camera, label: 'Unified Camera Tool (C)', color: 'text-white' },
        { id: 'pan', icon: Move, label: 'Pan Behind (Anchor Point) (Y)', color: 'text-white' },
        { id: 'shape', icon: Box, label: 'Rectangle Tool (Q)', color: 'text-white' },
        { id: 'pen', icon: PenTool, label: 'Pen Tool (G)', color: 'text-white' },
        { id: 'text', icon: Type, label: 'Type Tool (T)', color: 'text-white' },
    ]

    const NAV_ITEMS = [
        { href: '/', icon: Home, label: 'Home' },
        { href: '/projects', icon: FolderOpen, label: 'Projects' },
        { href: '/about', icon: User, label: 'About' },
        { href: '/contact', icon: Mail, label: 'Contact' },
        { href: '/studio', icon: Settings, label: 'Studio' },
    ]

    const handleToolClick = (id: string) => {
        setActiveTool(id)
        // Future: Trigger global state change for cursor behavior
    }

    return (
        <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="fixed top-10 left-0 bottom-6 w-14 bg-[#1f1f1f] border-r border-[#333] flex flex-col items-center py-4 z-40 select-none hidden md:flex"
        >

            {/* Navigation Section (VSCode Style) */}
            <div className="flex flex-col gap-2 mb-4">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onMouseEnter={() => setCursorVariant('button')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="relative group"
                            data-testid={`nav-${item.label.toLowerCase()}`}
                        >
                            <Magnetic>
                                <div className={`p-2 rounded-md transition-all ${isActive ? 'text-blue-400 bg-[#2a2a2a] border-l-2 border-blue-500' : 'text-gray-400 hover:text-white hover:bg-[#2a2a2a]'}`}>
                                    <item.icon strokeWidth={1.5} className="w-5 h-5" />
                                </div>
                            </Magnetic>

                            {/* Tooltip */}
                            <div className="absolute left-12 top-1/2 -translate-y-1/2 py-1 px-2 bg-black border border-[#333] text-[10px] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl font-sans font-medium">
                                {item.label}
                                <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 border-[4px] border-transparent border-r-black" />
                            </div>
                        </Link>
                    )
                })}
            </div>

            {/* Divider */}
            <div className="w-8 h-px bg-[#333] mb-4" />

            {/* AE Tools Section (Decorative) */}
            <div className="flex flex-col gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300">
                {TOOLS.map((tool) => {
                    const isActive = activeTool === tool.id
                    return (
                        <div
                            key={tool.id}
                            onClick={() => handleToolClick(tool.id)}
                            onMouseEnter={() => setCursorVariant('button')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="relative group cursor-pointer"
                        >
                            {/* Active Indicator */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeTool"
                                    className="absolute -inset-1.5 bg-[#3a3a3a] rounded-md -z-10 border border-blue-500/20"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}

                            <Magnetic>
                                <div className={`p-1.5 rounded-sm transition-colors ${isActive ? 'text-blue-300' : 'text-gray-500 hover:text-gray-300'}`}>
                                    <tool.icon strokeWidth={1.5} className="w-5 h-5" />
                                </div>
                            </Magnetic>

                            {/* Tooltip (AE Style) */}
                            <div className="absolute left-10 top-1/2 -translate-y-1/2 py-1.5 px-3 bg-[#1e1e1e] border border-[#333] text-[10px] text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl ml-2 font-sans font-medium">
                                <span className="block mb-0.5 text-white">{tool.label}</span>
                                <span className="text-[9px] text-gray-500 uppercase tracking-wider">Decorative Only</span>
                                <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 border-[4px] border-transparent border-r-[#333]" />
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Bottom Panels Section (VSCode Hybrid) */}
            <div className="mt-auto flex flex-col gap-4">
                <div className="w-8 h-px bg-[#333]" />
                <div className="p-1.5 text-gray-500 hover:text-white cursor-pointer transition-colors group relative" title="Project Panel">
                    <Layers strokeWidth={1.5} className="w-5 h-5" />
                    <div className="absolute left-10 top-1/2 -translate-y-1/2 py-1 px-2 bg-black border border-[#333] text-[10px] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                        Project Panel
                    </div>
                </div>
            </div>

        </motion.div>
    )
}
