'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber'
import { RoundedBox, Float, AdaptiveDpr } from '@react-three/drei'
import * as THREE from 'three'

const AE_PURPLE = '#9999ff'
const AE_CYAN = '#00c8ff'
const SYN_ORANGE = '#ce9178'
const SYN_TEAL = '#4ec9b0'
const SYN_MAGENTA = '#c586c0'
const SYN_YELLOW = '#dcdcaa'
const PANEL_BODY = '#0f0f17'
const PANEL_BAR = '#16161f'
const GUTTER = '#33334a'

const CODE_LINES: Array<{ indent: number; width: number; color: string }> = [
    { indent: 0, width: 1.5, color: SYN_MAGENTA },
    { indent: 0, width: 2.2, color: SYN_TEAL },
    { indent: 0, width: 0, color: GUTTER },
    { indent: 0, width: 1.9, color: SYN_MAGENTA },
    { indent: 1, width: 2.3, color: SYN_ORANGE },
    { indent: 1, width: 1.6, color: SYN_YELLOW },
    { indent: 2, width: 2.0, color: SYN_TEAL },
    { indent: 2, width: 1.3, color: SYN_ORANGE },
    { indent: 1, width: 0, color: GUTTER },
    { indent: 0, width: 1.1, color: SYN_MAGENTA },
]

const TIMELINE_LAYERS: Array<{ start: number; length: number; color: string }> = [
    { start: 0.0, length: 2.5, color: AE_PURPLE },
    { start: 0.45, length: 1.7, color: AE_CYAN },
    { start: 0.15, length: 2.9, color: SYN_MAGENTA },
    { start: 1.0, length: 1.4, color: SYN_TEAL },
    { start: 0.65, length: 2.1, color: SYN_YELLOW },
]

function PanelShell({ children, width = 4.4, height = 3 }: { children?: React.ReactNode; width?: number; height?: number }) {
    return (
        <>
            <RoundedBox args={[width, height, 0.14]} radius={0.09} smoothness={4}>
                <meshPhysicalMaterial
                    color={PANEL_BODY}
                    roughness={0.3}
                    metalness={0.45}
                    clearcoat={1}
                    clearcoatRoughness={0.18}
                />
            </RoundedBox>
            <mesh position={[0, height / 2 - 0.19, 0.075]}>
                <planeGeometry args={[width, 0.38]} />
                <meshBasicMaterial color={PANEL_BAR} toneMapped={false} />
            </mesh>
            {children}
        </>
    )
}

function TrafficLights({ width = 4.4 }: { width?: number }) {
    return (
        <>
            {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
                <mesh key={c} position={[-width / 2 + 0.24 + i * 0.23, 1.31, 0.085]}>
                    <circleGeometry args={[0.055, 24]} />
                    <meshBasicMaterial color={c} toneMapped={false} />
                </mesh>
            ))}
        </>
    )
}

function KeyframeDiamond({
    position,
    color = AE_PURPLE,
    scale = 1,
}: {
    position: [number, number, number]
    color?: string
    scale?: number
}) {
    const ref = useRef<THREE.Mesh>(null)
    useFrame(({ clock }) => {
        if (!ref.current) return
        const s = scale * (0.92 + 0.08 * Math.sin(clock.elapsedTime * 2.4 + position[0] * 3))
        ref.current.scale.setScalar(s)
        ref.current.rotation.z = Math.PI / 4
    })
    return (
        <mesh ref={ref} position={position}>
            <boxGeometry args={[0.09, 0.09, 0.02]} />
            <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
    )
}

function CodePanel(props: ThreeElements['group']) {
    const cursor = useRef<THREE.Mesh>(null)

    useFrame(({ clock }) => {
        if (cursor.current) {
            const on = Math.floor(clock.elapsedTime * 1.6) % 2 === 0
            ;(cursor.current.material as THREE.MeshBasicMaterial).opacity = on ? 1 : 0
        }
    })

    return (
        <group {...props}>
            <PanelShell>
                <TrafficLights />
            </PanelShell>

            {CODE_LINES.map((line, i) => (
                <group key={i} position={[0, 0.92 - i * 0.2, 0.08]}>
                    <mesh position={[-2.02, 0, 0]}>
                        <planeGeometry args={[0.05, 0.055]} />
                        <meshBasicMaterial color={GUTTER} toneMapped={false} />
                    </mesh>
                    {line.width > 0 && (
                        <mesh position={[-1.78 + line.indent * 0.2 + line.width / 2, 0, 0]}>
                            <planeGeometry args={[line.width, 0.07]} />
                            <meshBasicMaterial color={line.color} toneMapped={false} />
                        </mesh>
                    )}
                </group>
            ))}

            <mesh ref={cursor} position={[-0.6, -1.08, 0.08]}>
                <planeGeometry args={[0.035, 0.13]} />
                <meshBasicMaterial color="#ffffff" transparent toneMapped={false} />
            </mesh>

            <pointLight position={[0, 0, 1.5]} color={AE_CYAN} intensity={2.2} distance={7} />
        </group>
    )
}

function CompositionPanel(props: ThreeElements['group']) {
    const playhead = useRef<THREE.Group>(null)

    useFrame(({ clock }) => {
        if (playhead.current) {
            const t = (clock.elapsedTime * 0.28) % 1
            playhead.current.position.x = -1.9 + t * 3.8
        }
    })

    return (
        <group {...props}>
            <PanelShell>
                <TrafficLights />
            </PanelShell>

            <mesh position={[0, 0.6, 0.08]}>
                <planeGeometry args={[3.95, 1.0]} />
                <meshBasicMaterial color="#0a0a11" toneMapped={false} />
            </mesh>
            <mesh position={[0, 0.6, 0.088]}>
                <planeGeometry args={[3.85, 0.9]} />
                <meshBasicMaterial color={AE_PURPLE} transparent opacity={0.16} toneMapped={false} />
            </mesh>
            <mesh position={[0, 0.6, 0.094]}>
                <ringGeometry args={[0.15, 0.19, 32]} />
                <meshBasicMaterial color={AE_CYAN} toneMapped={false} />
            </mesh>
            <mesh position={[0, 0.6, 0.096]}>
                <ringGeometry args={[0.26, 0.275, 48]} />
                <meshBasicMaterial color={AE_CYAN} transparent opacity={0.5} toneMapped={false} />
            </mesh>

            {TIMELINE_LAYERS.map((layer, i) => (
                <group key={i} position={[0, -0.2 - i * 0.19, 0.08]}>
                    <mesh position={[-2.0, 0, 0]}>
                        <planeGeometry args={[0.05, 0.09]} />
                        <meshBasicMaterial color={layer.color} toneMapped={false} />
                    </mesh>
                    <mesh position={[-1.86 + layer.start + layer.length / 2, 0, 0]}>
                        <planeGeometry args={[layer.length, 0.1]} />
                        <meshBasicMaterial color={layer.color} transparent opacity={0.8} toneMapped={false} />
                    </mesh>
                    <KeyframeDiamond
                        position={[-1.86 + layer.start, 0, 0.02]}
                        color={layer.color}
                        scale={0.8}
                    />
                    <KeyframeDiamond
                        position={[-1.86 + layer.start + layer.length, 0, 0.02]}
                        color={layer.color}
                        scale={0.8}
                    />
                </group>
            ))}

            <group ref={playhead} position={[0, -0.58, 0.1]}>
                <mesh>
                    <planeGeometry args={[0.02, 1.25]} />
                    <meshBasicMaterial color="#ffffff" toneMapped={false} />
                </mesh>
                <mesh position={[0, 0.66, 0]}>
                    <planeGeometry args={[0.12, 0.11]} />
                    <meshBasicMaterial color="#ffffff" toneMapped={false} />
                </mesh>
            </group>

            <pointLight position={[0, 0, 1.5]} color={AE_PURPLE} intensity={2.4} distance={7} />
        </group>
    )
}

/** Effect Controls / Inspector strip — third floating panel. */
function InspectorPanel(props: ThreeElements['group']) {
    const ROWS: Array<{ label: number; value: number; color: string }> = [
        { label: 1.2, value: 2.1, color: AE_CYAN },
        { label: 0.9, value: 1.6, color: SYN_YELLOW },
        { label: 1.4, value: 0.8, color: SYN_MAGENTA },
        { label: 0.7, value: 1.9, color: SYN_TEAL },
    ]

    return (
        <group {...props}>
            <PanelShell width={2.6} height={1.9}>
                <mesh position={[-1.18, 0.72, 0.08]}>
                    <circleGeometry args={[0.045, 16]} />
                    <meshBasicMaterial color="#ff5f57" toneMapped={false} />
                </mesh>
            </PanelShell>

            {ROWS.map((row, i) => (
                <group key={i} position={[0, 0.45 - i * 0.3, 0.08]}>
                    <mesh position={[-0.85 + row.label / 2, 0, 0]}>
                        <planeGeometry args={[row.label, 0.05]} />
                        <meshBasicMaterial color={GUTTER} toneMapped={false} />
                    </mesh>
                    <mesh position={[-0.85 + row.value / 2, -0.14, 0]}>
                        <planeGeometry args={[row.value, 0.07]} />
                        <meshBasicMaterial color={row.color} toneMapped={false} />
                    </mesh>
                </group>
            ))}

            <pointLight position={[0, 0, 1.2]} color={SYN_TEAL} intensity={1.6} distance={5} />
        </group>
    )
}

function cubicBezierPoint(
    t: number,
    p0: THREE.Vector3,
    p1: THREE.Vector3,
    p2: THREE.Vector3,
    p3: THREE.Vector3
) {
    const u = 1 - t
    return new THREE.Vector3()
        .addScaledVector(p0, u * u * u)
        .addScaledVector(p1, 3 * u * u * t)
        .addScaledVector(p2, 3 * u * t * t)
        .addScaledVector(p3, t * t * t)
}

const BRIDGE_P0 = new THREE.Vector3(-0.85, -0.5, 0.3)
const BRIDGE_P1 = new THREE.Vector3(-0.3, -1.05, 0.7)
const BRIDGE_P2 = new THREE.Vector3(0.3, -1.05, 0.7)
const BRIDGE_P3 = new THREE.Vector3(0.85, -0.5, 0.3)

function DataBridge() {
    const dot = useRef<THREE.Mesh>(null)

    const points = useMemo(
        () => Array.from({ length: 81 }, (_, i) => cubicBezierPoint(i / 80, BRIDGE_P0, BRIDGE_P1, BRIDGE_P2, BRIDGE_P3)),
        []
    )

    const line = useMemo(() => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({
            color: AE_CYAN,
            transparent: true,
            opacity: 0.4,
        })
        return new THREE.Line(geometry, material)
    }, [points])

    const handleLines = useMemo(() => {
        const make = (a: THREE.Vector3, b: THREE.Vector3) => {
            const geometry = new THREE.BufferGeometry().setFromPoints([a, b])
            const material = new THREE.LineBasicMaterial({ color: AE_PURPLE, transparent: true, opacity: 0.35 })
            return new THREE.Line(geometry, material)
        }
        return [make(BRIDGE_P0, BRIDGE_P1), make(BRIDGE_P3, BRIDGE_P2)]
    }, [])

    useFrame(({ clock }) => {
        if (!dot.current) return
        const t = (clock.elapsedTime * 0.22) % 1
        dot.current.position.copy(points[Math.floor(t * (points.length - 1))])
    })

    return (
        <group>
            <primitive object={line} />
            {handleLines.map((handle, i) => (
                <primitive key={i} object={handle} />
            ))}
            {[BRIDGE_P0, BRIDGE_P1, BRIDGE_P2, BRIDGE_P3].map((p, i) => (
                <mesh key={i} position={p}>
                    <sphereGeometry args={[0.035, 12, 12]} />
                    <meshBasicMaterial color={AE_PURPLE} toneMapped={false} />
                </mesh>
            ))}
            {/* Keyframes along the motion path */}
            {[0.12, 0.3, 0.5, 0.7, 0.88].map((t) => {
                const p = cubicBezierPoint(t, BRIDGE_P0, BRIDGE_P1, BRIDGE_P2, BRIDGE_P3)
                return <KeyframeDiamond key={t} position={[p.x, p.y, p.z + 0.02]} color={AE_CYAN} scale={0.9} />
            })}
            <mesh ref={dot}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshBasicMaterial color={AE_CYAN} toneMapped={false} />
            </mesh>
        </group>
    )
}

function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
    const target = useRef(new THREE.Vector2(0, 0))

    useFrame(({ camera, pointer, clock }) => {
        if (reducedMotion) return
        target.current.lerp(pointer, 0.04)
        const dolly = Math.sin(clock.elapsedTime * 0.12) * 0.35
        camera.position.x = target.current.x * 1.15 + dolly
        camera.position.y = 0.28 + target.current.y * 0.5
        camera.lookAt(0, 0, 0)
    })

    return null
}

export function WorkspaceScene({ reducedMotion = false }: { reducedMotion?: boolean }) {
    return (
        <Canvas
            dpr={[1, 1.75]}
            camera={{ position: [0, 0.12, 8.6], fov: 38 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
            <fog attach="fog" args={['#07070c', 9, 19]} />

            <ambientLight intensity={0.5} />
            <directionalLight position={[4, 6, 5]} intensity={1.2} />
            <spotLight position={[-6, 4, 6]} angle={0.5} penumbra={1} intensity={45} color={AE_PURPLE} />
            <spotLight position={[6, -3, 5]} angle={0.5} penumbra={1} intensity={35} color={AE_CYAN} />

            <Float
                speed={reducedMotion ? 0 : 1.1}
                rotationIntensity={reducedMotion ? 0 : 0.16}
                floatIntensity={reducedMotion ? 0 : 0.35}
            >
                <CodePanel position={[-1.62, 0.5, 0]} rotation={[0.05, 0.46, -0.04]} scale={0.58} />
            </Float>

            <Float
                speed={reducedMotion ? 0 : 0.9}
                rotationIntensity={reducedMotion ? 0 : 0.16}
                floatIntensity={reducedMotion ? 0 : 0.4}
            >
                <CompositionPanel position={[1.62, -0.45, 0]} rotation={[0.05, -0.46, 0.04]} scale={0.58} />
            </Float>

            <Float
                speed={reducedMotion ? 0 : 0.7}
                rotationIntensity={reducedMotion ? 0 : 0.1}
                floatIntensity={reducedMotion ? 0 : 0.25}
            >
                <InspectorPanel position={[0.1, 1.35, -0.9]} rotation={[0.12, 0.02, 0]} scale={0.44} />
            </Float>

            <DataBridge />
            <CameraRig reducedMotion={reducedMotion} />
            <AdaptiveDpr pixelated />
        </Canvas>
    )
}
