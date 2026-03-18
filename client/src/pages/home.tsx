import React, { useState, useEffect, useCallback } from 'react';
import { DJZSSections, FoundersFund, MatrixRain } from '../components/DJZSAllSections';

interface Web3BioLink {
  url: string;
  handle: string;
}

interface Web3BioProfile {
  address: string;
  identity: string;
  displayName: string;
  avatar: string | null;
  description: string | null;
  header: string | null;
  contenthash: string | null;
  links: Record<string, Web3BioLink>;
  social: { followers: number; following: number };
  platforms: Array<{ platform: string; identity: string }>;
  raw: any[];
}

function useWeb3Bio(identity = 'djzs.eth') {
  const [profile, setProfile] = useState<Web3BioProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`https://api.web3.bio/profile/${identity}`);
        if (!res.ok) throw new Error('Profile not found');
        const data = await res.json();

        if (!data || data.length === 0) {
          throw new Error('No profile data');
        }

        const unified: Web3BioProfile = {
          address: data[0]?.address,
          identity: identity,
          displayName: data.find((p: any) => p.displayName && p.displayName !== identity)?.displayName || identity,
          avatar: data.find((p: any) => p.avatar)?.avatar,
          description: data.find((p: any) => p.description)?.description,
          header: data.find((p: any) => p.header)?.header,
          contenthash: data.find((p: any) => p.contenthash)?.contenthash,
          links: {},
          social: { followers: 0, following: 0 },
          platforms: data.map((p: any) => ({ platform: p.platform, identity: p.identity })),
          raw: data,
        };

        data.forEach((platform: any) => {
          if (platform.links) {
            Object.entries(platform.links).forEach(([key, value]: [string, any]) => {
              if (!unified.links[key] && value?.link) {
                unified.links[key] = {
                  url: value.link,
                  handle: value.handle,
                };
              }
            });
          }
          if (platform.social?.follower) {
            unified.social.followers += platform.social.follower;
          }
          if (platform.social?.following) {
            unified.social.following += platform.social.following;
          }
        });

        setProfile(unified);
      } catch (err: any) {
        console.error('Web3.bio fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile().catch(() => {});
  }, [identity]);

  return { profile, loading, error };
}

const DJZS_ENS = 'username.dj-z-s.eth';
const GITHUB_REPO = 'https://github.com/UsernameDAOEth/djzs-AI';

const FALLBACK_PROFILE: Partial<Web3BioProfile> = {
  displayName: 'Username: Dj-Z-S',
  description: 'Protocol Architect. Building the verification layer for autonomous agents.',
  address: '0x3e79e0374383ea64bc16c9b0568c6b13ef084afb',
  links: {
    twitter: { url: 'https://x.com/dj_z_s', handle: 'dj_z_s' },
    github: { url: GITHUB_REPO, handle: 'usernamedaoeth' },
    telegram: { url: 'https://t.me/usernamedjzs', handle: 'usernamedjzs' },
    farcaster: { url: 'https://warpcast.com/dj-z-s.eth', handle: 'dj-z-s.eth' },
    website: { url: 'https://djzs.ai/', handle: 'djzs.ai' },
    discord: { url: 'https://discord.gg/WKYQTBgW', handle: 'DJZS' },
    email: { url: 'mailto:0x3e79e0374383ea64bc16c9b0568c6b13ef084afb@ethermail.io', handle: 'EtherMail' },
  },
};


const Icons = {
  Github: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
  Twitter: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  Telegram: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
  Farcaster: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.24 2.4H5.76a3.36 3.36 0 00-3.36 3.36v12.48a3.36 3.36 0 003.36 3.36h12.48a3.36 3.36 0 003.36-3.36V5.76a3.36 3.36 0 00-3.36-3.36zm-1.92 13.44h-2.88v-4.8h-2.88v4.8H7.68V8.16h8.64v7.68z"/></svg>,
  Lens: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="4" fill="currentColor"/></svg>,
  Website: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>,
  Wallet: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
  ArrowRight: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
  Send: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
  Verified: () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  External: () => <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
  Mail: () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  Discord: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  ),
};

const LINK_ICONS: Record<string, React.FC> = {
  twitter: Icons.Twitter,
  github: Icons.Github,
  telegram: Icons.Telegram,
  farcaster: Icons.Farcaster,
  lens: Icons.Lens,
  website: Icons.Website,
  discord: Icons.Discord,
  email: Icons.Mail,
};

function Cursor({ blink = true }: { blink?: boolean }) {
  return <span className={`inline-block w-2 h-4 bg-green-400 ml-1 ${blink ? 'animate-pulse' : ''}`} style={{ verticalAlign: 'middle' }} />;
}

function LoadingDots() {
  return (
    <span className="inline-flex gap-1">
      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </span>
  );
}

function Header({ profile, loading, onConnectWallet, isWalletConnected, walletAddress, walletError }: {
  profile: Partial<Web3BioProfile> | null;
  loading: boolean;
  onConnectWallet: () => void;
  isWalletConnected: boolean;
  walletAddress: string | null;
  walletError: string | null;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-zinc-800 bg-black/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />
          ) : profile?.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.displayName || ''}
              className="w-8 h-8 rounded-full border border-green-400/50"
              data-testid="img-avatar"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center">
              <span className="text-green-400 text-xs font-bold">DJ</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="font-mono text-green-400 font-bold text-sm" data-testid="text-identity">
              {profile?.identity || DJZS_ENS}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {walletError && (
            <span className="font-mono text-xs text-red-400 hidden sm:block" data-testid="text-wallet-error">{walletError}</span>
          )}
          <button
            onClick={onConnectWallet}
            data-testid="button-connect-wallet"
            className={`flex items-center gap-2 px-3 py-1.5 font-mono text-xs border transition-all ${isWalletConnected ? 'border-green-400/50 text-green-400 bg-green-400/10' : 'border-zinc-700 text-zinc-400 hover:border-green-400/50 hover:text-green-400'}`}
          >
            <Icons.Wallet />
            {isWalletConnected && walletAddress
              ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
              : isWalletConnected ? 'CONNECTED' : 'CONNECT'}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ profile, loading }: { profile: Partial<Web3BioProfile> | null; loading: boolean }) {
  const lines = [
    { text: '> INITIALIZING NODE...', delay: 0 },
    { text: '> IDENTITY: USERNAME.DJ-Z-S.ETH', delay: 400 },
    { text: '> ROLE: Protocol Architect', delay: 800 },
    { text: '> STATUS: The API tollbooth for the A2A economy', delay: 1200 },
  ];
  const [visibleLines, setVisibleLines] = useState(0);
  const [time, setTime] = useState(new Date().toISOString());

  useEffect(() => {
    const timers = lines.map((_, i) => setTimeout(() => setVisibleLines(i + 1), lines[i].delay));
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toISOString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const outcomes = [
    { label: 'Adversarial Verification', status: 'FUNCTIONAL', color: 'text-green-400' },
    { label: 'x402 USDC Gating', status: 'DEPLOYED', color: 'text-blue-400' },
    { label: 'Audit Trail (Irys)', status: 'OPERATIONAL', color: 'text-amber-400' },
    { label: 'CVM (Phala)', status: 'LIVE', color: 'text-green-400' },
  ];

  return (
    <section className="min-h-[70vh] flex items-center justify-center pt-16 px-4" data-testid="section-hero">
      <div className="max-w-3xl w-full">
        <div className="border border-zinc-800 bg-zinc-950/50 p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-800">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-3 text-zinc-600 text-xs font-mono">djzs-node-01</span>
            {loading && <span className="ml-auto text-zinc-600 text-xs font-mono">resolving identity<LoadingDots /></span>}
            {!loading && profile && (
              <span className="ml-auto text-green-400/60 text-xs font-mono flex items-center gap-1">
                <Icons.Verified /> web3.bio verified
              </span>
            )}
          </div>

          <div className="font-mono space-y-1.5">
            {lines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="text-green-400 text-base">
                {line.text}
                {i === visibleLines - 1 && <Cursor />}
              </div>
            ))}
          </div>

          {visibleLines >= lines.length && (
            <div className="mt-6 pt-4 border-t border-zinc-800/50">
              <p className="text-zinc-300 text-lg font-light leading-relaxed italic" data-testid="text-hook">
                "Every agent pays a toll to prove it's worthy of trust."
              </p>
            </div>
          )}

          {visibleLines >= lines.length && (
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#tollbooth" className="flex items-center gap-2 px-4 py-2 bg-green-400 text-black font-mono text-sm font-bold hover:bg-green-300 transition-colors" data-testid="link-view-protocol">
                VIEW PROTOCOL <Icons.ArrowRight />
              </a>
              <a href="#contact" className="flex items-center gap-2 px-4 py-2 border border-green-400/50 text-green-400 font-mono text-sm hover:bg-green-400/10 transition-colors" data-testid="link-contact">CONTACT</a>
              <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-zinc-700 text-zinc-400 font-mono text-sm hover:border-zinc-500 hover:text-white transition-colors group" data-testid="link-github">
                <Icons.Github /> <span className="hidden sm:inline">UsernameDAOEth/djzs-AI</span><span className="sm:hidden">GITHUB</span>
              </a>
            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {outcomes.map((item, i) => (
            <div key={i} className="border border-zinc-800 bg-zinc-950/30 p-3 text-center" data-testid={`outcome-${i}`}>
              <div className={`text-sm font-mono font-bold ${item.color}`}>{item.status}</div>
              <div className="text-xs text-zinc-500 font-mono mt-1">{item.label}</div>
            </div>
          ))}
        </div>

        <div data-testid="hero-status-bar" className="mt-8 font-mono text-[10px] md:text-xs border border-zinc-800 bg-black/80 py-2 px-4 flex flex-col md:flex-row justify-between items-start md:items-center text-zinc-400">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>AGENT_STATUS: <span className="text-green-400">FOCUSED</span></span>
            <span>NETWORK: <span className="text-blue-400">BASE MAINNET</span></span>
            <span>PROTOCOL: <span className="text-amber-400">DJZS v1.0</span></span>
          </div>
          <div className="mt-2 md:mt-0 text-zinc-500">
            SYS_TIME: {time}
          </div>
        </div>
      </div>
    </section>
  );
}

function Tollbooth() {
  const logs = [
    "Agent verification request received...",
    "x402 payment confirmed on Base",
    "Adversarial audit complete: PASS",
    "Certificate issued: 0x4e2b...a917",
    "Agent Core: READY"
  ];
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % logs.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const capabilities = [
    'Adversarial verification of AI agent logic before execution',
    'x402 USDC payment gating on Base',
    'Immutable audit certificates on Irys',
    'Confidential execution via Phala TEE',
  ];

  const receipts = [
    { component: 'Adversarial verification loop', status: 'FUNCTIONAL', color: 'text-green-400' },
    { component: 'x402 USDC gating on Base', status: 'DEPLOYED', color: 'text-blue-400' },
    { component: 'Immutable audit trail on Irys', status: 'OPERATIONAL', color: 'text-amber-400' },
    { component: 'CVM execution via Phala', status: 'LIVE', color: 'text-green-400' },
  ];

  const pillars = [
    { id: 'game', title: 'THE GAME', color: 'border-purple-500/50 text-purple-400', bgColor: 'bg-purple-500/5', description: 'Life as simulation. Player 1 mentality. Internal state creating external reality.' },
    { id: 'code', title: 'THE CODE', color: 'border-blue-400/50 text-blue-400', bgColor: 'bg-blue-400/5', description: 'Audit-before-act encoded. Deterministic verification as digital discipline. Trust earned, not assumed.' },
    { id: 'bridge', title: 'THE BRIDGE', color: 'border-green-400/50 text-green-400', bgColor: 'bg-green-400/5', description: "Your internal OS writes your external code. The builder's consciousness shapes what they build." },
    { id: 'build', title: 'THE BUILD', color: 'border-amber-400/50 text-amber-400', bgColor: 'bg-amber-400/5', description: 'Transparency as trust primitive. Every commit a proof of work. The code speaks — or stays silent.' },
  ];

  return (
    <section id="tollbooth" className="py-16 px-4" data-testid="section-tollbooth">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-mono text-zinc-500 text-xs mb-1 tracking-widest">// THE TOLLBOOTH</h2>
        <div className="font-mono text-green-400 text-sm mb-6">DJZS PROTOCOL — The API Tollbooth for the A2A Economy</div>

        <div className="border border-zinc-800 bg-zinc-950/30 p-5 mb-6">
          <div className="font-mono text-xs text-zinc-500 mb-3">WHAT_IT_DOES:</div>
          <ul className="space-y-2">
            {capabilities.map((cap, i) => (
              <li key={i} className="flex items-start gap-2 font-mono text-sm text-zinc-400">
                <span className="text-green-400 mt-0.5">→</span>{cap}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-zinc-800 bg-black p-5 mb-8">
          <div className="font-mono text-xs text-zinc-500 mb-3">RECEIPTS (OUTCOMES, NOT ACTIVITY):</div>
          <div className="space-y-2">
            {receipts.map((r, i) => (
              <div key={i} className="flex items-center justify-between font-mono text-sm" data-testid={`receipt-${i}`}>
                <span className="text-zinc-400">{r.component}</span>
                <span className={`${r.color} font-bold text-xs border border-current px-2 py-0.5`}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div data-testid="tollbooth-log-stream" className="my-8 font-mono text-sm border border-zinc-800 bg-black p-4">
          <div className="text-zinc-600 mb-2">--- BEGIN LOG STREAM ---</div>
          <div className="h-6 flex items-center">
            <span className="text-green-400 mr-2">{'>'}</span>
            <span className="text-zinc-300 animate-pulse">{logs[logIndex]}</span>
          </div>
        </div>

        <div className="font-mono text-xs text-zinc-500 mb-4 tracking-widest">// TEACHING PILLARS</div>
        <div className="grid sm:grid-cols-2 gap-4">
          {pillars.map((p) => (
            <div key={p.id} className={`border ${p.color} ${p.bgColor} p-4 hover:brightness-110 transition-all`} data-testid={`pillar-${p.id}`}>
              <h3 className={`font-mono text-sm font-bold mb-2 ${p.color.split(' ')[1]}`}>{p.title}</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Evolution() {
  const phases = [
    { 
      period: '2015–2024', 
      title: 'INTERNAL WORK', 
      description: 'Consciousness study. Discipline as admin access. "Master the internal world first."',
      color: 'border-purple-500/30 text-purple-400'
    },
    { 
      period: '2024', 
      title: 'REALIZATION', 
      description: 'Reality is a simulation. You are Player 1. Everything external reflects internal.',
      color: 'border-purple-500/30 text-purple-400'
    },
    { 
      period: 'OCT 25', 
      title: 'ENCODING', 
      description: 'Philosophy becomes architecture. Audit-before-act as design principle.',
      color: 'border-blue-400/30 text-blue-400'
    },
    { 
      period: 'JAN 26', 
      title: 'BUILDING', 
      description: 'DJZS Protocol. Trust layer for autonomous minds. x402 + Irys + Phala + Base.',
      color: 'border-green-400/30 text-green-400'
    },
    { 
      period: 'FEB 26', 
      title: 'LIVE', 
      description: 'Adversarial Oracle deployed. The tollbooth opens.',
      color: 'border-green-400/30 text-green-400'
    },
  ];

  return (
    <section className="py-16 px-4 bg-zinc-950/50" data-testid="section-evolution">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-mono text-zinc-500 text-xs mb-1 tracking-widest">// THE EVOLUTION</h2>
        <div className="font-mono text-green-400 text-sm mb-2">Consciousness → Discipline → Simulation → Architecture → Oracle</div>
        <p className="font-mono text-zinc-500 text-xs mb-6">A decade of internal work. 5 months of external building. One coherent vision.</p>
        
        <div className="space-y-0">
          {phases.map((phase, i) => (
            <div 
              key={i} 
              className={`border ${phase.color} bg-black/50 p-4 ${i > 0 ? 'border-t-0' : ''}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                <span className="font-mono text-xs text-zinc-600 w-20 shrink-0">{phase.period}</span>
                <div className="flex-1">
                  <span className={`font-mono text-sm font-bold ${phase.color.split(' ')[1]}`}>{phase.title}</span>
                  <p className="font-mono text-xs text-zinc-400 mt-1">{phase.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function TheArchitect({ profile, loading }: { profile: Partial<Web3BioProfile> | null; loading: boolean }) {
  const identities = [
    { label: 'username.dj-z-s.eth', type: 'ENS (Primary)' },
    { label: 'dj-z-s.eth', type: 'ENS' },
    { label: 'usernamedao.eth', type: 'ENS' },
    { label: 'usernamedao.base.eth', type: 'Basenames' },
    { label: 'dj-z-s.eth', type: 'Farcaster' },
    { label: 'usernamedjzs.lens', type: 'Lens' },
  ];

  return (
    <section className="py-16 px-4 bg-zinc-950/50" data-testid="section-architect">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-mono text-zinc-500 text-xs mb-6 tracking-widest">// THE ARCHITECT</h2>

        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          <div className="shrink-0 flex flex-col items-center sm:items-start">
            {loading ? (
              <div className="w-20 h-20 rounded-full bg-zinc-800 animate-pulse" />
            ) : profile?.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.displayName || ''}
                className="w-20 h-20 rounded-full border-2 border-green-400/50"
                data-testid="img-architect-avatar"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-green-400/20 flex items-center justify-center">
                <span className="text-green-400 text-xl font-bold">DJ</span>
              </div>
            )}
            <div className="mt-3 text-center sm:text-left">
              <div className="font-mono text-white font-bold text-lg" data-testid="text-architect-name">
                {profile?.displayName || FALLBACK_PROFILE.displayName}
              </div>
              <div className="font-mono text-green-400 text-xs">Protocol Architect</div>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-zinc-300 text-sm leading-relaxed mb-4">
              Decade-long student of consciousness and simulation theory. Encoded that philosophy into infrastructure. DJZS is the adversarial verification layer for the AI agent economy — a tollbooth that forces autonomous agents to prove their logic before they're allowed to act.
            </p>
            <p className="text-zinc-500 text-xs font-mono italic">
              "I build the trust layer between autonomous minds — artificial and human."
            </p>
          </div>
        </div>

        <div className="border border-zinc-800 bg-black p-5">
          <div className="font-mono text-xs text-zinc-500 mb-3">IDENTITY_GRAPH:</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {identities.map((id, i) => (
              <div key={i} className="border border-zinc-800 bg-zinc-950/50 px-3 py-2" data-testid={`identity-${i}`}>
                <div className="font-mono text-green-400 text-xs truncate">{id.label}</div>
                <div className="font-mono text-zinc-600 text-xs">{id.type}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function SimulationStack() {
  const lifeToAgentMapping = [
    { life: 'You are Player 1 controlling the simulation', agent: 'An agent executes from its core programming' },
    { life: 'External reality reflects internal state', agent: 'Agent outputs reflect logic quality' },
    { life: 'Trust yourself first before trusting others', agent: 'Agents must be verified before trusted' },
    { life: 'Self-sovereignty — no external dependency', agent: 'Decentralization — no central authority' },
    { life: 'Discipline creates freedom', agent: 'Deterministic verification creates trust' },
    { life: 'We are one — all players connected', agent: 'A2A economy — all agents interconnected' },
  ];

  return (
    <section className="py-16 px-4" data-testid="section-simulation-stack">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-mono text-zinc-500 text-xs mb-6 tracking-widest">// THE SIMULATION STACK</h2>

        <div className="space-y-6">
          <div className="border border-purple-500/30 bg-purple-500/5 p-5">
            <div className="font-mono text-purple-400 text-xs mb-2 tracking-widest">LAYER 1: THE INTERNAL OPERATING SYSTEM</div>
            <blockquote className="border-l-2 border-purple-400 pl-4 mb-4">
              <p className="text-zinc-300 text-sm italic">"Before you build anything in the external world, you have to master the internal world."</p>
            </blockquote>
            <ul className="space-y-1.5 mb-4">
              <li className="flex items-start gap-2 text-zinc-400 text-xs font-mono"><span className="text-purple-400">→</span>Reality is a simulation and you are Player 1</li>
              <li className="flex items-start gap-2 text-zinc-400 text-xs font-mono"><span className="text-purple-400">→</span>Your reality is a projection of your internal state</li>
              <li className="flex items-start gap-2 text-zinc-400 text-xs font-mono"><span className="text-purple-400">→</span>Discipline isn't punishment — it's gaining admin access to your own simulation</li>
              <li className="flex items-start gap-2 text-zinc-400 text-xs font-mono"><span className="text-purple-400">→</span>Taking back Player 1 status requires radical self-responsibility</li>
            </ul>
            <p className="font-mono text-purple-400 text-xs font-bold">"You're not in the simulation. You ARE the simulation."</p>
          </div>

          <div className="border border-blue-400/30 bg-blue-400/5 p-5">
            <div className="font-mono text-blue-400 text-xs mb-2 tracking-widest">LAYER 2: THE VERIFICATION LAYER</div>
            <blockquote className="border-l-2 border-blue-400 pl-4 mb-4">
              <p className="text-zinc-300 text-sm italic">"The same way I audit my own thoughts and actions before I execute in life, DJZS audits AI agents before they execute in the digital economy."</p>
            </blockquote>
            <div className="border border-zinc-800 bg-black overflow-hidden">
              <div className="grid grid-cols-2 border-b border-zinc-800">
                <div className="px-3 py-2 font-mono text-xs text-zinc-500 border-r border-zinc-800">LIFE PRINCIPLE</div>
                <div className="px-3 py-2 font-mono text-xs text-zinc-500">AI AGENT PARALLEL</div>
              </div>
              {lifeToAgentMapping.map((row, i) => (
                <div key={i} className={`grid grid-cols-2 ${i < lifeToAgentMapping.length - 1 ? 'border-b border-zinc-800/50' : ''}`}>
                  <div className="px-3 py-2 font-mono text-xs text-zinc-400 border-r border-zinc-800/50">{row.life}</div>
                  <div className="px-3 py-2 font-mono text-xs text-blue-400">{row.agent}</div>
                </div>
              ))}
            </div>
            <p className="font-mono text-blue-400 text-xs font-bold mt-4">"Audit before you act. In life. In code. In everything."</p>
          </div>

          <div className="border border-green-400/30 bg-green-400/5 p-5">
            <div className="font-mono text-green-400 text-xs mb-2 tracking-widest">LAYER 3: THE A2A FUTURE</div>
            <blockquote className="border-l-2 border-green-400 pl-4 mb-4">
              <p className="text-zinc-300 text-sm italic">"We're building a world where autonomous minds interact at scale. The question isn't IF. The question is: who builds the trust layer?"</p>
            </blockquote>
            <ul className="space-y-1.5 mb-4">
              <li className="flex items-start gap-2 text-zinc-400 text-xs font-mono"><span className="text-green-400">→</span>AI agents will transact without human intervention</li>
              <li className="flex items-start gap-2 text-zinc-400 text-xs font-mono"><span className="text-green-400">→</span>This mirrors the simulation — autonomous entities in shared reality</li>
              <li className="flex items-start gap-2 text-zinc-400 text-xs font-mono"><span className="text-green-400">→</span>Without verification, the agent economy becomes chaos</li>
              <li className="flex items-start gap-2 text-zinc-400 text-xs font-mono"><span className="text-green-400">→</span>DJZS is the immune system for this new world</li>
            </ul>
            <p className="font-mono text-green-400 text-xs font-bold">"The future isn't human vs AI. It's conscious systems operating in verified trust."</p>
          </div>

          <div className="border-2 border-zinc-600 bg-zinc-900/50 p-5 text-center">
            <div className="font-mono text-zinc-500 text-xs mb-3 tracking-widest">// PLAYER 1 RESOLUTION</div>
            <p className="text-zinc-300 text-sm leading-relaxed max-w-xl mx-auto">
              You are Player 1 in your simulation. Everyone else is Player 1 in theirs. "We are one" is the recognition that all simulations run on the same substrate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TheDispatch() {
  const articles = [
    "THE ADVERSARIAL NECESSITY: Auditing the Polycentric Agent Economy",
    "The Great Preparation: Auditing the Simulation with Crypto and AI",
    "Sovereign Infrastructure and the End of the Centralized Honeypot",
    "DJZS: The Deterministic Verification Primitive for the A2A Economy",
  ];

  return (
    <section data-testid="section-dispatch" className="py-16 px-4 bg-zinc-950/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-mono text-zinc-500 text-xs mb-1 tracking-widest">// THE DISPATCH</h2>
        <p className="text-zinc-400 font-mono text-sm mb-8">Deep dives on consciousness, infrastructure, and the A2A economy.</p>

        <div className="flex flex-col space-y-2 font-mono text-sm mb-8">
          {articles.map((title, i) => (
            <a key={i} href="https://username.box" target="_blank" rel="noopener noreferrer" className="p-4 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white transition-colors flex justify-between items-center group" data-testid={`dispatch-article-${i}`}>
              <span>{title}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0">↗</span>
            </a>
          ))}
        </div>
        <a href="https://username.box" target="_blank" rel="noopener noreferrer" className="font-mono text-white border-b border-white hover:text-zinc-300 pb-1 text-sm transition-colors" data-testid="link-username-box">
          READ MORE ON USERNAME.BOX →
        </a>
      </div>
    </section>
  );
}


function Contact({ profile, loading, onConnectWallet, isWalletConnected, walletAddress, walletError }: {
  profile: Partial<Web3BioProfile> | null;
  loading: boolean;
  onConnectWallet: () => void;
  isWalletConnected: boolean;
  walletAddress: string | null;
  walletError: string | null;
}) {
  const links = profile?.links || FALLBACK_PROFILE.links || {};
  const mergedLinks = { ...links, discord: (links as any).discord || FALLBACK_PROFILE.links?.discord, website: FALLBACK_PROFILE.links?.website, email: FALLBACK_PROFILE.links?.email };

  const socialLinks = Object.entries(mergedLinks)
    .filter(([key]) => LINK_ICONS[key])
    .map(([key, value]) => ({
      key,
      icon: LINK_ICONS[key],
      label: key.charAt(0).toUpperCase() + key.slice(1),
      href: typeof value === 'string' ? value : value?.url,
      handle: typeof value === 'object' ? value?.handle : null,
    }))
    .filter(link => link.href);

  return (
    <section id="contact" className="py-16 px-4" data-testid="section-contact">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-mono text-zinc-500 text-xs mb-2 tracking-widest">// CONTACT</h2>
        {!loading && profile && (
          <p className="text-zinc-600 text-xs font-mono mb-6">
            Links resolved from {profile.identity} via web3.bio
          </p>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="border border-zinc-800 bg-black p-5">
            <h3 className="font-mono text-white font-bold text-sm mb-2">XMTP CHAT</h3>
            <p className="text-zinc-500 text-xs mb-4">Quantum resistant end to end encryption chat.</p>
            <button
              onClick={onConnectWallet}
              data-testid="button-xmtp-connect"
              className={`w-full flex items-center justify-center gap-2 px-3 py-2 font-mono text-xs transition-all ${isWalletConnected ? 'bg-green-400/10 border border-green-400/50 text-green-400' : 'bg-green-400 text-black hover:bg-green-300'}`}
            >
              <Icons.Wallet /> {isWalletConnected ? 'OPEN CHAT' : 'CONNECT WALLET'}
            </button>
            {isWalletConnected && walletAddress && (
              <p className="text-green-400/60 text-xs font-mono mt-2 text-center truncate" data-testid="text-xmtp-address">
                {walletAddress}
              </p>
            )}
            {walletError && (
              <p className="text-red-400 text-xs font-mono mt-2 text-center" data-testid="text-xmtp-error">
                {walletError}
              </p>
            )}
          </div>

          <div className="border border-zinc-800 bg-black p-5">
            <h3 className="font-mono text-white font-bold text-sm mb-2">SOCIALS</h3>
            <p className="text-zinc-500 text-xs mb-4">
              {loading ? 'Loading...' : 'Resolved from ENS'}
            </p>

            {loading ? (
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-9 bg-zinc-900 animate-pulse rounded" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.key}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-2 py-1.5 border border-zinc-800 text-zinc-400 font-mono text-xs hover:border-zinc-600 hover:text-zinc-300 transition-colors group"
                    data-testid={`link-social-${link.key}`}
                  >
                    <link.icon />
                    <span className="truncate">{link.handle || link.label}</span>
                    <Icons.External />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href={`https://web3.bio/${DJZS_ENS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-400 text-xs font-mono transition-colors"
            data-testid="link-web3bio"
          >
            View full identity graph on web3.bio <Icons.External />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({ profile }: { profile: Partial<Web3BioProfile> | null }) {
  return (
    <footer className="py-6 px-4 border-t border-zinc-900" data-testid="section-footer">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="font-mono text-zinc-600 flex items-center gap-2">
          {profile?.address && (
            <span className="text-zinc-700">{profile.address.slice(0, 6)}...{profile.address.slice(-4)}</span>
          )}
          <span>|</span>
          <span>{profile?.identity || DJZS_ENS}</span>
          <span>|</span>
          <span>Base Mainnet</span>
        </div>
        <div className="font-mono text-zinc-700">
          Identity via <a href="https://web3.bio" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-400">web3.bio</a>
        </div>
      </div>
    </footer>
  );
}

export default function DJZSLandingPage() {
  const { profile, loading, error } = useWeb3Bio(DJZS_ENS);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletError, setWalletError] = useState<string | null>(null);

  const handleConnectWallet = useCallback(() => {
    if (isWalletConnected) {
      setIsWalletConnected(false);
      setWalletAddress(null);
      setWalletError(null);
      return;
    }

    setWalletError(null);

    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      setWalletError('No wallet detected. Install MetaMask or a compatible wallet.');
      return;
    }

    ethereum.request({ method: 'eth_requestAccounts' })
      .then((accounts: string[]) => {
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsWalletConnected(true);
        }
      })
      .catch((err: any) => {
        if (err?.code === 4001) {
          setWalletError('Connection rejected.');
        } else {
          setWalletError('Wallet connection failed.');
        }
      });
  }, [isWalletConnected]);

  const displayProfile = error ? { ...FALLBACK_PROFILE, identity: DJZS_ENS } : profile;

  return (
    <div className="min-h-screen bg-black text-white relative" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <MatrixRain opacity={0.12} speed={0.6} density={0.98} />
      </div>
      <div className="pointer-events-none fixed inset-0 z-50" style={{ background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 2px)' }} />

      <div className="relative z-10">
      <Header
        profile={displayProfile}
        loading={loading}
        onConnectWallet={handleConnectWallet}
        isWalletConnected={isWalletConnected}
        walletAddress={walletAddress}
        walletError={walletError}
      />
      <FoundersFund />

      <main>
        <Hero profile={displayProfile} loading={loading} />
        <Tollbooth />
        <Evolution />
        <DJZSSections />
        <TheArchitect profile={displayProfile} loading={loading} />
        <SimulationStack />
        <TheDispatch />
        <Contact
          profile={displayProfile}
          loading={loading}
          onConnectWallet={handleConnectWallet}
          isWalletConnected={isWalletConnected}
          walletAddress={walletAddress}
          walletError={walletError}
        />
      </main>

      <Footer profile={displayProfile} />
      </div>
    </div>
  );
}
