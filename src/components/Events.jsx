import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ExternalLink, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import EventIcon3D from "./EventIcon3D";
import TiltCard from "./TiltCard";

const events = [
  {
    id: "ai-reels",
    title: "AI Reels",
    territory: "Territory I",
    color: "#FF6A3D",
    tagline: "Lights, Prompts, Action.",
    takeaway: "Creativity, AI skills, video editing, and audience engagement.",
    short: "Create a 60-90s AI-generated reel judged on creativity, AI integration, and narrative impact.",
    details: {
      Format: "Teams of 2-3 members",
      Duration: "60-90 seconds",
      Judging: "Creativity 40%, AI Integration 30%, Narrative 30%",
      Tools: "Any AI video/image generation tool (Runway, Pika, Sora, Midjourney, etc.)",
      Submission: "MP4 min 1080p",
    },
  },
  {
    id: "treasure-hunt",
    title: "Treasure Hunt",
    territory: "Territory II",
    color: "#5EE0FF",
    tagline: "The clues are coded. The map is encrypted.",
    takeaway: "Teamwork, logical thinking, problem-solving, and quick decision-making.",
    short: "Multi-stage AI-themed hunt across campus. Decode clues, solve AI puzzles, race to the treasure.",
    details: {
      Format: "Teams of 4-6 members",
      Venue: "GNI Campus — multiple zones",
      Rounds: "5 checkpoints + final showdown",
      Clues: "Each checkpoint involves an AI reasoning puzzle or prompt challenge",
    },
  },
  {
    id: "esports",
    title: "E-Sports",
    territory: "Territory III",
    color: "#FF6A3D",
    tagline: "The arena goes digital.",
    takeaway: "Strategy, teamwork, quick reflexes, and sportsmanship.",
    short: "Bracket-style gaming competition in featured titles. Solo and squad formats available.",
    details: {
      Games: "Featured competitive titles (BGMI, Valorant, etc.)",
      Format: "Double elimination bracket",
      "Team Size": "4 players per squad (+1 sub)",
      Prizes: "Per-title prize pool + trophies",
    },
  },
  {
    id: "prompt-wars",
    title: "Prompt Wars",
    territory: "Territory IV",
    color: "#5EE0FF",
    tagline: "Words are your weapon.",
    takeaway: "Prompt writing, creativity, AI interaction, and problem-solving.",
    short: "Head-to-head prompt engineering showdown. Best output wins. Zero tolerance for hardcoding.",
    details: {
      Format: "Individual — 3 elimination rounds",
      Rounds: "Text generation → Image prompt → Code generation",
      Tools: "Provided model interface only",
      Banned: "Pre-written libraries, API access, external tools",
    },
  },
];

function DetailPanel({ event, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 backdrop-blur-md"
      style={{ backgroundColor: "rgba(11,10,16,0.92)" }}
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-${event.id}`}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-obsidian-raised border rounded-sm overflow-y-auto max-h-[90vh] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] hud-corner"
        style={{ borderColor: event.color + "66" }}
      >
        <div className="p-8 md:p-10">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-6 right-6 text-iron hover:text-parchment p-1 border border-iron/20 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-ember"
          >
            <X size={22} />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded border border-iron/30 bg-obsidian text-iron uppercase">
              {event.territory}
            </span>
            <span className="text-xs font-mono" style={{ color: event.color }}>
              // PROTOCOL ACTIVE
            </span>
          </div>

          <h3 className="font-display font-bold mb-1 text-3xl md:text-4xl" style={{ color: event.color }}>
            {event.title}
          </h3>
          <p className="text-iron font-body italic mb-6 text-sm">{event.tagline}</p>

          {/* Key Takeaway Box */}
          <div
            className="p-4 rounded-sm border mb-6 bg-obsidian/70"
            style={{ borderColor: event.color + "44" }}
          >
            <div className="flex items-center gap-2 mb-1.5 font-mono text-xs font-bold" style={{ color: event.color }}>
              <Sparkles size={14} />
              <span>KEY TAKEAWAYS &amp; CAPABILITIES</span>
            </div>
            <p className="text-parchment font-body text-sm font-medium leading-relaxed">
              {event.takeaway}
            </p>
          </div>

          <p className="text-parchment/90 font-body leading-relaxed mb-6 text-sm md:text-base">
            {event.short}
          </p>

          <div className="space-y-2.5 border-t border-iron/20 pt-5 mb-8">
            {Object.entries(event.details).map(([k, v]) => (
              <div key={k} className="flex flex-col sm:flex-row sm:gap-4 text-xs md:text-sm">
                <span className="text-iron font-mono min-w-[120px] uppercase">{k}:</span>
                <span className="text-parchment font-body">{v}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href="https://konfhub.com/ai-conquest"
              target="_blank"
              rel="noopener noreferrer"
              className="ember-pulse flex items-center justify-center gap-2 bg-ember text-obsidian font-bold font-body px-8 py-3.5 rounded-sm hover:bg-parchment transition-all focus:outline-none focus:ring-2 focus:ring-ember shadow-lg text-center"
            >
              <span>Register on Konfhub for {event.title}</span>
              <ExternalLink size={16} />
            </a>
            <button
              onClick={onClose}
              className="px-5 py-3 border border-iron/40 text-iron hover:text-parchment hover:border-iron rounded-sm text-sm transition-colors"
            >
              Close Briefing
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function EventCard({ event, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <TiltCard
      glowColor={event.color}
      maxTilt={10}
      className="h-full"
    >
      <div
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative h-full flex flex-col justify-between border border-iron/25 bg-obsidian-raised/90 p-6 cursor-pointer rounded-sm hud-corner transition-all duration-300"
        style={{
          borderColor: hovered ? event.color + "99" : undefined,
          boxShadow: hovered ? `0 15px 35px -10px rgba(0,0,0,0.8), 0 0 20px ${event.color}25` : undefined,
        }}
        role="button"
        tabIndex={0}
        aria-label={`Open ${event.title} details`}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
      >
        <div>
          {/* Header row */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-obsidian border border-iron/25 text-iron uppercase tracking-wider">
              {event.territory}
            </span>
            <div className="h-14 w-14 flex items-center justify-center">
              <EventIcon3D type={event.id} color={event.color} />
            </div>
          </div>

          <h3 className="font-display font-bold text-parchment text-2xl mb-1 tracking-tight">
            {event.title}
          </h3>
          <p className="text-iron font-body text-xs italic mb-4">{event.tagline}</p>

          <p className="text-parchment/80 font-body text-xs leading-relaxed mb-4 line-clamp-2">
            {event.short}
          </p>
        </div>

        {/* Takeaway Highlight Badge */}
        <div className="pt-3 border-t border-iron/20 mt-auto">
          <div className="flex items-start gap-2 bg-obsidian/60 p-2.5 rounded border border-iron/15">
            <Sparkles size={13} className="text-ember shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider block text-ion-blue font-bold">
                KEY TAKEAWAY:
              </span>
              <span className="text-[11px] text-parchment/90 font-body leading-tight block">
                {event.takeaway}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-iron group-hover:text-parchment mt-3 pt-1">
            <span>FULL SPEC</span>
            <ChevronRight size={14} className="text-ember" />
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export default function Events() {
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="events" className="py-24 px-6 md:px-16 lg:px-24 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-ion-blue">
              <span className="w-1.5 h-1.5 rounded-full bg-ion-blue" />
              <span>THE BATTLEGROUND MATRIX</span>
            </div>
            <motion.h2
              ref={ref}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 0.7 }}
              className="font-display font-bold text-parchment text-4xl md:text-5xl"
            >
              The Four Territories
            </motion.h2>
          </div>
          <p className="text-iron font-body text-sm md:text-base max-w-md">
            Choose your proving ground. Each territory features interactive 3D command telemetry
            and distinct competency evaluation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((e) => (
            <div key={e.id} className="h-full">
              <EventCard event={e} onClick={() => setSelected(e)} />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <DetailPanel event={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
