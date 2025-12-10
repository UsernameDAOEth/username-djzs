import React from "react";
import logoImage from "@assets/1b6b08c2244019f727791915b0c3fb41385d1c9b9769daea763eb6276f1b5_1765335205229.jpeg";

export function HeroSection() {
  return (
    <section className="relative px-6 py-16 md:py-24 lg:px-12">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-950/40 px-4 py-1 text-xs tracking-[0.2em] uppercase mb-5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            USERNAME_DAO · DJZS Protocol
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            <span className="block">YOUR NAME</span>
            <span className="block text-sky-400">IS YOUR AGENT</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm sm:text-base text-slate-200/90">
            Claim a Username. Activate your personal DJZS Protocol Agent. Store
            intelligence locally. Own your entire knowledge graph. No cloud. No
            subscriptions. Pay per insight.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button 
              data-testid="button-claim-username"
              className="rounded-md bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-sky-500/40 hover:bg-sky-300 transition"
            >
              CLAIM_USERNAME
            </button>
            <p className="text-xs sm:text-sm text-slate-300/80">
              Powered by <span className="font-semibold">DJZS Protocol v1.0</span>{" "}
              · Local-first AI
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-xl border border-sky-500/60 bg-slate-900/80 p-5 shadow-xl shadow-sky-900/60 backdrop-blur">
            <div className="text-xs font-mono text-slate-300/80 flex items-center justify-between mb-3">
              <span>AGENT_ID: UNASSIGNED</span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                AGENT_CORE: READY
              </span>
            </div>
            <div className="border border-sky-500/30 rounded-md p-4 text-center">
              <div className="flex justify-center mb-3">
                <img 
                  src={logoImage} 
                  alt="Username DAO" 
                  className="h-16 w-16 object-contain"
                />
              </div>
              <div className="text-3xl font-black tracking-[0.3em] mb-2">
                DJZS
              </div>
              <div className="text-[0.65rem] uppercase tracking-[0.25em] text-slate-400">
                Agent_Protocol: DJZS v1.0
              </div>
            </div>
            <p className="mt-4 text-[0.7rem] text-slate-300/70 font-mono leading-relaxed">
              Once you mint your Username, your DJZS Agent Core will be bound to
              your identity and Anytype Vault through the MCP bridge.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
