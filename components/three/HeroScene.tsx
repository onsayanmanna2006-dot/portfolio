"use client";

/**
 * Interactive 3D hero scene (React Three Fiber).
 *
 *  - A faceted "crystal" (icosahedron) in deep forest green with a crimson
 *    wireframe shell and a glowing crimson core.
 *  - An orbiting ring, plus a star field that fills the whole hero section.
 *  - Everything tilts toward the mouse (pointer is tracked page-wide).
 *
 * Performance knobs (passed from Hero):
 *  - `lite`   → mobile: fewer particles, lower DPR, no antialias.
 *  - `paused` → stops the render loop (off-screen or reduced motion).
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
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
    // The pointer is tracked page-wide, so it goes far outside -1..1 when the mouse
    // is away from the canvas. Clamp it so the crystal never tilts out of frame.
    const x = THREE.MathUtils.clamp(state.pointer.x, -1, 1);
    const y = THREE.MathUtils.clamp(state.pointer.y, -1, 1);

    // Idle spin + ease toward the pointer
    if (animate) group.current.rotation.y += delta * 0.18;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -y * 0.45, 3, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, x * 0.25, 3, delta);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, x * 0.15, 2, delta);

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

/* ---------- Layout: place the crystal over the HTML "anchor" box ---------- */

/** Pixel box (relative to the canvas) that the crystal should be centred in. */
export type Anchor = { x: number; y: number; w: number; h: number };

const CRYSTAL_RADIUS = 2.05; // outermost extent of the crystal (the orbit ring), in world units

function CrystalLayout({ anchor, children }: { anchor: Anchor | null; children: React.ReactNode }) {
  const { size, camera } = useThree();
  const cam = camera as THREE.PerspectiveCamera;

  // World units per CSS pixel on the z = 0 plane
  const worldHeight = 2 * cam.position.z * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
  const wpp = worldHeight / size.height;

  const a = anchor ?? { x: size.width / 2 - 200, y: size.height / 2 - 200, w: 400, h: 400 };
  const cx = a.x + a.w / 2;
  const cy = a.y + a.h / 2;
  const x = (cx - size.width / 2) * wpp;
  const y = -(cy - size.height / 2) * wpp;
  // Ring radius ≈ 36% of the anchor's shorter side
  const scale = (0.36 * Math.min(a.w, a.h) * wpp) / CRYSTAL_RADIUS;

  return (
    <group position={[x, y, 0]} scale={scale}>
      {children}
    </group>
  );
}

/* ---------- Star field covering the whole hero ---------- */
function Stars({ count, animate }: { count: number; animate: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const { size, camera } = useThree();
  const cam = camera as THREE.PerspectiveCamera;
  const aspect = Math.round((size.width / size.height) * 10) / 10; // rounded → only rebuild on real resizes

  // Fill the camera's view at every depth (plus a margin for parallax)
  const positions = useMemo(() => {
    const tan = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const z = -12 + Math.random() * 13; // -12 … 1
      const halfH = (cam.position.z - z) * tan * 1.15;
      const halfW = halfH * aspect;
      arr[i * 3] = (Math.random() * 2 - 1) * halfW;
      arr[i * 3 + 1] = (Math.random() * 2 - 1) * halfH;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, [count, aspect, cam.fov, cam.position.z]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const px = THREE.MathUtils.clamp(state.pointer.x, -1, 1);
    const py = THREE.MathUtils.clamp(state.pointer.y, -1, 1);
    // Gentle parallax opposite to the pointer + a slow sway
    ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, -px * 0.35, 1.5, delta);
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, -py * 0.25, 1.5, delta);
    if (animate) ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color={COLORS.ink} size={0.045} sizeAttenuation depthWrite={false} opacity={0.7} />
    </Points>
  );
}

/* ---------- Canvas wrapper ---------- */
export default function HeroScene({
  lite = false,
  paused = false,
  reducedMotion = false,
  anchor = null,
}: {
  lite?: boolean;
  paused?: boolean;
  reducedMotion?: boolean;
  anchor?: Anchor | null;
}) {
  // Reduced motion → render a still frame on demand; off-screen → stop entirely.
  const frameloop = paused ? "never" : reducedMotion ? "demand" : "always";

  return (
    <Canvas
      camera={{ position: [0, 0, 7.6], fov: 45 }}
      dpr={lite ? [1, 1.25] : [1, 2]}
      gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}
      frameloop={frameloop}
      // Track the pointer across the whole page, not only over the canvas
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      eventPrefix="client"
      aria-hidden="true"
    >
      <ambientLight intensity={0.35} />
      <Stars count={lite ? 600 : 2200} animate={!reducedMotion} />

      {/* Lights live inside the layout group so they follow the crystal */}
      <CrystalLayout anchor={anchor}>
        <directionalLight position={[4, 5, 3]} intensity={1.1} color={COLORS.ink} />
        <pointLight position={[3, 1, 3]} intensity={18} color={COLORS.crimson} />
        <pointLight position={[-4, -2, 2]} intensity={10} color="#3fa37a" />
        <Crystal animate={!reducedMotion} />
      </CrystalLayout>
    </Canvas>
  );
}
