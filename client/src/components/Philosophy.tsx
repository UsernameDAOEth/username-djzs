import React, { useEffect, useRef, useState } from 'react';

const LAWS = [
  {
    tag: 'LAW 01',
    title: 'Constraint Precedes Outcome',
    body: 'Every possible outcome must pass through constraint. Nothing manifests simply because it is imagined, desired, predicted, or prompted. An outcome must be admissible under the rules of the system producing it.',
  },
  {
    tag: 'LAW 02',
    title: 'Probability Is Observer Uncertainty',
    body: 'Probability describes what the observer does not know. It does not mean the system has no structure. In DJZS, probabilistic judgment is treated as incomplete visibility, not permission to act without verification.',
  },
  {
    tag: 'LAW 03',
    title: 'Structure Filters Possibility',
    body: 'Not every possible future is equally reachable. Incentives, liquidity, timing, evidence, execution limits, and feedback loops filter what can actually happen. DJZS audits those filters.',
  },
  {
    tag: 'LAW 04',
    title: 'Feedback Selects Reality',
    body: 'Systems evolve through feedback. A thesis, trade, prompt, or agent action changes the system it enters. DJZS treats every action as a feedback event that must be checked before release.',
  },
  {
    tag: 'LAW 05',
    title: 'Verification Must Precede Execution',
    body: 'Action without audit is blind simulation. Before capital moves, agents act, or narratives harden into belief, the reasoning layer must be tested. DJZS exists to audit before execution.',
  },
];

function LawAccordion({ law, index, isActive, onToggle, visible }: {
  law: typeof LAWS[number];
  index: number;
  isActive: boolean;
  onToggle: () => void;
  visible: boolean;
}) {
  return (
    <div
      onClick={onToggle}
      className={`border transition-all duration-300 cursor-pointer ${
        isActive ? 'border-green-400/50 bg-black/80' : 'border-zinc-800/60 bg-zinc-950/40'
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${0.08 * index}s, transform 0.5s ease ${0.08 * index}s, border-color 0.3s, background-color 0.3s`,
      }}
      data-testid={`philosophy-layer-${index}`}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-6">
        <div className="flex items-center gap-4 min-w-0">
          <span
            className={`font-mono text-[10px] tracking-[0.14em] shrink-0 border px-2 py-0.5 transition-colors duration-200 ${
              isActive ? 'border-green-400/50 text-green-400' : 'border-zinc-700/60 text-zinc-600'
            }`}
          >
            {law.tag}
          </span>
          <span
            className={`font-mono text-sm font-bold transition-colors duration-200 truncate ${
              isActive ? 'text-white' : 'text-zinc-400'
            }`}
          >
            {law.title}
          </span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span
            className={`font-mono text-base transition-all duration-200 inline-block ${
              isActive ? 'text-green-400' : 'text-zinc-700'
            }`}
            style={{ transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)' }}
          >
            +
          </span>
        </div>
      </div>

      <div
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: isActive ? '600px' : '0px' }}
      >
        <div className="px-5 pb-5 md:px-6 md:pb-6">
          <div className="border-l border-green-400/30 pl-5 md:pl-8 ml-1">
            <p className="font-mono text-xs text-zinc-300 leading-[1.9]">
              {law.body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PhilosophySection() {
  const [active, setActive] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="philosophy" className="py-20 px-4" data-testid="section-philosophy">
      <div className="max-w-3xl mx-auto" data-testid="section-dst">
        <div className="mb-12">
          <div className="font-mono text-[11px] text-green-400 tracking-[0.15em] mb-4">
            // THE_DETERMINISTIC_SIMULATION_THESIS
          </div>
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-6">
            The Deterministic Simulation Thesis
          </h2>

          <div className="space-y-5 max-w-2xl">
            <p className="font-mono text-[13px] text-zinc-400 leading-[1.8]">
              DJZS begins from one claim:{' '}
              <span className="text-green-400">Probabilistic systems are not unconstrained systems.</span>
            </p>
            <p className="font-mono text-[13px] text-zinc-500 leading-[1.8]">
              Markets, agents, swarms, human decisions, and AI outputs all appear uncertain from the
              observer's position. But their outcomes are shaped by structure: rules, incentives,
              memory, feedback, available information, and execution constraints.
            </p>
            <p className="font-mono text-[13px] text-zinc-500 leading-[1.8]">
              DST is the thesis that uncertainty lives at the surface, while admissible outcomes are
              governed by deeper deterministic structure.
            </p>
            <p className="font-mono text-[13px] text-zinc-400 leading-[1.8]">
              DJZS does not predict the future. DJZS audits whether a proposed action is structurally
              admissible before it becomes reality.
            </p>
            <p className="font-mono text-[13px] text-zinc-400 leading-[1.8]">
              A trade thesis can be probabilistic. An agent decision can be probabilistic. A market
              outcome can be probabilistic. But{' '}
              <span className="text-green-400">bad logic is not random</span> — it can be detected before execution.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[2px]">
          {LAWS.map((law, i) => (
            <LawAccordion
              key={law.tag}
              law={law}
              index={i}
              isActive={active === i}
              onToggle={() => setActive(active === i ? null : i)}
              visible={visible}
            />
          ))}
        </div>

        <div
          className="mt-10 border border-green-400/20 bg-green-400/[0.03] p-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
          }}
          data-testid="dst-product-bridge"
        >
          <div className="font-mono text-zinc-500 text-[10px] tracking-[0.15em] mb-4">
            // PHILOSOPHY → MACHINE → ARTIFACT
          </div>

          <p className="font-mono text-sm text-zinc-200 leading-relaxed mb-5">
            <span className="text-green-400">DST</span> is the philosophy.{' '}
            <span className="text-green-400">DJZS</span> is the machine.{' '}
            <span className="text-green-400">ProofOfLogic</span> is the artifact.
          </p>

          <p className="font-mono text-[13px] text-zinc-400 leading-[1.9] mb-4">
            The protocol converts this thesis into an audit pipeline:
          </p>

          <div className="font-mono text-[12px] text-zinc-400 leading-[1.9] space-y-1.5 mb-5 border-l border-zinc-800 pl-4">
            <div><span className="text-green-400">Input:</span> thesis, memo, prompt, strategy, or agent action.</div>
            <div><span className="text-green-400">Audit:</span> adversarial logic review against DJZS-LF failure codes.</div>
            <div><span className="text-green-400">Output:</span> PASS / FAIL verdict, risk score, detected flaws, and ProofOfLogic certificate.</div>
          </div>

          <p className="font-mono text-[13px] text-zinc-300 leading-[1.9] mb-4">
            Same input. Same constraints. Same verdict logic. That is deterministic verification
            applied to probabilistic systems.
          </p>

          <p className="font-mono text-[12px] text-zinc-500 leading-[1.8] pt-4 border-t border-zinc-800/60" data-testid="text-precision-note">
            DJZS does not claim perfect prediction or formal proof. It makes the audit path
            deterministic: same input, same constraints, same verdict logic.
          </p>
        </div>

        <div className="mt-10 pt-5 border-t border-zinc-800/60 flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: '0 0 8px rgba(74,222,128,0.5)' }} />
          <span className="font-mono text-[10px] text-zinc-600 tracking-[0.08em]">
            DST → DJZS-LF → PROOF_OF_LOGIC // AUDIT_BEFORE_EXECUTION // BASE_MAINNET
          </span>
        </div>
      </div>
    </section>
  );
}
