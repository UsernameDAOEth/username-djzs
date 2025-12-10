import React, { useState } from "react";
import { Zone, ProcessingMode, DJZSIntent, ZONES } from "./config";
import { ZoneSelector } from "./zone-selector";
import { ModeSelector } from "./mode-selector";

export function AgentConsole() {
  const [selectedZone, setSelectedZone] = useState<Zone>(ZONES[0]);
  const [mode, setMode] = useState<ProcessingMode>("QUICK");
  const [directive, setDirective] = useState("");
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState<string | null>(null);
  const [status, setStatus] = useState("IDLE");
  const [journalId, setJournalId] = useState<string | null>(null);

  async function handleExecute() {
    if (!directive.trim()) return;
    setLoading(true);
    setStatus("PROCESSING");
    setReply(null);
    setJournalId(null);

    const intent: DJZSIntent = selectedZone.defaultIntent;

    const payload = {
      zoneCode: selectedZone.code,
      intent,
      input: directive,
      userWallet: wallet || undefined,
      source: "web",
      options: {
        saveJournal: true,
        uploadToIrys: true,
        mintImmediately: false,
      },
    };

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      
      if (data.ok) {
        setReply(data.reply);
        setJournalId(data.journalId);
        setStatus("COMPLETE");
      } else {
        setReply(`Error: ${data.message || "Unknown error"}`);
        setStatus("ERROR");
      }
    } catch (err) {
      console.error(err);
      setReply("Agent connection failed. Check backend status.");
      setStatus("ERROR");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="px-6 py-16 lg:px-12 border-t border-sky-500/20 bg-slate-950/80">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3">
          <div>
            <h2 className="text-sm font-mono tracking-[0.25em] text-sky-300 uppercase">
              DJZS AGENT CORE PREVIEW
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-200/90">
              Interact with your Username DAO agent running the{" "}
              <span className="font-semibold">DJZS Protocol v1.0</span> engine.
              Inputs are processed locally and written to your Anytype Vault via
              the MCP bridge.
            </p>
          </div>
          <div className="text-[0.65rem] font-mono text-right text-slate-400 space-y-1">
            <div>NODE_ENV: PRODUCTION</div>
            <div>PROTOCOL: DJZS v1.0</div>
            <div>MCP_BRIDGE: AWAITING CONNECTION</div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.2fr)]">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-[0.25em] text-slate-300 uppercase">
                  INPUT DIRECTIVE
                </span>
              </div>
              <textarea
                data-testid="input-directive"
                className="w-full rounded-md border border-sky-500/40 bg-slate-950/60 p-3 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
                rows={6}
                placeholder="Enter your directive…"
                value={directive}
                onChange={(e) => setDirective(e.target.value)}
              />
            </div>

            <ZoneSelector
              selectedCode={selectedZone.code}
              onSelect={setSelectedZone}
            />

            <ModeSelector mode={mode} onChange={setMode} />

            <div className="space-y-2">
              <span className="text-xs font-mono tracking-[0.25em] text-slate-300 uppercase">
                OPTIONAL · WALLET BINDING
              </span>
              <input
                type="text"
                data-testid="input-wallet"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                placeholder="0x… (bind this session to a wallet identity)"
                className="w-full rounded-md border border-sky-500/40 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
              />
              <p className="text-[0.65rem] text-slate-400">
                If provided, your Journals will be linked to this wallet inside
                DJZS/Anytype.
              </p>
            </div>

            <button
              data-testid="button-execute"
              onClick={handleExecute}
              disabled={loading || !directive.trim()}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-sky-400 px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-sky-500/40 hover:bg-sky-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "PROCESSING…" : "EXECUTE_DIRECTIVE"}
            </button>

            <div className="text-[0.7rem] font-mono text-slate-400 space-y-1">
              <div>
                STATUS:{" "}
                <span
                  data-testid="text-status"
                  className={
                    status === "ERROR"
                      ? "text-red-400"
                      : status === "COMPLETE"
                      ? "text-emerald-400"
                      : "text-sky-300"
                  }
                >
                  {status}
                </span>
              </div>
              <div>AGENT_CORE: ONLINE · PROTOCOL: DJZS v1.0</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-sky-500/40 bg-slate-950/70 p-4">
              <div className="text-xs font-mono tracking-[0.25em] text-slate-300 uppercase mb-3">
                AGENT REPLY
              </div>
              <div 
                data-testid="text-agent-reply"
                className="h-64 overflow-auto rounded-md bg-slate-950/80 border border-sky-500/30 p-3 font-mono text-[0.7rem] text-slate-200/90"
              >
                {reply ? (
                  <pre className="whitespace-pre-wrap">{reply}</pre>
                ) : (
                  <p className="text-slate-500">
                    The DJZS Agent Core is awaiting your first directive.
                  </p>
                )}
              </div>
              {journalId && (
                <div className="mt-3 text-[0.7rem] text-emerald-300/90 font-mono">
                  Saved as Journal ID: <span data-testid="text-journal-id">{journalId}</span>
                </div>
              )}
            </div>

            <div className="rounded-lg border border-sky-500/40 bg-slate-950/70 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono tracking-[0.25em] text-slate-300 uppercase">
                  DATA_PERSISTENCE
                </div>
                <div className="text-[0.65rem] font-mono text-slate-400">
                  LOCAL API STATUS: DISCONNECTED
                </div>
              </div>
              <div className="rounded-md border border-sky-500/30 bg-slate-950/80 p-4 text-center space-y-2">
                <div className="text-2xl">🔒</div>
                <p className="text-[0.75rem] text-slate-200/90">
                  Your agent is offline from your Anytype Vault. Connect using
                  the MCP bridge to enable journaling and knowledge updates.
                </p>
                <button 
                  data-testid="button-mcp-bridge"
                  className="mt-2 inline-flex items-center justify-center rounded-md border border-sky-400 bg-sky-950/70 px-4 py-2 text-xs font-semibold text-sky-200 hover:bg-sky-900/70 transition"
                >
                  INITIATE_MCP_BRIDGE
                </button>
                <p className="text-[0.65rem] text-slate-400">
                  Requires Anytype desktop + DJZS MCP server running locally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
