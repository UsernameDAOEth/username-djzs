# DJZS + Irys Starter (Replit)

This is a minimal Node.js starter for the **DJZS Protocol v0.1** using **Irys** as the permanent archive
for finalized journals.

## What it gives you

- Express API server
- `POST /api/journal/finalize` → upload a DJZS journal payload to Irys
- Standard DJZS tags: `protocol`, `zone-id`, `zone-slug`, `time-code`, `version`, `previous-id`
- Simple Irys connector in `irys.js`
- `.env.example` showing required secrets

## Quickstart on Replit

1. Create a new **Node.js** Replit.
2. Upload the contents of this folder or import the repo.
3. In the Replit **Secrets** panel, add:

   - `PRIVATE_KEY` → test EVM private key (do **not** use your main wallet)
   - `RPC_URL` → an RPC endpoint (only needed if you switch to devnet mode)

4. Install dependencies:

   ```bash
   npm install
   ```

5. Run the server:

   ```bash
   npm run dev
   ```

6. Test the finalize endpoint (for example with curl):

   ```bash
   curl -X POST http://localhost:3000/api/journal/finalize \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Zone 01 – DYOR: Test Entry",
       "content": "Full text of the journal...",
       "zoneId": 1,
       "zoneSlug": "dyor",
       "timeCode": "2025-11-23T15:04Z::PRESENT_REFLECTION",
       "createdAt": "2025-11-23T15:04:00.000Z",
       "version": 1,
       "authorWallet": "0xYourWallet",
       "authorAlias": "Dj-Z-S",
       "tags": ["example", "djzs", "dyor"]
     }'
   ```

You should get back an `irysId` and `irysUrl`.

## Files

- `index.js` → Express app + routes
- `irys.js` → Irys connector
- `journal.js` → DJZS journal→Irys helper
- `.env.example` → environment variable template

Customize the payload and tags to match your final DJZS Zone + Timekit spec.
