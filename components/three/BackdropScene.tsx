'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import type { MutableRefObject } from 'react'

type Variant = 'particles' | 'grid' | 'orbs' | 'waves'

const ACCENTS = ['#9999ff', '#00c8ff', '#c586c0', '#4ec9b0', '#dcdcaa']

/* ------------------------------------------------------------------ */
/* Shared: pointer-reactive group tilt                                 */
/* ------------------------------------------------------------------ */

function TiltGroup({ active, children }: { active: boolean; children: React.ReactNode }) {
    const ref = useRef<THREE.Group>(null)
    const target = useRef({ x: 0, y: 0 })

    useFrame((state, delta) => {
        if (!ref.current || !active) return
        target.current.x += (state.pointer.y * 0.12 - target.current.x) * Math.min(1, delta * 3)
        target.current.y += (state.pointer.x * 0.18 - target.current.y) * Math.min(1, delta * 3)
        ref.current.rotation.x = target.current.x
        ref.current.rotation.y = target.current.y
    })

    return <group ref={ref}>{children}</group>
}

/* ------------------------------------------------------------------ */
/* Scroll-reactive camera rig                                          */
/* ------------------------------------------------------------------ */

function ScrollCam({
    scrollRef,
    reducedMotion,
}: {
    scrollRef?: MutableRefObject<number>
    reducedMotion: boolean
}) {
    useFrame(({ camera, clock }) => {
        const p = scrollRef?.current ?? 0
        if (reducedMotion) {
            camera.position.set(0, 0, 8)
            camera.lookAt(0, 0, 0)
            return
        }
        camera.position.z = 8 + Math.sin(clock.elapsedTime * 0.2) * 0.3 + p * 2
        camera.position.x = Math.sin(clock.elapsedTime * 0.12) * 0.5
        camera.position.y = Math.cos(clock.elapsedTime * 0.09) * 0.35 + p * 0.8
        camera.lookAt(0, p * 0.4, 0)
    })
    return null
}

/* ------------------------------------------------------------------ */
/* Particles variant — drifting syntax-colored motes + wireframe icosa   */
/* ------------------------------------------------------------------ */

function ParticlesScene({ count, accent }: { count: number; accent: string }) {
    const group = useRef<THREE.Group>(null)

    const motes = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                x: ((Math.sin(i * 127.1) * 43758.55 % 1) + 1) % 1 * 14 - 7,
                y: ((Math.sin(i * 311.7) * 12543.2 % 1) + 1) % 1 * 8 - 4,
                z: ((Math.sin(i * 74.7) * 9631.4 % 1) + 1) % 1 * 6 - 3,
                speed: 0.15 + ((i * 0.13) % 0.5),
                phase: i * 0.71,
                color: ACCENTS[i % ACCENTS.length],
            })),
        [count],
    )

    useFrame(({ clock }) => {
        if (!group.current) return
        group.current.children.forEach((m, i) => {
            m.position.y = motes[i]?.y + Math.sin(clock.elapsedTime * motes[i].speed + motes[i].phase) * 0.6
            m.rotation.z = clock.elapsedTime * 0.25 + motes[i].phase
        })
    })

    return (
        <group ref={group}>
            {motes.map((m, i) => (
                <mesh key={i} position={[m.x, m.y, m.z]} rotation={[0, 0, 0.78]}>
                    <octahedronGeometry args={[0.06, 0]} />
                    <meshBasicMaterial color={m.color} transparent opacity={0.45} toneMapped={false} />
                </mesh>
            ))}
            {/* center wireframe icosahedron — subtle anchor */}
            <mesh>
                <icosahedronGeometry args={[1.6, 0]} />
                <meshBasicMaterial color={accent} wireframe transparent opacity={0.08} toneMapped={false} />
            </mesh>
        </group>
    )
}

/* ------------------------------------------------------------------ */
/* Grid variant — floating rounded cubes with emissive edges           */
/* ------------------------------------------------------------------ */

function CubeField({ count }: { count: number }) {
    const cubes = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                x: ((Math.sin(i * 91.3) * 2841.7 % 1) + 1) % 1 * 12 - 6,
                y: ((Math.sin(i * 47.9) * 7823.1 % 1) + 1) % 1 * 5 - 2.5,
                z: ((Math.sin(i * 23.1) * 3921.8 % 1) + 1) % 1 * 4 - 2,
                size: 0.3 + ((i * 0.17) % 0.35),
                phase: i * 0.92,
                color: ACCENTS[(i + 2) % ACCENTS.length],
            })),
        [count],
    )

    return (
        <>
            {cubes.map((c, i) => (
                <FloatCube key={i} position={[c.x, c.y, c.z]} size={c.size} color={c.color} phase={c.phase} />
            ))}
        </>
    )
}

function FloatCube(props: { position: [number, number, number]; size: number; color: string; phase: number }) {
    const ref = useRef<THREE.Mesh>(null)
    useFrame(({ clock }) => {
        if (!ref.current) return
        ref.current.position.y = props.position[1] + Math.sin(clock.elapsedTime * 0.7 + props.phase) * 0.22
        ref.current.rotation.x += 0.002
        ref.current.rotation.y += 0.003
    })
    return (
        <mesh ref={ref} position={props.position}>
            <boxGeometry args={[props.size, props.size, props.size]} />
            <meshPhysicalMaterial color="#12141d" roughness={0.25} metalness={0.7} clearcoat={0.8} envMapIntensity={1} />
        </mesh>
    )
}

/* ------------------------------------------------------------------ */
/* Orbs variant — soft glowing spheres with pulse                      */
/* ------------------------------------------------------------------ */

function OrbField({ count, reducedMotion }: { count: number; reducedMotion: boolean }) {
    const refs = useRef<(THREE.Mesh | null)[]>([])

    useFrame(({ clock }) => {
        if (reducedMotion) return
        refs.current.forEach((r, i) => {
            if (!r) return
            const s = 1 + 0.18 * Math.sin(clock.elapsedTime * 1.2 + i * 0.9)
            r.scale.setScalar(s)
        })
    })

    const orbs = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                x: ((Math.sin(i * 83.19) * 4821.9 % 1) + 1) % 1 * 10 - 5,
                y: ((Math.sin(i * 29.7) * 9821.3 % 1) + 1) % 1 * 6 - 3,
                z: -1 - ((i * 0.41) % 3),
                size: 0.12 + ((i * 0.11) % 0.14),
                color: i % 3 === 0 ? '#9999ff' : i % 3 === 1 ? '#00c8ff' : '#c586c0',
                phase: i * 0.65,
            })),
        [count],
    )

    return (
        <>
            {orbs.map((o, i) => (
                <mesh
                    key={i}
                    ref={(el) => { refs.current[i] = el }}
                    position={[o.x, o.y, o.z]}
                >
                    <sphereGeometry args={[o.size, 16, 16]} />
                    <meshBasicMaterial color={o.color} transparent opacity={0.3} toneMapped={false} />
                </mesh>
            ))}
            {/* central distorted blob */}
            <DistortBlob reducedMotion={reducedMotion} />
        </>
    )
}

function DistortBlob({ reducedMotion }: { reducedMotion: boolean }) {
    const mesh = useRef<THREE.Mesh>(null)

    useFrame((_, delta) => {
        if (!mesh.current || reducedMotion) return
        mesh.current.rotation.y += delta * 0.15
        mesh.current.rotation.x += delta * 0.07
    })

    return (
        <mesh ref={mesh}>
            <icosahedronGeometry args={[1.2, 6]} />
            <meshPhysicalMaterial
                color="#141826"
                roughness={0.18}
                metalness={0.65}
                clearcoat={0.85}
                iridescence={0.7}
                iridescenceIOR={1.32}
                envMapIntensity={1.2}
            />
        </mesh>
    )
}

/* ------------------------------------------------------------------ */
/* Waves variant — undulating plane grid                               */
/* ------------------------------------------------------------------ */

function WavesGrid({ accent }: { accent: string }) {
    const mesh = useRef<THREE.Mesh>(null)
    const geo = useMemo(() => new THREE.PlaneGeometry(20, 12, 24, 14), [])

    useFrame(({ clock }) => {
        if (!mesh.current) return
        const pos = geo.attributes.position as THREE.BufferAttribute
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i)
            const y = pos.getY(i)
            pos.setZ(i, Math.sin(x * 0.4 + clock.elapsedTime * 0.6) * 0.3 + Math.cos(y * 0.3 + clock.elapsedTime * 0.4) * 0.2)
        }
        pos.needsUpdate = true
    })

    return (
        <mesh ref={mesh} geometry={geo} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2.5, 0]}>
            <meshBasicMaterial color={accent} wireframe transparent opacity={0.06} toneMapped={false} />
        </mesh>
    )
}

/* ------------------------------------------------------------------ */
/* Main scene dispatcher                                               */
/* ------------------------------------------------------------------ */

export function BackdropScene({
    variant,
    tier,
    scrollRef,
}: {
    variant: 'particles' | 'grid' | 'orbs' | 'waves'
    tier: 'full' | 'lite'
    scrollRef?: MutableRefObject<number>
}) {
    const full = tier === 'full'
    const accent = '#9999ff'
    const reduced = false  // backdrop is decorative; reduced-motion handled at wrapper level

    return (
        <Canvas
            dpr={full ? [1, 1.4] : [1, 1.2]}
            camera={{ position: [0, 0, 8], fov: 42 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
            style={{ background: 'transparent' }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[4, 5, 4]} intensity={0.8} />
            <Environment resolution={96} frames={1}>
                <Lightformer form="rect" intensity={2.4} color="#ffffff" position={[0, 3, -5]} scale={[4, 1, 1]} />
                <Lightformer form="rect" intensity={1.6} color={accent} position={[-3, 0, 2]} rotation-y={Math.PI / 2} scale={[3, 0.8, 1]} />
                <Lightformer form="rect" intensity={1.4} color="#00c8ff" position={[3, -1, 2]} rotation-y={-Math.PI / 2} scale={[3, 0.8, 1]} />
            </Environment>

            <TiltGroup active={full}>
                {variant === 'particles' && <ParticlesScene count={full ? 42 : 20} accent={accent} />}
                {variant === 'grid' && <CubeField count={full ? 10 : 5} />}
                {variant === 'orbs' && <OrbField count={full ? 14 : 7} reducedMotion={reduced} />}
                {variant === 'waves' && <WavesGrid accent="#00c8ff" />}
            </TiltGroup>

            <Sparkles count={full ? 30 : 12} scale={[14, 8, 6]} size={1.8} speed={0.2} opacity={0.3} color={accent} />
            <ScrollCam scrollRef={scrollRef} reducedMotion={false} />
        </Canvas>
    )
}
