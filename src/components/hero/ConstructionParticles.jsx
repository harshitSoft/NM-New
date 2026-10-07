import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ConstructionParticles = ({ progress }) => {
  const particlesRef = useRef();

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const particleCount = isMobile ? 400 : 1000;
  
  const [positions, scales] = useMemo(() => {
    const p = new Float32Array(particleCount * 3);
    const s = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      p[i * 3] = (Math.random() - 0.5) * 40;
      p[i * 3 + 1] = Math.random() * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 40;
      
      s[i] = Math.random();
    }
    
    return [p, s];
  }, [particleCount]);

  useFrame((state) => {
    if (particlesRef.current) {
      // Slowly rotate particles
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      
      // Fade out particles as building completes
      const opacity = Math.max(1 - (progress - 0.7) * 4, 0) * 0.5;
      particlesRef.current.material.opacity = opacity;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={particleCount}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#E0BD73"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default ConstructionParticles;
