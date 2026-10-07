import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BlueprintGrid = ({ progress }) => {
  const gridRef = useRef();
  
  // Opacity peaks early, then fades slightly as the building completes
  const opacity = Math.min(progress * 5, 1) * Math.max(1 - (progress - 0.5) * 2, 0.2);

  // Custom grid material
  const material = useMemo(() => new THREE.LineBasicMaterial({
    color: 0xC6F432,
    transparent: true,
    opacity: opacity * 0.15,
  }), [opacity]);

  // Create grid lines
  const lines = useMemo(() => {
    const points = [];
    const size = 30;
    const step = 2;

    for (let i = -size; i <= size; i += step) {
      points.push(new THREE.Vector3(-size, 0, i));
      points.push(new THREE.Vector3(size, 0, i));
      points.push(new THREE.Vector3(i, 0, -size));
      points.push(new THREE.Vector3(i, 0, size));
    }
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, []);

  useFrame(() => {
    if (gridRef.current) {
      gridRef.current.material.opacity = opacity * 0.15;
    }
  });

  return (
    <group>
      <lineSegments ref={gridRef} geometry={lines} material={material} />
      
      {/* Subtle glowing center point */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial 
          color="#C6F432" 
          transparent 
          opacity={opacity * 0.05} 
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export default BlueprintGrid;
