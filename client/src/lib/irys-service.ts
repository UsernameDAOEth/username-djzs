import { WebUploader } from "@irys/upload";
import { Ethereum } from "@irys/upload-ethereum";
import { ethers } from "ethers";

// Mock delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface IrysJournalPayload {
  title: string;
  content: string;
  zoneId: string;
  zoneSlug: string;
  timeCode: number;
  createdAt: string;
  version: string;
  previousIrysId?: string;
  authorAlias?: string;
}

export const irysService = {
  /**
   * Simulates getting an Irys uploader. 
   * In a real app, this would use the user's injected wallet (Metamask/Phantom).
   */
  async getWebUploader() {
    // For prototype: Check if window.ethereum exists
    if (typeof window !== 'undefined' && (window as any).ethereum) {
        try {
            // Ideally we would do this:
            // const provider = new ethers.BrowserProvider((window as any).ethereum);
            // const irys = await WebUploader(Ethereum).withProvider(provider);
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
