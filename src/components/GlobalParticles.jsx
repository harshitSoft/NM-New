import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField = () => {
  const particlesRef = useRef();
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const particleCount = isMobile ? 700 : 2500;

  const [positions, scales, speeds] = useMemo(() => {
    const p = new Float32Array(particleCount * 3);
    const s = new Float32Array(particleCount);
    const sp = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      p[i * 3] = (Math.random() - 0.5) * (isMobile ? 25 : 40);     // x range
      p[i * 3 + 1] = (Math.random() - 0.5) * (isMobile ? 25 : 40); // y range
      p[i * 3 + 2] = (Math.random() - 0.5) * 20;                   // z range

      s[i] = Math.random();
      sp[i] = 0.01 + Math.random() * 0.02;
    }

    return [p, s, sp];
  }, [particleCount, isMobile]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;

      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += speeds[i] * 0.1;
        if (positions[i * 3 + 1] > 15) {
          positions[i * 3 + 1] = -15;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
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
        size={isMobile ? 0.08 : 0.06}
        color="#C6F432"
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  );
};

const GlobalParticles = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
        events={() => ({})}
        style={{ pointerEvents: 'none' }}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default GlobalParticles;
