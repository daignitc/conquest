import React, { Suspense, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Sparkles, Brain, Trophy, Users, Film, ExternalLink, Zap, Target } from "lucide-react";
import TiltCard from "./TiltCard";

function TakeawaysArtifact() {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.4;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#5EE0FF"
          emissive="#FF6A3D"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
          wireframe
        />
      </mesh>
      <mesh scale={0.7}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#FF6A3D"
          emissive="#FF6A3D"
          emissiveIntensity={0.8}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
}

const takeawaysData = [
  {
    id: "reels",
    territory: "TERRITORY I // AI REELS",
    icon: Film,
    color: "#FF6A3D",
    primary: "Creativity, AI skills, video editing, and audience engagement.",
    description:
      "Master the synergy between human creative vision and generative AI video tools. Direct, edit, and orchestrate compelling short-form narratives that captivate audiences.",
    badges: ["Generative Video Tools", "Multimodal Editing", "Narrative Hook Design", "Viewer Retention"],
  },
  {
    id: "hunt",
    territory: "TERRITORY II // TREASURE HUNT",
    icon: Brain,
    color: "#5EE0FF",
    primary: "Teamwork, logical thinking, problem-solving, and quick decision-making.",
    description:
      "Navigate cryptographic puzzles and AI-driven riddles dispersed across campus. Success demands split-second tactical alignment and synchronized squad deduction.",
    badges: ["Cipher Decoding", "Collaborative Logic", "Rapid Troubleshooting", "Dynamic Route Planning"],
  },
  {
    id: "prompts",
    territory: "TERRITORY IV // PROMPT WARS",
    icon: Zap,
    color: "#5EE0FF",
    primary: "Prompt writing, creativity, AI interaction, and problem-solving.",
    description:
      "Wield the language of large models. Navigate text generation, image synthesis, and code tasks under strict constraints without hallucination or hardcoding.",
    badges: ["Context Steering", "Few-Shot Optimization", "AI Tool Fluency", "Precision Syntax"],
  },
  {
    id: "esports",
    territory: "TERRITORY III // E-SPORTS",
    icon: Trophy,
    color: "#FF6A3D",
    primary: "Strategy, teamwork, quick reflexes, and sportsmanship.",
    description:
      "Battle in the digital arena. Demonstrate tactical composure, communication under fire, lightning reflexes, and unwavering competitive integrity.",
    badges: ["Squad Tactics", "Sub-second Reflexes", "Tournament Composure", "Sportsmanship"],
  },
];

export default function KeyTakeaways() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="takeaways" className="py-24 px-6 md:px-16 lg:px-24 bg-obsidian-raised/60 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-ion-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-ember/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with 3D artifact side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3 font-mono text-xs text-ember">
              <Sparkles size={14} />
              <span>ACQUISITION MATRIX &amp; SKILL ARCHITECTURE</span>
            </div>
            <motion.h2
              ref={ref}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 0.7 }}
              className="font-display font-bold text-parchment text-4xl md:text-5xl mb-4 tracking-tight"
            >
              Key Takeaways
            </motion.h2>
            <p className="text-iron font-body text-base md:text-lg max-w-2xl leading-relaxed">
              Every territory is built to deliver transformative technical competencies. 
              Participants emerge with hardened problem-solving capabilities, AI fluency, and battle-tested team chemistry.
            </p>
          </div>

          {/* 3D Visual Core */}
          <div className="hidden lg:flex justify-center items-center h-48 w-full border border-iron/20 bg-obsidian/70 rounded-sm hud-corner relative">
            <div className="absolute top-2 left-3 text-[10px] font-mono text-iron">
              3D // TELEMETRY SYNC
            </div>
            <div className="w-full h-full">
              <Suspense fallback={<div className="w-full h-full" />}>
                <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }}>
                  <ambientLight intensity={0.4} />
                  <pointLight position={[3, 3, 3]} intensity={1.5} color="#5EE0FF" />
                  <pointLight position={[-3, -3, -2]} intensity={1.2} color="#FF6A3D" />
                  <TakeawaysArtifact />
                </Canvas>
              </Suspense>
            </div>
          </div>
        </div>

        {/* Four 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {takeawaysData.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + idx * 0.1, duration: 0.5 }}
              >
                <TiltCard glowColor={item.color} maxTilt={9} className="h-full">
                  <div
                    className="p-8 bg-obsidian-raised border border-iron/25 rounded-sm h-full flex flex-col justify-between hud-corner relative transition-all duration-300 hover:border-iron/60"
                    style={{
                      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.6)",
                    }}
                  >
                    <div>
                      {/* Top row */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs tracking-wider" style={{ color: item.color }}>
                          {item.territory}
                        </span>
                        <div
                          className="p-2.5 rounded-sm border"
                          style={{
                            borderColor: item.color + "44",
                            backgroundColor: item.color + "11",
                          }}
                        >
                          <IconComponent size={20} style={{ color: item.color }} />
                        </div>
                      </div>

                      {/* Primary Takeaway Headline */}
                      <h3 className="font-display font-bold text-parchment text-xl md:text-2xl mb-3 leading-snug">
                        {item.primary}
                      </h3>

                      {/* Description */}
                      <p className="text-iron font-body text-sm leading-relaxed mb-6">
                        {item.description}
                      </p>
                    </div>

                    {/* Micro-Badges */}
                    <div className="border-t border-iron/20 pt-4 mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {item.badges.map((badge, bi) => (
                          <span
                            key={bi}
                            className="px-2.5 py-1 rounded bg-obsidian border border-iron/20 font-mono text-[11px] text-parchment/80"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Bottom Banner */}
        <div className="border border-ember/40 bg-gradient-to-r from-obsidian-raised via-obsidian to-obsidian-raised p-8 md:p-10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 hud-corner">
          <div>
            <span className="text-xs font-mono text-ember font-bold block mb-1">
              READY TO TEST YOUR CAPABILITIES?
            </span>
            <h4 className="font-display font-bold text-parchment text-2xl">
              Registration is open across all 4 territories
            </h4>
            <p className="text-iron font-body text-sm mt-1">
              Lock in your team slots before regional registration caps are reached.
            </p>
          </div>
          <a
            href="https://konfhub.com/ai-conquest"
            target="_blank"
            rel="noopener noreferrer"
            className="ember-pulse shrink-0 flex items-center gap-2 bg-ember text-obsidian font-bold font-body px-8 py-4 rounded-sm hover:bg-parchment transition-all duration-200 shadow-xl"
          >
            <span>Register on Konfhub</span>
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
