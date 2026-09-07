import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Target, Award, Building2 } from "lucide-react";
import TiltCard from "./TiltCard";

const stats = [
  { value: "2", label: "Days of competition", sub: "13 & 14 October 2026", color: "#FF6A3D", icon: Target },
  { value: "4", label: "Territory Battlegrounds", sub: "Reels · Hunt · Esports · Prompts", color: "#5EE0FF", icon: Award },
  { value: "₹[TBD]", label: "Grand Prize Pool", sub: "Trophies + Merit Citations", color: "#FF6A3D", icon: ShieldCheck },
  { value: "[TBD]+", label: "Colleges Invited", sub: "Inter-collegiate AI Clash", color: "#5EE0FF", icon: Building2 },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6 md:px-16 lg:px-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — Narrative */}
        <div ref={ref}>
          <div className="flex items-center gap-2 mb-3 font-mono text-xs text-ion-blue">
            <span className="w-1.5 h-1.5 rounded-full bg-ion-blue" />
            <span>EXECUTIVE BRIEFING // GNI</span>
          </div>

          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="font-display font-bold text-parchment text-4xl md:text-5xl mb-6 tracking-tight">
              About the Event
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-parchment font-body leading-relaxed mb-6 text-base md:text-lg"
          >
            <strong className="text-parchment font-semibold">AI Conquest 2026</strong> is the flagship inter-collegiate campaign organized by the Department of AIML, IoT, and AI&amp;DS at Guru Nanak Institutions Technical Campus (GNITC). It unites visionary builders, gamers, puzzle solvers, and prompt architects under one battlefield.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="text-parchment/80 font-body leading-relaxed mb-8 text-sm md:text-base"
          >
            Under the mentorship and leadership of <span className="text-parchment font-medium">Dr. S. Madhu</span>, Convenor &amp; Head of Department, AI Conquest 2026 tests real-time intelligence, teamwork, cognitive agility, and creative mastery across 4 distinctive territories.
          </motion.p>

          {/* Institutional Credit Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center gap-4 p-4 border border-iron/25 bg-obsidian-raised/80 rounded-sm hud-corner"
          >
            <img src={`${import.meta.env.BASE_URL}GNI.png`} alt="GNI" className="h-10 w-auto object-contain" />
            <div>
              <span className="text-parchment font-display font-bold text-sm block">
                Guru Nanak Institutions (GNI)
              </span>
              <span className="text-iron font-body text-xs block">
                Department of Computer Science &amp; Engineering · Artificial Intelligence &amp; Machine Learning
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right — 3D Stat Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((s, i) => {
            const IconComp = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="h-full"
              >
                <TiltCard glowColor={s.color} maxTilt={10} className="h-full">
                  <div className="border border-iron/25 p-6 bg-obsidian-raised/90 h-full rounded-sm hud-corner flex flex-col justify-between hover:border-iron/60 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono text-iron uppercase tracking-wider">
                        METRIC // 0{i + 1}
                      </span>
                      <IconComp size={18} style={{ color: s.color }} />
                    </div>
                    <div>
                      <div
                        className="font-display font-bold text-4xl mb-1 tracking-tight"
                        style={{ color: s.color }}
                      >
                        {s.value}
                      </div>
                      <div className="text-parchment font-body text-sm font-medium">
                        {s.label}
                      </div>
                      <div className="text-iron font-mono text-xs mt-1">
                        {s.sub}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
