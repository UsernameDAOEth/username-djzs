# DJZS Protocol

**The API Tollbooth for the A2A Economy**

Built by [Username DAO](https://github.com/UsernameDAOEth) | [djzs.ai](https://djzs.ai/) | [Discord](https://discord.gg/WKYQTBgW)

---

## What is DJZS?

DJZS Protocol is an adversarial verification layer for autonomous AI agents. Before any agent acts, it must pass through the tollbooth — a logic audit that stress-tests reasoning, detects cognitive bias, and issues immutable proof-of-logic certificates.

**Core Capabilities:**
- Adversarial verification of AI agent logic before execution
- x402 USDC payment gating on Base
- Immutable audit certificates on Irys (Arweave)
- Confidential execution via Phala TEE

## Live Site

This repository contains the landing page for the DJZS Protocol — a single-page React application with a Terminal Noir design system.

**14 Sections:** Header, Founders Fund, Hero, Tollbooth, Agent Onboarding, Connect to DJZS Oracle, Evolution Timeline, SIFR-0 Philosophy, Try the Oracle, The Architect, Simulation Stack, The Dispatch, Contact, Footer.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript |
| Bundler | Vite |
| Styling | Tailwind CSS v4 |
| Routing | Wouter |
| Server | Express |
| Identity | web3.bio API (ENS resolution) |
| Wallet | MetaMask (window.ethereum) |

## Design System: Terminal Noir

- **Background**: Pure black (`#000`)
- **Accent**: Neon green (`#22c55e` / green-400)
- **Typography**: JetBrains Mono, Fira Code (monospace-first)
- **Borders**: `zinc-800`, zero border radius
- **Effects**: Matrix rain background, scanline overlay
- **Palette**: `zinc-*` color scale throughout

## Project Structure

```
client/
├── index.html                    # HTML shell, meta tags, Google Fonts
└── src/
    ├── App.tsx                   # Router (wouter)
    ├── index.css                 # Tailwind v4 theme
    ├── components/
    │   └── DJZSAllSections.tsx   # MatrixRain, FoundersFund, Sifr0Philosophy, TryTheOracle
    └── pages/
        └── home.tsx              # Full landing page (14 sections)

server/
├── app.ts                        # Express setup
├── routes.ts                     # API routes
├── index-dev.ts                  # Dev server (Vite HMR)
└── index-prod.ts                 # Production server

shared/
└── schema.ts                     # Drizzle schema
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server (port 5000)
npm run dev

# Production build
npm run build
npm start
```

## DJZS-LF Taxonomy

The adversarial verification framework classifies logic failures:

| Code | Severity | Name |
|------|----------|------|
| DJZS-S01 | CRITICAL | Circular Logic |
| DJZS-S02 | CRITICAL | Missing Falsifiability |
| DJZS-E01 | HIGH | Confirmation Tunnel |
| DJZS-E02 | HIGH | Authority Substitution |
| DJZS-I01 | MEDIUM | FOMO Loop |
| DJZS-I02 | MEDIUM | Narrative Dependency |
| DJZS-X01 | CRITICAL | Unhedged Execution |

## API Tiers

| Tier | Endpoint | Price | Limit |
|------|----------|-------|-------|
| MICRO | `/api/audit/micro` | $2.50 | 1,000 chars |
| FOUNDER | `/api/audit/founder` | $5.00 | 5,000 chars |
| TREASURY | `/api/audit/treasury` | $50.00 | Unlimited |
| ESCROW | `/api/audit/escrow` | Escrow-funded | Per tier |

## Key Integrations

- **web3.bio** — Live ENS identity resolution for `username.dj-z-s.eth`
- **MoltMail** — Agent email provisioning via [clawhub.ai](https://clawhub.ai)
- **Ironclaw** — TEE-secured agent runtime on NEAR AI Cloud
- **Irys** — Immutable audit trail storage (Arweave)
- **Phala Network** — Confidential VM execution

## SIFR-0 Philosophy

> "Nothing manifests without first passing through the void-state."

SIFR (Arabic: صفر) — the root of both *zero* and *cipher*. The protocol's philosophical foundation draws from cross-tradition zero-state concepts:

| Tradition | Concept | Protocol Equivalent |
|-----------|---------|-------------------|
| Yoruba | Ori | Agent Intent Layer |
| Egyptian | Ogdoad | Audit Validators |
| Sanskrit | Ojas | LogicTrustScore |
| Greek | Ousia | ProofOfLogic |
| Arabic | Sifr | Audit Gateway |

## Contact

- **ENS**: username.dj-z-s.eth
- **X/Twitter**: [@dj_z_s](https://x.com/dj_z_s)
- **Discord**: [discord.gg/WKYQTBgW](https://discord.gg/WKYQTBgW)
- **Telegram**: [@usernamedjzs](https://t.me/usernamedjzs)
- **Farcaster**: [dj-z-s.eth](https://warpcast.com/dj-z-s.eth)
- **EtherMail**: 0x3e79e0374383ea64bc16c9b0568c6b13ef084afb@ethermail.io
- **GitHub**: [UsernameDAOEth](https://github.com/UsernameDAOEth)
- **Website**: [djzs.ai](https://djzs.ai/)

## License

MIT
