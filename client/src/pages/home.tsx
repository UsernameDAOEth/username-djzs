import React, { useState } from "react";
import { motion } from "framer-motion";
import { BrutalButton, BrutalCard, Marquee, GlitchText } from "@/components/ui/brutalist";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import noiseTexture from "@assets/generated_images/raw_gritty_noise_texture_overlay.png";
import { DjzsAgentConsole } from "@/components/djzs-agent-console";

export default function Home() {
  const { toast } = useToast();
  const [isMinting, setIsMinting] = useState(false);
  const [wallet, setWallet] = useState("");
  const [username, setUsername] = useState("");

  const handleMint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet || !username) {
      toast({
        title: "ERROR: MISSING_DATA",
        description: "USERNAME AND WALLET REQUIRED.",
        variant: "destructive",
      });
      return;
    }
    setIsMinting(true);
    // Simulate minting
    setTimeout(() => {
      setIsMinting(false);
      toast({
        title: "IDENTITY_MINTED",
        description: `AGENT @${username.toUpperCase()} ACTIVATED.`,
        className: "bg-primary text-primary-foreground font-mono border-2 border-black",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden relative">
      {/* Noise Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.15] mix-blend-overlay"
        style={{ backgroundImage: `url(${noiseTexture})`, backgroundSize: '200px' }}
      />

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b-2 border-border bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-primary animate-pulse" />
            <span className="font-mono text-xl font-bold tracking-tighter">USERNAME_DAO</span>
          </div>
          <nav className="hidden md:flex gap-8 font-mono text-sm">
            <a href="#" className="hover:text-primary hover:underline decoration-2 underline-offset-4">DJZS_PROTOCOL</a>
            <a href="#" className="hover:text-primary hover:underline decoration-2 underline-offset-4">ANYTYPE_VAULT</a>
            <a href="#" className="hover:text-primary hover:underline decoration-2 underline-offset-4">EXPLORER</a>
            <a href="#" className="text-primary">CONNECT_WALLET [OFFLINE]</a>
          </nav>
        </div>
      </header>

      {/* Marquee */}
      <Marquee text="/// YOUR NAME IS YOUR AGENT /// NO CLOUD /// LOCAL FIRST /// PAY PER INSIGHT /// " />

      <main className="container mx-auto px-4 py-12 md:py-24 space-y-32">
        {/* Hero Section */}
        <section className="relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block border border-primary px-2 py-1 text-xs font-mono text-primary">
                SYSTEM_STATUS: MINTING LIVE
              </div>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter font-serif">
                YOUR<br />
                <span className="text-outline text-transparent stroke-foreground stroke-2" style={{ WebkitTextStroke: "2px hsl(var(--foreground))" }}>NAME IS</span><br />
                YOUR AGENT
              </h1>
              <p className="text-xl md:text-2xl font-mono text-muted-foreground max-w-md border-l-4 border-primary pl-6">
                Claim your Username. Spawn your AI Agent. Own your Intelligence. 
                <br/><span className="text-primary text-sm mt-2 block">POWERED BY AZTEC & DJZS</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <BrutalButton onClick={() => document.getElementById('mint')?.scrollIntoView({ behavior: 'smooth' })}>
                  CLAIM_USERNAME
                </BrutalButton>
                <a href="https://docs.aztec.network/try_testnet" target="_blank" rel="noreferrer">
                  <BrutalButton variant="outline">
                    TESTNET_DOCS
                  </BrutalButton>
                </a>
              </div>
            </div>
            
            {/* Hero Visual */}
            <div className="relative aspect-square md:aspect-auto md:h-[600px] border-2 border-border bg-secondary/20 flex items-center justify-center overflow-hidden group">
               {/* Abstract Grid Animation */}
               <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-px bg-border opacity-20 pointer-events-none">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="bg-background hover:bg-primary transition-colors duration-0" />
                  ))}
               </div>
               <div className="absolute right-0 top-0 bottom-0 w-12 border-l-2 border-border flex flex-col items-center justify-center py-4 overflow-hidden bg-background z-20">
                  <div className="[writing-mode:vertical-rl] font-mono text-xs tracking-widest uppercase whitespace-nowrap animate-pulse text-primary">
                    /// DJZS PROTOCOL ACTIVE ///
                  </div>
               </div>
               <div className="relative z-10 text-center space-y-4 p-8 bg-background border-2 border-foreground rotate-3 transition-transform group-hover:rotate-0">
                 <GlitchText text="DJZS" className="text-7xl md:text-9xl block" />
                 <div className="font-mono text-sm">AGENT_ID: UNASSIGNED</div>
                 <div className="w-full h-2 bg-primary mt-4 loading-bar" />
               </div>
            </div>
          </div>
        </section>

        {/* Agent Console Section */}
        <section className="space-y-8">
           <div className="text-center space-y-2">
             <h2 className="text-3xl md:text-5xl font-black uppercase">Agent Console</h2>
             <p className="font-mono text-muted-foreground">Interact with the DJZS Protocol Intelligence Layer</p>
           </div>
           <DjzsAgentConsole />
        </section>

        {/* How It Works Grid */}
        <section className="space-y-12">
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
              }
            ].map((item, i) => (
              <BrutalCard key={i} className="bg-card hover:-translate-y-2 transition-transform duration-200">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-4xl font-bold text-primary opacity-50">{item.step}</span>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold uppercase mb-2">{item.title}</h3>
                <p className="font-mono text-sm text-muted-foreground">{item.desc}</p>
              </BrutalCard>
            ))}
          </div>
        </section>

        {/* Pricing Table */}
        <section className="border-2 border-border bg-background p-8 md:p-12">
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
        </section>

        {/* Mint Section */}
        <section id="mint" className="max-w-3xl mx-auto relative">
          <BrutalCard className="bg-background p-8 md:p-12 space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-black uppercase">Claim Your Identity</h2>
              <p className="font-mono text-muted-foreground">Mint your Username NFT to spawn your DJZS Agent.</p>
            </div>

            <form onSubmit={handleMint} className="space-y-6">
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

              <div className="space-y-2">
                <Label htmlFor="wallet" className="font-mono text-xs uppercase">Aztec Wallet Address</Label>
                <Input 
                  id="wallet"
                  placeholder="0x..." 
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                  className="font-mono text-lg p-6 border-2 border-border rounded-none focus-visible:ring-0 focus-visible:border-primary bg-secondary/10"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 border-2 border-border bg-secondary/5 text-center cursor-pointer hover:border-primary hover:bg-primary/10 transition-colors">
                    <div className="font-mono text-xs text-muted-foreground">MINT FEE</div>
                    <div className="text-xl font-bold">0.05 ETH</div>
                 </div>
                 <div className="p-4 border-2 border-border bg-secondary/5 text-center cursor-pointer hover:border-primary hover:bg-primary/10 transition-colors">
                    <div className="font-mono text-xs text-muted-foreground">STORAGE</div>
                    <div className="text-xl font-bold">LOCAL/IPFS</div>
                 </div>
              </div>

              <BrutalButton 
                type="submit" 
                className="w-full py-6 text-xl"
                disabled={isMinting}
              >
                {isMinting ? "INITIALIZING_AGENT..." : "MINT_IDENTITY_NFT"}
              </BrutalButton>
              
              <p className="text-xs font-mono text-center text-muted-foreground">
                * Requires Aztec Testnet connection. Your agent will be deployed to your local environment.
              </p>
            </form>
          </BrutalCard>
        </section>

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
            <div className="flex gap-4">
              <span>AGENT_NET: ONLINE</span>
              <span>ZONES: 10</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
