import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ConstructionDots = ({ positions, progress, appearAt = 0, disappearAt = 1 }) => {
  const meshRef = useRef();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Set positions once
  useEffect(() => {
    if (meshRef.current && positions.length > 0) {
      positions.forEach((pos, i) => {
        dummy.position.set(pos.x, pos.y, pos.z);
        // Start them scaled down
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [positions, dummy]);

  useFrame(() => {
    if (!meshRef.current || positions.length === 0) return;

    let targetScale = 0;
    
    if (progress > appearAt && progress < disappearAt) {
      // Pop in scale effect
      targetScale = Math.min((progress - appearAt) * 20, 1);
    } else if (progress >= disappearAt) {
      // Fade out
      targetScale = Math.max(1 - (progress - disappearAt) * 10, 0);
    }

    // Apply scaling to all instances
    positions.forEach((pos, i) => {
      meshRef.current.getMatrixAt(i, dummy.matrix);
      dummy.position.set(pos.x, pos.y, pos.z);
      // Small variation in pulse if fully visible
      const pulse = targetScale >= 1 ? 1 + Math.sin(Date.now() * 0.005 + i) * 0.1 : targetScale;
      dummy.scale.set(pulse, pulse, pulse);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (positions.length === 0) return null;

  return (
    <instancedMesh ref={meshRef} args={[null, null, positions.length]}>
      <sphereGeometry args={[0.04, 16, 16]} />
      <meshBasicMaterial 
        color="#E0BD73" 
        transparent 
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthTest={false}
      />
    </instancedMesh>
  );
};

export default ConstructionDots;
