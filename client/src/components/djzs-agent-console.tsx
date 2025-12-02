import React, { useState, useEffect } from "react";
import { BrutalButton, BrutalCard, GlitchText } from "@/components/ui/brutalist";
import { cn } from "@/lib/utils";
import { Loader2, Terminal, Cpu, ShieldCheck, Zap, Database, RefreshCw, CheckCircle2, Link2, Lock, AlertCircle, LogOut, UploadCloud, Activity, Radio } from "lucide-react";
import { djzsApi, type DjzsEntry } from "@/lib/djzs-api";
import { irysService } from "@/lib/irys-service";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MatrixRain } from "@/components/matrix-rain";
import { motion } from "framer-motion";

export const DjzsAgentConsole = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState("Zone 01 – DYOR");
  const [mode, setMode] = useState("quick");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  
  // Sync & Archive State
  const [syncQueue, setSyncQueue] = useState<DjzsEntry[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isArchiving, setIsArchiving] = useState<string | null>(null); // ID of entry being archived
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authStep, setAuthStep] = useState<"idle" | "challenge" | "verify">("idle");
  const [challengeId, setChallengeId] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toISOString().split('T')[1].slice(0,12)}] ${message}`].slice(-8));
  };

  const refreshSyncQueue = async () => {
    const pending = await djzsApi.getSyncEntries();
    setSyncQueue(pending);
  };

  // Initial load
  useEffect(() => {
    refreshSyncQueue();
    setIsAuthenticated(djzsApi.isAuthenticated());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);
    setLogs([]);

    addLog("INIT_SEQUENCE_START");
    
    // Simulate MCP Bridge Interaction if authenticated
    if (isAuthenticated) {
       addLog(`> [MCP] SERVER: @anyproto/anytype-mcp`);
       addLog(`> [MCP] TOOL_CALL: anytype_search_objects("${query}")`);
       await djzsApi.mcpExecuteTool("anytype_search_objects", { query });
       addLog(`> [MCP] RESULT: { hits: 0, latency: 45ms }`);
    } else {
       addLog(`> [MCP] STATUS: DISCONNECTED (USING LOCAL KNOWLEDGE BASE)`); 
    }
    
    try {
        // Simulate authenticating
        if (!isAuthenticated) {
            addLog(`CONNECTING TO DJZS_PAID_AGENT v1.0.0...`);
            await new Promise((resolve) => setTimeout(() => {
                addLog("AUTHENTICATING USERNAME_DAO KEY...");
                resolve(true);
            }, 500));
        }

        // Call Simulated API
        const result = await djzsApi.assistant(query, zone, mode);
        
        addLog("GENERATING_INSIGHTS...");
        setResponse(result.response);
        
        // Refresh queue to show new entry pending sync
        await refreshSyncQueue();
        
    } catch (error) {
        addLog("ERROR: AGENT_CONNECTION_FAILED");
    } finally {
        setLoading(false);
    }
  };

  const handleSimulateSync = async () => {
    if (syncQueue.length === 0) return;
    setIsSyncing(true);
    
    for (const entry of syncQueue) {
        await djzsApi.markSynced(entry.id);
    }
    
    await refreshSyncQueue();
    setIsSyncing(false);
    toast({
      title: "SYNC_COMPLETE",
      description: "ENTRIES SYNCED TO ANYTYPE VAULT.",
      className: "bg-primary text-primary-foreground font-mono border-2 border-black",
    });
  };

  const handleArchiveToIrys = async (entry: DjzsEntry) => {
    setIsArchiving(entry.id);
    try {
      addLog(`INITIATING_IRYS_UPLOAD: ${entry.id}`);
      
      const result = await irysService.uploadJournalEntry({
        title: entry.title,
        content: entry.solution, 
        zoneId: parseInt(entry.zone.split('–')[0].replace('Zone', '').trim()) || 1,
        zoneSlug: entry.zone.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        timeCode: `${new Date().toISOString()}::${entry.mode.toUpperCase()}`,
        createdAt: entry.createdAt,
        version: 1,
        authorAlias: "Dj-Z-S", // Updated to match guide example
        tags: ["djzs", "agent", "journal"]
      });

      addLog(`IRYS_TX_CONFIRMED: ${result.irysId.slice(0, 8)}...`);
      toast({
        title: "PERMANENCE_ACHIEVED",
        description: "ENTRY ARCHIVED TO IRYS NETWORK.",
        className: "bg-primary text-primary-foreground font-mono border-2 border-black",
      });

      // Mark as synced locally too if we want, or keep separate. 
      // For now let's just update UI state via logs
    } catch (e) {
      addLog("ERROR: IRYS_UPLOAD_FAILED");
      toast({
        title: "ARCHIVE_FAILED",
        description: "COULD NOT CONNECT TO IRYS NODE.",
        variant: "destructive",
      });
    } finally {
      setIsArchiving(null);
    }
  };

  const handleRequestChallenge = async () => {
    setIsAuthenticating(true);
    try {
        addLog(`> CONNECTING TO LOCAL ANYTYPE DAEMON...`);
        await new Promise(r => setTimeout(r, 400));
        
        addLog(`> POST http://localhost:31009/v1/auth/challenges`);
        addLog(`> PAYLOAD: { "app_name": "DJZS Agent" }`);
        
        const res = await djzsApi.requestChallenge("DJZS Agent");
        setChallengeId(res.challenge_id);
        setAuthStep("verify");
        
        addLog(`> RESPONSE: 200 OK`);
        addLog(`> CHALLENGE_ID: ${res.challenge_id.substring(0, 12)}...`);
        addLog(`> ACTION REQUIRED: CHECK ANYTYPE APP FOR 4-DIGIT CODE`);
        
    } catch (e) {
        addLog("AUTH_ERROR: CHALLENGE_FAILED - IS ANYTYPE RUNNING?");
    } finally {
        setIsAuthenticating(false);
    }
  };

  const handleVerifyCode = async () => {
    setIsAuthenticating(true);
    try {
        addLog(`> POST http://localhost:31009/v1/auth/api_keys`);
        addLog(`> PAYLOAD: { "challenge_id": "...", "code": "****" }`);
        
        await djzsApi.verifyChallenge(challengeId, authCode);
        setIsAuthenticated(true);
        setAuthStep("idle");
        
        addLog(`> RESPONSE: 200 OK`);
        addLog(`> API_KEY ACQUIRED: sk_********************`);
        addLog("ANYTYPE_MCP_BRIDGE_ESTABLISHED");
        
        toast({
            title: "MCP_BRIDGE_ACTIVE",
            description: "CONNECTED TO LOCAL ANYTYPE VAULT API.",
            className: "bg-primary text-primary-foreground font-mono border-2 border-black",
        });
    } catch (e) {
        addLog("AUTH_ERROR: INVALID_CODE");
        toast({
            title: "CONNECTION_FAILED",
            description: "INVALID CODE. TRY AGAIN.",
            variant: "destructive",
        });
    } finally {
        setIsAuthenticating(false);
    }
  };

  const handleDisconnect = () => {
    djzsApi.disconnect();
    setIsAuthenticated(false);
    addLog("ANYTYPE_DISCONNECTED");
  };

  return (
    <BrutalCard className="w-full max-w-6xl mx-auto bg-black/90 backdrop-blur-xl p-0 overflow-hidden border-2 border-primary shadow-[0px_0px_40px_rgba(178,255,89,0.2)]">
      {/* Terminal Header */}
      <div className="bg-primary/10 text-primary p-2 border-b-2 border-primary flex justify-between items-center relative overflow-hidden">
        {/* Header Glitch Scanline */}
        <div className="absolute top-0 left-0 h-full w-1 bg-primary/50 animate-[scan_2s_ease-in-out_infinite]" />
        
        <div className="font-mono text-xs font-bold uppercase flex items-center gap-2 z-10">
          <Terminal className="w-4 h-4" />
          <GlitchText text="DJZS_PAID_AGENT // v1.0.0" className="text-sm font-black tracking-wider" />
        </div>
        <div className="font-mono text-[10px] flex items-center gap-4 z-10">
            <span className="flex items-center gap-1 text-primary/70"><Cpu className="w-3 h-3"/> NODE_ENV: PRODUCTION</span>
            <span className="flex items-center gap-1 text-primary/70"><ShieldCheck className="w-3 h-3"/> ENCRYPTED</span>
            <span className="flex items-center gap-1 text-primary/70"><Zap className="w-3 h-3"/> x402 READY</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 h-[600px]">
        {/* Input Section */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 bg-black flex flex-col h-full border-r-2 border-primary/30">
          <div className="p-4 space-y-6 flex-grow">
            <div className="space-y-2">
              <label htmlFor="query-input" className="font-mono text-[10px] uppercase text-primary/50 block tracking-widest">
                /// INPUT DIRECTIVE
              </label>
              <textarea
                id="query-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-48 bg-secondary/10 border border-primary/30 p-3 font-mono text-xs focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none resize-none rounded-none text-primary placeholder:text-primary/20"
                placeholder="ENTER QUERY..."
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="zone-select" className="font-mono text-[10px] uppercase text-primary/50 block tracking-widest">
                  /// TARGET ZONE
                </label>
                <div className="relative">
                    <select
                        id="zone-select"
                        value={zone}
                        onChange={(e) => setZone(e.target.value)}
                        className="w-full bg-black border border-primary/30 p-2 font-mono text-[10px] text-primary focus:border-primary focus:outline-none rounded-none appearance-none cursor-pointer hover:bg-primary/10 transition-colors uppercase"
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
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50 text-[8px]">▼</div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="mode-select" className="font-mono text-[10px] uppercase text-primary/50 block tracking-widest">
                  /// PROCESSING MODE
                </label>
                <div className="relative">
                    <select
                        id="mode-select"
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="w-full bg-black border border-primary/30 p-2 font-mono text-[10px] text-primary focus:border-primary focus:outline-none rounded-none appearance-none cursor-pointer hover:bg-primary/10 transition-colors uppercase"
                    >
                        <option value="quick">Quick (Q&A) - $0.01</option>
                        <option value="journal">Journal - $0.03</option>
                        <option value="research">Research - $0.05</option>
                        <option value="alpha">Alpha - $0.10+</option>
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50 text-[8px]">▼</div>
                </div>
              </div>
            </div>
          </div>

          <BrutalButton
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full flex justify-center items-center gap-2 py-6 border-t-2 border-primary/30 bg-primary/10 hover:bg-primary hover:text-black transition-all"
            data-testid="button-execute-query"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                PROCESSING
              </>
            ) : (
              <>
                EXECUTE_QUERY <span className="animate-pulse">_</span>
              </>
            )}
          </BrutalButton>
        </form>

        {/* Output Section */}
        <div className="lg:col-span-6 flex flex-col relative bg-black overflow-hidden">
            {/* Matrix Background */}
            <MatrixRain />
            
            {/* Status Bar */}
            <div className="border-b border-primary/30 p-2 flex justify-between text-[10px] font-mono text-primary/50 uppercase tracking-wider bg-black/80 backdrop-blur-sm z-10">
                <div className="flex gap-4">
                    <span>STATUS: {loading ? <span className="text-primary animate-pulse">PROCESSING...</span> : <span className="text-green-500">IDLE</span>}</span>
                    <span>MEM: 128MB</span>
                </div>
                <div className="flex gap-2">
                    <Activity className="w-3 h-3 animate-pulse" />
                    LIVE FEED
                </div>
            </div>

            <div className="p-6 flex-1 overflow-y-auto font-mono relative z-10 scrollbar-hide">
                {!response && !loading && (
                    <div className="h-full flex flex-col items-center justify-center text-primary/20 space-y-4 select-none">
                        <div className="border border-primary/20 p-8 rotate-45">
                            <div className="-rotate-45">
                                <Terminal className="w-12 h-12" />
                            </div>
                        </div>
                        <p className="text-xs uppercase tracking-[0.2em] text-center animate-pulse">
                            System Ready<br/>
                            Awaiting Input
                        </p>
                    </div>
                )}

                {/* Live Logs Overlay */}
                {loading && (
                    <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/90 border border-primary/30 text-[10px] font-mono text-primary shadow-[0_0_20px_rgba(178,255,89,0.1)]">
                        <div className="flex flex-col-reverse gap-1 h-32 overflow-hidden">
                            {logs.map((log, i) => (
                                <div key={i} className="animate-in fade-in slide-in-from-left-4 duration-100 flex gap-2">
                                    <span className="opacity-50">{'>'}</span>
                                    {log}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {response && !loading && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="text-primary whitespace-pre-wrap leading-relaxed selection:bg-primary/30 selection:text-white text-sm"
                    >
                        <div className="mb-4 text-[10px] text-primary/50 border-b border-primary/20 pb-2">
                            /// OUTPUT GENERATED: {new Date().toLocaleTimeString()}
                        </div>
                        {response}
                        <span className="inline-block w-2 h-4 bg-primary ml-1 animate-[blink_1s_infinite]" />
                    </motion.div>
                )}
            </div>
        </div>

        {/* Sync Status Section (Simulated Anytype Worker) */}
        <div className="lg:col-span-3 border-l-2 border-primary/30 flex flex-col bg-black/95 backdrop-blur-sm" data-testid="section-data-persistence">
            <div className="p-3 border-b border-primary/30 flex justify-between items-center bg-primary/5">
                <h4 className="font-mono text-[10px] font-bold uppercase flex items-center gap-2 text-primary" data-testid="text-data-persistence">
                    <Database className="w-3 h-3" />
                    DATA_PERSISTENCE
                </h4>
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>

            <div className="flex-1 p-4 flex flex-col gap-4 overflow-hidden">
                {!isAuthenticated ? (
                   <div className="flex-1 flex flex-col items-center justify-center space-y-4 border border-primary/20 border-dashed bg-primary/5 p-4 text-center" data-testid="lock-container">
                      <Lock className="w-8 h-8 text-primary/30" data-testid="icon-lock" />
                      
                      {authStep === "idle" && (
                          <div className="space-y-4 w-full">
                             <div className="space-y-1">
                               <p className="text-[10px] font-mono text-primary/70">LOCAL API DISCONNECTED</p>
                               <p className="text-[8px] font-mono text-primary/40">REQUIREMENT: Anytype v0.46.6+</p>
                             </div>
                             <BrutalButton variant="outline" className="w-full text-[10px] py-2 h-auto border-primary/50 text-primary hover:bg-primary hover:text-black" onClick={handleRequestChallenge} disabled={isAuthenticating} data-testid="button-initiate-mcp">
                                {isAuthenticating ? <Loader2 className="w-3 h-3 animate-spin" /> : "INITIATE MCP BRIDGE"}
                             </BrutalButton>
                          </div>
                      )}

                      {authStep === "verify" && (
                          <div className="space-y-3 w-full">
                             <div className="space-y-1">
                                <p className="text-[10px] font-mono text-primary text-center animate-pulse">CHECK ANYTYPE APP</p>
                                <p className="text-[8px] font-mono text-primary/50 text-center">ENTER 4-DIGIT PAIRING CODE</p>
                             </div>
                             <Input 
                                value={authCode}
                                onChange={(e) => setAuthCode(e.target.value)}
                                placeholder="0000"
                                className="text-center font-mono tracking-[0.5em] text-lg bg-black border-primary text-primary focus:ring-primary rounded-none"
                                maxLength={4}
                                data-testid="input-auth-code"
                             />
                             <BrutalButton className="w-full text-[10px] h-8" onClick={handleVerifyCode} disabled={isAuthenticating || authCode.length !== 4} data-testid="button-authorize-key">
                                {isAuthenticating ? <Loader2 className="w-3 h-3 animate-spin" /> : "AUTHORIZE KEY GENERATION"}
                             </BrutalButton>
                             <button onClick={() => setAuthStep("idle")} className="text-[8px] underline text-primary/50 w-full text-center hover:text-primary" data-testid="button-cancel-auth">CANCEL REQUEST</button>
                          </div>
                      )}
                   </div>
                ) : (
                   <>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-primary/10 p-2 border border-primary/20">
                            <div className="text-[8px] text-primary/50 uppercase">PENDING</div>
                            <div className="text-xl font-mono font-bold text-primary leading-none">{syncQueue.length}</div>
                        </div>
                        <div className="bg-primary/10 p-2 border border-primary/20">
                            <div className="text-[8px] text-primary/50 uppercase">ARCHIVED</div>
                            <div className="text-xl font-mono font-bold text-primary leading-none">0</div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
                        {syncQueue.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-primary/30 text-center space-y-2">
                                <CheckCircle2 className="w-6 h-6" />
                                <span className="text-[10px] uppercase tracking-wider">All Data Synced</span>
                            </div>
                        ) : (
                            syncQueue.map((entry) => (
                                <div key={entry.id} className="bg-black border border-primary/30 p-2 text-[10px] font-mono group flex flex-col gap-2 hover:bg-primary/5 transition-colors">
                                    <div className="flex justify-between text-primary/50">
                                        <span>{entry.mode.slice(0,3).toUpperCase()}</span>
                                        <span>{entry.zone.split('–')[0].replace('Zone', 'ZN').trim()}</span>
                                    </div>
                                    <div className="truncate font-bold text-primary">{entry.title}</div>
                                    
                                    <div className="flex gap-2 pt-1">
                                      <button 
                                        onClick={() => handleArchiveToIrys(entry)}
                                        disabled={!!isArchiving}
                                        className="flex-1 bg-primary/10 hover:bg-primary hover:text-black text-[9px] uppercase py-1 flex items-center justify-center gap-1 transition-colors disabled:opacity-50 border border-primary/30"
                                        data-testid={`button-archive-${entry.id}`}
                                      >
                                        {isArchiving === entry.id ? <Loader2 className="w-2 h-2 animate-spin"/> : <UploadCloud className="w-2 h-2" />}
                                        ARCHIVE
                                      </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="space-y-2 mt-auto pt-4 border-t border-primary/30">
                        <BrutalButton 
                            variant="outline" 
                            className="w-full text-[10px] py-2 h-auto border-primary text-primary hover:bg-primary hover:text-black"
                            onClick={handleSimulateSync}
                            disabled={isSyncing || syncQueue.length === 0}
                            data-testid="button-force-sync"
                        >
                            {isSyncing ? (
                                <RefreshCw className="w-3 h-3 animate-spin mr-2" />
                            ) : (
                                <RefreshCw className="w-3 h-3 mr-2" />
                            )}
                            {isSyncing ? "SYNCING..." : "FORCE_SYNC_VAULT"}
                        </BrutalButton>
                        <BrutalButton 
                            variant="ghost" 
                            className="w-full text-[10px] py-1 h-auto text-primary/50 hover:text-red-500 hover:bg-red-500/10"
                            onClick={handleDisconnect}
                            data-testid="button-terminate-session"
                        >
                            <LogOut className="w-3 h-3 mr-2" />
                            TERMINATE_SESSION
                        </BrutalButton>
                    </div>
                   </>
                )}
            </div>
        </div>
      </div>
    </BrutalCard>
  );
};
