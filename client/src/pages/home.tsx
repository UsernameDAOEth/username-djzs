import React from "react";
import { CyberGrid } from "@/components/cyber-grid";
import { Navigation } from "@/components/navigation";
import {
  HeroSection,
  AgentConsole,
  SystemArchitectureSection,
  ApiTestSection,
  Footer,
} from "@/components/landing";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CyberGrid />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_90%)]" />
      </div>
      
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <AgentConsole />
        <SystemArchitectureSection />
        <ApiTestSection />
        <Footer />
      </div>
    </div>
  );
}
