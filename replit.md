# Username DAO × DJZS Protocol - Decentralized dApp

## Project Overview
Brutalist landing page and dApp for Username DAO × DJZS Protocol - a decentralized crypto infrastructure where users mint a Username NFT to spawn personal AI agents. The system uses local-first architecture with Anytype Vault for private data storage, Irys Network for permanent archiving, and micropayment-based AI queries via x402 protocol.

**Design System**: Digital brutalism with neon green (#b2ff59) accent color, Space Grotesk/Chakra Petch/Space Mono typography, and raw "Bushwick agency-level" aesthetic.

**Stack**: React + Vite + Express + PostgreSQL (Drizzle ORM) + Tailwind CSS + TypeScript

## Recent Progress (Session: Dec 1, 2025)

### Completed Features
✅ **Frontend Prototype** - Agent Console, 3D interactive elements, Matrix Rain effects
✅ **Profile Page** (`/profile`) - 3D NFT card, agent status dashboard, activity log, achievements inventory
✅ **Anytype UserProfile Schema** - JSON schema + TypeScript types based on provided specification
✅ **Mobile Navigation** - Responsive MobileMenu component across all pages
✅ **Full-Stack Upgrade** - Express backend with API routes and storage layer
✅ **Irys Network Integration** - @irys/sdk configured for Base Mainnet permanent archiving

### Backend API Endpoints (NEW)
- **POST `/api/test-irys`** - Tests Irys upload with sample JSON, returns gateway URL
  - Status: ✅ Working (tested with real Base Mainnet)
  - Response includes receipt ID and gateway URL

- **POST `/api/test-mcp`** - Tests Anytype MCP API connection on localhost:31009
  - Status: ⏳ Ready (waiting for local Anytype app with MCP enabled)
  - Error handling shows helpful hints when Anytype isn't running

- **POST `/api/profile/publish`** - Full flow: Anytype → Irys → Receipt storage
  - Status: ⏳ Built and ready for testing
  - Fetches UserProfile from Anytype, uploads to Irys, returns receipt

### New Pages
- **`/api-test`** - Interactive test UI with three brutalist cards
  - Test IRYS upload functionality
  - Test Anytype MCP connection
  - Full flow test (Anytype → Irys → Receipt)
  - Shows results with gateway links and error messages

## Architecture

### Frontend Structure
```
client/src/
├── pages/
│   ├── home.tsx (landing page)
│   ├── profile.tsx (user profile dashboard)
│   ├── api-test.tsx (NEW - integration testing UI)
│   └── not-found.tsx
├── components/
│   ├── djzs-agent-console.tsx (AI agent interface)
│   ├── 3d-card.tsx (3D NFT visualization)
│   ├── wireframe-core.tsx (animated vector graphic)
│   ├── cyber-grid.tsx (ambient background)
│   ├── mobile-menu.tsx (responsive navigation)
│   └── ui/ (brutalist UI components)
├── types/
│   └── user-profile.ts (UserProfile interface)
├── schemas/
│   └── anytype-userprofile.schema.json (JSON schema)
└── lib/
    ├── djzs-api.ts (API client)
    └── irys-service.ts (Irys utilities)
```

### Backend Structure
```
server/
├── routes.ts (API endpoints - /api/test-irys, /api/test-mcp, /api/profile/publish)
├── storage.ts (Storage interface and implementations)
└── app.ts (Express setup with middleware)
```

## Configuration

### Environment Variables (Secrets)
- `ANYTYPE_API_KEY` - Anytype desktop app API key (configured ✅)
- `PRIVATE_KEY` - Ethereum private key for Irys uploads (configured ✅)

### Local Development
```bash
npm run dev              # Starts full-stack dev server on port 5000
npm run build          # Builds for production
npm run db:push        # Syncs Drizzle schema with database
```

## Testing the Integration

### Prerequisites
1. Anytype desktop app running locally
2. MCP server enabled on port 31009 (Anytype settings)
3. ANYTYPE_API_KEY and PRIVATE_KEY in Replit secrets

### Test Flow
1. Visit `/api-test` page
2. Click "TEST" button on IRYS UPLOAD TEST card
   - Should show success with gateway URL
3. Start Anytype desktop app with MCP enabled
4. Click "TEST" button on ANYTYPE MCP TEST card
   - Should show success when connected
5. Click "PUBLISH" button on FULL FLOW TEST card
   - Reads profile from Anytype, uploads to Irys, returns receipt

## Design Specifications

### Color Palette
- **Primary**: #b2ff59 (Neon Green - Brutalist accent)
- **Background**: #000000 (Pure Black)
- **Text**: #ffffff (White) with primary accents
- **Secondary**: Primary with opacity variations

### Typography
- **Display/Headings**: Space Grotesk, Space Mono
- **Body**: Chakra Petch, Courier New
- **Monospace**: Space Mono for technical elements

### UI Components
All components follow "Brutalist" design pattern:
- Raw borders (2px solid)
- Grid backgrounds
- High contrast
- Minimal rounded corners
- Accessible focus states

## Next Steps

### Immediate (Testing Phase)
- [ ] Run Anytype desktop with MCP enabled
- [ ] Test `/api-test` page endpoints
- [ ] Verify Anytype → Irys → Receipt flow

### Phase 2 (Profile Publishing)
- [ ] Implement actual UserProfile read/write from Anytype
- [ ] Store Irys receipts in PostgreSQL
- [ ] Add profile publishing UI to /profile page

### Phase 3 (AI Agent Mint)
- [ ] Build agent minting flow (Username NFT)
- [ ] Integrate with blockchain for NFT minting
- [ ] Add x402 micropayment routing

### Phase 4 (Polish & Deploy)
- [ ] Complete all agent console interactions
- [ ] Add more activity log features
- [ ] Prepare for production deployment
- [ ] Update meta tags (og:title, og:description, etc.)

## File References

### Key Implementation Files
- `server/routes.ts` - All API endpoints
- `client/src/pages/api-test.tsx` - Test UI
- `client/src/types/user-profile.ts` - Data model
- `client/src/components/mobile-menu.tsx` - Navigation

### Schema Files
- `client/src/schemas/anytype-userprofile.schema.json` - Anytype schema
- `shared/schema.ts` - Database schema (if applicable)

## User Preferences
- Neon green (#b2ff59) is canonical brand color
- Brutalist design aesthetic (raw, geometric, high contrast)
- Local-first architecture prioritized
- Real data over mock data
