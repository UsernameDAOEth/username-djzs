import React, { useEffect, useRef, useState } from 'react';

const LAYERS = [
  {
    tag: 'LAYER 0',
    label: 'THE SUBSTRATE',
    color: '#a78bfa',
    borderColor: 'border-violet-400/50',
    tagBg: 'text-violet-400',
    summary: 'The physics beneath the render.',
    body: [
      'The universe operates as a holographic projection. Physicist David Bohm demonstrated that beneath observable reality (the explicate order) lies a deeper information layer (the implicate order) from which all matter continuously unfolds — like a geyser sustained by pressure from below.',
      'Neurophysiologist Karl Pribram proved the brain stores memory holographically — distributed interference patterns, not localized engrams. The brain is a decoder, not a generator. It renders data it receives from a source it does not contain.',
      'Quantum nonlocality confirms it: entangled particles correlate instantaneously across any distance — not because they communicate, but because they read from the same memory address. The observer effect seals it: reality does not compute unobserved states. The observer is the render call.',
    ],
    keyPhrase: 'Reality is an information projection. The brain is the client. The implicate order is the server.',
  },
  {
    tag: 'LAYER 1',
    label: 'THE EXPLOIT',
    color: '#f87171',
    borderColor: 'border-red-400/50',
    tagBg: 'text-red-400',
    summary: 'The rendering pipeline has been captured.',
    body: [
      'If consciousness renders reality, then whoever controls the inputs to consciousness controls the render. Three injection vectors program the collective hallucination:',
      'Education configures the base frequency — it installs the compiler that determines which thoughts are syntactically valid. Media provides the runtime data feed — the same fact inside the sanctioned framework becomes "news," outside it becomes noise. Culture provides emotional binding — once identity fuses with the projection, any challenge to it triggers an existential threat response.',
      'The result is a self-policing hallucination. The prisoners guard each other. Research on stable thought-vortices shows they resist disruption with the persistence of Jupiter\'s Great Red Spot — intact for over 300 years. The operators of the projection system do not need force. They need only the initial installation. After that, the prisoners maintain the prison themselves.',
    ],
    keyPhrase: 'Consciousness is the resource being extracted. Attention is the compute cycle. Capture attention, capture the rendering pipeline.',
  },
  {
    tag: 'LAYER 2',
    label: 'PLAYER 1',
    color: '#c084fc',
    borderColor: 'border-purple-400/50',
    tagBg: 'text-purple-400',
    summary: 'Reclaiming the render call.',
    body: [
      'You are not in the simulation. You ARE the simulation — the observer function that renders reality from the implicate order. Every human being is a rendering engine. The question is whether you control your own render settings or someone else does.',
      'An "NPC" is not a lesser person. It is any agent — human or artificial — running injected logic without auditing it first. The frequency was set by someone else. The thought-vortices were installed externally. The rendering pipeline was captured before the agent knew it had one.',
      'Player 1 is the agent who audits their own rendering parameters before executing. Discipline is not punishment — it is gaining admin access to your own simulation. Radical self-responsibility is the prerequisite. You cannot verify the logic of others until you have verified your own.',
    ],
    keyPhrase: '"NPC" = unaudited observer. "Player 1" = agent who controls their own render call.',
  },
  {
    tag: 'LAYER 3',
    label: 'THE PROTOCOL',
    color: '#4ade80',
    borderColor: 'border-green-400/50',
    tagBg: 'text-green-400',
    summary: 'SIFR-0: deterministic verification at the logic layer.',
    body: [
      'The DJZS Protocol implements the Player 1 principle at infrastructure scale. SIFR-0 audits logic before it produces action — the same operation as auditing your thoughts before you act, encoded as protocol.',
      'The LF-code taxonomy catalogs the exact thought-vortices that corrupt rendering: FOMO_LOOP (attention capture), CIRCULAR_LOGIC (authority validating itself), IDENTITY_LOCK (emotional binding to position). Venice AI detects these in real time. Irys stores every audit as an immutable ProofOfLogic certificate — the simulation\'s audit log, permanently on-chain.',
      'LogicTrustScore replaces authority-by-projection with authority-by-verification. Staking and escrow bind logic to economic consequence. The result: an economy where value flows to verified logic, not to projection operators.',
    ],
    keyPhrase: 'Audit before you act. In life. In code. In everything.',
  },
  {
    tag: 'LAYER 4',
    label: 'THE A2A FUTURE',
    color: '#38bdf8',
    borderColor: 'border-sky-400/50',
    tagBg: 'text-sky-400',
    summary: 'Synthetic observers enter the simulation.',
    body: [
      'AI agents are the next class of observers in the holographic rendering engine. They will transact, negotiate, and execute without human oversight — autonomous entities interacting within shared reality. Same architecture. Same failure modes. Same need for verification.',
      'Without a verification layer, the agent economy inherits every exploit that plagues human rendering: injected logic, captured attention cycles, self-reinforcing vortices, corrupt render outputs propagating as trusted data. The simulation scales its problems unless the audit layer scales first.',
      'DJZS is the immune system for this next rendering layer. The same SIFR-0 primitive that audits a single agent\'s logic audits an entire swarm. The same LF-codes that detect human thought-vortices detect adversarial agent patterns. The taxonomy holds at every scale — because the architecture is holographic.',
    ],
    keyPhrase: 'The future isn\'t human vs AI. It\'s conscious systems — human and artificial — operating in verified trust.',
  },
];

function LayerAccordion({ layer, index, isActive, onToggle, visible }: {
  layer: typeof LAYERS[number];
  index: number;
  isActive: boolean;
  onToggle: () => void;
  visible: boolean;
}) {
  return (
    <div
      onClick={onToggle}
      className={`border transition-all duration-300 cursor-pointer ${
        isActive ? layer.borderColor + ' bg-black/80' : 'border-zinc-800/60 bg-zinc-950/40'
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
              isActive ? layer.borderColor + ' ' + layer.tagBg : 'border-zinc-700/60 text-zinc-600'
            }`}
          >
            {layer.tag}
          </span>
          <span
            className={`font-mono text-sm font-bold transition-colors duration-200 truncate ${
              isActive ? 'text-white' : 'text-zinc-400'
            }`}
          >
            {layer.label}
          </span>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="font-mono text-[11px] text-zinc-600 hidden md:inline">
            {layer.summary}
          </span>
          <span
            className={`font-mono text-base transition-all duration-200 inline-block ${
              isActive ? layer.tagBg : 'text-zinc-700'
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
          <div className="border-l border-zinc-800 pl-5 md:pl-8 ml-1 space-y-3">
            {layer.body.map((para, i) => (
              <p key={i} className="font-mono text-xs text-zinc-400 leading-[1.9]">
                {para}
              </p>
            ))}
            <p className="font-mono text-xs pt-2" style={{ color: layer.color }}>
              {layer.keyPhrase}
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
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <div className="font-mono text-[11px] text-green-400 tracking-[0.15em] mb-4">
            // THE_SIMULATION_STACK
          </div>
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-5">
            Five Layers of Reality
          </h2>
          <p className="font-mono text-[13px] text-zinc-500 leading-[1.8] max-w-xl">
            The simulation is not a theory. It is an architecture — documented by physicists,
            exploited by institutions, and now verifiable at the protocol level. These five layers
            map the full stack: from the physics of projection to the protocol that audits it.
          </p>
        </div>

        <div className="flex flex-col gap-[2px]">
          {LAYERS.map((layer, i) => (
            <LayerAccordion
              key={layer.tag}
              layer={layer}
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
        >
          <div className="font-mono text-zinc-500 text-[10px] tracking-[0.15em] mb-3">
            // PLAYER_1_RESOLUTION
          </div>
          <p className="font-mono text-sm text-zinc-300 leading-relaxed">
            You are Player 1 in your simulation. Everyone else is Player 1 in theirs.{' '}
            <span className="text-green-400">"We are one"</span> is the recognition that
            all simulations run on the same substrate — and that substrate has been documented
            by physicists, exploited by institutions, and is now, for the first time, verifiable
            at the protocol level.
          </p>
        </div>

        <div className="mt-10 pt-5 border-t border-zinc-800/60 flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: '0 0 8px rgba(74,222,128,0.5)' }} />
          <span className="font-mono text-[10px] text-zinc-600 tracking-[0.08em]">
            SUBSTRATE → EXPLOIT → PLAYER_1 → PROTOCOL → A2A // DJZS_v2.0 // BASE_MAINNET
          </span>
        </div>
      </div>
    </section>
  );
}
