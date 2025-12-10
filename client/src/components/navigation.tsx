import React from "react";
import { Link, useLocation } from "wouter";
import { Wallet, ExternalLink } from "lucide-react";
import { MobileMenu } from "@/components/mobile-menu";
import { cn } from "@/lib/utils";
import logoImage from "@assets/1b6b08c2244019f727791915b0c3fb41385d1c9b9769daea763eb6276f1b5_1765335205229.jpeg";

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

const navItems: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "EXPLORER", href: "/explorer" },
  { label: "ANYTYPE_VAULT", href: "https://invite.any.coop/bafybeiebtlepvip6x6hmu3aao3cdn4cfampgd2vvgx7i7gah5phc43euqm#A2Hx7HDnZiTZMZxSbABvEVidAmMytp1YdhfdisNbxTMZ", external: true },
  { label: "API_TEST", href: "/api-test" },
];

export const Navigation = () => {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-500/20 bg-slate-950/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex h-14 items-center justify-between px-6">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <img 
              src={logoImage} 
              alt="Username DAO" 
              className="h-8 w-8 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-mono text-sm font-bold tracking-tight text-slate-100 group-hover:text-cyan-400 transition-colors">
              USERNAME_DAO
            </span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs">
          {navItems.map((item) => {
            const isActive = location === item.href;
            
            if (item.external) {
              return (
                <a 
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors"
                  data-testid={`nav-${item.label.toLowerCase().replace('_', '-')}`}
                >
                  {item.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              );
            }
            
            return (
              <Link 
                key={item.label} 
                href={item.href}
                className={cn(
                  "relative px-2 py-1 transition-all",
                  isActive 
                    ? "text-cyan-400 font-bold" 
                    : "text-slate-300 hover:text-cyan-400"
                )}
                data-testid={`nav-${item.label.toLowerCase().replace('_', '-')}`}
              >
                {item.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
                )}
              </Link>
            );
          })}
          
          <Link 
            href="/profile"
            className={cn(
              "inline-flex items-center gap-2 rounded-md border border-cyan-400 bg-cyan-950/70 px-4 py-2 text-xs font-semibold text-cyan-200 hover:bg-cyan-900/70 transition",
              location === "/profile" && "bg-cyan-900/70"
            )}
            data-testid="nav-profile"
          >
            <Wallet className="w-3 h-3" />
            PROFILE
          </Link>
        </nav>
        
        <MobileMenu />
      </div>
    </header>
  );
};
