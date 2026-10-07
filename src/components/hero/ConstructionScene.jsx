import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import BuildingModel from './BuildingModel';
import BlueprintGrid from './BlueprintGrid';
import ConstructionParticles from './ConstructionParticles';
import Antenna from './Antenna';
import { Suspense, useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

const CameraController = ({ progress }) => {
  const cameraRef = useRef();
  const { size } = useThree();

  useFrame(() => {
    if (!cameraRef.current) return;
    
    const aspect = size.width / size.height;
    let targetPos = new THREE.Vector3();
    
    if (aspect < 1) {
      // Mobile (Portrait)
      targetPos.set(22 - progress * 4, 12 - progress * 2, 34 - progress * 5);
      cameraRef.current.position.lerp(targetPos, 0.1);
      cameraRef.current.lookAt(2, 6 + progress * 2, 0);
    } else if (aspect < 1.5) {
      // Tablet
      targetPos.set(16 - progress * 4, 10 - progress * 2, 26 - progress * 4);
      cameraRef.current.position.lerp(targetPos, 0.1);
      cameraRef.current.lookAt(2, 4 + progress, 0); 
    } else {
      // Desktop
      targetPos.set(14 - progress * 4, 9 - progress * 2, 22 - progress * 5);
      cameraRef.current.position.lerp(targetPos, 0.1);
      cameraRef.current.lookAt(2, 4 + progress, 0);
    }
  });

  return (
    <PerspectiveCamera 
      ref={cameraRef}
      makeDefault 
      fov={45} 
      position={[14, 9, 22]} 
      near={0.1}
      far={500000}
    />
  );
};

const ConstructionScene = ({ progress }) => {
  const groundAlphaMap = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(256, 256, 50, 256, 256, 256);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.9)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <div className="w-full h-full pointer-events-auto">
      <Canvas
        scene={{ background: new THREE.Color('#0B3C49') }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          outputColorSpace: THREE.SRGBColorSpace
        }}
        dpr={[1, 2]}
      >
        <CameraController progress={progress} />
        
        <fog attach="fog" args={['#0B3C49', 30, 120]} />
        
        <ambientLight intensity={0.6} color="#D9E8E3" />
        <directionalLight 
          position={[80, 60, 60]} 
          intensity={2.0} 
          color="#FAFAF7" 
          castShadow 
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
        />
        <hemisphereLight
          skyColor="#0B3C49"
          groundColor="#0E4D45"
          intensity={0.8}
        />

        <Suspense fallback={null}>
          <Environment preset="city" background={false} />
          
          {/* Large ground plane with radial alpha fade */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
            <planeGeometry args={[1000, 1000]} />
            <meshStandardMaterial 
              color="#0E4D45" 
              roughness={0.85} 
              transparent
              alphaMap={groundAlphaMap}
            />
          </mesh>

          <group position={[0, 0, 0]}>
            <BlueprintGrid progress={progress} />
            <BuildingModel progress={progress} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ConstructionScene;
