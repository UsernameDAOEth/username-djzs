import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import logoImage from "@assets/1b6b08c2244019f727791915b0c3fb41385d1c9b9769daea763eb6276f1b5_1765335205229.jpeg";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans relative">
      <Navigation />
      
      <main>
        <HeroSection />
        <PartnersBar />
        <FeaturesSection />
        <UseCasesSection />
        <CapabilitiesSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="px-6 pt-32 pb-24 lg:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1]"
        >
          Your identity layer for
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
            decentralized intelligence
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="mt-8 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          Username DAO × DJZS Protocol enables you to mint a username, spawn personal AI agents, 
          and own your intelligence locally. No cloud. Pay per insight.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <button
            data-testid="button-claim-username"
            className="px-8 py-3.5 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Claim username
          </button>
          <Link
            href="/explorer"
            className="px-8 py-3.5 border border-gray-700 text-white font-medium rounded-lg hover:bg-white/5 transition-colors"
            data-testid="link-explore"
          >
            Explore agents
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function PartnersBar() {
  return (
    <section className="px-6 py-12 border-t border-gray-800/50">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-sm text-gray-500 font-mono tracking-wide">
          // Powered by Anytype · Irys Network · Base · x402 Protocol
        </p>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="px-6 py-24 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm text-gray-500 font-mono tracking-wide mb-4">
            // Local-first and sovereign
          </p>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight">
            Purpose-built for
            <br />
            personal AI agents
          </h2>
        </div>
        
        <p className="text-lg text-gray-400 max-w-3xl mx-auto text-center leading-relaxed">
          Current AI systems lock your data in the cloud. Username DAO × DJZS enables 
          you to own your intelligence graph locally, sync with Anytype Vault, 
          and archive permanently to Irys Network.
        </p>
      </div>
    </section>
  );
}

function UseCasesSection() {
  const useCases = [
    {
      num: "01",
      title: "Private journaling",
      description: "Reflect and journal with AI assistance. All data stays in your local Anytype Vault.",
    },
    {
      num: "02",
      title: "Research & DYOR",
      description: "Deep research across 10 zones: DeFi, DeSci, RWA, AI, and more. Citations included.",
    },
    {
      num: "03",
      title: "Onchain publishing",
      description: "Archive insights permanently to Irys Network. Publish to Paragraph with one click.",
    },
    {
      num: "04",
      title: "Agent spawning",
      description: "Mint a username NFT and spawn your personal AI agent bound to your identity.",
    },
    {
      num: "05",
      title: "Pay per insight",
      description: "No subscriptions. Micropayments via x402 protocol for each query. Own your costs.",
    },
    {
      num: "06",
      title: "MCP integration",
      description: "Connect to Anytype via Model Context Protocol. Your vault, your data, your agent.",
    },
  ];

  return (
    <section className="px-6 py-24 lg:px-12 border-t border-gray-800/50">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16">
          <div>
            <p className="text-sm text-gray-500 font-mono tracking-wide mb-4">
              // Developer-first design
            </p>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight">
              Performant & scalable
              <br />
              for any use case
            </h2>
          </div>
          <Link
            href="/api-test"
            className="text-sm text-gray-400 hover:text-white transition-colors font-mono"
            data-testid="link-api-docs"
          >
            View API docs →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map((uc) => (
            <motion.div
              key={uc.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="group p-6 border border-gray-800 rounded-xl hover:border-gray-700 hover:bg-white/[0.02] transition-all cursor-pointer"
            >
              <span className="text-sm font-mono text-orange-400">{uc.num}</span>
              <h3 className="mt-3 text-lg font-medium text-white">{uc.title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{uc.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  const capabilities = [
    {
      num: "01",
      title: "Username NFT identity",
      description: "Your username is your agent. Mint once, own forever. Bound to your wallet on Base.",
    },
    {
      num: "02",
      title: "10 research zones",
      description: "DYOR, DID, Testnet, DeSo, RWA, DePIN, DeFi, DeAI, DeSci, and Time. Each zone has specialized prompts.",
    },
    {
      num: "03",
      title: "4 processing modes",
      description: "Quick, Journal, Research, and Alpha. Each mode optimizes for different output styles.",
    },
    {
      num: "04",
      title: "Anytype Vault sync",
      description: "Local-first data storage via MCP bridge. Your journals never leave your device unless you publish.",
    },
    {
      num: "05",
      title: "Irys permanent storage",
      description: "Archive important insights to Irys Network. Immutable, verifiable, and always accessible.",
    },
    {
      num: "06",
      title: "Web3.bio resolution",
      description: "Universal identity lookup across ENS, Farcaster, Lens, Basenames, and more.",
    },
  ];

  return (
    <section className="px-6 py-24 lg:px-12 border-t border-gray-800/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight">
            Designed for real-world use
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((cap, idx) => (
            <motion.div
              key={cap.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="flex gap-4"
            >
              <span className="text-2xl font-light text-gray-700">{cap.num}</span>
              <div>
                <h3 className="text-lg font-medium text-white">{cap.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{cap.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const [username, setUsername] = useState("");
  const [wallet, setWallet] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [minted, setMinted] = useState(false);
  const [minting, setMinting] = useState(false);

  const handleConnect = async () => {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      alert("Please install MetaMask or another Web3 wallet.");
      return;
    }
    setConnecting(true);
    try {
      const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      if (accounts?.[0]) {
        setWallet(accounts[0]);
        setWalletConnected(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setConnecting(false);
    }
  };

  const handleMint = async () => {
    if (!username.trim() || !walletConnected) return;
    setMinting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setMinted(true);
    setMinting(false);
  };

  return (
    <section className="px-6 py-24 lg:px-12 border-t border-gray-800/50">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 border border-gray-800 rounded-2xl bg-gradient-to-b from-gray-900/50 to-transparent"
        >
          <div className="flex items-center gap-4 mb-6">
            <img src={logoImage} alt="Username DAO" className="h-12 w-12 rounded-lg" />
            <div>
              <h3 className="text-xl font-medium">Get started</h3>
              <p className="text-sm text-gray-500">Claim your username and spawn your agent</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={handleConnect}
              disabled={walletConnected || connecting}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                walletConnected
                  ? "bg-green-900/30 border border-green-700 text-green-400"
                  : "bg-white/5 border border-gray-700 text-white hover:bg-white/10"
              }`}
              data-testid="button-connect-wallet"
            >
              {connecting ? "Connecting..." : walletConnected ? `Connected: ${wallet.slice(0, 6)}...${wallet.slice(-4)}` : "Connect wallet"}
            </button>
            
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              disabled={!walletConnected}
              className="w-full px-4 py-3 bg-transparent border border-gray-800 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-gray-600 disabled:opacity-50"
              data-testid="input-username"
            />
            
            <button
              onClick={handleMint}
              disabled={!walletConnected || !username.trim() || minted || minting}
              className={`w-full py-3 font-medium rounded-lg transition-colors ${
                minted
                  ? "bg-green-900/30 border border-green-700 text-green-400"
                  : "bg-white text-black hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
              data-testid="button-mint"
            >
              {minting ? "Minting..." : minted ? `@${username} minted ✓` : "Mint username"}
            </button>
          </div>
          
          <p className="mt-6 text-xs text-gray-600 text-center">
            Username NFTs are minted on Base. Gas fees apply.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-16 lg:px-12 border-t border-gray-800/50">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-sm font-medium text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/explorer" className="hover:text-white transition-colors" data-testid="link-footer-explorer">Explorer</Link></li>
              <li><Link href="/profile" className="hover:text-white transition-colors" data-testid="link-footer-profile">Profile</Link></li>
              <li><Link href="/api-test" className="hover:text-white transition-colors" data-testid="link-footer-api">API Test</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-4">Protocol</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="https://anytype.io" target="_blank" rel="noopener" className="hover:text-white transition-colors" data-testid="link-anytype">Anytype</a></li>
              <li><a href="https://irys.xyz" target="_blank" rel="noopener" className="hover:text-white transition-colors" data-testid="link-irys">Irys Network</a></li>
              <li><a href="https://base.org" target="_blank" rel="noopener" className="hover:text-white transition-colors" data-testid="link-base">Base</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors" data-testid="link-docs">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="link-github">GitHub</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-4">Social</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors" data-testid="link-twitter">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="link-discord">Discord</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-gray-800/50">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Username DAO" className="h-8 w-8 rounded" />
            <span className="text-sm text-gray-500">Username DAO × DJZS Protocol</span>
          </div>
          <p className="text-xs text-gray-600">
            © 2025 Username DAO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
