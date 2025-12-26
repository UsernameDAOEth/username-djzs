import React, { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { CyberGrid } from "@/components/cyber-grid";
import { ApiTestSection } from "@/components/landing/api-test-section";
import { ThreeDCard } from "@/components/3d-card";

type OnboardingStep = 1 | 2 | 3;
type ProcessingMode = "QUICK" | "JOURNAL" | "RESEARCH" | "ALPHA";

type ZoneCode =
  | "01_DYOR"
  | "02_DID"
  | "03_TEST"
  | "04_DESO"
  | "05_RWA"
  | "06_DEPIN"
  | "07_DEFI"
  | "08_DEAI"
  | "09_DESCI"
  | "10_TIME";

interface Zone {
  code: ZoneCode;
  label: string;
  emoji: string;
  description: string;
}

const ZONES: Zone[] = [
  { code: "01_DYOR", label: "Research", emoji: "🔍", description: "Deep dives on tokens, chains, and narratives." },
  { code: "02_DID", label: "Identity", emoji: "🪪", description: "Usernames, reputation, and decentralized IDs." },
  { code: "03_TEST", label: "Testnet", emoji: "🧪", description: "Experimentation space for new protocols." },
  { code: "04_DESO", label: "Social", emoji: "🌐", description: "Social graphs, media, and feeds." },
  { code: "05_RWA", label: "RWA", emoji: "🏛", description: "Bridging physical assets to crypto rails." },
  { code: "06_DEPIN", label: "Infra", emoji: "⚡️", description: "Decentralized compute, storage, and networks." },
  { code: "07_DEFI", label: "DeFi", emoji: "💹", description: "Yield, risk, and strategy journaling." },
  { code: "08_DEAI", label: "AI", emoji: "🤖", description: "Agents, models, and autonomous workflows." },
  { code: "09_DESCI", label: "DeSci", emoji: "🔬", description: "DeSci experiments and research logs." },
  { code: "10_TIME", label: "Time", emoji: "⏳", description: "Temporal reflections and time-based planning." },
];

const PROCESSING_MODES: { id: ProcessingMode; label: string; description: string }[] = [
  { id: "QUICK", label: "QUICK", description: "Fast response, minimal journaling" },
  { id: "JOURNAL", label: "JOURNAL", description: "Full journaling mode with vault sync" },
  { id: "RESEARCH", label: "RESEARCH", description: "Deep research with citations" },
  { id: "ALPHA", label: "ALPHA", description: "Experimental alpha insights" },
];

export default function Home() {
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>(1);
  const [username, setUsername] = useState("");
  const [wallet, setWallet] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState(false);
  const [usernameMinted, setUsernameMinted] = useState(false);
  const [agentActive, setAgentActive] = useState(false);
  const [mcpConnected, setMcpConnected] = useState(false);

  const [selectedZone, setSelectedZone] = useState<Zone>(ZONES[0]);
  const [mode, setMode] = useState<ProcessingMode>("QUICK");
  const [directive, setDirective] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [journalId, setJournalId] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const agentStatus = useMemo(() => {
    if (processing) return "PROCESSING";
    if (!agentActive) return "IDLE";
    if (agentActive && !mcpConnected) return "READY (VAULT OFFLINE)";
    return "READY (VAULT LINKED)";
  }, [processing, agentActive, mcpConnected]);

  const handleConnectWallet = async () => {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      alert("Please install MetaMask or another Web3 wallet to connect.");
      return;
    }
    setConnectingWallet(true);
    try {
      const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      if (accounts && accounts.length > 0) {
        setWallet(accounts[0]);
        setWalletConnected(true);
      }
    } catch (err) {
      console.error("Wallet connection failed:", err);
    } finally {
      setConnectingWallet(false);
    }
  };

  const handleMintUsername = () => {
    if (!username.trim() || !walletConnected) return;
    setUsernameMinted(true);
    setOnboardingStep(2);
  };

  const handleActivateAgent = () => {
    if (!usernameMinted) return;
    setAgentActive(true);
    setOnboardingStep(3);
  };

  const handleConnectMCP = () => {
    setMcpConnected(true);
  };

  const handleExecuteDirective = async () => {
    if (!directive.trim()) return;
    setProcessing(true);
    setReply(null);
    setJournalId(null);

    await new Promise((res) => setTimeout(res, 900));

    const fakeJournalId = `journal_${selectedZone.code.toLowerCase()}_${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`;

    setReply(
      `Simulated DJZS Agent reply for ${selectedZone.code} in ${mode} mode.\n\n` +
      `Username: ${username || "anonymous"}\nWallet: ${wallet || "not-bound"}\n\nDirective:\n${directive}\n\n(Next: wire this to your real /api/agent endpoint.)`
    );
    setJournalId(fakeJournalId);
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono relative overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CyberGrid />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_90%)]" />
      </div>

      <Navigation />

      <main className="relative z-10">
        <HeroSection />
        
        <OnboardingSection
          step={onboardingStep}
          username={username}
          wallet={wallet}
          walletConnected={walletConnected}
          connectingWallet={connectingWallet}
          setUsername={setUsername}
          usernameMinted={usernameMinted}
          agentActive={agentActive}
          mcpConnected={mcpConnected}
          onConnectWallet={handleConnectWallet}
          onMint={handleMintUsername}
          onActivateAgent={handleActivateAgent}
          onConnectMCP={handleConnectMCP}
        />

        <AgentConsoleSection
          username={username}
          usernameMinted={usernameMinted}
          agentActive={agentActive}
          mcpConnected={mcpConnected}
          selectedZone={selectedZone}
          setSelectedZone={setSelectedZone}
          mode={mode}
          setMode={setMode}
          directive={directive}
          setDirective={setDirective}
          reply={reply}
          journalId={journalId}
          processing={processing}
          agentStatus={agentStatus}
          onExecute={handleExecuteDirective}
        />

        <SystemArchitectureSection />

        <ApiTestSection />
      </main>

      <HomeFooter />
    </div>
  );
}

const HeroSection: React.FC = () => {
  return (
    <section className="px-6 py-14 md:py-20 lg:px-10">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/40 bg-lime-950/40 px-4 py-1 text-[0.65rem] tracking-[0.2em] uppercase mb-5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Identity Layer: Username DAO · Agent Layer: DJZS
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            <span className="block">Username</span>
            <span className="block text-lime-400">As A Brand</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm sm:text-base text-slate-200/90">
            Mint a Username. Spawn your DJZS Agent. Sync with your Anytype Vault via MCP.
            Own your intelligence locally—no cloud, no lock-in, pay only per insight.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button 
              className="rounded-md bg-lime-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-lime-500/40 hover:bg-lime-300 transition"
              data-testid="button-claim-username"
            >
              CLAIM_USERNAME
            </button>
            <Link
              href="/explorer"
              className="text-xs sm:text-sm text-lime-300/90 hover:text-lime-200 underline underline-offset-4"
              data-testid="link-explore-agents"
            >
              Explore existing agents
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <ThreeDCard className="cursor-pointer">
            <div className="rounded-xl border border-lime-500/60 bg-slate-900/80 p-5 shadow-xl shadow-lime-900/60 backdrop-blur space-y-4">
              <div className="text-xs font-mono text-slate-300/80 flex items-center justify-between">
                <span>AGENT_CORE: OFFLINE</span>
                <span className="inline-flex items-center gap-1 text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-amber-300 animate-pulse" />
                  MCP_BRIDGE: NOT_LINKED
                </span>
              </div>
              <div className="border border-lime-500/40 rounded-md p-4 text-center">
                <div className="text-[0.7rem] font-mono tracking-[0.25em] uppercase text-slate-300">
                  Welcome to
                </div>
                <div className="text-3xl font-black tracking-[0.3em] mt-1 text-lime-400">Dj-Z-S</div>
                <div className="text-[0.7rem] uppercase tracking-[0.22em] text-slate-400 mt-2">
                  Private Journaling · Anytype · Aztec-ready
                </div>
              </div>
              <p className="text-[0.7rem] text-slate-300/80 font-mono leading-relaxed">
                Once you mint your Username, your DJZS Agent Core will bind to that identity and can
                sync to your Anytype Vault through the MCP bridge.
              </p>
            </div>
          </ThreeDCard>
        </motion.div>
      </div>
    </section>
  );
};

interface OnboardingProps {
  step: OnboardingStep;
  username: string;
  wallet: string;
  walletConnected: boolean;
  connectingWallet: boolean;
  setUsername: (v: string) => void;
  usernameMinted: boolean;
  agentActive: boolean;
  mcpConnected: boolean;
  onConnectWallet: () => void;
  onMint: () => void;
  onActivateAgent: () => void;
  onConnectMCP: () => void;
}

const OnboardingSection: React.FC<OnboardingProps> = ({
  step,
  username,
  wallet,
  walletConnected,
  connectingWallet,
  setUsername,
  usernameMinted,
  agentActive,
  mcpConnected,
  onConnectWallet,
  onMint,
  onActivateAgent,
  onConnectMCP,
}) => {
  return (
    <section className="px-6 pb-14 lg:px-10">
      <div className="max-w-6xl mx-auto border border-lime-500/30 rounded-2xl bg-slate-900/40 backdrop-blur-md p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-sm font-mono tracking-[0.25em] text-lime-300 uppercase">
              ONBOARDING · 3 STEPS
            </h2>
            <p className="mt-2 text-sm text-slate-200/90 max-w-xl">
              Start by claiming a Username. Then activate your DJZS Agent Core and link it to your
              Anytype Vault via MCP.
            </p>
          </div>
          <OnboardingStepper step={step} />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <motion.div 
            className="border border-lime-500/40 rounded-xl bg-slate-900/30 backdrop-blur-sm p-4 space-y-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-xs font-mono tracking-[0.25em] text-slate-300 uppercase">
              STEP 1 · USERNAME
            </div>
            <div className="text-sm font-semibold">Connect wallet and bind your handle.</div>
            
            <button
              onClick={onConnectWallet}
              disabled={walletConnected || connectingWallet}
              className={`w-full rounded-md border px-4 py-2 text-xs font-semibold transition ${
                walletConnected 
                  ? "border-emerald-400 bg-emerald-950/80 text-emerald-200" 
                  : "border-lime-500/40 bg-slate-900 text-lime-200 hover:bg-slate-800"
              } disabled:cursor-not-allowed`}
              data-testid="button-connect-wallet"
            >
              {connectingWallet 
                ? "CONNECTING..." 
                : walletConnected 
                  ? `CONNECTED: ${wallet.slice(0, 6)}...${wallet.slice(-4)}` 
                  : "CONNECT_WALLET"}
            </button>
            
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@yourname"
              disabled={!walletConnected}
              className="w-full rounded-md border border-lime-500/40 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-400/70 disabled:opacity-50"
              data-testid="input-onboard-username"
            />
            <button
              onClick={onMint}
              disabled={!username.trim() || !walletConnected || usernameMinted}
              className="w-full rounded-md bg-lime-400 px-4 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-lime-500/40 hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
              data-testid="button-mint-username"
            >
              {usernameMinted ? "USERNAME_MINTED ✓" : "MINT_USERNAME"}
            </button>
            <p className="text-[0.7rem] text-slate-400">
              Connect your wallet first, then mint your Username to spawn your DJZS Agent.
            </p>
          </motion.div>

          <motion.div 
            className="border border-lime-500/40 rounded-xl bg-slate-900/30 backdrop-blur-sm p-4 space-y-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-xs font-mono tracking-[0.25em] text-slate-300 uppercase">
              STEP 2 · AGENT CORE
            </div>
            <div className="text-sm font-semibold">Boot your DJZS Agent.</div>
            <p className="text-[0.75rem] text-slate-300/90">
              After your Username exists, the DJZS Agent Core can be initialized to use Zones,
              modes, and journaling.
            </p>
            <button
              onClick={onActivateAgent}
              disabled={!usernameMinted}
              className="mt-2 w-full rounded-md border border-lime-400 bg-lime-950/80 px-4 py-2 text-xs font-semibold text-lime-200 hover:bg-lime-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
              data-testid="button-activate-agent"
            >
              {agentActive ? "AGENT_ACTIVE ✓" : "ACTIVATE_AGENT_CORE"}
            </button>
            <div className="text-[0.7rem] text-slate-400 font-mono space-y-1">
              <div>
                AGENT_ID: {usernameMinted ? `agent_${(username || "").replace("@", "")}` : "pending"}
              </div>
              <div>PROTOCOL: DJZS v1.0</div>
            </div>
          </motion.div>

          <motion.div 
            className="border border-lime-500/40 rounded-xl bg-slate-900/30 backdrop-blur-sm p-4 space-y-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-xs font-mono tracking-[0.25em] text-slate-300 uppercase">
              STEP 3 · VAULT LINK
            </div>
            <div className="text-sm font-semibold">Connect to Anytype via MCP.</div>
            <p className="text-[0.75rem] text-slate-300/90">
              Link your Agent to your local Anytype Vault so Journals and research live on your
              device—not in the cloud.
            </p>
            <button
              onClick={onConnectMCP}
              disabled={!agentActive}
              className="mt-2 w-full rounded-md border border-emerald-400 bg-emerald-950/80 px-4 py-2 text-xs font-semibold text-emerald-200 hover:bg-emerald-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
              data-testid="button-connect-mcp"
            >
              {mcpConnected ? "VAULT_SYNC_ACTIVE ✓" : "INITIATE_MCP_BRIDGE"}
            </button>
            <div className="text-[0.7rem] text-slate-400 font-mono space-y-1">
              <div>
                MCP_STATUS:{" "}
                <span className={mcpConnected ? "text-emerald-400" : "text-amber-300"}>
                  {mcpConnected ? "CONNECTED" : "NOT_CONNECTED"}
                </span>
              </div>
              <div>DATA_PLANE: {mcpConnected ? "VAULT_LINKED" : "LOCAL_ONLY"}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface OnboardingStepperProps {
  step: OnboardingStep;
}

const OnboardingStepper: React.FC<OnboardingStepperProps> = ({ step }) => {
  const steps: { id: OnboardingStep; label: string }[] = [
    { id: 1, label: "USERNAME" },
    { id: 2, label: "AGENT" },
    { id: 3, label: "VAULT" },
  ];
  return (
    <div className="flex items-center gap-3 text-[0.7rem] font-mono text-slate-300">
      {steps.map((s, idx) => (
        <React.Fragment key={s.id}>
          <div className="flex items-center gap-2">
            <div
              className={`h-6 w-6 rounded-full flex items-center justify-center border ${
                step >= s.id
                  ? "border-lime-400 bg-lime-900 text-lime-100"
                  : "border-slate-500 bg-slate-900 text-slate-500"
              }`}
            >
              {s.id}
            </div>
            <span className="tracking-[0.18em] uppercase">{s.label}</span>
          </div>
          {idx < steps.length - 1 && <div className="w-6 h-px bg-slate-600" />}
        </React.Fragment>
      ))}
    </div>
  );
};

interface AgentConsoleProps {
  username: string;
  usernameMinted: boolean;
  agentActive: boolean;
  mcpConnected: boolean;
  selectedZone: Zone;
  setSelectedZone: (z: Zone) => void;
  mode: ProcessingMode;
  setMode: (m: ProcessingMode) => void;
  directive: string;
  setDirective: (v: string) => void;
  reply: string | null;
  journalId: string | null;
  processing: boolean;
  agentStatus: string;
  onExecute: () => void;
}

const AgentConsoleSection: React.FC<AgentConsoleProps> = ({
  username,
  usernameMinted,
  agentActive,
  mcpConnected,
  selectedZone,
  setSelectedZone,
  mode,
  setMode,
  directive,
  setDirective,
  reply,
  journalId,
  processing,
  agentStatus,
  onExecute,
}) => {
  return (
    <section className="px-6 pb-16 lg:px-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3">
          <div>
            <h2 className="text-sm font-mono tracking-[0.25em] text-lime-300 uppercase">
              DJZS AGENT CORE
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-200/90">
              Talk to your Username DAO Agent powered by DJZS Protocol v1.0. Choose a Zone, set a
              mode, and send a directive. When the MCP bridge is active, Journals are written into
              your Anytype Vault.
            </p>
          </div>
          <div className="text-[0.7rem] font-mono text-right text-slate-400 space-y-1">
            <div>
              STATUS:{" "}
              <span
                className={
                  agentStatus.includes("READY")
                    ? "text-emerald-400"
                    : agentStatus === "PROCESSING"
                    ? "text-amber-300"
                    : "text-slate-300"
                }
              >
                {agentStatus}
              </span>
            </div>
            <div>AGENT_CORE: {agentActive ? "ONLINE" : "OFFLINE"}</div>
            <div>PROTOCOL: DJZS v1.0</div>
          </div>
        </div>

        {!usernameMinted || !agentActive ? (
          <div className="rounded-xl border border-amber-400/40 bg-amber-950/40 p-4 text-[0.8rem] text-amber-100 font-mono">
            To use the Agent Console, first{" "}
            <span className="font-semibold">mint a Username</span> and{" "}
            <span className="font-semibold">activate your Agent Core</span> in the onboarding
            section above.
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)]">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-[0.25em] text-slate-300 uppercase">
                  INPUT DIRECTIVE
                </span>
                <textarea
                  className="w-full rounded-md border border-lime-500/40 bg-slate-900/30 backdrop-blur-sm p-3 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-400/70"
                  rows={6}
                  placeholder="Ask a question, write a journal reflection, or request research for this Zone…"
                  value={directive}
                  onChange={(e) => setDirective(e.target.value)}
                  data-testid="textarea-directive"
                />
              </div>

              <ZoneSelector selected={selectedZone} onSelect={setSelectedZone} />

              <ModeSelector mode={mode} setMode={setMode} />

              <div className="flex flex-col gap-2">
                <button
                  onClick={onExecute}
                  disabled={processing || !directive.trim()}
                  className="inline-flex items-center justify-center rounded-md bg-lime-400 px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-lime-500/40 hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  data-testid="button-execute-directive"
                >
                  {processing ? "PROCESSING…" : "EXECUTE_DIRECTIVE"}
                </button>
                <p className="text-[0.7rem] text-slate-400 font-mono">
                  USERNAME: {username || "anonymous"} · ZONE: {selectedZone.code} · MODE: {mode}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border border-lime-500/40 bg-slate-900/30 backdrop-blur-sm p-4">
                <span className="text-xs font-mono tracking-[0.25em] text-slate-300 uppercase">
                  AGENT REPLY
                </span>
                <pre className="mt-3 text-sm text-slate-100 whitespace-pre-wrap font-mono leading-relaxed min-h-[160px]">
                  {reply || "(waiting for directive)"}
                </pre>
                {journalId && (
                  <div className="mt-4 pt-3 border-t border-lime-500/20 text-[0.7rem] font-mono text-slate-400">
                    JOURNAL_ID: <span className="text-lime-400">{journalId}</span>
                  </div>
                )}
              </div>

              <div className="rounded-lg border border-lime-500/30 bg-slate-900/30 backdrop-blur-sm p-4 space-y-2">
                <span className="text-xs font-mono tracking-[0.25em] text-slate-300 uppercase">
                  AGENT METADATA
                </span>
                <div className="grid grid-cols-2 gap-3 text-[0.7rem] font-mono text-slate-400">
                  <div>USERNAME: <span className="text-lime-300">{username}</span></div>
                  <div>ZONE: <span className="text-lime-300">{selectedZone.code}</span></div>
                  <div>MODE: <span className="text-lime-300">{mode}</span></div>
                  <div>
                    MCP:{" "}
                    <span className={mcpConnected ? "text-emerald-400" : "text-amber-300"}>
                      {mcpConnected ? "LINKED" : "OFFLINE"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

interface ZoneSelectorProps {
  selected: Zone;
  onSelect: (z: Zone) => void;
}

const ZoneSelector: React.FC<ZoneSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="space-y-2">
      <span className="text-xs font-mono tracking-[0.25em] text-slate-300 uppercase">
        SELECT ZONE
      </span>
      <div className="grid grid-cols-5 gap-2">
        {ZONES.map((zone) => (
          <button
            key={zone.code}
            onClick={() => onSelect(zone)}
            className={`p-2 rounded-md border text-center transition backdrop-blur-sm ${
              selected.code === zone.code
                ? "border-lime-400 bg-lime-900/50 text-lime-100"
                : "border-lime-500/30 bg-slate-900/30 text-slate-300 hover:border-lime-400/60"
            }`}
            title={zone.description}
            data-testid={`button-zone-${zone.code}`}
          >
            <div className="text-lg">{zone.emoji}</div>
            <div className="text-[0.6rem] font-mono tracking-wide mt-1">{zone.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

interface ModeSelectorProps {
  mode: ProcessingMode;
  setMode: (m: ProcessingMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, setMode }) => {
  return (
    <div className="space-y-2">
      <span className="text-xs font-mono tracking-[0.25em] text-slate-300 uppercase">
        PROCESSING MODE
      </span>
      <div className="flex flex-wrap gap-2">
        {PROCESSING_MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-3 py-1.5 rounded-md border text-xs font-mono transition backdrop-blur-sm ${
              mode === m.id
                ? "border-lime-400 bg-lime-900/50 text-lime-100"
                : "border-lime-500/30 bg-slate-900/30 text-slate-300 hover:border-lime-400/60"
            }`}
            title={m.description}
            data-testid={`button-mode-${m.id}`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const SystemArchitectureSection: React.FC = () => {
  const steps = [
    { num: 1, title: "CLAIM_USERNAME", desc: "Mint your decentralized identity on Username DAO" },
    { num: 2, title: "SPAWN_AGENT", desc: "Initialize your personal DJZS Agent Core" },
    { num: 3, title: "LINK_VAULT", desc: "Connect Anytype via MCP for local-first storage" },
    { num: 4, title: "SELECT_ZONE", desc: "Choose your research or journaling domain" },
    { num: 5, title: "SET_MODE", desc: "Pick processing mode: Quick, Journal, Research, Alpha" },
    { num: 6, title: "SEND_DIRECTIVE", desc: "Ask questions or write reflections" },
    { num: 7, title: "ARCHIVE_IRYS", desc: "Permanently archive insights to Irys Network" },
    { num: 8, title: "EARN_XP", desc: "Level up your agent through consistent engagement" },
  ];

  return (
    <section className="px-6 pb-16 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm font-mono tracking-[0.25em] text-lime-300 uppercase mb-6">
          SYSTEM ARCHITECTURE · 8-STEP FLOW
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="border border-lime-500/30 rounded-lg bg-slate-900/30 backdrop-blur-sm p-4 space-y-2"
            >
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full border border-lime-400 bg-lime-950 flex items-center justify-center text-xs font-bold text-lime-300">
                  {step.num}
                </div>
                <span className="text-xs font-mono text-lime-200 tracking-wide">{step.title}</span>
              </div>
              <p className="text-[0.7rem] text-slate-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomeFooter: React.FC = () => {
  return (
    <footer className="px-6 py-8 lg:px-10 border-t border-lime-500/20 text-[0.7rem] text-slate-400/80 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-3">
        <div>© {new Date().getFullYear()} USERNAME DAO × DJZS Protocol.</div>
        <div className="flex flex-wrap gap-4">
          <Link href="/profile" data-testid="link-footer-profile" className="hover:text-lime-300 transition">Profile</Link>
          <Link href="/explorer" data-testid="link-footer-explorer" className="hover:text-lime-300 transition">Explorer</Link>
          <Link href="/api-test" data-testid="link-footer-api-test" className="hover:text-lime-300 transition">API Test</Link>
          <span>ECOSYSTEM: Username DAO · DJZS · Anytype · Aztec · Irys</span>
        </div>
      </div>
    </footer>
  );
};
