'use client'

import { Activity, Gamepad2, Globe, Server, type LucideIcon } from 'lucide-react'
import { UptimeBar } from './UptimeBar'
import { cn } from '@/lib/utils'

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

const statusConfig: Record<string, { label: string; tone: string; bar: string }> = {
    up: { label: 'Operational', tone: 'text-syn-green', bar: 'bg-syn-green' },
    down: { label: 'Down', tone: 'text-ae-pink', bar: 'bg-ae-pink' },
    pending: { label: 'Checking', tone: 'text-syn-yellow', bar: 'bg-syn-yellow' },
    maintenance: { label: 'Maintenance', tone: 'text-ae-cyan', bar: 'bg-ae-cyan' },
    unknown: { label: 'Unknown', tone: 'text-shell-text-muted', bar: 'bg-shell-text-muted' },
}

const typeIcons: Record<string, LucideIcon> = {
    http: Globe,
    https: Globe,
    port: Gamepad2,
    ping: Activity,
    tcp: Server,
    keyword: Globe,
    default: Server,
}

export function StatusCard({ monitor }: StatusCardProps) {
    const status = statusConfig[monitor.status] || statusConfig.unknown
    const Icon = typeIcons[monitor.type] || typeIcons.default

    return (
        <article className="rounded-md border border-shell-border bg-shell-bg p-4">
            <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-shell-border bg-shell-bg-alt">
                        <Icon className={cn('h-4 w-4', status.tone)} aria-hidden="true" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-shell-text">{monitor.name}</h2>
                        <p className="font-mono text-[11px] capitalize text-shell-text-muted">{monitor.type}</p>
                    </div>
                </div>
                <span className={cn('font-mono text-[11px] font-medium', status.tone)}>{status.label}</span>
            </div>

            <div className="mb-3">
                <div className="mb-1.5 flex items-center justify-between font-mono text-[11px]">
                    <span className="text-shell-text-muted">24h uptime</span>
                    <span className={status.tone}>{monitor.uptime24h.toFixed(2)}%</span>
                </div>
                <UptimeBar percentage={monitor.uptime24h} />
            </div>

            <div className="flex items-center justify-between font-mono text-[11px] text-shell-text-muted">
                <span>
                    Ping:{' '}
                    <span className="text-shell-text">
                        {monitor.lastPing !== null ? `${monitor.lastPing}ms` : '--'}
                    </span>
                </span>
                {monitor.lastCheck && (
                    <span>Last: {new Date(monitor.lastCheck).toLocaleTimeString()}</span>
                )}
            </div>
        </article>
    )
}
