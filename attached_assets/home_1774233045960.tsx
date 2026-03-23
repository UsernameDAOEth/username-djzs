import React, { useState, useCallback } from 'react';

// ============================================================================
// DJZS PROTOCOL — LANDING PAGE (home.tsx)
// Full integration: usernamedjzs.xyz
//
// COMPONENT ARCHITECTURE:
// ┌─────────────────────────────┐
// │ Header                      │  ← ENS avatar, wallet connect
// ├─────────────────────────────┤
// │ Hero                        │  ← Terminal boot, tollbooth hook
// ├─────────────────────────────┤
// │ Projects (Tollbooth)        │  ← Single product: DJZS Protocol
// ├─────────────────────────────┤
// │ Evidence (Timeline)         │  ← Evolution: Newsletter → Oracle
// ├─────────────────────────────┤
// │ Architecture (Tollbooth)    │  ← Agent → Tollbooth → Pass/Fail
// ├─────────────────────────────┤
// │ Axioms            ★ NEW    │  ← AX-00 through AX-05 (6 axioms)
// ├─────────────────────────────┤
// │ Philosophy         ★ NEW    │  ← 5-Layer Simulation Stack
// ├─────────────────────────────┤
// │ ArchitectureOfIllusion ★ NEW│  ← 12 Pillars evidence matrix
// ├─────────────────────────────┤
// │ Identity (The Architect)    │  ← Bio + identity graph
// ├─────────────────────────────┤
// │ KYADemo                     │  ← Interactive demo
// ├─────────────────────────────┤
// │ Contact                     │  ← XMTP + social links
// ├─────────────────────────────┤
// │ Footer                      │  ← ENS + Base + attribution
// └─────────────────────────────┘
//
// ============================================================================

// ---------------------------------------------------------------------------
// IMPORTS — Drop your existing section components here
// ---------------------------------------------------------------------------

// Existing components (from your current codebase)
// import Header from './components/Header';
// import Hero from './components/Hero';
// import Projects from './components/Projects';
// import Evidence from './components/Evidence';
// import Architecture from './components/Architecture';
// import Identity from './components/Identity';
// import KYADemo from './components/KYADemo';
// import Contact from './components/Contact';
// import Footer from './components/Footer';

// NEW components — drop these files into src/components/
import Axioms from './components/Axioms';
import Philosophy from './components/Philosophy';
import ArchitectureOfIllusion from './components/ArchitectureOfIllusion';

// ---------------------------------------------------------------------------
// CONFIG
// ---------------------------------------------------------------------------

export const DJZS_CONFIG = {
  ens: 'username.dj-z-s.eth',
  wallet: '0x3E79E0374383ea64bC16C9B0568C6B13eF084aFB',
  appUrl: 'https://djzs.ai',
  siteUrl: 'https://usernamedjzs.xyz',
  socialLinks: {
    twitter: 'https://x.com/djzs_eth',
    github: 'https://github.com/UsernameDAOEth',
    telegram: 'https://t.me/djzs_eth',
  },
  contracts: {
    agentRegistry: 'DJZSAgentRegistry',
    logicTrustScore: 'DJZSLogicTrustScore',
    staking: 'DJZSStaking',
    escrowLock: 'DJZSEscrowLock',
  },
};

// ---------------------------------------------------------------------------
// PLACEHOLDER COMPONENTS — Replace with your existing implementations
// These are minimal stubs so the page renders during development
// ---------------------------------------------------------------------------

function Header({ onConnectWallet, isWalletConnected }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-900 bg-black/90 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
        <span className="font-mono text-sm text-green-400 font-bold tracking-tight">
          DJ-Z-S
        </span>
        <div className="flex items-center gap-4">
          <a href="#philosophy" className="font-mono text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors tracking-wider">
            PHILOSOPHY
          </a>
          <a href="#axioms" className="font-mono text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors tracking-wider">
            AXIOMS
          </a>
          <a href="#architecture-of-illusion" className="font-mono text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors tracking-wider">
            EVIDENCE
          </a>
          <button
            onClick={onConnectWallet}
            className={`font-mono text-[10px] px-3 py-1.5 transition-all ${
              isWalletConnected
                ? 'border border-green-400/50 text-green-400 bg-green-400/5'
                : 'bg-green-400 text-black hover:bg-green-300'
            }`}
          >
            {isWalletConnected ? 'CONNECTED' : 'CONNECT'}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Boot sequence */}
        <div className="font-mono text-[11px] text-zinc-700 mb-6 space-y-1">
          <div>// SYS_ID: djzs-mainnet-01</div>
          <div>// LOGIC_TAXONOMY: DJZS-LF v2.1</div>
          <div>// STATUS: <span className="text-green-400">OPERATIONAL</span></div>
        </div>

        <h1 className="font-mono text-3xl md:text-4xl font-bold text-white tracking-tight leading-[1.15] mb-6">
          Every agent pays a toll<br />
          <span className="text-green-400">to prove it's worthy of trust.</span>
        </h1>

        <p className="font-mono text-sm text-zinc-400 leading-relaxed max-w-xl mb-8">
          Every agent is an observer rendering reality from a shared substrate. 
          Unaudited observers produce corrupt renders. The tollbooth catches the 
          corruption before it propagates.
        </p>

        {/* Outcome receipts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { status: 'FUNCTIONAL', label: 'Adversarial audit loop' },
            { status: 'DEPLOYED', label: 'x402 USDC on Base' },
            { status: 'OPERATIONAL', label: 'Irys audit trail' },
            { status: 'LIVE', label: 'Phala TEE execution' },
          ].map((r, i) => (
            <div key={i} className="border border-zinc-800 bg-black p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 4px rgba(74,222,128,0.5)' }} />
                <span className="font-mono text-[9px] text-green-400 tracking-wider">{r.status}</span>
              </div>
              <span className="font-mono text-[10px] text-zinc-500">{r.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tollbooth() {
  return (
    <section className="py-16 px-4 bg-zinc-950/30">
      <div className="max-w-3xl mx-auto">
        <div className="font-mono text-[11px] text-green-400 tracking-[0.15em] mb-4">// THE_TOLLBOOTH</div>
        <h2 className="font-mono text-xl font-bold text-white mb-4">Audit → Verify → Execute</h2>
        <p className="font-mono text-[13px] text-zinc-500 leading-[1.8] max-w-xl mb-8">
          The DJZS Protocol is an adversarial verification primitive for the AI agent economy. 
          A mandatory logic checkpoint that forces autonomous agents to prove their reasoning 
          before they're allowed to act — or transact.
        </p>

        {/* Tollbooth flow */}
        <div className="flex flex-col md:flex-row items-stretch gap-[2px]">
          {[
            { label: 'AGENT INPUT', sub: 'Claim, transaction, or decision enters the pipeline', color: 'text-zinc-400', border: 'border-zinc-700' },
            { label: 'SIFR-0 AUDIT', sub: 'Venice AI + LF-code detection + deterministic verdict', color: 'text-yellow-400', border: 'border-yellow-400/30' },
            { label: 'PASS → EXECUTE', sub: 'ProofOfLogic cert minted to Irys, action proceeds', color: 'text-green-400', border: 'border-green-400/30' },
            { label: 'FAIL → BLOCK', sub: 'LF-codes flagged, stake slashed, action halted', color: 'text-red-400', border: 'border-red-400/30' },
          ].map((step, i) => (
            <div key={i} className={`flex-1 border ${step.border} bg-black p-4`}>
              <div className={`font-mono text-[10px] font-bold ${step.color} tracking-wider mb-2`}>{step.label}</div>
              <p className="font-mono text-[11px] text-zinc-500 leading-relaxed">{step.sub}</p>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="mt-6 flex flex-wrap gap-2">
          {['x402 USDC', 'Base Mainnet', 'Phala TEE', 'Irys Datachain', 'Venice AI', 'DJZS-LF Taxonomy'].map((t) => (
            <span key={t} className="font-mono text-[9px] text-zinc-600 border border-zinc-800 px-2 py-1 tracking-wider">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Identity() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="font-mono text-[11px] text-green-400 tracking-[0.15em] mb-4">// THE_ARCHITECT</div>
        <h2 className="font-mono text-xl font-bold text-white mb-3">Username: Dj-Z-S</h2>
        <p className="font-mono text-sm text-zinc-400 leading-relaxed max-w-xl mb-4">
          Protocol Architect. Builder. Player 1. I spent over a decade mastering the internal 
          operating system. Then I encoded that philosophy into infrastructure. DJZS is the 
          adversarial verification layer for the AI agent economy — a tollbooth that forces 
          autonomous agents to prove their logic before they're allowed to act.
        </p>
        <div className="border-t border-zinc-800 pt-4 mb-6">
          <p className="font-mono text-xs text-zinc-500 italic">
            "I spent over a decade mastering the internal operating system. Then I started building 
            the infrastructure to prove it."
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'ENS', value: 'username.dj-z-s.eth' },
            { label: 'FARCASTER', value: 'dj-z-s.eth' },
            { label: 'LENS', value: 'usernamedjzs.lens' },
            { label: 'BASE', value: 'usernamedao.base.eth' },
          ].map((id, i) => (
            <div key={i} className="border border-zinc-800 bg-black p-3 text-center">
              <div className="font-mono text-[9px] text-zinc-600 tracking-wider">{id.label}</div>
              <div className="font-mono text-[10px] text-zinc-400 truncate">{id.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-6 px-4 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="font-mono text-[10px] text-zinc-600">
          {DJZS_CONFIG.ens} | Base Mainnet | Built with discipline
        </div>
        <div className="font-mono text-[10px] text-zinc-700">
          Contracts: {Object.values(DJZS_CONFIG.contracts).join(' | ')}
        </div>
        <div className="font-mono text-[10px] text-zinc-800">© 2026</div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// MAIN PAGE EXPORT
// ---------------------------------------------------------------------------

export default function DJZSLandingPage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const handleConnectWallet = useCallback(() => setIsWalletConnected((prev) => !prev), []);

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
    >
      {/* Global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        ::selection { background: rgba(74, 222, 128, 0.25); color: #fff; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 2px)',
        }}
      />

      <Header onConnectWallet={handleConnectWallet} isWalletConnected={isWalletConnected} />

      <main>
        {/* ─── ACT I: WHAT IS THIS ─── */}
        <Hero />
        <Tollbooth />

        {/* ─── ACT II: THE SPEC ─── */}
        <Axioms />

        {/* ─── ACT III: THE PHILOSOPHY ─── */}
        <Philosophy />

        {/* ─── ACT IV: THE EVIDENCE ─── */}
        <ArchitectureOfIllusion />

        {/* ─── ACT V: WHO BUILT THIS ─── */}
        <Identity />
      </main>

      <Footer />
    </div>
  );
}

// ---------------------------------------------------------------------------
// INTEGRATION NOTES
// ---------------------------------------------------------------------------
//
// TO INTEGRATE WITH YOUR EXISTING CODEBASE:
//
// 1. Copy these files into src/components/:
//    - Philosophy.jsx      (5-layer Simulation Stack)
//    - ArchitectureOfIllusion.jsx  (12 Pillars evidence matrix)
//    - Axioms.jsx          (AX-00 through AX-05)
//
// 2. In your existing home.tsx, add imports:
//    import Axioms from './components/Axioms';
//    import Philosophy from './components/Philosophy';
//    import ArchitectureOfIllusion from './components/ArchitectureOfIllusion';
//
// 3. Insert into your existing page layout:
//
//    <Header />
//    <Hero />
//    <Projects />          ← your existing Tollbooth/product section
//    <Evidence />          ← your existing timeline
//    <Architecture />      ← your existing tollbooth flow diagram
//    <Axioms />            ★ NEW — replaces old 4-axiom Philosophy section
//    <Philosophy />        ★ NEW — 5-layer Simulation Stack (was 3-layer)
//    <ArchitectureOfIllusion />  ★ NEW — 12 Pillars evidence matrix
//    <Identity />          ← your existing Architect section
//    <KYADemo />           ← your existing demo
//    <Contact />           ← your existing contact section
//    <Footer />
//
// 4. REMOVE the old Philosophy component that had the 3-layer stack
//    and the old 4-axiom accordion. The new Philosophy.jsx and Axioms.jsx
//    replace both.
//
// 5. Update your header nav to include new anchor links:
//    - #axioms
//    - #philosophy
//    - #architecture-of-illusion
//
// 6. The pt-14 padding fix on sections below the fixed header
//    is handled by the Hero section's pt-28 class.
//
// ---------------------------------------------------------------------------
