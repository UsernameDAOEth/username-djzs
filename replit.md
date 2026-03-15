# DJZS Protocol — The API Tollbooth for the A2A Economy

## Project Overview
Single-page landing site for DJZS Protocol by Username DAO. Features adversarial verification of AI agent logic, x402 USDC payment gating, immutable audit trail on Irys, and confidential execution via Phala TEE. Identity resolved live from ENS via web3.bio API.

**Design System**: Terminal Noir — pure black backgrounds, neon green (#22c55e / green-400) accent, zero border radius, monospace-first typography (JetBrains Mono, Fira Code), scanline overlay effect.

**Stack**: React + Vite + Express + Tailwind CSS v4 + TypeScript

## File Structure

### Frontend
```
client/
├── index.html              — HTML shell with meta tags, Google Fonts
├── public/
│   ├── favicon.png
│   └── opengraph.jpg
└── src/
    ├── main.tsx             — React entry point
    ├── App.tsx              — Router (wouter): / and 404
    ├── index.css            — Terminal Noir theme (Tailwind v4)
    ├── lib/
    │   └── queryClient.ts   — React Query setup
    └── pages/
        ├── home.tsx         — Full landing page (1146 lines, 12 sections)
        └── not-found.tsx    — 404 page
```

### Server
```
server/
├── app.ts                   — Express app setup, logging, port binding
├── routes.ts                — Single /health endpoint
├── index-dev.ts             — Dev server with Vite HMR
├── index-prod.ts            — Production static file server
├── index.ts                 — Entry point
└── storage.ts               — In-memory storage interface
```

### Shared
```
shared/
└── schema.ts                — Drizzle schema (users table)
```

### Config
```
package.json                 — Dependencies and scripts
tsconfig.json                — TypeScript config with path aliases
vite.config.ts               — Vite + React + Tailwind + path aliases
vite-plugin-meta-images.ts   — Custom plugin for OG image meta tags
drizzle.config.ts            — Drizzle Kit config
```

## Home Page Sections (14)
1. **Header** — Fixed nav with web3.bio avatar, identity badge, wallet connect button
2. **Hero** — Terminal boot sequence, identity resolution, outcome status cards
3. **Tollbooth** — Protocol capabilities, receipts, log stream, teaching pillars
4. **Onboarding** — 4-step agent creation (Connect Wallet → Select Type → Name & Email → Deploy via Ironclaw)
5. **ConnectToDJZS** — Post-deployment connection guide: REST API tiers (Micro/Founder/Treasury/Escrow) + XMTP dark channel prefix routing, curl examples, ProofOfLogic response format
6. **PortableOracle** — Copy-paste DJZS system prompt for ChatGPT/Claude/Gemini, DJZS-LF taxonomy reference, sample FAIL verdict output, one-click copy button
7. **Evolution** — Timeline from consciousness study to protocol deployment
8. **TollboothArchitecture** — Visual audit-before-act loop diagram
9. **TheArchitect** — Builder profile with web3.bio-resolved avatar and identity graph
10. **SimulationStack** — Three-layer philosophy (Internal OS → Verification → A2A Future)
11. **TheDispatch** — Article links to username.box
12. **KYADemo** — Interactive adversarial oracle demo (swap/arbitrage/treasury/rebalance)
13. **Contact** — XMTP chat + social links resolved from ENS
14. **Footer** — Address, identity, network info

## Key Integrations
- **web3.bio API** — Called directly from frontend `useWeb3Bio` hook to resolve ENS identity (username.dj-z-s.eth)
- **Wallet Connect** — Native `window.ethereum` MetaMask integration
- **MoltMail** — Agent email provisioning via clawhub.ai
- **Ironclaw** — TEE-secured agent runtime deployment via ironclaw.app (NEAR AI Cloud)

## API Endpoints
- **GET `/health`** — Health check: `{ ok: true, service: "djzs-agent-backend", status: "UP" }`

## Local Development
```bash
npm run dev     — Full-stack dev server on port 5000
npm run build   — Production build
```

## Design Specifications

### Color Palette
- **Background**: Black (#000 / zinc-950)
- **Primary/Accent**: Green-400 (#22c55e)
- **Text**: White / zinc-300 / zinc-400 / zinc-500
- **Borders**: zinc-800
- **Secondary accents**: blue-400, amber-400, purple-400, red-400

### Typography
- **Primary**: JetBrains Mono, Fira Code (monospace)
- **Secondary**: Space Grotesk, Chakra Petch
- **Body**: System monospace stack

### UI Characteristics
- Zero border radius (all sharp edges)
- Hard shadows (6px 6px 0px 0px)
- Scanline overlay effect
- Minimalist brutalist terminal aesthetic
