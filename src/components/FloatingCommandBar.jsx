import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Volume2, VolumeX, ShieldAlert, Compass, Calendar, Users } from "lucide-react";
import { toggleSound, isSoundEnabled, playClickSound, playHoverSound } from "../utils/audio";

export default function FloatingCommandBar() {
  const [visible, setVisible] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 380);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) playClickSound();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-3 py-2 rounded-full border border-iron/35 bg-obsidian-raised/90 backdrop-blur-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.9)] flex items-center gap-2 sm:gap-4 max-w-[95vw]"
        >
          {/* Status Badge */}
          <div className="hidden sm:flex items-center gap-2 pl-2 text-xs font-mono text-iron border-r border-iron/20 pr-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-parchment font-semibold">OCT 13–14</span>
          </div>

          {/* Quick Anchor Links */}
          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href="#events"
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
              className="p-2 sm:px-2.5 sm:py-1 rounded-full text-xs font-mono text-iron hover:text-parchment hover:bg-obsidian transition-colors flex items-center gap-1"
              title="Territories"
            >
              <Compass size={14} className="text-ion-blue" />
              <span className="hidden md:inline">Territories</span>
            </a>
            <a
              href="#timeline"
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
              className="p-2 sm:px-2.5 sm:py-1 rounded-full text-xs font-mono text-iron hover:text-parchment hover:bg-obsidian transition-colors flex items-center gap-1"
              title="Timeline"
            >
              <Calendar size={14} className="text-ember" />
              <span className="hidden md:inline">Timeline</span>
            </a>
            <a
              href="#committee"
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
              className="p-2 sm:px-2.5 sm:py-1 rounded-full text-xs font-mono text-iron hover:text-parchment hover:bg-obsidian transition-colors flex items-center gap-1"
              title="Committee"
            >
              <Users size={14} className="text-ion-blue" />
              <span className="hidden md:inline">Committee</span>
            </a>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className="p-2 rounded-full text-iron hover:text-parchment hover:bg-obsidian transition-colors focus:outline-none"
            aria-label={soundOn ? "Mute interface audio" : "Enable interface audio"}
            title={soundOn ? "Mute interface audio" : "Enable interface audio"}
          >
            {soundOn ? <Volume2 size={15} className="text-ion-blue" /> : <VolumeX size={15} />}
          </button>

          {/* Direct CTA */}
          <a
            href="https://konfhub.com/ai-conquest"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            className="ember-pulse flex items-center gap-1.5 bg-ember text-obsidian font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full hover:bg-parchment transition-all shadow-md font-body shrink-0"
          >
            <span>Register</span>
            <ExternalLink size={13} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
