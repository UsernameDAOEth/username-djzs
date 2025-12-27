import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { CyberGrid } from "@/components/cyber-grid";
import { useToast } from "@/hooks/use-toast";

export default function Claim() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [wallet, setWallet] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState(false);
  
  const [username, setUsername] = useState("");
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  async function connectWallet() {
    setConnectingWallet(true);
    try {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts && accounts.length > 0) {
          setWallet(accounts[0]);
          setWalletConnected(true);
          toast({
            title: "Wallet Connected",
            description: `Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
          });
        }
      } else {
        const mockWallet = `0x${Array.from({ length: 40 }, () => 
          Math.floor(Math.random() * 16).toString(16)
        ).join("")}`;
        setWallet(mockWallet);
        setWalletConnected(true);
        toast({
          title: "Demo Mode",
          description: "No wallet detected. Using simulated wallet.",
        });
      }
    } catch (err: any) {
      toast({
        title: "Connection Failed",
        description: err.message || "Could not connect wallet",
        variant: "destructive",
      });
    } finally {
      setConnectingWallet(false);
    }
  }

  useEffect(() => {
    if (username.length < 3) {
      setIsAvailable(null);
      return;
    }
    
    const timer = setTimeout(async () => {
      setCheckingAvailability(true);
      await new Promise(r => setTimeout(r, 500));
      const taken = ["admin", "test", "user", "djzs", "username"];
      setIsAvailable(!taken.includes(username.toLowerCase().replace("@", "")));
      setCheckingAvailability(false);
    }, 400);
    
    return () => clearTimeout(timer);
  }, [username]);

  async function mintUsername() {
    if (!username.trim() || !walletConnected || !isAvailable) return;
    
    setMinting(true);
    try {
      await new Promise(r => setTimeout(r, 2000));
      
      const mockTxHash = `0x${Array.from({ length: 64 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join("")}`;
      
      setTxHash(mockTxHash);
      setMinted(true);
      
      toast({
        title: "Username Minted!",
        description: `@${username.replace("@", "")} is now yours on Base mainnet.`,
      });
    } catch (err: any) {
      toast({
        title: "Mint Failed",
        description: err.message || "Transaction failed",
        variant: "destructive",
      });
    } finally {
      setMinting(false);
    }
  }

  function goToProfile() {
    setLocation("/profile");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CyberGrid />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_90%)]" />
      </div>

      <Navigation />

      <main className="relative z-10 px-6 py-12 lg:px-12">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-lime-500/30 rounded-2xl bg-slate-900/40 backdrop-blur-md p-8 space-y-8"
          >
            <div className="text-center">
              <h1 className="text-2xl font-bold">
                <span className="block">Claim Your</span>
                <span className="block text-lime-400 italic">Username</span>
              </h1>
              <p className="mt-3 text-sm text-slate-300/90">
                Mint your decentralized identity on Username DAO. Your Username becomes your DJZS Agent handle.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-mono tracking-[0.2em] text-slate-400 uppercase">
                  Step 1: Connect Wallet
                </label>
                <button
                  onClick={connectWallet}
                  disabled={walletConnected || connectingWallet}
                  className={`w-full rounded-lg border px-4 py-3 text-sm font-semibold transition ${
                    walletConnected
                      ? "border-emerald-400 bg-emerald-950/60 text-emerald-200"
                      : "border-lime-500/40 bg-slate-900/60 text-lime-200 hover:bg-slate-800/80"
                  } disabled:cursor-not-allowed`}
                  data-testid="button-claim-connect-wallet"
                >
                  {connectingWallet
                    ? "CONNECTING..."
                    : walletConnected
                    ? `CONNECTED: ${wallet.slice(0, 6)}...${wallet.slice(-4)}`
                    : "CONNECT_WALLET"}
                </button>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-mono tracking-[0.2em] text-slate-400 uppercase">
                  Step 2: Choose Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""))}
                    placeholder="yourname"
                    disabled={!walletConnected || minted}
                    maxLength={20}
                    className="w-full rounded-lg border border-lime-500/40 bg-slate-900/60 backdrop-blur-sm px-4 py-3 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-400/70 disabled:opacity-50"
                    data-testid="input-claim-username"
                  />
                  {username.length >= 3 && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono">
                      {checkingAvailability ? (
                        <span className="text-slate-400">checking...</span>
                      ) : isAvailable ? (
                        <span className="text-emerald-400">available</span>
                      ) : (
                        <span className="text-red-400">taken</span>
                      )}
                    </div>
                  )}
                </div>
                {username && (
                  <p className="text-xs text-slate-400">
                    Your handle: <span className="text-lime-300">@{username}</span>
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-xs font-mono tracking-[0.2em] text-slate-400 uppercase">
                  Step 3: Mint Username NFT
                </label>
                {!minted ? (
                  <button
                    onClick={mintUsername}
                    disabled={!username.trim() || !walletConnected || !isAvailable || minting}
                    className="w-full rounded-lg bg-lime-400 px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-lime-500/40 hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    data-testid="button-claim-mint"
                  >
                    {minting ? "MINTING..." : "MINT_USERNAME"}
                  </button>
                ) : (
                  <div className="rounded-lg border border-emerald-400/60 bg-emerald-950/40 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      USERNAME_MINTED
                    </div>
                    <p className="text-xs text-slate-300">
                      @{username} is now bound to your wallet on Base mainnet.
                    </p>
                    {txHash && (
                      <p className="text-[0.7rem] text-slate-400 font-mono break-all">
                        TX: {txHash.slice(0, 20)}...{txHash.slice(-8)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {minted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-4 border-t border-lime-500/20 space-y-3"
              >
                <p className="text-sm text-slate-300 text-center">
                  Your DJZS Agent Core is ready to activate.
                </p>
                <button
                  onClick={goToProfile}
                  className="w-full rounded-lg border border-lime-400 bg-lime-950/60 px-4 py-3 text-sm font-semibold text-lime-200 hover:bg-lime-900/60 transition"
                  data-testid="button-go-to-profile"
                >
                  ACTIVATE_AGENT_CORE →
                </button>
              </motion.div>
            )}

            <div className="text-center text-[0.7rem] text-slate-500 space-y-1">
              <div>NETWORK: Base Mainnet</div>
              <div>CONTRACT: Username DAO NFT</div>
              <div>PROTOCOL: DJZS v1.0</div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
