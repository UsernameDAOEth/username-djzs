import React, { useState } from "react";
import { BrutalButton, BrutalCard, GlitchText } from "@/components/ui/brutalist";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// Mock response generator since we are frontend-only
const generateMockResponse = (query: string, zone: string, mode: string) => {
  const timestamp = new Date().toISOString();
  
  const commonHeader = `/// DJZS_AGENT_V1 // ${zone.toUpperCase()} // ${mode.toUpperCase()} ///\n/// TIMESTAMP: ${timestamp} ///\n\n`;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockRes = generateMockResponse(query, zone, mode);
    setResponse(mockRes);
    setLoading(false);
  };

  return (
    <BrutalCard className="w-full max-w-4xl mx-auto bg-background p-0 overflow-hidden border-2 border-primary shadow-[8px_8px_0px_0px_var(--color-primary)]">
      {/* Terminal Header */}
      <div className="bg-primary text-primary-foreground p-2 border-b-2 border-primary flex justify-between items-center">
        <div className="font-mono text-xs font-bold uppercase flex items-center gap-2">
          <div className="w-3 h-3 bg-black animate-pulse" />
          DJZS_AGENT_CONSOLE // v1.0.0
        </div>
        <div className="font-mono text-xs">CONNECTED: LOCAL_HOST</div>
      </div>

      <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="query-input" className="font-mono text-xs uppercase text-muted-foreground block">
              Input Directive
            </label>
            <textarea
              id="query-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-32 bg-secondary/10 border-2 border-border p-4 font-mono text-sm focus:border-primary focus:outline-none resize-none rounded-none text-foreground placeholder:text-muted-foreground/50"
              placeholder="Ask the DJZS Agent..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <option value="quick">Quick (Q&A)</option>
                <option value="journal">Journal</option>
                <option value="research">Research</option>
                <option value="alpha">Alpha</option>
              </select>
            </div>
          </div>

          <BrutalButton
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full flex justify-center items-center gap-2"
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
        <div className="relative border-2 border-border bg-black p-4 font-mono text-sm overflow-hidden min-h-[300px] flex flex-col">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
          
          {!response && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground/50 text-center space-y-4">
              <div className="text-4xl opacity-20">⌘</div>
              <p className="text-xs uppercase tracking-widest">Terminal Ready<br/>Waiting for Input...</p>
            </div>
          )}

          {loading && (
            <div className="flex-1 flex flex-col justify-center space-y-1 text-primary">
              <div className="animate-pulse">&gt; CONNECTING TO AGENT SWARM...</div>
              <div className="animate-pulse delay-75">&gt; VERIFYING USERNAME_DAO CREDENTIALS...</div>
              <div className="animate-pulse delay-150">&gt; LOADING CONTEXT FROM {zone.toUpperCase()}...</div>
              <div className="animate-pulse delay-300">&gt; GENERATING INSIGHTS...</div>
            </div>
          )}

          {response && !loading && (
            <div className="text-primary whitespace-pre-wrap leading-relaxed animate-in fade-in duration-300">
              {response}
              <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse align-middle" />
            </div>
          )}
        </div>
      </div>
    </BrutalCard>
  );
};
