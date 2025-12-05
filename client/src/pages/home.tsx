import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { BrutalButton, BrutalCard, Marquee, GlitchText } from "@/components/ui/brutalist";
import { DjzsAgentConsole } from "@/components/djzs-agent-console";
import { MobileMenu } from "@/components/mobile-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import noiseTexture from "@assets/generated_images/raw_gritty_noise_texture_overlay.png";
import { CyberGrid } from "@/components/cyber-grid";
import { WireframeCore } from "@/components/wireframe-core";

import { ThreeDCard } from "@/components/3d-card";
import { irysService } from "@/lib/irys-service";

export default function Home() {
  const { toast } = useToast();
  const [isMinting, setIsMinting] = useState(false);
  const [username, setUsername] = useState("");
  const [activeAgent, setActiveAgent] = useState<string | null>(null);

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      toast({
        title: "ERROR: MISSING_DATA",
        description: "USERNAME REQUIRED.",
        variant: "destructive",
      });
      return;
    }
    setIsMinting(true);
    
    try {
      // Call the simulated Irys activation
      // In a real app, this would hit POST /api/agent/activate
      const result = await irysService.activateAgent(username);
      
      setActiveAgent(username);
      toast({
        title: "CORE_ACTIVATED",
        description: (
          <div className="font-mono text-xs space-y-1">
            <div>AGENT @{username.toUpperCase()} ACTIVATED</div>
            <div>IRYS_ID: {result.irysId.substring(0, 8)}...</div>
            <div>MINT_TX: {result.mintTxHash.substring(0, 8)}...</div>
          </div>
        ),
        className: "bg-primary text-primary-foreground font-mono border-2 border-black",
        duration: 8000,
      });
      
      console.log("Agent Metadata URL:", result.metadataUrl);
      console.log("Mint Explorer URL:", result.explorerUrl);
      
    } catch (error) {
      toast({
        title: "ACTIVATION_FAILED",
        description: "COULD NOT UPLOAD METADATA TO IRYS.",
        variant: "destructive",
      });
    } finally {
      setIsMinting(false);
    }
  };

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
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-primary animate-pulse" />
            <span className="font-mono text-xl font-bold tracking-tighter">USERNAME_DAO</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-mono text-sm">
            <a href="#agent" className="hover:text-primary hover:underline decoration-2 underline-offset-4">DJZS_PROTOCOL</a>
            <a href="https://invite.any.coop/bafybeiebtlepvip6x6hmu3aao3cdn4cfampgd2vvgx7i7gah5phc43euqm#A2Hx7HDnZiTZMZxSbABvEVidAmMytp1YdhfdisNbxTMZ" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline decoration-2 underline-offset-4">ANYTYPE_VAULT</a>
            <Link href="/explorer">
              <a className="hover:text-primary hover:underline decoration-2 underline-offset-4">EXPLORER</a>
            </Link>
            <Link href="/profile">
              <BrutalButton className="h-8 text-xs px-4">
                 <Wallet className="w-3 h-3 mr-2" />
                 PROFILE
              </BrutalButton>
            </Link>
          </nav>
          <MobileMenu />
        </div>
      </header>

      {/* Marquee */}
      <Marquee text="/// YOUR NAME IS YOUR AGENT /// NO CLOUD /// LOCAL FIRST /// PAY PER INSIGHT /// " />

      <main className="container mx-auto px-4 py-12 md:py-24 space-y-32 relative z-20">
        {/* Hero Section */}
        <motion.section 
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block border border-primary px-2 py-1 text-xs font-mono text-primary">
                SYSTEM_STATUS: SPAWNING LIVE
              </div>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter font-serif">
                YOUR<br />
                <span className="text-outline text-transparent stroke-foreground stroke-2" style={{ WebkitTextStroke: "2px hsl(var(--foreground))" }}>NAME IS</span><br />
                YOUR AGENT
              </h1>
              <p className="text-xl md:text-2xl font-mono text-muted-foreground max-w-md border-l-4 border-primary pl-6">
                Claim your Username. Spawn your AI Agent. Own your Intelligence. 
                <br/><span className="text-primary text-sm mt-2 block">POWERED BY DJZS</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <BrutalButton onClick={() => document.getElementById('mint')?.scrollIntoView({ behavior: 'smooth' })}>
                  CLAIM_USERNAME
                </BrutalButton>
              </div>
            </div>
            
            {/* Hero Visual */}
            <ThreeDCard className="relative aspect-square md:aspect-auto md:h-[600px] border-2 border-border bg-secondary/20 flex items-center justify-center group cursor-crosshair bg-black/40 backdrop-blur-sm">
               {/* 3D Wireframe Core - Moved to background of card */}
               <div className="absolute inset-0 opacity-50">
                  <WireframeCore />
               </div>

               <div className="absolute right-0 top-0 bottom-0 w-12 border-l-2 border-border flex flex-col items-center justify-center py-4 overflow-hidden bg-background/90 z-20">
                  <div className="[writing-mode:vertical-rl] font-mono text-xs tracking-widest uppercase whitespace-nowrap animate-pulse text-primary">
                    /// DJZS PROTOCOL ACTIVE ///
                  </div>
               </div>
               <div className="relative z-10 text-center space-y-4 p-8 bg-background/90 backdrop-blur-sm border-2 border-foreground transition-transform shadow-[10px_10px_0px_rgba(178,255,89,0.2)]">
                 <GlitchText text="DJZS" className="text-7xl md:text-9xl block" />
                 <div className="font-mono text-sm">AGENT_ID: {activeAgent ? `@${activeAgent.toUpperCase()}` : "UNASSIGNED"}</div>
                 <div className={`w-full h-2 mt-4 loading-bar ${activeAgent ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" : "bg-primary"}`} />
               </div>
            </ThreeDCard>
          </div>
        </motion.section>

        {/* Agent Console Integration */}
        <motion.section 
          id="agent"
          className="space-y-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-black uppercase">Live Agent Preview</h2>
                <p className="font-mono text-sm text-muted-foreground">Interact with the djzs-paid-agent v1.0.0 kernel</p>
            </div>
            <DjzsAgentConsole />
        </motion.section>

        {/* How It Works Grid */}
        <motion.section 
          className="space-y-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          <div className="flex items-end justify-between border-b-2 border-border pb-4">
             <h2 className="text-4xl font-black uppercase">System Architecture</h2>
             <span className="font-mono text-xs text-muted-foreground hidden md:inline-block">PROTOCOL_VER_1.0</span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Choose Username",
                desc: "Your handle becomes your identity layer. The root of everything your agent learns.",
                icon: "🟣"
              },
              {
                step: "02",
                title: "Agent Activates",
                desc: "Persistent. Linked to you. Trained in DJZS style. Doesn't run in the cloud.",
                icon: "🔵"
              },
              {
                step: "03",
                title: "Local Space",
                desc: "Your agent lives in your Anytype Vault. Encrypted. Private. Fully yours.",
                icon: "🟢"
              },
              {
                step: "04",
                title: "Pay Per Insight",
                desc: "No subscriptions. Micropayments per request (x402). Only pay for intelligence.",
                icon: "🔴"
              },
              {
                step: "05",
                title: "Agent Writes",
                desc: "Direct-to-vault encrypted storage. No platform owns your data.",
                icon: "🟣"
              },
              {
                step: "06",
                title: "Knowledge Evolves",
                desc: "Graph expansion and style learning. Your personal space becomes richer.",
                icon: "🔵"
              },
              {
                step: "07",
                title: "Mint or Export",
                desc: "Create NFTs, build a portfolio, or share your research. Optional.",
                icon: "🟢"
              },
              {
                step: "08",
                title: "Full Ownership",
                desc: "Zero lock-in. Total sovereignty. Just your name, your agent, your mind.",
                icon: "🧭"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
              >
                <BrutalCard className="bg-card hover:-translate-y-2 transition-transform duration-200 h-full">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-4xl font-bold text-primary opacity-50">{item.step}</span>
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold uppercase mb-2">{item.title}</h3>
                  <p className="font-mono text-sm text-muted-foreground">{item.desc}</p>
                </BrutalCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Pricing Table */}
        <motion.section 
          className="border-2 border-border bg-background p-8 md:p-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold uppercase mb-8 text-center">x402 Micropayment Structure</h3>
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-sm text-left">
              <thead className="bg-secondary/20 text-primary border-b-2 border-border">
                <tr>
                  <th className="p-4 uppercase">Mode</th>
                  <th className="p-4 uppercase">Output</th>
                  <th className="p-4 uppercase">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { mode: "QUICK", output: "Simple Answers", cost: "$0.01" },
                  { mode: "JOURNAL", output: "Problem → Solution → Use Cases", cost: "$0.03" },
                  { mode: "RESEARCH", output: "Full Analysis", cost: "$0.05" },
                  { mode: "ALPHA", output: "High-Value Insights", cost: "$0.10+" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-secondary/10">
                    <td className="p-4 font-bold">{row.mode}</td>
                    <td className="p-4">{row.output}</td>
                    <td className="p-4 text-primary">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Mint Section */}
        <motion.section 
          id="mint" 
          className="max-w-3xl mx-auto relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <BrutalCard className="bg-background p-8 md:p-12 space-y-8 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute -right-12 -top-12 w-40 h-40 border-4 border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
            
            <div className="space-y-2 relative z-10">
              <h2 className="text-4xl font-black uppercase">Claim Your Identity</h2>
              <p className="font-mono text-muted-foreground">Mint your Username NFT to spawn your DJZS Agent.</p>
            </div>

            <form onSubmit={handleMint} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <Label htmlFor="username" className="font-mono text-xs uppercase">Desired Username</Label>
                <div className="flex">
                  <span className="flex items-center px-4 border-2 border-r-0 border-border bg-secondary/20 font-mono text-muted-foreground">@</span>
                  <Input 
                    id="username"
                    placeholder="djzs" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="font-mono text-lg p-6 border-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-primary bg-secondary/10 flex-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 border-2 border-border bg-secondary/5 text-center cursor-pointer hover:border-primary hover:bg-primary/10 transition-colors group">
                    <div className="font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors">MINT FEE</div>
                    <div className="text-xl font-bold">FREE</div>
                 </div>
                 <div className="p-4 border-2 border-border bg-secondary/5 text-center cursor-pointer hover:border-primary hover:bg-primary/10 transition-colors group">
                    <div className="font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors">STORAGE</div>
                    <div className="text-xl font-bold">LOCAL/IRYS</div>
                 </div>
              </div>

              <BrutalButton 
                type="submit" 
                className="w-full py-6 text-xl relative overflow-hidden group"
                disabled={isMinting}
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                {isMinting ? "INITIALIZING_AGENT..." : "ACTIVATE_AGENT_CORE"}
              </BrutalButton>
              
              <p className="text-xs font-mono text-center text-muted-foreground">
                * Your agent will be deployed to your local environment.
              </p>
            </form>
          </BrutalCard>
        </motion.section>

        {/* Footer */}
        <footer className="border-t-2 border-border pt-12 pb-8">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-4">
              <div className="h-8 w-8 bg-primary animate-pulse" />
              <p className="font-mono text-sm text-muted-foreground max-w-xs">
                Username DAO x DJZS Protocol.
                <br/>
                Your name. Your agent. Your mind.
              </p>
            </div>
            <div className="col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8 font-mono text-sm">
               <div className="space-y-4">
                 <h4 className="font-bold uppercase text-primary">Ecosystem</h4>
                 <ul className="space-y-2 text-muted-foreground">
                   <li><a href="#" className="hover:text-foreground">Username DAO</a></li>
                   <li><a href="#" className="hover:text-foreground">DJZS Protocol</a></li>
                   <li><a href="#" className="hover:text-foreground">Anytype</a></li>
                 </ul>
               </div>
               <div className="space-y-4">
                 <h4 className="font-bold uppercase text-primary">Community</h4>
                 <ul className="space-y-2 text-muted-foreground">
                   <li><a href="#" className="hover:text-foreground">Discord</a></li>
                   <li><a href="#" className="hover:text-foreground">Farcaster</a></li>
                   <li><a href="#" className="hover:text-foreground">Governance</a></li>
                 </ul>
               </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-muted-foreground">
            <div>© 2025 USERNAME DAO. DECENTRALIZED INTELLIGENCE.</div>
            <div className="flex flex-col md:flex-row gap-4 text-right">
              <span>AGENT_CORE: v1.0.0 (Node/Express)</span>
              <span>STATUS: ONLINE</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
