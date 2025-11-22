import React, { useState } from "react";
import { BrutalButton, BrutalCard, GlitchText } from "@/components/ui/brutalist";
import { cn } from "@/lib/utils";
import { Loader2, Terminal, Cpu, ShieldCheck, Zap } from "lucide-react";

// Mock response generator since we are frontend-only
const generateMockResponse = (query: string, zone: string, mode: string) => {
  const timestamp = new Date().toISOString();
  
  const commonHeader = `/// DJZS_PAID_AGENT_V1.0.0 // ${zone.toUpperCase()} // ${mode.toUpperCase()} ///\n/// TIMESTAMP: ${timestamp} ///\n\n`;

  if (mode === "quick") {
    return `${commonHeader}QUERY: "${query}"\n\n> ANALYSIS: The query touches on fundamental concepts within ${zone}.\n\n> ANSWER: \nBased on current protocol parameters, this requires immediate attention to decentralized verification methods. The integration of ${zone} vectors suggests a bullish outlook on sovereignty but bears monitoring for regulatory friction points.\n\n> ACTION: Verify on-chain data.`;
  }

  if (mode === "journal") {
    return `${commonHeader}Title: Reflection on ${query}\n\n[PROBLEM]\nThe current centralized infrastructure creates a bottleneck for user sovereignty in ${zone}, leading to data fragmentation and loss of agency.\n\n[SOLUTION]\nLeverage local-first architecture combined with zero-knowledge proofs (Aztec) to reclaim identity ownership. The Username DAO model provides the semantic layer for this transition.\n\n[USE CASES]\n1. Private DeFi interactions without doxxing.\n2. Autonomous agent deployment for portfolio management.\n3. Encrypted social graphs that persist across platforms.`;
  }

  if (mode === "research") {
    return `${commonHeader}DEEP DIVE ANALYSIS: ${query}\n\n1. THESIS\nThe intersection of ${zone} and autonomous agents represents the next major repricing event in crypto markets.\n\n2. TECHNICAL VECTORS\n- Interoperability: High\n- Privacy Preservation: Critical (Aztec Stack)\n- Latency: <50ms optimized\n\n3. MARKET IMPACT\nShift from rent-seeking Web2 platforms to protocol-owned liquidity and user-owned data lakes. Expect 10x growth in "Headless Brands" managed by AI agents.\n\n4. RISKS\n- Smart contract contagion\n- Agent hallucinations in financial execution`;
  }

  if (mode === "alpha") {
    return `${commonHeader}/// ALPHA LEAK /// CONFIDENTIAL ///\n\nNARRATIVE DETECTED: ${query} + ${zone}\n\nSIGNAL STRENGTH: 88/100\n\nOPPORTUNITY:\nEarly accumulation of identity-layer protocols is underpriced relative to the "Agent Economy" thesis. \n\nCATALYST:\nQ2 Testnet incentives for autonomous agent swarms.\n\nSTRATEGY:\nPosition into modular identity stacks. Mint early Username DAO handles. Monitor github commits for "Agent-to-Agent" payment gateways (x402).`;
  }

  return "ERROR: UNKNOWN MODE DETECTED.";
};

export const DjzsAgentConsole = () => {
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState("Zone 01 – DYOR");
  const [mode, setMode] = useState("quick");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toISOString().split('T')[1].slice(0,8)}] ${message}`].slice(-5));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);
    setLogs([]);

    addLog("INIT_SEQUENCE_START");
    addLog(`CONNECTING TO DJZS_PAID_AGENT v1.0.0...`);
    
    // Simulate network delay and logs
    await new Promise((resolve) => setTimeout(() => {
        addLog("AUTHENTICATING USERNAME_DAO KEY...");
    }, 500));
    
    await new Promise((resolve) => setTimeout(() => {
        addLog(`LOADING CONTEXT: ${zone.replace(' ', '_').toUpperCase()}`);
    }, 1000));
    
    await new Promise((resolve) => setTimeout(() => {
        addLog("GENERATING_INSIGHTS...");
        resolve(true);
    }, 1500));

    const mockRes = generateMockResponse(query, zone, mode);
    setResponse(mockRes);
    setLoading(false);
  };

  return (
    <BrutalCard className="w-full max-w-5xl mx-auto bg-background p-0 overflow-hidden border-2 border-primary shadow-[8px_8px_0px_0px_var(--color-primary)]">
      {/* Terminal Header */}
      <div className="bg-primary text-primary-foreground p-2 border-b-2 border-primary flex justify-between items-center">
        <div className="font-mono text-xs font-bold uppercase flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          DJZS_PAID_AGENT // v1.0.0
        </div>
        <div className="font-mono text-[10px] flex items-center gap-4">
            <span className="flex items-center gap-1"><Cpu className="w-3 h-3"/> NODE_ENV: PRODUCTION</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> ENCRYPTED</span>
            <span className="flex items-center gap-1"><Zap className="w-3 h-3"/> x402 READY</span>
        </div>
      </div>

      <div className="p-4 md:p-6 grid lg:grid-cols-12 gap-6">
        {/* Input Section */}
        <form onSubmit={handleSubmit} className="lg:col-span-5 space-y-6 flex flex-col h-full">
          <div className="space-y-2 flex-grow">
            <label htmlFor="query-input" className="font-mono text-xs uppercase text-muted-foreground block">
              Input Directive
            </label>
            <textarea
              id="query-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-full min-h-[160px] bg-secondary/10 border-2 border-border p-4 font-mono text-sm focus:border-primary focus:outline-none resize-none rounded-none text-foreground placeholder:text-muted-foreground/50"
              placeholder="Ask the DJZS Agent..."
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label htmlFor="zone-select" className="font-mono text-xs uppercase text-muted-foreground block">
                Target Zone
              </label>
              <select
                id="zone-select"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full bg-secondary/10 border-2 border-border p-3 font-mono text-xs focus:border-primary focus:outline-none rounded-none appearance-none cursor-pointer hover:bg-secondary/20 transition-colors"
              >
                <option>Zone 01 – DYOR</option>
                <option>Zone 02 – Decentralized iD</option>
                <option>Zone 03 – Blockchain Testnet</option>
                <option>Zone 04 – Decentralized Social</option>
                <option>Zone 05 – RWA</option>
                <option>Zone 06 – DePIN</option>
                <option>Zone 07 – DeFi</option>
                <option>Zone 08 – DeAI</option>
                <option>Zone 09 – DeSci</option>
                <option>Zone 10 – Time</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="mode-select" className="font-mono text-xs uppercase text-muted-foreground block">
                Processing Mode
              </label>
              <select
                id="mode-select"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full bg-secondary/10 border-2 border-border p-3 font-mono text-xs focus:border-primary focus:outline-none rounded-none appearance-none cursor-pointer hover:bg-secondary/20 transition-colors"
              >
                <option value="quick">Quick (Q&A) - $0.01</option>
                <option value="journal">Journal - $0.03</option>
                <option value="research">Research - $0.05</option>
                <option value="alpha">Alpha - $0.10+</option>
              </select>
            </div>
          </div>

          <BrutalButton
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full flex justify-center items-center gap-2 py-6"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                PROCESSING...
              </>
            ) : (
              "EXECUTE_QUERY"
            )}
          </BrutalButton>
        </form>

        {/* Output Section */}
        <div className="lg:col-span-7 relative border-2 border-border bg-black font-mono text-sm overflow-hidden min-h-[400px] flex flex-col">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
          
          {/* Status Bar */}
          <div className="border-b border-white/10 p-2 flex gap-4 text-[10px] text-muted-foreground uppercase tracking-wider">
            <span>STATUS: {loading ? <span className="text-primary animate-pulse">PROCESSING</span> : <span className="text-green-500">IDLE</span>}</span>
            <span>MEM: 128MB</span>
            <span>UPTIME: 99.9%</span>
          </div>

          <div className="p-4 flex-1 overflow-y-auto space-y-4 font-mono">
            {!response && !loading && (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground/30 space-y-4 select-none">
                <Terminal className="w-16 h-16 opacity-20" />
                <p className="text-xs uppercase tracking-widest text-center">
                    System Ready<br/>
                    Initiate Query Sequence
                </p>
                </div>
            )}

            {/* Live Logs */}
            {loading && (
                <div className="space-y-1 text-xs font-mono text-primary/70">
                    {logs.map((log, i) => (
                        <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-200">
                            {log}
                        </div>
                    ))}
                    <div className="animate-pulse">_</div>
                </div>
            )}

            {response && !loading && (
                <div className="text-primary whitespace-pre-wrap leading-relaxed animate-in fade-in duration-300 selection:bg-primary/30 selection:text-white">
                {response}
                <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse align-middle" />
                </div>
            )}
          </div>
        </div>
      </div>
    </BrutalCard>
  );
};
