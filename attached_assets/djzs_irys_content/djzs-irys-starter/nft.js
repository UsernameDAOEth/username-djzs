import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;
const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Minimal ABI for mintUsername
const ABI = [
  "function mintUsername(address to, string calldata username, string calldata tokenURI) external returns (uint256)"
];

export function getNftContract() {
  if (!PRIVATE_KEY || !RPC_URL || !NFT_CONTRACT_ADDRESS) {
    console.warn("[DJZS-NFT] Missing env vars (PRIVATE_KEY, RPC_URL, NFT_CONTRACT_ADDRESS). Using mock mode.");
    return null;
  }

  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, ABI, wallet);
    return contract;
  } catch (error) {
    console.error("[DJZS-NFT] Error initializing contract:", error);
    return null;
  }
}
