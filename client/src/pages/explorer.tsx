import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Search, Zap, TrendingUp, ArrowRight, Database, Coins, Brain, Send, Play, Users } from "lucide-react";
import { BrutalButton, BrutalCard } from "@/components/ui/brutalist";
import { CyberGrid } from "@/components/cyber-grid";
import { MobileMenu } from "@/components/mobile-menu";
import noiseTexture from "@assets/generated_images/raw_gritty_noise_texture_overlay.png";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { vanaService, type DataDAO, type QueryResult } from "@/lib/vana-service";
import { useToast } from "@/hooks/use-toast";

export default function Explorer() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<"agents" | "datadaos" | "query">("agents");
  const [dataDAOs, setDataDAOs] = useState<DataDAO[]>([]);
  const [selectedDataDAO, setSelectedDataDAO] = useState<string>("djzs-insights");
  const [queryInput, setQueryInput] = useState("");
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isQuerying, setIsQuerying] = useState(false);
  const [isContributing, setIsContributing] = useState(false);
  const [contributionContent, setContributionContent] = useState("");
  const [earnings, setEarnings] = useState<{ vana: string; vrc20: Record<string, string> }>({ vana: "0", vrc20: {} });

  // Mock agent data
  const agents = [
    { id: "1", username: "@djzs", level: 5, xp: 2450, zones: 8, entries: 42, tag: "FOUNDER", status: "ACTIVE" },
    { id: "2", username: "@zerocool", level: 3, xp: 1200, zones: 5, entries: 28, tag: "EARLY_ADOPTER", status: "ACTIVE" },
    { id: "3", username: "@mindmeld", level: 2, xp: 800, zones: 3, entries: 15, tag: "EXPLORER", status: "IDLE" },
    { id: "4", username: "@protocol_alice", level: 4, xp: 1850, zones: 6, entries: 35, tag: "RESEARCHER", status: "ACTIVE" }
  ];

  const filteredAgents = agents.filter(agent => 
    agent.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    loadDataDAOs();
    loadEarnings();
  }, []);

  const loadDataDAOs = async () => {
    const daos = await vanaService.getDataDAOs();
    setDataDAOs(daos);
  };

  const loadEarnings = async () => {
    const e = await vanaService.getTotalEarnings();
    setEarnings(e);
  };

  const handleQuery = async () => {
    if (!queryInput.trim()) return;
    setIsQuerying(true);
    try {
      const result = await vanaService.queryCollectiveIntelligence(selectedDataDAO, queryInput);
      setQueryResult(result);
      toast({
        title: "QUERY_EXECUTED",
        description: `Found ${result.recordCount} results. Cost: ${result.computeCost}`,
        className: "bg-primary text-primary-foreground font-mono border-2 border-black",
      });
    } catch (e) {
      toast({ title: "QUERY_FAILED", description: "Could not execute query", variant: "destructive" });
    } finally {
      setIsQuerying(false);
    }
  };

  const handleContribute = async () => {
    if (!contributionContent.trim()) return;
    setIsContributing(true);
    try {
      const result = await vanaService.contributeInsight(selectedDataDAO, {
        agentId: "djzs",
        zone: "Zone 01 – DYOR",
        content: contributionContent,
        tags: ["insight", "alpha"]
      });
      toast({
        title: "CONTRIBUTION_ACCEPTED",
        description: `Earned ${result.vrc20Earned} VRC-20 tokens!`,
        className: "bg-primary text-primary-foreground font-mono border-2 border-black",
      });
      setContributionContent("");
      loadEarnings();
    } catch (e) {
      toast({ title: "CONTRIBUTION_FAILED", description: "Could not submit data", variant: "destructive" });
    } finally {
      setIsContributing(false);
    }
  };

  const queryTemplates = vanaService.getQueryTemplates();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden relative">
      <CyberGrid />
      <div 
        className="fixed inset-0 pointer-events-none z-30 opacity-[0.15] mix-blend-overlay"
        style={{ backgroundImage: `url(${noiseTexture})`, backgroundSize: '200px' }}
      />

      <header className="sticky top-0 z-[50] w-full border-b-2 border-border bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="h-6 w-6 bg-primary animate-pulse" />
              <span className="font-mono text-xl font-bold tracking-tighter">USERNAME_DAO</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-mono text-sm">
            <Link href="/"><a className="hover:text-primary hover:underline decoration-2 underline-offset-4">HOME</a></Link>
            <Link href="/profile"><a className="hover:text-primary hover:underline decoration-2 underline-offset-4">PROFILE</a></Link>
            <a href="/api-test" className="hover:text-primary hover:underline decoration-2 underline-offset-4">API_TEST</a>
          </nav>
          <MobileMenu />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-24 space-y-12 relative z-20">
        {/* Hero */}
        <motion.section 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-5xl md:text-6xl font-black leading-[0.85] tracking-tighter">
                AGENT<br />
                <span className="text-outline text-transparent" style={{ WebkitTextStroke: "2px hsl(var(--foreground))" }}>EXPLORER</span>
              </h1>
              <p className="text-lg font-mono text-muted-foreground mt-4 max-w-xl">
                Discover agents, explore DataDAOs, and query collective intelligence powered by Vana.
              </p>
            </div>
            <div className="flex gap-2 text-xs font-mono">
              <div className="bg-primary/20 border border-primary px-3 py-2">
                <span className="text-primary/60">EARNED:</span> <span className="text-primary font-bold">{earnings.vrc20.DJZS || "0"} DJZS</span>
              </div>
              <div className="bg-primary/20 border border-primary px-3 py-2">
                <span className="text-primary/60">VANA:</span> <span className="text-primary font-bold">{earnings.vana}</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tabs */}
        <div className="flex gap-2 border-b-2 border-border pb-4">
          {[
            { id: "agents" as const, label: "AGENTS", icon: Users },
            { id: "datadaos" as const, label: "DATADAOS", icon: Database },
            { id: "query" as const, label: "QUERY", icon: Brain }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 border-2 font-mono text-xs font-bold uppercase transition-all ${
                  selectedTab === tab.id
                    ? "border-primary bg-primary text-black"
                    : "border-border text-muted-foreground hover:border-primary"
                }`}
                data-testid={`tab-${tab.id}`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Agents Tab */}
        {selectedTab === "agents" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="flex gap-4 max-w-xl">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
                <Input
                  placeholder="SEARCH_AGENTS (@username)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 font-mono text-sm border-2 border-primary rounded-none focus-visible:ring-0 focus-visible:border-primary bg-black/40"
                  data-testid="input-search-agents"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredAgents.map((agent) => (
                <BrutalCard key={agent.id} className="bg-black/60 hover:-translate-y-2 transition-transform duration-200 h-full space-y-4" data-testid={`card-agent-${agent.id}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-black uppercase">{agent.username}</h3>
                      <div className="inline-block bg-primary text-black px-2 py-1 text-[10px] font-bold mt-2">{agent.tag}</div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${agent.status === "ACTIVE" ? "bg-accent animate-pulse" : "bg-gray-500"}`} />
                  </div>
                  <div className="grid grid-cols-2 gap-3 py-4 border-y border-border text-xs font-mono">
                    <div><div className="text-primary/60">LEVEL</div><div className="text-lg font-bold text-primary">{agent.level}</div></div>
                    <div><div className="text-primary/60">XP</div><div className="text-lg font-bold text-primary">{agent.xp}</div></div>
                    <div><div className="text-primary/60">ZONES</div><div className="text-lg font-bold text-primary">{agent.zones}</div></div>
                    <div><div className="text-primary/60">ENTRIES</div><div className="text-lg font-bold text-primary">{agent.entries}</div></div>
                  </div>
                  <BrutalButton className="w-full py-3 text-xs justify-center gap-2">
                    <Database className="w-4 h-4" />VIEW_VAULT<ArrowRight className="w-4 h-4" />
                  </BrutalButton>
                </BrutalCard>
              ))}
            </div>
          </motion.div>
        )}

        {/* DataDAOs Tab */}
        {selectedTab === "datadaos" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* DataDAO List */}
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase border-b border-border pb-2">AVAILABLE DATADAOS</h3>
                {dataDAOs.map((dao) => (
                  <BrutalCard 
                    key={dao.id} 
                    className={`cursor-pointer transition-all ${selectedDataDAO === dao.id ? "border-primary bg-primary/10" : "hover:border-primary/50"}`}
                    onClick={() => setSelectedDataDAO(dao.id)}
                    data-testid={`card-datadao-${dao.id}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">{dao.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{dao.description}</p>
                      </div>
                      <div className="text-xs bg-primary/20 text-primary px-2 py-1 font-mono">${dao.vrc20Symbol}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4 text-xs font-mono">
                      <div><span className="text-primary/60">CONTRIBUTORS</span><div className="text-primary font-bold">{dao.contributors}</div></div>
                      <div><span className="text-primary/60">DATA</span><div className="text-primary font-bold">{dao.totalData}</div></div>
                      <div><span className="text-primary/60">REWARDS</span><div className="text-primary font-bold">{dao.rewardsDistributed}</div></div>
                    </div>
                  </BrutalCard>
                ))}
              </div>

              {/* Contribute Panel */}
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase border-b border-border pb-2">CONTRIBUTE DATA</h3>
                <BrutalCard className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-mono">
                    <Coins className="w-4 h-4 text-primary" />
                    <span>Earn VRC-20 tokens by contributing agent insights</span>
                  </div>
                  <Textarea
                    placeholder="Enter your agent insight, alpha signal, or research finding..."
                    value={contributionContent}
                    onChange={(e) => setContributionContent(e.target.value)}
                    className="min-h-[120px] font-mono text-sm border-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-primary bg-black/40"
                    data-testid="textarea-contribution"
                  />
                  <div className="flex justify-between items-center">
                    <div className="text-xs font-mono text-muted-foreground">
                      Target: <span className="text-primary">{selectedDataDAO}</span>
                    </div>
                    <BrutalButton 
                      onClick={handleContribute} 
                      disabled={isContributing || !contributionContent.trim()}
                      className="gap-2"
                      data-testid="button-contribute"
                    >
                      <Send className="w-4 h-4" />
                      {isContributing ? "CONTRIBUTING..." : "CONTRIBUTE"}
                    </BrutalButton>
                  </div>
                </BrutalCard>

                <div className="border-2 border-dashed border-primary/30 p-4 space-y-2 text-xs font-mono">
                  <div className="text-primary font-bold">HOW IT WORKS:</div>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>1. Contribute valuable insights from your agent</li>
                    <li>2. Data is validated via Proof of Contribution</li>
                    <li>3. Earn VRC-20 tokens representing your ownership stake</li>
                    <li>4. Tokens are burned when AI builders query your data</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Query Tab */}
        {selectedTab === "query" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Query Input */}
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase border-b border-border pb-2">COLLECTIVE INTELLIGENCE</h3>
                <BrutalCard className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-mono">
                    <Brain className="w-4 h-4 text-primary" />
                    <span>Query aggregated insights from the network (TEE-protected)</span>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted-foreground">SELECT DATADAO:</label>
                    <select
                      value={selectedDataDAO}
                      onChange={(e) => setSelectedDataDAO(e.target.value)}
                      className="w-full p-3 font-mono text-sm border-2 border-border bg-black/40 text-primary focus:border-primary"
                      data-testid="select-datadao"
                    >
                      {dataDAOs.map(dao => (
                        <option key={dao.id} value={dao.id}>{dao.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted-foreground">QUERY (SQL):</label>
                    <Textarea
                      placeholder="SELECT signal, confidence FROM insights WHERE confidence > 0.7"
                      value={queryInput}
                      onChange={(e) => setQueryInput(e.target.value)}
                      className="min-h-[100px] font-mono text-sm border-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-primary bg-black/40"
                      data-testid="textarea-query"
                    />
                  </div>

                  <BrutalButton 
                    onClick={handleQuery} 
                    disabled={isQuerying || !queryInput.trim()}
                    className="w-full gap-2"
                    data-testid="button-execute-query"
                  >
                    <Play className="w-4 h-4" />
                    {isQuerying ? "EXECUTING..." : "EXECUTE_QUERY"}
                  </BrutalButton>
                </BrutalCard>

                {/* Query Templates */}
                <div className="space-y-2">
                  <div className="text-xs font-mono text-muted-foreground">QUERY TEMPLATES:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {queryTemplates.map((t, i) => (
                      <button
                        key={i}
                        onClick={() => setQueryInput(t.query)}
                        className="text-left p-3 border border-border hover:border-primary text-xs font-mono transition-colors"
                        data-testid={`button-template-${i}`}
                      >
                        <div className="text-primary font-bold">{t.name}</div>
                        <div className="text-muted-foreground mt-1 truncate">{t.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Query Results */}
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase border-b border-border pb-2">RESULTS</h3>
                <BrutalCard className="min-h-[400px] space-y-4">
                  {queryResult ? (
                    <>
                      <div className="flex justify-between items-center text-xs font-mono border-b border-border pb-2">
                        <span className="text-muted-foreground">JOB_ID: <span className="text-primary">{queryResult.jobId}</span></span>
                        <span className="text-muted-foreground">COST: <span className="text-primary">{queryResult.computeCost}</span></span>
                      </div>
                      <div className="text-xs font-mono text-muted-foreground">
                        RECORDS: <span className="text-primary">{queryResult.recordCount}</span>
                      </div>
                      <div className="space-y-2 max-h-[300px] overflow-auto">
                        {queryResult.results.map((r, i) => (
                          <div key={i} className="p-3 border border-border bg-black/40 text-xs font-mono" data-testid={`result-row-${i}`}>
                            <pre className="whitespace-pre-wrap text-primary/80">{JSON.stringify(r, null, 2)}</pre>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                      <Brain className="w-12 h-12 text-primary/30 mb-4" />
                      <div className="text-muted-foreground font-mono text-sm">No query executed</div>
                      <div className="text-muted-foreground font-mono text-xs mt-2">Select a template or write your own SQL query</div>
                    </div>
                  )}
                </BrutalCard>
              </div>
            </div>
          </motion.div>
        )}

        {/* Network Stats */}
        <motion.section 
          className="border-2 border-border bg-black/40 p-8 md:p-12 space-y-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-black uppercase">Vana Network Stats</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { label: "DATADAOS", value: "24", icon: "🏛️" },
              { label: "CONTRIBUTORS", value: "3,891", icon: "👥" },
              { label: "TOTAL_DATA", value: "18.7 GB", icon: "💾" },
              { label: "REWARDS_DIST", value: "45.2K VANA", icon: "💰" },
              { label: "AVG_EARNINGS", value: "11.62 VANA", icon: "📈" }
            ].map((stat, i) => (
              <div key={i} className="border-2 border-border p-6 text-center space-y-2 hover:bg-primary/10 transition-colors">
                <div className="text-3xl">{stat.icon}</div>
                <div className="text-[10px] font-mono text-muted-foreground">{stat.label}</div>
                <div className="text-2xl font-black text-primary">{stat.value}</div>
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
          <p className="font-mono text-muted-foreground text-lg">Ready to spawn your agent?</p>
          <Link href="/">
            <BrutalButton className="inline-flex gap-2">
              <Zap className="w-4 h-4" />ACTIVATE_AGENT<ArrowRight className="w-4 h-4" />
            </BrutalButton>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
