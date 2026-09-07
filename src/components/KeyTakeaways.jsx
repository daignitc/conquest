import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Brain, Trophy, Users, Film, ExternalLink, Zap, Target, Crosshair } from "lucide-react";
import TiltCard from "./TiltCard";

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
    <section id="takeaways" className="py-24 px-6 md:px-16 lg:px-24 bg-transparent relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with Tactical Radar Widget */}
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

          {/* Tactical Radar Widget */}
          <div className="hidden lg:flex flex-col justify-between p-5 h-48 w-full border border-iron/25 bg-obsidian-raised/80 backdrop-blur-md rounded-sm hud-corner relative">
            <div className="flex items-center justify-between text-[10px] font-mono text-iron">
              <span>TACTICAL RADAR // 4 AXES</span>
              <span className="text-emerald-400 font-bold">100% TELEMETRY</span>
            </div>

            {/* Radar Circular Graphic */}
            <div className="relative flex items-center justify-center my-auto">
              <div className="w-20 h-20 rounded-full border border-iron/30 animate-pulse flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border border-ion-blue/40 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-ember/60 animate-ping" />
                </div>
              </div>
              <Crosshair size={24} className="absolute text-ion-blue/80" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-iron border-t border-iron/15 pt-2">
              <div className="text-ember font-semibold">T-01: CREATIVE AI</div>
              <div className="text-ion-blue font-semibold">T-02: CYPHER SQUAD</div>
              <div className="text-ion-blue font-semibold">T-04: PROMPT SYNTAX</div>
              <div className="text-ember font-semibold">T-03: ARENA REFLEX</div>
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
                    className="p-8 bg-obsidian-raised/80 backdrop-blur-md border border-iron/25 rounded-sm h-full flex flex-col justify-between hud-corner relative transition-all duration-300 hover:border-iron/60 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]"
                  >
                    <div>
                      {/* Top row */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs tracking-wider font-bold" style={{ color: item.color }}>
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
                            className="px-2.5 py-1 rounded bg-obsidian/80 border border-iron/20 font-mono text-[11px] text-parchment/80"
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
        <div className="border border-ember/40 bg-gradient-to-r from-obsidian-raised/90 via-obsidian/90 to-obsidian-raised/90 backdrop-blur-md p-8 md:p-10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 hud-corner shadow-2xl">
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
