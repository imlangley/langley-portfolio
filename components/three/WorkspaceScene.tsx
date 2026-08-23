'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber'
import {
    RoundedBox,
    Float,
    AdaptiveDpr,
    Environment,
    Lightformer,
    Sparkles,
    MeshTransmissionMaterial,
} from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import type { MutableRefObject } from 'react'
import type { SceneTier } from './WorkspaceCanvas'

const AE_PURPLE = '#9999ff'
const AE_CYAN = '#00c8ff'
const SYN_ORANGE = '#ce9178'
const SYN_TEAL = '#4ec9b0'
const SYN_MAGENTA = '#c586c0'
const SYN_YELLOW = '#dcdcaa'
const PANEL_BODY = '#0f0f17'
const PANEL_BAR = '#16161f'
const GUTTER = '#33334a'

/* ------------------------------------------------------------------ */
/* Panels                                                              */
/* ------------------------------------------------------------------ */

function PanelShell({
    children,
    width = 4.4,
    height = 3,
    bar = true,
}: {
    children?: React.ReactNode
    width?: number
    height?: number
    bar?: boolean
}) {
    return (
        <>
            <RoundedBox args={[width, height, 0.14]} radius={0.09} smoothness={4}>
                <meshPhysicalMaterial
                    color={PANEL_BODY}
                    roughness={0.22}
                    metalness={0.78}
                    clearcoat={1}
                    clearcoatRoughness={0.14}
                    envMapIntensity={1.15}
                />
            </RoundedBox>
            {bar && (
                <mesh position={[0, height / 2 - 0.19, 0.075]}>
                    <planeGeometry args={[width, 0.38]} />
                    <meshBasicMaterial color={PANEL_BAR} toneMapped={false} />
                </mesh>
            )}
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

/** Rotated square that pulses — AE keyframe. */
function KeyframeDiamond({
    position,
    color = AE_PURPLE,
    scale = 1,
    offset = 0,
}: {
    position: [number, number, number]
    color?: string
    scale?: number
    offset?: number
}) {
    const ref = useRef<THREE.Mesh>(null)
    useFrame(({ clock }) => {
        if (!ref.current) return
        const t = clock.elapsedTime * 2.4 + offset
        ref.current.scale.setScalar(scale * (0.9 + 0.1 * Math.sin(t)))
        ref.current.rotation.z = Math.PI / 4
    })
    return (
        <mesh ref={ref} position={position}>
            <boxGeometry args={[0.09, 0.09, 0.02]} />
            <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
    )
}

/* Code panel — lines "type" in on a loop. */
function CodePanel(props: ThreeElements['group']) {
    const cursor = useRef<THREE.Mesh>(null)
    const groups = useRef<THREE.Group[]>([])

    const LINES: Array<{ indent: number; width: number; color: string }> = [
        { indent: 0, width: 1.5, color: SYN_MAGENTA },
        { indent: 0, width: 2.2, color: SYN_TEAL },
        { indent: 1, width: 2.3, color: SYN_ORANGE },
        { indent: 1, width: 1.6, color: SYN_YELLOW },
        { indent: 2, width: 2.0, color: SYN_TEAL },
        { indent: 2, width: 1.3, color: SYN_ORANGE },
        { indent: 0, width: 1.9, color: SYN_MAGENTA },
        { indent: 1, width: 1.1, color: SYN_YELLOW },
    ]

    useFrame(({ clock }) => {
        if (cursor.current) {
            const on = Math.floor(clock.elapsedTime * 1.6) % 2 === 0
            ;(cursor.current.material as THREE.MeshBasicMaterial).opacity = on ? 1 : 0
        }
        const cycle = 8
        const t = clock.elapsedTime % cycle
        groups.current.forEach((g, i) => {
            if (!g) return
            const appear = i * 0.55
            const vanish = appear + 5.6
            const s = t > appear && t < vanish ? Math.min(1, (t - appear) * 6) : 0.0001
            g.scale.x = s
            g.position.x = -1.9 + (1 - s) * -0.4
        })
    })

    return (
        <group {...props}>
            <PanelShell>
                <TrafficLights />
            </PanelShell>

            {LINES.map((line, i) => (
                <group
                    key={i}
                    ref={(el) => {
                        if (el) groups.current[i] = el
                    }}
                    position={[0, 0.86 - i * 0.22, 0.08]}
                >
                    <mesh position={[-2.02, 0, 0]}>
                        <planeGeometry args={[0.05, 0.055]} />
                        <meshBasicMaterial color={GUTTER} toneMapped={false} />
                    </mesh>
                    <mesh position={[-1.78 + line.indent * 0.2 + line.width / 2, 0, 0]}>
                        <planeGeometry args={[line.width, 0.07]} />
                        <meshBasicMaterial color={line.color} toneMapped={false} />
                    </mesh>
                </group>
            ))}

            <mesh ref={cursor} position={[-0.6, -1.05, 0.08]}>
                <planeGeometry args={[0.035, 0.13]} />
                <meshBasicMaterial color="#ffffff" transparent toneMapped={false} />
            </mesh>

            <pointLight position={[0, 0, 1.5]} color={AE_CYAN} intensity={2.2} distance={7} />
        </group>
    )
}

/* Composition panel — playhead sweep + pulsing viewer ring. */
function CompositionPanel(props: ThreeElements['group']) {
    const playhead = useRef<THREE.Group>(null)
    const ring = useRef<THREE.Mesh>(null)

    const LAYERS: Array<{ start: number; length: number; color: string }> = [
        { start: 0.0, length: 2.5, color: AE_PURPLE },
        { start: 0.45, length: 1.7, color: AE_CYAN },
        { start: 0.15, length: 2.9, color: SYN_MAGENTA },
        { start: 1.0, length: 1.4, color: SYN_TEAL },
        { start: 0.65, length: 2.1, color: SYN_YELLOW },
    ]

    useFrame(({ clock }) => {
        if (playhead.current) {
            const t = (clock.elapsedTime * 0.28) % 1
            playhead.current.position.x = -1.9 + t * 3.8
        }
        if (ring.current) {
            const s = 1 + 0.12 * Math.sin(clock.elapsedTime * 2)
            ring.current.scale.setScalar(s)
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
            <mesh ref={ring} position={[0, 0.6, 0.094]}>
                <ringGeometry args={[0.15, 0.19, 32]} />
                <meshBasicMaterial color={AE_CYAN} toneMapped={false} />
            </mesh>

            {LAYERS.map((layer, i) => (
                <group key={i} position={[0, -0.2 - i * 0.19, 0.08]}>
                    <mesh position={[-2.0, 0, 0]}>
                        <planeGeometry args={[0.05, 0.09]} />
                        <meshBasicMaterial color={layer.color} toneMapped={false} />
                    </mesh>
                    <mesh position={[-1.86 + layer.start + layer.length / 2, 0, 0]}>
                        <planeGeometry args={[layer.length, 0.1]} />
                        <meshBasicMaterial color={layer.color} transparent opacity={0.8} toneMapped={false} />
                    </mesh>
                    <KeyframeDiamond position={[-1.86 + layer.start, 0, 0.02]} color={layer.color} scale={0.8} offset={i} />
                    <KeyframeDiamond position={[-1.86 + layer.start + layer.length, 0, 0.02]} color={layer.color} scale={0.8} offset={i + 2} />
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

/* Effect Controls strip — sliders drift. */
function InspectorPanel(props: ThreeElements['group']) {
    const knobs = useRef<THREE.Group>(null)

    const ROWS: Array<{ label: number; value: number; color: string }> = [
        { label: 1.2, value: 2.1, color: AE_CYAN },
        { label: 0.9, value: 1.6, color: SYN_YELLOW },
        { label: 1.4, value: 0.8, color: SYN_MAGENTA },
        { label: 0.7, value: 1.9, color: SYN_TEAL },
    ]

    useFrame(({ clock }) => {
        if (!knobs.current) return
        knobs.current.children.forEach((row, i) => {
            const bar = row.children[1] as THREE.Mesh | undefined
            if (!bar) return
            const w = ROWS[i].value * (0.75 + 0.25 * Math.sin(clock.elapsedTime * 1.2 + i * 1.3))
            bar.scale.x = Math.max(0.2, w / ROWS[i].value)
            const mat = bar.material as THREE.MeshBasicMaterial
            mat.opacity = 0.75 + 0.25 * Math.sin(clock.elapsedTime * 2 + i)
        })
    })

    return (
        <group {...props}>
            <PanelShell width={2.6} height={1.9} bar={false}>
                <mesh position={[-1.18, 0.72, 0.08]}>
                    <circleGeometry args={[0.045, 16]} />
                    <meshBasicMaterial color="#ff5f57" toneMapped={false} />
                </mesh>
            </PanelShell>

            <group ref={knobs}>
                {ROWS.map((row, i) => (
                    <group key={i} position={[0, 0.45 - i * 0.3, 0.08]}>
                        <mesh position={[-0.85 + row.label / 2, 0, 0]}>
                            <planeGeometry args={[row.label, 0.05]} />
                            <meshBasicMaterial color={GUTTER} toneMapped={false} />
                        </mesh>
                        <mesh position={[-0.85 + row.value / 2, -0.14, 0]}>
                            <planeGeometry args={[row.value, 0.07]} />
                            <meshBasicMaterial color={row.color} transparent toneMapped={false} />
                        </mesh>
                    </group>
                ))}
            </group>

            <pointLight position={[0, 0, 1.2]} color={SYN_TEAL} intensity={1.6} distance={5} />
        </group>
    )
}

/* Small floating "file" cards drifting in the background. */
function FileCardPlane({
    position,
    rotation,
    color,
    offset = 0,
}: {
    position: [number, number, number]
    rotation: [number, number, number]
    color: string
    offset?: number
}) {
    return (
        <Float speed={1.4 + offset * 0.2} rotationIntensity={0.4} floatIntensity={1.1}>
            <group position={position} rotation={rotation}>
                <RoundedBox args={[1.15, 0.8, 0.05]} radius={0.05} smoothness={3}>
                    <meshPhysicalMaterial
                        color={PANEL_BODY}
                        roughness={0.35}
                        metalness={0.4}
                        clearcoat={0.8}
                    />
                </RoundedBox>
                <mesh position={[-0.28, 0.18, 0.035]}>
                    <planeGeometry args={[0.5, 0.07]} />
                    <meshBasicMaterial color={color} toneMapped={false} />
                </mesh>
                <mesh position={[-0.18, 0.02, 0.035]}>
                    <planeGeometry args={[0.3, 0.055]} />
                    <meshBasicMaterial color={GUTTER} toneMapped={false} />
                </mesh>
                <mesh position={[-0.22, -0.14, 0.035]}>
                    <planeGeometry args={[0.38, 0.055]} />
                    <meshBasicMaterial color="#22223a" toneMapped={false} />
                </mesh>
            </group>
        </Float>
    )
}

/* ------------------------------------------------------------------ */
/* Motion paths & nodes                                                */
/* ------------------------------------------------------------------ */

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

function makeLine(points: THREE.Vector3[], color: string, opacity: number) {
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity })
    return new THREE.Line(geometry, material)
}

function DataBridge({ reducedMotion }: { reducedMotion: boolean }) {
    const dot = useRef<THREE.Mesh>(null)
    const dot2 = useRef<THREE.Mesh>(null)

    const P0 = useMemo(() => new THREE.Vector3(-0.85, -0.5, 0.3), [])
    const P1 = useMemo(() => new THREE.Vector3(-0.3, -1.05, 0.7), [])
    const P2 = useMemo(() => new THREE.Vector3(0.3, -1.05, 0.7), [])
    const P3 = useMemo(() => new THREE.Vector3(0.85, -0.5, 0.3), [])

    const points = useMemo(
        () => Array.from({ length: 81 }, (_, i) => cubicBezierPoint(i / 80, P0, P1, P2, P3)),
        [P0, P1, P2, P3]
    )

    const line = useMemo(() => makeLine(points, AE_CYAN, 0.4), [points])
    const handles = useMemo(
        () => [makeLine([P0, P1], AE_PURPLE, 0.35), makeLine([P3, P2], AE_PURPLE, 0.35)],
        [P0, P1, P2, P3]
    )

    useFrame(({ clock }) => {
        if (reducedMotion) return
        if (dot.current) {
            const t = (clock.elapsedTime * 0.22) % 1
            dot.current.position.copy(points[Math.floor(t * (points.length - 1))])
        }
        if (dot2.current) {
            const t = (1 - ((clock.elapsedTime * 0.3) % 1)) // opposite direction
            dot2.current.position.copy(points[Math.floor(t * (points.length - 1))])
        }
    })

    return (
        <group>
            <primitive object={line} />
            {handles.map((h, i) => (
                <primitive key={i} object={h} />
            ))}
            {[P0, P1, P2, P3].map((p, i) => (
                <mesh key={i} position={p}>
                    <sphereGeometry args={[0.035, 12, 12]} />
                    <meshBasicMaterial color={AE_PURPLE} toneMapped={false} />
                </mesh>
            ))}
            {[0.12, 0.3, 0.5, 0.7, 0.88].map((t) => {
                const p = cubicBezierPoint(t, P0, P1, P2, P3)
                return (
                    <KeyframeDiamond
                        key={t}
                        position={[p.x, p.y, p.z + 0.02]}
                        color={AE_CYAN}
                        scale={0.9}
                        offset={t * 6}
                    />
                )
            })}
            <mesh ref={dot}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshBasicMaterial color={AE_CYAN} toneMapped={false} />
            </mesh>
            {!reducedMotion && (
                <mesh ref={dot2}>
                    <sphereGeometry args={[0.04, 12, 12]} />
                    <meshBasicMaterial color={AE_PURPLE} toneMapped={false} />
                </mesh>
            )}
        </group>
    )
}

/** Field of drifting syntax-colored motes behind everything. */
function MoteField({ reducedMotion }: { reducedMotion: boolean }) {
    const group = useRef<THREE.Group>(null)

    const motes = useMemo(() => {
        const colors = [AE_PURPLE, AE_CYAN, SYN_TEAL, SYN_MAGENTA, SYN_YELLOW]
        return Array.from({ length: 42 }, (_, i) => ({
            position: new THREE.Vector3(
                (Math.sin(i * 12.9898) * 43758.5453) % 1 * 13 - 6.5,
                (Math.sin(i * 78.233) * 12345.6789) % 1 * 7 - 3.5,
                -2 - ((i * 0.37) % 5),
            ),
            color: colors[i % colors.length],
            speed: 0.2 + ((i * 0.13) % 0.6),
            phase: i * 0.7,
        }))
    }, [])

    useFrame(({ clock }) => {
        if (!group.current || reducedMotion) return
        group.current.children.forEach((m, i) => {
            m.position.y = motes[i].position.y + Math.sin(clock.elapsedTime * motes[i].speed + motes[i].phase) * 0.5
            m.rotation.z = clock.elapsedTime * 0.3 + motes[i].phase
        })
    })

    return (
        <group ref={group}>
            {motes.map((m, i) => (
                <mesh key={i} position={m.position} rotation={[0, 0, 0.78]}>
                    <planeGeometry args={[0.07, 0.07]} />
                    <meshBasicMaterial color={m.color} transparent opacity={0.5} toneMapped={false} />
                </mesh>
            ))}
        </group>
    )
}

/* ------------------------------------------------------------------ */
/* Camera                                                              */
/* ------------------------------------------------------------------ */

function CameraRig({
    reducedMotion,
    scrollRef,
}: {
    reducedMotion: boolean
    scrollRef?: MutableRefObject<number>
}) {
    const target = useRef(new THREE.Vector2(0, 0))

    useFrame(({ camera, pointer, clock }) => {
        const p = scrollRef?.current ?? 0
        if (reducedMotion) {
            camera.position.set(0, 0.3 + p * 1.6, 9.2 + p * 3)
            camera.lookAt(0, 0.2, 0)
            return
        }
        target.current.lerp(pointer, 0.04)
        const orbit = clock.elapsedTime * 0.08
        const breathe = Math.sin(clock.elapsedTime * 0.35) * 0.3
        camera.position.x = target.current.x * 1.3 + Math.sin(orbit) * 0.8
        camera.position.y = 0.35 + target.current.y * 0.6 + Math.cos(orbit) * 0.35 + p * 1.4
        camera.position.z = 9.0 + breathe + p * 3.2
        camera.lookAt(0, 0.15 + p * 0.5, 0)
    })

    return null
}

/* ------------------------------------------------------------------ */
/* Procedural studio lighting — Lightformer children avoid external HDR assets */
/* ------------------------------------------------------------------ */

function StudioLighting({ tier }: { tier: SceneTier }) {
    return (
        <Environment resolution={tier === 'full' ? 256 : 128} frames={1}>
            <color attach="background" args={['#0a0a12']} />
            <Lightformer form="rect" intensity={7} color="#ffffff" position={[0, 4, -6]} scale={[6, 2, 1]} />
            <Lightformer form="rect" intensity={4.6} color={AE_PURPLE} position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[5, 1.2, 1]} />
            <Lightformer form="rect" intensity={4.6} color={AE_CYAN} position={[5, -1, 2]} rotation-y={-Math.PI / 2} scale={[5, 1.2, 1]} />
            <Lightformer form="circle" intensity={2.4} color="#ffffff" position={[0, 0, 6]} scale={2.4} />
            <Lightformer form="rect" intensity={1.6} color={SYN_MAGENTA} position={[0, -4, 3]} rotation-x={Math.PI / 2} scale={[4, 0.8, 1]} />
        </Environment>
    )
}

/* ------------------------------------------------------------------ */
/* Material branches by tier: transmission costs a render pass, lite tier fakes it with iridescent physical */
/* ------------------------------------------------------------------ */

function GlassKnot({ tier, reducedMotion }: { tier: SceneTier; reducedMotion: boolean }) {
    const mesh = useRef<THREE.Mesh>(null)
    const full = tier === 'full'
    const segments: [number, number] = full ? [140, 24] : [72, 14]

    useFrame((_, delta) => {
        if (!mesh.current || reducedMotion) return
        mesh.current.rotation.x += delta * 0.16
        mesh.current.rotation.y += delta * 0.22
    })

    return (
        <Float speed={reducedMotion ? 0 : 1.2} rotationIntensity={reducedMotion ? 0 : 0.25} floatIntensity={reducedMotion ? 0 : 0.55}>
            <mesh ref={mesh}>
                <torusKnotGeometry args={[0.52, 0.17, segments[0], segments[1]]} />
                {full ? (
                    <MeshTransmissionMaterial
                        samples={4}
                        resolution={256}
                        thickness={0.9}
                        roughness={0.08}
                        anisotropicBlur={0.35}
                        chromaticAberration={0.05}
                        ior={1.45}
                        transmissionSampler={false}
                        backside
                        color="#e8ecff"
                        attenuationColor={AE_CYAN}
                        attenuationDistance={0.9}
                    />
                ) : (
                    <meshPhysicalMaterial
                        transparent
                        opacity={0.55}
                        roughness={0.06}
                        metalness={0.1}
                        iridescence={1}
                        iridescenceIOR={1.35}
                        iridescenceThicknessRange={[120, 480]}
                        clearcoat={1}
                        envMapIntensity={1.4}
                    />
                )}
            </mesh>

            <mesh>
                <icosahedronGeometry args={[0.15, 1]} />
                <meshBasicMaterial color="#eaf6ff" toneMapped={false} />
            </mesh>

            {[AE_CYAN, AE_PURPLE, SYN_TEAL].map((color, i) => (
                <OrbitDot key={color} radius={1.15 + i * 0.28} speed={0.55 + i * 0.18} incline={i * 1.1} color={color} reducedMotion={reducedMotion} />
            ))}
        </Float>
    )
}

function OrbitDot({
    radius,
    speed,
    incline,
    color,
    reducedMotion,
}: {
    radius: number
    speed: number
    incline: number
    color: string
    reducedMotion: boolean
}) {
    const ref = useRef<THREE.Mesh>(null)

    useFrame(({ clock }) => {
        if (!ref.current || reducedMotion) return
        const t = clock.elapsedTime * speed + incline
        ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.8) * 0.42, Math.sin(t) * radius)
    })

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
    )
}

function ScrollDrift({
    children,
    reducedMotion,
    scrollRef,
}: {
    children: React.ReactNode
    reducedMotion: boolean
    scrollRef?: MutableRefObject<number>
}) {
    const ref = useRef<THREE.Group>(null)
    useFrame((_, delta) => {
        if (!ref.current || reducedMotion) return
        const p = scrollRef?.current ?? 0
        ref.current.rotation.y += delta * (0.1 + p * 0.9)
        ref.current.position.y += (p * 2.4 - ref.current.position.y) * Math.min(1, delta * 3)
    })
    return <group ref={ref}>{children}</group>
}

/* ------------------------------------------------------------------ */
/* Scene                                                               */
/* ------------------------------------------------------------------ */

export function WorkspaceScene({
    reducedMotion = false,
    tier = 'full',
    scrollRef,
}: {
    reducedMotion?: boolean
    tier?: SceneTier
    scrollRef?: MutableRefObject<number>
}) {
    const full = tier === 'full'
    const floatCfg = reducedMotion
        ? { speed: 0, rotationIntensity: 0, floatIntensity: 0 }
        : { speed: 1.1, rotationIntensity: 0.18, floatIntensity: 0.4 }

    return (
        <Canvas
            dpr={full ? [1, 1.75] : [1, 1.4]}
            camera={{ position: [0, 0.3, 9], fov: 42 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
            <fog attach="fog" args={['#07070c', 10, 22]} />

            <ambientLight intensity={0.4} />
            <directionalLight position={[4, 6, 5]} intensity={1.1} />
            <spotLight position={[-6, 4, 6]} angle={0.5} penumbra={1} intensity={45} color={AE_PURPLE} />
            <spotLight position={[6, -3, 5]} angle={0.5} penumbra={1} intensity={35} color={AE_CYAN} />
            <pointLight position={[2.4, 1.8, 2.2]} intensity={20} distance={7} color={AE_CYAN} />
            <StudioLighting tier={tier} />

            <MoteField reducedMotion={reducedMotion} />

            <Sparkles count={full ? 70 : 28} scale={[13, 7, 8]} size={full ? 2.4 : 2} speed={reducedMotion ? 0 : 0.32} opacity={0.55} color={AE_CYAN} />

            {/* Background file cards */}
            <FileCardPlane position={[-4.6, 1.6, -2.4]} rotation={[0.1, 0.5, 0.06]} color={SYN_YELLOW} offset={0.2} />
            <FileCardPlane position={[4.7, -1.3, -2.1]} rotation={[0.08, -0.5, -0.05]} color={SYN_TEAL} offset={0.5} />
            <FileCardPlane position={[3.9, 2.1, -3.2]} rotation={[0.14, -0.42, 0.1]} color={AE_PURPLE} offset={0.8} />
            <FileCardPlane position={[-4.2, -2.0, -3.0]} rotation={[0.06, 0.46, -0.08]} color={SYN_MAGENTA} offset={1.1} />

            <ScrollDrift reducedMotion={reducedMotion} scrollRef={scrollRef}>
                <group position={[2.0, 1.35, 3.2]} scale={tier === 'full' ? 1.15 : 0.75}>
                    <GlassKnot tier={tier} reducedMotion={reducedMotion} />
                </group>
            </ScrollDrift>

            {/* Main panels */}
            <Float {...floatCfg}>
                <CodePanel position={[-1.75, 0.55, 0]} rotation={[0.05, 0.48, -0.04]} scale={0.62} />
            </Float>
            <Float speed={reducedMotion ? 0 : 0.9} rotationIntensity={reducedMotion ? 0 : 0.18} floatIntensity={reducedMotion ? 0 : 0.45}>
                <CompositionPanel position={[1.75, -0.5, 0]} rotation={[0.05, -0.48, 0.04]} scale={0.62} />
            </Float>
            <Float speed={reducedMotion ? 0 : 0.7} rotationIntensity={reducedMotion ? 0 : 0.12} floatIntensity={reducedMotion ? 0 : 0.3}>
                <InspectorPanel position={[0.15, 1.55, -1.0]} rotation={[0.14, 0.02, 0]} scale={0.46} />
            </Float>

            <DataBridge reducedMotion={reducedMotion} />
            <CameraRig reducedMotion={reducedMotion} scrollRef={scrollRef} />
            <AdaptiveDpr pixelated />

            {full && (
                <EffectComposer multisampling={0}>
                    <Bloom mipmapBlur intensity={0.65} luminanceThreshold={0.2} luminanceSmoothing={0.28} />
                    <Vignette offset={0.22} darkness={0.62} eskil={false} />
                </EffectComposer>
            )}
        </Canvas>
    )
}
