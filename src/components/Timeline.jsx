import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock, ExternalLink } from "lucide-react";
import TiltCard from "./TiltCard";

const days = {
  1: [
    { time: "09:00 AM", event: "Operative Check-in & Badge Issuance", type: "logistics", zone: "HQ Registration Desk" },
    { time: "10:00 AM", event: "Grand Opening Ceremony & Keynote Briefing", type: "ceremony", zone: "Main Auditorium" },
    { time: "10:45 AM", event: "Territory I: AI Reels — Prompt Brief & Submissions Open", type: "event", zone: "Media Lab 1" },
    { time: "11:00 AM", event: "Territory II: Treasure Hunt — Clue Encryption & Deployment", type: "event", zone: "Campus Wide" },
    { time: "01:00 PM", event: "Tactical Lunch Break & Networking", type: "logistics", zone: "Food Court" },
    { time: "02:00 PM", event: "Territory II: Treasure Hunt — Final Decryption Checkpoint", type: "event", zone: "Zone Delta" },
    { time: "03:00 PM", event: "Territory III: E-Sports — Group Stage & Round 1 Brackets", type: "event", zone: "Esports Arena" },
    { time: "06:00 PM", event: "Day 1 Tactical Debrief & Live Leaderboard Update", type: "ceremony", zone: "Main Auditorium" },
  ],
  2: [
    { time: "09:30 AM", event: "Day 2 Operative Muster & Core Diagnostics", type: "logistics", zone: "HQ Desk" },
    { time: "10:00 AM", event: "Territory IV: Prompt Wars — Phase 1 & 2 Heats", type: "event", zone: "Computing Lab A" },
    { time: "11:30 AM", event: "Territory III: E-Sports — Quarterfinals & Semi-finals", type: "event", zone: "Esports Arena" },
    { time: "12:30 PM", event: "Territory I: AI Reels — Jury Screening & Scoring", type: "event", zone: "Seminar Hall" },
    { time: "01:00 PM", event: "Lunch Break", type: "logistics", zone: "Food Court" },
    { time: "02:00 PM", event: "Territory IV: Prompt Wars — Live Arena Finals", type: "event", zone: "Main Auditorium" },
    { time: "03:00 PM", event: "Territory III: E-Sports — Grand Championship Match", type: "event", zone: "Esports Arena" },
    { time: "04:30 PM", event: "Awards Ceremony, Valedictory & Closing Honors", type: "ceremony", zone: "Main Auditorium" },
  ],
};

const typeColor = {
  event: "#FF6A3D",
  ceremony: "#5EE0FF",
  logistics: "#6B6875",
};

export default function Timeline() {
  const [activeDay, setActiveDay] = useState(1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="timeline" className="py-24 px-6 md:px-16 lg:px-24 bg-obsidian relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-ion-blue">
              <Calendar size={14} />
              <span>ENGAGEMENT SCHEDULE // 48 HOURS</span>
            </div>
            <motion.h2
              ref={ref}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 0.7 }}
              className="font-display font-bold text-parchment text-4xl md:text-5xl"
            >
              Campaign Timeline
            </motion.h2>
          </div>

          {/* Day selection tabs */}
          <div className="flex gap-2 p-1 border border-iron/20 bg-obsidian-raised rounded-sm">
            {[1, 2].map((d) => (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                className={`font-mono text-xs px-5 py-2 rounded-sm transition-all focus:outline-none focus:ring-1 focus:ring-ember ${
                  activeDay === d
                    ? "bg-ember text-obsidian font-bold shadow-md"
                    : "text-iron hover:text-parchment"
                }`}
              >
                DAY {d} · {d === 1 ? "OCT 13" : "OCT 14"}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline body */}
        <div className="relative border-l border-iron/20 ml-3 sm:ml-4 space-y-6 pl-6 sm:pl-8 py-2">
          {days[activeDay].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="relative group"
            >
              {/* Timeline pin node */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-3.5 w-3.5 h-3.5 rounded-full border-2 border-obsidian transition-transform group-hover:scale-125"
                style={{
                  backgroundColor: typeColor[item.type],
                  boxShadow: `0 0 10px ${typeColor[item.type]}`,
                }}
              />

              <div className="p-4 rounded-sm border border-iron/20 bg-obsidian-raised/80 hover:border-iron/40 transition-colors hud-corner flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-semibold" style={{ color: typeColor[item.type] }}>
                    <Clock size={13} />
                    <span>{item.time}</span>
                  </div>
                  <span className="text-parchment font-body text-sm md:text-base font-medium">
                    {item.event}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-iron bg-obsidian px-2 py-0.5 rounded border border-iron/15 shrink-0 self-start sm:self-auto">
                  {item.zone}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-10 pt-6 border-t border-iron/15">
          <div className="flex gap-6">
            {Object.entries(typeColor).map(([k, v]) => (
              <div key={k} className="flex items-center gap-2 text-xs font-mono text-iron">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: v }} />
                <span className="uppercase">{k}</span>
              </div>
            ))}
          </div>

          <a
            href="https://konfhub.com/ai-conquest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-ember hover:text-parchment flex items-center gap-1.5 transition-colors font-semibold"
          >
            <span>REGISTER FOR TIMELINE SLOTS</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
