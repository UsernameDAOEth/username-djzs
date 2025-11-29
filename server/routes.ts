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

      // Test connection to Anytype MCP API
      const testResponse = await fetch("http://localhost:31009/v1/objects", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${anytypeApiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!testResponse.ok) {
        const errorText = await testResponse.text();
        throw new Error(`MCP API error: ${testResponse.status} ${errorText}`);
      }

      const data = await testResponse.json();

      res.json({
        success: true,
        message: "Successfully connected to Anytype MCP API",
        objectCount: data?.objects?.length || 0,
        endpoint: "http://localhost:31009",
      });
    } catch (error: any) {
      console.error("Anytype MCP error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
        hint: "Make sure Anytype desktop app is running and MCP server is enabled on port 31009",
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
