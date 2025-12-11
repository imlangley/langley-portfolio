'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Instagram, ExternalLink, CheckCircle2, Clock, PlayCircle } from 'lucide-react'

export function Footer() {
    const currentYear = new Date().getFullYear()

    const SOCIALS = [
        { label: 'GitHub', href: 'https://github.com/imlangley', icon: Github },
        { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
        { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
        { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
    ]

    const QUEUE_ITEMS = [
        { id: 1, name: 'Portfolio_v2.aep', status: 'Rendering', progress: 65, color: 'bg-blue-500' },
        { id: 2, name: 'Client_Work_2024.prproj', status: 'Queued', progress: 0, color: 'bg-gray-600' },
        { id: 3, name: 'Showreel_Final.mov', status: 'Done', progress: 100, color: 'bg-green-500' },
    ]

    return (
        <footer className="w-full bg-[#161616] border-t border-[#333] font-sans text-xs select-none z-10 relative">

            {/* Render Queue Header */}
            <div className="flex items-center gap-4 px-4 py-2 bg-[#1f1f1f] border-b border-[#333] text-gray-400 font-medium uppercase tracking-wider text-[10px]">
                <div className="w-4 h-4 rounded-sm bg-[#333] flex items-center justify-center">
                    <PlayCircle className="w-3 h-3" />
                </div>
                <span>Render Queue</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">

                {/* LEFT: Render Status (Simulation) */}
                <div className="lg:col-span-8 border-b lg:border-b-0 lg:border-r border-[#333]">
                    <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-[#1a1a1a] text-[10px] text-gray-500 font-medium border-b border-white/5">
                        <div className="col-span-4">Comp Name</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-6">Progress</div>
                    </div>

                    <div className="divide-y divide-[#222]">
                        {QUEUE_ITEMS.map((item) => (
                            <div key={item.id} className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-[#1f1f1f] transition-colors group">
                                <div className="col-span-4 font-mono text-gray-300 truncate flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Rendering' ? 'bg-blue-500 animate-pulse' : item.status === 'Done' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                    {item.name}
                                </div>
                                <div className="col-span-2 text-gray-400 flex items-center gap-1.5">
                                    {item.status === 'Done' && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                                    {item.status === 'Queued' && <Clock className="w-3 h-3 text-yellow-500" />}
                                    {item.status === 'Rendering' && <span className="text-blue-400">Processing...</span>}
                                    {item.status !== 'Rendering' && item.status}
                                </div>
                                <div className="col-span-6">
                                    <div className="h-1.5 w-full bg-[#111] rounded-full overflow-hidden relative">
                                        <motion.div
                                            className={`absolute top-0 bottom-0 left-0 ${item.color}`}
                                            initial={{ width: `${item.progress}%` }}
                                            animate={
                                                item.status === 'Rendering'
                                                    ? { width: ['65%', '70%'], opacity: [1, 0.8, 1] }
                                                    : { width: `${item.progress}%` }
                                            }
                                            transition={
                                                item.status === 'Rendering'
                                                    ? { duration: 2, repeat: Infinity, repeatType: "reverse" }
                                                    : {}
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Quick Links & Meta */}
                <div className="lg:col-span-4 bg-[#1a1a1a] p-6 flex flex-col justify-between gap-8">

                    <div className="space-y-4">
                        <h4 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Output Module</h4>
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                            <Link href="/projects" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-1">
                                <ExternalLink className="w-3 h-3" /> Projects
                            </Link>
                            <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-1">
                                <ExternalLink className="w-3 h-3" /> About
                            </Link>
                            <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-1">
                                <ExternalLink className="w-3 h-3" /> Contact
                            </Link>
                            <Link href="/studio" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-1">
                                <ExternalLink className="w-3 h-3 text-purple-500" /> Studio
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-2">
                            Social Output
                            <div className="h-px bg-[#333] flex-1" />
                        </h4>
                        <div className="flex gap-3">
                            {SOCIALS.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 rounded bg-[#222] border border-[#333] flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all group"
                                    title={social.label}
                                >
                                    <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-[#333] flex items-center justify-between text-[10px] text-gray-600 font-mono">
                        <span>© {currentYear} Langley. All rights reserved.</span>
                        <span>v2.0.4 [Stable]</span>
                    </div>

                </div>
            </div>
        </footer>
    )
}
