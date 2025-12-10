import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Zap } from "lucide-react";
import { CyberGrid } from "@/components/cyber-grid";
import { Navigation } from "@/components/navigation";

interface AgentCard {
  username: string;
  role: string;
  level: number;
  xp: number;
  zones: number;
  entries: number;
  vaultStatus: "CONNECTED" | "DISCONNECTED" | "PENDING";
  borderColor: string;
}

const MOCK_AGENTS: AgentCard[] = [
  {
    username: "@DJZS",
    role: "FOUNDER",
    level: 5,
    xp: 2450,
    zones: 8,
    entries: 42,
    vaultStatus: "CONNECTED",
    borderColor: "bg-yellow-300"
  },
  {
    username: "@ZEROCOOL",
    role: "EARLY_ADOPTER",
    level: 3,
    xp: 1200,
    zones: 5,
    entries: 28,
    vaultStatus: "PENDING",
    borderColor: "bg-emerald-400"
  },
  {
    username: "@MINDMELD",
    role: "EXPLORER",
    level: 2,
    xp: 800,
    zones: 3,
    entries: 15,
    vaultStatus: "CONNECTED",
    borderColor: "bg-sky-400"
  },
  {
    username: "@PROTOCOL_ALICE",
    role: "RESEARCHER",
    level: 4,
    xp: 1850,
    zones: 6,
    entries: 35,
    vaultStatus: "DISCONNECTED",
    borderColor: "bg-yellow-300"
  }
];

const NETWORK_STATS = [
  { emoji: "🧠", value: "10", label: "ZONES" },
  { emoji: "👤", value: "4,212", label: "AGENTS" },
  { emoji: "📚", value: "18.7K", label: "JOURNAL ENTRIES" },
  { emoji: "🔗", value: "3,928", label: "VAULT CONNECTIONS" },
  { emoji: "🔮", value: "42.5k", label: "INSIGHTS GENERATED" },
];

export default function Explorer() {
  const [agents, setAgents] = useState<AgentCard[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // TODO: Replace with real backend later:
    // fetch("/api/agents").then((r) => r.json()).then(setAgents);
    setAgents(MOCK_AGENTS);
  }, []);

  const filteredAgents = agents.filter(agent =>
    agent.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CyberGrid />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_90%)]" />
      </div>

      <Navigation />

      <main className="relative z-10 px-6 py-12 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
            AGENT <span className="text-sky-400">EXPLORER</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
            Discover Username DAO agents, explore DJZS Protocol activity,
            and inspect vault-linked intelligence profiles.
          </p>

          {/* Search bar */}
          <div className="mt-6 border border-sky-500/40 rounded-md w-full md:w-96 p-3 flex items-center gap-3 bg-black/40">
            <Search className="w-4 h-4 text-sky-400/70" />
            <input
              placeholder="SEARCH_AGENTS (@username)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent w-full outline-none text-slate-200 placeholder:text-slate-500 text-sm"
              data-testid="input-search-agents"
            />
          </div>
        </motion.div>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredAgents.map((agent, index) => (
            <motion.div
              key={agent.username}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="border border-sky-400/40 rounded-xl p-5 relative bg-slate-900/50 cursor-pointer"
              style={{ boxShadow: "0 0 20px rgba(56, 189, 248, 0.15)" }}
              data-testid={`card-agent-${agent.username}`}
            >
              {/* Status dot */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${agent.borderColor}`} />
              </div>

              {/* Username */}
              <div className="text-xl font-bold tracking-wide text-slate-100">{agent.username}</div>
              <div className="text-xs font-mono text-sky-400 mt-1">{agent.role}</div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <div className="text-slate-500">LEVEL</div>
                  <div className="text-sky-300 text-lg">{agent.level}</div>
                </div>
                <div>
                  <div className="text-slate-500">XP</div>
                  <div className="text-sky-300 text-lg">{agent.xp}</div>
                </div>
                <div>
                  <div className="text-slate-500">ZONES</div>
                  <div className="text-sky-300 text-lg">{agent.zones}</div>
                </div>
                <div>
                  <div className="text-slate-500">ENTRIES</div>
                  <div className="text-sky-300 text-lg">{agent.entries}</div>
                </div>
              </div>

              {/* Vault link */}
              <div className="mt-5 text-xs font-mono text-slate-500">
                VAULT_LINK:{" "}
                {agent.vaultStatus === "CONNECTED" && (
                  <span className="text-emerald-400">CONNECTED</span>
                )}
                {agent.vaultStatus === "PENDING" && (
                  <span className="text-yellow-300">PENDING</span>
                )}
                {agent.vaultStatus === "DISCONNECTED" && (
                  <span className="text-red-400">DISCONNECTED</span>
                )}
              </div>

              {/* Button */}
              <button 
                className="mt-4 w-full bg-sky-400 text-slate-900 font-semibold text-sm py-2 rounded-md hover:bg-sky-300 transition"
                data-testid={`button-view-vault-${agent.username}`}
              >
                VIEW_VAULT
              </button>
            </motion.div>
          ))}
        </div>

        {/* DJZS Network Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold tracking-wide mb-6 text-slate-100">
            DJZS <span className="text-sky-400">NETWORK STATS</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 text-center">
            {NETWORK_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="border border-sky-500/40 p-5 rounded-lg bg-slate-900/50"
              >
                <div className="text-4xl mb-2">{stat.emoji}</div>
                <div className="text-lg font-bold text-slate-100">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="mt-14 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-500 text-sm mb-3">Ready to activate your agent?</p>
          <motion.button 
            className="px-6 py-3 bg-sky-400 hover:bg-sky-300 transition text-slate-900 font-bold rounded-md shadow-lg shadow-sky-500/20 inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            data-testid="button-activate-agent"
          >
            <Zap className="w-4 h-4" />
            ACTIVATE_AGENT
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}
