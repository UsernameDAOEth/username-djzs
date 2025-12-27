import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { Uploader } from "@irys/upload";
import { BaseEth } from "@irys/upload-ethereum";
import vanaRoutes from "./vana-routes";
import web3bioRoutes from "./web3bio-routes";
import paragraphRoutes from "./paragraph-routes";
import { getAnytypeMcpClient } from "./anytypeMcpClient";

export async function registerRoutes(app: Express): Promise<Server> {
  // Register Vana DataDAO routes
  app.use(vanaRoutes);
  
  // Register Web3.bio Universal Profile routes
  app.use(web3bioRoutes);
  
  // Register Paragraph publishing routes
  app.use(paragraphRoutes);
  // Test endpoint for IRYS upload
  app.post("/api/test-irys", async (req, res) => {
    try {
      const testData = req.body || {
        test: "DJZS Protocol Test Upload",
        timestamp: new Date().toISOString(),
        protocol: "Username DAO x DJZS",
      };

      // Initialize Irys uploader for Base mainnet
      const irysUploader = await Uploader(BaseEth).withWallet(process.env.PRIVATE_KEY);

      // Upload JSON data
      const receipt = await irysUploader.upload(JSON.stringify(testData), {
        tags: [
          { name: "Content-Type", value: "application/json" },
          { name: "Application", value: "DJZS-Protocol" },
          { name: "Type", value: "test-upload" },
        ],
      });

      res.json({
        success: true,
        receipt: {
          id: receipt.id,
          timestamp: receipt.timestamp,
          url: `https://gateway.irys.xyz/${receipt.id}`,
        },
        data: testData,
      });
    } catch (error: any) {
      console.error("IRYS upload error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
        hint: error.message.includes("PRIVATE_KEY") 
          ? "PRIVATE_KEY environment variable not set" 
          : "Check Irys configuration",
      });
    }
  });

  // Diagnostic endpoint - check if MCP port is open
  app.get("/api/mcp-diagnostic", async (req, res) => {
    try {
      // Try to connect to different potential endpoints
      const endpoints = [
        "http://localhost:31009/status",
        "http://localhost:31009/v1/status",
        "http://localhost:31009/v1/objects",
        "http://127.0.0.1:31009/status",
      ];

      const endpointTests = await Promise.all(
        endpoints.map(async (endpoint) => {
          try {
            const response = await fetch(endpoint, {
              method: "GET",
              signal: AbortSignal.timeout(2000),
            }).catch(() => null);
            return {
              endpoint,
              reachable: response?.ok || false,
              status: response?.status,
            };
          } catch {
            return { endpoint, reachable: false };
          }
        })
      );

      const portOpen = endpointTests.some((t) => t.reachable);

      res.json({
        diagnostics: {
          portResponding: portOpen,
          apiKey: process.env.ANYTYPE_API_KEY ? "configured" : "missing",
          endpointTests,
        },
        hint: portOpen
          ? "Port 31009 is responding. Check which endpoint returned success above."
          : "Port 31009 is not responding. Make sure Anytype MCP server is running.",
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // MCP Health Check - tests connection to Anytype MCP Server
  app.get("/api/mcp/health", async (_req, res) => {
    try {
      const mcp = await getAnytypeMcpClient();
      const tools = await mcp.listTools();
      res.json({ ok: true, toolCount: tools?.tools?.length ?? 0, tools });
    } catch (err: any) {
      res.status(500).json({ ok: false, error: err?.message ?? String(err) });
    }
  });

  // Test endpoint for Anytype API (Direct OpenAPI)
  app.post("/api/test-mcp", async (_req, res) => {
    try {
      const anytypeApiKey = process.env.ANYTYPE_API_KEY;
      
      // Step 1: Check API key configuration
      const apiKeyStatus = anytypeApiKey ? "configured" : "missing";
      
      // Step 2: Try to connect to MCP server on localhost:31009
      let mcpServerStatus = "offline";
      
      try {
        const mcpResponse = await fetch("http://localhost:31009/health", {
          method: "GET",
          signal: AbortSignal.timeout(2000),
        }).catch(() => null);
        
        if (mcpResponse?.ok) {
          mcpServerStatus = "online";
        }
      } catch {
        mcpServerStatus = "offline";
      }
      
      // Step 3: Try alternate endpoints if health check failed
      if (mcpServerStatus === "offline") {
        try {
          const altResponse = await fetch("http://localhost:31009/", {
            method: "GET",
            signal: AbortSignal.timeout(2000),
          }).catch(() => null);
          
          if (altResponse) {
            mcpServerStatus = "responding";
          }
        } catch {
          // Still offline
        }
      }
      
      const isOperational = mcpServerStatus !== "offline" && apiKeyStatus === "configured";
      
      res.json({
        success: isOperational,
        status: mcpServerStatus === "online" ? "connected" : mcpServerStatus === "responding" ? "partial" : "offline",
        message: isOperational 
          ? "Anytype MCP is connected and ready"
          : mcpServerStatus === "offline"
            ? "Anytype desktop app not running or MCP server not enabled"
            : "API key not configured",
        connection: {
          mcpServer: mcpServerStatus,
          apiKey: apiKeyStatus,
          port: 31009,
        },
        offlineMode: !isOperational,
        hint: mcpServerStatus === "offline"
          ? "Start Anytype desktop app and enable MCP server in Settings → API"
          : apiKeyStatus === "missing"
            ? "Add ANYTYPE_API_KEY in Secrets panel"
            : "Connection established",
        capabilities: isOperational ? {
          vaultSync: true,
          profileExport: true,
          journalWrite: true,
        } : {
          vaultSync: false,
          profileExport: false,
          journalWrite: false,
          fallback: "Using local storage until Anytype is connected",
        },
      });
    } catch (error: any) {
      console.error("Anytype MCP test error:", error);
      res.json({
        success: false,
        status: "error",
        message: "Failed to test Anytype connection",
        error: error.message,
        offlineMode: true,
        hint: "App will continue in offline mode. Anytype sync unavailable.",
      });
    }
  });

  // Full flow: Read UserProfile from Anytype → Upload to IRYS → Store receipt
  app.post("/api/profile/publish", async (req, res) => {
    try {
      const { profileId } = req.body;

      if (!profileId) {
        return res.status(400).json({
          success: false,
          error: "profileId is required",
        });
      }

      const anytypeApiKey = process.env.ANYTYPE_API_KEY;
      let profileData;

      // Step 1: Try to fetch UserProfile from Anytype MCP
      if (anytypeApiKey) {
        try {
          const profileResponse = await fetch(`http://localhost:31009/v1/objects/${profileId}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${anytypeApiKey}`,
              "Content-Type": "application/json",
              "Anytype-Version": "2025-05-20",
            },
            signal: AbortSignal.timeout(3000),
          });

          if (profileResponse.ok) {
            profileData = await profileResponse.json();
          } else {
            throw new Error("Anytype MCP server not responding");
          }
        } catch (mcpError) {
          console.warn("Anytype MCP unavailable, using mock profile for demo:", mcpError);
          profileData = createMockProfile(profileId);
        }
      } else {
        // No API key configured - use mock profile for demo
        profileData = createMockProfile(profileId);
      }

      // Step 2: Upload to IRYS
      const irysUploader = await Uploader(BaseEth).withWallet(process.env.PRIVATE_KEY);
      const receipt = await irysUploader.upload(JSON.stringify(profileData), {
        tags: [
          { name: "Content-Type", value: "application/json" },
          { name: "Application", value: "DJZS-Protocol" },
          { name: "Type", value: "user-profile" },
          { name: "Profile-ID", value: profileId },
        ],
      });

      // Step 3: Return receipt
      const irysUrl = `https://gateway.irys.xyz/${receipt.id}`;

      res.json({
        success: true,
        source: anytypeApiKey && profileData !== createMockProfile(profileId) ? "anytype" : "mock",
        profile: profileData,
        irys: {
          hash: receipt.id,
          url: irysUrl,
          timestamp: receipt.timestamp,
        },
        message: anytypeApiKey ? 
          "Profile published to Irys (from Anytype)" : 
          "Profile published to Irys (using demo data - configure ANYTYPE_API_KEY for real profiles)",
      });
    } catch (error: any) {
      console.error("Profile publish error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
        hint: error.message.includes("PRIVATE_KEY") 
          ? "PRIVATE_KEY not set. Required for Irys uploads."
          : "Check Irys configuration and network connectivity",
      });
    }
  });

  // Helper function to create a mock profile for testing
  function createMockProfile(profileId: string) {
    return {
      id: profileId,
      type: "DemoProfile",
      name: "Demo DJZS Agent",
      username: "@demo_agent",
      role: "developer",
      stats: {
        level: 1,
        xp: 0,
        zones: 0,
        entries: 0,
      },
      vault: {
        status: "DISCONNECTED",
        entries: [],
      },
      metadata: {
        created: new Date().toISOString(),
        source: "DJZS_TEST_FLOW",
        note: "Demo profile - connect Anytype MCP for real data",
      },
    };
  }

  // Agent initialization endpoint - Username DAO × DJZS Protocol
  app.post("/api/agent/init", async (req, res) => {
    try {
      const { username, wallet } = req.body || {};

      if (!username && !wallet) {
        return res.status(400).json({
          ok: false,
          error: "MISSING_PARAMS",
          message: "Provide at least a username or wallet address.",
        });
      }

      // Resolve identity from web3.bio (wallet or ENS)
      const identityKey = wallet || username;
      let web3Profile = null;

      try {
        const web3bioUrl = `https://api.web3.bio/profile/${encodeURIComponent(identityKey)}`;
        const headers: Record<string, string> = {};
        
        if (process.env.WEB3BIO_API_KEY) {
          headers["X-API-KEY"] = `Bearer ${process.env.WEB3BIO_API_KEY}`;
        }

        const resp = await fetch(web3bioUrl, { headers });
        
        if (resp.ok) {
          const data = await resp.json();
          if (Array.isArray(data) && data.length > 0) {
            web3Profile = data[0];
          }
        }
      } catch (err) {
        console.error("web3.bio fetch error:", err);
      }

      // Generate an Agent ID
      const safeName = (username || (web3Profile && web3Profile.identity) || "agent")
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, "_");

      const agentId = `agent_${safeName}`;

      // Build Agent Card payload
      const payload = {
        ok: true,
        agentId,
        username: username || (web3Profile && web3Profile.identity) || null,
        wallet: wallet || (web3Profile && web3Profile.address) || null,
        protocol: "DJZS v1.0",
        status: "READY",
        vaultLink: "PENDING",

        web3Identity: web3Profile
          ? {
              identity: web3Profile.identity,
              platform: web3Profile.platform,
              displayName: web3Profile.displayName,
              avatar: web3Profile.avatar,
              description: web3Profile.description,
            }
          : null,

        meta: {
          source: "web3.bio",
          at: new Date().toISOString(),
        },
      };

      return res.json(payload);
    } catch (err: any) {
      console.error("Agent init error:", err);
      return res.status(500).json({
        ok: false,
        error: "INTERNAL_ERROR",
        message: "Failed to initialize agent. Check server logs.",
      });
    }
  });

  // Generic agent query endpoint
  app.post("/api/agent", async (req, res) => {
    try {
      const { zoneCode, intent, input, userWallet, options } = req.body || {};

      if (!input) {
        return res.status(400).json({
          ok: false,
          error: "MISSING_INPUT",
          message: "Input directive is required.",
        });
      }

      // Generate a journal ID
      const journalId = `journal_${(zoneCode || "general").toLowerCase()}_${Date.now()}`;

      // Simulated DJZS Agent response
      const reply = `DJZS Agent processed your request in zone ${zoneCode || "GENERAL"}.\n\nIntent: ${intent || "general"}\nInput: ${input}\n\nThis is a simulated response. Connect to Anytype MCP for live agent processing.`;

      return res.json({
        ok: true,
        journalId,
        reply,
        zone: zoneCode,
        intent,
        options,
        meta: {
          processedAt: new Date().toISOString(),
          protocol: "DJZS v1.0",
        },
      });
    } catch (err: any) {
      console.error("Agent query error:", err);
      return res.status(500).json({
        ok: false,
        error: "INTERNAL_ERROR",
        message: "Failed to process agent query.",
      });
    }
  });

  // Explorer API endpoint - returns journal/content items
  app.get("/api/explorer", async (_req, res) => {
    try {
      const items = [
        {
          id: "1",
          title: "WAL thesis: storage + distribution flywheel",
          summary: "Narrative breakdown, risks, token sinks, and which metrics matter over the next 90 days.",
          zoneCode: "01_DYOR",
          zoneName: "DYOR",
          contentType: "Article",
          tags: ["narratives", "tokenomics", "risk"],
          source: "https://djzsx.xyz/",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
          anytypeObjectId: "anytype_obj_abc",
          irysTxId: "irys_tx_123",
        },
        {
          id: "2",
          title: "Agent spec: Anytype MCP → DJZS Zone objects",
          summary: "Object types, properties, relations, and how a local worker syncs into the vault.",
          zoneCode: "08_DEAI",
          zoneName: "Decentralized A.I.",
          contentType: "Note",
          tags: ["mcp", "anytype", "agents"],
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
        },
        {
          id: "3",
          title: "Trade log: WLD 10x plan (entry → TP ladder)",
          summary: "Risk-defined plan with invalidation level, partials, and journaled reasoning.",
          zoneCode: "07_DEFI",
          zoneName: "DeFi",
          contentType: "Trade",
          tags: ["risk", "tp/sl", "journal"],
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
        },
        {
          id: "4",
          title: "Farcaster integration notes",
          summary: "How to pull cast data, reputation scores, and channel memberships into the vault.",
          zoneCode: "04_DESO",
          zoneName: "Decentralized Social",
          contentType: "Journal",
          tags: ["farcaster", "social", "integration"],
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        },
        {
          id: "5",
          title: "DePIN hardware comparison: Helium vs IoTeX",
          summary: "Coverage, rewards, and long-term sustainability of physical infrastructure networks.",
          zoneCode: "06_DEPIN",
          zoneName: "DePIN",
          contentType: "Article",
          tags: ["depin", "hardware", "comparison"],
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
        },
      ];

      res.json({ items });
    } catch (error: any) {
      console.error("Explorer API error:", error);
      res.status(500).json({ error: error.message, items: [] });
    }
  });

  // Health check endpoint
  app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "djzs-agent-backend", status: "UP" });
  });

  const httpServer = createServer(app);

  return httpServer;
}
