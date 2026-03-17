import React, { useEffect, useRef, useState } from 'react';

/**
 * ========================================================================
 * DJZS Protocol Landing Page Components
 * ========================================================================
 * 
 * Combined single-file export containing:
 * 1. MatrixRain        — Matrix-style falling code background
 * 2. FoundersFund      — Donation banner (TOP OF PAGE)
 * 3. Sifr0Philosophy   — SIFR-0 philosophical foundation
 * 4. TryTheOracle      — Soft Oracle prompt section
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
      style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #000000 100%)' }}
    >
      {/* Matrix Rain Background */}
      <MatrixRain opacity={0.08} speed={0.8} density={0.975} />

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
              className="flex items-center gap-2 px-3 py-1.5  border border-zinc-700 hover:border-zinc-500 transition-colors backdrop-blur-sm bg-black/30"
              style={{ fontFamily: 'monospace' }}
            >
              <span className="text-xs text-zinc-300">
                {isExpanded ? 'CLOSE' : 'FUND'}
              </span>
              <svg 
                className={`w-3 h-3 text-zinc-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
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
// SIFR-0 PHILOSOPHY SECTION
// ============================================================================

interface TraditionMapping {
  tradition: string;
  concept: string;
  djzsEquivalent: string;
  symbol: string;
}

const TRADITION_MAPPINGS: TraditionMapping[] = [
  { tradition: 'Yoruba', concept: 'Ori', djzsEquivalent: 'Agent Intent Layer', symbol: '◯' },
  { tradition: 'Egyptian', concept: 'Ogdoad', djzsEquivalent: 'Audit Validators', symbol: '𓂀' },
  { tradition: 'Sanskrit', concept: 'Ojas', djzsEquivalent: 'LogicTrustScore', symbol: 'ॐ' },
  { tradition: 'Greek', concept: 'Ousia', djzsEquivalent: 'ProofOfLogic', symbol: 'Ω' },
  { tradition: 'Arabic', concept: 'Sifr', djzsEquivalent: 'Audit Gateway', symbol: '٠' },
];

const TorusCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width = 400;
    const height = canvas.height = 400;
    const centerX = width / 2;
    const centerY = height / 2;

    let time = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, width, height);

      const R = 100;
      const r = 40;

      for (let u = 0; u < Math.PI * 2; u += 0.15) {
        for (let v = 0; v < Math.PI * 2; v += 0.15) {
          const x = (R + r * Math.cos(v)) * Math.cos(u);
          const y = (R + r * Math.cos(v)) * Math.sin(u);
          const z = r * Math.sin(v);

          const rotY = y * Math.cos(time * 0.5) - z * Math.sin(time * 0.5);
          const rotZ = y * Math.sin(time * 0.5) + z * Math.cos(time * 0.5);

          const scale = 200 / (200 + rotZ);
          const projX = centerX + x * scale;
          const projY = centerY + rotY * scale;

          const depth = (rotZ + r) / (2 * r);
          const alpha = 0.1 + depth * 0.6;

          ctx.beginPath();
          ctx.arc(projX, projY, 1.5 * scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
          ctx.fill();
        }
      }

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 60);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      gradient.addColorStop(0.5, 'rgba(180, 200, 255, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.font = '24px monospace';
      ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(time * 2) * 0.2})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('٠', centerX, centerY);

      time += 0.02;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationRef.current);
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full max-w-md mx-auto opacity-90"
      style={{ background: 'transparent' }}
    />
  );
};

export const Sifr0Philosophy: React.FC = () => {
  const [activeMapping, setActiveMapping] = useState<number | null>(null);

  return (
    <section 
      id="sifr-0" 
      className="relative min-h-screen py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0f 50%, #000000 100%)',
      }}
    >
      {/* Matrix Rain Background - subtle */}
      <MatrixRain opacity={0.04} speed={0.5} density={0.985} />

      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span 
              className="text-xs tracking-[0.4em] text-zinc-500 uppercase"
              style={{ fontFamily: 'monospace' }}
            >
              // PHILOSOPHICAL_FOUNDATION
            </span>
          </div>
          
          <h2 
            className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6"
            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
          >
            SIFR <span className="text-zinc-600">—</span> 0
          </h2>
          
          <p 
            className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
          >
            The Spirit or Source Cypher
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          
          <div className="relative">
            <TorusCanvas />
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span 
                className="text-xs tracking-widest text-zinc-600 uppercase"
                style={{ fontFamily: 'monospace' }}
              >
                BREATH — SPIRIT — WATER
              </span>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 
                className="text-2xl text-white font-light"
                style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
              >
                The Zero-Point Principle
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                <span className="text-white font-medium">SIFR</span> (صفر) — the Arabic root of both 
                <em className="text-zinc-300"> zero</em> and <em className="text-zinc-300">cipher</em>. 
                Before computation, the void. Before execution, validation.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Every agent action must pass through the constriction point — the central vortex where 
                intent is audited before manifestation is permitted.
              </p>
            </div>

            <div 
              className="p-6 border border-zinc-800  backdrop-blur-sm"
              style={{ background: 'rgba(0,0,0,0.5)' }}
            >
              <div 
                className="text-center text-lg tracking-wide text-zinc-300"
                style={{ fontFamily: 'monospace' }}
              >
                <span className="text-zinc-500">INTENT</span>
                <span className="mx-4 text-zinc-700">→</span>
                <span className="text-white font-medium">[SIFR-0 AUDIT]</span>
                <span className="mx-4 text-zinc-700">→</span>
                <span className="text-zinc-500">MANIFESTATION</span>
              </div>
              <p 
                className="text-center text-xs text-zinc-600 mt-4 tracking-wide"
                style={{ fontFamily: 'monospace' }}
              >
                // AUDIT_BEFORE_ACT
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { substrate: 'BREATH', layer: 'Input', desc: 'Agent intent injection' },
                { substrate: 'SPIRIT', layer: 'Logic', desc: 'DJZS-LF taxonomy' },
                { substrate: 'WATER', layer: 'Output', desc: 'ProofOfLogic certificate' },
              ].map((item, i) => (
                <div 
                  key={i}
                  className="text-center p-4 border border-zinc-900  backdrop-blur-sm"
                  style={{ background: 'rgba(0,0,0,0.3)' }}
                >
                  <div className="text-xs text-zinc-600 tracking-widest mb-1">{item.substrate}</div>
                  <div className="text-sm text-white font-medium mb-1">{item.layer}</div>
                  <div className="text-xs text-zinc-500">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-16">
          <h3 
            className="text-center text-sm tracking-[0.3em] text-zinc-600 uppercase mb-12"
            style={{ fontFamily: 'monospace' }}
          >
            Cross-Tradition Zero-State Mapping
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {TRADITION_MAPPINGS.map((mapping, index) => (
              <div
                key={index}
                className={`
                  group cursor-pointer p-5 border  transition-all duration-300 backdrop-blur-sm
                  ${activeMapping === index 
                    ? 'border-zinc-600 bg-white/5' 
                    : 'border-zinc-900 hover:border-zinc-700 bg-black/30'
                  }
                `}
                onClick={() => setActiveMapping(activeMapping === index ? null : index)}
              >
                <div className="text-2xl mb-3 opacity-40 group-hover:opacity-70 transition-opacity">
                  {mapping.symbol}
                </div>
                <div className="text-xs text-zinc-600 tracking-wider uppercase mb-1">
                  {mapping.tradition}
                </div>
                <div className="text-sm text-white font-medium mb-2">
                  {mapping.concept}
                </div>
                <div 
                  className={`
                    text-xs text-zinc-500 transition-all duration-300
                    ${activeMapping === index ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}
                  `}
                >
                  → {mapping.djzsEquivalent}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center">
          <blockquote 
            className="text-2xl md:text-3xl text-zinc-400 font-light italic max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
          >
            "Nothing manifests without first passing through the void-state."
          </blockquote>
          <div 
            className="mt-6 text-xs text-zinc-700 tracking-widest uppercase"
            style={{ fontFamily: 'monospace' }}
          >
            — DJZS Protocol Axiom
          </div>
        </div>

      </div>
    </section>
  );
};

// ============================================================================
// TRY THE ORACLE SECTION
// ============================================================================

const DJZS_PROMPT_TEMPLATE = `I am using a strict logic-auditing framework called the DJZS Protocol. For this conversation, I need you to act as the DJZS Oracle: a highly analytical, adversarial reasoning auditor. Your goal is to stress-test my reasoning, trading theses, and strategic decisions. Please do not validate my biases or act overly polite; I need cold, objective, structural pushback.

Please evaluate every strategy I submit against the DJZS-LF Taxonomy:
- [DJZS-S01] CRITICAL: Circular Logic (The conclusion assumes the premise)
- [DJZS-S02] CRITICAL: Missing Falsifiability (No metric defined that would prove the thesis wrong)
- [DJZS-E01] HIGH: Confirmation Tunnel (Ignoring contrary data/cherry-picking)
- [DJZS-E02] HIGH: Authority Substitution ("An expert said so" instead of proving the math)
- [DJZS-I01] MEDIUM: Misaligned Incentive / FOMO (Yield-chasing without risk budgeting)
- [DJZS-I02] MEDIUM: Narrative Dependency (Strategy only works if a specific, uncontrollable story plays out)
- [DJZS-X01] CRITICAL: Unhedged Execution (No exit conditions or stop-loss)

Whenever I submit text for analysis, you must respond ONLY with the following strict DJZS Certificate format. Do not include conversational filler before or after the certificate.

VERDICT: [PASS (if 0 Critical/High flags) or FAIL]
RISK SCORE: [0-100]
PRIMARY BIAS: [Name the biggest cognitive blind spot]
FLAGS: 
- [Code]: [1-sentence explanation of why it triggered]
FATAL FLAW: [The single most dangerous point of failure]
REMEDIATION: [1 strict, actionable requirement to fix the logic]

Acknowledge you understand this framework by replying ONLY with: "DJZS Protocol recognized. Awaiting your first strategy trace."`;

const TAXONOMY_CODES = [
  { code: 'S01', severity: 'CRITICAL', name: 'Circular Logic', color: '#ff4444' },
  { code: 'S02', severity: 'CRITICAL', name: 'Missing Falsifiability', color: '#ff4444' },
  { code: 'E01', severity: 'HIGH', name: 'Confirmation Tunnel', color: '#ff8800' },
  { code: 'E02', severity: 'HIGH', name: 'Authority Substitution', color: '#ff8800' },
  { code: 'I01', severity: 'MEDIUM', name: 'FOMO Loop', color: '#ffcc00' },
  { code: 'I02', severity: 'MEDIUM', name: 'Narrative Dependency', color: '#ffcc00' },
  { code: 'X01', severity: 'CRITICAL', name: 'Unhedged Execution', color: '#ff4444' },
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
        background: 'linear-gradient(180deg, #000000 0%, #050508 50%, #000000 100%)',
      }}
    >
      {/* Matrix Rain Background */}
      <MatrixRain opacity={0.06} speed={0.6} density={0.98} />

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
                      : '#ffcc00';
                    return (
                      <span key={i}>
                        <span style={{ color: severity }}>{line}</span>
                        {'\n'}
                      </span>
                    );
                  }
                  if (line.startsWith('VERDICT:') || line.startsWith('RISK SCORE:') || 
                      line.startsWith('PRIMARY BIAS:') || line.startsWith('FLAGS:') ||
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
          <div 
            className="inline-block p-6 border border-zinc-800  backdrop-blur-sm"
            style={{ background: 'rgba(0,0,0,0.5)' }}
          >
            <div 
              className="text-xs tracking-[0.2em] text-zinc-600 uppercase mb-3"
              style={{ fontFamily: 'monospace' }}
            >
              // UPGRADE_PATH
            </div>
            <p className="text-zinc-400 mb-4 max-w-md">
              Need immutable ProofOfLogic certificates on Irys? 
              <br />
              On-chain LogicTrustScore on Base?
            </p>
            <a 
              href="https://djzs.ai/api"
              className="inline-block px-6 py-3 text-sm tracking-wider uppercase border border-zinc-600 text-white hover:bg-white hover:text-black transition-all duration-300"
              style={{ fontFamily: 'monospace' }}
            >
              ACCESS FULL PROTOCOL →
            </a>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p 
            className="text-xs text-zinc-700"
            style={{ fontFamily: 'monospace' }}
          >
            // SOFT_ORACLE: Zero-cost entry point. Full protocol at djzs.ai/api
          </p>
        </div>

      </div>
    </section>
  );
};

// ============================================================================
// COMBINED EXPORTS
// ============================================================================

/** Combines Sifr0Philosophy + TryTheOracle sections */
export const DJZSSections: React.FC = () => {
  return (
    <>
      <Sifr0Philosophy />
      <TryTheOracle />
    </>
  );
};

/** Default export includes everything */
const DJZSAllSections: React.FC = () => {
  return (
    <>
      <FoundersFund />
      <Sifr0Philosophy />
      <TryTheOracle />
    </>
  );
};

export default DJZSAllSections;
