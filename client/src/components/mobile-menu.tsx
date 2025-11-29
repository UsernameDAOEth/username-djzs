import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShieldCheck, Wallet, Terminal, Home, User } from "lucide-react";
import { BrutalButton } from "@/components/ui/brutalist";
import { cn } from "@/lib/utils";

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: "/", label: "HOME", icon: Home },
    { href: "/profile", label: "PROFILE", icon: User },
    { href: "/api-test", label: "API_TEST", icon: Terminal },
    { href: "#", label: "DJZS_PROTOCOL", icon: ShieldCheck },
  ];

  return (
    <div className="md:hidden">
      <BrutalButton 
        onClick={toggleMenu} 
        className="fixed top-4 right-4 z-50 h-10 w-10 p-0 flex items-center justify-center border-2 border-primary bg-black text-primary shadow-[4px_4px_0px_rgba(178,255,89,0.5)]"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </BrutalButton>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col p-6 pt-24 space-y-8 border-l-2 border-primary"
          >
            {/* Background Grid Effect */}
            <div className="absolute inset-0 z-[-1] bg-[linear-gradient(rgba(178,255,89,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(178,255,89,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="space-y-2">
                <div className="text-xs font-mono text-primary/50 uppercase tracking-widest mb-4 border-b border-primary/30 pb-2">Navigation</div>
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href;
                  return (
                    <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)}>
                      <div className={cn(
                        "flex items-center gap-4 p-4 border border-primary/20 hover:bg-primary hover:text-black transition-all cursor-pointer group mb-2",
                        isActive ? "bg-primary/10 border-primary text-primary" : "text-primary/70"
                      )}>
                        <Icon className="w-6 h-6" />
                        <span className="text-xl font-black tracking-tighter">{item.label}</span>
                        {isActive && <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse" />}
                      </div>
                    </Link>
                  );
                })}
            </div>

            <div className="mt-auto space-y-6">
                <div className="p-4 border-2 border-dashed border-primary/30 bg-primary/5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase text-primary/50">NETWORK STATUS</span>
                        <div className="flex items-center gap-1 text-[10px] text-primary">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                            BASE MAINNET
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase text-primary/50">WALLET</span>
                        <span className="font-mono text-xs text-primary">0x7a...3b91</span>
                    </div>
                </div>

                <BrutalButton className="w-full py-6 text-lg" onClick={() => setIsOpen(false)}>
                    <Wallet className="w-5 h-5 mr-2" />
                    CONNECT WALLET
                </BrutalButton>

                <div className="text-center">
                    <p className="font-mono text-[10px] text-primary/30">
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
