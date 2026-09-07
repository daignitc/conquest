import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Crosshair, Radio, Sparkles } from "lucide-react";
import { playClickSound, playHoverSound } from "../utils/audio";

const zones = [
  {
    id: "auditorium",
    name: "Main Auditorium",
    code: "ZONE ALPHA // HQ",
    color: "#FF6A3D",
    coords: "17.5375° N, 78.3853° E",
    events: ["Opening Ceremony", "Valedictory & Awards", "AI Reels Grand Jury"],
    desc: "Primary command center and presentation hall. Houses the central stage and live audience broadcast.",
  },
  {
    id: "media-lab",
    name: "Media Production Lab 1",
    code: "ZONE BETA // SYNTHETIC",
    color: "#5EE0FF",
    coords: "Block A · Floor 2 · Room 204",
    events: ["AI Reels Submissions", "Audio-Visual Screening"],
    desc: "Equipped with high-performance editing workstations and neural video generation preview monitors.",
  },
  {
    id: "comp-center",
    name: "Computing Center A",
    code: "ZONE GAMMA // ORCHESTRATION",
    color: "#5EE0FF",
    coords: "Block B · Floor 1 · Room 112",
    events: ["Prompt Wars Phase 1 & 2", "Code Synthesis Challenge"],
    desc: "Isolated high-speed terminals with sandboxed model interfaces. Strict anti-tamper perimeter.",
  },
  {
    id: "esports-arena",
    name: "GNITC Esports Arena",
    code: "ZONE DELTA // ARENA",
    color: "#FF6A3D",
    coords: "Indoor Sports Complex · Zone 3",
    events: ["E-Sports Group Stage", "Double Elimination Brackets", "Grand Championship"],
    desc: "Tournament stage with dedicated gigabit LAN backbones, low-latency display arrays, and squad booths.",
  },
  {
    id: "campus-grounds",
    name: "Campus Grounds & Quadrangles",
    code: "ZONE EPSILON // CYPHER",
    color: "#5EE0FF",
    coords: "Campus Wide · 5 Designated Checkpoints",
    events: ["Treasure Hunt Clues", "Cryptographic Geocaching", "Physical QR Decryption"],
    desc: "Full campus roaming territory with encrypted waypoints, algorithmic clues, and marshall monitoring.",
  },
];

export default function CampusRadarMap() {
  const [selected, setSelected] = useState(zones[0]);

  return (
    <div className="py-12 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto border border-iron/25 bg-obsidian-raised/80 backdrop-blur-xl p-6 sm:p-10 rounded-sm hud-corner shadow-2xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-iron/20">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-ion-blue mb-1 font-bold">
              <Navigation size={14} className="text-ion-blue animate-pulse" />
              <span>GEOSPATIAL TELEMETRY // GNITC VENUE MAP</span>
            </div>
            <h3 className="font-display font-bold text-parchment text-2xl sm:text-3xl tracking-tight">
              Tactical Deployment Blueprint
            </h3>
          </div>
          <span className="text-xs font-mono text-iron border border-iron/20 px-3 py-1.5 rounded-sm bg-obsidian/60 self-start sm:self-auto">
            HQ: Guru Nanak Institutions Technical Campus
          </span>
        </div>

        {/* 2-Column Map Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Zone List Selector */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="font-mono text-[11px] text-iron uppercase tracking-wider block mb-2">
              SELECT COMBAT ZONE:
            </span>
            {zones.map((z) => {
              const isSelected = selected.id === z.id;
              return (
                <button
                  key={z.id}
                  onClick={() => {
                    setSelected(z);
                    playClickSound();
                  }}
                  onMouseEnter={playHoverSound}
                  className={`w-full text-left p-3.5 rounded-sm border transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? "border-ember bg-obsidian shadow-lg"
                      : "border-iron/20 bg-obsidian/40 hover:border-iron/40 hover:bg-obsidian/70"
                  }`}
                  style={{
                    borderLeftColor: z.color,
                    borderLeftWidth: 3,
                  }}
                >
                  <div>
                    <span className="text-[10px] font-mono tracking-wider block" style={{ color: z.color }}>
                      {z.code}
                    </span>
                    <span className="font-display font-bold text-parchment text-sm sm:text-base">
                      {z.name}
                    </span>
                  </div>
                  <Crosshair
                    size={16}
                    className={`transition-transform ${isSelected ? "text-ember scale-110" : "text-iron/40"}`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Blueprint Intel Card */}
          <div className="lg:col-span-7 border border-iron/25 bg-obsidian p-6 sm:p-8 rounded-sm hud-corner flex flex-col justify-between min-h-[340px] relative overflow-hidden">
            {/* Ambient Background Grid Pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: "linear-gradient(#5EE0FF 1px, transparent 1px), linear-gradient(90deg, #5EE0FF 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold tracking-wider" style={{ color: selected.color }}>
                  {selected.code}
                </span>
                <span className="text-[11px] font-mono text-iron flex items-center gap-1.5 bg-obsidian-raised px-2 py-0.5 rounded border border-iron/20">
                  <MapPin size={12} className="text-ember" />
                  <span>{selected.coords}</span>
                </span>
              </div>

              <h4 className="font-display font-bold text-parchment text-2xl sm:text-3xl mb-3">
                {selected.name}
              </h4>
              <p className="text-iron font-body text-sm leading-relaxed mb-6">
                {selected.desc}
              </p>

              <div className="border-t border-iron/15 pt-4">
                <span className="text-[10px] font-mono text-ion-blue uppercase tracking-wider block mb-2">
                  STAGED EVENTS &amp; SESSIONS:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selected.events.map((ev, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded bg-obsidian-raised border border-iron/20 font-mono text-xs text-parchment/90"
                    >
                      {ev}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-4 border-t border-iron/15 flex items-center justify-between text-[11px] font-mono text-iron">
              <span>STATUS: ACCESS CLEARED FOR PARTICIPANTS</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
