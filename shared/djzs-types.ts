// shared/djzs-types.ts

//
// 🌌 DJZS – Core Types for Agent Gateway + MCP
// This file defines:
// - /api/agent request/response contracts
// - Core DJZS domain types (Zones, Journals, Users, Onchain refs)
// - MCP payload shapes for Anytype <-> Gateway methods
//

// ========== 1. Core Enums / String Literal Types ==========

export type DJZSIntent =
  | "research"        // DYOR-style project/token research
  | "journal"         // Reflective journaling, Time Zone, etc.
  | "trade-log"       // Log a trade & get analysis
  | "identity"        // DID / usernames / reputation
  | "defi"            // DeFi-specific flows
  | "desci"           // DeSci research
  | "infra"           // DePIN / infra notes
  | "general";        // fallback

export type DJZSAttachmentType =
  | "url"             // article link, tweet, doc, etc.
  | "txHash"          // onchain transaction hash
  | "journalId"       // reference to an existing journal
  | "fileRef";        // uploaded file reference (IPFS/Irys/etc.)

export type DJZSAgentSource =
  | "web"
  | "anytype"
  | "frame"
  | "api"
  | "other";

export type DJZSErrorCode =
  | "INVALID_REQUEST"
  | "UNKNOWN_ZONE"
  | "MCP_ERROR"
  | "LLM_ERROR"
  | "IRYS_ERROR"
  | "ONCHAIN_ERROR"
  | "INTERNAL_ERROR";


// ========== 2. Attachments & Options ==========

export interface DJZSAttachment {
  type: DJZSAttachmentType;
  value: string;       // URL, hash, id, etc.
  label?: string;      // human-friendly label like "Whitepaper"
}

export interface DJZSAgentOptions {
  saveJournal?: boolean;
  uploadToIrys?: boolean;
  mintImmediately?: boolean;
  temperature?: number;
}


// ========== 3. /api/agent – Request Schema ==========

export interface DJZSAgentRequest {
  zoneCode: string;
  intent: DJZSIntent;
  input: string;
  userWallet?: string;
  userId?: string;
  attachments?: DJZSAttachment[];
  source?: DJZSAgentSource;
  locale?: string;
  correlationId?: string;
  options?: DJZSAgentOptions;
}


// ========== 4. /api/agent – Response Schema ==========

export interface DJZSAgentJournalRef {
  id: string;
  zoneCode: string;
  url?: string;
}

export interface DJZSAgentOnchainRefs {
  irysId?: string;
  publicTokenId?: string;
  privateTokenId?: string;
}

export interface DJZSAgentResponseMeta {
  model?: string;
  latencyMs?: number;
  correlationId?: string;
}

export interface DJZSAgentSuccessResponse {
  ok: true;
  zoneCode: string;
  intent: DJZSIntent;
  reply: string;
  summary?: string;
  journal?: DJZSAgentJournalRef;
  onchain?: DJZSAgentOnchainRefs;
  meta?: DJZSAgentResponseMeta;
}

export interface DJZSAgentErrorResponse {
  ok: false;
  errorCode: DJZSErrorCode;
  message: string;
  details?: unknown;
}

export type DJZSAgentApiResponse =
  | DJZSAgentSuccessResponse
  | DJZSAgentErrorResponse;


// ========== 5. DJZS Domain Types (Zones, Users, Journals) ==========

export interface DjzsZoneSummary {
  id: string;
  zoneCode: string;
  name: string;
  shortDescription: string;
  emoji?: string;
}

export interface DjzsZoneConfig extends DjzsZoneSummary {
  fullDescription: string;
  agentPersona: string;
  allowedIntents: DJZSIntent[];
  allowedTools: string[];
  defaultOptions?: DJZSAgentOptions;
}

export interface DjzsUser {
  userId: string;
  wallet?: string;
  displayName?: string;
  journalCount?: number;
}

export interface DjzsJournalSummary {
  id: string;
  zoneCode: string;
  title: string;
  createdAt: string;
  summary?: string;
  tags?: string[];
}

export interface DjzsJournal extends DjzsJournalSummary {
  rawInput: string;
  aiReply?: string;
  attachments?: DJZSAttachment[];
  onchain?: DJZSAgentOnchainRefs;
}


// ========== 6. MCP Method Payloads (Request/Response) ==========

// -- djzs.zone.list --
export interface DjzsZoneListRequest {}

export interface DjzsZoneListResponse {
  zones: DjzsZoneSummary[];
}

// -- djzs.zone.getConfig --
export interface DjzsZoneGetConfigRequest {
  zoneCode: string;
}

export interface DjzsZoneGetConfigResponse {
  zone: DjzsZoneConfig;
}

// -- djzs.user.getOrCreateByWallet --
export interface DjzsUserGetOrCreateByWalletRequest {
  wallet: string;
}

export interface DjzsUserGetOrCreateByWalletResponse {
  user: DjzsUser;
}

// -- djzs.journal.listRecent --
export interface DjzsJournalListRecentRequest {
  zoneCode: string;
  userId: string;
  limit?: number;
}

export interface DjzsJournalListRecentResponse {
  journals: DjzsJournalSummary[];
}

// -- djzs.journal.create --
export interface DjzsJournalCreateRequest {
  zoneCode: string;
  userId: string;
  title: string;
  rawInput: string;
  aiReply: string;
  intent: DJZSIntent;
  attachments?: DJZSAttachment[];
  onchain?: DJZSAgentOnchainRefs;
}

export interface DjzsJournalCreateResponse {
  journalId: string;
  zoneCode: string;
  createdAt: string;
}

// -- djzs.journal.updateOnchainRefs --
export interface DjzsJournalUpdateOnchainRefsRequest {
  journalId: string;
  onchain: DJZSAgentOnchainRefs;
}

export interface DjzsJournalUpdateOnchainRefsResponse {
  journalId: string;
  updated: boolean;
}

// -- djzs.journal.get --
export interface DjzsJournalGetRequest {
  journalId: string;
}

export interface DjzsJournalGetResponse {
  journal: DjzsJournal;
}
