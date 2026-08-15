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

function PanelShell({ children }: { children?: React.ReactNode }) {
    return (
        <>
            <RoundedBox args={[4.4, 3, 0.14]} radius={0.09} smoothness={4}>
                <meshPhysicalMaterial
                    color={PANEL_BODY}
                    roughness={0.3}
                    metalness={0.45}
                    clearcoat={1}
                    clearcoatRoughness={0.18}
                />
            </RoundedBox>
            <mesh position={[0, 1.31, 0.075]}>
                <planeGeometry args={[4.4, 0.38]} />
                <meshBasicMaterial color={PANEL_BAR} toneMapped={false} />
            </mesh>
            {children}
        </>
    )
}

function TrafficLights() {
    return (
        <>
            {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
                <mesh key={c} position={[-1.96 + i * 0.23, 1.31, 0.085]}>
                    <circleGeometry args={[0.055, 24]} />
                    <meshBasicMaterial color={c} toneMapped={false} />
                </mesh>
            ))}
        </>
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

function DataBridge() {
    const dot = useRef<THREE.Mesh>(null)

    const points = useMemo(() => {
        const p0 = new THREE.Vector3(-0.85, -0.5, 0.3)
        const p1 = new THREE.Vector3(-0.3, -1.05, 0.7)
        const p2 = new THREE.Vector3(0.3, -1.05, 0.7)
        const p3 = new THREE.Vector3(0.85, -0.5, 0.3)
        return Array.from({ length: 81 }, (_, i) => cubicBezierPoint(i / 80, p0, p1, p2, p3))
    }, [])

    const line = useMemo(() => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({
            color: AE_CYAN,
            transparent: true,
            opacity: 0.4,
        })
        return new THREE.Line(geometry, material)
    }, [points])

    useFrame(({ clock }) => {
        if (!dot.current) return
        const t = (clock.elapsedTime * 0.22) % 1
        dot.current.position.copy(points[Math.floor(t * (points.length - 1))])
    })

    return (
        <group>
            <primitive object={line} />
            <mesh ref={dot}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshBasicMaterial color={AE_CYAN} toneMapped={false} />
            </mesh>
        </group>
    )
}

function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
    const target = useRef(new THREE.Vector2(0, 0))

    useFrame(({ camera, pointer }) => {
        if (reducedMotion) return
        target.current.lerp(pointer, 0.04)
        camera.position.x = target.current.x * 1.15
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
                <CodePanel position={[-1.42, 0.4, 0]} rotation={[0.05, 0.44, -0.04]} scale={0.5} />
            </Float>

            <Float
                speed={reducedMotion ? 0 : 0.9}
                rotationIntensity={reducedMotion ? 0 : 0.16}
                floatIntensity={reducedMotion ? 0 : 0.4}
            >
                <CompositionPanel position={[1.42, -0.4, 0]} rotation={[0.05, -0.44, 0.04]} scale={0.5} />
            </Float>

            <DataBridge />
            <CameraRig reducedMotion={reducedMotion} />
            <AdaptiveDpr pixelated />
        </Canvas>
    )
}
