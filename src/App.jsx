import React from "react";
import BackgroundScene3D from "./components/BackgroundScene3D";
import CursorGlow from "./components/CursorGlow";
import FloatingCommandBar from "./components/FloatingCommandBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CountdownClock from "./components/CountdownClock";
import Marquee from "./components/Marquee";
import About from "./components/About";
import CampusRadarMap from "./components/CampusRadarMap";
import Events from "./components/Events";
import KeyTakeaways from "./components/KeyTakeaways";
import Timeline from "./components/Timeline";
import RulesRegistration from "./components/RulesRegistration";
import Prizes from "./components/Prizes";
import Coordinators from "./components/Coordinators";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen selection:bg-ember selection:text-obsidian overflow-x-hidden">
      {/* Persistent Fixed 3D World in Background */}
      <BackgroundScene3D />

      {/* Ambient Mouse Glow Spotlight */}
      <CursorGlow />

      {/* Foreground Scrollable Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <CountdownClock />
        <Marquee />
        <About />
        <CampusRadarMap />
        <Events />
        <KeyTakeaways />
        <Timeline />
        <RulesRegistration />
        <Prizes />
        <Coordinators />
        <FAQ />
        <Footer />
      </div>

      {/* Sticky Bottom Quick-Access Floating Bar */}
      <FloatingCommandBar />
    </div>
  );
}
