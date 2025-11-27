import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Terminal, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Share2, 
  Copy, 
  ExternalLink, 
  Activity, 
  Database, 
  Wallet,
  Grid,
  Layers,
  Hash
} from "lucide-react";
import { BrutalButton, BrutalCard, GlitchText } from "@/components/ui/brutalist";
import { ThreeDCard } from "@/components/3d-card";
import { WireframeCore } from "@/components/wireframe-core";
import { CyberGrid } from "@/components/cyber-grid";
import { UserProfile } from "@/types/user-profile";
import { MobileMenu } from "@/components/mobile-menu";

export default function Profile() {
  // Mock User Data matching the schema
  const user: UserProfile = {
    id: "user-123",
    username: "djzs",
    displayName: "DJZS Protocol",
    bio: "Decentralized Intelligence",
    ens: "djzs.eth",
    ethAddress: "0x7a2...3b91",
    createdAt: "2024-11-27T14:20:01Z",
    agent: {
      name: "DJZS_AGENT",
      level: 1,
      xp: 402,
      mood: "FOCUSED",
      lastTrainedAt: new Date().toISOString(),
    },
    nfts: [
      {
        tokenId: "8842",
        contract: "0x7a2...3b91",
        chain: "Base Mainnet",
        mintedAt: "2024-11-27T14:20:01Z"
      }
    ],
    zones: [
      { zoneId: "1", title: "Zone 01 – DYOR", entryCount: 3, publicCount: 0, lastUpdatedAt: new Date().toISOString() },
      { zoneId: "2", title: "Zone 02 – Decentralized iD", entryCount: 1, publicCount: 0, lastUpdatedAt: new Date().toISOString() },
      { zoneId: "3", title: "Zone 03 – Blockchain Testnet", entryCount: 0, publicCount: 0 }
    ],
    achievements: [
      { id: "1", title: "EARLY ADOPTER", description: "Joined before 2026", awardedAt: "2024-11-27" }
    ]
  };
  
  const mainNft = user.nfts?.[0];

  return (
    <div className="min-h-screen bg-black text-primary font-mono selection:bg-primary selection:text-black relative overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CyberGrid />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]" />
      </div>

      {/* Navigation Bar (Simplified) */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-primary bg-black/90 backdrop-blur-md h-16 flex items-center justify-between px-6">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 bg-primary text-black flex items-center justify-center font-bold text-xl group-hover:rotate-180 transition-transform duration-500">
              D
            </div>
            <span className="font-bold tracking-tighter text-xl group-hover:text-white transition-colors">
              USERNAME<span className="text-primary">DAO</span>
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
           <div className="hidden md:flex items-center gap-6 text-[10px] uppercase tracking-widest text-primary/70">
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> {mainNft?.chain || "BASE MAINNET"}</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> CONNECTED</span>
           </div>
           <BrutalButton className="h-8 text-xs px-4">
              <Wallet className="w-3 h-3 mr-2" />
              {user.ethAddress?.slice(0,8)}...
           </BrutalButton>
        </div>
        <MobileMenu />
      </nav>

      <main className="relative z-10 pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
        
        {/* Profile Header Section */}
        <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Left Column: The NFT Card */}
            <div className="lg:col-span-4 space-y-4">
                <ThreeDCard className="relative aspect-[3/4] w-full border-2 border-primary bg-black/80 group overflow-hidden">
                    {/* Card Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6 z-20">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 border border-primary/50 rounded-full flex items-center justify-center">
                                <Cpu className="w-6 h-6 animate-pulse" />
                            </div>
                            <div className="text-xs font-mono border border-primary px-2 py-1 bg-black/50 backdrop-blur-sm">
                                #{mainNft?.tokenId}
                            </div>
                        </div>
                        
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[-1]">
                            <WireframeCore className="w-64 h-64 opacity-50" />
                        </div>

                        <div className="space-y-2 bg-black/60 backdrop-blur-md p-4 border-t border-primary/30 -mx-6 -mb-6">
                            <h1 className="text-2xl font-black tracking-tighter glitch-text">
                                {user.ens || user.username}
                            </h1>
                            <div className="flex items-center gap-2 text-[10px] uppercase text-primary/70">
                                <span className="bg-primary/20 px-1">GEN {user.agent?.level}</span>
                                <span>•</span>
                                <span>{user.zones?.[0]?.title}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Scanline Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(178,255,89,0.05)_50%)] bg-[length:100%_4px] pointer-events-none z-30" />
                </ThreeDCard>

                <div className="flex gap-2">
                    <BrutalButton className="flex-1 text-xs py-4" variant="outline">
                        <Share2 className="w-3 h-3 mr-2" />
                        SHARE CARD
                    </BrutalButton>
                    <BrutalButton className="flex-1 text-xs py-4" variant="outline">
                        <ExternalLink className="w-3 h-3 mr-2" />
                        OPENSEA
                    </BrutalButton>
                </div>
            </div>

            {/* Right Column: Stats & Terminal */}
            <div className="lg:col-span-8 space-y-6">
                
                {/* User Bio / Status */}
                <BrutalCard className="p-6 bg-black/80 backdrop-blur-sm border-primary/50">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-primary/20 pb-4">
                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-widest flex items-center gap-3">
                                AGENT STATUS
                                <span className="text-xs bg-primary text-black px-2 py-1 font-bold align-middle">{user.agent?.mood || "ACTIVE"}</span>
                            </h2>
                            <p className="text-xs text-primary/50 font-mono mt-1">LAST TRAINED: {new Date(user.agent?.lastTrainedAt || "").toLocaleTimeString()}</p>
                        </div>
                        <div className="flex gap-4 text-right">
                            <div>
                                <div className="text-[10px] uppercase text-primary/50">XP</div>
                                <div className="text-xl font-bold">{user.agent?.xp}</div>
                            </div>
                            <div>
                                <div className="text-[10px] uppercase text-primary/50">BALANCE</div>
                                <div className="text-xl font-bold">402.00 <span className="text-xs">x402</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                         <div className="bg-primary/5 border border-primary/20 p-4 hover:bg-primary/10 transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start mb-2">
                                <Database className="w-5 h-5 text-primary/70 group-hover:text-primary" />
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"/>
                            </div>
                            <div className="text-[10px] uppercase text-primary/50">STORAGE USED</div>
                            <div className="text-lg font-bold">1.2 GB</div>
                            <div className="w-full bg-primary/20 h-1 mt-2">
                                <div className="bg-primary h-full w-[45%]" />
                            </div>
                         </div>

                         <div className="bg-primary/5 border border-primary/20 p-4 hover:bg-primary/10 transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start mb-2">
                                <Activity className="w-5 h-5 text-primary/70 group-hover:text-primary" />
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"/>
                            </div>
                            <div className="text-[10px] uppercase text-primary/50">TOTAL ENTRIES</div>
                            <div className="text-lg font-bold">{user.zones?.reduce((acc, z) => acc + (z.entryCount || 0), 0)}</div>
                            <div className="text-[10px] text-primary/40">+12 this week</div>
                         </div>

                         <div className="bg-primary/5 border border-primary/20 p-4 hover:bg-primary/10 transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start mb-2">
                                <Grid className="w-5 h-5 text-primary/70 group-hover:text-primary" />
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"/>
                            </div>
                            <div className="text-[10px] uppercase text-primary/50">ZONES ACTIVE</div>
                            <div className="text-lg font-bold">{user.zones?.filter(z => (z.entryCount || 0) > 0).length}/10</div>
                            <div className="flex gap-1 mt-2">
                                {[1,2,3].map(i => <div key={i} className="w-2 h-2 bg-primary" />)}
                                {[1,2,3,4,5,6,7].map(i => <div key={i} className="w-2 h-2 bg-primary/20" />)}
                            </div>
                         </div>
                    </div>
                </BrutalCard>

                {/* Activity Log / Console */}
                <div className="border-2 border-primary/30 bg-black h-64 flex flex-col overflow-hidden relative">
                    <div className="bg-primary/10 p-2 border-b border-primary/30 flex justify-between items-center">
                        <span className="text-[10px] font-bold flex items-center gap-2">
                            <Terminal className="w-3 h-3"/>
                            ACTIVITY_LOG
                        </span>
                        <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-500/50"/>
                            <div className="w-2 h-2 rounded-full bg-yellow-500/50"/>
                            <div className="w-2 h-2 rounded-full bg-green-500/50"/>
                        </div>
                    </div>
                    
                    <div className="p-4 font-mono text-xs space-y-2 overflow-y-auto flex-1 custom-scrollbar">
                        <div className="text-primary/50">--- BEGIN LOG STREAM ---</div>
                        <div className="flex gap-2">
                            <span className="text-primary/50">[{new Date(user.createdAt).toLocaleTimeString()}]</span>
                            <span>Minted "{user.ens}" on {mainNft?.chain}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-primary/50">[{new Date().toLocaleTimeString()}]</span>
                            <span>Activated MCP Bridge v1.0.2</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-primary/50">[{new Date().toLocaleTimeString()}]</span>
                            <span>Synced {user.zones?.reduce((acc, z) => acc + (z.entryCount || 0), 0)} objects to Anytype Vault</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-primary/50">[{new Date().toLocaleTimeString()}]</span>
                            <span>Query executed: "DeFi yield strategies"</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-primary/50">[{new Date().toLocaleTimeString()}]</span>
                            <span>Gas spent: 0.0004 ETH</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-primary/50">[{new Date().toLocaleTimeString()}]</span>
                            <span>Zone 02 Unlocked: Decentralized Identity</span>
                        </div>
                        <div className="text-primary animate-pulse">_</div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Inventory / Badges Section */}
        <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-primary/30 pb-2">
                <h3 className="text-xl font-black uppercase flex items-center gap-2">
                    <Layers className="w-5 h-5" />
                    ACHIEVEMENTS
                </h3>
                <div className="text-xs font-mono text-primary/50">SHOWING ALL ITEMS</div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {user.achievements?.map((item) => (
                    <div key={item.id} className="aspect-square border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary transition-all cursor-pointer group relative overflow-hidden p-4 flex flex-col items-center justify-center gap-2">
                        <Hash className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors" />
                        <div className="text-[10px] uppercase font-bold text-center opacity-50 group-hover:opacity-100">
                            {item.title}
                        </div>
                        <div className="absolute top-2 right-2 w-2 h-2 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ))}
                
                 {/* Empty Slots */}
                 {[1, 2, 3, 4].map((item) => (
                    <div key={`empty-${item}`} className="aspect-square border border-primary/10 bg-transparent flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary/10" />
                    </div>
                ))}
            </div>
        </section>

      </main>
    </div>
  );
}