import React from "react";
import { Link, useLocation } from "wouter";
import { Wallet, Home, User, Search, FlaskConical, ExternalLink } from "lucide-react";
import { BrutalButton } from "@/components/ui/brutalist";
import { MobileMenu } from "@/components/mobile-menu";
import { cn } from "@/lib/utils";
import logoImage from "@assets/1b6b08c2244019f727791915b0c3fb41385d1c9b9769daea763eb6276f1b5_1765335205229.jpeg";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  external?: boolean;
}

const navItems: NavItem[] = [
  { label: "HOME", href: "/", icon: Home },
  { label: "EXPLORER", href: "/explorer", icon: Search },
  { label: "ANYTYPE_VAULT", href: "https://invite.any.coop/bafybeiebtlepvip6x6hmu3aao3cdn4cfampgd2vvgx7i7gah5phc43euqm#A2Hx7HDnZiTZMZxSbABvEVidAmMytp1YdhfdisNbxTMZ", icon: ExternalLink, external: true },
  { label: "API_TEST", href: "/api-test", icon: FlaskConical },
];

export const Navigation = () => {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-[50] w-full border-b-2 border-border bg-background/90 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <img 
              src={logoImage} 
              alt="Username DAO" 
              className="h-8 w-8 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-mono text-xl font-bold tracking-tighter group-hover:text-primary transition-colors">
              USERNAME_DAO
            </span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 font-mono text-sm">
          {navItems.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            
            if (item.external) {
              return (
                <a 
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-primary transition-colors"
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
                  "relative px-2 py-1 transition-all hover:text-primary",
                  isActive && "text-primary font-bold"
                )}
                data-testid={`nav-${item.label.toLowerCase().replace('_', '-')}`}
              >
                {item.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </Link>
            );
          })}
          
          <Link 
            href="/profile"
            className={cn(
              "inline-flex items-center h-8 text-xs px-4 border-2 border-primary bg-background hover:bg-primary/10 transition-colors",
              location === "/profile" && "bg-primary/20"
            )}
            data-testid="nav-profile"
          >
            <Wallet className="w-3 h-3 mr-2" />
            PROFILE
          </Link>
        </nav>
        
        <MobileMenu />
      </div>
    </header>
  );
};
