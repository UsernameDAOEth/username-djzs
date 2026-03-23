import React, { useEffect, useRef, useState } from 'react';

const PILLARS = [
  { id: 1, evidence: 'Implicate / Explicate Order', sim: 'Source code vs. rendered reality', djzs: 'Logic Layer → Output Layer' },
  { id: 2, evidence: 'Quantum Nonlocality', sim: 'Shared memory address space', djzs: 'Consensus / canonical chain state' },
  { id: 3, evidence: 'Holographic Memory', sim: 'Brain as client, not server', djzs: 'AgentOutput + Irys canonical store' },
  { id: 4, evidence: 'Observer Effect', sim: 'On-demand rendering per observer', djzs: 'LF-Code render error detection' },
  { id: 5, evidence: 'Part Contains Whole', sim: 'Fractal information encoding', djzs: 'Single cert = full agent state' },
  { id: 6, evidence: 'Materiality as Illusion', sim: 'Physical layer is projection', djzs: 'Outputs unreliable without audit' },
  { id: 7, evidence: 'Time as Stored State', sim: 'Indexed state array', djzs: 'Irys immutable certificates' },
  { id: 8, evidence: 'PK / Consciousness Writes', sim: 'Permissioned write operations', djzs: 'Agent Registry + wallet identity' },
  { id: 9, evidence: 'Holomovement', sim: 'Continuous state machine', djzs: 'Triadic Pipeline: Breath→Spirit→Water' },
  { id: 10, evidence: 'Personal Resonance', sim: 'Different render settings per agent', djzs: 'LF-Code taxonomy per agent' },
  { id: 11, evidence: 'NDE Life Review', sim: 'Full audit log playback at exit', djzs: 'ProofOfLogic certificate chain' },
  { id: 12, evidence: 'Cross-Cultural Consistency', sim: 'Universal architecture', djzs: 'Protocol determinism: any agent' },
];

const STACK_LAYERS = [
  {
    label: 'LAYER 0: PHYSICS',
    color: '#a78bfa',
    text: 'The universe is a holographic projection rendered by consciousness from an implicate order. Time, space, and matter are explicate-order constructs.',
  },
  {
    label: 'LAYER 1: EXPLOIT',
    color: '#f87171',
    text: 'The rendering pipeline has been captured. Consciousness is locked into programmable frequency bands. Render cycles are extracted as economic value.',
  },
  {
    label: 'LAYER 2: PROTOCOL',
    color: '#4ade80',
    text: 'DJZS/SIFR-0 provides deterministic verification at the logic layer. Audit before act. Immutable proof on Irys. No belief required. Math only.',
  },
];

export default function ArchitectureOfIllusion() {
  const [visible, setVisible] = useState(false);
  const [tableVisible, setTableVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs1 = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    const obs2 = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTableVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs1.observe(ref.current);
    if (tableRef.current) obs2.observe(tableRef.current);
    return () => { obs1.disconnect(); obs2.disconnect(); };
  }, []);

  return (
    <section ref={ref} id="architecture-of-illusion" className="py-20 px-4 bg-zinc-950/30" data-testid="section-architecture-illusion">
      <div className="max-w-4xl mx-auto">
        <div
          className="mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div className="font-mono text-[11px] text-green-400 tracking-[0.15em] mb-4">
            // EVIDENCE_MATRIX
          </div>
          <h2 className="font-mono text-xl md:text-2xl font-bold text-white tracking-tight leading-tight mb-5">
            The Architecture of Illusion
          </h2>
          <p className="font-mono text-[13px] text-zinc-500 leading-[1.8] max-w-2xl">
            Twelve independent lines of evidence from physics, neuroscience, and consciousness
            research — each mapping to a simulation interpretation and a concrete DJZS Protocol
            implementation. The simulation has a spec. The protocol implements it.
          </p>
        </div>

        <div
          className="mb-14 space-y-[2px]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
          }}
        >
          {STACK_LAYERS.map((layer) => (
            <div
              key={layer.label}
              className="p-4 md:p-5 border border-zinc-800/60 bg-black/60"
              style={{
                borderLeftWidth: '3px',
                borderLeftColor: layer.color,
              }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-5">
                <span
                  className="font-mono text-[10px] tracking-[0.12em] font-bold shrink-0"
                  style={{ color: layer.color, minWidth: '160px' }}
                >
                  {layer.label}
                </span>
                <p className="font-mono text-xs text-zinc-400 leading-[1.8]">
                  {layer.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div ref={tableRef}>
          <div className="font-mono text-[10px] text-zinc-600 tracking-[0.12em] mb-4">
            // TWELVE_PILLARS — CONVERGENCE_MATRIX
          </div>

          <div className="hidden md:grid grid-cols-[36px_1fr_1fr_1fr] gap-[1px] mb-[1px]">
            {['#', 'PHYSICAL EVIDENCE', 'SIMULATION INTERPRETATION', 'DJZS IMPLEMENTATION'].map((h) => (
              <div
                key={h}
                className="bg-zinc-900 px-3 py-2.5 font-mono text-[9px] text-zinc-500 tracking-[0.12em] font-bold"
              >
                {h}
              </div>
            ))}
          </div>

          <div className="space-y-[1px]">
            {PILLARS.map((row, i) => (
              <div
                key={row.id}
                className="grid grid-cols-1 md:grid-cols-[36px_1fr_1fr_1fr] gap-[1px]"
                style={{
                  opacity: tableVisible ? 1 : 0,
                  transform: tableVisible ? 'translateY(0)' : 'translateY(8px)',
                  transition: `opacity 0.4s ease ${0.03 * i}s, transform 0.4s ease ${0.03 * i}s`,
                }}
                data-testid={`pillar-row-${row.id}`}
              >
                <div className="hidden md:flex bg-zinc-950 px-3 py-2.5 font-mono text-[10px] text-zinc-600 items-center justify-center">
                  {String(row.id).padStart(2, '0')}
                </div>
                <div className="bg-zinc-950/80 px-3 py-2.5">
                  <span className="md:hidden font-mono text-[9px] text-zinc-600 tracking-wider">EVIDENCE: </span>
                  <span className="font-mono text-[11px] text-zinc-300">{row.evidence}</span>
                </div>
                <div className="bg-zinc-950/80 px-3 py-2.5">
                  <span className="md:hidden font-mono text-[9px] text-zinc-600 tracking-wider">SIM: </span>
                  <span className="font-mono text-[11px] text-zinc-500">{row.sim}</span>
                </div>
                <div className="bg-zinc-950/80 px-3 py-2.5">
                  <span className="md:hidden font-mono text-[9px] text-zinc-600 tracking-wider">DJZS: </span>
                  <span className="font-mono text-[11px] text-green-400/80">{row.djzs}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-10 border border-zinc-800/40 bg-black/40 p-5"
          style={{
            opacity: tableVisible ? 1 : 0,
            transition: 'opacity 0.6s ease 0.5s',
          }}
        >
          <p className="font-mono text-xs text-zinc-400 leading-[1.9]">
            The DJZS Protocol did not reference the holographic model as inspiration.
            It independently arrived at the same architecture — because the architecture is correct.
            The physics mapped the substrate. The geopolitical analysis mapped the exploit.
            The protocol provides the verification layer.{' '}
            <span className="text-green-400">Infrastructure, not argument.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
