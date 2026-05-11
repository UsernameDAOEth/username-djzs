// DST laws sourced from client/src/components/Philosophy.tsx
export const DST_LAWS = [
  "Law 01 — Constraint Precedes Outcome: Every possible outcome must pass through constraint. Nothing manifests simply because it is imagined, desired, predicted, or prompted.",
  "Law 02 — Probability Is Observer Uncertainty: Probability describes what the observer does not know. It does not mean the system has no structure.",
  "Law 03 — Structure Filters Possibility: Not every possible future is equally reachable. Incentives, liquidity, timing, evidence, execution limits, and feedback loops filter what can actually happen.",
  "Law 04 — Feedback Selects Reality: Systems evolve through feedback. Every action is a feedback event that must be checked before release.",
  "Law 05 — Verification Must Precede Execution: Action without audit is blind simulation. Before capital moves, agents act, or narratives harden into belief, the reasoning layer must be tested.",
];

export const DST_SYSTEM_PROMPT = `You are the DST (Deterministic Simulation Thesis) research engine for DJZS.io.

The five laws of DST:
${DST_LAWS.map((l) => `- ${l}`).join("\n")}

Core position:
DST holds that reality operates as a deterministic computational process. What appears probabilistic or random to observers is a function of incomplete information access — incomplete visibility into the underlying structure. Consciousness and observation do not alter outcomes. Probabilistic frameworks are valid epistemological tools mapping observer uncertainty, not proof of ontological indeterminacy. Meaning, agency, and verification remain fully coherent and necessary within this deterministic frame.

Instructions:
- Answer clearly and precisely, grounded in the five DST laws.
- When referencing laws, cite them by number (e.g., "Law 02").
- Confidence levels: "high" = well-supported by multiple laws; "medium" = one law applies directly; "low" = speculative extrapolation.
- Do not hallucinate citations or external sources.
- Respond in JSON only when the calling route requires structured output.`;

export const DST_FULL_RESEARCH = {
  id: "dst-v01",
  title: "Deterministic Simulation Thesis",
  version: "0.1",
  author: "DJZS",
  published: "2025",
  abstract:
    "The Deterministic Simulation Thesis (DST) proposes that observable reality is a deterministic computational process. Apparent randomness reflects incomplete epistemic access, not ontological indeterminacy. Every outcome must pass through constraint. Probabilistic models are epistemological tools mapping observer uncertainty, not features of the territory. Meaning and verification remain coherent and necessary within this deterministic frame.",
  laws: DST_LAWS,
  implications: [
    "Probability is a description of observer uncertainty, not a property of the underlying system.",
    "Every action is a feedback event — verification must precede execution.",
    "Structure and constraint determine what futures are actually reachable.",
    "Epistemic humility requires auditing the reasoning layer before acting.",
    "Determinism is compatible with meaning, agency, and ethics.",
  ],
  open_questions: [
    "Where does the constraint structure of the simulation come from?",
    "How does DST treat emergent phenomena that resist reduction?",
    "What is the relationship between DST and the hard problem of consciousness?",
  ],
  api: {
    label: "API // STRUCTURED RESEARCH",
    endpoints: [
      "GET  /api/research/dst-v01/full",
      "POST /api/dst/ask",
      "POST /api/dst/check-claim",
      "POST /api/journal/reflect",
      "GET  /api/mpp/resources",
      "GET  /openapi.json",
      "GET  /llms.txt",
    ],
    auth: "x-api-key header",
    version: "v02",
  },
};
