import React from "react";
import { motion } from "framer-motion";
import logoImage from "@assets/1b6b08c2244019f727791915b0c3fb41385d1c9b9769daea763eb6276f1b5_1765335205229.jpeg";
import { ThreeDCard } from "@/components/3d-card";

export function HeroSection() {
  return (
    <section className="relative px-6 py-16 md:py-24 lg:px-12">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-950/40 px-4 py-1 text-xs tracking-[0.2em] uppercase mb-5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            USERNAME_DAO · DJZS Protocol
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            <span className="block">YOUR NAME</span>
            <span className="block text-cyan-400">IS YOUR AGENT</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm sm:text-base text-slate-200/90">
            Claim a Username. Activate your personal DJZS Protocol Agent. Store
            intelligence locally. Own your entire knowledge graph. No cloud. No
            subscriptions. Pay per insight.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button 
              data-testid="button-claim-username"
              className="rounded-md bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/40 hover:bg-cyan-300 transition"
            >
              CLAIM_USERNAME
            </button>
            <p className="text-xs sm:text-sm text-slate-300/80">
              Powered by <span className="font-semibold">DJZS Protocol v1.0</span>{" "}
              · Local-first AI
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ThreeDCard className="cursor-pointer">
            <div className="rounded-xl border border-cyan-500/60 bg-slate-900/80 p-5 shadow-xl shadow-cyan-900/60 backdrop-blur relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(34,211,238,0.03)_50%)] bg-[length:100%_4px] pointer-events-none" />
              
              <div className="text-xs font-mono text-slate-300/80 flex items-center justify-between mb-3 relative z-10">
                <span>AGENT_ID: UNASSIGNED</span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  AGENT_CORE: READY
                </span>
              </div>
              <div className="border border-cyan-500/30 rounded-md p-4 text-center relative z-10">
                <div className="flex justify-center mb-3">
                  <motion.img 
                    src={logoImage} 
                    alt="Username DAO" 
                    className="h-16 w-16 object-contain"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  />
                </div>
                <div className="text-3xl font-black tracking-[0.3em] mb-2">
                  DJZS
                </div>
                <div className="text-[0.65rem] uppercase tracking-[0.25em] text-slate-400">
                  Agent_Protocol: DJZS v1.0
                </div>
              </div>
              <p className="mt-4 text-[0.7rem] text-slate-300/70 font-mono leading-relaxed relative z-10">
                Once you mint your Username, your DJZS Agent Core will be bound to
                your identity and Anytype Vault through the MCP bridge.
              </p>
            </div>
          </ThreeDCard>
        </motion.div>
      </div>
    </section>
  );
}
