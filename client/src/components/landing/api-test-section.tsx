import React, { useState } from "react";
import { motion } from "framer-motion";

interface TestResult {
  loading: boolean;
  result: string | null;
  error: boolean;
}

export function ApiTestSection() {
  const [irysTest, setIrysTest] = useState<TestResult>({ loading: false, result: null, error: false });
  const [mcpTest, setMcpTest] = useState<TestResult>({ loading: false, result: null, error: false });
  const [flowTest, setFlowTest] = useState<TestResult>({ loading: false, result: null, error: false });

  async function runIrysTest() {
    setIrysTest({ loading: true, result: null, error: false });
    try {
      const res = await fetch("/api/test-irys", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setIrysTest({ loading: false, result: `Receipt: ${data.receiptId}`, error: false });
      } else {
        setIrysTest({ loading: false, result: data.error || "Failed", error: true });
      }
    } catch (err) {
      setIrysTest({ loading: false, result: "Connection error", error: true });
    }
  }

  async function runMcpTest() {
    setMcpTest({ loading: true, result: null, error: false });
    try {
      const res = await fetch("/api/test-mcp", { method: "POST" });
      const data = await res.json();
      setMcpTest({ loading: false, result: data.status || "Connected", error: !data.success });
    } catch (err) {
      setMcpTest({ loading: false, result: "MCP bridge unavailable", error: true });
    }
  }

  async function runFlowTest() {
    setFlowTest({ loading: true, result: null, error: false });
    try {
      const res = await fetch("/api/profile/publish", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId: "djzs-test-profile" }),
      });
      const data = await res.json();
      if (data.success) {
        setFlowTest({ loading: false, result: `Published: ${data.irys?.hash?.slice(0, 12)}...`, error: false });
      } else {
        setFlowTest({ loading: false, result: data.error || "Failed", error: true });
      }
    } catch (err) {
      setFlowTest({ loading: false, result: "Flow error", error: true });
    }
  }

  const tests = [
    {
      title: "IRYS UPLOAD TEST",
      desc: "Upload JSON to Irys Network (Base mainnet or testnet).",
      cta: "TEST",
      onClick: runIrysTest,
      state: irysTest,
    },
    {
      title: "ANYTYPE MCP TEST",
      desc: "Connect to the DJZS MCP server exposed by your Anytype environment.",
      cta: "TEST",
      onClick: runMcpTest,
      state: mcpTest,
    },
    {
      title: "FULL FLOW TEST",
      desc: "End-to-end: Anytype → DJZS Agent → Irys receipt.",
      cta: "PUBLISH",
      onClick: runFlowTest,
      state: flowTest,
    },
  ];

  return (
    <section className="px-6 py-16 lg:px-12 border-t border-lime-500/20 bg-slate-950/90">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-sm font-mono tracking-[0.25em] text-lime-300 uppercase">
            DJZS DEVELOPER CONSOLE
          </h2>
          <p className="mt-2 text-sm text-slate-200/90">
            Test DJZS MCP, Irys uploads, and full Agent → Vault → Irys flows
            from a single panel.
          </p>
        </div>
        <div className="space-y-3">
          {tests.map((item, index) => (
            <motion.div
              key={item.title}
              data-testid={`card-test-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                x: 5,
                boxShadow: "0 5px 20px rgba(163,230,53,0.1)"
              }}
              className="flex items-center justify-between rounded-lg border border-lime-500/40 bg-slate-950/80 px-4 py-3 cursor-pointer"
            >
              <div className="flex-1">
                <div className="text-xs font-mono text-slate-200">
                  {item.title}
                </div>
                <div className="text-[0.75rem] text-slate-300/85">
                  {item.desc}
                </div>
                {item.state.result && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`mt-1 text-[0.7rem] font-mono ${item.state.error ? 'text-red-400' : 'text-emerald-400'}`}
                  >
                    {item.state.result}
                  </motion.div>
                )}
              </div>
              <motion.button 
                data-testid={`button-test-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={item.onClick}
                disabled={item.state.loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-md border border-lime-400 bg-lime-950/70 px-4 py-1.5 text-xs font-semibold text-lime-200 hover:bg-lime-900/70 transition disabled:opacity-50"
              >
                {item.state.loading ? "..." : item.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 text-[0.7rem] text-slate-400 font-mono space-y-1">
          <div>REQUIREMENTS</div>
          <ul className="list-disc list-inside space-y-1">
            <li>Anytype desktop app running.</li>
            <li>DJZS MCP server exposed on localhost.</li>
            <li>ANYTYPE_API_KEY configured as env secret.</li>
            <li>PRIVATE_KEY configured for Irys uploads.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
