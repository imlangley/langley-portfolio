'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Edges, Environment, Lightformer, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

type SceneProps = {
    active: boolean
    tier: 'full' | 'lite'
    accent?: string
}

function useTiltGroup(active: boolean) {
    const ref = useRef<THREE.Group>(null)
    const target = useRef({ x: 0, y: 0 })
    useFrame((state, delta) => {
        if (!ref.current || !active) return
        const px = state.pointer.x
        const py = state.pointer.y
        target.current.x += (py * 0.28 - target.current.x) * Math.min(1, delta * 4)
        target.current.y += (px * 0.4 - target.current.y) * Math.min(1, delta * 4)
        ref.current.rotation.x = target.current.x
        ref.current.rotation.y = target.current.y
    })
    return ref
}

function FloatCube({
    position,
    size,
    color,
    phase,
}: {
    position: [number, number, number]
    size: number
    color: string
    phase: number
}) {
    const ref = useRef<THREE.Mesh>(null)
    useFrame(({ clock }) => {
        if (!ref.current) return
        const t = clock.elapsedTime + phase
        ref.current.position.y = position[1] + Math.sin(t * 0.9) * 0.16
        ref.current.rotation.z = Math.sin(t * 0.5) * 0.08
    })
    return (
        <RoundedBox ref={ref} args={[size, size, size]} radius={size * 0.14} smoothness={3} position={position}>
            <meshPhysicalMaterial color="#12141d" roughness={0.24} metalness={0.75} clearcoat={0.9} envMapIntensity={1.1} />
            <Edges scale={1.02} threshold={15}>
                <lineBasicMaterial color={color} transparent opacity={0.85} toneMapped={false} />
            </Edges>
        </RoundedBox>
    )
}

export function CubesScene({ active, tier, accent = '#9999ff' }: SceneProps) {
    const tiltRef = useTiltGroup(active)
    const full = tier === 'full'

    const cubes = full ? CUBES_FULL : CUBES_LITE

    return (
        <Canvas
            frameloop={active ? 'always' : 'never'}
            dpr={full ? [1, 1.6] : [1, 1.35]}
            camera={{ position: [0, 0, 7.5], fov: 40 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            style={{ background: 'transparent' }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 5, 4]} intensity={1} />
            <Environment resolution={128} frames={1}>
                <Lightformer form="rect" intensity={4} color="#ffffff" position={[0, 3, -5]} scale={[5, 1.5, 1]} />
                <Lightformer form="rect" intensity={2.6} color={accent} position={[-4, 0, 2]} rotation-y={Math.PI / 2} scale={[4, 1, 1]} />
                <Lightformer form="rect" intensity={2.2} color="#00c8ff" position={[4, -1, 2]} rotation-y={-Math.PI / 2} scale={[4, 1, 1]} />
            </Environment>

            <group ref={tiltRef}>
                {cubes.map((c, i) => (
                    <FloatCube key={i} {...c} />
                ))}
            </group>
        </Canvas>
    )
}

function buildCubeLayout(count: number): Array<{ position: [number, number, number]; size: number; color: string; phase: number }> {
    return (
        Array.from({ length: count }, (_, i) => {
            const r1 = Math.sin(i * 127.1) * 43758.55
            const r2 = Math.sin(i * 311.7) * 12543.21
            const r3 = Math.sin(i * 74.7) * 9631.4
            return {
                position: [
                    ((r1 % 1) + 1) % 1 * 12 - 6,
                    ((r2 % 1) + 1) % 1 * 3.2 - 1.6,
                    ((r3 % 1) + 1) % 1 * 3 - 1.5,
                ] as [number, number, number],
                size: 0.42 + (((r1 % 1) + 1) % 1) * 0.38,
                color: ['#9999ff', '#00c8ff', '#c586c0', '#4ec9b0', '#dcdcaa'][i % 5],
                phase: i * 0.83,
            }
        })
    )
}

const CUBES_FULL = buildCubeLayout(10)
const CUBES_LITE = buildCubeLayout(6)

export function DistortScene({ active, tier, accent = '#00c8ff' }: SceneProps) {
    const full = tier === 'full'
    const mesh = useRef<THREE.Mesh>(null)
    const mat = useRef<{ distort: number } | null>(null)
    const speed = useRef(0.4)

    useFrame((state, delta) => {
        if (!active) return
        // pointer velocity feeds distortion energy — blob reacts to movement
        const v = Math.min(1, Math.hypot(state.pointer.x, state.pointer.y))
        speed.current += (0.4 + v * 1.6 - speed.current) * Math.min(1, delta * 2.5)
        if (mat.current) mat.current.distort = 0.28 + speed.current * 0.14
        if (mesh.current) {
            mesh.current.rotation.y += delta * (0.18 + speed.current * 0.12)
            mesh.current.rotation.z += delta * 0.06
        }
    })

    return (
        <Canvas
            frameloop={active ? 'always' : 'never'}
            dpr={full ? [1, 1.6] : [1, 1.35]}
            camera={{ position: [0, 0, 5], fov: 40 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            style={{ background: 'transparent' }}
        >
            <ambientLight intensity={0.45} />
            <pointLight position={[3, 2, 4]} intensity={22} color={accent} />
            <pointLight position={[-3, -2, 3]} intensity={14} color="#9999ff" />
            <Environment resolution={128} frames={1}>
                <Lightformer form="circle" intensity={3.4} color="#ffffff" position={[0, 3, -4]} scale={2.2} />
                <Lightformer form="rect" intensity={2.4} color={accent} position={[-4, 0, 1]} rotation-y={Math.PI / 2} scale={[3, 1, 1]} />
            </Environment>

            <mesh ref={mesh}>
                <icosahedronGeometry args={[1.35, full ? 24 : 12]} />
                {full ? (
                    <MeshDistortMaterial
                        ref={mat as never}
                        color="#141826"
                        roughness={0.16}
                        metalness={0.72}
                        distort={0.32}
                        speed={1.6}
                        envMapIntensity={1.25}
                    />
                ) : (
                    <meshPhysicalMaterial
                        color="#141826"
                        roughness={0.2}
                        metalness={0.7}
                        clearcoat={0.9}
                        iridescence={0.85}
                        iridescenceIOR={1.32}
                        envMapIntensity={1.15}
                    />
                )}
            </mesh>

            {[[-2.3, 0.6], [2.3, -0.5]].map(([x, y], i) => (
                <mesh key={i} position={[x, y, -0.6]}>
                    <torusGeometry args={[0.34, 0.03, 10, 40]} />
                    <meshBasicMaterial color={i === 0 ? '#9999ff' : '#00c8ff'} transparent opacity={0.55} toneMapped={false} />
                </mesh>
            ))}
        </Canvas>
    )
}
