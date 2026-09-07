import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, Users, ShieldAlert } from "lucide-react";
import TiltCard from "./TiltCard";

const coordinators = [
  {
    name: "Dr. S. Madhu",
    role: "Head of Department, CSE & AI/ML",
    type: "hod",
    phone: "[FILL IN]",
    email: "[FILL IN]",
    badge: "EXECUTIVE DIRECTOR",
    color: "#FF6A3D",
  },
  {
    name: "[FILL IN]",
    role: "AI Reels Territory Lead",
    type: "coordinator",
    phone: "[FILL IN]",
    email: "[FILL IN]",
    badge: "TERRITORY I LEAD",
    color: "#FF6A3D",
  },
  {
    name: "[FILL IN]",
    role: "Treasure Hunt Territory Lead",
    type: "coordinator",
    phone: "[FILL IN]",
    email: "[FILL IN]",
    badge: "TERRITORY II LEAD",
    color: "#5EE0FF",
  },
  {
    name: "[FILL IN]",
    role: "E-Sports Territory Lead",
    type: "coordinator",
    phone: "[FILL IN]",
    email: "[FILL IN]",
    badge: "TERRITORY III LEAD",
    color: "#FF6A3D",
  },
  {
    name: "[FILL IN]",
    role: "Prompt Wars Territory Lead",
    type: "coordinator",
    phone: "[FILL IN]",
    email: "[FILL IN]",
    badge: "TERRITORY IV LEAD",
    color: "#5EE0FF",
  },
];

export default function Coordinators() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="coordinators" className="py-24 px-6 md:px-16 lg:px-24 bg-obsidian-raised/40 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-ion-blue">
              <Users size={14} />
              <span>COMMAND PERSONNEL &amp; MARSHALS</span>
            </div>
            <motion.h2
              ref={ref}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 0.7 }}
              className="font-display font-bold text-parchment text-4xl md:text-5xl"
            >
              Coordinators
            </motion.h2>
          </div>
          <p className="text-iron font-body text-sm md:text-base max-w-md">
            Direct operational contact points for each territory. Reach out for squad questions, rules clarification, or logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coordinators.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`h-full ${c.type === "hod" ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <TiltCard glowColor={c.color} maxTilt={8} className="h-full">
                <div
                  className={`border border-iron/25 bg-obsidian-raised p-6 h-full rounded-sm hud-corner flex flex-col justify-between ${
                    c.type === "hod" ? "border-ember/60 shadow-[0_0_25px_rgba(255,106,61,0.15)]" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded border"
                        style={{
                          color: c.color,
                          borderColor: c.color + "44",
                          backgroundColor: c.color + "11",
                        }}
                      >
                        {c.badge}
                      </span>
                      {c.type === "hod" && (
                        <span className="w-2 h-2 rounded-full bg-ember animate-ping" />
                      )}
                    </div>
                    <h3 className="font-display font-bold text-parchment text-xl mb-1">
                      {c.name}
                    </h3>
                    <p className="text-iron text-xs font-mono mb-6">{c.role}</p>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-iron/15 text-xs font-mono">
                    <a
                      href={`tel:${c.phone}`}
                      className="flex items-center gap-2 text-iron hover:text-parchment transition-colors"
                    >
                      <Phone size={13} className="text-ember shrink-0" />
                      <span>{c.phone}</span>
                    </a>
                    <a
                      href={`mailto:${c.email}`}
                      className="flex items-center gap-2 text-iron hover:text-parchment transition-colors truncate"
                    >
                      <Mail size={13} className="text-ion-blue shrink-0" />
                      <span className="truncate">{c.email}</span>
                    </a>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
