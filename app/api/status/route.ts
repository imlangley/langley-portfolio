import { NextResponse } from 'next/server'

// Types for Uptime Kuma API response
interface UptimeKumaMonitor {
    id: number
    name: string
    type: string
}

interface UptimeKumaHeartbeat {
    status: number // 0=DOWN, 1=UP, 2=PENDING, 3=MAINTENANCE
    time: string
    msg: string
    ping: number | null
}

interface StatusPageResponse {
    config: {
        slug: string
        title: string
    }
    publicGroupList: Array<{
        id: number
        name: string
        monitorList: UptimeKumaMonitor[]
    }>
}

interface HeartbeatResponse {
    heartbeatList: Record<string, UptimeKumaHeartbeat[]>
    uptimeList: Record<string, number>
}

export interface MonitorStatus {
    id: number
    name: string
    type: string
    status: 'up' | 'down' | 'pending' | 'maintenance' | 'unknown'
    uptime24h: number
    lastPing: number | null
    lastCheck: string | null
}

export interface StatusResponse {
    monitors: MonitorStatus[]
    timestamp: string
    error?: string
}

const UPTIME_KUMA_URL = process.env.UPTIME_KUMA_URL || 'http://20.205.14.126:3001'
const STATUS_PAGE_SLUG = process.env.UPTIME_KUMA_SLUG || 'main'

// Map Uptime Kuma status codes to readable status
function mapStatus(code: number): MonitorStatus['status'] {
    switch (code) {
        case 0: return 'down'
        case 1: return 'up'
        case 2: return 'pending'
        case 3: return 'maintenance'
        default: return 'unknown'
    }
}

export async function GET() {
    try {
        // Fetch status page data and heartbeats in parallel
        const [statusRes, heartbeatRes] = await Promise.all([
            fetch(`${UPTIME_KUMA_URL}/api/status-page/${STATUS_PAGE_SLUG}`, {
                next: { revalidate: 30 }, // Cache for 30 seconds
            }),
            fetch(`${UPTIME_KUMA_URL}/api/status-page/heartbeat/${STATUS_PAGE_SLUG}`, {
                next: { revalidate: 30 },
            }),
        ])

        if (!statusRes.ok || !heartbeatRes.ok) {
            throw new Error('Failed to fetch from Uptime Kuma')
        }

        const statusData: StatusPageResponse = await statusRes.json()
        const heartbeatData: HeartbeatResponse = await heartbeatRes.json()

        // Flatten all monitors from groups
        const allMonitors = statusData.publicGroupList.flatMap(group => group.monitorList)

        // Build monitor status array
        const monitors: MonitorStatus[] = allMonitors.map(monitor => {
            const heartbeats = heartbeatData.heartbeatList[monitor.id.toString()] || []
            const latestHeartbeat = heartbeats[heartbeats.length - 1]
            const uptimeKey = `${monitor.id}_24`
            const uptime24h = heartbeatData.uptimeList[uptimeKey] ?? 0

            return {
                id: monitor.id,
                name: monitor.name,
                type: monitor.type,
                status: latestHeartbeat ? mapStatus(latestHeartbeat.status) : 'unknown',
                uptime24h: Math.round(uptime24h * 10000) / 100, // Convert to percentage with 2 decimals
                lastPing: latestHeartbeat?.ping ?? null,
                lastCheck: latestHeartbeat?.time ?? null,
            }
        })

        const response: StatusResponse = {
            monitors,
            timestamp: new Date().toISOString(),
        }

        return NextResponse.json(response, {
            headers: {
                'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
            },
        })
    } catch (error) {
        console.error('Status API error:', error)
        
        // Return fallback/demo data when Uptime Kuma is not accessible
        const fallbackResponse: StatusResponse = {
            monitors: [
                {
                    id: 1,
                    name: 'Minecraft Server',
                    type: 'port',
                    status: 'unknown',
                    uptime24h: 0,
                    lastPing: null,
                    lastCheck: null,
                },
                {
                    id: 2,
                    name: 'Portfolio',
                    type: 'http',
                    status: 'unknown',
                    uptime24h: 0,
                    lastPing: null,
                    lastCheck: null,
                },
                {
                    id: 3,
                    name: 'Azure VM',
                    type: 'ping',
                    status: 'unknown',
                    uptime24h: 0,
                    lastPing: null,
                    lastCheck: null,
                },
                {
                    id: 4,
                    name: 'Pterodactyl Panel',
                    type: 'http',
                    status: 'unknown',
                    uptime24h: 0,
                    lastPing: null,
                    lastCheck: null,
                },
            ],
            timestamp: new Date().toISOString(),
            error: 'Unable to fetch live status. Showing placeholder data.',
        }

        return NextResponse.json(fallbackResponse, {
            status: 200, // Still return 200 so the page renders
            headers: {
                'Cache-Control': 'public, s-maxage=10',
            },
        })
    }
}
