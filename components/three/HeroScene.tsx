"use client";

/**
 * Interactive 3D hero scene (React Three Fiber).
 *
 *  - A faceted "crystal" (icosahedron) in deep forest green with a crimson
 *    wireframe shell and a glowing crimson core.
 *  - An orbiting ring + a soft particle field for depth.
 *  - Everything tilts toward the mouse (pointer is tracked page-wide).
 *
 * Performance knobs (passed from Hero):
 *  - `lite`   → mobile: fewer particles, lower DPR, no antialias.
 *  - `paused` → stops the render loop (off-screen or reduced motion).
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PointMaterial, Points } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const COLORS = {
  forest: "#1d5a3e",
  forestDeep: "#0a2a1c",
  crimson: "#A31C1B",
  crimsonBright: "#ff3b36",
  ink: "#EDEDED",
};

/* ---------- The crystal ---------- */
function Crystal({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const { x, y } = state.pointer; // -1..1, tracked across the whole page

    // Idle spin + ease toward the pointer
    if (animate) group.current.rotation.y += delta * 0.18;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -y * 0.45, 3, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, x * 0.25, 3, delta);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, x * 0.25, 2, delta);

    // Pulsing inner core
    if (core.current && animate) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
      core.current.scale.setScalar(s);
      core.current.rotation.y -= delta * 0.6;
    }
    if (ring.current && animate) ring.current.rotation.z += delta * 0.25;
  });

  return (
    <Float speed={animate ? 1.6 : 0} rotationIntensity={0.25} floatIntensity={0.8}>
      <group ref={group}>
        {/* Solid faceted crystal */}
        <mesh>
          <icosahedronGeometry args={[1.35, 0]} />
          <meshPhysicalMaterial
            color={COLORS.forest}
            emissive={COLORS.forestDeep}
            metalness={0.2}
            roughness={0.18}
            clearcoat={1}
            clearcoatRoughness={0.1}
            flatShading
            transparent
            opacity={0.92}
          />
        </mesh>

        {/* Crimson wireframe shell */}
        <mesh scale={1.18}>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshBasicMaterial color={COLORS.crimson} wireframe transparent opacity={0.35} />
        </mesh>

        {/* Glowing core */}
        <mesh ref={core} scale={0.45}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={COLORS.crimson}
            emissive={COLORS.crimsonBright}
            emissiveIntensity={1.4}
            flatShading
          />
        </mesh>

        {/* Orbit ring */}
        <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[2.05, 0.012, 16, 160]} />
          <meshBasicMaterial color={COLORS.ink} transparent opacity={0.35} />
        </mesh>
      </group>
    </Float>
  );
}

/* ---------- Particle field ---------- */
function Particles({ count, animate }: { count: number; animate: boolean }) {
  const ref = useRef<THREE.Points>(null);

  // Random points on a thick spherical shell around the crystal
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.8 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    if (animate) ref.current.rotation.y -= delta * 0.03;
    // Gentle parallax opposite to the crystal
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, state.pointer.y * 0.15, 1.5, delta);
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color={COLORS.ink} size={0.022} sizeAttenuation depthWrite={false} opacity={0.6} />
    </Points>
  );
}

/* ---------- Canvas wrapper ---------- */
export default function HeroScene({
  lite = false,
  paused = false,
  reducedMotion = false,
}: {
  lite?: boolean;
  paused?: boolean;
  reducedMotion?: boolean;
}) {
  // Reduced motion → render a still frame on demand; off-screen → stop entirely.
  const frameloop = paused ? "never" : reducedMotion ? "demand" : "always";

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={lite ? [1, 1.25] : [1, 2]}
      gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}
      frameloop={frameloop}
      // Track the pointer across the whole page, not only over the canvas
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
      aria-hidden="true"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 3]} intensity={1.1} color={COLORS.ink} />
      <pointLight position={[3, 1, 3]} intensity={18} color={COLORS.crimson} />
      <pointLight position={[-4, -2, 2]} intensity={10} color="#3fa37a" />

      <Crystal animate={!reducedMotion} />
      <Particles count={lite ? 350 : 1400} animate={!reducedMotion} />
    </Canvas>
  );
}
