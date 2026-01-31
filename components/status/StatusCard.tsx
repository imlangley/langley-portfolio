'use client'

import { motion } from 'motion/react'
import { Server, Globe, Activity, Gamepad2 } from 'lucide-react'
import { StarBorder } from '@/components/reactbits'
import { UptimeBar } from './UptimeBar'

export interface MonitorData {
    id: number
    name: string
    type: string
    status: 'up' | 'down' | 'pending' | 'maintenance' | 'unknown'
    uptime24h: number
    lastPing: number | null
    lastCheck: string | null
}

interface StatusCardProps {
    monitor: MonitorData
    index: number
}

const statusConfig = {
    up: {
        color: 'bg-green-500',
        ringColor: 'ring-green-500/30',
        text: 'Operational',
        textColor: 'text-green-500',
    },
    down: {
        color: 'bg-red-500',
        ringColor: 'ring-red-500/30',
        text: 'Down',
        textColor: 'text-red-500',
    },
    pending: {
        color: 'bg-yellow-500',
        ringColor: 'ring-yellow-500/30',
        text: 'Checking',
        textColor: 'text-yellow-500',
    },
    maintenance: {
        color: 'bg-blue-500',
        ringColor: 'ring-blue-500/30',
        text: 'Maintenance',
        textColor: 'text-blue-500',
    },
    unknown: {
        color: 'bg-gray-500',
        ringColor: 'ring-gray-500/30',
        text: 'Unknown',
        textColor: 'text-gray-500',
    },
}

const typeIcons: Record<string, React.ElementType> = {
    http: Globe,
    https: Globe,
    port: Gamepad2,
    ping: Activity,
    tcp: Server,
    keyword: Globe,
    default: Server,
}

export function StatusCard({ monitor, index }: StatusCardProps) {
    const status = statusConfig[monitor.status] || statusConfig.unknown
    const Icon = typeIcons[monitor.type] || typeIcons.default

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
        >
            <StarBorder 
                color={monitor.status === 'up' ? 'hsl(142, 76%, 36%)' : 'hsl(var(--primary))'} 
                speed={20}
            >
                <div className="p-6 rounded-2xl bg-card h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <motion.div
                                className={`w-10 h-10 rounded-xl ${status.color}/20 flex items-center justify-center`}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                <Icon className={`w-5 h-5 ${status.textColor}`} />
                            </motion.div>
                            <div>
                                <h3 className="font-bold text-lg">{monitor.name}</h3>
                                <p className="text-sm text-muted-foreground capitalize">{monitor.type}</p>
                            </div>
                        </div>
                        
                        {/* Status indicator */}
                        <div className="flex items-center gap-2">
                            <motion.div
                                className={`w-3 h-3 rounded-full ${status.color} ring-4 ${status.ringColor}`}
                                animate={monitor.status === 'up' ? { scale: [1, 1.2, 1] } : {}}
                                transition={{ repeat: Infinity, duration: 2 }}
                            />
                            <span className={`text-sm font-medium ${status.textColor}`}>
                                {status.text}
                            </span>
                        </div>
                    </div>

                    {/* Uptime bar */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">24h Uptime</span>
                            <span className={`text-sm font-bold ${monitor.uptime24h >= 99 ? 'text-green-500' : monitor.uptime24h >= 95 ? 'text-yellow-500' : 'text-red-500'}`}>
                                {monitor.uptime24h.toFixed(2)}%
                            </span>
                        </div>
                        <UptimeBar percentage={monitor.uptime24h} />
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                        <div className="text-muted-foreground">
                            {monitor.lastPing !== null ? (
                                <span>Ping: <span className="text-foreground font-medium">{monitor.lastPing}ms</span></span>
                            ) : (
                                <span>Ping: --</span>
                            )}
                        </div>
                        {monitor.lastCheck && (
                            <div className="text-muted-foreground">
                                Last check: {new Date(monitor.lastCheck).toLocaleTimeString()}
                            </div>
                        )}
                    </div>
                </div>
            </StarBorder>
        </motion.div>
    )
}
