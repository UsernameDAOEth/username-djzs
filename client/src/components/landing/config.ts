export type DJZSIntent =
  | "research"
  | "journal"
  | "trade-log"
  | "identity"
  | "defi"
  | "desci"
  | "infra"
  | "general";

export type ProcessingMode = "QUICK" | "JOURNAL" | "RESEARCH" | "ALPHA";

export interface Zone {
  code: string;
  name: string;
  emoji: string;
  shortDescription: string;
  defaultIntent: DJZSIntent;
}

export const ZONES: Zone[] = [
  {
    code: "01_DYOR",
    name: "Research",
    emoji: "🔍",
    shortDescription: "Deep dives on tokens, chains, and narratives.",
    defaultIntent: "research",
  },
  {
    code: "02_DID",
    name: "Identity",
    emoji: "🪪",
    shortDescription: "Usernames, reputation, and decentralized IDs.",
    defaultIntent: "identity",
  },
  {
    code: "03_TEST",
    name: "Testnet",
    emoji: "🧪",
    shortDescription: "Experimentation space for new protocols.",
    defaultIntent: "general",
  },
  {
    code: "04_DESO",
    name: "Social",
    emoji: "🌐",
    shortDescription: "Social graphs, feeds, and onchain media.",
    defaultIntent: "general",
  },
  {
    code: "05_RWA",
    name: "Real World Assets",
    emoji: "🏛",
    shortDescription: "Bridging physical assets to crypto rails.",
    defaultIntent: "general",
  },
  {
    code: "06_DEPIN",
    name: "Infra",
    emoji: "⚡️",
    shortDescription: "Decentralized compute, storage, and networks.",
    defaultIntent: "infra",
  },
  {
    code: "07_DEFI",
    name: "DeFi",
    emoji: "💹",
    shortDescription: "Yield, risk, and strategy journaling.",
    defaultIntent: "defi",
  },
  {
    code: "08_DEAI",
    name: "AI",
    emoji: "🤖",
    shortDescription: "Agents, models, and autonomous workflows.",
    defaultIntent: "general",
  },
  {
    code: "09_DESCI",
    name: "Science",
    emoji: "🔬",
    shortDescription: "DeSci experiments and research logs.",
    defaultIntent: "desci",
  },
  {
    code: "10_TIME",
    name: "Time",
    emoji: "⏳",
    shortDescription: "Temporal reflections and time-based planning.",
    defaultIntent: "journal",
  },
];

export const PROCESSING_MODES: { id: ProcessingMode; label: string; subtitle: string }[] = [
  {
    id: "QUICK",
    label: "QUICK",
    subtitle: "Simple answers",
  },
  {
    id: "JOURNAL",
    label: "JOURNAL",
    subtitle: "Problem → Solution → Use Cases",
  },
  {
    id: "RESEARCH",
    label: "RESEARCH",
    subtitle: "Full analysis",
  },
  {
    id: "ALPHA",
    label: "ALPHA",
    subtitle: "High-value insights",
  },
];

export const SYSTEM_STEPS = [
  {
    id: "01",
    title: "CHOOSE USERNAME",
    body: "Your identity layer. Your handle spawns your local-first agent.",
  },
  {
    id: "02",
    title: "AGENT ACTIVATES",
    body: "Your agent boots using DJZS Protocol. Persistent. Local-first. Never cloud-hosted.",
  },
  {
    id: "03",
    title: "LOCAL SPACE",
    body: "Your intelligence stays in your Anytype Vault. Private, encrypted, sovereign.",
  },
  {
    id: "04",
    title: "PAY PER INSIGHT",
    body: "Micropayments per request (x402). Pay only for compute, never storage.",
  },
  {
    id: "05",
    title: "AGENT WRITES",
    body: "Journal entries and structured knowledge saved locally via DJZS MCP.",
  },
  {
    id: "06",
    title: "KNOWLEDGE EVOLVES",
    body: "Your graph expands. Your agent learns your style and strengthens insights.",
  },
  {
    id: "07",
    title: "MINT OR EXPORT",
    body: "Create NFTs, archives, or port your research anywhere. Fully optional.",
  },
  {
    id: "08",
    title: "FULL OWNERSHIP",
    body: "No lock-in. Your name. Your agent. Your mind.",
  },
];
