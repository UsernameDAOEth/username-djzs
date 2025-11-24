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

export const irysService = {
  /**
   * Simulates activating an agent by uploading metadata to Irys
   */
  async activateAgent(username: string): Promise<{ txId: string; metadataUrl: string }> {
    console.log(`[DJZS-IRYS] Activating agent for @${username}...`);
    
    // 1. Generate Metadata
    const metadata = {
      name: `DJZS Agent @${username}`,
      description: `Autonomous AI Agent spawned by @${username} on DJZS Protocol.`,
      image: "https://arweave.net/placeholder_agent_image", // Placeholder
      external_url: `https://djzs.xyz/agent/${username}`,
      attributes: [
        { trait_type: "Type", value: "Autonomous Agent" },
        { trait_type: "Version", value: "1.0.0" },
        { trait_type: "Status", value: "Active" },
        { trait_type: "Protocol", value: "DJZS" }
      ]
    };

    // 2. Upload Metadata (Simulated)
    // In real app: await this.getWebUploader().upload(JSON.stringify(metadata))
    await delay(2500); // Simulate upload time

    const mockTxId = `Arweave_Agent_Mint_${Math.random().toString(36).substring(7)}`;
    
    console.log(`[DJZS-IRYS] Agent Activated. Metadata TX: ${mockTxId}`);

    return {
      txId: mockTxId,
      metadataUrl: `https://gateway.irys.xyz/${mockTxId}`
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
