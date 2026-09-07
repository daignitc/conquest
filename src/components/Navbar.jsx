import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ExternalLink, Volume2, VolumeX } from "lucide-react";
import { toggleSound, isSoundEnabled, playClickSound, playHoverSound } from "../utils/audio";

const links = [
  { label: "About", href: "#about" },
  { label: "Territories", href: "#events" },
  { label: "Takeaways", href: "#takeaways" },
  { label: "Timeline", href: "#timeline" },
  { label: "Prizes", href: "#prizes" },
  { label: "Committee", href: "#committee" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSoundToggle = () => {
    const active = toggleSound();
    setSoundOn(active);
    if (active) playClickSound();
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-3.5 transition-all duration-300 ${
        scrolled
          ? "bg-obsidian/90 backdrop-blur-md border-b border-iron/25 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
          : "bg-transparent"
      }`}
    >
      <a
        href="#"
        onClick={playClickSound}
        onMouseEnter={playHoverSound}
        className="flex items-center gap-3 group"
      >
        <div className="relative p-1 rounded-sm border border-iron/30 bg-obsidian-raised/80 group-hover:border-ember/60 transition-colors">
          <img src={`${import.meta.env.BASE_URL}GNI.png`} alt="GNI Logo" className="h-9 w-auto object-contain" />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-ember animate-ping" />
        </div>
        <div>
          <span className="font-display font-bold text-parchment text-lg tracking-tight block leading-tight">
            AI CONQUEST
          </span>
          <span className="text-[10px] text-ion-blue font-mono tracking-widest block uppercase">
            2026 // GNITC WAR-ROOM
          </span>
        </div>
      </a>

      {/* Center telemetry indicator */}
      <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-iron/20 bg-obsidian-raised/60 text-[11px] font-mono text-iron">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>REGISTRATION PROTOCOL ACTIVE</span>
        <span className="text-iron/40">•</span>
        <span className="text-parchment">OCT 13–14</span>
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            className="text-iron hover:text-parchment text-sm font-medium transition-colors duration-200 focus:outline-none focus:text-ember relative group"
          >
            {l.label}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-ember transition-all duration-300 group-hover:w-full" />
          </a>
        ))}

        {/* Audio Toggle */}
        <button
          onClick={handleSoundToggle}
          className="p-2 rounded border border-iron/20 text-iron hover:text-parchment hover:border-iron/40 transition-colors"
          title={soundOn ? "Mute interface audio" : "Enable interface audio"}
          aria-label={soundOn ? "Mute interface audio" : "Enable interface audio"}
        >
          {soundOn ? <Volume2 size={16} className="text-ion-blue" /> : <VolumeX size={16} />}
        </button>

        <a
          href="https://konfhub.com/ai-conquest"
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClickSound}
          onMouseEnter={playHoverSound}
          className="ember-pulse flex items-center gap-1.5 bg-ember text-obsidian font-bold text-sm px-5 py-2 rounded-sm hover:bg-parchment transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ember font-body shadow-[0_0_15px_rgba(255,106,61,0.5)]"
        >
          <span>Register Now</span>
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Mobile menu button */}
      <div className="flex md:hidden items-center gap-2">
        <button
          onClick={handleSoundToggle}
          className="p-2 rounded border border-iron/30 text-iron hover:text-parchment"
          title={soundOn ? "Mute interface audio" : "Enable interface audio"}
          aria-label={soundOn ? "Mute interface audio" : "Enable interface audio"}
        >
          {soundOn ? <Volume2 size={16} className="text-ion-blue" /> : <VolumeX size={16} />}
        </button>

        <button
          className="text-parchment p-2 border border-iron/30 rounded focus:outline-none focus:ring-2 focus:ring-ember"
          onClick={() => {
            setOpen(!open);
            playClickSound();
          }}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-obsidian-raised/95 backdrop-blur-xl border-b border-iron/20 flex flex-col gap-4 px-6 py-6 md:hidden shadow-2xl"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => {
                setOpen(false);
                playClickSound();
              }}
              className="text-parchment font-medium hover:text-ember transition-colors py-1 border-b border-iron/10"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://konfhub.com/ai-conquest"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              setOpen(false);
              playClickSound();
            }}
            className="flex items-center justify-center gap-2 bg-ember text-obsidian font-bold text-sm px-5 py-3 rounded-sm text-center shadow-lg"
          >
            <span>Register on Konfhub</span>
            <ExternalLink size={16} />
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
