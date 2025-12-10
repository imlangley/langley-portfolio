'use client'

import { GitBranch, Wifi, Bell, Check, XCircle, AlertTriangle } from 'lucide-react'

export function StatusBar() {
    return (
        <div className="h-6 w-full bg-[#007acc] text-white flex items-center justify-between px-3 fixed bottom-0 left-0 z-50 select-none text-[11px] font-medium tracking-wide">
            {/* Left: Git & Errors */}
            <div className="flex items-center gap-4 h-full">
                <div className="flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-pointer transition-colors h-4">
                    <GitBranch className="w-3 h-3" />
                    <span>main*</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-pointer transition-colors h-4">
                    <XCircle className="w-3 h-3" />
                    <span>0</span>
                    <AlertTriangle className="w-3 h-3 ml-1" />
                    <span>0</span>
                </div>
            </div>

            {/* Right: Language, Spacing, Feedback */}
            <div className="flex items-center gap-4 h-full">
                <div className="flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-pointer transition-colors h-4">
                    <span className="hidden sm:inline">Ln 12, Col 44</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-pointer transition-colors h-4">
                    <span>UTF-8</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-pointer transition-colors h-4">
                    <span>TypeScript React</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-white/10 px-1 rounded cursor-pointer transition-colors h-4">
                    <Wifi className="w-3 h-3" />
                    <span className="ml-1">Go Live</span>
                </div>
                <div className="hover:bg-white/10 px-1 rounded cursor-pointer transition-colors h-4 flex items-center">
                    <Bell className="w-3 h-3" />
                </div>
            </div>
        </div>
    )
}
