import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';

export default function Antenna({ visible }) {
  const lightRef = useRef();
  const lightMeshRef = useRef();
  const groupRef = useRef();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(prefersReducedMotion);
  }, []);

  // Fade in antenna at 95% scroll
  useEffect(() => {
    if (!groupRef.current) return;
    gsap.to(groupRef.current.scale, {
      x: visible ? 1 : 0,
      y: visible ? 1 : 0,
      z: visible ? 1 : 0,
      duration: reducedMotion ? 0 : 1.2,
      ease: 'power2.out',
    });
  }, [visible, reducedMotion]);

  // Blinking red light
  useFrame((state) => {
    if (!lightRef.current || !lightMeshRef.current) return;
    
    let blink = 1;
    if (!reducedMotion) {
      // On: 0.3s, Off: 1.2s -> total cycle 1.5s
      const t = state.clock.getElapsedTime() % 1.5;
      blink = t < 0.3 ? 1 : 0;
    }
    
    lightRef.current.intensity = blink * 1.5;
    lightMeshRef.current.material.emissiveIntensity = blink * 2;
  });

  return (
    <group ref={groupRef} position={[0, 6.2, 0]} scale={0}>
      {/* Base plate */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 0.1, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Pole */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 2, 12]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.2} />
      </mesh>

      {/* Cross-bar 1 */}
      <mesh position={[0, 1.6, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.2} />
      </mesh>

      {/* Cross-bar 2 */}
      <mesh position={[0, 1.85, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.2} />
      </mesh>

      {/* Red light at tip */}
      <mesh ref={lightMeshRef} position={[0, 2.05, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#FF2A2A"
          emissive="#FF2A2A"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Point light for glow */}
      <pointLight
        ref={lightRef}
        position={[0, 2.05, 0]}
        color="#FF2A2A"
        intensity={1.5}
        distance={3}
      />
    </group>
  );
}
