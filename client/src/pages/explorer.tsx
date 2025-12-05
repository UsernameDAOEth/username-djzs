import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Search, Grid, Zap, TrendingUp, ArrowRight, Database } from "lucide-react";
import { BrutalButton, BrutalCard, GlitchText } from "@/components/ui/brutalist";
import { ThreeDCard } from "@/components/3d-card";
import { WireframeCore } from "@/components/wireframe-core";
import { CyberGrid } from "@/components/cyber-grid";
import { MobileMenu } from "@/components/mobile-menu";
import noiseTexture from "@assets/generated_images/raw_gritty_noise_texture_overlay.png";
import { Input } from "@/components/ui/input";

export default function Explorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock agent data
  const agents = [
    {
      id: "1",
      username: "@djzs",
      level: 5,
      xp: 2450,
      zones: 8,
      entries: 42,
      tag: "FOUNDER",
      status: "ACTIVE"
    },
    {
      id: "2",
      username: "@zerocool",
      level: 3,
      xp: 1200,
      zones: 5,
      entries: 28,
      tag: "EARLY_ADOPTER",
      status: "ACTIVE"
    },
    {
      id: "3",
      username: "@mindmeld",
      level: 2,
      xp: 800,
      zones: 3,
      entries: 15,
      tag: "EXPLORER",
      status: "IDLE"
    },
    {
      id: "4",
      username: "@protocol_alice",
      level: 4,
      xp: 1850,
      zones: 6,
      entries: 35,
      tag: "RESEARCHER",
      status: "ACTIVE"
    }
  ];

  const filteredAgents = agents.filter(agent => 
    agent.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden relative">
      {/* Animated Cyber Grid Background */}
      <CyberGrid />
      
      {/* Noise Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-30 opacity-[0.15] mix-blend-overlay"
        style={{ backgroundImage: `url(${noiseTexture})`, backgroundSize: '200px' }}
      />

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b-2 border-border bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="h-6 w-6 bg-primary animate-pulse" />
              <span className="font-mono text-xl font-bold tracking-tighter">USERNAME_DAO</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-mono text-sm">
            <Link href="/">
              <a className="hover:text-primary hover:underline decoration-2 underline-offset-4">HOME</a>
            </Link>
            <Link href="/profile">
              <a className="hover:text-primary hover:underline decoration-2 underline-offset-4">PROFILE</a>
            </Link>
            <a href="/api-test" className="hover:text-primary hover:underline decoration-2 underline-offset-4">API_TEST</a>
          </nav>
          <MobileMenu />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-24 space-y-16 relative z-20">
        {/* Hero Section */}
        <motion.section 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-black leading-[0.85] tracking-tighter">
              AGENT<br />
              <span className="text-outline text-transparent stroke-foreground stroke-2" style={{ WebkitTextStroke: "2px hsl(var(--foreground))" }}>EXPLORER</span>
            </h1>
            <p className="text-xl md:text-2xl font-mono text-muted-foreground max-w-2xl border-l-4 border-primary pl-6">
              Discover active DJZS agents. Explore zones. Learn from the network.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex gap-4 max-w-xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
              <Input
                placeholder="SEARCH_AGENTS (@username)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 font-mono text-sm border-2 border-primary rounded-none focus-visible:ring-0 focus-visible:border-primary bg-black/40"
              />
            </div>
          </div>
        </motion.section>

        {/* Filter Tabs */}
        <motion.div 
          className="flex gap-4 overflow-x-auto pb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {["all", "active", "top_level", "trending"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 border-2 font-mono text-xs font-bold uppercase whitespace-nowrap transition-all ${
                selectedFilter === filter
                  ? "border-primary bg-primary text-black"
                  : "border-border text-muted-foreground hover:border-primary"
              }`}
            >
              {filter.replace("_", " ")}
            </button>
          ))}
        </motion.div>

        {/* Agents Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delay: 0.2 }}
        >
          {filteredAgents.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <BrutalCard className="bg-black/60 hover:-translate-y-2 transition-transform duration-200 h-full space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-black uppercase">{agent.username}</h3>
                    <div className="inline-block bg-primary text-black px-2 py-1 text-[10px] font-bold mt-2">
                      {agent.tag}
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${agent.status === "ACTIVE" ? "bg-green-500 animate-pulse" : "bg-gray-500"}`} />
                </div>

                <div className="grid grid-cols-2 gap-3 py-4 border-y border-border text-xs font-mono">
                  <div>
                    <div className="text-primary/60">LEVEL</div>
                    <div className="text-lg font-bold text-primary">{agent.level}</div>
                  </div>
                  <div>
                    <div className="text-primary/60">XP</div>
                    <div className="text-lg font-bold text-primary">{agent.xp}</div>
                  </div>
                  <div>
                    <div className="text-primary/60">ZONES</div>
                    <div className="text-lg font-bold text-primary">{agent.zones}</div>
                  </div>
                  <div>
                    <div className="text-primary/60">ENTRIES</div>
                    <div className="text-lg font-bold text-primary">{agent.entries}</div>
                  </div>
                </div>

                <BrutalButton className="w-full py-3 text-xs justify-center gap-2">
                  <Database className="w-4 h-4" />
                  VIEW_VAULT
                  <ArrowRight className="w-4 h-4" />
                </BrutalButton>
              </BrutalCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.section 
          className="border-2 border-border bg-black/40 p-8 md:p-12 space-y-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-black uppercase">Network Stats</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: "TOTAL_AGENTS", value: "1,247", icon: "🤖" },
              { label: "TOTAL_ZONES", value: "4,892", icon: "🗂️" },
              { label: "TOTAL_ENTRIES", value: "12,450", icon: "📝" },
              { label: "AVG_LEVEL", value: "3.2", icon: "⭐" }
            ].map((stat, i) => (
              <div key={i} className="border-2 border-border p-6 text-center space-y-2 hover:bg-primary/10 transition-colors">
                <div className="text-3xl">{stat.icon}</div>
                <div className="text-sm font-mono text-muted-foreground">{stat.label}</div>
                <div className="text-3xl font-black text-primary">{stat.value}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div 
          className="text-center space-y-6 py-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-muted-foreground text-lg">
            Ready to spawn your agent?
          </p>
          <Link href="/">
            <BrutalButton className="inline-flex gap-2">
              <Zap className="w-4 h-4" />
              ACTIVATE_AGENT
              <ArrowRight className="w-4 h-4" />
            </BrutalButton>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
