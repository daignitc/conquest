import React, { Suspense, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import { ExternalLink, Compass, ShieldAlert, Sparkles } from "lucide-react";

function GyroRing({ radius, speed, axis = "y", color = "#5EE0FF" }) {
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
      <torusGeometry args={[radius, 0.02, 16, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        wireframe={false}
      />
    </mesh>
  );
}

function ArtifactCore() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.35 + pointer.x * 0.3;
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.25 - pointer.y * 0.25;
    meshRef.current.rotation.z = Math.cos(t * 0.15) * 0.1;
  });

  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.9}>
      {/* Central 3D Core */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.12 : 1}
      >
        <icosahedronGeometry args={[1.5, 1]} />
        <MeshDistortMaterial
          color="#5EE0FF"
          emissive="#FF6A3D"
          emissiveIntensity={0.45}
          metalness={0.85}
          roughness={0.12}
          distort={0.32}
          speed={2.2}
          wireframe={false}
        />
      </mesh>

      {/* Gyroscopic 3D Rings */}
      <GyroRing radius={2.1} speed={0.4} axis="y" color="#FF6A3D" />
      <GyroRing radius={2.35} speed={-0.3} axis="x" color="#5EE0FF" />
      <GyroRing radius={2.6} speed={0.2} axis="z" color="#F3EFE6" />

      {/* Orbiting Shards */}
      <mesh position={[2.4, 0.6, 0.4]} scale={0.25}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#FF6A3D" emissive="#FF6A3D" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[-2.2, -0.9, 0.5]} scale={0.22}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#5EE0FF" emissive="#5EE0FF" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0.5, -2.4, -0.5]} scale={0.18}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#F3EFE6" emissive="#5EE0FF" emissiveIntensity={0.9} />
      </mesh>
    </Float>
  );
}

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 6, 5]} intensity={1.2} color="#5EE0FF" />
      <pointLight position={[-4, -3, 3]} intensity={1.8} color="#FF6A3D" />
      <pointLight position={[3, -4, -2]} intensity={1.0} color="#5EE0FF" />
      <Stars radius={90} depth={60} count={3500} factor={3.5} saturation={0} fade speed={1.2} />
      <ArtifactCore />
    </>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 35, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
};

function AnimatedTitle({ text }) {
  return (
    <motion.span variants={containerVariants} initial="hidden" animate="visible" className="inline-flex flex-wrap">
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={charVariants}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 md:pt-12">
      {/* 3D Canvas showpiece */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Suspense fallback={<div className="w-full h-full bg-obsidian" />}>
          <Canvas
            camera={{ position: [0, 0, 5.2], fov: 52 }}
            dpr={[1, 2]}
            gl={{ antialias: true }}
          >
            <HeroScene />
          </Canvas>
        </Suspense>
      </div>

      {/* Atmospheric Vignette & Contrast Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-obsidian via-obsidian/85 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-obsidian via-transparent to-transparent pointer-events-none" />

      {/* Text & Command Content */}
      <div className="relative z-20 px-6 md:px-16 lg:px-24 max-w-4xl py-12">
        {/* Top Tactical Briefing Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-sm border border-ember/30 bg-obsidian-raised/80 backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-ember animate-ping" />
          <span className="text-ember font-mono text-xs tracking-wider uppercase font-semibold">
            OFFICIAL CALL TO CONQUEST // AIML · IoT · AI&amp;DS · GNITC
          </span>
        </motion.div>

        {/* Hero Title */}
        <div className="mb-6">
          <h1
            className="font-display font-bold text-parchment leading-[0.95] tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
            style={{ fontSize: "clamp(52px, 8.5vw, 98px)" }}
          >
            <AnimatedTitle text="AI" />
          </h1>
          <h1
            className="font-display font-bold leading-[0.95] tracking-tight drop-shadow-[0_0_35px_rgba(255,106,61,0.4)]"
            style={{ fontSize: "clamp(52px, 8.5vw, 98px)", color: "#FF6A3D" }}
          >
            <AnimatedTitle text="CONQUEST" />
          </h1>
          <h2
            className="font-display font-bold text-parchment/90 leading-[0.95] tracking-tight flex items-center gap-4 mt-2"
            style={{ fontSize: "clamp(36px, 5vw, 68px)" }}
          >
            <AnimatedTitle text="2026" />
            <span className="text-xs font-mono px-2.5 py-1 border border-ion-blue/40 text-ion-blue rounded bg-ion-blue/5">
              13–14 OCT
            </span>
          </h2>
        </div>

        {/* Narrative Hook */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="text-parchment/80 font-body text-lg md:text-xl mb-8 max-w-xl leading-relaxed font-normal"
        >
          Four high-stakes territories. Two intense campaign days. One college emerges supreme. 
          Claim territory across AI Reels, Treasure Hunt, E-Sports, and Prompt Wars.
        </motion.p>

        {/* War-room Telemetry Readout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10 max-w-lg text-xs font-mono text-iron border-y border-iron/20 py-3"
        >
          <div>
            <span className="block text-ion-blue">CONVENOR &amp; HOD</span>
            <span className="text-parchment font-medium">Dr. S. Madhu</span>
          </div>
          <div>
            <span className="block text-ember">HQ LOCATION</span>
            <span className="text-parchment font-medium">GNI Campus</span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="block text-emerald-400">REGISTRATION</span>
            <span className="text-parchment font-medium">Konfhub LIVE</span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
        >
          <a
            href="https://konfhub.com/ai-conquest"
            target="_blank"
            rel="noopener noreferrer"
            className="ember-pulse group flex items-center justify-center gap-2.5 bg-ember text-obsidian font-bold font-body px-8 py-4 rounded-sm hover:bg-parchment transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ember text-center shadow-[0_0_25px_rgba(255,106,61,0.6)]"
          >
            <span>Register your team</span>
            <ExternalLink size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#events"
            className="flex items-center justify-center gap-2 border border-iron/50 bg-obsidian-raised/60 backdrop-blur text-parchment font-body font-medium px-8 py-4 rounded-sm hover:border-parchment hover:bg-obsidian-raised transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ember text-center"
          >
            <Compass size={18} className="text-ion-blue" />
            <span>Explore 4 Territories</span>
          </a>
        </motion.div>
      </div>

      {/* Floating 3D Badge on bottom right */}
      <div className="hidden lg:block absolute bottom-8 right-12 z-20 pointer-events-none">
        <div className="border border-iron/20 bg-obsidian-raised/70 backdrop-blur-md px-4 py-3 rounded-sm font-mono text-[11px] text-iron flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-ion-blue animate-ping" />
          <div>
            <div className="text-parchment font-bold">WAR ROOM CONSOLE</div>
            <div>STATUS: BATTLE STATIONS READY</div>
          </div>
        </div>
      </div>
    </section>
  );
}
