import React, { useState, useEffect } from "react";
import { BrutalButton, BrutalCard } from "@/components/ui/brutalist";
import { cn } from "@/lib/utils";
import { Loader2, Terminal, Cpu, ShieldCheck, Zap, Database, RefreshCw, CheckCircle2, Link2, Lock, AlertCircle, LogOut, UploadCloud } from "lucide-react";
import { djzsApi, type DjzsEntry } from "@/lib/djzs-api";
import { irysService } from "@/lib/irys-service";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

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
    setLogs(prev => [...prev, `[${new Date().toISOString().split('T')[1].slice(0,8)}] ${message}`].slice(-5));
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
    addLog(`CONNECTING TO DJZS_PAID_AGENT v1.0.0...`);
    
    try {
        // Simulate authenticating
        await new Promise((resolve) => setTimeout(() => {
            addLog("AUTHENTICATING USERNAME_DAO KEY...");
            resolve(true);
        }, 500));

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
        const res = await djzsApi.requestChallenge("DJZS Agent");
        setChallengeId(res.challenge_id);
        setAuthStep("verify");
        addLog("AUTH_CHALLENGE_INITIATED");
    } catch (e) {
        addLog("AUTH_ERROR: CHALLENGE_FAILED");
    } finally {
        setIsAuthenticating(false);
    }
  };

  const handleVerifyCode = async () => {
    setIsAuthenticating(true);
    try {
        await djzsApi.verifyChallenge(challengeId, authCode);
        setIsAuthenticated(true);
        setAuthStep("idle");
        addLog("ANYTYPE_CONNECTION_ESTABLISHED");
        toast({
            title: "VAULT_CONNECTED",
            description: "SECURE TUNNEL ESTABLISHED WITH ANYTYPE.",
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
    <BrutalCard className="w-full max-w-6xl mx-auto bg-background p-0 overflow-hidden border-2 border-primary shadow-[8px_8px_0px_0px_var(--color-primary)]">
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
        <form onSubmit={handleSubmit} className="lg:col-span-4 space-y-6 flex flex-col h-full border-r-0 lg:border-r-2 border-border pr-0 lg:pr-6 border-dashed">
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
        <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative border-2 border-border bg-black font-mono text-sm overflow-hidden min-h-[400px] flex flex-col flex-grow">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary/20" />
            
            {/* Status Bar */}
            <div className="border-b border-white/10 p-2 flex gap-4 text-[10px] text-muted-foreground uppercase tracking-wider">
                <span>STATUS: {loading ? <span className="text-primary animate-pulse">PROCESSING</span> : <span className="text-green-500">IDLE</span>}</span>
                <span>MEM: 128MB</span>
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

        {/* Sync Status Section (Simulated Anytype Worker) */}
        <div className="lg:col-span-3 border-l-0 lg:border-l-2 border-border pl-0 lg:pl-6 border-dashed flex flex-col">
            <div className="bg-secondary/5 border-2 border-border h-full p-4 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="font-mono text-xs font-bold uppercase flex items-center gap-2">
                        <Database className="w-3 h-3" />
                        DATA_PERSISTENCE
                    </h4>
                    {isAuthenticated && (
                      <div className="text-[10px] font-mono text-primary flex items-center gap-1">
                         <Lock className="w-3 h-3" /> VAULT_ACTIVE
                      </div>
                    )}
                </div>

                {!isAuthenticated ? (
                   <div className="flex-1 flex flex-col items-center justify-center space-y-4 mb-4 border-2 border-border border-dashed bg-background/50 p-4">
                      <Link2 className="w-8 h-8 text-muted-foreground opacity-50" />
                      
                      {authStep === "idle" && (
                          <div className="text-center space-y-4">
                             <p className="text-[10px] font-mono text-muted-foreground">CONNECT VAULT TO ENABLE SYNC</p>
                             <BrutalButton variant="outline" className="w-full text-xs" onClick={handleRequestChallenge} disabled={isAuthenticating}>
                                {isAuthenticating ? <Loader2 className="w-3 h-3 animate-spin" /> : "CONNECT ANYTYPE"}
                             </BrutalButton>
                          </div>
                      )}

                      {authStep === "verify" && (
                          <div className="space-y-3 w-full">
                             <p className="text-[10px] font-mono text-primary text-center">ENTER CODE FROM ANYTYPE APP</p>
                             <Input 
                                value={authCode}
                                onChange={(e) => setAuthCode(e.target.value)}
                                placeholder="1234"
                                className="text-center font-mono tracking-widest text-lg"
                                maxLength={4}
                             />
                             <BrutalButton className="w-full text-xs" onClick={handleVerifyCode} disabled={isAuthenticating || authCode.length !== 4}>
                                {isAuthenticating ? <Loader2 className="w-3 h-3 animate-spin" /> : "VERIFY CODE"}
                             </BrutalButton>
                             <button onClick={() => setAuthStep("idle")} className="text-[10px] underline text-muted-foreground w-full text-center">CANCEL</button>
                          </div>
                      )}
                   </div>
                ) : (
                   <>
                    <div className="flex-1 overflow-y-auto space-y-2 mb-4 min-h-[200px] pr-1">
                        {syncQueue.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground/30 text-center">
                                <CheckCircle2 className="w-8 h-8 mb-2 opacity-50" />
                                <span className="text-[10px] uppercase">All Entries Synced</span>
                            </div>
                        ) : (
                            syncQueue.map((entry) => (
                                <div key={entry.id} className="bg-background border border-border p-2 text-[10px] font-mono group flex flex-col gap-2">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>{entry.mode.toUpperCase()}</span>
                                        <span>{entry.zone.split('–')[0].trim()}</span>
                                    </div>
                                    <div className="truncate font-bold">{entry.title}</div>
                                    
                                    <div className="flex gap-2 pt-1">
                                      {/* Archive to Irys Button */}
                                      <button 
                                        onClick={() => handleArchiveToIrys(entry)}
                                        disabled={!!isArchiving}
                                        className="flex-1 bg-secondary/20 hover:bg-primary hover:text-primary-foreground text-[9px] uppercase py-1 flex items-center justify-center gap-1 transition-colors disabled:opacity-50"
                                      >
                                        {isArchiving === entry.id ? <Loader2 className="w-2 h-2 animate-spin"/> : <UploadCloud className="w-2 h-2" />}
                                        ARCHIVE_IRYS
                                      </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="space-y-2">
                        <BrutalButton 
                            variant="outline" 
                            className="w-full text-xs py-2 h-auto"
                            onClick={handleSimulateSync}
                            disabled={isSyncing || syncQueue.length === 0}
                        >
                            {isSyncing ? (
                                <RefreshCw className="w-3 h-3 animate-spin mr-2" />
                            ) : (
                                <RefreshCw className="w-3 h-3 mr-2" />
                            )}
                            {isSyncing ? "SYNCING..." : "SYNC_ALL_TO_VAULT"}
                        </BrutalButton>
                        <BrutalButton 
                            variant="ghost" 
                            className="w-full text-xs py-1 h-auto text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            onClick={handleDisconnect}
                        >
                            <LogOut className="w-3 h-3 mr-2" />
                            DISCONNECT
                        </BrutalButton>
                    </div>
                   </>
                )}
                
                <div className="mt-4 text-[10px] text-muted-foreground font-mono border-t border-border pt-2">
                    <p>DATA LAYERS:</p>
                    <div className="flex justify-between mt-1 text-primary/70">
                      <span>LOCAL: SYNC</span>
                      <span>IRYS: ARCHIVE</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </BrutalCard>
  );
};
