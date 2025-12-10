import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Terminal, 
  Zap, 
  Database, 
  Upload, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  Hash,
  ExternalLink
} from "lucide-react";
import { CyberGrid } from "@/components/cyber-grid";
import { Navigation } from "@/components/navigation";

export default function ApiTest() {
  const [irysLoading, setIrysLoading] = useState(false);
  const [mcpLoading, setMcpLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  
  const [irysResult, setIrysResult] = useState<any>(null);
  const [mcpResult, setMcpResult] = useState<any>(null);
  const [publishResult, setPublishResult] = useState<any>(null);

  const testIrys = async () => {
    setIrysLoading(true);
    setIrysResult(null);
    try {
      const response = await fetch("/api/test-irys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          test: "DJZS Protocol Test Upload",
          timestamp: new Date().toISOString(),
        }),
      });
      const data = await response.json();
      setIrysResult(data);
    } catch (error: any) {
      setIrysResult({ success: false, error: error.message });
    } finally {
      setIrysLoading(false);
    }
  };

  const testMcp = async () => {
    setMcpLoading(true);
    setMcpResult(null);
    try {
      const response = await fetch("/api/test-mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setMcpResult(data);
    } catch (error: any) {
      setMcpResult({ success: false, error: error.message });
    } finally {
      setMcpLoading(false);
    }
  };

  const testPublish = async () => {
    setPublishLoading(true);
    setPublishResult(null);
    try {
      const response = await fetch("/api/profile/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileId: "test-profile-123",
        }),
      });
      const data = await response.json();
      setPublishResult(data);
    } catch (error: any) {
      setPublishResult({ success: false, error: error.message });
    } finally {
      setPublishLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono relative overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CyberGrid />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_90%)]" />
      </div>

      {/* Navigation Bar */}
      <Navigation />

      <main className="relative z-10 pt-8 pb-20 px-4 md:px-8 max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
            API <span className="text-sky-400">TEST</span>
          </h1>
          <p className="text-slate-400 text-sm">Test Anytype MCP + Irys Network Integration</p>
        </div>

        {/* Test Cards */}
        <div className="space-y-6">
          
          {/* IRYS Test */}
          <motion.div 
            className="rounded-xl border border-sky-500/40 bg-slate-900/80 p-6 space-y-4"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-bold flex items-center gap-2 text-slate-100">
                  <Upload className="w-5 h-5 text-sky-400" />
                  IRYS UPLOAD TEST
                </h2>
                <p className="text-xs text-slate-400">Upload JSON to Irys Network (Base Mainnet)</p>
              </div>
              <button 
                onClick={testIrys} 
                disabled={irysLoading}
                className="inline-flex items-center gap-2 rounded-md border border-sky-400 bg-sky-950/70 px-4 py-2 text-xs font-semibold text-sky-200 hover:bg-sky-900/70 transition disabled:opacity-50"
                data-testid="button-test-irys"
              >
                {irysLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                {irysLoading ? "UPLOADING..." : "TEST"}
              </button>
            </div>

            {irysResult && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-sky-500/20 pt-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  {irysResult.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  <span className="font-bold text-sm text-slate-100">
                    {irysResult.success ? "SUCCESS" : "FAILED"}
                  </span>
                </div>
                <pre className="bg-black/50 p-4 text-xs overflow-auto max-h-64 border border-sky-500/20 rounded text-slate-300" data-testid="text-irys-result">
                  {JSON.stringify(irysResult, null, 2)}
                </pre>
                {irysResult.receipt?.url && (
                  <a 
                    href={irysResult.receipt.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-sky-400 hover:text-sky-300 transition-colors text-sm"
                    data-testid="link-irys-gateway"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on Irys Gateway
                  </a>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* MCP Test */}
          <motion.div 
            className="rounded-xl border border-sky-500/40 bg-slate-900/80 p-6 space-y-4"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-bold flex items-center gap-2 text-slate-100">
                  <Database className="w-5 h-5 text-sky-400" />
                  ANYTYPE MCP TEST
                </h2>
                <p className="text-xs text-slate-400">Connect to Anytype MCP API (localhost:31009)</p>
              </div>
              <button 
                onClick={testMcp} 
                disabled={mcpLoading}
                className="inline-flex items-center gap-2 rounded-md border border-sky-400 bg-sky-950/70 px-4 py-2 text-xs font-semibold text-sky-200 hover:bg-sky-900/70 transition disabled:opacity-50"
                data-testid="button-test-mcp"
              >
                {mcpLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Terminal className="w-4 h-4" />}
                {mcpLoading ? "CONNECTING..." : "TEST"}
              </button>
            </div>

            {mcpResult && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-sky-500/20 pt-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  {mcpResult.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  <span className="font-bold text-sm text-slate-100">
                    {mcpResult.success ? "SUCCESS" : "FAILED"}
                  </span>
                </div>
                <pre className="bg-black/50 p-4 text-xs overflow-auto max-h-64 border border-sky-500/20 rounded text-slate-300" data-testid="text-mcp-result">
                  {JSON.stringify(mcpResult, null, 2)}
                </pre>
              </motion.div>
            )}
          </motion.div>

          {/* Full Flow Test */}
          <motion.div 
            className="rounded-xl border-2 border-sky-400/60 bg-slate-900/80 p-6 space-y-4"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-bold flex items-center gap-2 text-slate-100">
                  <Hash className="w-5 h-5 text-sky-400" />
                  FULL FLOW TEST
                </h2>
                <p className="text-xs text-slate-400">Anytype → IRYS → Receipt Storage</p>
              </div>
              <button 
                onClick={testPublish} 
                disabled={publishLoading}
                className="inline-flex items-center gap-2 rounded-md bg-sky-400 px-4 py-2 text-xs font-semibold text-slate-900 hover:bg-sky-300 transition disabled:opacity-50"
                data-testid="button-test-publish"
              >
                {publishLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                {publishLoading ? "PUBLISHING..." : "PUBLISH"}
              </button>
            </div>

            {publishResult && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t border-sky-500/20 pt-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  {publishResult.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  <span className="font-bold text-sm text-slate-100">
                    {publishResult.success ? "SUCCESS" : "FAILED"}
                  </span>
                </div>
                <pre className="bg-black/50 p-4 text-xs overflow-auto max-h-64 border border-sky-500/20 rounded text-slate-300" data-testid="text-publish-result">
                  {JSON.stringify(publishResult, null, 2)}
                </pre>
                {publishResult.irys?.url && (
                  <a 
                    href={publishResult.irys.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-sky-400 hover:text-sky-300 transition-colors text-sm"
                    data-testid="link-publish-gateway"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Published Profile on Irys
                  </a>
                )}
              </motion.div>
            )}
          </motion.div>

        </div>

        {/* Info Box */}
        <div className="rounded-xl border border-sky-500/30 bg-sky-950/30 p-6">
          <h3 className="font-bold mb-2 flex items-center gap-2 text-slate-100">
            <Terminal className="w-4 h-4 text-sky-400" />
            REQUIREMENTS
          </h3>
          <ul className="text-xs space-y-1 text-slate-400">
            <li>• Anytype desktop app must be running</li>
            <li>• MCP server enabled on port 31009</li>
            <li>• ANYTYPE_API_KEY configured in secrets</li>
            <li>• PRIVATE_KEY configured for Irys uploads</li>
          </ul>
        </div>

      </main>
    </div>
  );
}
