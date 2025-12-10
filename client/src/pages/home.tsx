import React from "react";
import { Link } from "wouter";
import { Wallet } from "lucide-react";
import logoImage from "@assets/1b6b08c2244019f727791915b0c3fb41385d1c9b9769daea763eb6276f1b5_1765335205229.jpeg";
import { CyberGrid } from "@/components/cyber-grid";
import {
  HeroSection,
  AgentConsole,
  SystemArchitectureSection,
  ApiTestSection,
  Footer,
} from "@/components/landing";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-sky-500/20 bg-slate-950/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex h-14 items-center justify-between px-6">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <img 
              src={logoImage} 
              alt="Username DAO" 
              className="h-8 w-8 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-mono text-sm font-bold tracking-tight group-hover:text-sky-400 transition-colors">
              USERNAME_DAO
            </span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs">
          <Link href="/" data-testid="link-nav-home" className="text-sky-400">HOME</Link>
          <Link href="/profile" data-testid="link-nav-profile" className="text-slate-300 hover:text-sky-400 transition">PROFILE</Link>
          <Link href="/explorer" data-testid="link-nav-explorer" className="text-slate-300 hover:text-sky-400 transition">EXPLORER</Link>
          <Link href="/api-test" data-testid="link-nav-api-test" className="text-slate-300 hover:text-sky-400 transition">API_TEST</Link>
        </nav>
        
        <button 
          data-testid="button-connect-wallet"
          className="inline-flex items-center gap-2 rounded-md border border-sky-400 bg-sky-950/70 px-4 py-2 text-xs font-semibold text-sky-200 hover:bg-sky-900/70 transition"
        >
          <Wallet className="h-3 w-3" />
          CONNECT
        </button>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CyberGrid />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_90%)]" />
      </div>
      
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <AgentConsole />
        <SystemArchitectureSection />
        <ApiTestSection />
        <Footer />
      </div>
    </div>
  );
}
