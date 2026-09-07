import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Award, Medal, Sparkles, ExternalLink } from "lucide-react";
import TiltCard from "./TiltCard";

const prizes = [
  {
    event: "AI Reels",
    code: "TERRITORY I",
    color: "#FF6A3D",
    tiers: [
      { place: "1st Place (Gold)", reward: "₹[TBD] Cash + Shield", icon: Trophy },
      { place: "2nd Place (Silver)", reward: "₹[TBD] Cash + Certificate", icon: Medal },
      { place: "3rd Place (Bronze)", reward: "Certificate of Merit", icon: Award },
    ],
  },
  {
    event: "Treasure Hunt",
    code: "TERRITORY II",
    color: "#5EE0FF",
    tiers: [
      { place: "1st Place (Gold)", reward: "₹[TBD] Cash + Shield", icon: Trophy },
      { place: "2nd Place (Silver)", reward: "₹[TBD] Cash + Certificate", icon: Medal },
      { place: "3rd Place (Bronze)", reward: "Certificate of Merit", icon: Award },
    ],
  },
  {
    event: "E-Sports",
    code: "TERRITORY III",
    color: "#FF6A3D",
    tiers: [
      { place: "Champions (Squad)", reward: "₹[TBD] Cash + Grand Trophy", icon: Trophy },
      { place: "Runners-up", reward: "₹[TBD] Cash + Trophy", icon: Medal },
      { place: "3rd Place", reward: "Certificate of Merit", icon: Award },
    ],
  },
  {
    event: "Prompt Wars",
    code: "TERRITORY IV",
    color: "#5EE0FF",
    tiers: [
      { place: "1st Place (Gold)", reward: "₹[TBD] Cash + Shield", icon: Trophy },
      { place: "2nd Place (Silver)", reward: "₹[TBD] Cash + Certificate", icon: Medal },
      { place: "3rd Place (Bronze)", reward: "Certificate of Merit", icon: Award },
    ],
  },
];

export default function Prizes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="prizes" className="py-24 px-6 md:px-16 lg:px-24 bg-transparent relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-ember">
              <Sparkles size={14} />
              <span>BOUNTY MATRIX // HONORS</span>
            </div>
            <motion.h2
              ref={ref}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 0.7 }}
              className="font-display font-bold text-parchment text-4xl md:text-5xl"
            >
              Prize Structure
            </motion.h2>
          </div>
          <p className="text-iron font-body text-sm md:text-base max-w-md">
            Glory, cash pools, and prestigious institutional merit citations across all four combat territories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {prizes.map((p, pi) => (
            <motion.div
              key={p.event}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: pi * 0.1, duration: 0.5 }}
              className="h-full"
            >
              <TiltCard glowColor={p.color} maxTilt={9} className="h-full">
                <div
                  className="border border-iron/25 bg-obsidian p-6 h-full rounded-sm hud-corner flex flex-col justify-between"
                  style={{ borderTopColor: p.color, borderTopWidth: 2 }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono text-iron">{p.code}</span>
                      <Trophy size={16} style={{ color: p.color }} />
                    </div>
                    <h3 className="font-display font-bold text-parchment text-xl mb-5">
                      {p.event}
                    </h3>
                    <div className="space-y-4">
                      {p.tiers.map((t, ti) => {
                        const IconComponent = t.icon;
                        return (
                          <div key={t.place} className="border-b border-iron/15 pb-2.5 last:border-0">
                            <div className="flex items-center gap-1.5 text-iron text-[11px] font-mono mb-1">
                              <IconComponent size={13} style={{ color: p.color }} />
                              <span>{t.place}</span>
                            </div>
                            <div className="text-parchment font-body font-semibold text-sm">
                              {t.reward}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-iron/15">
                    <a
                      href="https://konfhub.com/ai-conquest"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-iron hover:text-ember flex items-center justify-between transition-colors"
                    >
                      <span>COMPETE FOR PRIZE</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="p-4 border border-iron/20 bg-obsidian/60 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-iron">
          <div>
            <span className="text-parchment font-bold">CERTIFICATE OF PARTICIPATION:</span> Issued to all verified participants from registered colleges.
          </div>
          <a
            href="https://konfhub.com/ai-conquest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ember hover:text-parchment font-semibold flex items-center gap-1 shrink-0"
          >
            <span>REGISTER ON KONFHUB</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
