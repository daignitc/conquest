import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, HelpCircle, ExternalLink, Search, X } from "lucide-react";
import { playClickSound, playHoverSound } from "../utils/audio";

const faqs = [
  {
    q: "Where do I register for AI Conquest 2026?",
    a: "Official registration is hosted on Konfhub at https://konfhub.com/ai-conquest. You can register your team for AI Reels, Treasure Hunt, E-Sports, or sign up individually for Prompt Wars.",
    hasLink: true,
  },
  {
    q: "Who is eligible to participate?",
    a: "AI Conquest 2026 is open to all currently enrolled undergraduate and postgraduate students from accredited colleges and universities across India. A valid college ID card is required during check-in on Day 1.",
  },
  {
    q: "Can I register for multiple territories/events?",
    a: "Yes, you can register for multiple events provided their schedule tracks do not clash. Consult the Campaign Timeline before locking in multiple territory commitments.",
  },
  {
    q: "What AI tools are allowed for AI Reels and Prompt Wars?",
    a: "For AI Reels, any generative video and audio synthesis toolchain is permitted (Runway Gen-2/3, Pika, Midjourney, ElevenLabs, etc.) with declaration. For Prompt Wars, all contestants operate within the official sandboxed interface provided on-site.",
  },
  {
    q: "Are team compositions flexible across colleges?",
    a: "Inter-college teams are allowed for designated events, as long as all participating members provide valid institutional verification during registration.",
  },
  {
    q: "What awards and certificates will be distributed?",
    a: "Cash prize pools, trophies, and commemorative shields are awarded to top finishers at the Valedictory ceremony on October 14. All verified participants receive official participation certificates backed by the GNI Department of AIML, IoT, and AI&DS.",
  },
  {
    q: "Will accommodation and food be provided for outstation participants?",
    a: "Campus cafeteria and dining zones will be active throughout both days. Outstation attendees are requested to coordinate with our student marshals or arrange accommodation at nearby guest lodges.",
  },
  {
    q: "What are the laptop and hardware requirements?",
    a: "For Prompt Wars, designated desktop workstations are provided in Computing Center A. For AI Reels and E-Sports, participants are encouraged to bring personal laptops and gaming peripherals (mice/keyboards/headsets).",
  },
];

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
    playClickSound();
  };

  return (
    <div className="border border-iron/25 bg-obsidian-raised/80 rounded-sm overflow-hidden transition-colors hover:border-iron/40">
      <button
        onClick={toggle}
        onMouseEnter={playHoverSound}
        className="w-full flex items-start justify-between px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-ember focus:ring-inset gap-4"
        aria-expanded={open}
      >
        <span className="font-body font-medium text-parchment text-base">
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 mt-0.5 p-1 rounded border border-iron/20 bg-obsidian"
        >
          <Plus size={16} className="text-ember" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-1 border-t border-iron/15 bg-obsidian/40">
              <p className="text-iron font-body text-sm leading-relaxed mb-2">
                {item.a}
              </p>
              {item.hasLink && (
                <a
                  href="https://konfhub.com/ai-conquest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-ember font-mono text-xs hover:text-parchment transition-colors font-bold mt-1"
                >
                  <span>Go to Konfhub Registration Page</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [search, setSearch] = useState("");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 px-6 md:px-16 lg:px-24 bg-transparent relative">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs text-ion-blue">
          <HelpCircle size={14} />
          <span>INTEL &amp; FREQUENTLY ASKED QUESTIONS</span>
        </div>
        <motion.h2
          ref={ref}
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{ duration: 0.7 }}
          className="font-display font-bold text-parchment text-4xl md:text-5xl mb-8"
        >
          Frequently Asked Questions
        </motion.h2>

        {/* Real-time Search Input */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-iron pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search intel (e.g. eligibility, registration, tools, food, prizes)..."
            className="w-full bg-obsidian-raised/80 border border-iron/30 rounded-sm pl-11 pr-10 py-3.5 text-sm text-parchment font-body placeholder:text-iron focus:outline-none focus:border-ember focus:ring-1 focus:ring-ember transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-iron hover:text-parchment p-1"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* List */}
        <div className="space-y-3">
          {filtered.length > 0 ? (
            filtered.map((f, i) => <FAQItem key={i} item={f} />)
          ) : (
            <div className="text-center py-12 border border-iron/20 bg-obsidian-raised/60 rounded-sm">
              <p className="text-iron font-body text-sm mb-3">
                No matching briefings found for "{search}".
              </p>
              <button
                onClick={() => setSearch("")}
                className="px-4 py-2 rounded-sm border border-ember text-ember font-mono text-xs hover:bg-ember hover:text-obsidian transition-colors"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
