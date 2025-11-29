import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Terminal, 
  Zap, 
  Database, 
  Upload, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  ArrowLeft,
  Hash,
  ExternalLink
} from "lucide-react";
import { BrutalButton, BrutalCard } from "@/components/ui/brutalist";
import { CyberGrid } from "@/components/cyber-grid";
import { MobileMenu } from "@/components/mobile-menu";

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
    <div className="min-h-screen bg-black text-primary font-mono selection:bg-primary selection:text-black relative overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CyberGrid />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]" />
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-primary bg-black/90 backdrop-blur-md h-16 flex items-center justify-between px-6">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 bg-primary text-black flex items-center justify-center font-bold text-xl group-hover:rotate-180 transition-transform duration-500">
              D
            </div>
            <span className="font-bold tracking-tighter text-xl group-hover:text-white transition-colors">
              USERNAME<span className="text-primary">DAO</span>
            </span>
          </div>
        </Link>
        <MobileMenu />
      </nav>

      <main className="relative z-10 pt-24 pb-20 px-4 md:px-8 max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-4">
          <Link href="/">
            <BrutalButton variant="outline" className="gap-2" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
              BACK TO HOME
            </BrutalButton>
          </Link>
          
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2">
              API <span className="text-primary">TEST</span>
            </h1>
            <p className="text-primary/60 text-sm">Test Anytype MCP + Irys Network Integration</p>
          </div>
        </div>

        {/* Test Cards */}
        <div className="space-y-6">
          
          {/* IRYS Test */}
          <BrutalCard className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  IRYS UPLOAD TEST
                </h2>
                <p className="text-xs text-primary/60">Upload JSON to Irys Network (Base Mainnet)</p>
              </div>
              <BrutalButton 
                onClick={testIrys} 
                disabled={irysLoading}
                className="gap-2"
                data-testid="button-test-irys"
              >
                {irysLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                {irysLoading ? "UPLOADING..." : "TEST"}
              </BrutalButton>
            </div>

            {irysResult && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t-2 border-primary/20 pt-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  {irysResult.success ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="font-bold text-sm">
                    {irysResult.success ? "SUCCESS" : "FAILED"}
                  </span>
                </div>
                <pre className="bg-black/50 p-4 text-xs overflow-auto max-h-64 border border-primary/20" data-testid="text-irys-result">
                  {JSON.stringify(irysResult, null, 2)}
                </pre>
                {irysResult.receipt?.url && (
                  <a 
                    href={irysResult.receipt.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-primary hover:text-white transition-colors text-sm"
                    data-testid="link-irys-gateway"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on Irys Gateway
                  </a>
                )}
              </motion.div>
            )}
          </BrutalCard>

          {/* MCP Test */}
          <BrutalCard className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  ANYTYPE MCP TEST
                </h2>
                <p className="text-xs text-primary/60">Connect to Anytype MCP API (localhost:31009)</p>
              </div>
              <BrutalButton 
                onClick={testMcp} 
                disabled={mcpLoading}
                className="gap-2"
                data-testid="button-test-mcp"
              >
                {mcpLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Terminal className="w-4 h-4" />}
                {mcpLoading ? "CONNECTING..." : "TEST"}
              </BrutalButton>
            </div>

            {mcpResult && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t-2 border-primary/20 pt-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  {mcpResult.success ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="font-bold text-sm">
                    {mcpResult.success ? "SUCCESS" : "FAILED"}
                  </span>
                </div>
                <pre className="bg-black/50 p-4 text-xs overflow-auto max-h-64 border border-primary/20" data-testid="text-mcp-result">
                  {JSON.stringify(mcpResult, null, 2)}
                </pre>
              </motion.div>
            )}
          </BrutalCard>

          {/* Full Flow Test */}
          <BrutalCard className="p-6 space-y-4 border-2 border-primary/50">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Hash className="w-5 h-5" />
                  FULL FLOW TEST
                </h2>
                <p className="text-xs text-primary/60">Anytype → IRYS → Receipt Storage</p>
              </div>
              <BrutalButton 
                onClick={testPublish} 
                disabled={publishLoading}
                className="gap-2 bg-primary text-black hover:bg-primary/80"
                data-testid="button-test-publish"
              >
                {publishLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                {publishLoading ? "PUBLISHING..." : "PUBLISH"}
              </BrutalButton>
            </div>

            {publishResult && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-t-2 border-primary/20 pt-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  {publishResult.success ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="font-bold text-sm">
                    {publishResult.success ? "SUCCESS" : "FAILED"}
                  </span>
                </div>
                <pre className="bg-black/50 p-4 text-xs overflow-auto max-h-64 border border-primary/20" data-testid="text-publish-result">
                  {JSON.stringify(publishResult, null, 2)}
                </pre>
                {publishResult.irys?.url && (
                  <a 
                    href={publishResult.irys.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-primary hover:text-white transition-colors text-sm"
                    data-testid="link-publish-gateway"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Published Profile on Irys
                  </a>
                )}
              </motion.div>
            )}
          </BrutalCard>

        </div>

        {/* Info Box */}
        <BrutalCard className="p-6 bg-primary/5 border-primary/30">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            REQUIREMENTS
          </h3>
          <ul className="text-xs space-y-1 text-primary/70">
            <li>• Anytype desktop app must be running</li>
            <li>• MCP server enabled on port 31009</li>
            <li>• ANYTYPE_API_KEY configured in secrets</li>
            <li>• PRIVATE_KEY configured for Irys uploads</li>
          </ul>
        </BrutalCard>

      </main>
    </div>
  );
}
