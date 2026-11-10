"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Galaxy() {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 12000;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color = new THREE.Color();

    const seeded = (value: number) => {
      const x = Math.sin(value * 127.1) * 43758.5453123;
      return (x - Math.floor(x) + 1) % 1;
    };

    for (let i = 0; i < count; i++) {
      const radius = seeded(i) * 7;
      const spin = radius * 1.5;
      const branch = (i % 5) * ((Math.PI * 2) / 5);

      const angle = spin + branch;

      const random = (seeded(i + 10) - 0.5) * 0.8;
      const yOffset = (seeded(i + 20) - 0.5) * 0.5;

      const x = Math.cos(angle) * radius + random;
      const y = yOffset;
      const z = Math.sin(angle) * radius + random;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      color.setHSL(
        0.7 + seeded(i + 30) * 0.15,
        0.7,
        0.6 + seeded(i + 40) * 0.4
      );

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y += 0.0008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />

        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function GalaxyBackground() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{
          position: [0, 2, 9],
          fov: 45,
        }}
        dpr={[1, 1.5]}
      >
        <Galaxy />
      </Canvas>
    </div>
  );
}