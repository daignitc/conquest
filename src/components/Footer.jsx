import React from "react";
import { ExternalLink } from "lucide-react";

// Inline SVG social icons
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-iron/20 px-6 md:px-16 lg:px-24 py-16 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-1 rounded border border-iron/30 bg-obsidian-raised">
              <img src={`${import.meta.env.BASE_URL}GNI.png`} alt="GNI Logo" className="h-10 w-auto object-contain" />
            </div>
            <div>
              <span className="font-display font-bold text-parchment text-lg tracking-tight block">
                AI CONQUEST 2026
              </span>
              <span className="text-[10px] text-ion-blue font-mono tracking-widest block uppercase">
                GURU NANAK INSTITUTIONS
              </span>
            </div>
          </div>
          <p className="text-iron text-sm font-body leading-relaxed max-w-sm mb-4">
            Department of Computer Science &amp; Engineering and AI/ML.
            A 48-hour inter-collegiate AI campaign map designed to crown the ultimate technical champions.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-ember/30 bg-ember/5 text-xs font-mono text-ember">
            <span>REGISTER ONLINE:</span>
            <a
              href="https://konfhub.com/ai-conquest"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold hover:text-parchment transition-colors"
            >
              konfhub.com/ai-conquest
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-display font-bold text-parchment mb-4 text-sm uppercase tracking-wider font-mono">
            Navigation
          </h4>
          <ul className="space-y-2">
            {[
              { label: "About Event", href: "#about" },
              { label: "The 4 Territories", href: "#events" },
              { label: "Key Takeaways", href: "#takeaways" },
              { label: "Timeline", href: "#timeline" },
              { label: "Rules & Guidelines", href: "#rules" },
              { label: "Prizes", href: "#prizes" },
              { label: "Coordinators", href: "#coordinators" },
              { label: "FAQ", href: "#faq" },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-iron text-sm font-body hover:text-parchment transition-colors focus:outline-none focus:text-ember"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials & Registration Link */}
        <div>
          <h4 className="font-display font-bold text-parchment mb-4 text-sm uppercase tracking-wider font-mono">
            Direct Access
          </h4>
          <a
            href="https://konfhub.com/ai-conquest"
            target="_blank"
            rel="noopener noreferrer"
            className="ember-pulse flex items-center justify-center gap-2 bg-ember text-obsidian font-bold text-xs px-4 py-3 rounded-sm hover:bg-parchment transition-colors mb-6 shadow-md"
          >
            <span>Register on Konfhub</span>
            <ExternalLink size={14} />
          </a>

          <div className="flex gap-4 mb-4">
            <a
              href="#"
              aria-label="Instagram"
              className="p-2 rounded border border-iron/20 text-iron hover:text-ember hover:border-ember/40 transition-colors"
            >
              <InstagramIcon />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="p-2 rounded border border-iron/20 text-iron hover:text-ember hover:border-ember/40 transition-colors"
            >
              <YoutubeIcon />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="p-2 rounded border border-iron/20 text-iron hover:text-ember hover:border-ember/40 transition-colors"
            >
              <LinkedinIcon />
            </a>
          </div>
          <p className="text-iron text-xs font-mono">
            Campus HQ: Ibrahimpatnam, Hyderabad, Telangana 501506
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-iron/15 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-iron text-xs font-mono">
          © 2026 AI Conquest — Guru Nanak Institutions (GNI). All rights reserved.
        </p>
        <p className="text-iron text-xs font-mono">
          Chief Mentor: <span className="text-parchment">Dr. S. Madhu</span>, HOD CSE &amp; AI/ML
        </p>
      </div>
    </footer>
  );
}
