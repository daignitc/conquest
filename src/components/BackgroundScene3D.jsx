import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

// Delicate Cyber Wireframe Gyro Ring
function SlenderRing({ radius, speed, axis = "y", color = "#5EE0FF", opacity = 0.5 }) {
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
      <torusGeometry args={[radius, 0.015, 16, 80]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        transparent
        opacity={opacity}
        roughness={0.3}
      />
    </mesh>
  );
}

// Light & Ethereal Cyber Torus Knot (Non-intrusive, clean aesthetic)
function EtherealArtifact({ scrollRef }) {
  const groupRef = useRef();
  const knotRef = useRef();
  const cageRef = useRef();
  const { viewport } = useThree();
  const isMobile = viewport.width < 7;

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const scroll = scrollRef.current; // 0 to 1

    // Keep the model anchored on the RIGHT side to avoid clashing with text
    // Desktop: x is ~2.0 to 2.3 (safely in the right margin)
    // Mobile: centered but scaled down with lower opacity
    const targetX = isMobile ? 0 : 2.0 - scroll * 0.4 + pointer.x * 0.2;
    const targetY = isMobile ? 0.8 : -scroll * 0.3 - pointer.y * 0.15;
    const targetZ = isMobile ? -1.5 : -0.8 - scroll * 0.5;
    const targetScale = isMobile ? 0.65 : 1.05 - scroll * 0.1;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.05);
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.05));

    if (knotRef.current) {
      knotRef.current.rotation.y = t * 0.25 + scroll * Math.PI;
      knotRef.current.rotation.x = Math.sin(t * 0.2) * 0.25;
    }

    if (cageRef.current) {
      cageRef.current.rotation.y = -t * 0.18;
      cageRef.current.rotation.z = Math.cos(t * 0.15) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[isMobile ? 0 : 2.0, 0, -0.8]}>
      <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.5}>
        {/* Soft, non-glaring central light */}
        <pointLight position={[0, 0, 0]} intensity={1.2} color="#5EE0FF" distance={6} />

        {/* Ethereal Wireframe Torus Knot */}
        <mesh ref={knotRef}>
          <torusKnotGeometry args={[1.15, 0.25, 96, 16, 2, 3]} />
          <meshStandardMaterial
            color="#5EE0FF"
            emissive="#5EE0FF"
            emissiveIntensity={0.5}
            wireframe
            transparent
            opacity={isMobile ? 0.35 : 0.55}
          />
        </mesh>

        {/* Outer Fine-Lattice Sphere Cage */}
        <mesh ref={cageRef} scale={1.3}>
          <icosahedronGeometry args={[1.3, 1]} />
          <meshStandardMaterial
            color="#FF6A3D"
            emissive="#FF6A3D"
            emissiveIntensity={0.4}
            wireframe
            transparent
            opacity={isMobile ? 0.25 : 0.4}
          />
        </mesh>

        {/* Delicate Orbiting Rings */}
        <SlenderRing radius={1.9} speed={0.3} axis="y" color="#FF6A3D" opacity={0.45} />
        <SlenderRing radius={2.2} speed={-0.25} axis="x" color="#5EE0FF" opacity={0.4} />

        {/* Minimal Floating Satellite Nodes */}
        <mesh position={[2.0, 0.6, 0]} scale={0.15}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#FF6A3D" emissive="#FF6A3D" emissiveIntensity={0.8} transparent opacity={0.6} />
        </mesh>
        <mesh position={[-1.9, -0.7, 0]} scale={0.13}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#5EE0FF" emissive="#5EE0FF" emissiveIntensity={0.8} transparent opacity={0.6} />
        </mesh>
      </Float>
    </group>
  );
}

function Scene({ scrollRef }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 6, 4]} intensity={0.8} color="#5EE0FF" />
      <pointLight position={[-4, -3, 2]} intensity={0.8} color="#FF6A3D" />

      {/* Subtle, peaceful starfield */}
      <Stars radius={100} depth={40} count={2800} factor={2.5} saturation={0} fade speed={0.6} />

      {/* Light, non-obtrusive 3D Artifact */}
      <EtherealArtifact scrollRef={scrollRef} />
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
          camera={{ position: [0, 0, 5.5], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false }}
        >
          <Scene scrollRef={scrollRef} />
        </Canvas>
      </Suspense>
    </div>
  );
}
