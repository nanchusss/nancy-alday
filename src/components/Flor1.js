import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";


function FlowerSculpture() {
  const group = useRef();

  useFrame(() => {
    group.current.rotation.y += 0.002; // rotación lenta elegante
  });

  return (
    <group ref={group}>
      {Array.from({ length: 16 }).map((_, i) => (
        <mesh
          key={i}
          rotation={[0, (i / 16) * Math.PI * 2, 0]}
          position={[0, 0, 0]}
        >
          <cylinderGeometry args={[0.1, 0.5, 3, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
      ))}

      <mesh>
        <sphereGeometry args={[0.6, 64, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

export default function Floral3D() {
  return (
    <Canvas
      camera={{ position: [0, 2, 6], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <Environment preset="studio" />
      <FlowerSculpture />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}