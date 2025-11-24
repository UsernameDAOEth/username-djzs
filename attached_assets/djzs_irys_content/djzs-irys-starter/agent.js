import { getIrysUploader } from "./irys.js";

function normalizeUsername(username) {
  return String(username || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_\-\.]/g, ""); // only safe chars
}

/**
 * Build the DJZS Agent Core object for a username.
 */
export function buildAgentCore({ username, ownerWallet, storageMode = "LOCAL_IRYS" }) {
  const normalized = normalizeUsername(username);
  if (!normalized) {
    throw new Error("Invalid username");
  }

  const now = new Date().toISOString();
  const agentId = `agent_${normalized}_${Date.now()}`;

  return {
    username: normalized,
    agentId,
    ownerWallet: ownerWallet || null,
    createdAt: now,
    protocolVersion: "DJZS-0.1",
    storage: {
      mode: storageMode, // e.g. LOCAL_IRYS
      irysEnabled: true
    },
    zones: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    config: {
      journalingStyle: "problem-solution-usecases",
      description: "DJZS Agent – learns from journals, trades, and Timekit logs."
    }
  };
}

/**
 * Upload Agent Core to Irys (Base) and return IDs.
 */
export async function saveAgentCoreToIrys(agentCore) {
  const irysUploader = await getIrysUploader();
  const dataToUpload = JSON.stringify(agentCore, null, 2);

  const tags = [
    { name: "protocol", value: "DJZS" },
    { name: "protocol-version", value: "DJZS-0.1" },
    { name: "type", value: "agent-core" },
    { name: "username", value: String(agentCore.username) }
  ];

  const receipt = await irysUploader.upload(dataToUpload, { tags });
  const id = receipt.id;
  const url = `https://gateway.irys.xyz/${id}`;

  return { irysId: id, irysUrl: url };
}

/**
 * Build a mint-ready NFT metadata object for this username + Agent Core.
 * You can upload this JSON to Irys or IPFS and use the resulting URL as tokenURI.
 */
export function buildUsernameNftMetadata({ username, agentCoreIrysId, imageUrl, externalUrl }) {
  const normalized = normalizeUsername(username);

  return {
    name: `@${normalized}`,
    description: `DJZS Identity NFT for @${normalized}. Minting this spawns your local-first DJZS Agent.`,
    image: imageUrl || "", // you can fill in later with hosted art
    external_url: externalUrl || "", // link to your dapp profile page
    attributes: [
      { trait_type: "Protocol", value: "DJZS" },
      { trait_type: "Agent Core Storage", value: "LOCAL/IRYS" },
      { trait_type: "Username", value: `@${normalized}` }
    ],
    agent_core_irys_id: agentCoreIrysId
  };
}
