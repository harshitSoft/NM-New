import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ConstructionDots from './ConstructionDots';
import NMGroupSignboard from './NMGroupSignboard';
import Antenna from './Antenna';

const W = 10;
const D = 8;
const H = 3.5;

export default function BuildingModel({ progress }) {
  const buildingRef = useRef();

  useFrame((state) => {
    if (buildingRef.current && window.innerWidth > 768) {
      const mouseX = (state.pointer.x * Math.PI) / 180;
      const mouseY = (state.pointer.y * Math.PI) / 180;
      buildingRef.current.rotation.y = THREE.MathUtils.lerp(buildingRef.current.rotation.y, mouseX * 1.5, 0.05);
      buildingRef.current.rotation.x = THREE.MathUtils.lerp(buildingRef.current.rotation.x, mouseY * 0.5, 0.05);
    }
  });

  return (
    <group ref={buildingRef} position={[0, -0.05, 0]}>
      {/* 8-15% Blueprint */}
      <BlueprintOverlay progress={progress} />
      {/* 15-22% Foundation P1 */}
      <Foundation progress={progress} />
      {/* 22-32% Ground Pillars P2 & 38-48% First Floor Pillars P4 */}
      <Pillars progress={progress} />
      {/* 32-38% Ground Slab P3 & 48-55% Roof Slab P5 */}
      <Slabs progress={progress} />
      {/* 55-60% Roof Parapet P6 & Mech Unit P7 */}
      <RoofStructure progress={progress} />
      {/* 82-88% Interior P10 */}
      <Interior progress={progress} />
      {/* 60-72% Ground Glass P8 & 72-82% First Glass P9 & 82-88% Doors P11 */}
      <GlassFacade progress={progress} />
      {/* 82-88% Wall Sconces P12 */}
      <WallSconces progress={progress} />
      {/* 88-94% Landscaping P13 */}
      <Landscaping progress={progress} />
      {/* 94-100% Signboard P14 and Antenna */}
      <NMGroupSignboard progress={progress} />
      <group position={[-2, 1.6, -1]}>
        <Antenna visible={progress >= 0.94} />
      </group>
    </group>
  );
}

const BlueprintOverlay = ({ progress }) => {
  const lineRef = useRef();
  let opacity = 0;
  if (progress >= 0.08 && progress < 0.15) opacity = (progress - 0.08) / 0.07;
  else if (progress >= 0.15 && progress < 0.22) opacity = 1 - (progress - 0.15) / 0.07;

  const points = useMemo(() => {
    const pts = [
      new THREE.Vector3(-W/2, 0.01, -D/2),
      new THREE.Vector3(W/2, 0.01, -D/2),
      new THREE.Vector3(W/2, 0.01, D/2),
      new THREE.Vector3(-W/2, 0.01, D/2),
      new THREE.Vector3(-W/2, 0.01, -D/2)
    ];
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.material.opacity = Math.max(opacity, 0);
      lineRef.current.visible = opacity > 0;
    }
  });

  return (
    <group>
      <line ref={lineRef} geometry={points}>
        <lineBasicMaterial color="#D4AF37" transparent opacity={0} linewidth={3} />
      </line>
      <ConstructionDots 
        positions={[{x: -W/2, y: 0, z: -D/2}, {x: W/2, y: 0, z: -D/2}, {x: W/2, y: 0, z: D/2}, {x: -W/2, y: 0, z: D/2}]}
        progress={progress} appearAt={0.08} disappearAt={0.22}
      />
    </group>
  );
};

const Foundation = ({ progress }) => {
  const ref = useRef();
  let opacity = 0;
  if (progress > 0.15) opacity = Math.min((progress - 0.15) / 0.07, 1);
  
  useFrame(() => {
    if (ref.current) {
      ref.current.scale.set(1, opacity > 0 ? 1 : 0, 1);
      ref.current.visible = opacity > 0;
      ref.current.material.opacity = opacity;
    }
  });

  return (
    <group>
      <mesh ref={ref} position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[W + 0.5, 0.2, D + 0.5]} />
        <meshStandardMaterial color="#FAFAF7" roughness={0.75} metalness={0.05} transparent opacity={0} />
      </mesh>
      <ConstructionDots 
        positions={[{x: -W/2, y: 0.2, z: -D/2}, {x: W/2, y: 0.2, z: -D/2}, {x: W/2, y: 0.2, z: D/2}, {x: -W/2, y: 0.2, z: D/2}]}
        progress={progress} appearAt={0.15} disappearAt={0.95}
      />
    </group>
  );
};

const Pillars = ({ progress }) => {
  const groundRef = useRef();
  const firstRef = useRef();

  let p2Scale = 0; // 22-32%
  if (progress > 0.22) p2Scale = Math.min((progress - 0.22) / 0.10, 1);
  
  let p4Scale = 0; // 38-48%
  if (progress > 0.38) p4Scale = Math.min((progress - 0.38) / 0.10, 1);

  useFrame(() => {
    if (groundRef.current) {
      groundRef.current.scale.set(1, p2Scale, 1);
      groundRef.current.position.y = 0.2 + (p2Scale * H) / 2;
      groundRef.current.visible = p2Scale > 0;
    }
    if (firstRef.current) {
      firstRef.current.scale.set(1, p4Scale, 1);
      firstRef.current.position.y = 0.2 + H + 0.2 + (p4Scale * H) / 2;
      firstRef.current.visible = p4Scale > 0;
    }
  });

  const positions = [
    [-W/2 + 0.2, -D/2 + 0.2], [0, -D/2 + 0.2], [W/2 - 0.2, -D/2 + 0.2],
    [-W/2 + 0.2, D/2 - 0.2], [0, D/2 - 0.2], [W/2 - 0.2, D/2 - 0.2]
  ];

  return (
    <group>
      <group ref={groundRef}>
        {positions.map(([x, z], i) => (
          <mesh key={i} position={[x, 0, z]} castShadow receiveShadow>
            <boxGeometry args={[0.4, H, 0.4]} />
            <meshStandardMaterial color="#FAFAF7" roughness={0.75} metalness={0.05} />
          </mesh>
        ))}
      </group>
      <group ref={firstRef}>
        {positions.map(([x, z], i) => (
          <mesh key={i} position={[x, 0, z]} castShadow receiveShadow>
            <boxGeometry args={[0.4, H, 0.4]} />
            <meshStandardMaterial color="#FAFAF7" roughness={0.75} metalness={0.05} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

const Slabs = ({ progress }) => {
  const gSlab = useRef();
  const rSlab = useRef();

  let p3Scale = 0; // 32-38%
  if (progress > 0.32) p3Scale = Math.min((progress - 0.32) / 0.06, 1);
  
  let p5Scale = 0; // 48-55%
  if (progress > 0.48) p5Scale = Math.min((progress - 0.48) / 0.07, 1);

  useFrame(() => {
    if (gSlab.current) {
      gSlab.current.scale.set(p3Scale, 1, p3Scale);
      gSlab.current.visible = p3Scale > 0;
    }
    if (rSlab.current) {
      rSlab.current.scale.set(p5Scale, 1, p5Scale);
      rSlab.current.visible = p5Scale > 0;
    }
  });

  return (
    <group>
      <mesh ref={gSlab} position={[0, 0.2 + H + 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[W, 0.2, D]} />
        <meshStandardMaterial color="#FAFAF7" roughness={0.75} metalness={0.05} />
      </mesh>
      <mesh ref={rSlab} position={[0, 0.2 + H*2 + 0.2 + 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[W + 0.4, 0.2, D + 0.4]} />
        <meshStandardMaterial color="#FAFAF7" roughness={0.75} metalness={0.05} />
      </mesh>
    </group>
  );
};

const RoofStructure = ({ progress }) => {
  const ref = useRef();
  let opacity = 0; // 55-60%
  if (progress > 0.55) opacity = Math.min((progress - 0.55) / 0.05, 1);

  useFrame(() => {
    if (ref.current) {
      ref.current.scale.set(1, opacity > 0 ? 1 : 0, 1);
      ref.current.visible = opacity > 0;
      ref.current.traverse((child) => {
        if (child.isMesh && child.material) child.material.opacity = opacity;
      });
    }
  });

  return (
    <group ref={ref} position={[0, 0.2 + H*2 + 0.4, 0]}>
      {/* Parapet */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[W, 0.4, D]} />
        <meshStandardMaterial color="#FAFAF7" roughness={0.75} metalness={0.05} transparent />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[W - 0.4, 0.41, D - 0.4]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
      {/* Mech Unit */}
      <mesh position={[-2, 0.8, -1]} castShadow receiveShadow>
        <boxGeometry args={[2, 1.2, 2]} />
        <meshStandardMaterial color="#D9E8E3" roughness={0.8} metalness={0.1} transparent />
      </mesh>
    </group>
  );
};

const GlassFacade = ({ progress }) => {
  const groundRef = useRef();
  const firstRef = useRef();
  const doorRef = useRef();

  let p8Op = 0; // 60-72%
  if (progress > 0.60) p8Op = Math.min((progress - 0.60) / 0.12, 1);
  let p9Op = 0; // 72-82%
  if (progress > 0.72) p9Op = Math.min((progress - 0.72) / 0.10, 1);
  let p11Op = 0; // 82-88%
  if (progress > 0.82) p11Op = Math.min((progress - 0.82) / 0.06, 1);

  useFrame(() => {
    if (groundRef.current) {
      groundRef.current.visible = p8Op > 0;
      groundRef.current.traverse((c) => { if (c.isMesh) c.material.opacity = p8Op * 0.95; });
    }
    if (firstRef.current) {
      firstRef.current.visible = p9Op > 0;
      firstRef.current.traverse((c) => { if (c.isMesh) c.material.opacity = p9Op * 0.95; });
    }
    if (doorRef.current) {
      doorRef.current.visible = p11Op > 0;
      doorRef.current.traverse((c) => { if (c.isMesh) c.material.opacity = p11Op; });
    }
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: "#0B3C49", metalness: 0.1, roughness: 0.05, transmission: 0.9, thickness: 0.5, ior: 1.5,
    envMapIntensity: 1.5, clearcoat: 1.0, clearcoatRoughness: 0.05, transparent: true
  });

  return (
    <group>
      <group ref={groundRef}>
        <mesh position={[-2.5, 0.2 + H/2, D/2]} material={glassMat}><boxGeometry args={[4.6, H, 0.1]} /></mesh>
        <mesh position={[2.5, 0.2 + H/2, D/2]} material={glassMat}><boxGeometry args={[4.6, H, 0.1]} /></mesh>
        <mesh position={[-W/2, 0.2 + H/2, 0]} material={glassMat}><boxGeometry args={[0.1, H, D]} /></mesh>
        <mesh position={[W/2, 0.2 + H/2, 0]} material={glassMat}><boxGeometry args={[0.1, H, D]} /></mesh>
        <mesh position={[0, 0.2 + H/2, -D/2]} material={glassMat}><boxGeometry args={[W, H, 0.1]} /></mesh>
      </group>
      <group ref={firstRef}>
        <mesh position={[0, 0.2 + H + 0.2 + H/2, D/2]} material={glassMat}><boxGeometry args={[W, H, 0.1]} /></mesh>
        <mesh position={[-W/2, 0.2 + H + 0.2 + H/2, 0]} material={glassMat}><boxGeometry args={[0.1, H, D]} /></mesh>
        <mesh position={[W/2, 0.2 + H + 0.2 + H/2, 0]} material={glassMat}><boxGeometry args={[0.1, H, D]} /></mesh>
        <mesh position={[0, 0.2 + H + 0.2 + H/2, -D/2]} material={glassMat}><boxGeometry args={[W, H, 0.1]} /></mesh>
      </group>
      <group ref={doorRef} position={[0, 0.2 + 1, D/2 + 0.02]}>
        <mesh><boxGeometry args={[1.8, 2, 0.05]} /><meshStandardMaterial color="#1a1a1a" transparent /></mesh>
        <mesh position={[-0.4, 0, 0.03]} material={glassMat}><planeGeometry args={[0.8, 1.8]} /></mesh>
        <mesh position={[0.4, 0, 0.03]} material={glassMat}><planeGeometry args={[0.8, 1.8]} /></mesh>
      </group>
    </group>
  );
};

const Interior = ({ progress }) => {
  const ref = useRef();
  let opacity = 0; // 82-88%
  if (progress > 0.82) opacity = Math.min((progress - 0.82) / 0.06, 1);
  
  useFrame(() => {
    if (ref.current) {
      ref.current.visible = opacity > 0;
      ref.current.traverse((c) => { if (c.isMesh && c.material) c.material.opacity = opacity; });
    }
  });

  return (
    <group ref={ref}>
      <mesh position={[0, 0.2 + H/2, -D/2 + 0.5]}><boxGeometry args={[6, H, 0.2]} /><meshStandardMaterial color="#1B2B2B" roughness={0.6} transparent /></mesh>
      <pointLight position={[0, 2, 0]} color="#FAFAF7" intensity={2} distance={10} />
      <pointLight position={[0, H + 2, 0]} color="#FAFAF7" intensity={2} distance={10} />
    </group>
  );
};

const WallSconces = ({ progress }) => {
  const ref = useRef();
  let opacity = 0; // 82-88%
  if (progress > 0.82) opacity = Math.min((progress - 0.82) / 0.06, 1);
  
  useFrame(() => {
    if (ref.current) {
      ref.current.visible = opacity > 0;
      ref.current.traverse((c) => { if (c.isMesh && c.material) c.material.opacity = opacity; });
    }
  });

  return (
    <group ref={ref}>
      <mesh position={[-W/2 - 0.05, 2, D/2]}><boxGeometry args={[0.1, 0.3, 0.1]}/><meshStandardMaterial color="#0a0a0a" transparent/></mesh>
      <mesh position={[W/2 + 0.05, 2, D/2]}><boxGeometry args={[0.1, 0.3, 0.1]}/><meshStandardMaterial color="#0a0a0a" transparent/></mesh>
      <pointLight position={[-W/2 - 0.1, 2, D/2 + 0.1]} color="#C6F432" intensity={1} distance={5} />
      <pointLight position={[W/2 + 0.1, 2, D/2 + 0.1]} color="#C6F432" intensity={1} distance={5} />
    </group>
  );
};

const BackgroundBuilding = ({ position, scale }) => {
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0xD9E8E3,
    roughness: 0.8,
  }), []);

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0x0B3C49,
    metalness: 0.2,
    roughness: 0.1,
  }), []);

  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 6, 0]} material={material}>
        <boxGeometry args={[8, 12, 8]} />
      </mesh>
      <mesh position={[0, 6, 4.05]} material={glassMaterial}>
        <planeGeometry args={[7, 11]} />
      </mesh>
    </group>
  );
};

const Landscaping = ({ progress }) => {
  const ref = useRef();
  let opacity = 0; // 88-94%
  if (progress > 0.88) opacity = Math.min((progress - 0.88) / 0.06, 1);

  useFrame(() => {
    if (ref.current) {
      ref.current.visible = opacity > 0;
      ref.current.traverse((c) => { if (c.isMesh && c.material) c.material.opacity = opacity; });
    }
  });

  const treePositions = [
    [-14, 0, 3], [-18, 0, -5], [-12, 0, -10],
    [14, 0, 3], [18, 0, -5], [12, 0, -10]
  ];

  return (
    <group ref={ref}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 8]} receiveShadow>
        <planeGeometry args={[4, 12]} />
        <meshStandardMaterial color="#0E4D45" roughness={0.9} transparent />
      </mesh>
      
      {treePositions.map((pos, i) => (
        <group key={i} position={pos} scale={1 + (i%2)*0.3}>
          <mesh position={[0, 1, 0]}><cylinderGeometry args={[0.2, 0.3, 2]} /><meshStandardMaterial color="#1B2B2B" transparent/></mesh>
          <mesh position={[0, 2.5, 0]}><sphereGeometry args={[1.5, 16, 16]} /><meshStandardMaterial color="#0E4D45" roughness={0.8} transparent/></mesh>
        </group>
      ))}

      {/* Shrubs */}
      <mesh position={[-5, 0.5, 4]}><sphereGeometry args={[0.8, 16, 16]} /><meshStandardMaterial color="#0B3C49" roughness={0.9} transparent/></mesh>
      <mesh position={[5, 0.5, 4]}><sphereGeometry args={[0.8, 16, 16]} /><meshStandardMaterial color="#0B3C49" roughness={0.9} transparent/></mesh>
      <mesh position={[-3, 0.3, 5.5]}><sphereGeometry args={[0.4, 16, 16]} /><meshStandardMaterial color="#0E4D45" roughness={0.9} transparent/></mesh>
      <mesh position={[3, 0.3, 5.5]}><sphereGeometry args={[0.4, 16, 16]} /><meshStandardMaterial color="#0E4D45" roughness={0.9} transparent/></mesh>
      
      {/* Path lamps */}
      <mesh position={[-2.5, 0.4, 6]}><cylinderGeometry args={[0.05, 0.05, 0.8]} /><meshStandardMaterial color="#1a1a1a" transparent/></mesh>
      <mesh position={[2.5, 0.4, 6]}><cylinderGeometry args={[0.05, 0.05, 0.8]} /><meshStandardMaterial color="#1a1a1a" transparent/></mesh>

      {/* Background Buildings (Colony Feel) */}
      <BackgroundBuilding position={[-20, 0, -15]} scale={0.9} />
      <BackgroundBuilding position={[-35, 0, -25]} scale={0.8} />
      <BackgroundBuilding position={[-50, 0, -40]} scale={0.7} />
      <BackgroundBuilding position={[25, 0, -20]} scale={0.9} />
      <BackgroundBuilding position={[40, 0, -30]} scale={0.75} />
      <BackgroundBuilding position={[55, 0, -45]} scale={0.65} />
      <BackgroundBuilding position={[5, 0, -35]} scale={0.85} />
      <BackgroundBuilding position={[-10, 0, -40]} scale={0.8} />
    </group>
  );
};
