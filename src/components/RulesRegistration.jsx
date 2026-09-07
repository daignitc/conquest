import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, ExternalLink, ShieldCheck, FileText } from "lucide-react";
import TiltCard from "./TiltCard";

const rules = [
  {
    event: "AI Reels",
    code: "TERRITORY_01 // MEDIA_OPS",
    items: [
      "Teams of 2–3 participants. At least one member must be currently enrolled in an accredited institution.",
      "Reel duration must be 60–90 seconds. Absolutely no pre-made commercial content allowed.",
      "All generative AI tools (video, imagery, voice synthesis) must be declared in the submission manifest.",
      "Offensive, political, or plagiarized materials result in immediate disqualification without review.",
      "Submit final MP4 export (minimum 1080p, 60fps preferred) before the campaign deadline.",
    ],
  },
  {
    event: "Treasure Hunt",
    code: "TERRITORY_02 // CYPHER_SEARCH",
    items: [
      "Teams of 4–6 operatives. All members must report in person at the briefing zone at 11:00 AM.",
      "Digital computing devices permitted exclusively during designated cryptographic puzzle stages.",
      "Sharing coordinates, clue solutions, or strategies between teams results in immediate disqualification for both units.",
      "Strict compliance with campus safety directives and out-of-bounds tactical perimeters is mandatory.",
      "Decisions rendered by the Head Marshal and Judges are absolute and final.",
    ],
  },
  {
    event: "E-Sports",
    code: "TERRITORY_03 // ARENA_COMBAT",
    items: [
      "Squads of 4 players (+1 registered reserve). Substitutions must be logged 30 minutes before match time.",
      "Participants are advised to bring personal gaming peripherals (keyboards, mice, IEMs/headsets).",
      "Zero tolerance for third-party scripts, macros, exploits, or memory modification tools. Violation = permanent ban.",
      "The tournament bracket is strict and double-elimination. Unannounced forfeits are recorded after 10 minutes.",
      "Standard competitive esportsmanship and anti-toxicity guidelines enforced throughout.",
    ],
  },
  {
    event: "Prompt Wars",
    code: "TERRITORY_04 // NEURAL_ORCHESTRATION",
    items: [
      "Individual operative event. Strictly no external communication or squad assistance during live heats.",
      "All generation must occur inside the official isolated model terminal. No copy-pasting from external cheat-sheets.",
      "Three progressive rounds: Phase 1 (Text & Reasoning) → Phase 2 (Latent Image Prompting) → Phase 3 (Code & Constraint).",
      "Scoring focuses strictly on output alignment, constraint compliance, efficiency, and zero hallucination.",
      "Top contenders from Phase 2 advance to the live single-prompt championship showdown.",
    ],
  },
];

function Accordion({ rule }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-iron/25 bg-obsidian-raised/80 rounded-sm overflow-hidden transition-colors hover:border-iron/50">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-ember focus:ring-inset"
        aria-expanded={open}
      >
        <div>
          <span className="text-[10px] font-mono text-ion-blue block tracking-wider mb-0.5">
            {rule.code}
          </span>
          <span className="font-display font-bold text-parchment text-lg md:text-xl">
            {rule.event}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="p-1 rounded border border-iron/20 bg-obsidian"
        >
          <Plus size={18} className="text-ember" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="c"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-iron/20 px-6 pt-4 pb-6 bg-obsidian/40">
              <ul className="space-y-2.5">
                {rule.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-iron font-body text-xs md:text-sm leading-relaxed">
                    <span className="text-ember font-mono mt-0.5 font-bold">//</span>
                    <span className="text-parchment/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RulesRegistration() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="rules" className="py-24 px-6 md:px-16 lg:px-24 relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-ion-blue">
          <ShieldCheck size={14} />
          <span>CAMPAIGN PROTOCOLS &amp; DIRECTIVES</span>
        </div>
        <motion.h2
          ref={ref}
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{ duration: 0.7 }}
          className="font-display font-bold text-parchment text-4xl md:text-5xl mb-4"
        >
          Rules &amp; Registration
        </motion.h2>
        <p className="text-iron font-body mb-10 max-w-lg text-sm md:text-base">
          Every territory is governed by strict technical directives. Review the protocols carefully before locking in your deployment.
        </p>

        {/* Accordions */}
        <div className="space-y-3 mb-16">
          {rules.map((r) => (
            <Accordion key={r.event} rule={r} />
          ))}
        </div>

        {/* 3D Tilt Registration Box */}
        <TiltCard glowColor="#FF6A3D" maxTilt={6}>
          <div
            id="register"
            className="border border-ember/50 bg-gradient-to-br from-obsidian-raised via-obsidian to-obsidian-raised p-8 md:p-12 rounded-sm hud-corner shadow-[0_20px_50px_-15px_rgba(255,106,61,0.25)] relative"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-ember/10 border border-ember/30 text-ember font-mono text-xs mb-3 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
                  <span>OFFICIAL PORTAL READY</span>
                </div>
                <h3 className="font-display font-bold text-parchment text-2xl md:text-3xl mb-2">
                  Ready to claim your territory?
                </h3>
                <p className="text-iron font-body text-sm max-w-md leading-relaxed">
                  Official team and individual registrations are live on Konfhub. Lock your slots across all 4 territories.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                <a
                  href="https://konfhub.com/ai-conquest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ember-pulse flex items-center justify-center gap-2 bg-ember text-obsidian font-bold font-body px-8 py-4 rounded-sm hover:bg-parchment transition-all duration-200 shadow-xl text-center"
                >
                  <span>Register on Konfhub</span>
                  <ExternalLink size={18} />
                </a>
                <a
                  href="#coordinators"
                  className="flex items-center justify-center gap-2 border border-iron/40 text-parchment font-body font-medium px-6 py-3 rounded-sm hover:border-parchment transition-colors text-xs md:text-sm text-center"
                >
                  <span>Contact Coordinators</span>
                </a>
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
