// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { saveJournalToIrys } from "./journal.js";
import { buildAgentCore, saveAgentCoreToIrys, buildUsernameNftMetadata } from "./agent.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Static path setup for frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "public");

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.static(publicDir));

/**
 * Root – serve the Claim Your Identity UI
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

/**
 * Finalize a DJZS journal and upload to Irys.
 * Existing endpoint from your starter.
 */
app.post("/api/journal/finalize", async (req, res) => {
  try {
    const payload = req.body;
    const result = await saveJournalToIrys(payload);

    res.status(200).json({
      ok: true,
      ...result,
      zoneId: payload.zoneId,
      zoneSlug: payload.zoneSlug,
      timeCode: payload.timeCode
    });
  } catch (err) {
    console.error("[DJZS-IRYS] finalize error:", err);
    res.status(400).json({
      ok: false,
      error: err.message || "Failed to finalize journal"
    });
  }
});

/**
 * Activate Agent Core for a username.
 * Body: { username: string, ownerWallet?: string, storageMode?: "LOCAL_IRYS" }
 */
app.post("/api/agent/activate", async (req, res) => {
  try {
    const { username, ownerWallet, storageMode } = req.body || {};
    if (!username) {
      return res.status(400).json({ ok: false, error: "username is required" });
    }

    // 1) Build Agent Core object
    const agentCore = buildAgentCore({
      username,
      ownerWallet,
      storageMode: storageMode || "LOCAL_IRYS"
    });

    // 2) Save Agent Core to Irys (Base)
    const { irysId, irysUrl } = await saveAgentCoreToIrys(agentCore);

    // 3) Build NFT metadata template (off-chain for now)
    const nftMetadata = buildUsernameNftMetadata({
      username: agentCore.username,
      agentCoreIrysId: irysId,
      imageUrl: "", // fill in later with your art URL
      externalUrl: "" // link to your app profile, e.g. https://djzsx.xyz/agent/djzs
    });

    res.status(200).json({
      ok: true,
      username: agentCore.username,
      agentId: agentCore.agentId,
      agentCore,
      irysId,
      irysUrl,
      nftMetadata
    });
  } catch (err) {
    console.error("[DJZS-IRYS] /api/agent/activate error:", err);
    res.status(400).json({
      ok: false,
      error: err.message || "Failed to activate agent"
    });
  }
});

/**
 * Mint the DJZS Identity NFT.
 * Body: { toAddress: string, tokenURI: string }
 * Note: In a real production app, you might have the user sign the mint tx on client-side,
 * or use a relayer. Here we simulate a server-side mint for the starter.
 */
app.post("/api/nft/mint", async (req, res) => {
  try {
    const { toAddress, tokenURI } = req.body;
    if (!toAddress || !tokenURI) {
      return res.status(400).json({ ok: false, error: "Missing toAddress or tokenURI" });
    }

    console.log(`[DJZS-NFT] Minting to ${toAddress} with URI: ${tokenURI}`);

    // --- REAL IMPLEMENTATION STUB ---
    // import { ethers } from "ethers";
    // const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    // const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
    // const tx = await contract.mint(toAddress, tokenURI);
    // await tx.wait();
    // --------------------------------

    // SIMULATION RESPONSE
    const mockTxHash = "0x" + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join("");
    
    res.json({
      ok: true,
      txHash: mockTxHash,
      explorerUrl: `https://basescan.org/tx/${mockTxHash}`,
      message: "Mint transaction broadcasted"
    });

  } catch (err) {
    console.error("[DJZS-NFT] Mint error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`[DJZS-IRYS] Server listening on port ${PORT}`);
});
