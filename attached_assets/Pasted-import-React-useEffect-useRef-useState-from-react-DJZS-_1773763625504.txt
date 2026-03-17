import React, { useEffect, useRef, useState } from 'react';

/**
 * DJZS Protocol Landing Page Sections
 * Combined: Sifr0Philosophy + TryTheOracle
 * 
 * Usage: Import and add to your landing page after existing sections
 * <DJZSSections />
 */

// =============================================================================
// SIFR-0 PHILOSOPHY SECTION
// =============================================================================

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

      ctx.font = '24px serif';
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

const Sifr0Philosophy: React.FC = () => {
  const [activeMapping, setActiveMapping] = useState<number | null>(null);

  return (
    <section 
      id="sifr-0" 
      className="relative min-h-screen py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0f 50%, #000000 100%)',
      }}
    >
      <div 
        className="absolute inset-0 opacity-5"
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
              className="text-xs tracking-[0.4em] text-gray-500 uppercase"
              style={{ fontFamily: 'monospace' }}
            >
              // PHILOSOPHICAL_FOUNDATION
            </span>
          </div>
          
          <h2 
            className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            SIFR <span className="text-gray-600">—</span> 0
          </h2>
          
          <p 
            className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            The Spirit or Source Cypher
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          
          <div className="relative">
            <TorusCanvas />
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span 
                className="text-xs tracking-widest text-gray-600 uppercase"
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
                style={{ fontFamily: 'Georgia, serif' }}
              >
                The Zero-Point Principle
              </h3>
              <p className="text-gray-400 leading-relaxed">
                <span className="text-white font-medium">SIFR</span> (صفر) — the Arabic root of both 
                <em className="text-gray-300"> zero</em> and <em className="text-gray-300">cipher</em>. 
                Before computation, the void. Before execution, validation.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Every agent action must pass through the constriction point — the central vortex where 
                intent is audited before manifestation is permitted.
              </p>
            </div>

            <div 
              className="p-6 border border-gray-800 rounded-sm"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <div 
                className="text-center text-lg tracking-wide text-gray-300"
                style={{ fontFamily: 'monospace' }}
              >
                <span className="text-gray-500">INTENT</span>
                <span className="mx-4 text-gray-700">→</span>
                <span className="text-white font-medium">[SIFR-0 AUDIT]</span>
                <span className="mx-4 text-gray-700">→</span>
                <span className="text-gray-500">MANIFESTATION</span>
              </div>
              <p 
                className="text-center text-xs text-gray-600 mt-4 tracking-wide"
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
                  className="text-center p-4 border border-gray-900 rounded-sm"
                  style={{ background: 'rgba(255,255,255,0.01)' }}
                >
                  <div className="text-xs text-gray-600 tracking-widest mb-1">{item.substrate}</div>
                  <div className="text-sm text-white font-medium mb-1">{item.layer}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-16">
          <h3 
            className="text-center text-sm tracking-[0.3em] text-gray-600 uppercase mb-12"
            style={{ fontFamily: 'monospace' }}
          >
            Cross-Tradition Zero-State Mapping
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {TRADITION_MAPPINGS.map((mapping, index) => (
              <div
                key={index}
                className={`
                  group cursor-pointer p-5 border rounded-sm transition-all duration-300
                  ${activeMapping === index 
                    ? 'border-gray-600 bg-white/5' 
                    : 'border-gray-900 hover:border-gray-700'
                  }
                `}
                onClick={() => setActiveMapping(activeMapping === index ? null : index)}
              >
                <div className="text-2xl mb-3 opacity-40 group-hover:opacity-70 transition-opacity">
                  {mapping.symbol}
                </div>
                <div className="text-xs text-gray-600 tracking-wider uppercase mb-1">
                  {mapping.tradition}
                </div>
                <div className="text-sm text-white font-medium mb-2">
                  {mapping.concept}
                </div>
                <div 
                  className={`
                    text-xs text-gray-500 transition-all duration-300
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
            className="text-2xl md:text-3xl text-gray-400 font-light italic max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            "Nothing manifests without first passing through the void-state."
          </blockquote>
          <div 
            className="mt-6 text-xs text-gray-700 tracking-widest uppercase"
            style={{ fontFamily: 'monospace' }}
          >
            — DJZS Protocol Axiom
          </div>
        </div>

      </div>
    </section>
  );
};

// =============================================================================
// TRY THE ORACLE SECTION
// =============================================================================

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

const TryTheOracle: React.FC = () => {
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
              className="text-xs tracking-[0.4em] text-gray-600 uppercase"
              style={{ fontFamily: 'monospace' }}
            >
              // SOFT_ORACLE_INIT
            </span>
          </div>
          
          <h2 
            className="text-4xl md:text-6xl font-light tracking-tight text-white mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Try the Oracle
          </h2>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-2">
            Zero infrastructure required. Paste into any AI chat.
          </p>
          <p className="text-sm text-gray-600">
            Become your own adversarial auditor.
          </p>
        </div>

        <div className="mb-12">
          <div 
            className="text-xs tracking-[0.2em] text-gray-600 uppercase mb-4 text-center"
            style={{ fontFamily: 'monospace' }}
          >
            DJZS-LF Taxonomy
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {TAXONOMY_CODES.map((item) => (
              <div
                key={item.code}
                className="px-3 py-1.5 rounded-sm border border-gray-800 bg-black/50"
                style={{ fontFamily: 'monospace' }}
              >
                <span 
                  className="text-xs font-medium"
                  style={{ color: item.color }}
                >
                  {item.code}
                </span>
                <span className="text-xs text-gray-600 ml-2">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div 
            className="flex items-center justify-between px-4 py-3 border border-gray-800 border-b-0 rounded-t-sm"
            style={{ background: 'rgba(20,20,25,0.9)' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span 
              className="text-xs text-gray-500"
              style={{ fontFamily: 'monospace' }}
            >
              djzs-oracle-prompt.txt
            </span>
            <button
              onClick={handleCopy}
              className={`
                px-4 py-1.5 text-xs tracking-wider uppercase transition-all duration-300
                border rounded-sm
                ${copied 
                  ? 'bg-green-500/20 border-green-500/50 text-green-400' 
                  : 'bg-white/5 border-gray-700 text-gray-400 hover:bg-white/10 hover:border-gray-600'
                }
              `}
              style={{ fontFamily: 'monospace' }}
            >
              {copied ? '✓ COPIED' : 'COPY'}
            </button>
          </div>

          <div 
            className="relative border border-gray-800 rounded-b-sm overflow-hidden"
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
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
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
              className="text-center p-6 border border-gray-900 rounded-sm"
              style={{ background: 'rgba(255,255,255,0.01)' }}
            >
              <div 
                className="text-3xl font-light text-gray-700 mb-2"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {item.step}
              </div>
              <div className="text-white font-medium mb-1">{item.title}</div>
              <div className="text-sm text-gray-500">{item.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div 
            className="inline-block p-6 border border-gray-800 rounded-sm"
            style={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <div 
              className="text-xs tracking-[0.2em] text-gray-600 uppercase mb-3"
              style={{ fontFamily: 'monospace' }}
            >
              // UPGRADE_PATH
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Need immutable ProofOfLogic certificates on Irys? 
              <br />
              On-chain LogicTrustScore on Base?
            </p>
            <a 
              href="https://djzs.ai/api"
              className="inline-block px-6 py-3 text-sm tracking-wider uppercase border border-gray-600 text-white hover:bg-white hover:text-black transition-all duration-300"
              style={{ fontFamily: 'monospace' }}
            >
              ACCESS FULL PROTOCOL →
            </a>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p 
            className="text-xs text-gray-700"
            style={{ fontFamily: 'monospace' }}
          >
            // SOFT_ORACLE: Zero-cost entry point. Full protocol at djzs.ai/api
          </p>
        </div>

      </div>
    </section>
  );
};

// =============================================================================
// COMBINED EXPORT
// =============================================================================

const DJZSSections: React.FC = () => {
  return (
    <>
      <Sifr0Philosophy />
      <TryTheOracle />
    </>
  );
};

export default DJZSSections;
export { Sifr0Philosophy, TryTheOracle };
