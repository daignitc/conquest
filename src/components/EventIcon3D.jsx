import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function ShapeAIReels({ color }) {
  const group = useRef();
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.z = t * 0.9;
    group.current.rotation.y = Math.sin(t * 0.5) * 0.4;
  });
  return (
    <group ref={group}>
      <mesh>
        <torusGeometry args={[0.55, 0.12, 16, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} metalness={0.8} roughness={0.2} wireframe />
      </mesh>
      <mesh scale={0.28}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" emissive={color} emissiveIntensity={0.9} />
      </mesh>
    </group>
  );
}

function ShapeTreasureHunt({ color }) {
  const group = useRef();
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.8;
    group.current.rotation.x = Math.cos(t * 0.6) * 0.5;
  });
  return (
    <group ref={group}>
      <mesh>
        <octahedronGeometry args={[0.65, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} wireframe />
      </mesh>
      <mesh scale={0.3}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#5EE0FF" emissive="#5EE0FF" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function ShapeESports({ color }) {
  const group = useRef();
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.7;
    group.current.rotation.z = Math.sin(t * 0.8) * 0.2;
  });
  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[0.85, 0.55, 0.25]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} wireframe />
      </mesh>
      <mesh position={[0, 0, 0]} scale={0.2}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#FF6A3D" emissive="#FF6A3D" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function ShapePromptWars({ color }) {
  const group = useRef();
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.x = t * 0.6;
    group.current.rotation.y = t * 0.8;
  });
  return (
    <group ref={group}>
      <mesh>
        <tetrahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} wireframe />
      </mesh>
      <mesh scale={0.25}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#5EE0FF" emissive="#5EE0FF" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

export default function EventIcon3D({ type, color }) {
  const renderShape = () => {
    switch (type) {
      case "ai-reels":
        return <ShapeAIReels color={color} />;
      case "treasure-hunt":
        return <ShapeTreasureHunt color={color} />;
      case "esports":
        return <ShapeESports color={color} />;
      case "prompt-wars":
        return <ShapePromptWars color={color} />;
      default:
        return <ShapeAIReels color={color} />;
    }
  };

  return (
    <div className="w-16 h-16 relative">
      <Suspense fallback={<div className="w-16 h-16" />}>
        <Canvas camera={{ position: [0, 0, 2.3], fov: 50 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.4} />
          <pointLight position={[2, 2, 2]} intensity={1.5} color={color} />
          <pointLight position={[-2, -2, -1]} intensity={0.8} color="#FFFFFF" />
          {renderShape()}
        </Canvas>
      </Suspense>
    </div>
  );
}
