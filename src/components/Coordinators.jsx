import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Crown,
  Award,
  Shield,
  Users,
  Compass,
  Megaphone,
  CalendarCheck,
  Cpu,
  Scale,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import TiltCard from "./TiltCard";

// 1. Patrons & Chairs
const apexLeadership = [
  {
    role: "Chief Patron",
    name: "Mr. Sardar Gagandeep Singh Kohli",
    designation: "Vice Chairman",
    institution: "Guru Nanak Institutions",
    color: "#FF6A3D",
    icon: Crown,
    badge: "CHIEF PATRON",
  },
  {
    role: "Patron",
    name: "Dr. H. S. Saini",
    designation: "Managing Director",
    institution: "Guru Nanak Institutions",
    color: "#5EE0FF",
    icon: Award,
    badge: "PATRON",
  },
  {
    role: "Chair",
    name: "Dr. S. Sreenatha Reddy",
    designation: "Director",
    institution: "Guru Nanak Institutions Technical Campus",
    color: "#FF6A3D",
    icon: Shield,
    badge: "CHAIR",
  },
  {
    role: "Co-Chair",
    name: "Dr. Rishi Sayal",
    designation: "Associate Director",
    institution: "Guru Nanak Institutions Technical Campus",
    color: "#5EE0FF",
    icon: Compass,
    badge: "CO-CHAIR",
  },
];

// 2. Steering, Convenor, Coordinators
const steeringMembers = [
  {
    name: "Dr. P. Parthasaradhy",
    role: "Joint Director",
    dept: "Guru Nanak Institutions Technical Campus",
  },
  {
    name: "Dr. S. V. Ranganayakulu",
    role: "R&D Dean",
    dept: "Guru Nanak Institutions Technical Campus",
  },
];

const convenor = {
  name: "Dr. S. Madhu",
  role: "HOD – AIML | IoT | AI&DS",
  dept: "Guru Nanak Institutions Technical Campus",
};

const eventCoordinators = [
  {
    name: "Dr. P. Pavan Kumar",
    role: "Asst. Professor",
    dept: "AIML",
  },
  {
    name: "Dr. A. Krishna",
    role: "Asst. Professor",
    dept: "IoT",
  },
];

// 3. Committees (Advisory is intentionally excluded per instruction)
const committees = {
  promotion: {
    title: "Promotion Committee",
    icon: Megaphone,
    color: "#FF6A3D",
    members: [
      { name: "Mrs. M. V. Anjana Devi", role: "Assoc. Prof", dept: "AIML" },
      { name: "Mr. A. Lakshmi Narayana", role: "Asst. Prof", dept: "AIML" },
      { name: "Mr. Suyash Agrawal", role: "Asst. Prof", dept: "IoT" },
      { name: "Mr. V. Kiranmai", role: "Asst. Prof", dept: "AIML" },
      { name: "Mr. B. Maria Joseph", role: "Asst. Prof", dept: "AIML" },
    ],
  },
  event_management: {
    title: "Event Management Committee",
    icon: CalendarCheck,
    color: "#5EE0FF",
    members: [
      { name: "Mr. M. Kumar", role: "Asst. Prof", dept: "IoT" },
      { name: "Mr. Ch. Murali Krishna", role: "Asst. Prof", dept: "AIML" },
      { name: "Mrs. B. Surekha", role: "Asst. Prof", dept: "IoTL" },
      { name: "Mr. Veeranjaneyulu", role: "Asst. Prof", dept: "IoT" },
      { name: "Mrs. P. Venkata Pratima", role: "Asst. Prof", dept: "AIML" },
      { name: "Mrs. Y. Shravani", role: "Asst. Prof", dept: "AIML" },
    ],
  },
  technical: {
    title: "Technical Committee",
    icon: Cpu,
    color: "#5EE0FF",
    members: [
      { name: "Mrs. Mary Teresa", role: "Asst. Prof", dept: "AIML" },
      { name: "Mr. Aadil Ahmad Dar", role: "Asst. Prof", dept: "AIML" },
      { name: "Mr. M. Reddi Durga Sree", role: "Asst. Prof", dept: "AI&DS" },
      { name: "Mrs. Aabida Farooq", role: "Asst. Prof", dept: "AIML" },
      { name: "Mrs. G. Swarnalatha", role: "Asst. Prof", dept: "AI&DS" },
      { name: "Mr. MD. Saleem Ahmed", role: "Asst. Prof", dept: "AIML" },
      { name: "Mr. Vinod", role: "Asst. Prof", dept: "AI&DS" },
      { name: "Mr. P. Shankar", role: "Asst. Prof", dept: "AIML" },
    ],
  },
  disciplinary: {
    title: "Disciplinary Committee",
    icon: Scale,
    color: "#FF6A3D",
    members: [
      { name: "Mr. P. Samba Shiva Rao", role: "Asst. Prof", dept: "AIML" },
      { name: "Mr. V. Narsimha", role: "Asst. Prof", dept: "AIML" },
      { name: "Mr. P. Jangaiah", role: "Asst. Prof", dept: "AIML" },
      { name: "Mrs. Sk. Munnisa", role: "Asst. Prof", dept: "AIML" },
      { name: "Mr. Aravind", role: "Asst. Prof", dept: "AIML" },
    ],
  },
};

export default function Coordinators() {
  const [activeTab, setActiveTab] = useState("all");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="committee"
      className="py-24 px-6 md:px-16 lg:px-24 bg-transparent relative overflow-hidden"
    >
      {/* Target anchor support for both #coordinators and #committee */}
      <span id="coordinators" className="absolute -top-24" />

      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-ember/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-ion-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-ember">
              <Sparkles size={14} />
              <span>COMMAND COUNCIL // GOVERNANCE &amp; ORGANIZING</span>
            </div>
            <motion.h2
              ref={ref}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 0.7 }}
              className="font-display font-bold text-parchment text-4xl md:text-5xl"
            >
              Leadership &amp; Committee
            </motion.h2>
          </div>
          <p className="text-iron font-body text-sm md:text-base max-w-md leading-relaxed">
            Guided by distinguished institutional leadership and faculty committees across
            AIML, IoT, and AI&amp;DS at Guru Nanak Institutions Technical Campus.
          </p>
        </div>

        {/* 1. APEX LEADERSHIP (Patrons & Chairs) */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6 font-mono text-xs text-ion-blue font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-ion-blue" />
            <span>PATRONS &amp; CHAIRS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {apexLeadership.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.badge}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + idx * 0.08, duration: 0.4 }}
                  className="h-full"
                >
                  <TiltCard glowColor={item.color} maxTilt={9} className="h-full">
                    <div
                      className="border border-iron/25 bg-obsidian-raised p-6 rounded-sm h-full flex flex-col justify-between hud-corner relative transition-all duration-300 hover:border-iron/60"
                      style={{
                        borderTopColor: item.color,
                        borderTopWidth: 2,
                        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.6)",
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded border"
                            style={{
                              color: item.color,
                              borderColor: item.color + "44",
                              backgroundColor: item.color + "11",
                            }}
                          >
                            {item.badge}
                          </span>
                          <IconComp size={18} style={{ color: item.color }} />
                        </div>

                        <h3 className="font-display font-bold text-parchment text-lg md:text-xl mb-1.5 leading-snug">
                          {item.name}
                        </h3>

                        <div className="text-ember font-body text-xs font-semibold mb-1">
                          {item.designation}
                        </div>
                      </div>

                      <div className="border-t border-iron/15 pt-3 mt-4 text-[11px] font-mono text-iron">
                        {item.institution}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 2. STEERING COMMITTEE, CONVENOR & COORDINATORS */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-6 font-mono text-xs text-ember font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-ember" />
            <span>STEERING COUNCIL, CONVENOR &amp; COORDINATORS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Steering Committee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="h-full"
            >
              <TiltCard glowColor="#5EE0FF" maxTilt={8} className="h-full">
                <div className="border border-iron/25 bg-obsidian-raised p-6 rounded-sm h-full flex flex-col justify-between hud-corner">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono font-bold text-ion-blue px-2 py-0.5 rounded border border-ion-blue/30 bg-ion-blue/10">
                        STEERING COMMITTEE
                      </span>
                      <Shield size={16} className="text-ion-blue" />
                    </div>

                    <div className="space-y-4">
                      {steeringMembers.map((member) => (
                        <div key={member.name} className="border-b border-iron/15 pb-3 last:border-0 last:pb-0">
                          <h4 className="font-display font-bold text-parchment text-base mb-0.5">
                            {member.name}
                          </h4>
                          <p className="text-ion-blue font-body text-xs font-medium">
                            {member.role}
                          </p>
                          <p className="text-iron font-mono text-[11px] mt-0.5">
                            {member.dept}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Convenor - Featured Center */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="h-full"
            >
              <TiltCard glowColor="#FF6A3D" maxTilt={8} className="h-full">
                <div className="border border-ember/60 bg-gradient-to-b from-obsidian-raised via-obsidian to-obsidian-raised p-6 rounded-sm h-full flex flex-col justify-between hud-corner shadow-[0_0_30px_rgba(255,106,61,0.2)]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono font-bold text-ember px-2.5 py-1 rounded border border-ember/40 bg-ember/15">
                        CONVENOR // LEAD CHIEF
                      </span>
                      <span className="w-2 h-2 rounded-full bg-ember animate-ping" />
                    </div>

                    <h4 className="font-display font-bold text-parchment text-xl md:text-2xl mb-1.5">
                      {convenor.name}
                    </h4>
                    <p className="text-ember font-body text-sm font-semibold mb-2">
                      {convenor.role}
                    </p>
                    <p className="text-iron font-body text-xs leading-relaxed mb-4">
                      {convenor.dept}
                    </p>
                  </div>

                  <div className="p-3 rounded bg-obsidian border border-iron/20 font-mono text-[11px] text-parchment/80">
                    Lead Orchestrator for AI Conquest 2026 across AIML, IoT, and AI&amp;DS.
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Coordinators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="h-full"
            >
              <TiltCard glowColor="#5EE0FF" maxTilt={8} className="h-full">
                <div className="border border-iron/25 bg-obsidian-raised p-6 rounded-sm h-full flex flex-col justify-between hud-corner">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono font-bold text-ion-blue px-2 py-0.5 rounded border border-ion-blue/30 bg-ion-blue/10">
                        COORDINATORS
                      </span>
                      <Users size={16} className="text-ion-blue" />
                    </div>

                    <div className="space-y-4">
                      {eventCoordinators.map((coordinator) => (
                        <div key={coordinator.name} className="border-b border-iron/15 pb-3 last:border-0 last:pb-0">
                          <h4 className="font-display font-bold text-parchment text-base mb-0.5">
                            {coordinator.name}
                          </h4>
                          <p className="text-ion-blue font-body text-xs font-medium">
                            {coordinator.role}, Department of {coordinator.dept}
                          </p>
                          <p className="text-iron font-mono text-[11px] mt-0.5">
                            Guru Nanak Institutions Technical Campus
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>

        {/* 3. ORGANIZING COMMITTEES MATRIX (Tabs & Interactive View) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-2 font-mono text-xs text-ion-blue font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-ion-blue" />
              <span>FACULTY ORGANIZING COMMITTEES</span>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1.5 p-1 border border-iron/20 bg-obsidian rounded-sm">
              <button
                onClick={() => setActiveTab("all")}
                className={`font-mono text-[11px] px-3 py-1.5 rounded-sm transition-all ${
                  activeTab === "all"
                    ? "bg-ember text-obsidian font-bold"
                    : "text-iron hover:text-parchment"
                }`}
              >
                All Committees
              </button>
              {Object.entries(committees).map(([key, comm]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`font-mono text-[11px] px-3 py-1.5 rounded-sm transition-all ${
                    activeTab === key
                      ? "bg-ember text-obsidian font-bold"
                      : "text-iron hover:text-parchment"
                  }`}
                >
                  {comm.title.replace(" Committee", "")} ({comm.members.length})
                </button>
              ))}
            </div>
          </div>

          {/* Committee Cards Display */}
          <div className="space-y-8">
            {Object.entries(committees)
              .filter(([key]) => activeTab === "all" || activeTab === key)
              .map(([key, comm]) => {
                const CommIcon = comm.icon;
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border border-iron/25 bg-obsidian-raised/80 p-6 rounded-sm hud-corner"
                  >
                    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-iron/20">
                      <div
                        className="p-2 rounded border"
                        style={{
                          borderColor: comm.color + "44",
                          backgroundColor: comm.color + "15",
                        }}
                      >
                        <CommIcon size={18} style={{ color: comm.color }} />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-parchment text-xl">
                          {comm.title}
                        </h3>
                        <span className="text-[11px] font-mono text-iron">
                          {comm.members.length} Assigned Faculty Members
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {comm.members.map((member, mi) => (
                        <div
                          key={mi}
                          className="p-3.5 rounded border border-iron/15 bg-obsidian/70 hover:border-iron/40 transition-colors"
                        >
                          <div className="font-body font-semibold text-parchment text-sm mb-1">
                            {member.name}
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-iron font-body">{member.role}</span>
                            <span
                              className="font-mono text-[10px] px-2 py-0.5 rounded border font-semibold"
                              style={{
                                color: comm.color,
                                borderColor: comm.color + "33",
                                backgroundColor: comm.color + "11",
                              }}
                            >
                              {member.dept}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
