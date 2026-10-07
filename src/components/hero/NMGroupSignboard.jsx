import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export default function NMGroupSignboard({ progress }) {
  const boardRef = useRef();
  const glowRef = useRef();

  // Fade in / scale in between 90–95% scroll progress
  useFrame((state) => {
    if (!boardRef.current) return;
    const el = boardRef.current;

    if (progress < 0.90) {
      el.visible = false;
      el.scale.set(0.8, 0.8, 0.8);
      el.traverse((child) => {
        if (child.material) {
          child.material.transparent = true;
          child.material.opacity = 0;
        }
      });
    } else if (progress < 0.95) {
      el.visible = true;
      const t = (progress - 0.90) / 0.05; // 0 → 1
      el.scale.set(0.8 + 0.2 * t, 0.8 + 0.2 * t, 0.8 + 0.2 * t);
      el.traverse((child) => {
        if (child.material) {
          child.material.transparent = true;
          child.material.opacity = t;
        }
      });
    } else {
      el.visible = true;
      el.scale.set(1, 1, 1);
      el.traverse((child) => {
        if (child.material) {
          child.material.transparent = true;
          child.material.opacity = 1;
        }
      });
    }

    // Soft glow pulse
    if (glowRef.current && el.visible) {
      const t = state.clock.getElapsedTime();
      glowRef.current.intensity = 0.6 + Math.sin(t * 1.5) * 0.2;
    }
  });

  return (
    // Placed on the ground, angled toward camera
    <group ref={boardRef} position={[10, 0, 4]} rotation={[0, -0.26, 0]}>
      {/* Left post */}
      <mesh position={[-1, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.5, 12]} />
        <meshStandardMaterial color="#2B2622" metalness={0.9} roughness={0.3} />
      </mesh>
      
      {/* Right post */}
      <mesh position={[1, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.5, 12]} />
        <meshStandardMaterial color="#2B2622" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Board base */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.8, 0.08]} />
        <meshStandardMaterial
          color="#2B2622"
          metalness={0.9}
          roughness={0.3}
        />
      </mesh>

      {/* Gold trim border */}
      <mesh position={[0, 1.5, 0.05]}>
        <boxGeometry args={[2.55, 0.85, 0.02]} />
        <meshStandardMaterial
          color="#C6A15B"
          metalness={1.0}
          roughness={0.2}
        />
      </mesh>

      {/* NM GROUP text */}
      <Text
        position={[0, 1.5, 0.06]}
        fontSize={0.28}
        color="#E0BD73"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
        fontWeight="bold"
      >
        NM GROUP
      </Text>

      {/* Soft warm glow behind text */}
      <pointLight
        ref={glowRef}
        position={[0, 1.5, 0.5]}
        color="#E0BD73"
        intensity={0.6}
        distance={3}
      />
    </group>
  );
}
