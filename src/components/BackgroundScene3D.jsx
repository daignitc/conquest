import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function GyroRing({ radius, speed, axis = "y", color = "#5EE0FF", thickness = 0.02 }) {
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
        emissiveIntensity={0.7}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

function FloatingCore({ scrollRef }) {
  const groupRef = useRef();
  const coreRef = useRef();

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const scroll = scrollRef.current; // 0 to 1

    // Smooth scroll-driven 3D coordinates
    // At hero (scroll ~0): right-centered
    // At mid-page (scroll ~0.4): shifts left-deep
    // At bottom (scroll ~1): centered background
    const targetX = (1 - scroll * 1.5) * 1.5 + pointer.x * 0.4;
    const targetY = Math.sin(scroll * Math.PI * 2) * 0.6 - pointer.y * 0.3;
    const targetZ = -scroll * 2.2;
    const targetScale = 1.05 - scroll * 0.35;

    // Smooth lerp for buttery motion
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.05);
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.05));

    // Continuous rotation + scroll twist
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.3 + scroll * Math.PI * 2;
      coreRef.current.rotation.x = Math.sin(t * 0.2) * 0.3 + scroll * Math.PI;
      coreRef.current.rotation.z = Math.cos(t * 0.15) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[1.5, 0, 0]}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.7}>
        {/* Core Icosahedron */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.5, 1]} />
          <MeshDistortMaterial
            color="#5EE0FF"
            emissive="#FF6A3D"
            emissiveIntensity={0.5}
            metalness={0.85}
            roughness={0.15}
            distort={0.3}
            speed={2}
          />
        </mesh>

        {/* Gyro Rings */}
        <GyroRing radius={2.05} speed={0.4} axis="y" color="#FF6A3D" thickness={0.025} />
        <GyroRing radius={2.3} speed={-0.3} axis="x" color="#5EE0FF" thickness={0.02} />
        <GyroRing radius={2.55} speed={0.25} axis="z" color="#F3EFE6" thickness={0.018} />

        {/* Orbiting Satellite Shards */}
        <mesh position={[2.2, 0.6, 0.4]} scale={0.22}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#FF6A3D" emissive="#FF6A3D" emissiveIntensity={1.2} />
        </mesh>
        <mesh position={[-2.1, -0.8, 0.5]} scale={0.2}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#5EE0FF" emissive="#5EE0FF" emissiveIntensity={1.2} />
        </mesh>
        <mesh position={[0.4, -2.3, -0.4]} scale={0.18}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#F3EFE6" emissive="#5EE0FF" emissiveIntensity={0.9} />
        </mesh>
      </Float>
    </group>
  );
}

function Scene({ scrollRef }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[6, 6, 5]} intensity={1.2} color="#5EE0FF" />
      <pointLight position={[-5, -4, 3]} intensity={1.8} color="#FF6A3D" />
      <pointLight position={[3, -5, -2]} intensity={1.0} color="#5EE0FF" />

      {/* Persistent Starfield */}
      <Stars radius={100} depth={50} count={4000} factor={3.5} saturation={0} fade speed={0.8} />

      {/* Floating 3D Core with Scroll Awareness */}
      <FloatingCore scrollRef={scrollRef} />
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
        background: "radial-gradient(ellipse at 50% 20%, rgba(15,13,24,0.6) 0%, #0B0A10 100%)",
      }}
    >
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 52 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene scrollRef={scrollRef} />
        </Canvas>
      </Suspense>

      {/* Subtle Scanline Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(18, 16, 26, 0) 50%, rgba(0, 0, 0, 0.4) 50%)",
          backgroundSize: "100% 4px",
        }}
      />
    </div>
  );
}
