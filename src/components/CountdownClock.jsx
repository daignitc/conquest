import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, ExternalLink, Bell } from "lucide-react";
import { playClickSound, playHoverSound } from "../utils/audio";

const EVENT_START = new Date("2026-10-13T09:00:00+05:30").getTime();

// Google Calendar link generator for AI Conquest 2026
const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
  "AI Conquest 2026 — Guru Nanak Institutions"
)}&dates=20261013T033000Z/20261014T123000Z&details=${encodeURIComponent(
  "AI Conquest 2026: 4 Territories (AI Reels, Treasure Hunt, E-Sports, Prompt Wars). Organized by Dept of AIML, IoT, AI&DS at Guru Nanak Institutions Technical Campus (GNITC). Register: https://konfhub.com/ai-conquest"
)}&location=${encodeURIComponent(
  "Guru Nanak Institutions Technical Campus (GNITC), Ibrahimpatnam, Hyderabad, Telangana 501506"
)}`;

function TimeUnit({ value, label, color = "#FF6A3D" }) {
  const formatted = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative px-3 sm:px-5 py-3 sm:py-4 rounded-sm border border-iron/25 bg-obsidian-raised/90 backdrop-blur-md hud-corner flex items-center justify-center min-w-[65px] sm:min-w-[85px] shadow-lg"
        style={{
          borderTopColor: color,
          borderTopWidth: 2,
        }}
      >
        <span
          className="font-mono font-bold text-2xl sm:text-4xl text-parchment tracking-tight drop-shadow-[0_0_15px_rgba(255,106,61,0.3)]"
        >
          {formatted}
        </span>
      </div>
      <span className="font-mono text-[10px] sm:text-xs text-iron uppercase tracking-widest mt-2">
        {label}
      </span>
    </div>
  );
}

export default function CountdownClock() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime();
      const difference = EVENT_START - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative py-8 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto border border-iron/25 bg-obsidian-raised/80 backdrop-blur-xl p-6 sm:p-8 rounded-sm hud-corner shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 pb-6 border-b border-iron/20">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-ember mb-1 font-bold">
              <Clock size={14} className="animate-spin-slow" />
              <span>T-MINUS COUNTDOWN // DEPLOYMENT ZERO</span>
            </div>
            <h3 className="font-display font-bold text-parchment text-xl sm:text-2xl tracking-tight">
              Campaign Launch Clock
            </h3>
          </div>

          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm border border-ion-blue/40 bg-ion-blue/10 hover:bg-ion-blue/20 text-ion-blue font-mono text-xs font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-ion-blue"
          >
            <Calendar size={14} />
            <span>Add to Calendar (Oct 13-14)</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Counter Units */}
        <div className="flex items-center justify-center gap-2 sm:gap-6">
          <TimeUnit value={timeLeft.days} label="Days" color="#FF6A3D" />
          <span className="font-mono text-xl sm:text-2xl text-iron/60 self-center -mt-5 font-bold">:</span>
          <TimeUnit value={timeLeft.hours} label="Hours" color="#5EE0FF" />
          <span className="font-mono text-xl sm:text-2xl text-iron/60 self-center -mt-5 font-bold">:</span>
          <TimeUnit value={timeLeft.minutes} label="Minutes" color="#FF6A3D" />
          <span className="font-mono text-xl sm:text-2xl text-iron/60 self-center -mt-5 font-bold">:</span>
          <TimeUnit value={timeLeft.seconds} label="Seconds" color="#5EE0FF" />
        </div>
      </div>
    </div>
  );
}
