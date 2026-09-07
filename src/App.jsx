import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Events from './components/Events';
import KeyTakeaways from './components/KeyTakeaways';
import Timeline from './components/Timeline';
import RulesRegistration from './components/RulesRegistration';
import Prizes from './components/Prizes';
import Coordinators from './components/Coordinators';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-obsidian min-h-screen selection:bg-ember selection:text-obsidian">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Events />
      <KeyTakeaways />
      <Timeline />
      <RulesRegistration />
      <Prizes />
      <Coordinators />
      <FAQ />
      <Footer />
    </div>
  );
}
