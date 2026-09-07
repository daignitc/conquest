import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function GyroRing({ radius, speed, axis = "y", color = "#5EE0FF", thickness = 0.035 }) {
  const ringRef = useRef();
  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    const t = clock.getElapsedTime() * speed;
    if (axis === "x") ringRef.current.rotation.x = t;
    if (axis === "y") ringRef.current.rotation.y = t;
    if (axis === "z") ringRef.current.rotation.z = t;
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, thickness, 16, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.0}
        roughness={0.2}
        metalness={0.3}
      />
    </mesh>
  );
}

function RadiantCore({ scrollRef }) {
  const groupRef = useRef();
  const innerRef = useRef();
  const cageRef = useRef();
  const { viewport } = useThree();
  const isMobile = viewport.width < 7;

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const scroll = scrollRef.current; // 0 to 1

    // Target coordinates:
    // Desktop: Hero right-side (x: 1.3), then gently moves across center as user scrolls
    // Mobile: Centered (x: 0), placed higher up so it crowns the hero text
    const targetX = isMobile ? 0 : 1.3 - scroll * 1.6 + pointer.x * 0.3;
    const targetY = isMobile ? 0.6 - scroll * 0.5 : Math.sin(scroll * Math.PI) * 0.4 - pointer.y * 0.2;
    const targetZ = isMobile ? -1.0 : -scroll * 0.8;
    const targetScale = isMobile ? 0.85 : 1.15 - scroll * 0.15;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.06);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.06);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.06);
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.06));

    if (innerRef.current) {
      innerRef.current.rotation.y = t * 0.4 + scroll * Math.PI * 2;
      innerRef.current.rotation.x = Math.sin(t * 0.25) * 0.3 + scroll * Math.PI;
    }

    if (cageRef.current) {
      cageRef.current.rotation.y = -t * 0.25 - scroll * Math.PI;
      cageRef.current.rotation.z = Math.cos(t * 0.3) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[isMobile ? 0 : 1.3, 0, 0]}>
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.8}>
        {/* Core Point Light situated directly inside */}
        <pointLight position={[0, 0, 0]} intensity={3.0} color="#5EE0FF" distance={8} />

        {/* Inner Pulsing Core Crystal */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[1.4, 1]} />
          <MeshDistortMaterial
            color="#5EE0FF"
            emissive="#FF6A3D"
            emissiveIntensity={0.85}
            roughness={0.2}
            metalness={0.2}
            distort={0.35}
            speed={2.5}
          />
        </mesh>

        {/* Outer Geometric Wireframe Shield */}
        <mesh ref={cageRef} scale={1.22}>
          <icosahedronGeometry args={[1.4, 0]} />
          <meshStandardMaterial
            color="#FF6A3D"
            emissive="#FF6A3D"
            emissiveIntensity={1.2}
            wireframe
          />
        </mesh>

        {/* Inner Sun Bead */}
        <mesh scale={0.5}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FF6A3D"
            emissiveIntensity={2.0}
          />
        </mesh>

        {/* High-Visibility Gyro Rings */}
        <GyroRing radius={2.0} speed={0.45} axis="y" color="#FF6A3D" thickness={0.035} />
        <GyroRing radius={2.3} speed={-0.35} axis="x" color="#5EE0FF" thickness={0.03} />
        <GyroRing radius={2.6} speed={0.25} axis="z" color="#F3EFE6" thickness={0.025} />

        {/* Floating Neon Satellites */}
        <mesh position={[2.4, 0.7, 0.5]} scale={0.26}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#FF6A3D" emissive="#FF6A3D" emissiveIntensity={1.8} />
        </mesh>
        <mesh position={[-2.3, -0.9, 0.6]} scale={0.24}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#5EE0FF" emissive="#5EE0FF" emissiveIntensity={1.8} />
        </mesh>
        <mesh position={[0.5, -2.5, -0.5]} scale={0.2}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#F3EFE6" emissive="#5EE0FF" emissiveIntensity={1.5} />
        </mesh>
        <mesh position={[-0.8, 2.3, -0.4]} scale={0.22}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#FF6A3D" emissive="#FF6A3D" emissiveIntensity={1.6} />
        </mesh>
      </Float>
    </group>
  );
}

function Scene({ scrollRef }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 8, 5]} intensity={2.0} color="#5EE0FF" />
      <directionalLight position={[-6, -6, -4]} intensity={1.5} color="#FF6A3D" />
      <pointLight position={[4, 3, 3]} intensity={2.5} color="#5EE0FF" />
      <pointLight position={[-4, -3, 2]} intensity={2.5} color="#FF6A3D" />

      {/* Radiant Starfield */}
      <Stars radius={120} depth={60} count={4500} factor={4} saturation={0} fade speed={1.2} />

      {/* Floating 3D Radiant Core */}
      <RadiantCore scrollRef={scrollRef} />
    </>
  );
}

export default function BackgroundScene3D() {
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollRef.current = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        backgroundColor: "#0B0A10",
      }}
    >
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 52 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false }}
        >
          <Scene scrollRef={scrollRef} />
        </Canvas>
      </Suspense>
    </div>
  );
}
