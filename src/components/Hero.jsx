import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Compass, ShieldAlert, Sparkles, Terminal, Activity } from "lucide-react";

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
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 md:pt-16 pb-16">
      {/* Subtle Vignette for Left-Side Typography Legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent pointer-events-none" />

      {/* Text & Command Content */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24 max-w-4xl py-12">
        {/* Top Tactical Briefing Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-sm border border-ember/30 bg-obsidian-raised/85 backdrop-blur-md mb-6"
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
            <span className="text-xs font-mono px-2.5 py-1 border border-ion-blue/40 text-ion-blue rounded bg-ion-blue/10 backdrop-blur-sm">
              13–14 OCT
            </span>
          </h2>
        </div>

        {/* Narrative Hook */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="text-parchment/85 font-body text-lg md:text-xl mb-8 max-w-xl leading-relaxed font-normal"
        >
          Four high-stakes territories. Two intense campaign days. One college emerges supreme. 
          Claim territory across AI Reels, Treasure Hunt, E-Sports, and Prompt Wars.
        </motion.p>

        {/* War-room Telemetry Readout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10 max-w-lg text-xs font-mono text-iron border-y border-iron/25 py-3 backdrop-blur-sm bg-obsidian/40 rounded-sm px-2"
        >
          <div>
            <span className="block text-ion-blue">CONVENOR &amp; HOD</span>
            <span className="text-parchment font-medium">Dr. S. Madhu</span>
          </div>
          <div>
            <span className="block text-ember">HQ LOCATION</span>
            <span className="text-parchment font-medium">GNITC Campus</span>
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
            className="flex items-center justify-center gap-2 border border-iron/50 bg-obsidian-raised/80 backdrop-blur-md text-parchment font-body font-medium px-8 py-4 rounded-sm hover:border-parchment hover:bg-obsidian-raised transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ember text-center"
          >
            <Compass size={18} className="text-ion-blue" />
            <span>Explore 4 Territories</span>
          </a>
        </motion.div>
      </div>

      {/* Floating 3D Telemetry Badge on bottom right */}
      <div className="hidden lg:block absolute bottom-12 right-12 z-10 pointer-events-none">
        <div className="border border-iron/30 bg-obsidian-raised/80 backdrop-blur-md px-4 py-3 rounded-sm font-mono text-[11px] text-iron flex items-center gap-3 shadow-2xl hud-corner">
          <div className="w-2.5 h-2.5 rounded-full bg-ion-blue animate-ping" />
          <div>
            <div className="text-parchment font-bold">WAR ROOM CORE ACTIVE</div>
            <div className="text-[10px] text-iron">SCROLL TO ORBIT // INTERACTIVE 3D</div>
          </div>
        </div>
      </div>
    </section>
  );
}
