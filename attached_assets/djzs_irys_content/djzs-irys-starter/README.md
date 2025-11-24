# DJZS + Irys Starter (Replit)

This is a minimal Node.js starter for the **DJZS Protocol v0.1** using **Irys** as the permanent archive for finalized journals and Agent Cores.

## What it gives you

- **Express API server**
- `POST /api/agent/activate` → Build Agent Core, Upload to Irys, Generate NFT Metadata
- `POST /api/agent/mint-username` → Mint Username NFT (using metadata from activate)
- `POST /api/journal/finalize` → Upload a DJZS journal payload to Irys
- **Local Bootstrap Script**: `agent_bootstrap.js`
- **Irys Connector**: `irys.js`
- **NFT Logic**: `nft.js` (Ethers.js integration)

## Quickstart on Replit

1. Create a new **Node.js** Replit.
2. Upload the contents of this folder or import the repo.
3. In the Replit **Secrets** panel, add:
   - `PRIVATE_KEY` → Your EVM private key (Base Mainnet)
   - `RPC_URL` → Base Mainnet RPC (e.g. Alchemy/Infura)
   - `NFT_CONTRACT_ADDRESS` → Address of deployed DjzsUsernameNFT contract

4. Install dependencies:
   ```bash
   npm install
   ```

5. Run the server:
   ```bash
   npm run dev
   ```

## CLI Tools

### Bootstrap Local Agent
After activating your agent via the API/UI, you can pull the core config to your local machine:

```bash
node agent_bootstrap.js --username <your_username> --irysUrl <irys_gateway_url>
```

Example:
```bash
node agent_bootstrap.js --username djzs --irysUrl https://gateway.irys.xyz/TxId123...
```
This saves the agent core to `~/.djzs/agents/djzs.json`.

## API Endpoints

- `POST /api/agent/activate`: Activates a new agent core.
- `POST /api/agent/mint-username`: Mints the identity NFT.
- `POST /api/journal/finalize`: Archives a journal entry.

## Files
- `index.js` → Express app + routes
- `irys.js` → Irys connector
- `agent.js` → Agent Core logic
- `nft.js` → Smart Contract logic
- `worker.js` → Simulated local deployment worker
- `contracts/` → Solidity contracts
