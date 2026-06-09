import React, { useEffect, useRef, useState } from 'react';

const AXIOMS = [
  {
    code: 'AX-00',
    label: 'Deterministic Verification Over Vibes',
    body: 'Surface-level observation is unreliable by design. The explicate order — the rendered surface of reality — is a projection, not a source. Any system that evaluates agent behavior at the output layer is auditing shadows on a wall. SIFR-0 audits at the logic layer, before the render call. Vibes are post-render artifacts. Verification is pre-render truth.',
  },
  {
    code: 'AX-01',
    label: 'Ground State Baseline',
    body: 'Every agent begins from zero. Not empty — calibrated. The ground state is the reference point against which all logic is measured. In holographic terms: the null frequency before the interference pattern forms. Deviation from ground state is not error. It is signal. The audit measures the deviation, not the state.',
  },
  {
    code: 'AX-02',
    label: 'Toroidal Fold',
    body: 'Logic does not travel in a line. It folds back on itself before it executes. The audit layer is the fold — the interior pass where intent and action are forced into contact. In the holomovement, the implicate and explicate orders are in constant exchange: enfolding and unfolding. The triadic pipeline (Breath → Spirit → Water → loop) implements this fold. What survives is verified. What collapses was never coherent.',
  },
  {
    code: 'AX-03',
    label: 'Scale Invariance',
    body: 'The same failure modes that corrupt a single agent corrupt a swarm. In a holographic system, every part contains the whole — and every failure pattern at one scale appears at every other scale. The LF-code taxonomy holds from a single transaction to an entire protocol. Logic failures do not change shape at scale. They amplify. The audit must be holographic: one framework, all scales.',
  },
  {
    code: 'AX-04',
    label: 'Holographic Substrate',
    body: 'Reality behaves as though appearance is downstream of a deeper informational order. Across holography, quantum foundations, and black-hole thermodynamics, the visible layer repeatedly acts like a rendered interface rather than the fundamental substrate. DJZS audits at the logic layer — the structure beneath the surface — because output-layer evaluation is unreliable by design. The claim is epistemic, not metaphysical: the verification holds whether or not the substrate is literally holographic.',
  },
  {
    code: 'AX-05',
    label: 'Exploitation Layer',
    body: 'Surface signals — sentiment, narrative, social proof — are unreliable inputs for autonomous action. Systems that judge behavior at the output layer audit artifacts, not logic. DJZS does not adjudicate the metaphysics of how that surface is produced; it builds verification that works regardless of which ontology is true. Deterministic verification requires no belief. It requires math.',
  },
];

function AxiomRow({ axiom, index, isActive, onToggle, visible }: {
  axiom: typeof AXIOMS[number];
  index: number;
  isActive: boolean;
  onToggle: () => void;
  visible: boolean;
}) {
  return (
    <div
      onClick={onToggle}
      className={`border transition-all duration-250 cursor-pointer ${
        isActive ? 'border-green-400/40 bg-green-400/[0.02]' : 'border-zinc-800/50 bg-zinc-950/30'
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-10px)',
        transition: `opacity 0.45s ease ${0.06 * index}s, transform 0.45s ease ${0.06 * index}s, border-color 0.25s, background-color 0.25s`,
      }}
      data-testid={`axiom-${axiom.code.toLowerCase()}`}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-3.5 md:px-6">
        <div className="flex items-center gap-4">
          <span
            className={`font-mono text-[10px] tracking-[0.12em] min-w-[52px] transition-colors duration-200 ${
              isActive ? 'text-green-400' : 'text-zinc-700'
            }`}
          >
            {axiom.code}
          </span>
          <span
            className={`font-mono text-[13px] font-semibold transition-colors duration-200 ${
              isActive ? 'text-white' : 'text-zinc-400'
            }`}
          >
            {axiom.label}
          </span>
        </div>
        <span
          className={`font-mono text-base transition-all duration-200 inline-block ${
            isActive ? 'text-green-400' : 'text-zinc-800'
          }`}
          style={{ transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </div>

      <div
        className="overflow-hidden transition-all duration-350"
        style={{ maxHeight: isActive ? '300px' : '0px' }}
      >
        <p className="px-5 pb-4 md:px-6 md:pb-5 pl-[76px] md:pl-[88px] border-l border-zinc-800/40 ml-5 md:ml-6 font-mono text-xs text-zinc-400 leading-[1.9]">
          {axiom.body}
        </p>
      </div>
    </div>
  );
}

export default function Axioms() {
  const [active, setActive] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="axioms" className="py-20 px-4" data-testid="section-axioms">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <div className="font-mono text-[11px] text-green-400 tracking-[0.15em] mb-4">
            // PROTOCOL_AXIOMS
          </div>
          <h2 className="font-mono text-xl md:text-2xl font-bold text-white tracking-tight leading-tight mb-4">
            The Mechanics of Verification
          </h2>
          <p className="font-mono text-[13px] text-zinc-500 leading-[1.8] max-w-xl">
            Six axioms define the DJZS verification fold — from deterministic logic to the informational
            substrate it audits within. Each axiom is a constraint; together they are the spec. DST is deterministic in its epistemics, agnostic in its ontology.
          </p>
        </div>

        <div className="flex flex-col gap-[2px]">
          {AXIOMS.map((axiom, i) => (
            <AxiomRow
              key={axiom.code}
              axiom={axiom}
              index={i}
              isActive={active === i}
              onToggle={() => setActive(active === i ? null : i)}
              visible={visible}
            />
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-zinc-800/40 flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: '0 0 6px rgba(74,222,128,0.4)' }} />
          <span className="font-mono text-[10px] text-zinc-600 tracking-[0.08em]">
            AX-00:AX-05 // AUDIT_BEFORE_ACT // DJZS_PROTOCOL_v2.0
          </span>
        </div>
      </div>
    </section>
  );
}
