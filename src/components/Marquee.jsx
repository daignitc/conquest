import React from "react";
import { motion } from "framer-motion";

const items = [
  "AI Reels","*","Treasure Hunt","*","E-Sports","*","Prompt Wars","*",
  "13-14 October 2026","*","AI Conquest 2026","*","GNI CSE & AI/ML","*",
];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden bg-obsidian-raised border-y border-iron/20 py-4">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span key={i} className={`text-sm font-body font-medium ${item === "*" ? "text-ember" : "text-iron"}`}>
            {item === "*" ? "✦" : item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
