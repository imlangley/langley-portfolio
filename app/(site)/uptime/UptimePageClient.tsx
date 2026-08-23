'use client'

import { useCallback, useEffect, useState } from 'react'
import { AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react'
import { StatusCard, type MonitorData } from '@/components/status'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

interface StatusResponse {
    monitors: MonitorData[]
    timestamp: string
    error?: string
}

export function UptimePageClient() {
    const [data, setData] = useState<StatusResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

    const fetchStatus = useCallback(async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true)
        else setLoading(true)

        try {
            const res = await fetch('/api/status', { cache: 'no-store' })
            const json: StatusResponse = await res.json()
            setData(json)
            setLastUpdated(new Date())
        } catch (error) {
            console.error('Failed to fetch status:', error)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }, [])

    useEffect(() => {
        const initial = setTimeout(() => void fetchStatus(), 0)
        const interval = setInterval(() => {
            void fetchStatus(true)
        }, 60000)
        return () => {
            clearTimeout(initial)
            clearInterval(interval)
        }
    }, [fetchStatus])

    const allUp = data?.monitors.every((m) => m.status === 'up')
    const anyDown = data?.monitors.some((m) => m.status === 'down')
    const overallStatus = anyDown ? 'down' : allUp ? 'up' : 'partial'

    return (
        <section className="py-12 sm:py-16">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-shell-text-muted">
                        Status
                    </p>
                    <h1 className="mt-2 text-3xl font-black tracking-tight text-shell-text sm:text-4xl">
                        Server status
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Live telemetry for Langley infrastructure.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => void fetchStatus(true)}
                    disabled={refreshing}
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-shell-border bg-shell-bg px-4 py-2 text-sm text-shell-text transition-colors hover:border-shell-accent/50 disabled:opacity-50"
                >
                    <RefreshCw className={cn('h-3.5 w-3.5', refreshing && 'animate-spin')} aria-hidden="true" />
                    Refresh
                </button>
            </div>

            <div
                className={cn(
                    'mt-8 flex items-center gap-3 rounded-lg border px-4 py-4',
                    overallStatus === 'up' && 'border-syn-green/40 bg-shell-bg',
                    overallStatus === 'down' && 'border-ae-pink/40 bg-shell-bg',
                    overallStatus === 'partial' && 'border-syn-yellow/40 bg-shell-bg'
                )}
            >
                        {overallStatus === 'up' ? (
                            <CheckCircle2 className="h-6 w-6 shrink-0 text-syn-green" aria-hidden="true" />
                        ) : (
                            <AlertTriangle
                                className={cn(
                                    'h-6 w-6 shrink-0',
                                    overallStatus === 'down' ? 'text-ae-pink' : 'text-syn-yellow'
                                )}
                                aria-hidden="true"
                            />
                        )}
                        <div>
                            <p className="text-sm font-bold text-shell-text">
                                {overallStatus === 'up'
                                    ? 'All systems operational'
                                    : overallStatus === 'down'
                                      ? 'System outage detected'
                                      : 'Partial system issues'}
                            </p>
                            {data?.error && (
                                <p className="mt-1 font-mono text-[11px] text-muted-foreground">{data.error}</p>
                            )}
                        </div>
                    </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {loading ? (
                    <div className="contents">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-40 animate-pulse rounded-md border border-shell-border bg-shell-bg"
                                />
                            ))}
                        </div>
                    ) : (
                        data?.monitors.map((monitor, index) => (
                            <Reveal key={monitor.id} delay={(index % 2) * 0.08}>
                                <StatusCard monitor={monitor} index={index} />
                            </Reveal>
                        ))
                    )}
            </div>

            <p className="mt-8 text-center font-mono text-[11px] text-shell-text-muted">
                Powered by Uptime Kuma · auto-refresh 60s
                {lastUpdated && <span className="ml-1 opacity-70">({lastUpdated.toLocaleTimeString()})</span>}
            </p>
        </section>
    )
}
