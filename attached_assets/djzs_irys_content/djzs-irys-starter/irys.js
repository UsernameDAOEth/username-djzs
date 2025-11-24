import { Uploader } from "@irys/upload";
import { Ethereum } from "@irys/upload-ethereum";
import dotenv from "dotenv";

dotenv.config();

const { PRIVATE_KEY, RPC_URL, NODE_ENV } = process.env;

if (!PRIVATE_KEY) {
  console.error("[DJZS-IRYS] Missing PRIVATE_KEY in environment.");
}

/**
 * Get a configured Irys uploader.
 * By default this connects to mainnet using ETH.
 * If you want devnet, uncomment the devnet block.
 */
export const getIrysUploader = async () => {
  if (!PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not set");
  }

  // Base mainnet config
  let irysUploader = await Uploader(Ethereum).withWallet(PRIVATE_KEY);

  // Example devnet config (optional)
  // if (NODE_ENV === "development" && RPC_URL) {
  //   irysUploader = await Uploader(Ethereum)
  //     .withWallet(PRIVATE_KEY)
  //     .withRpc(RPC_URL)
  //     .devnet();
  // }

  return irysUploader;
};
