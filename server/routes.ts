import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { Uploader } from "@irys/upload";
import { BaseEth } from "@irys/upload-ethereum";

export async function registerRoutes(app: Express): Promise<Server> {
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

  // Test endpoint for Anytype MCP API
  app.post("/api/test-mcp", async (req, res) => {
    try {
      const anytypeApiKey = process.env.ANYTYPE_API_KEY;
      
      if (!anytypeApiKey) {
        return res.status(500).json({
          success: false,
          error: "ANYTYPE_API_KEY not configured",
        });
      }

      // Try multiple endpoints
      const endpoints = [
        "http://localhost:31009/v1/objects",
        "http://localhost:31009/objects",
        "http://localhost:31009/v1/status",
      ];

      let lastError: any = null;
      let successResponse = null;

      for (const endpoint of endpoints) {
        try {
          const testResponse = await fetch(endpoint, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${anytypeApiKey}`,
              "Content-Type": "application/json",
            },
            signal: AbortSignal.timeout(3000),
          });

          if (testResponse.ok) {
            const data = await testResponse.json();
            successResponse = {
              success: true,
              message: "Successfully connected to Anytype MCP API",
              endpoint,
              data,
              objectCount: data?.objects?.length || 0,
            };
            break;
          }
        } catch (e) {
          lastError = e;
          continue;
        }
      }

      if (successResponse) {
        return res.json(successResponse);
      }

      throw lastError || new Error("All endpoints failed");
    } catch (error: any) {
      console.error("Anytype MCP error:", error);
      
      const errorMessage = error.message || String(error);
      let hint = "";
      
      if (errorMessage.includes("ECONNREFUSED")) {
        hint = "Connection refused. Anytype MCP server may not be running on port 31009.";
      } else if (errorMessage.includes("401") || errorMessage.includes("403")) {
        hint = "Authentication failed. Check ANYTYPE_API_KEY in secrets.";
      } else if (errorMessage.includes("404")) {
        hint = "Endpoint not found. Anytype MCP API structure may be different.";
      } else {
        hint = "Check that Anytype desktop app is running with MCP enabled on port 31009. Use /api/mcp-diagnostic for more info.";
      }

      res.status(500).json({
        success: false,
        error: errorMessage,
        hint,
        diagnostic: "Visit /api/mcp-diagnostic for connection details",
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
      if (!anytypeApiKey) {
        return res.status(500).json({
          success: false,
          error: "ANYTYPE_API_KEY not configured",
        });
      }

      // Step 1: Fetch UserProfile from Anytype MCP
      const profileResponse = await fetch(`http://localhost:31009/v1/objects/${profileId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${anytypeApiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!profileResponse.ok) {
        throw new Error(`Failed to fetch profile: ${profileResponse.status}`);
      }

      const profileData = await profileResponse.json();

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
        profile: profileData,
        irys: {
          hash: receipt.id,
          url: irysUrl,
          timestamp: receipt.timestamp,
        },
      });
    } catch (error: any) {
      console.error("Profile publish error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
