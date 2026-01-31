'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { RefreshCw, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'
import { SplitText, DecryptedText } from '@/components/reactbits'
import { StatusCard, type MonitorData } from '@/components/status'

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

    const fetchStatus = async (isRefresh = false) => {
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
    }

    useEffect(() => {
        fetchStatus()
        
        // Auto-refresh every 60 seconds
        const interval = setInterval(() => fetchStatus(true), 60000)
        return () => clearInterval(interval)
    }, [])

    // Calculate overall status
    const allUp = data?.monitors.every(m => m.status === 'up')
    const anyDown = data?.monitors.some(m => m.status === 'down')
    const overallStatus = anyDown ? 'down' : allUp ? 'up' : 'partial'

    return (
        <div className="min-h-screen pt-32 pb-20">
            {/* Background elements */}
            <div className="fixed top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="fixed bottom-1/4 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10" />

            <div className="container max-w-6xl">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <SplitText
                        text="Server Status"
                        className="text-5xl font-extrabold tracking-tight mb-4"
                        delay={40}
                    />
                    <motion.p
                        className="text-xl text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <DecryptedText 
                            text="Real-time monitoring for Langley's infrastructure" 
                            speed={30}
                        />
                    </motion.p>
                </motion.div>

                {/* Overall Status Banner */}
                <motion.div
                    className={`mb-8 p-6 rounded-2xl border ${
                        overallStatus === 'up' 
                            ? 'bg-green-500/10 border-green-500/30' 
                            : overallStatus === 'down'
                            ? 'bg-red-500/10 border-red-500/30'
                            : 'bg-yellow-500/10 border-yellow-500/30'
                    }`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {overallStatus === 'up' ? (
                                <CheckCircle2 className="w-8 h-8 text-green-500" />
                            ) : overallStatus === 'down' ? (
                                <AlertTriangle className="w-8 h-8 text-red-500" />
                            ) : (
                                <AlertTriangle className="w-8 h-8 text-yellow-500" />
                            )}
                            <div>
                                <h2 className={`text-xl font-bold ${
                                    overallStatus === 'up' 
                                        ? 'text-green-500' 
                                        : overallStatus === 'down'
                                        ? 'text-red-500'
                                        : 'text-yellow-500'
                                }`}>
                                    {overallStatus === 'up' 
                                        ? 'All Systems Operational' 
                                        : overallStatus === 'down'
                                        ? 'System Outage Detected'
                                        : 'Partial System Issues'}
                                </h2>
                                {data?.error && (
                                    <p className="text-sm text-muted-foreground mt-1">{data.error}</p>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            {lastUpdated && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    <span>Updated {lastUpdated.toLocaleTimeString()}</span>
                                </div>
                            )}
                            <motion.button
                                onClick={() => fetchStatus(true)}
                                disabled={refreshing}
                                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors disabled:opacity-50"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Loading state */}
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-48 rounded-2xl bg-card animate-pulse border border-border"
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content"
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {data?.monitors.map((monitor, index) => (
                                <StatusCard 
                                    key={monitor.id} 
                                    monitor={monitor} 
                                    index={index} 
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer info */}
                <motion.div
                    className="mt-12 text-center text-sm text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <p>Powered by Uptime Kuma. Auto-refreshes every 60 seconds.</p>
                </motion.div>
            </div>
        </div>
    )
}
