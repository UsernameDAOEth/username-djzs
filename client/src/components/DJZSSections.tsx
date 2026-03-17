import React, { useEffect, useRef, useState } from 'react';

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
          ctx.fillStyle = `rgba(74, 222, 128, ${alpha})`;
          ctx.fill();
        }
      }

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 60);
      gradient.addColorStop(0, 'rgba(34, 197, 94, 0.15)');
      gradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.font = '24px monospace';
      ctx.fillStyle = `rgba(34, 197, 94, ${0.3 + Math.sin(time * 2) * 0.2})`;
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
      data-testid="canvas-torus"
      style={{ background: 'transparent' }}
    />
  );
};

const Sifr0Philosophy: React.FC = () => {
  const [activeMapping, setActiveMapping] = useState<number | null>(null);

  return (
    <section 
      id="sifr-0" 
      className="relative py-24 overflow-hidden bg-black"
      data-testid="section-sifr0"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs tracking-[0.4em] text-zinc-500 uppercase font-mono">
              // PHILOSOPHICAL_FOUNDATION
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 font-mono">
            SIFR <span className="text-zinc-600">—</span> 0
          </h2>
          
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-mono">
            The Spirit or Source Cypher
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          
          <div className="relative">
            <TorusCanvas />
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="text-xs tracking-widest text-zinc-600 uppercase font-mono">
                BREATH — SPIRIT — WATER
              </span>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl text-white font-bold font-mono">
                The Zero-Point Principle
              </h3>
              <p className="text-zinc-400 leading-relaxed font-mono text-sm">
                <span className="text-green-400 font-bold">SIFR</span> (صفر) — the Arabic root of both 
                <em className="text-zinc-300"> zero</em> and <em className="text-zinc-300">cipher</em>. 
                Before computation, the void. Before execution, validation.
              </p>
              <p className="text-zinc-400 leading-relaxed font-mono text-sm">
                Every agent action must pass through the constriction point — the central vortex where 
                intent is audited before manifestation is permitted.
              </p>
            </div>

            <div className="p-6 border border-zinc-800 bg-zinc-950/30">
              <div className="text-center text-lg tracking-wide text-zinc-300 font-mono">
                <span className="text-zinc-500">INTENT</span>
                <span className="mx-4 text-green-400">→</span>
                <span className="text-green-400 font-bold">[SIFR-0 AUDIT]</span>
                <span className="mx-4 text-green-400">→</span>
                <span className="text-zinc-500">MANIFESTATION</span>
              </div>
              <p className="text-center text-xs text-zinc-600 mt-4 tracking-wide font-mono">
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
                  className="text-center p-4 border border-zinc-800 bg-zinc-950/50"
                  data-testid={`card-substrate-${i}`}
                >
                  <div className="text-xs text-zinc-600 tracking-widest mb-1 font-mono">{item.substrate}</div>
                  <div className="text-sm text-white font-bold mb-1 font-mono">{item.layer}</div>
                  <div className="text-xs text-zinc-500 font-mono">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-16">
          <h3 className="text-center text-sm tracking-[0.3em] text-zinc-500 uppercase mb-12 font-mono">
            Cross-Tradition Zero-State Mapping
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {TRADITION_MAPPINGS.map((mapping, index) => (
              <div
                key={index}
                className={`
                  group cursor-pointer p-5 border transition-all duration-300
                  ${activeMapping === index 
                    ? 'border-green-400/50 bg-green-400/5' 
                    : 'border-zinc-800 hover:border-zinc-600'
                  }
                `}
                data-testid={`card-tradition-${index}`}
                onClick={() => setActiveMapping(activeMapping === index ? null : index)}
              >
                <div className="text-2xl mb-3 opacity-40 group-hover:opacity-70 transition-opacity">
                  {mapping.symbol}
                </div>
                <div className="text-xs text-zinc-600 tracking-wider uppercase mb-1 font-mono">
                  {mapping.tradition}
                </div>
                <div className="text-sm text-white font-bold mb-2 font-mono">
                  {mapping.concept}
                </div>
                <div 
                  className={`
                    text-xs text-green-400 transition-all duration-300 font-mono
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
          <blockquote className="text-2xl md:text-3xl text-zinc-400 font-bold italic max-w-3xl mx-auto leading-relaxed font-mono">
            "Nothing manifests without first passing through the void-state."
          </blockquote>
          <div className="mt-6 text-xs text-zinc-700 tracking-widest uppercase font-mono">
            — DJZS Protocol Axiom
          </div>
        </div>

      </div>
    </section>
  );
};

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
  { code: 'S01', severity: 'CRITICAL', name: 'Circular Logic', color: 'text-red-400' },
  { code: 'S02', severity: 'CRITICAL', name: 'Missing Falsifiability', color: 'text-red-400' },
  { code: 'E01', severity: 'HIGH', name: 'Confirmation Tunnel', color: 'text-amber-400' },
  { code: 'E02', severity: 'HIGH', name: 'Authority Substitution', color: 'text-amber-400' },
  { code: 'I01', severity: 'MEDIUM', name: 'FOMO Loop', color: 'text-blue-400' },
  { code: 'I02', severity: 'MEDIUM', name: 'Narrative Dependency', color: 'text-blue-400' },
  { code: 'X01', severity: 'CRITICAL', name: 'Unhedged Execution', color: 'text-red-400' },
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
      className="relative py-24 overflow-hidden bg-black"
      data-testid="section-try-oracle"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-xs tracking-[0.4em] text-zinc-500 uppercase font-mono">
              // SOFT_ORACLE_INIT
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 font-mono">
            Try the Oracle
          </h2>
          
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-mono mb-2">
            Zero infrastructure required. Paste into any AI chat.
          </p>
          <p className="text-sm text-zinc-600 font-mono">
            Become your own adversarial auditor.
          </p>
        </div>

        <div className="mb-12">
          <div className="text-xs tracking-[0.2em] text-zinc-500 uppercase mb-4 text-center font-mono">
            DJZS-LF Taxonomy
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {TAXONOMY_CODES.map((item) => (
              <div
                key={item.code}
                className="px-3 py-1.5 border border-zinc-800 bg-zinc-950/50 font-mono"
                data-testid={`badge-taxonomy-${item.code.toLowerCase()}`}
              >
                <span className={`text-xs font-bold ${item.color}`}>
                  {item.code}
                </span>
                <span className="text-xs text-zinc-500 ml-2">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between px-4 py-3 border border-zinc-800 border-b-0 bg-zinc-950/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400" />
              <span className="text-zinc-400 font-mono text-xs">SYSTEM DIRECTIVE</span>
            </div>
            <span className="text-xs text-zinc-500 font-mono">
              djzs-oracle-prompt.txt
            </span>
            <button
              onClick={handleCopy}
              data-testid="button-copy-oracle"
              className={`
                px-4 py-1.5 text-xs tracking-wider uppercase transition-all duration-300
                border font-mono font-bold
                ${copied 
                  ? 'bg-green-400/10 border-green-400 text-green-400' 
                  : 'border-zinc-700 text-zinc-400 hover:border-green-400/50 hover:text-green-400'
                }
              `}
            >
              {copied ? '✓ COPIED' : 'COPY'}
            </button>
          </div>

          <div className="relative border border-zinc-800 overflow-hidden bg-black">
            <pre
              ref={textRef}
              data-testid="code-oracle-prompt"
              className={`
                p-6 text-sm leading-relaxed overflow-x-auto font-mono
                transition-all duration-300 text-green-400/70
                ${showFullPrompt ? 'max-h-[600px]' : 'max-h-[280px]'}
              `}
            >
              <code>
                {DJZS_PROMPT_TEMPLATE.split('\n').map((line, i) => {
                  if (line.includes('[DJZS-')) {
                    const severity = line.includes('CRITICAL') ? 'text-red-400' 
                      : line.includes('HIGH') ? 'text-amber-400' 
                      : 'text-blue-400';
                    return (
                      <span key={i}>
                        <span className={severity}>{line}</span>
                        {'\n'}
                      </span>
                    );
                  }
                  if (line.startsWith('VERDICT:') || line.startsWith('RISK SCORE:') || 
                      line.startsWith('PRIMARY BIAS:') || line.startsWith('FLAGS:') ||
                      line.startsWith('FATAL FLAW:') || line.startsWith('REMEDIATION:')) {
                    return (
                      <span key={i}>
                        <span className="text-green-400">{line}</span>
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
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.98))',
                }}
              />
            )}

            <button
              onClick={() => setShowFullPrompt(!showFullPrompt)}
              data-testid="button-toggle-prompt"
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 text-xs text-zinc-500 hover:text-green-400 transition-colors font-mono"
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
              className="text-center p-6 border border-zinc-800 bg-zinc-950/50"
              data-testid={`card-step-${item.step}`}
            >
              <div className="text-3xl font-bold text-zinc-700 mb-2 font-mono">
                {item.step}
              </div>
              <div className="text-white font-bold mb-1 font-mono">{item.title}</div>
              <div className="text-sm text-zinc-500 font-mono">{item.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-6 border border-zinc-800 bg-zinc-950/50">
            <div className="text-xs tracking-[0.2em] text-zinc-500 uppercase mb-3 font-mono">
              // UPGRADE_PATH
            </div>
            <p className="text-zinc-400 mb-4 max-w-md font-mono text-sm">
              Need immutable ProofOfLogic certificates on Irys? 
              <br />
              On-chain LogicTrustScore on Base?
            </p>
            <a 
              href="https://djzs.ai/api"
              data-testid="link-full-protocol"
              className="inline-block px-6 py-3 text-sm tracking-wider uppercase border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 font-mono font-bold"
            >
              ACCESS FULL PROTOCOL →
            </a>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xs text-zinc-700 font-mono">
            // SOFT_ORACLE: Zero-cost entry point. Full protocol at djzs.ai/api
          </p>
        </div>

      </div>
    </section>
  );
};

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
