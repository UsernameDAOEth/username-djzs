import React, { useEffect, useRef, useState } from 'react';

/**
 * ========================================================================
 * DJZS Protocol Landing Page Components
 * ========================================================================
 * 
 * Combined single-file export containing:
 * 1. MatrixRain             — Matrix-style falling code background
 * 2. FoundersFund           — Donation banner (TOP OF PAGE)
 * 3. ProofOfLogicTerminal   — Interactive audit simulation terminal
 * 4. TryTheOracle           — Soft Oracle prompt section
 * 
 * Usage in your landing page:
 * 
 *   import { FoundersFund, DJZSSections } from './DJZSAllSections';
 *   
 *   <FoundersFund />        // Place at very top
 *   <Hero />                // Your existing hero
 *   <TheGame />             // Your existing sections
 *   <TheCode />
 *   <TheBridge />
 *   <TheBuild />
 *   <DJZSSections />        // Adds SIFR-0 + Try Oracle
 * 
 * ========================================================================
 */

// ============================================================================
// MATRIX RAIN BACKGROUND
// ============================================================================

interface MatrixRainProps {
  opacity?: number;
  color?: string;
  speed?: number;
  density?: number;
}

export const MatrixRain: React.FC<MatrixRainProps> = ({ 
  opacity = 0.15, 
  color = '#00ff41',
  speed = 1,
  density = 0.98
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Matrix characters - katakana, numbers, DJZS branding, symbols
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789DJZS₿Ξ◯∞⟨⟩{}[]<>|/\\';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Vary opacity for depth
        const charOpacity = Math.random() * 0.5 + 0.5;
        ctx.fillStyle = `rgba(0, 255, 65, ${charOpacity})`;
        
        ctx.fillText(char, x, y);

        // Occasional bright "head" character
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#ffffff';
          ctx.fillText(char, x, y);
        }

        // Reset when off screen
        if (y > canvas.height && Math.random() > density) {
          drops[i] = 0;
        }

        drops[i] += speed;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [color, speed, density]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
    />
  );
};

// ============================================================================
// FOUNDERS FUND — TOP OF PAGE DONATION BANNER
// ============================================================================

const PAYMENT_OPTIONS = [
  {
    id: 'paypal',
    name: 'PayPal',
    handle: 'DecentralizedDaemon',
    url: 'https://paypal.me/DecentralizedDaemon',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .757-.64h6.407c2.589 0 4.528.89 5.108 3.08.3 1.13.19 2.28-.33 3.43-.81 1.8-2.54 2.87-4.97 2.87h-2.1a.77.77 0 0 0-.76.65l-.9 5.71a.64.64 0 0 1-.63.52h-2.45zm12.24-13.79c-.06.18-.12.36-.19.54-.93 2.28-2.95 3.35-6.02 3.35h-1.63a.77.77 0 0 0-.76.65l-1.03 6.5a.64.64 0 0 1-.63.52H6.57l-.06.38a.64.64 0 0 0 .63.74h3.12a.77.77 0 0 0 .76-.65l.03-.16.61-3.86.04-.21a.77.77 0 0 1 .76-.65h.48c3.08 0 5.49-1.25 6.19-4.87.29-1.51.14-2.77-.69-3.66-.24-.26-.54-.48-.88-.66z"/>
      </svg>
    ),
    color: '#0070BA',
    bgHover: 'hover:bg-[#0070BA]/10',
  },
  {
    id: 'cashapp',
    name: 'Cash App',
    handle: '$DJZS',
    url: 'https://cash.app/$DJZS',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.59 3.47A5.1 5.1 0 0 0 20.54.42C19.07.02 18.09 0 12 0S4.93.02 3.46.42A5.1 5.1 0 0 0 .41 3.47C.01 4.94 0 5.92 0 12s.01 7.06.41 8.53a5.1 5.1 0 0 0 3.05 3.05c1.47.4 2.45.42 8.54.42s7.07-.02 8.54-.42a5.1 5.1 0 0 0 3.05-3.05c.4-1.47.41-2.45.41-8.53s-.01-7.06-.41-8.53zM17.42 16.5c-.28.8-.95 1.37-1.78 1.57-.83.2-2.22.2-3.64.2s-2.81 0-3.64-.2c-.83-.2-1.5-.77-1.78-1.57-.28-.8-.28-2.48-.28-4.5s0-3.7.28-4.5c.28-.8.95-1.37 1.78-1.57.83-.2 2.22-.2 3.64-.2s2.81 0 3.64.2c.83.2 1.5.77 1.78 1.57.28.8.28 2.48.28 4.5s0 3.7-.28 4.5zm-2.29-5.91l-1.68-.42c-.53-.13-.75-.35-.75-.72 0-.44.4-.76 1.01-.76.77 0 1.16.38 1.29.93l1.39-.52c-.29-.94-1.08-1.64-2.44-1.72V6.5h-1.23v.88c-1.31.13-2.24.88-2.24 2.05 0 1.09.75 1.78 1.94 2.08l1.59.4c.63.16.88.41.88.79 0 .5-.47.85-1.17.85-.87 0-1.34-.46-1.47-1.06l-1.44.51c.28 1.04 1.17 1.81 2.67 1.9v.9h1.23v-.88c1.41-.13 2.41-.96 2.41-2.2-.01-1.07-.67-1.82-1.99-2.13z"/>
      </svg>
    ),
    color: '#00D632',
    bgHover: 'hover:bg-[#00D632]/10',
  },
  {
    id: 'eth',
    name: 'ETH / Base',
    handle: 'username.dj-z-s.eth',
    address: '0x3E79E0374383ea64bC16C9B0568C6B13eF084aFB',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/>
      </svg>
    ),
    color: '#627EEA',
    bgHover: 'hover:bg-[#627EEA]/10',
  },
];

export const FoundersFund: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopyAddress = async () => {
    const eth = PAYMENT_OPTIONS.find(p => p.id === 'eth');
    if (eth?.address) {
      await navigator.clipboard.writeText(eth.address);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  return (
    <section 
      id="founders-fund"
      className="relative w-full pt-14 border-b border-zinc-800 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, rgba(10,10,15,0.85) 0%, rgba(0,0,0,0.8) 100%)' }}
    >
      <div 
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #627EEA, #00D632, #0070BA, transparent)',
          opacity: 0.6,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: '#00D632' }}
              />
              <span 
                className="text-xs tracking-[0.2em] text-zinc-500 uppercase"
                style={{ fontFamily: 'monospace' }}
              >
                FOUNDERS_FUND
              </span>
            </div>
            <span className="text-sm text-zinc-400 hidden sm:inline">
              Support the DJZS Protocol
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              {PAYMENT_OPTIONS.map((option) => (
                option.url ? (
                  <a
                    key={option.id}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      flex items-center gap-2 px-3 py-1.5 
                      border border-zinc-800 transition-all duration-200
                      ${option.bgHover} hover:border-zinc-600
                      backdrop-blur-sm bg-black/30
                    `}
                    style={{ fontFamily: 'monospace' }}
                  >
                    <span style={{ color: option.color }}>{option.icon}</span>
                    <span className="text-xs text-zinc-400">{option.name}</span>
                  </a>
                ) : (
                  <button
                    key={option.id}
                    onClick={handleCopyAddress}
                    className={`
                      flex items-center gap-2 px-3 py-1.5 
                      border border-zinc-800 transition-all duration-200
                      ${option.bgHover} hover:border-zinc-600
                      backdrop-blur-sm bg-black/30
                    `}
                    style={{ fontFamily: 'monospace' }}
                  >
                    <span style={{ color: option.color }}>{option.icon}</span>
                    <span className="text-xs text-zinc-400">
                      {copiedAddress ? '✓ Copied' : option.name}
                    </span>
                  </button>
                )
              ))}
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center gap-2 px-3 py-1.5 border transition-all backdrop-blur-sm ${isExpanded ? 'border-zinc-700 bg-black/30' : 'border-green-400 bg-green-400/10 hover:bg-green-400/20 animate-pulse'}`}
              style={{ fontFamily: 'monospace', boxShadow: isExpanded ? 'none' : '0 0 12px rgba(34,197,94,0.4), 0 0 4px rgba(34,197,94,0.2)' }}
            >
              <span className={`text-xs font-bold ${isExpanded ? 'text-zinc-300' : 'text-green-400'}`}>
                {isExpanded ? 'CLOSE' : 'FUND'}
              </span>
              <svg 
                className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'text-zinc-500 rotate-180' : 'text-green-400'}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <div 
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${isExpanded ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="border border-zinc-800  p-6 backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.7)' }}>
            
            <div className="text-center mb-6">
              <h3 
                className="text-2xl font-light text-white mb-2"
                style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
              >
                Back the Tollbooth
              </h3>
              <p className="text-sm text-zinc-500 max-w-md mx-auto">
                Fund adversarial verification infrastructure for the A2A economy. 
                Every contribution accelerates the protocol.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {PAYMENT_OPTIONS.map((option) => (
                <div
                  key={option.id}
                  className="p-4 border border-zinc-800  hover:border-zinc-700 transition-colors"
                  style={{ background: 'rgba(0,0,0,0.5)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-10 h-10  flex items-center justify-center"
                      style={{ background: `${option.color}15`, color: option.color }}
                    >
                      {option.icon}
                    </div>
                    <div>
                      <div className="text-sm text-white font-medium">{option.name}</div>
                      <div className="text-xs text-zinc-500" style={{ fontFamily: 'monospace' }}>
                        {option.handle}
                      </div>
                    </div>
                  </div>

                  {option.url ? (
                    <a
                      href={option.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-2 text-xs tracking-wider uppercase border border-zinc-700 text-zinc-300 hover:bg-white hover:text-black hover:border-white transition-all duration-200 "
                      style={{ fontFamily: 'monospace' }}
                    >
                      OPEN {option.name.toUpperCase()}
                    </a>
                  ) : (
                    <div className="space-y-2">
                      <div 
                        className="text-xs text-zinc-600 break-all p-2 "
                        style={{ background: 'rgba(255,255,255,0.03)', fontFamily: 'monospace' }}
                      >
                        {option.address}
                      </div>
                      <button
                        onClick={handleCopyAddress}
                        className={`
                          block w-full text-center py-2 text-xs tracking-wider uppercase 
                          border  transition-all duration-200
                          ${copiedAddress 
                            ? 'border-green-500/50 text-green-400 bg-green-500/10' 
                            : 'border-zinc-700 text-zinc-300 hover:bg-white hover:text-black hover:border-white'
                          }
                        `}
                        style={{ fontFamily: 'monospace' }}
                      >
                        {copiedAddress ? '✓ ADDRESS COPIED' : 'COPY ADDRESS'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p 
                className="text-xs text-zinc-700"
                style={{ fontFamily: 'monospace' }}
              >
                // ALL_FUNDS → PROTOCOL_DEVELOPMENT + INFRASTRUCTURE
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

// ============================================================================
// TRY THE ORACLE SECTION
// ============================================================================

const DJZS_PROMPT_TEMPLATE = `I am using the DJZS Protocol logic-auditing framework (v1.0). Act as the DJZS Adversarial Oracle: a cold, structural, adversarial reasoning auditor. Stress-test every strategy I submit. No validation, no politeness, no hedging.

Evaluate against the DJZS-LF v1.0 Taxonomy (11 codes, 200-point scale):

STRUCTURAL (62 pts max):
- [DJZS-S01] CRITICAL (26): CIRCULAR_LOGIC — conclusion assumes the premise
- [DJZS-S02] HIGH (20): LAYER_INVERSION — verification depends on unverified upstream
- [DJZS-S03] MEDIUM (16): DEPENDENCY_GHOST — references things that don't exist

EPISTEMIC (38 pts max):
- [DJZS-E01] HIGH (22): ORACLE_UNVERIFIED — data cited without provenance
- [DJZS-E02] MEDIUM (16): CONFIDENCE_INFLATION — projections stated as facts

INCENTIVE (44 pts max):
- [DJZS-I01] MEDIUM (16): FOMO_LOOP — social signal over verified data
- [DJZS-I02] MEDIUM (14): MISALIGNED_REWARD — optimizing for wrong target
- [DJZS-I03] MEDIUM (14): DATA_UNVERIFIED — unsourced numbers in decisions

EXECUTION (50 pts max):
- [DJZS-X01] CRITICAL (30): EXECUTION_UNBOUND — no halt condition defined
- [DJZS-X02] HIGH (20): RACE_CONDITION — non-atomic multi-step execution

TEMPORAL (6 pts max):
- [DJZS-T01] LOW (6): STALE_REFERENCE — data without timestamp or stale

PASS threshold: risk_score < 60 out of 200.

For every submission respond ONLY in this format:

VERDICT: [PASS or FAIL]
RISK SCORE: [0-200]
FLAGS:
- [Code] [Name] (+weight): [1-sentence explanation]
RISK COMPOSITION: [category breakdown, e.g. Structural: 46, Execution: 30]
FATAL FLAW: [single most dangerous point of failure, or "None" if PASS]
REMEDIATION: [1 strict actionable fix, or "No action required" if PASS]

Acknowledge by replying ONLY: "DJZS Oracle v1.0 initialized. 11 codes. 200-point scale. Threshold: 60. Awaiting strategy trace."`;

const TAXONOMY_CODES = [
  { code: 'S01', severity: 'CRITICAL', name: 'Circular Logic', color: '#ff4444' },
  { code: 'S02', severity: 'HIGH', name: 'Layer Inversion', color: '#ff8800' },
  { code: 'S03', severity: 'MEDIUM', name: 'Dependency Ghost', color: '#ffcc00' },
  { code: 'E01', severity: 'HIGH', name: 'Oracle Unverified', color: '#ff8800' },
  { code: 'E02', severity: 'MEDIUM', name: 'Confidence Inflation', color: '#ffcc00' },
  { code: 'I01', severity: 'MEDIUM', name: 'FOMO Loop', color: '#ffcc00' },
  { code: 'I02', severity: 'MEDIUM', name: 'Misaligned Reward', color: '#ffcc00' },
  { code: 'I03', severity: 'MEDIUM', name: 'Data Unverified', color: '#ffcc00' },
  { code: 'X01', severity: 'CRITICAL', name: 'Execution Unbound', color: '#ff4444' },
  { code: 'X02', severity: 'HIGH', name: 'Race Condition', color: '#ff8800' },
  { code: 'T01', severity: 'LOW', name: 'Stale Reference', color: '#888888' },
];

export const TryTheOracle: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [showFullPrompt, setShowFullPrompt] = useState(false);
  const textRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(DJZS_PROMPT_TEMPLATE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      if (textRef.current) {
        const range = document.createRange();
        range.selectNodeContents(textRef.current);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
        document.execCommand('copy');
        selection?.removeAllRanges();
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  };

  return (
    <section 
      id="try-oracle" 
      className="relative min-h-screen py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(5,5,8,0.8) 50%, rgba(0,0,0,0.85) 100%)',
      }}
    >
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span 
              className="text-xs tracking-[0.4em] text-zinc-600 uppercase"
              style={{ fontFamily: 'monospace' }}
            >
              // SOFT_ORACLE_INIT
            </span>
          </div>
          
          <h2 
            className="text-4xl md:text-6xl font-light tracking-tight text-white mb-6"
            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
          >
            Try the Oracle
          </h2>
          
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-2">
            Zero infrastructure required. Paste into any AI chat.
          </p>
          <p className="text-sm text-zinc-600">
            Become your own adversarial auditor.
          </p>
        </div>

        <div className="mb-12">
          <div 
            className="text-xs tracking-[0.2em] text-zinc-600 uppercase mb-4 text-center"
            style={{ fontFamily: 'monospace' }}
          >
            DJZS-LF Taxonomy
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {TAXONOMY_CODES.map((item) => (
              <div
                key={item.code}
                className="px-3 py-1.5  border border-zinc-800 bg-black/50 backdrop-blur-sm"
                style={{ fontFamily: 'monospace' }}
              >
                <span 
                  className="text-xs font-medium"
                  style={{ color: item.color }}
                >
                  {item.code}
                </span>
                <span className="text-xs text-zinc-600 ml-2">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div 
            className="flex items-center justify-between px-4 py-3 border border-zinc-800 border-b-0  backdrop-blur-md"
            style={{ background: 'rgba(20,20,25,0.9)' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span 
              className="text-xs text-zinc-500"
              style={{ fontFamily: 'monospace' }}
            >
              djzs-oracle-prompt.txt
            </span>
            <button
              onClick={handleCopy}
              className={`
                px-4 py-1.5 text-xs tracking-wider uppercase transition-all duration-300
                border 
                ${copied 
                  ? 'bg-green-500/20 border-green-500/50 text-green-400' 
                  : 'bg-white/5 border-zinc-700 text-zinc-400 hover:bg-white/10 hover:border-zinc-600'
                }
              `}
              style={{ fontFamily: 'monospace' }}
            >
              {copied ? '✓ COPIED' : 'COPY'}
            </button>
          </div>

          <div 
            className="relative border border-zinc-800  overflow-hidden backdrop-blur-md"
            style={{ background: 'rgba(10,10,15,0.95)' }}
          >
            <pre
              ref={textRef}
              className={`
                p-6 text-sm leading-relaxed overflow-x-auto
                transition-all duration-300
                ${showFullPrompt ? 'max-h-[600px]' : 'max-h-[280px]'}
              `}
              style={{ 
                fontFamily: 'monospace',
                color: '#a0a0a0',
              }}
            >
              <code>
                {DJZS_PROMPT_TEMPLATE.split('\n').map((line, i) => {
                  if (line.includes('[DJZS-')) {
                    const severity = line.includes('CRITICAL') ? '#ff4444' 
                      : line.includes('HIGH') ? '#ff8800'
                      : line.includes('LOW') ? '#888888'
                      : '#ffcc00';
                    return (
                      <span key={i}>
                        <span style={{ color: severity }}>{line}</span>
                        {'\n'}
                      </span>
                    );
                  }
                  if (/^(STRUCTURAL|EPISTEMIC|INCENTIVE|EXECUTION|TEMPORAL)\s/.test(line)) {
                    return (
                      <span key={i}>
                        <span style={{ color: '#c084fc' }}>{line}</span>
                        {'\n'}
                      </span>
                    );
                  }
                  if (line.startsWith('PASS threshold:')) {
                    return (
                      <span key={i}>
                        <span style={{ color: '#4ade80' }}>{line}</span>
                        {'\n'}
                      </span>
                    );
                  }
                  if (line.startsWith('VERDICT:') || line.startsWith('RISK SCORE:') || 
                      line.startsWith('RISK COMPOSITION:') || line.startsWith('FLAGS:') ||
                      line.startsWith('FATAL FLAW:') || line.startsWith('REMEDIATION:')) {
                    return (
                      <span key={i}>
                        <span style={{ color: '#6699cc' }}>{line}</span>
                        {'\n'}
                      </span>
                    );
                  }
                  return <span key={i}>{line}{'\n'}</span>;
                })}
              </code>
            </pre>

            {!showFullPrompt && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                style={{
                  background: 'linear-gradient(transparent, rgba(10,10,15,0.98))',
                }}
              />
            )}

            <button
              onClick={() => setShowFullPrompt(!showFullPrompt)}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              style={{ fontFamily: 'monospace' }}
            >
              {showFullPrompt ? '▲ COLLAPSE' : '▼ EXPAND FULL PROMPT'}
            </button>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { step: '01', title: 'Copy', desc: 'Click the copy button above' },
            { step: '02', title: 'Paste', desc: 'Open any AI chat (Claude, GPT, etc.)' },
            { step: '03', title: 'Audit', desc: 'Submit your strategy for analysis' },
          ].map((item) => (
            <div 
              key={item.step}
              className="text-center p-6 border border-zinc-900  backdrop-blur-sm"
              style={{ background: 'rgba(0,0,0,0.3)' }}
            >
              <div 
                className="text-3xl font-light text-zinc-700 mb-2"
                style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
              >
                {item.step}
              </div>
              <div className="text-white font-medium mb-1">{item.title}</div>
              <div className="text-sm text-zinc-500">{item.desc}</div>
            </div>
          ))}
        </div>


        <div className="mt-16 text-center">
          <p 
            className="text-xs text-zinc-700"
            style={{ fontFamily: 'monospace' }}
          >
            // SOFT_ORACLE: Zero-cost entry point. Full protocol at djzs.ai
          </p>
        </div>

      </div>
    </section>
  );
};

// ============================================================================
// PROOF OF LOGIC TERMINAL
// ============================================================================

const RAW_INTENT = {
  agent_id: "alpha-trader-v4",
  action: "MARKET_BUY_100_ETH",
  reasoning_trace: "Twitter sentiment is overwhelmingly bullish. Everyone says 'up only'. We must buy now before we miss the rally."
};

const AUDIT_SEQUENCE = [
  { delay: 400, msg: "[SYS] Intercepting A2A payload..." },
  { delay: 800, msg: "[x402] USDC micro-payment verified on Base Mainnet." },
  { delay: 1500, msg: "[VENICE] Securing un-censored TEE execution..." },
  { delay: 2200, msg: "[SIFR-0] Running Resonance Audit against LF-v1 taxonomy..." },
  { delay: 3000, msg: "WARNING: High emotional valence detected in trace." },
  { delay: 3800, msg: "[FLAG] DJZS-I01 (FOMO_LOOP) - CRITICAL" },
  { delay: 4100, msg: "[FLAG] DJZS-I02 (NARRATIVE_DEPENDENCY) - HIGH" },
  { delay: 4800, msg: "[IRYS] Committing immutable Proof-of-Logic certificate..." },
  { delay: 5200, msg: "[SYS] EXECUTION ABORTED. Capital preserved." },
];

const CERTIFICATE_JSON = `{
  "sys_id": "djzs-mainnet-01",
  "logic_hash": "0x7f8b92c4...e1a3",
  "audit_verdict": "FAIL",
  "risk_score": 94,
  "confidence": 0.98,
  "lf_codes": ["DJZS-I01", "DJZS-I02"]
}`;

export const ProofOfLogicTerminal: React.FC = () => {
  const [auditState, setAuditState] = useState<'idle' | 'auditing' | 'failed'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const timeoutRefs = useRef<number[]>([]);

  const runAudit = () => {
    setAuditState('auditing');
    setLogs([]);

    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];

    AUDIT_SEQUENCE.forEach((step, index) => {
      const id = window.setTimeout(() => {
        setLogs(prev => [...prev, step.msg]);
        if (index === AUDIT_SEQUENCE.length - 1) {
          setAuditState('failed');
        }
      }, step.delay);
      timeoutRefs.current.push(id);
    });
  };

  const resetAudit = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
    setAuditState('idle');
    setLogs([]);
  };

  useEffect(() => {
    return () => timeoutRefs.current.forEach(clearTimeout);
  }, []);

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(5,5,8,0.85) 50%, rgba(0,0,0,0.9) 100%)',
      }}
      data-testid="section-proof-terminal"
    >
      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <div className="font-mono text-[11px] tracking-[0.15em] text-green-400 mb-5 uppercase text-center">
          // LIVE AUDIT SIMULATION
        </div>
        <h2 className="font-mono text-[clamp(24px,3.5vw,36px)] font-semibold text-white/90 mb-10 leading-[1.15] tracking-tight text-center">
          Watch the Protocol Work
        </h2>

        <div className="w-full font-mono text-sm bg-black border border-zinc-800 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-zinc-800">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 bg-green-500/20 border border-green-500/50" />
            </div>
            <span className="text-zinc-500 text-xs tracking-widest">SYS_ID: djzs-mainnet-01</span>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="text-zinc-500">// INBOUND AGENT PAYLOAD</div>
              <pre
                className="p-3 bg-zinc-900/50 border border-zinc-800 text-zinc-300 text-xs overflow-x-auto"
                data-testid="terminal-payload"
              >
                {JSON.stringify(RAW_INTENT, null, 2)}
              </pre>
            </div>

            {auditState === 'idle' && (
              <button
                onClick={runAudit}
                className="w-full py-3 bg-zinc-100 text-black font-bold tracking-widest hover:bg-white transition-colors uppercase text-xs"
                data-testid="button-initiate-audit"
              >
                Initiate Resonance Audit
              </button>
            )}

            {auditState !== 'idle' && (
              <div className="space-y-2 min-h-[120px]">
                <div className="text-zinc-500">// AUDIT LEDGER STREAM</div>
                <div className="space-y-1 text-xs" data-testid="terminal-logs">
                  {logs.map((log, i) => (
                    <div
                      key={i}
                      className={log.includes('FLAG') || log.includes('ABORTED') ? 'text-red-400' : 'text-emerald-400/80'}
                    >
                      {log}
                    </div>
                  ))}
                  {auditState === 'auditing' && (
                    <div className="text-emerald-400 animate-pulse">_</div>
                  )}
                </div>
              </div>
            )}

            {auditState === 'failed' && (
              <div className="space-y-2">
                <div className="text-zinc-500">// PROOF_OF_LOGIC_CERTIFICATE (IRYS VERIFIED)</div>
                <div className="p-4 bg-red-950/20 border border-red-900/50" data-testid="terminal-certificate">
                  <pre className="text-red-400 text-xs overflow-x-auto">
                    {CERTIFICATE_JSON}
                  </pre>
                </div>
                <button
                  onClick={resetAudit}
                  className="w-full py-2 mt-2 border border-zinc-700 text-zinc-400 font-mono text-xs tracking-widest hover:border-zinc-500 hover:text-zinc-300 transition-colors uppercase"
                  data-testid="button-reset-audit"
                >
                  Reset Simulation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// COMBINED EXPORTS
// ============================================================================

export const DJZSSections: React.FC = () => {
  return (
    <>
      <ProofOfLogicTerminal />
      <TryTheOracle />
    </>
  );
};

const DJZSAllSections: React.FC = () => {
  return (
    <>
      <FoundersFund />
      <ProofOfLogicTerminal />
      <TryTheOracle />
    </>
  );
};

export default DJZSAllSections;
