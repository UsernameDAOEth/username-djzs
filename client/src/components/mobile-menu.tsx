import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Wallet, Home, User, Search, ExternalLink, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: "/", label: "HOME", icon: Home },
    { href: "/explorer", label: "EXPLORER", icon: Search },
    { href: "/profile", label: "PROFILE", icon: User },
    { href: "/api-test", label: "API_TEST", icon: FlaskConical },
    { href: "https://invite.any.coop/bafybeiebtlepvip6x6hmu3aao3cdn4cfampgd2vvgx7i7gah5phc43euqm#A2Hx7HDnZiTZMZxSbABvEVidAmMytp1YdhfdisNbxTMZ", label: "ANYTYPE_VAULT", icon: ExternalLink, external: true },
  ];

  return (
    <div className="md:hidden">
      <button 
        onClick={toggleMenu} 
        className="h-10 w-10 p-0 flex items-center justify-center border border-sky-400 bg-slate-950 text-sky-400 rounded-md relative z-[60]"
        data-testid="button-mobile-menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed inset-0 z-[55] bg-slate-950 backdrop-blur-xl flex flex-col p-6 pt-24 space-y-8 border-l border-sky-500/20"
          >
            {/* Background Grid Effect - Sky Blue */}
            <div className="absolute inset-0 z-[-1] bg-[linear-gradient(rgba(93,173,226,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(93,173,226,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="space-y-2">
                <div className="text-xs font-mono text-sky-400/50 uppercase tracking-widest mb-4 border-b border-sky-500/30 pb-2">/// NAVIGATION</div>
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  const isExternal = (item as any).external;
                  
                  if (isExternal) {
                    return (
                      <a 
                        key={item.label} 
                        href={item.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 p-3 border border-sky-500/30 rounded-md text-slate-300 hover:bg-sky-400 hover:text-slate-900 transition-all cursor-pointer"
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-lg font-bold tracking-tighter">{item.label}</span>
                      </a>
                    );
                  }
                  
                  return (
                    <Link 
                      key={item.label} 
                      href={item.href} 
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-4 p-3 border rounded-md hover:bg-sky-400 hover:text-slate-900 transition-all cursor-pointer",
                        isActive ? "bg-sky-950/50 border-sky-400 text-sky-400" : "text-slate-300 border-sky-500/30"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-lg font-bold tracking-tighter">{item.label}</span>
                      {isActive && <div className="ml-auto w-2 h-2 bg-sky-400 rounded-full animate-pulse" />}
                    </Link>
                  );
                })}
            </div>

            <div className="space-y-3">
                <div className="text-xs font-mono text-sky-400/50 uppercase tracking-widest border-b border-sky-500/30 pb-2">/// STATUS</div>
                <div className="bg-black/50 border border-sky-500/30 rounded-md p-3 space-y-2">
                    <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-slate-400">AGENT_STATUS</span>
                        <span className="bg-sky-400 text-slate-900 px-2 py-1 font-bold rounded">FOCUSED</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-mono text-slate-400">
                        <span>LAST_TRAINED</span>
                        <span className="text-sky-400">11:11:30 AM</span>
                    </div>
                </div>
            </div>

            <div className="mt-auto space-y-3">
                <div className="text-xs font-mono text-sky-400/50 uppercase tracking-widest border-b border-sky-500/30 pb-2">/// SYSTEM</div>
                <div className="p-3 border border-dashed border-sky-500/30 rounded-md bg-sky-950/30 space-y-2">
                    <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-slate-500">NETWORK</span>
                        <div className="flex items-center gap-1 text-sky-400">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"/>
                            BASE MAINNET
                        </div>
                    </div>
                    <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-slate-500">WALLET</span>
                        <span className="text-sky-400">0x7a...3b91</span>
                    </div>
                </div>

                <button 
                  className="w-full py-3 border border-sky-400 rounded-md font-mono text-sm font-bold text-sky-200 bg-sky-950/70 hover:bg-sky-900/70 transition flex items-center justify-center" 
                  onClick={() => setIsOpen(false)}
                >
                    <Wallet className="w-4 h-4 mr-2" />
                    CONNECT_WALLET
                </button>

                <div className="text-center pt-2 border-t border-sky-500/30">
                    <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                        DJZS PROTOCOL v1.0.0<br/>
                        MOBILE INTERFACE
                    </p>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
