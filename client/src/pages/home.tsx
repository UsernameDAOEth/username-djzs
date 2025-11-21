import React, { useState } from "react";
import { motion } from "framer-motion";
import { BrutalButton, BrutalCard, Marquee, GlitchText } from "@/components/ui/brutalist";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import noiseTexture from "@assets/generated_images/raw_gritty_noise_texture_overlay.png";

export default function Home() {
  const { toast } = useToast();
  const [isMinting, setIsMinting] = useState(false);
  const [wallet, setWallet] = useState("");

  const handleMint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet) {
      toast({
        title: "ERROR: MISSING_WALLET",
        description: "PLEASE PROVIDE A VALID ADDRESS TO PROCEED.",
        variant: "destructive",
      });
      return;
    }
    setIsMinting(true);
    // Simulate minting
    setTimeout(() => {
      setIsMinting(false);
      toast({
        title: "TRANSACTION_BROADCASTED",
        description: "HASH: 0x7f...92a1 // BLOCK: PENDING",
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
            <span className="font-mono text-xl font-bold tracking-tighter">AZTEC_PROTO_V1</span>
          </div>
          <nav className="hidden md:flex gap-8 font-mono text-sm">
            <a href="#" className="hover:text-primary hover:underline decoration-2 underline-offset-4">DOCS</a>
            <a href="#" className="hover:text-primary hover:underline decoration-2 underline-offset-4">EXPLORER</a>
            <a href="#" className="hover:text-primary hover:underline decoration-2 underline-offset-4">FAUCET</a>
            <a href="#" className="text-primary">CONNECT_WALLET [OFFLINE]</a>
          </nav>
        </div>
      </header>

      {/* Marquee */}
      <Marquee text="/// PRIVACY IS NOT A CRIME /// TESTNET LIVE /// MINT GENESIS BLOCK /// " />

      <main className="container mx-auto px-4 py-12 md:py-24 space-y-32">
        {/* Hero Section */}
        <section className="relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block border border-primary px-2 py-1 text-xs font-mono text-primary">
                SYSTEM_STATUS: OPERATIONAL
              </div>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter font-serif">
                RAW<br />
                <span className="text-outline text-transparent stroke-foreground stroke-2" style={{ WebkitTextStroke: "2px hsl(var(--foreground))" }}>INFRA</span><br />
                STRUCTURE
              </h1>
              <p className="text-xl md:text-2xl font-mono text-muted-foreground max-w-md border-l-4 border-primary pl-6">
                Build privacy-first decentralized applications on the Aztec Network. No compromises.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <BrutalButton onClick={() => document.getElementById('mint')?.scrollIntoView({ behavior: 'smooth' })}>
                  START_MINTING
                </BrutalButton>
                <a href="https://docs.aztec.network/try_testnet" target="_blank" rel="noreferrer">
                  <BrutalButton variant="outline">
                    VIEW_TESTNET_DOCS
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
                    /// ENCRYPTED CONNECTION ESTABLISHED ///
                  </div>
               </div>
               <div className="relative z-10 text-center space-y-4 p-8 bg-background border-2 border-foreground rotate-3 transition-transform group-hover:rotate-0">
                 <GlitchText text="GENESIS" className="text-5xl md:text-7xl block" />
                 <div className="font-mono text-sm">BATCH: #0001A</div>
                 <div className="w-full h-2 bg-primary mt-4 loading-bar" />
               </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 border-2 border-border divide-x-2 divide-y-2 md:divide-y-0 divide-border bg-card text-card-foreground">
          {[
            { label: "BLOCK_HEIGHT", value: "8,932,101" },
            { label: "AVG_GAS", value: "12 GWEI" },
            { label: "ACTIVE_NODES", value: "1,204" },
            { label: "PRIVACY_POOL", value: "$42.5M" },
          ].map((stat, i) => (
            <div key={i} className="p-8 space-y-2 hover:bg-secondary/50 transition-colors group cursor-crosshair">
              <div className="text-xs font-mono text-muted-foreground group-hover:text-primary">{stat.label}</div>
              <div className="text-2xl md:text-4xl font-bold font-mono">{stat.value}</div>
            </div>
          ))}
        </section>

        {/* Mint Section */}
        <section id="mint" className="max-w-3xl mx-auto relative">
          <BrutalCard className="bg-background p-8 md:p-12 space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-black uppercase">Mint Access Token</h2>
              <p className="font-mono text-muted-foreground">Enter your Ethereum address to mint a testnet access token.</p>
            </div>

            <form onSubmit={handleMint} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="wallet" className="font-mono text-xs uppercase">Wallet Address</Label>
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
                    <div className="font-mono text-xs text-muted-foreground">PRICE</div>
                    <div className="text-xl font-bold">0.05 ETH</div>
                 </div>
                 <div className="p-4 border-2 border-border bg-secondary/5 text-center cursor-pointer hover:border-primary hover:bg-primary/10 transition-colors">
                    <div className="font-mono text-xs text-muted-foreground">LIMIT</div>
                    <div className="text-xl font-bold">1 PER WALLET</div>
                 </div>
              </div>

              <BrutalButton 
                type="submit" 
                className="w-full py-6 text-xl"
                disabled={isMinting}
              >
                {isMinting ? "PROCESSING_TRANSACTION..." : "MINT_TOKEN_NOW"}
              </BrutalButton>
              
              <p className="text-xs font-mono text-center text-muted-foreground">
                * By minting, you agree to the testnet terms of service. Gas fees apply.
              </p>
            </form>
          </BrutalCard>
        </section>

        {/* Footer */}
        <footer className="border-t-2 border-border pt-12 pb-8">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-4">
              <div className="h-8 w-8 bg-foreground" />
              <p className="font-mono text-sm text-muted-foreground max-w-xs">
                Aztec is a privacy-first zero-knowledge rollup on Ethereum.
              </p>
            </div>
            <div className="col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8 font-mono text-sm">
               <div className="space-y-4">
                 <h4 className="font-bold uppercase text-primary">Protocol</h4>
                 <ul className="space-y-2 text-muted-foreground">
                   <li><a href="#" className="hover:text-foreground">Documentation</a></li>
                   <li><a href="#" className="hover:text-foreground">GitHub</a></li>
                   <li><a href="#" className="hover:text-foreground">Audits</a></li>
                 </ul>
               </div>
               <div className="space-y-4">
                 <h4 className="font-bold uppercase text-primary">Community</h4>
                 <ul className="space-y-2 text-muted-foreground">
                   <li><a href="#" className="hover:text-foreground">Discord</a></li>
                   <li><a href="#" className="hover:text-foreground">Twitter</a></li>
                   <li><a href="#" className="hover:text-foreground">Forum</a></li>
                 </ul>
               </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-muted-foreground">
            <div>© 2025 AZTEC NETWORK. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-4">
              <span>STATUS: ONLINE</span>
              <span>BLOCK: 120491</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
