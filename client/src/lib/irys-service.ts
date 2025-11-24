import { WebUploader } from "@irys/upload";
import { BaseETH } from "@irys/upload-ethereum";
import { ethers } from "ethers";

// Mock delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface IrysJournalPayload {
  title: string;
  content: string;
  zoneId: number; 
  zoneSlug: string;
  timeCode: string; 
  createdAt: string;
  version: number; 
  previousIrysId?: string;
  authorAlias?: string;
  tags?: string[]; 
}

export interface AgentMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{ trait_type: string; value: string }>;
  external_url: string;
}

// Helper function to normalize username
function normalizeUsername(username: string) {
  return String(username || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_\-\.]/g, ""); // only safe chars
}

export const irysService = {
  /**
   * Simulates activating an agent by:
   * 1. Building Agent Core
   * 2. Uploading Core to Irys
   * 3. Building NFT Metadata
   * 4. Uploading Metadata to Irys
   */
  async activateAgent(username: string): Promise<any> {
    console.log(`[DJZS-IRYS] Activating agent for @${username}...`);
    
    const normalized = normalizeUsername(username);
    
    // 1. Build Agent Core (Simulated from agent.js logic)
    const agentCore = {
      username: normalized,
      agentId: `agent_${normalized}_${Date.now()}`,
      ownerWallet: "0xSimulatedWalletAddress", // In real app this comes from wallet
      createdAt: new Date().toISOString(),
      protocolVersion: "DJZS-0.1",
      storage: {
        mode: "LOCAL_IRYS", 
        irysEnabled: true
      },
      zones: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      config: {
        journalingStyle: "problem-solution-usecases",
        description: "DJZS Agent – learns from journals, trades, and Timekit logs."
      }
    };

    console.log("[DJZS-IRYS] Built Agent Core:", agentCore);

    // 2. Upload Agent Core (Simulated)
    await delay(1500); // Simulate core upload
    const coreTxId = `Arweave_Core_${Math.random().toString(36).substring(7)}`;
    console.log(`[DJZS-IRYS] Agent Core uploaded. TX: ${coreTxId}`);

    // 3. Build NFT Metadata (Simulated from agent.js logic)
    const metadata = {
      name: `@${normalized}`,
      description: `DJZS Identity NFT for @${normalized}. Minting this spawns your local-first DJZS Agent.`,
      image: "https://arweave.net/placeholder_agent_image", 
      external_url: `https://djzs.xyz/agent/${normalized}`,
      attributes: [
        { trait_type: "Protocol", value: "DJZS" },
        { trait_type: "Agent Core Storage", value: "LOCAL/IRYS" },
        { trait_type: "Username", value: `@${normalized}` }
      ],
      agent_core_irys_id: coreTxId
    };

    console.log("[DJZS-IRYS] Built NFT Metadata:", metadata);

    // 4. Upload Metadata (Simulated)
    await delay(1500); // Simulate metadata upload
    const metadataTxId = `Arweave_Meta_${Math.random().toString(36).substring(7)}`;
    const metadataUrl = `https://gateway.irys.xyz/${metadataTxId}`;
    
    console.log(`[DJZS-IRYS] Agent Activated. Metadata TX: ${metadataTxId}`);

    // 5. Simulated Mint (New Step)
    console.log(`[DJZS-NFT] Minting identity NFT...`);
    await delay(2000);
    const mintTxHash = "0x" + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join("");
    console.log(`[DJZS-NFT] Mint confirmed. Hash: ${mintTxHash}`);

    return {
      ok: true,
      username: normalized,
      agentId: agentCore.agentId,
      agentCore,
      irysId: coreTxId,
      irysUrl: `https://gateway.irys.xyz/${coreTxId}`,
      nftMetadata: metadata,
      txId: metadataTxId, 
      metadataUrl: metadataUrl,
      mintTxHash: mintTxHash,
      explorerUrl: `https://basescan.org/tx/${mintTxHash}`
    };
  },

  /**
   * Simulates getting an Irys uploader. 
   * In a real app, this would use the user's injected wallet (Metamask/Phantom) on Base Mainnet.
   */
  async getWebUploader() {
    // For prototype: Check if window.ethereum exists
    if (typeof window !== 'undefined' && (window as any).ethereum) {
        try {
            // Ideally we would do this for Base Mainnet:
            // const provider = new ethers.BrowserProvider((window as any).ethereum);
            // const irys = await WebUploader(BaseETH).withProvider(provider);
            // return irys;
            
            // But for the mockup stability, we'll return a mock object if real wallet fails or isn't desired yet
            return this.getMockUploader();
        } catch (e) {
            console.warn("Wallet connection failed, falling back to mock", e);
            return this.getMockUploader();
        }
    }
    return this.getMockUploader();
  },

  getMockUploader() {
    return {
      upload: async (data: string, options: { tags: any[] }) => {
        await delay(2000); // Simulate network upload
        return {
          id: `Arweave_Mock_Tx_${Math.random().toString(36).substring(7)}`,
          url: `https://gateway.irys.xyz/mock_tx_${Date.now()}`
        };
      }
    };
  },

  /**
   * Uploads a journal entry to Irys Network
   */
  async uploadJournalEntry(payload: IrysJournalPayload) {
    console.log("[DJZS-IRYS] Preparing upload...", payload);

    const tags = [
      { name: "App-Name", value: "DJZS-Protocol" },
      { name: "Protocol", value: "DJZS" },
      { name: "Protocol-Version", value: "DJZS-0.1" },
      { name: "Zone-ID", value: String(payload.zoneId) },
      { name: "Zone-Slug", value: String(payload.zoneSlug) },
      { name: "Time-Code", value: String(payload.timeCode) },
      { name: "Version", value: String(payload.version) },
      { name: "Content-Type", value: "application/json" }
    ];

    if (payload.previousIrysId) {
      tags.push({ name: "Previous-ID", value: String(payload.previousIrysId) });
    }
    if (payload.authorAlias) {
      tags.push({ name: "Author-Alias", value: String(payload.authorAlias) });
    }

    try {
      const uploader = await this.getWebUploader();
      const dataToUpload = JSON.stringify(payload, null, 2);
      
      // @ts-ignore - Mock uploader vs Real uploader types
      const receipt = await uploader.upload(dataToUpload, { tags });
      
      console.log("[DJZS-IRYS] Upload successful:", receipt);
      
      return {
        success: true,
        irysId: receipt.id,
        irysUrl: `https://gateway.irys.xyz/${receipt.id}`,
        explorerUrl: `https://explorer.irys.xyz/tx/${receipt.id}`
      };
    } catch (e) {
      console.error("[DJZS-IRYS] Upload failed:", e);
      throw new Error("Failed to upload to Irys Network");
    }
  }
};
